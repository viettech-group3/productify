import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import LeaderboardPage from './pages/LeaderboardPage';
import UserProfile from './pages/UserProfile';

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import StudyWithMePage from './pages/StudyWithMePage';
import StudyRoom from './components/StudyWithMe/StudyRoom';
import 'react-aspect-ratio/aspect-ratio.css';
import ResetPasswordPage from './pages/ResetPawword';

library.add(fab, faCheckSquare, faCoffee);

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgotpassword" element={<ResetPasswordPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route exact path="/studywithme" element={<StudyWithMePage />} />
          <Route path="/studywithme/:token" element={<StudyRoom />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
