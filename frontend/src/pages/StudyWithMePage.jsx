import React, { useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import StudyWithMe from '../components/StudyWithMe/StudyWithMe';
import { useNavigate } from 'react-router-dom';

const StudyWithMePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user == null) {
      navigate('/auth');
    }
  }, []);

  return (
    <div>
      <Navbar />
      {user && <StudyWithMe />}
      <Footer />
    </div>
  );
};

export default StudyWithMePage;
