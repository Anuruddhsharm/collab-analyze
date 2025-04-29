import React, { useState } from 'react';
import axios from 'axios';
import BrandSelector from '../components/BrandSelector';
import AnalysisResults from '../components/AnalysisResults';
import ReportGenerator from '../components/ReportGenerator';

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

    if (selectedBrands.length === 0) {
      setError('Please select at least one brand to monitor');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        video_url: videoUrl,
        brands: selectedBrands
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Brand Collaboration Analyzer</h1>
        <p>Analyze YouTube comments to identify potential brand collaboration opportunities.</p>
        
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
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
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
    </div>
  );
};

export default Home;
