import React, { createContext } from 'react'
import { products } from '../assets/assets'

export const ShopContext = createContext()

export const ShopContextProvider = (props) => {
  const deliveryFee = 10;

  return (
    <ShopContext.Provider value={{ products,  deliveryFee}}>
      {props.children}
    </ShopContext.Provider>
  )
}