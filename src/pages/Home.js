import React, { useState} from 'react';
import Navbar from '../components/Navbar';
import BrandSelector from '../components/BrandSelector';
import AnalysisResults from '../components/AnalysisResults';
import ReportGenerator from '../components/ReportGenerator';

const Home = ({ backendUrl, setBackendUrl }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([
    'nike', 'adidas', 'apple', 'samsung', 'google', 'microsoft'
  ]);

  const handleAnalyze = async () => {
    if (!backendUrl) {
      setError('Please enter your ngrok backend URL');
      return;
    }
    
    if (!videoUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    setIsAnalyzing(true);
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
        setResults(filteredResults);
      } else {
        setError(data.error || 'Failed to analyze video');
      }
    } catch (err) {
      setError('Failed to connect to the backend service');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container">
      <Navbar />
      
      <div className="config-section">
        <h2>Backend Configuration</h2>
        <div className="input-group">
          <label>Enter your ngrok backend URL:</label>
          <input
            type="text"
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            placeholder="https://your-ngrok-url.ngrok.io"
          />
        </div>
      </div>

      <div className="main-content">
        <h1>YouTube Brand Monitoring</h1>
        
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
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="analyze-btn"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {results && (
          <>
            <AnalysisResults results={results} />
            <ReportGenerator results={results} backendUrl={backendUrl} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
