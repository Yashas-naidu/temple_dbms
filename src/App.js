import React from 'react';
import '@fontsource/bebas-neue'; // Defaults to weight 400
import LandingPage from './pages/home';
import Auth from './pages/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/profile';
import { AuthProvider } from './components/authcontext'; // Import AuthProvider


function App() {
  return (
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <div className="relative min-h-screen bg-blue-600 text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
