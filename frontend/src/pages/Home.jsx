import React from 'react';
import Navbar from '../components/Header/Navbar';
import HeroSection from '../components/Home/HeroSection';
import MissionDiv from '../components/ContentDiv/MissionDiv';
import TeamDiv from '../components/ContentDiv/TeamDiv';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection>HeroSection</HeroSection>
      <TeamDiv />
      <MissionDiv />
      <Footer />
    </div>
  );
};

export default Home;
