import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <span>|</span>
        <Link to="/terms">Terms of Service</Link>
      </div>
      <p className="footer-copy">© 2025 MetaPiX. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
