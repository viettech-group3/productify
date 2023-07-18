import React, { useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Profile/Profile';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
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
    <div>
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
};

export default UserProfile;
