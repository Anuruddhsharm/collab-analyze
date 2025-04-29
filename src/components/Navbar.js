import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaYoutube } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#4361ee',
      padding: '1rem 2rem',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          <FaChartLine style={{ marginRight: '0.5rem' }} />
          Brand Collab Analyzer
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
