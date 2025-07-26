import React from "react";
import "./Home.css";
import Banner from "../components/Banner";
import CollectionsCarousel from "../components/CollectionsCarousel";

function Home() {
  return (
    <>
      <Banner /> 
      <CollectionsCarousel />
    </>
  );
}

export default Home;
