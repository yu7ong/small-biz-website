import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === id);
    if (foundProduct) {
      setProductData(foundProduct);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  return productData ? (
    <div className="sm:pl-10 border-t-4 pt-30 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*Product images*/}
        <div className="w-full sm:w-[65%] flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:justify-normal gap-2 sm:gap-0 justify-start sm:justify-normal sm:w-[18.7%] w-full">
            {/*Main image and variant images*/}
            <img
              onClick={() => setSelectedIndex(null)}
              src={productData.image}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                selectedIndex === null ? "border-2 border-[#e8d782]" : ""
              }`}
              alt="Main"
              title="Main image (not selectable)"
            />
            {productData.variants.map((item, index) => {
              const isOut = item.stock === 0;

              return (
                <div
                  key={index}
                  className="relative w-[24%] sm:w-full sm:mb-3 flex-shrink-0"
                >
                  <img
                    onClick={() => setSelectedIndex(index)}
                    src={item.image}
                    key={index}
                    className={`w-full cursor-pointer ${
                      selectedIndex === index ? "border-2 border-[#e8d782]" : ""
                    } ${isOut ? "drop-shadow-lg" : ""}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full sm:w-[80%] relative">
            {/*Central Image*/}
            <img
              className={`w-full h-auto ${selectedIndex !== null && productData.variants[selectedIndex]?.stock === 0
                  ? "filter greyscale brightness-75 scale-100"
                  : ""}`}
              src={
                selectedIndex == null
                  ? productData.image
                  : productData.variants[selectedIndex].image
              }
              alt=""
            />
            {selectedIndex !== null &&
              productData.variants[selectedIndex].stock === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center ">
                  <h3 className="text-white ribeye-regular font-semibold text-2xl mb-2 gaegu">
                    Out of Stock
                  </h3>
                  <div className="w-16 h-0.5 bg-white opacity-70 drop-shadow-sm"></div>
                </div>
              )}
          </div>
        </div>
        {/* Product Info */}
        <div className="pl-2 sm:w-[35%]">
          <h1 className="font-medium text-[#38342c] ribeye-regular text-2xl mt-2">
            {productData.name}
          </h1>
          <p className="font-medium text-[#38342c] gaegu">
            {"$" + productData.price}
          </p>
          <p className="mt-5 text-[#aaaaaa] gaegu md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-[#38342c] gaegu"> Select Item </p>
            <div className="flex gap-2">
              {productData.variants.map((item, index) => {
                return (
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className={`py-2 px-4 font-lg text-[#38342c] gaegu ${
                      index === selectedIndex ? "bg-[#e8d782]" : "bg-[#e8cace]"
                    }`}
                    key={index}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Quantity Input Section */}
          <div className="flex flex-col gap-4 my-8">
            <p>Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 border border-[#e8cace] hover:bg-[#e8cace] transition-colors duration-200 flex items-center justify-center text-[#38342c] font-medium"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-16 h-10 text-center border border-[#e8cace] text-[#38342c] font-medium gaegu focus:outline-none focus:border-[#e8d782]"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 border border-[#e8cace] hover:bg-[#e8cace] transition-colors duration-200 flex items-center justify-center text-[#38342c] font-medium"
              >
                +
              </button>
            </div>
          </div>
          <button
            disabled={selectedIndex === null || productData.variants[selectedIndex].stock === 0}
            onClick={() =>
              addToCart(
                productData._id,
                productData.name,
                productData.variants[selectedIndex]._id,
                productData.variants[selectedIndex].name,
                quantity
              )
            }
            className={`px-8 py-3 text-sm ribeye-regular ${
              selectedIndex === null
                ? "bg-gray-400 cursor-not-allowed text-white"
                : productData.variants[selectedIndex].stock === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#38342c] text-[#fffcf6] active:bg-[#726f68]"
            }`}
          >
            {selectedIndex === null 
              ? "SELECT VARIANT" 
              : productData.variants[selectedIndex]?.stock === 0 
              ? "OUT OF STOCK" 
              : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
