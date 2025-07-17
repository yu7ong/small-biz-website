import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configure axios defaults
axios.defaults.withCredentials = true;

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const deliveryFee = 10;
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 


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

  const addToCart = async (productId, productName, variantId, variantName, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[productId]) {
      if (cartData[productId][variantId]) {
        cartData[productId][variantId] += quantity;
      } else {
        cartData[productId][variantId] = quantity;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][variantId] = quantity;
    }

    try {
      await axios.post("http://localhost:4000/api/session/cart", {
        productId: productId,
        variantId: variantId,
        quantity: cartData[productId][variantId],
      });
      setCartItems(cartData);

      toast.success(
        `Added ${productName}, ${variantName} into cart`,
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

  const updateQuantity = async (productId, variantId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      // Remove item completely
      if (cartData[productId]) {
        delete cartData[productId][variantId];
        // If no more variants, remove the product entirely
        if (Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId];
        }
      }
    } else {
      // Update quantity
      if (!cartData[productId]) {
        cartData[productId] = {};
      }
      cartData[productId][variantId] = quantity;
    }

    try {
      await axios.post("http://localhost:4000/api/session/cart", {
        productId: productId,
        variantId: variantId,
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
        navigate,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
