import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import Leaderboard from '../components/Leaderboard/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div>
      <Navbar />
      <Leaderboard />
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
