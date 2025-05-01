import React, { useState } from 'react';
import axios from 'axios';
import AnalysisResults from './AnalysisResults';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const AnalysisForm = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');

  const analyzeVideo = async (e) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // First verify the URL format
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL. Please enter a valid URL.');
      }

      // Call your backend API
      const response = await axios.post(
        'http://localhost:5000/analyze', 
        { video_url: youtubeUrl },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000 // 30 seconds timeout
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setResults(response.data);
      setVideoTitle(response.data.video_title || '');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to analyze video. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to extract video ID
  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^\?&\"'>]+)/,
      /(?:youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=)([^\?&\"'>]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1].substring(0, 11);
    }
    return null;
  };

  return (
    <div className="analysis-container">
      <form onSubmit={analyzeVideo} className="analysis-form">
        <h2>YouTube Brand Collaboration Analyzer</h2>
        
        <div className="input-group">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            required
          />
          <button 
            type="submit" 
            disabled={isLoading || !youtubeUrl}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner" />
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <FaExclamationTriangle />
            <p>{error}</p>
          </div>
        )}
      </form>

      {isLoading && (
        <div className="loading-overlay">
          <FaSpinner className="spinner" />
          <p>Analyzing video comments...</p>
        </div>
      )}

      {results && (
        <AnalysisResults 
          results={results} 
          videoTitle={videoTitle} 
          error={error} 
        />
      )}

      <style jsx>{`
        .analysis-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .analysis-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        
        h2 {
          margin-top: 0;
          color: #1a365d;
          text-align: center;
        }
        
        .input-group {
          display: flex;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }
        
        input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        button {
          padding: 0.75rem 1.5rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        }
        
        button:hover {
          background: #3182ce;
        }
        
        button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
        
        button.loading {
          background: #a0aec0;
        }
        
        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e53e3e;
          background: #fff5f5;
          padding: 0.75rem;
          border-radius: 4px;
          margin-top: 1rem;
        }
        
        .loading-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          background: rgba(255,255,255,0.9);
          border-radius: 8px;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AnalysisForm;
