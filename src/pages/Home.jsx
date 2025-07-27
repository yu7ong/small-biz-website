import React from "react";
import Banner from "../components/Banner";
import CollectionsCarousel from "../components/CollectionsCarousel";
import Collections from "../components/Collections";
import AboutMe from "../components/AboutMe";

function Home() {
  return (
    <>
      <Banner /> 
      <CollectionsCarousel />
      <AboutMe/>
    </>
  );
}

export default Home;
