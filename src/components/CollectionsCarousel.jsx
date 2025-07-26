import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CollectionsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const collections = [
    {
      id: 1,
      title: "Fanart",
      description: "Anime-inspired illustrations and my artistic journey from the beginning. Exploring character design, vibrant colors, and storytelling through digital art.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Clay Experiments",
      description: "Diving into 3D art with clay sculpting. Currently exploring textures, forms, and the therapeutic process of working with my hands.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Pop Culture x Graphics",
      description: "Japanese pop culture meets relatable vibes! Featuring Smiski, Sonny Angel, and upcoming Smiffy & Chikawa designs with modern graphic elements.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop"
    }
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
    const isLeft = index === (activeIndex === 0 ? collections.length - 1 : activeIndex - 1);
    const isRight = index === (activeIndex === collections.length - 1 ? 0 : activeIndex + 1);

    if (isActive) {
      return "scale-70 z-20 opacity-100 translate-x-0";
    } else if (isLeft) {
      return "scale-55 z-10 opacity-100 -translate-x-44 md:-translate-x-50 lg:-translate-x-64";
    } else if (isRight) {
      return "scale-55 z-10 opacity-100 translate-x-44 md:translate-x-50 lg:translate-x-64";
    } else {
      return "scale-30 z-0 opacity-100 translate-x-0";
    }
  };

  const getCardDelay = (index) => {
    return `${index * 200}ms`;
  };

  return (
    <div className="pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Carousel Container */}
        <div className="flex flex-col items-center justify-center min-h-[600px]">
          {/* Cards */}
          <div className="relative w-full h-96 flex items-center justify-center">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`absolute w-48 h-64 sm:w-60 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] transition-all duration-700 ease-out cursor-pointer ${getCardStyle(index)} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  transitionDelay: isVisible ? getCardDelay(index) : '0ms',
                  animationDelay: getCardDelay(index)
                }}
                onClick={() => index !== activeIndex && setActiveIndex(index)}
              >
                <div className={`relative w-full h-full rounded-2xl overflow-hidden ${index === activeIndex ? 'group' : ''}`}>
                  {/* Background Image */}
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
                  />
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    {/* Description */}
                    {index === activeIndex && (
                      <div className="absolute bottom-5 left-0 right-0 p-6">
                        <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <p className="text-white/90 text-sm leading-relaxed mb-4">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Title below card, for all cards */}
                <div className="mt-8 text-center">
                  <h3 className={`text-[#38342c] text-xl md:text-2xl gaegu ${index === activeIndex ? '' : 'opacity-70'}`}>
                    {collection.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons BELOW the cards */}
          <div className="flex justify-center gap-6 md:mt-8 z-30">
            <button
              onClick={rotateLeft}
              className={`p-6 hover:scale-110 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <ChevronLeft className="w-6 h-6 text-[#38342c]" />
            </button>
            <button
              onClick={rotateRight}
              className={`p-6 hover:bg-white hover:scale-110 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <ChevronRight className="w-6 h-6 text-[#38342c]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCarousel;