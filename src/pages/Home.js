import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import BrandSelector from '../components/BrandSelector';
import AnalysisResults from '../components/AnalysisResults';
import ReportGenerator from '../components/ReportGenerator';
import './Home.css';

const Home = ({ backendUrl, setBackendUrl }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([
    'nike', 'adidas', 'apple', 'samsung', 'google', 'microsoft'
  ]);

  const analyzeVideo = async () => {
    if (!backendUrl) {
      setError('Please enter your backend URL');
      return;
    }

    if (!videoUrl) {
      setError('Please enter a YouTube video URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        // Filter comments by selected brands
        const filteredResults = {
          ...data,
          results: data.results.filter(comment =>
            comment.brands.some(brand => selectedBrands.includes(brand))
          )
        };
        setAnalysisData(filteredResults);
      } else {
        setError(data.error || 'Failed to analyze video');
      }
    } catch (err) {
      setError('Failed to connect to backend');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />

      <div className="config-section">
        <h2>Backend Configuration</h2>
        <div className="input-group">
          <label>Backend URL:</label>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder="https://your-backend-url"
          />
        </div>
      </div>

      <div className="main-content">
        <h1>🔥 Ultimate Brand Collab Analyzer</h1>
        <p>Analyze YouTube comments for brand collaboration potential</p>

        <div className="input-section">
          <div className="input-group">
            <label>YouTube Video URL:</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <BrandSelector 
            selectedBrands={selectedBrands} 
            setSelectedBrands={setSelectedBrands} 
          />

          <button 
            onClick={analyzeVideo} 
            disabled={isLoading}
            className="analyze-btn"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {analysisData && (
          <>
            <div className="summary-section">
              <h2>Analysis Summary: {analysisData.video_title}</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Comments Analyzed</h3>
                  <p>{analysisData.comments_analyzed}</p>
                </div>
                <div className="stat-card">
                  <h3>Brand Mentions</h3>
                  <p>{analysisData.brand_mentions} ({((analysisData.brand_mentions / analysisData.comments_analyzed) * 100).toFixed(1)}%)</p>
                </div>
                <div className="stat-card">
                  <h3>Positive Sentiment</h3>
                  <p>{analysisData.positive_sentiment} ({((analysisData.positive_sentiment / analysisData.comments_analyzed) * 100).toFixed(1)}%)</p>
                </div>
                <div className="stat-card">
                  <h3>Avg Engagement</h3>
                  <p>{(analysisData.avg_engagement * 100).toFixed(1)}%</p>
                </div>
              </div>

              {analysisData.top_brands?.length > 0 && (
                <div className="top-brands">
                  <h3>Top Brands Mentioned</h3>
                  <div className="brand-tags">
                    {analysisData.top_brands.map((brand, index) => (
                      <span key={index} className="brand-tag">
                        {brand.brand} ({brand.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AnalysisResults comments={analysisData.results} />
            <ReportGenerator 
              videoId={analysisData.video_id} 
              comments={analysisData.results} 
            />
          </>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  backendUrl: PropTypes.string.isRequired,
  setBackendUrl: PropTypes.func.isRequired,
};

export default Home;
