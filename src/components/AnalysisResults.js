import React from 'react';

const AnalysisResults = ({ results }) => {
  const sentimentStats = results.results.reduce((stats, comment) => {
    stats[comment.sentiment] = (stats[comment.sentiment] || 0) + 1;
    return stats;
  }, {});

  const brandMentions = results.results.reduce((mentions, comment) => {
    comment.brands.forEach(brand => {
      mentions[brand] = (mentions[brand] || 0) + 1;
    });
    return mentions;
  }, {});

  return (
    <div className="results-section">
      <h2>Analysis Results</h2>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Total Comments Analyzed</h3>
          <p>{results.comments_analyzed}</p>
        </div>
        
        <div className="stat-card">
          <h3>Brand Mentions Found</h3>
          <p>{results.results.length}</p>
        </div>
      </div>
      
      <div className="sentiment-distribution">
        <h3>Sentiment Distribution</h3>
        <div className="sentiment-bars">
          {Object.entries(sentimentStats).map(([sentiment, count]) => (
            <div key={sentiment} className="sentiment-bar">
              <div className="sentiment-label">{sentiment}</div>
              <div 
                className={`bar ${sentiment}`} 
                style={{ width: `${(count / results.results.length) * 100}%` }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="brand-mentions">
        <h3>Brand Mentions</h3>
        <div className="brand-bars">
          {Object.entries(brandMentions).map(([brand, count]) => (
            <div key={brand} className="brand-bar">
              <div className="brand-label">{brand.charAt(0).toUpperCase() + brand.slice(1)}</div>
              <div 
                className="bar" 
                style={{ width: `${(count / results.results.length) * 100}%` }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sample-comments">
        <h3>Sample Comments</h3>
        <div className="comments-list">
          {results.results.slice(0, 5).map((comment, index) => (
            <div key={index} className={`comment ${comment.sentiment}`}>
              <p>{comment.text}</p>
              <div className="comment-meta">
                <span className={`sentiment-tag ${comment.sentiment}`}>
                  {comment.sentiment} ({comment.sentiment_score.toFixed(2)})
                </span>
                {comment.brands.length > 0 && (
                  <span className="brands-tag">
                    Brands: {comment.brands.join(', ')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;