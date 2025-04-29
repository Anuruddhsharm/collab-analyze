import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AnalysisResults.css';

const AnalysisResults = ({ results }) => {
  const comments = results.results;

  // Stats
  const sentimentStats = comments.reduce((stats, comment) => {
    stats[comment.sentiment] = (stats[comment.sentiment] || 0) + 1;
    return stats;
  }, {});

  const brandMentions = comments.reduce((mentions, comment) => {
    comment.brands.forEach(brand => {
      mentions[brand] = (mentions[brand] || 0) + 1;
    });
    return mentions;
  }, {});

  // State for sorting & filtering
  const [sortedComments, setSortedComments] = useState([...comments].sort((a, b) => b.engagement_score - a.engagement_score));
  const [activeBrand, setActiveBrand] = useState(null);

  const handleSort = (type) => {
    const newSorted = [...sortedComments];
    switch (type) {
      case 'engagement':
        newSorted.sort((a, b) => b.engagement_score - a.engagement_score);
        break;
      case 'trend':
        newSorted.sort((a, b) => b.trend_relevance - a.trend_relevance);
        break;
      case 'grade':
        const gradeOrder = { 'A+': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1, 'N/A': 0 };
        newSorted.sort((a, b) => gradeOrder[b.collab_grade] - gradeOrder[a.collab_grade]);
        break;
      case 'sentiment':
        const sentimentOrder = { 'positive': 2, 'neutral': 1, 'negative': 0 };
        newSorted.sort((a, b) => sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment]);
        break;
      default:
        break;
    }
    setSortedComments(newSorted);
  };

  const filteredComments = activeBrand
    ? sortedComments.filter(comment => comment.brands?.includes(activeBrand.toLowerCase()))
    : sortedComments;

  return (
    <div className="analysis-results">
      <h2>Analysis Results</h2>

      {/* Stats Summary */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Comments Analyzed</h3>
          <p>{results.comments_analyzed}</p>
        </div>
        <div className="stat-card">
          <h3>Brand Mentions Found</h3>
          <p>{comments.length}</p>
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="sentiment-distribution">
        <h3>Sentiment Distribution</h3>
        <div className="sentiment-bars">
          {Object.entries(sentimentStats).map(([sentiment, count]) => (
            <div key={sentiment} className="sentiment-bar">
              <div className="sentiment-label">{sentiment}</div>
              <div 
                className={`bar ${sentiment}`} 
                style={{ width: `${(count / comments.length) * 100}%` }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Mentions */}
      <div className="brand-mentions">
        <h3>Brand Mentions</h3>
        <div className="brand-bars">
          {Object.entries(brandMentions).map(([brand, count]) => (
            <div key={brand} className="brand-bar">
              <div className="brand-label">{brand.charAt(0).toUpperCase() + brand.slice(1)}</div>
              <div 
                className="bar" 
                style={{ width: `${(count / comments.length) * 100}%` }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort & Filter Controls */}
      <div className="filters">
        <select onChange={(e) => handleSort(e.target.value)} className="sort-select">
          <option value="engagement">Sort by Engagement</option>
          <option value="trend">Sort by Trend Relevance</option>
          <option value="grade">Sort by Collab Grade</option>
          <option value="sentiment">Sort by Sentiment</option>
        </select>

        <div className="brand-filter">
          {['Nike', 'Adidas', 'Apple', 'Samsung', 'Google', 'Microsoft'].map(brand => (
            <button
              key={brand}
              className={`brand-btn ${activeBrand === brand.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveBrand(activeBrand === brand.toLowerCase() ? null : brand.toLowerCase())}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Cards */}
      <div className="comments-list">
        {filteredComments.map((comment, index) => (
          <div key={index} className="comment-card">
            <p className="comment-text">{comment.text}</p>
            <div className="analysis-grid">
              <div className="analysis-chip">
                <span className="tag brand-tag">Brands:</span>
                {comment.brands?.length > 0 ? (
                  comment.brands.join(", ")
                ) : (
                  <span className="muted">None detected</span>
                )}
              </div>
              <div className={`analysis-chip sentiment-${comment.sentiment}`}>
                <span className="tag">Sentiment:</span> {comment.sentiment}
              </div>
              <div className="analysis-chip">
                <span className="tag">Engagement:</span> 
                <progress value={comment.engagement_score} max="1"></progress>
                {(comment.engagement_score * 100).toFixed(0)}%
              </div>
              <div className={`analysis-chip ${comment.authentic ? 'authentic' : 'inauthentic'}`}>
                <span className="tag">Authentic:</span> 
                {comment.authentic ? '✓' : '✗'}
              </div>
              <div className="analysis-chip">
                <span className="tag">Trend Match:</span>
                <progress value={comment.trend_relevance} max="1"></progress>
                {(comment.trend_relevance * 100).toFixed(0)}%
              </div>
              {comment.collab_grade !== "N/A" && (
                <div className={`grade-badge grade-${comment.collab_grade.replace('+', 'plus')}`}>
                  Grade: {comment.collab_grade}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AnalysisResults.propTypes = {
  results: PropTypes.shape({
    video_id: PropTypes.string,
    comments_analyzed: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        sentiment: PropTypes.string,
        sentiment_score: PropTypes.number,
        engagement_score: PropTypes.number,
        trend_relevance: PropTypes.number,
        authentic: PropTypes.bool,
        collab_grade: PropTypes.string,
        brands: PropTypes.arrayOf(PropTypes.string)
      })
    ).isRequired
  }).isRequired
};

export default AnalysisResults;
