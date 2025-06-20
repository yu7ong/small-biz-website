import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const deliveryFee = 10;
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log("response failed");
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const getCartData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/session/cart");

      const cartData = {};
      if (response.data.cart) {
        for (const item of response.data.cart) {
          const { productId, variantId, quantity } = item;
          if (!cartData[productId]) {
            cartData[productId] = {};
          }
          cartData[productId][variantId] = quantity;
        }
        setCartItems(cartData);
      } else {
        console.log("No cart data available!");
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const addToCart = async (itemId, itemName, option, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][option]) {
        cartData[itemId][option] += quantity;
      } else {
        cartData[itemId][option] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][option] = quantity;
    }

    try {
      await axios.post("http://localhost:4000/api/session/cart", {
        productId: itemId,
        variantId: option,
        quantity: cartData[itemId][option],
      });
      setCartItems(cartData);

      const productData = products.find((product) => product._id === itemId);

      toast.success(
        `Added ${itemName}, ${productData.sizes[option]} into cart`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#e8d782",
            color: "#38342c",
            fontFamily: "Gaegu",
            fontSize: "14px",
          },
        }
      );
    } catch (error) {
      console.error("Failed to update session cart", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      // Remove item completely
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        // If no more variants, remove the product entirely
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Update quantity
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    try {
      await axios.post("http://localhost:4000/api/session/cart", {
        productId: itemId,
        variantId: size,
        quantity: quantity,
      });
      setCartItems(cartData);
    } catch (error) {
      console.error("Failed to update session cart", error);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    console.log("getCartAmount is logged")
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProductData();
  }, []);

    useEffect(() => {
    if (products.length > 0) {
      getCartData();
    }
  }, [products]);


  return (
    <ShopContext.Provider
      value={{
        products,
        deliveryFee,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
