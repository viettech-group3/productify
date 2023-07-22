import React from 'react';
import Navbar from '../components/Header/Navbar';
import HeroSection from '../components/Home/HeroSection';
import MissionDiv from '../components/ContentDiv/MissionDiv';
import TeamDiv from '../components/ContentDiv/TeamDiv';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion'; //transition effect

const Home = () => {
  const slideInVariants = {
    //transition effect
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const transition = {
    duration: 1.8, // Adjust the duration to control how long the animation takes
    ease: 'easeInOut', // Use different easing functions for different effects
  };

  return (
    <motion.div
      variants={slideInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      <Navbar />
      <HeroSection>HeroSection</HeroSection>
      <TeamDiv />
      <MissionDiv />
      <Footer />
    </motion.div>
  );
};

export default Home;
