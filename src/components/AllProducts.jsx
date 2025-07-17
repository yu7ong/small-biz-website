import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { GoTriangleRight } from "react-icons/go";
import ProductItem from "./ProductItem";

const AllProducts = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [... prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0 ) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    setFilterProducts(productsCopy)
  }
    
  useEffect(() => {
    setFilterProducts(products);
  }, [products] );

  useEffect(() => 
    applyFilter()
  , [category, products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-transparent pl-4 sm:pl-10">
      {/*filter options*/}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 ribeye-regular text-[#38342c]"
        >
          Filter
          <GoTriangleRight
            className={`h-3 text-[#d3bf5d] sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>
        <div
          className={`pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="flex flex-col gap-2 text-medium gaegu text-[#38342c]">
            <p className="flex gap-2">
              <input className="w-3 accent-[#dbb8bb]" type="checkbox" value={"Sticker"} onChange={toggleCategory}/>{" "}
              Sticker
            </p>
            <p className="flex gap-2">
              <input className="w-3 accent-[#dbb8bb]" type="checkbox" value={"Print"} onChange={toggleCategory}/> Print
            </p>
            <p className="flex gap-2">
              <input className="w-3 accent-[#dbb8bb]" type="checkbox" value={"Necklace"} onChange={toggleCategory}/>{" "}
              Necklace
            </p>
            <p className="flex gap-2">
              <input className="w-3 accent-[#dbb8bb]" type="checkbox" value={ "Accessories"} onChange={toggleCategory}/>{" "}
              Accessories
            </p>
          </p>
        </div>
      </div>

      {/* Right side*/}
      <div className="flex-1">
        {/*Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 fap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} variants={item.variants}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
