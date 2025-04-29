import React, { useState } from 'react';

const ReportGenerator = ({ results, backendUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

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
        setDownloadUrl(url);
        
        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `brand_monitoring_report_${results.video_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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

export default ReportGenerator;