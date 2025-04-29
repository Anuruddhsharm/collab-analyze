const generateReport = async () => {
  setIsGenerating(true);
  try {
    console.log('Sending request with:', {
      video_id: results.video_id,
      comments: results.results
    });

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
    a.download = `brand_monitoring_report_${results.video_id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up after 1 minute
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
