import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/home';
import Auth from './pages/auth';
import ProfileDashboard from './pages/profile';
import PaymentPage from './pages/payment';
import { AuthProvider } from './components/authcontext';
import { CartProvider } from './components/cartcontext'; // Import CartProvider

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap the entire app with CartProvider */}
        <Router>
          <div className="relative min-h-screen bg-blue-600 text-white">
            <Routes>
              <Route path="/home" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<ProfileDashboard />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
