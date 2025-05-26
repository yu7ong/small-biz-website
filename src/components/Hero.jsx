import React from 'react'
import HeroImg from "../assets/HeroImg.JPG";

function Hero() {
  return (
    <div>
      <section id="home" className="w-screen flex justify-center items-center overflow-hidden">
      <img
        src={HeroImg}
        alt="Hero"
      />
    </section>
    </div>
  )
}

export default Hero
