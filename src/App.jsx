import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";
import AboutPage from "./components/pages/AboutPage";
import DiscoverEvent from "./components/pages/DiscoverEvent";
import ContactPage from "./components/pages/ContactPage";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import ProfilePage from "./components/pages/ProfilePage";
import EventDetails from "./components/pages/EventDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/discover" element={<DiscoverEvent />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          {/* Auth */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
