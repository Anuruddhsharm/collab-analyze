// Get backend URL from localStorage or use default
const getBackendUrl = () => {
  return localStorage.getItem('backendUrl') || process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
};

const config = {
  getBackendUrl,
  setBackendUrl: (url) => {
    localStorage.setItem('backendUrl', url);
  }
};

export default config;
