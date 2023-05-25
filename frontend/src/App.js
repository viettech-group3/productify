import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";

function App() {
  return (
    <ChakraProvider>
      <Router>
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
