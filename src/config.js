const getBackendUrl = () => {
  // Use Netlify function in production
  if (process.env.NODE_ENV === 'production') {
    return '/.netlify/functions/analyze';
  }
  return localStorage.getItem('backendUrl') || process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
};

const setBackendUrl = (url) => {
  try {
    // Validate URL format
    if (!url.match(/^https?:\/\/.+/)) {
      throw new Error('Invalid URL format');
    }
    localStorage.setItem('backendUrl', url);
  } catch (error) {
    console.error('Error saving backend URL:', error);
    throw error;
  }
};

const config = {
  getBackendUrl,
  setBackendUrl
};

export default config;
