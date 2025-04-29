import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          YouTube Brand Monitor
        </Link>
        <div className="navbar-links">
          <a 
            href="https://github.com/yourusername/youtube-brand-monitoring" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-link"
          >
            GitHub
          </a>
          <a 
            href="https://colab.research.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-link"
          >
            Google Colab
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
