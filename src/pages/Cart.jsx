import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { RiDeleteBinLine } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

function Cart() {
  const {products, cartItems, updateQuantity, navigate} = useContext(ShopContext); 

  const [cartData, setCartData] = useState([]);

  useEffect(() => { 
    let tempData = [];
    for (const items in cartItems) { 
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) { 
          tempData.push({
            productId: items,
            variantId: item, 
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className="bg-[#f5f5dc] min-h-screen pt-14 mt-20 pl-4 sm:pl-16">
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2 ribeye-regular text-[#38342c]'> Your Cart </p> 
        <div> 
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item.productId);
              console.log("Product data is... ")
              console.log(productData);
              const variantData = productData.variants.find(variant => variant._id.toString() === item.variantId);
              console.log("Variant data is... ")
              console.log(variantData);
              return (
                <div key={index} className='py-4 text-[#38342c] gaegu grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={variantData.image} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{'$' + productData.price}</p> 
                        <p className='px-2 sm:px-3 sm:py-1 text-[#aaaaaa]'>{variantData.name}</p>
                      </div> 
                      </div> 
                  </div>
                  <input className='border border-[#d3bf5d] max-w-10 sm:max-w-20 px-2 py-1' type='number' min={1} defaultValue={item.quantity} onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.productId, item.variantId, Number(e.target.value))}/> 
                  <div className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={()=>updateQuantity(item.productId, item.variantId, 0)}> 
                    <RiDeleteBinLine />
                  </div> 
                </div> 
              )
            })
          }
          <div className='flex justify-end py-20 mx-10'> 
            <div className='w-full sm:w-[450px]'> 
              <CartTotal />
              <div className='w-full text-end mt-2'> 
                <button onClick={() => navigate('/place-order')}className='px-8 py-3 text-sm ribeye-regular bg-[#38342c] text-[#fffcf6] active:bg-[#726f68]'> PROCEED TO CHECKOUT </button>
              </div>
            </div>
          </div>
        </div>
    </div> 
  )
}

export default Cart
