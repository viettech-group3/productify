import React from "react";
import Navbar from "../components/Header/Navbar";
import HeroSection from "../components/Home/HeroSection";
import Div1 from "../components/AboutUs/Div1";
import Div2 from "../components/AboutUs/Div2";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>HeroSection</HeroSection>
      <Div2/>
      <Div1/>
      <Footer/>
    </div>
  );
};

export default Home;
