import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Calendar from './pages/Calendar';
import LeaderboardPage from './pages/LeaderboardPage';

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import StudyWithMe from './components/StudyWithMe/StudyWithMe';
import StudyRoom from './components/StudyWithMe/StudyRoom';

library.add(fab, faCheckSquare, faCoffee);

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route exact path="/studywithme" element={<StudyWithMe />} />
          <Route path="/studywithme/:token" element={<StudyRoom />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
