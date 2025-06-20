import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, stock }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = stock === 0;

  return (
    <Link className="text-[#38342c] cursor-pointer" to={`/product/${id}`}>
      <div
        className="relative overflow-hidden aspect-square"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isOutOfStock
              ? "filter greyscale brightness-75 scale-100"
              : "hover:scale-110 group-hover:brightness-110"
          }`}
          src={image[0]}
          alt={name}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main overlay content */}
            <div
              className={`relative z-10 text-center px-4 transition-all duration-300 ${
                isHovered
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              <h3 className="text-white ribeye-regular font-semibold text-lg mb-1 gaegu drop-shadow-lg">
                Out of Stock
              </h3>
              <div className="w-8 h-0.5 bg-white mx-auto opacity-70 drop-shadow-sm"></div>
            </div>

            {/* Hover message */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? "opacity-100 transform scale-100"
                  : "opacity-0 transform scale-105"
              }`}
            >
              <div className="text-center max-w-[80%]">
                <p className="text-white text-s leading-relaxed gaegu drop-shadow-lg">
                  We are currently working on restocking
                  <br />
                  <span className="font-medium text-white">
                    Check back soon!
                  </span>
                </p>
                <div className="mt-2 flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse drop-shadow-sm"></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-pulse drop-shadow-sm"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-pulse drop-shadow-sm"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="text-[#38342c] gaegu pt-3 pb-1 text-sm"> {name}</p>
      <p className="text-[#38342c] gaegu text-sm font-medium ">
        {" "}
        {"$"}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
