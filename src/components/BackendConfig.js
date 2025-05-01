import React, { useState } from 'react';
import config from '../config';
import { FaCog, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const BackendConfig = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [backendUrl, setBackendUrl] = useState(config.getBackendUrl());

  const saveConfig = () => {
    try {
      config.setBackendUrl(backendUrl);
      setShowConfig(false);
      toast.success('Backend URL updated successfully');
    } catch (error) {
      toast.error('Failed to save backend URL');
    }
  };

  return (
    <div className="backend-config">
      {showConfig ? (
        <div className="config-modal">
          <h4>Backend Configuration</h4>
          <div className="input-group">
            <label>Backend URL:</label>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              placeholder="https://your-backend-url.com"
            />
          </div>
          <button onClick={saveConfig} className="btn-save">
            <FaCheck /> Save
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowConfig(true)}
          className="btn-config"
          title="Configure backend"
        >
          <FaCog size={20} />
        </button>
      )}

      <style jsx>{`
        .backend-config {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .config-modal {
          background-color: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          width: 300px;
        }
        
        .input-group {
          margin-bottom: 1rem;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .input-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .btn-save {
          background-color: #4361ee;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-config {
          background-color: #4361ee;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BackendConfig;
