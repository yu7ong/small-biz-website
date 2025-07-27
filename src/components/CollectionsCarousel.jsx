import React, { useState, useEffect, useContext } from "react";
import CollectionImg1 from "../assets/CollectionImg1.png";
import CollectionImg2 from "../assets/CollectionImg2.png";
import CollectionImg3 from "../assets/CollectionImg3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const CollectionsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const { navigate } = useContext(ShopContext);

  const collections = [
    {
      id: 1,
      title: "Clay Collection",
      description:
        "Handmade hairpins, necklaces and more, crafted with polymer and resin clay. I'm still learning and experimenting, so every piece is part of that process: soft, dreamy, and made with care.",
      image: CollectionImg2,
    },

    {
      id: 2,
      title: "Fanart Collection",
      description:
        "A collection of fanart inspired by the anime and manga I grew up with, the shows that made me fall in love with drawing and started this whole journey.",
      image: CollectionImg1,
    },
    {
      id: 3,
      title: "Pop Culture Series",
      description:
        "Fun little pieces inspired by the characters and shows we love, playful takes on how they’d show up in our everyday lives.",
      image: CollectionImg3,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const rotateLeft = () => {
    setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const rotateRight = () => {
    setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const isLeft =
      index === (activeIndex === 0 ? collections.length - 1 : activeIndex - 1);
    const isRight =
      index === (activeIndex === collections.length - 1 ? 0 : activeIndex + 1);

    if (isActive) {
      return "scale-70 z-20 opacity-100 translate-x-0";
    } else if (isLeft) {
      // Hide on small screens, increase spacing on larger screens
      return "hidden lg:block scale-55 z-10 opacity-100 -translate-x-44 md:-translate-x-72 lg:-translate-x-96";
    } else if (isRight) {
      // Hide on small screens, increase spacing on larger screens
      return "hidden lg:block scale-55 z-10 opacity-100 translate-x-44 md:translate-x-72 lg:translate-x-96";
    } else {
      return "hidden";
    }
  };

  const getCardDelay = (index) => {
    return `${index * 200}ms`;
  };

  return (
    <div className="sm:pt-2 md:pt-4 lg:pt-8 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Carousel Container */}
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] relative">
          {/* Cards */}
          <div className="relative w-full h-96 flex items-center justify-center">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`absolute w-auto h-78 sm:h-96 md:h-110 lg:h-[28rem] transition-all duration-700 ease-out cursor-pointer ${getCardStyle(
                  index
                )} ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                  transitionDelay: isVisible ? getCardDelay(index) : "0ms",
                  animationDelay: getCardDelay(index),
                }}
                onClick={() => index !== activeIndex && setActiveIndex(index)}
              >
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden ${
                    index === activeIndex ? "group" : ""
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
                  />
                  {/* Gradient Overlay on hover for center card */}
                  {index === activeIndex && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100 z-10"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0) 80%)",
                      }}
                    />
                  )}
                  {/* Overlay Content */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white transition-all duration-500 z-20`}
                  >
                    {/* Description */}
                    {index === activeIndex && (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-[#9478BB] gaegu text-base text-lg sm:text-xl md:text-2xl px-8 py-2">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Title below card, for all cards */}
                <div className="mt-8 text-center">
                  <h3
                    className={`text-[#9478BB] ribeye-regular text-xl md:text-2xl ${
                      index === activeIndex ? "" : "opacity-70"
                    }`}
                  >
                    {collection.title}
                  </h3>
                </div>
              </div>
            ))}
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-30">
              <button
                onClick={rotateLeft}
                className={`pointer-events-auto p-4 hover:scale-110 transition-all duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-[#9478BB]" />
              </button>
              <button
                onClick={rotateRight}
                className={`pointer-events-auto p-4 hover:scale-110 transition-all duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-[#9478BB]" />
              </button>
            </div>
          </div>
          {/* Shop Now button */}
          <div
            className={`transition-all duration-1000 delay-700 mt-2 sm:mt-6 md:mt-10 lg:mt-12 flex justify-center ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              className="md:py-2 md:px-6 py-1 px-4 bg-[#9478BB]
                transition-all hover:scale-105 relative hover:animate-pulse hover:text-lg"
            >
              <div className="ribeye-regular text-sm md:text-lg text-white w-full h-full flex flex-col justify-center items-center" onClick={() => navigate("/product")}>
                Shop Now
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;
