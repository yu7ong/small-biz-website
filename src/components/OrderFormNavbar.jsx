import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const OrderFormNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="text-xl font-semibold text-[#38342c] gaegu">
        tongspalette&apos;s Store
      </div>
      <button
        onClick={() => navigate("/cart")}
        className="text-[#38342c] bg-transparent p-3 text-2xl cursor-pointer"
        aria-label="Go to cart"
      >
        <IoCartOutline />
      </button>
    </nav>
  );
};

export default OrderFormNavbar;