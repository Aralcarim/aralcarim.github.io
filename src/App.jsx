import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout and Common
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import DisclaimerModal from './components/DisclaimerModal';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
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
        <Route path="/login" element={<Login />} />

        <Route
          path="/story"
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        <Route
          path="/run-of-show"
          element={
            <ProtectedRoute>
              <RunOfShow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rsvp"
          element={
            <ProtectedRoute>
              <RSVP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/travel"
          element={
            <ProtectedRoute>
              <Travel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/things-to-do"
          element={
            <ProtectedRoute>
              <ThingsToDo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/things-to-know"
          element={
            <ProtectedRoute>
              <ThingsToKnow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registry"
          element={
            <ProtectedRoute>
              <Registry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
        <DisclaimerModal />
      </Router>
    </AuthProvider>
  );
}

export default App;
