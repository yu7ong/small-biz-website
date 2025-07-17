import React from "react";
import "./Collections.css";
import CollectionImg1 from "../assets/Collection1.png";
import CollectionImg2 from "../assets/Collection2.png";

const Collections = () => {
  return (
<div class="overflow-hidden bg-[#fefbf5]">
  <div class="marquee-content flex items-center animate-marquee">
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg1} alt="1" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg2} alt="2" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg1} alt="1" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg2} alt="2" class="h-16 w-auto" />
    </div>

    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg1} alt="1" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg2} alt="2" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg1} alt="1" class="h-16 w-auto" />
    </div>
    <div class="px-2 py-2 flex-shrink-0">
      <img src={CollectionImg2} alt="2" class="h-16 w-auto" />
    </div>
  </div>
</div>
  );
};

export default Collections;
