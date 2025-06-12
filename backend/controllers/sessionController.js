import { v4 as uuidv4 } from "uuid";

const updateCart = (req, res) => {
  const { productId, variantId, quantity } = req.body;

  if (!req.session.userId) {
    req.session.userId = uuidv4();
    req.session.cart = [];
  }

  if (!productId || !variantId || typeof quantity !== "number") {
    return res.status(400).send({ error: "Product ID and quantity required" });
  }

  const itemIndex = req.session.cart.findIndex(
    (item) =>
      String(item.productId) === String(productId) &&
      String(item.variantId) === String(variantId)
  );

  if (itemIndex !== -1) {
    if (quantity > 0) {
      // Update quantity
      req.session.cart[itemIndex].quantity = quantity;
    } else {
      // Remove from cart
      req.session.cart.splice(itemIndex, 1);
    }
  } else if (quantity > 0) {
    // Add new item
    req.session.cart.push({ productId, variantId, quantity });
  }

  req.session.save((err) => {
    if (err) return res.status(500).send({ error: "Failed to save session" });
    res.send({ userId: req.session.userId, cart: req.session.cart });
  });
};

const getCart = (req, res) => {
  res.send({ cart: req.session.cart || [] });
};

export { updateCart, getCart };
