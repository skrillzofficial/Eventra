import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage'
import AboutPage from './components/pages/AboutPage'
import DiscoverEvent from './components/pages/DiscoverEvent'
import ContactPage from './components/pages/ContactPage'


function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/discover" element={<DiscoverEvent/>} />
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
