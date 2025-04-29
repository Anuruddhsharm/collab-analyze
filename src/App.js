import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles.css';

function App() {
  const [backendUrl, setBackendUrl] = useState('');
  
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