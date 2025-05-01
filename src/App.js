import React from 'react';
import AnalysisResults from './AnalysisResults';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Brand Collaboration Analyzer</h1>
        <p>Analyze YouTube comments for brand collaboration potential</p>
      </header>
      
      <main>
        <AnalysisForm />
      </main>
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
