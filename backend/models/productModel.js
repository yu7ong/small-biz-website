import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be negative"],
  },
  image: {
    type: String, //Individual image for product
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, //Overall image for product
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  variants: {
    type: [variantSchema], // Embed variants
    required: true,
    validate: [(arr) => arr.length > 0, "At least one variant is required"],
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
