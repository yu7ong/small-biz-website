import React, { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const deliveryFee = 10;
  const [cartItems, setCartItems] = useState({});

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

    setCartItems(cartData);

    const productData = products.find((product) => product._id === itemId);

    toast.success(`Added ${itemName}, ${productData.sizes[option]} into cart`, {
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
    });
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
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  } 

  const getCartAmount = () => {
    let totalAmount = 0; 
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id = items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return totalAmount; 
  }

  return (
    <ShopContext.Provider
      value={{ products, deliveryFee, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount}}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
