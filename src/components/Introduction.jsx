import React from "react";
import { useEffect, useState } from "react";
import art1Png from "../assets/FloatingImg1.PNG";
import art2Png from "../assets/FloatingImg2.PNG";
import art3Png from "../assets/FloatingImg3.PNG";
import art4Png from "../assets/FloatingImg4.PNG";
import art5Png from "../assets/FloatingImg5.PNG";
import art6Png from "../assets/FloatingImg6.PNG";
import "./Introduction.css";

function Introduction() {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const artImages = [
    art1Png,
    art2Png,
    art3Png,
    art4Png,
    art5Png,
    art6Png,
    art3Png,
    art6Png,
    art5Png,
    art1Png,
  ];

  // Initialize images on component mount
  useEffect(() => {
    const initialimages = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 1,
      direction: Math.random() * 360,
      size: 45,
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
    <>
      <div className="flex flex-col">
        {/* Title and brief description */}
        <div className="h-[45vh] bg-[#fff5fe] relative overflow-hidden">
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
          {/* Main Section */}
          <div className="relative flex flex-col items-center justify-center px-4">
            {/* Name */}
            <div className="flex justify-center items-center w-full mt-12">
              <div
                className={`flex flex-wrap justify-center items-center gap-1 sm:gap-2 transition-all duration-1000 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="barrio-regular text-m sm:text-lg md:text-xl lg:text-2xl text-[#726f68] whitespace-nowrap">
                  Welcome to
                </span>
                <div className="px-2 sm:px-4 py-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#726f68] ribeye-regular font-semibold">
                  <span>T</span>
                  <span>O</span>
                  <span>N</span>
                  <span>G</span>
                  <span>S</span>
                  <span>P</span>
                  <span>A</span>
                  <span>L</span>
                  <span>E</span>
                  <span>T</span>
                  <span>T</span>
                  <span>E</span>
                  <span>'</span>
                  <span>S</span>
                </div>
                <span className="barrio-regular text-m sm:text-lg md:text-xl lg:text-2xl text-[#726f68] whitespace-nowrap">
                  Shop!
                </span>
              </div>
            </div>
            <div
              className={`flex justify-center items-center w-full max-w-[50vw] sm:max-w-[80vw] pt-2 sm:pt-4 md:pt-6 transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center text-s sm:text-m md:text-lg md:text-xl gaegu text-[#708cce] font-light tracking-wide">
                <div className="text-animation">
                  <span>I</span>
                  <span>&nbsp;</span>
                  <span>l</span>
                  <span>o</span>
                  <span>v</span>
                  <span>e</span>
                  <span>&nbsp;</span>
                  <span>t</span>
                  <span>u</span>
                  <span>r</span>
                  <span>n</span>
                  <span>i</span>
                  <span>n</span>
                  <span>g</span>
                  <span>&nbsp;</span>
                  <span>l</span>
                  <span>i</span>
                  <span>t</span>
                  <span>t</span>
                  <span>l</span>
                  <span>e</span>
                  <span>&nbsp;</span>
                  <span>m</span>
                  <span>o</span>
                  <span>m</span>
                  <span>e</span>
                  <span>n</span>
                  <span>t</span>
                  <span>s</span>
                  <span>&nbsp;</span>
                  <span>a</span>
                  <span>n</span>
                  <span>d</span>
                  <span>&nbsp;</span>
                  <span>p</span>
                  <span>e</span>
                  <span>r</span>
                  <span>s</span>
                  <span>o</span>
                  <span>n</span>
                  <span>a</span>
                  <span>l</span>
                  <span>&nbsp;</span>
                  <span>f</span>
                  <span>a</span>
                  <span>v</span>
                  <span>s</span>
                  <span>&nbsp;</span>
                  <span>i</span>
                  <span>n</span>
                  <span>t</span>
                  <span>o</span>
                  <span>&nbsp;</span>
                  <span>d</span>
                  <span>r</span>
                  <span>a</span>
                  <span>w</span>
                  <span>i</span>
                  <span>n</span>
                  <span>g</span>
                  <span>s</span>
                  <span>&nbsp;</span>
                  <span>a</span>
                  <span>n</span>
                  <span>d</span>
                  <span>&nbsp;</span>
                  <span>c</span>
                  <span>r</span>
                  <span>a</span>
                  <span>f</span>
                  <span>t</span>
                  <span>s</span>
                  <span>!</span>
                </div>
              </div>
            </div>
            {/* Shop Now button */}
            <div
              className={`transition-all duration-1000 delay-700 mt-4 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                class="rounded-md border-1.5 border px-4 py-2 border-[#708cce] bg-[#fefbf5]
  transition-all hover:scale-125 relative hover:animate-pulse hover:text-l"
              >
                <div class="bg-sample gaegu text-[#708cce] w-full h-full flex flex-col justify-center">
                  Shop Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Introduction;
