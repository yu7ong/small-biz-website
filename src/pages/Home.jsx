import React from "react";
import Hero from "../components/Hero";
import "./Home.css";
import Introduction from "../components/Introduction";
import Collections from "../components/Collections";

function Home() {
  return (
    <>
      <Introduction /> 
      <Collections /> 
    </>
  );
}

export default Home;
