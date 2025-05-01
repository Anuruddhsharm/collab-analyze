import React, { useState } from 'react';
import axios from 'axios';
import config from './config';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeVideo = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${config.getBackendUrl()}/analyze`, {
        video_url: videoUrl
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while analyzing the video.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Brand Collaboration Analyzer</h1>

      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        style={{ width: '60%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={analyzeVideo} disabled={loading} style={{ marginLeft: '10px', padding: '10px' }}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Video: {result.video_title}</h2>
          <p><strong>Video ID:</strong> {result.video_id}</p>
          <p><strong>Comments Analyzed:</strong> {result.comments_analyzed}</p>
          <p><strong>Brand Mentions:</strong> {result.brand_mentions}</p>
          <p><strong>Positive Sentiment Count:</strong> {result.positive_sentiment}</p>
          <p><strong>Average Engagement Score:</strong> {result.avg_engagement}</p>

          <h3>Top Brands Mentioned</h3>
          <ul>
            {result.top_brands.map((b, i) => (
              <li key={i}>{b.brand} ({b.count} mentions)</li>
            ))}
          </ul>

          <h3>Top 5 Comments</h3>
          <ul>
            {result.results.slice(0, 5).map((comment, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                <p><strong>Text:</strong> {comment.text}</p>
                <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                <p><strong>Engagement:</strong> {comment.engagement_score}</p>
                <p><strong>Authentic:</strong> {comment.authentic ? 'Yes' : 'No'}</p>
                <p><strong>Collab Grade:</strong> {comment.collab_grade}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
