import { v4 as uuidv4 } from "uuid";

const updateCart = (req, res) => {
  console.log("updateCart received:", req.body);
  const { productId, variantId, quantity} = req.body;

  if (!req.session) {
    //console.error("No session object found on request.");
    return res.status(500).send({ error: "Session not initialized" });
  }

  if (!req.session.userId) {
    //console.log("New session detected. Creating session cart.");
    req.session.userId = uuidv4();
    req.session.cart = [];
  }

  //console.log("Current session cart (before update):", req.session.cart);

  const itemIndex = req.session.cart.findIndex(
    (item) =>
      String(item.productId) === String(productId) &&
      String(item.variantId) === String(variantId)
  );
  //console.log("item index is", itemIndex)

  if (itemIndex !== -1) {
    if (quantity > 0) {
      // Update quantity
      //console.log("Updating quantity for existing item");
      req.session.cart[itemIndex].quantity = quantity;
    } else {
      // Remove from cart
      //console.log("Removing item from cart");
      req.session.cart.splice(itemIndex, 1);
    }
  } else if (quantity > 0) {
    // Add new item
    //console.log("Adding new item to cart");
    req.session.cart.push({ productId, variantId, quantity });
  }
  //console.log("Final cart to be saved:", req.session.cart);

  req.session.save((err) => {
    if (err) {
      console.error("Failed to save session:", err);
      return res.status(500).send({ error: "Failed to save session" });
    }
    ///console.log("Session saved successfully:", req.session);
    res.send({ userId: req.session.userId, cart: req.session.cart });
  });
};

const getCart = (req, res) => {
  res.send({ cart: req.session.cart || [] });
};

export { updateCart, getCart };
