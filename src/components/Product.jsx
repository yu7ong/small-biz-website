import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === id);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedIndex(0);
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
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setSelectedIndex(index)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={productData.image[selectedIndex]}
              alt=""
            />
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
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSelectedIndex(index)}
                  className={`py-2 px-4 font-lg text-[#38342c] gaegu ${
                    index === selectedIndex ? "bg-[#e8d782]" : "bg-[#e8cace]"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
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
            disabled={productData.stock === 0}
            onClick={() =>
              addToCart(
                productData._id,
                productData.name,
                selectedIndex,
                quantity
              )
            }
            className={`px-8 py-3 text-sm ribeye-regular ${
              productData.stock === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#38342c] text-[#fffcf6] active:bg-[#726f68]"
            }`}
          >
            {productData.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
