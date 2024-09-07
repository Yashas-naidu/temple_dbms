import React from 'react';
import './App.css';
import '@fontsource/bebas-neue'; // Defaults to weight 400
import LandingPage from './pages/home';


function App() {
  return (
    <div className="relative min-h-screen bg-blue-600 text-white">
      < LandingPage/>
    </div>
  );
}

export default App;

