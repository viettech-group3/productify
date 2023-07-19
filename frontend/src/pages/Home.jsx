import React from 'react';
import Navbar from '../components/Header/Navbar';
import HeroSection from '../components/Home/HeroSection';
import MissionDiv from '../components/ContentDiv/MissionDiv';
import TeamDiv from '../components/ContentDiv/TeamDiv';
import Footer from '../components/Footer/Footer';
import { useSession } from '@supabase/auth-helpers-react';

const Home = () => {
  const session = useSession();
  console.log('session', session);
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
