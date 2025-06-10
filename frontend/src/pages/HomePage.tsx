import React from 'react';
import { Link } from 'react-router-dom';
import TrendingNFTs from '../components/TrendingNFTs';
import CreatorLeaderboard from '../components/CreatorLeaderboard';
import './HomePage.scss';

const HomePage = () => {
  return (
    <Route exact path='/' render= ... />} />
    <div className="home-container">
      <header className="home-header">
        <img src="/assets/logo.png" alt="MetaPiX Logo" className="logo" />
        <h1>Welcome to MetaPiX</h1>
        <p className="subtitle">An NFT Marketplace powered by the Pi Network</p>
        <div className="cta-buttons">
          <Link to="/explore" className="btn">Explore NFTs</Link>
          <Link to="/dashboard" className="btn secondary">My Dashboard</Link>
        </div>
      </header>

      <section className="home-trending-section">
        <TrendingNFTs />
        <CreatorLeaderboard />
      </section>
    </div>
  );
};

export default HomePage;
