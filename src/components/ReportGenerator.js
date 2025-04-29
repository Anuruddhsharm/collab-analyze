import React from 'react';
import PropTypes from 'prop-types';

const ReportGenerator = ({ backendUrl, videoId, comments }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateReport = async () => {
    if (!backendUrl) {
      alert('Backend URL is missing.');
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Sending request with:', {
        video_id: videoId,
        comments: comments
      });

      const response = await fetch(`${backendUrl}/download-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_id: videoId,
          comments: comments,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download report');
      }

      const blob = await response.blob();
      console.log('Received blob of size:', blob.size);

      if (blob.size === 0) {
        throw new Error('Received empty PDF file');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brand_collab_report_${videoId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 60000);

    } catch (err) {
      console.error('Error generating report:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="report-generator">
      <button 
        onClick={generateReport} 
        disabled={isGenerating}
        className="report-btn"
      >
        {isGenerating ? 'Generating...' : 'Download Full Report (PDF)'}
      </button>
    </div>
  );
};

ReportGenerator.propTypes = {
  backendUrl: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
};

export default ReportGenerator;
