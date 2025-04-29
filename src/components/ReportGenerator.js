import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReportGenerator = ({ results, backendUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${backendUrl}/download-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_id: results.video_id,
          comments: results.results,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `brand_monitoring_report_${results.video_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="report-section">
      <button 
        onClick={generateReport} 
        disabled={isGenerating}
        className="report-btn"
      >
        {isGenerating ? 'Generating Report...' : 'Download PDF Report'}
      </button>
    </div>
  );
};

ReportGenerator.propTypes = {
  results: PropTypes.shape({
    video_id: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired
  }).isRequired,
  backendUrl: PropTypes.string.isRequired
};

export default ReportGenerator;
