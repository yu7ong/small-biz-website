import React from "react";
import "./Collections.css";
import CollectionImg1 from "../assets/Collection1.png";
import CollectionImg2 from "../assets/Collection2.png";
import Poster1 from "../assets/collection_fanart_poster.jpg";
import Poster2 from "../assets/placeholder1.JPG";

const Collections = () => {
  return (
    <>
      <div class="overflow-hidden bg-[#fefbf5] py-3">
        <div class="marquee-content flex items-center animate-marquee">
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg1} alt="1" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg2} alt="2" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg1} alt="1" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg2} alt="2" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg1} alt="1" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg2} alt="2" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg1} alt="1" class="h-12 sm:h-16 w-auto" />
          </div>
          <div class="px-2 py-2 flex-shrink-0">
            <img src={CollectionImg2} alt="2" class="h-12 sm:h-16 w-auto" />
          </div>
        </div>
      </div>

      {/* Main collections section with improved styling */}
      <div class="py-8 bg-[#d5eae3]">
        <div class="flex flex-col md:flex-row items-center gap-8 px-8">
          {/* Left section - Text (1/4 of screen on desktop) */}
          <div class="w-full md:w-1/4 text-center md:text-left">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Click to view my collections
            </h2>
            <p class="text-gray-600">
              Discover curated pieces from our featured collections
            </p>
          </div>
          <div class="flex justify-center items-center gap-12 sm:gap-20 md:gap-28 lg:gap-48 md:gap-24 px-8">
            <div class="group transform transition-all duration-300 hover:scale-105">
              <div class="relative overflow-hidden rounded-lg">
                <img
                  src={Poster1}
                  alt="Collection 1"
                  class="w-64 h-80 md:w-96 md:h-64 object-cover"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="text-xl gaegu text-[#38342c]">Fanart</h3>
              </div>
            </div>

            <div class="group transform transition-all duration-300 hover:scale-105">
              <div class="relative overflow-hidden rounded-lg">
                <img
                  src={Poster2}
                  alt="Collection 2"
                  class="w-64 h-80 md:w-96 md:h-64 object-cover"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="text-xl gaegu text-[#38342c]">New Collection</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
