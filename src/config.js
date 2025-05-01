const getBackendUrl = () => {
  // Use Netlify function in production
  if (process.env.NODE_ENV === 'production') {
    return '/.netlify/functions/analyze';
  }
  return localStorage.getItem('backendUrl') || process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
};

const config = {
  getBackendUrl,
  setBackendUrl: (url) => {
    localStorage.setItem('backendUrl', url);
  }
};

export default config;
