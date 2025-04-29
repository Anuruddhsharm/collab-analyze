import React, { useState } from 'react';
import config from '../config';
import { FaCog, FaCheck } from 'react-icons/fa';

const BackendConfig = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [backendUrl, setBackendUrl] = useState(config.getBackendUrl());

  const saveConfig = () => {
    config.setBackendUrl(backendUrl);
    setShowConfig(false);
    window.location.reload(); // Refresh to ensure all components use the new URL
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {showConfig ? (
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '300px'
        }}>
          <h4 style={{ marginTop: 0 }}>Backend Configuration</h4>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Backend URL:</label>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
              placeholder="https://your-backend-url"
            />
          </div>
          <button
            onClick={saveConfig}
            style={{
              backgroundColor: '#4361ee',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaCheck /> Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConfig(true)}
          style={{
            backgroundColor: '#4361ee',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
          title="Configure backend"
        >
          <FaCog size={20} />
        </button>
      )}
    </div>
  );
};

export default BackendConfig;
