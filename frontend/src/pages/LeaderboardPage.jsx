import React, { useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import { useNavigate } from 'react-router-dom';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log('user', user);
    if (user == null) {
      navigate('/auth');
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Leaderboard />
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
