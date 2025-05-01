import React, { useState } from 'react';
import axios from 'axios';
import BrandSelector from '../components/BrandSelector';
import AnalysisResults from '../components/AnalysisResults';
import ReportGenerator from '../components/ReportGenerator';
import BackendConfig from '../components/BackendConfig';
import config from '../config';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeVideo = async () => {
    if (!videoUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post(config.getBackendUrl(), {
        video_url: videoUrl,
        brands: selectedBrands
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setResults(response.data);
      toast.success('Analysis completed successfully!');
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMsg = err.response?.data?.error || 
                      err.message || 
                      'Failed to analyze video. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>🔥 Ultimate Brand Collab Analyzer</h1>
        <p>Analyze YouTube comments for brand collaboration potential</p>
        
        <div className="input-group">
          <label htmlFor="video-url">YouTube Video URL</label>
          <input
            id="video-url"
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <BrandSelector 
          selectedBrands={selectedBrands} 
          setSelectedBrands={setSelectedBrands} 
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          onClick={analyzeVideo} 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Video'}
        </button>
      </div>

      {results && (
        <>
          <AnalysisResults results={results} videoTitle={results.video_title} />
          <ReportGenerator videoId={results.video_id} comments={results.results} />
        </>
      )}

      <BackendConfig />
    </div>
  );
};

export default Home;
