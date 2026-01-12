import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout and Common
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import DisclaimerModal from './components/DisclaimerModal';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';

import RunOfShow from './pages/RunOfShow';
import RSVP from './pages/RSVP';
import FAQ from './pages/FAQ';
import Gallery from './pages/Gallery';
import Travel from './pages/Travel';
import ThingsToDo from './pages/ThingsToDo';
import ThingsToKnow from './pages/ThingsToKnow';
import Registry from './pages/Registry';
import Contact from './pages/Contact';
import Map from './pages/Map';
import Admin from './pages/Admin';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />

        <Route path="/events" element={<RunOfShow />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route path="/things-to-know" element={<ThingsToKnow />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <AnimatedRoutes />
      </main>
      <Footer />
      <DisclaimerModal />
    </Router>
  );
}

export default App;
