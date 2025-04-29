import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles.css';

function App() {
  const [backendUrl, setBackendUrl] = useState('');

  // Load the saved backend URL from localStorage (if any)
  useEffect(() => {
    const savedUrl = localStorage.getItem('backendUrl');
    if (savedUrl) setBackendUrl(savedUrl); // Set the URL if it's saved in localStorage
  }, []);

  // Save the backend URL to localStorage when it changes
  useEffect(() => {
    if (backendUrl) {
      localStorage.setItem('backendUrl', backendUrl);
    }
  }, [backendUrl]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Home backendUrl={backendUrl} setBackendUrl={setBackendUrl} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
