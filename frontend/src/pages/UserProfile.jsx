import React, { useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Profile/Profile';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; //transition effect

const UserProfile = () => {
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
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log('user', user);
    if (user == null) {
      navigate('/auth');
    }
  }, []);
  return user == null ? (
    <div>Loading....</div>
  ) : (
    <motion.div
      variants={slideInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      <Navbar />
      <Profile />
      <Footer />
    </motion.div>
  );
};

export default UserProfile;
