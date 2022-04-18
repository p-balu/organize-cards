import React, { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./assests/stylesheets/LoginForm.css";
import Extract from "./console/Extract";
import LandingPage from "./console/LandingPage";

import Header from "./console/Header";
import Admin from "./console/Admin";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/extract" element={<Extract />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
