import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter'

ReactDOM.render((
   <BrowserRouter basename={process.env.PUBLIC_URL}>
     <App />
   </BrowserRouter>
), ...)  

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import Dashboard from './pages/Dashboard';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import './App.scss';

const App = () => {
  return (
    <Router basename="/MetaPiX">
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
