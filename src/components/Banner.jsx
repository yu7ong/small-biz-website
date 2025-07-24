import React, { useState, useEffect } from "react";
import BannerImg1 from "../assets/BannerImg1.png";
import BannerImg2 from "../assets/BannerImg2.png";
import BannerFont1 from "../assets/BannerFont1.png";
import BannerFont2 from "../assets/BannerFont2.png";
import BannerFloatingImg from "../assets/BannerFloatingImg.png";

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const artImages = [
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
    BannerFloatingImg,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Initialize images on component mount
  useEffect(() => {
    const initialimages = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 1,
      direction: Math.random() * 360,
      size: Math.random() * 45,
      src: artImages[i],
    }));
    setImages(initialimages);

    // Give it sometime to load
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Animate images continuously
  useEffect(() => {
    const animateimages = () => {
      setImages((previmages) =>
        previmages.map((img) => {
          const radians = (img.direction * Math.PI) / 180; //Converts images direction from degrees to radians
          let newX = img.x + Math.cos(radians) * img.speed * 0.5; // How much it moves horizontally
          let newY = img.y + Math.sin(radians) * img.speed * 0.5; // How much it moves vertically

          let newDirection = img.direction;
          if (newX <= 0 || newX >= 95) {
            newX = Math.max(0, Math.min(95, newX));
            newDirection = 180 - newDirection + (Math.random() * 5 - 5);
          }
          if (newY <= 0 || newY >= 95) {
            newY = Math.max(0, Math.min(95, newY));
            newDirection = -newDirection + (Math.random() * 5 - 5);
          }

          newDirection = (newDirection + 360) % 360;
          return {
            ...img,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        })
      );
    };

    const interval = setInterval(animateimages, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-1 sm:px-8 bg-[#fff5fe]">
      {/* Top Left Image */}
      <div
        className={`absolute top-8 left-0 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-60 sm:w-80 md:w-120 h-auto flex items-center justify-center">
          <img src={BannerImg2} alt="Banner Image 1" />
        </div>
      </div>

      {/* Top Right Image */}
      <div
        className={`absolute top-20 right-0 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={isLoaded ? { animation: "bounce 0.6s ease-in-out" } : {}}
      >
        <div className="w-45 sm:w-65 md:w-85 h-auto flex items-center justify-center">
          <img src={BannerImg1} alt="Banner Image 2" />
        </div>
      </div>

      {/* Main Content - Centered Text Stack */}
      <div className="flex flex-col items-center justify-center pt-6 sm:pt-10 space-y-1 max-w-md mx-auto">
        {/* First Font Image */}
        <div
          className={`flex flex-wrap justify-center w-16 sm:w-20 md:w-24 lg:w-32 h-auto items-center gap-0.5 sm:gap-1 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img src={BannerFont2} alt="Banner Font 1" />
        </div>

        {/* Second Font Image */}
        <div
          className={`flex flex-wrap justify-center w-40 sm:w-48 md:w-64 lg:w-72 xl:w-80 h-auto items-center transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img src={BannerFont1} alt="Banner Font 2" />
        </div>

        {/* Gaegu Font Text */}
        <div
          className={`flex flex-wrap justify-center items-center gap-1 sm:gap-2 transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-base sm:text-lg md:text-xl gaegu text-[#38342c] leading-relaxed max-w-prose mx-auto px-4">
              I love turning little moments and personal favs into drawings and
              crafts!
            </div>
          </div>
        </div>
      </div>
      {/* Flying images */}
      {images.map((img) => (
        <div
          key={img.id}
          className={`absolute transition-all duration-300`}
          style={{
            left: `${Math.max(0, Math.min(95, img.x))}%`,
            top: `${Math.max(0, Math.min(95, img.y))}%`,
            width: `${Math.max(2, img.size * 0.1)}vw`,
            height: `${Math.max(2, img.size * 0.1)}vw`,
            fontSize: `${Math.max(2, img.size * 0.1)}vw`,
            zIndex: 10,
          }}
        >
          <img
            src={img.src}
            alt="Flowing art"
            style={{
              width: `${Math.max(2, img.size * 0.1)}vw`,
              height: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
