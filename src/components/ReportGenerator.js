import React from 'react';
import axios from 'axios';
import config from '../config';
import { FaDownload } from 'react-icons/fa';

const ReportGenerator = ({ videoId, comments }) => {
  const generateReport = async () => {
    try {
      const response = await axios.post(`${config.getBackendUrl()}/download-report`, {
        video_id: videoId,
        comments: comments
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `brand_collab_report_${videoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Generate Report</h3>
      <button 
        onClick={generateReport} 
        className="btn btn-primary"
        disabled={!comments || comments.length === 0}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <FaDownload /> Download PDF Report
      </button>
    </div>
  );
};

export default ReportGenerator;
