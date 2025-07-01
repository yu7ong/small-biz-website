import mongoose from "mongoose";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const placeOrder = async (req, res) => {
  //create a mongoDB transaction
  const dbSession = await mongoose.startSession();

  try {
    await dbSession.startTransaction();

    // Validate request
    validateRequestInputs(req.body, req.session);

    //Extract request inputs
    const { email, name, details } = req.body;
    const evidenceImg = req.files.evidenceImg;
    const result = await cloudinary.uploader.upload(evidenceImg.path, {
      folder: "payment_evidence",
      resource_type: "image",
    });
    const evidenceImgUrl = result.secure_url;

    //Validate products and variants
    const validatedProducts = validateCart(req, dbSession)
    res.json({ success: true, validatedProducts});

    console.log(validatedProducts)
  } catch (error) {
    console.log(error);
  }
};

const validateRequestInputs = (body, session) => {
  const { email, name, details, collectionDate } = body;

  if (!session.cart || session.cart.length === 0) {
    throw { status: 400, error: "Cart is empty." };
  }

  if (!email || !validator.isEmail(email.trim())) {
    throw { status: 400, error: "Please provide a valid email address" };
  }

  if (!name || name.trim().length < 2) {
    throw { status: 400, error: "Please provide a valid name (minimum 2 characters)" };
  }

  return null;
};

const validateCart = async (req, dbSession) => {
  const items = {};
  req.session.cart.forEach(({ productId, variantId, quantity }) => {
    if (!items[productId]) {
      items[productId] = {};
    }
    items[productId][variantId] = quantity;
  });

  let totalAmount = 0;
  const validatedItems = [];

  const productIds = Object.keys(items).map(
    (id) => new mongoose.Types.ObjectId(id)
  );
  const productsBought = await productModel
    .find({
      _id: { $in: productIds },
    })
    .session(dbSession);

  //Creation of Maps to speedup lookup process
  const productMap = new Map();
  const variantMap = new Map();
  productsBought.forEach((product) => {
    productMap.set(product._id.toString(), product);
    product.variants.forEach((variant) => {
      variantMap.set(variant._id.toString(), {
        variant
      });
    });
  });

  //Check if products and variants exist in database
  //Checks for quantity will be added later
  for (const [productId, variants] of Object.entries(items)) {
    const product = productMap.get(productId);

    if (!product) {
      throw { status: 400, error: `Product ${productId} cannot be found in database` };
    }

    for (const [variantId, quantity] of Object.entries(variants)) {
      const variant = variantMap.get(variantId);
      if (!variant) {
        throw { status: 400, error: `Variant ${variantId} cannot be found in product ${productId}` };
      }
      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;
      
      validatedItems.push({
        productId: product._id,
        variantId: variant._id,
        quantity: quantity,
        pricePerUnit: product.price,
        totalPrice: itemTotal
      });
    }
  }

  return {
    validatedItems,
    totalAmount
  };
}

export { placeOrder };
