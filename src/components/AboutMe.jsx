import React from "react";
import { Instagram } from "lucide-react";
import ProfileImg from "../assets/ProfileImg.PNG";
import FooterImg from "../assets/FooterImg.png";

function AboutMe() {
  return (
    <div className="min-h-[350px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] bg-[#fff5fe] flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-10">
        {/* Profile Image */}
        <div className="w-12 h-auto sm:w-16 md:w-20 lg:w-24 pt-6">
          <img src={ProfileImg} />
        </div>
        {/* Title */}
        <div className="max-w-2xl sm:pt-4 text-center">
          <p className="gaegu text-[#38342] text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
            {" "}
            ABOUT ME{" "}
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl pt-2 pb-8 text-center">
          <p className="gaegu px-4 text-sm sm:text-base md:text-base gaegu text-[#38342c] leading-relaxed">
            Hi! I love all things shiny, pastel, and a little bit magical. My
            art is inspired by what I enjoy most — from cute and Y2K aesthetics
            to fantasy stories and dreamy worlds. Whether it’s fanart or clay
            crafts, I’m always exploring new ways to bring those ideas to life.
            Thanks for being here!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-2 px-6">
        <div className="max-w-6xl mx-auto flex items-center">
          {/* Brand Logo/Image - Left */}
          <div className="flex-shrink-0 w-24 flex items-center justify-center">
            <img
              src={FooterImg}
              alt="Brand Logo"
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>

          {/* Contact Email - Center */}
          <div className="flex-grow flex flex-col items-center">
            <p className="text-sm text-gray-500 gaegu mb-1">Contact</p>
            <a
              href="mailto:tongspalette@gmail.com"
              className="text-[#38342] gaegu hover:text-[#9478BB] transition-colors"
            >
              tongspalette@gmail.com
            </a>
          </div>

          {/* Social Media - Right */}
          <div className="flex-shrink-0 w-32 flex flex-col items-center">
            <p className="text-sm text-gray-500 gaegu mb-2 text-center">Follow Me</p>
            <a
              href="https://instagram.com/tongspalette/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#38342] hover:text-[#9478BB]"
            >
              <Instagram size={24} />
              <span className="ml-2 text-sm gaegu">IG</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutMe;
