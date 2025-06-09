import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage'; // Optional placeholder
import Dashboard from './pages/Dashboard';     // Optional placeholder
import TermsPage from './pages/TermsPage';     // To display ToS
import PrivacyPage from './pages/PrivacyPage'; // To display Privacy Policy
import Footer from './components/Footer';      // Footer component
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
