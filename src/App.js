import React from 'react';
import '@fontsource/bebas-neue'; // Defaults to weight 400
import LandingPage from './pages/home';
import Auth from './pages/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/authcontext'; // Import AuthProvider
import ProfileDashboard from './pages/profile';


function App() {
  return (
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <div className="relative min-h-screen bg-blue-600 text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<ProfileDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
