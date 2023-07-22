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
    initial: { x: -500, opacity: 0.4 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };
  const transition = {
    duration: 1.4, // Adjust the duration to control how long the animation takes
    ease: 'easeInOut', // Use different easing functions for different effects
  };

  const smallComponentSlideInVariants = {
    initial: { y: 500, opacity: 0.2 },
    animate: { y: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const smallComponentsTransition = {
    duration: 1.2, // Adjust the duration to control how long the animation takes
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
      <motion.div
        variants={smallComponentSlideInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={smallComponentsTransition}
      >
        <HeroSection>HeroSection</HeroSection>
        <TeamDiv />
        <MissionDiv />
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default Home;
