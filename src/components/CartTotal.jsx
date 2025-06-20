import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function CartTotal() {
  const { getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <p className="my-2 text-m flex items-center cursor-pointer gap-2 ribeye-regular text-[#38342c]">
          Cart Total
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm gaegu text-[#38342c]">
        <div className="flex justify-between"> 
            <p> Subtotal </p>
            <p> {'$' + getCartAmount()}.00</p>
        </div>
        <hr className="border-[#d3bf5d]"/> 
        <div className="flex justify-between"> 
            <p>Shipping fee: </p>
            <p>{'$' + 3}.00</p>
        </div>
        <hr className="border-[#d3bf5d]"/> 
        <div className="flex justify-between">
            <p> Total </p>
            <p> {'$' + (getCartAmount() === 0 ? 0 : getCartAmount() + 3 )}.00</p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
