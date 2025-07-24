import React from "react";
import { useContext, useEffect, useState } from "react";
import RabbitImg from "../assets/Rabbit.png";
import { ShopContext } from "../context/ShopContext";

function CartEmpty() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { navigate } =
    useContext(ShopContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#c3c7d1]">
      <img
        src={RabbitImg}
        alt="Rabbit Img"
        className={`pt-12 md:w-50 md:h-50 w-40 h-40 object-contain mb-2 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
      <h2
        className={`md:text-2xl text-xl gaegu text-[#38342c] mb-2 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        Your cart is empty
      </h2>
      <p
        className={`gaegu text-[#38342c] mb-4 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        Looks like you haven't added anything yet
      </p>
      <button
        onClick={() => navigate("/product")}
        className={`px-8 py-3 text-sm ribeye-regular bg-[#38342c] text-[#fffcf6] active:bg-[#726f68] transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        Shop Now
      </button>
    </div>
  );
}

export default CartEmpty;
