import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FaThumbsUp, FaComment, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalysisResults = ({ results, videoTitle }) => {
  if (!results) return null;

  const { comments_analyzed, brand_mentions, positive_sentiment, avg_engagement, top_brands, results: comments } = results;

  // Prepare data for charts
  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [
        comments.filter(c => c.sentiment === 'positive').length,
        comments.filter(c => c.sentiment === 'neutral').length,
        comments.filter(c => c.sentiment === 'negative').length
      ],
      backgroundColor: ['#4ade80', '#60a5fa', '#f87171']
    }]
  };

  const engagementData = {
    labels: comments.map((_, i) => `Comment ${i+1}`),
    datasets: [{
      label: 'Engagement Score',
      data: comments.map(c => c.engagement_score),
      backgroundColor: '#6366f1'
    }]
  };

  const brandMentionData = {
    labels: top_brands.map(b => b.brand),
    datasets: [{
      data: top_brands.map(b => b.count),
      backgroundColor: [
        '#111', '#000', '#A3AAAE', '#1428A0', '#4285F4', '#7FBA00'
      ]
    }]
  };

  const gradeDistribution = {
    labels: ['A+', 'A', 'B', 'C', 'D', 'F'],
    datasets: [{
      data: [
        comments.filter(c => c.collab_grade === 'A+').length,
        comments.filter(c => c.collab_grade === 'A').length,
        comments.filter(c => c.collab_grade === 'B').length,
        comments.filter(c => c.collab_grade === 'C').length,
        comments.filter(c => c.collab_grade === 'D').length,
        comments.filter(c => c.collab_grade === 'F').length
      ],
      backgroundColor: [
        '#10b981', '#34d399', '#60a5fa', '#fbbf24', '#f97316', '#ef4444'
      ]
    }]
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Analysis Results: {videoTitle}</h2>
      
      <div className="grid">
        {/* Summary Cards */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <FaComment size={24} color="#4361ee" />
              <h4>Total Comments</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{comments_analyzed}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaThumbsUp size={24} color="#4361ee" />
              <h4>Brand Mentions</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{brand_mentions}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaStar size={24} color="#4361ee" />
              <h4>Positive Sentiment</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{positive_sentiment}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaCheckCircle size={24} color="#4361ee" />
              <h4>Avg Engagement</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{avg_engagement.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Top Brands */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Top Mentioned Brands</h3>
          <div style={{ height: '300px' }}>
            <Doughnut 
              data={brandMentionData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }} 
            />
          </div>
        </div>
      </div>

      <div className="grid">
        {/* Sentiment Analysis */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Sentiment Analysis</h3>
          <div style={{ height: '300px' }}>
            <Pie 
              data={sentimentData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }} 
            />
          </div>
        </div>

        {/* Collaboration Grades */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Collaboration Grades</h3>
          <div style={{ height: '300px' }}>
            <Doughnut 
              data={gradeDistribution} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Engagement Scores */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Engagement Scores</h3>
        <div style={{ height: '400px' }}>
          <Bar 
            data={engagementData} 
            options={{ 
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, max: 1 }
              },
              plugins: {
                legend: { display: false }
              }
            }} 
          />
        </div>
      </div>

      {/* Top Comments */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Top Collaboration Opportunities</h3>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Comment</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Brands</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Sentiment</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Engagement</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {comments
                .filter(c => c.collab_grade && c.collab_grade !== 'N/A')
                .sort((a, b) => {
                  const gradeOrder = { 'A+': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
                  return gradeOrder[b.collab_grade] - gradeOrder[a.collab_grade] || 
                         b.engagement_score - a.engagement_score;
                })
                .slice(0, 10)
                .map((comment, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>{comment.text}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {comment.brands.join(', ')}
                    </td>
                    <td style={{ padding: '0.75rem', color: 
                      comment.sentiment === 'positive' ? '#10b981' :
                      comment.sentiment === 'negative' ? '#ef4444' : '#64748b'
                    }}>
                      {comment.sentiment}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {comment.engagement_score.toFixed(2)}
                    </td>
                    <td style={{ 
                      padding: '0.75rem',
                      fontWeight: 'bold',
                      color: 
                        comment.collab_grade === 'A+' ? '#10b981' :
                        comment.collab_grade === 'A' ? '#34d399' :
                        comment.collab_grade === 'B' ? '#60a5fa' :
                        comment.collab_grade === 'C' ? '#fbbf24' :
                        comment.collab_grade === 'D' ? '#f97316' : '#ef4444'
                    }}>
                      {comment.collab_grade}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
