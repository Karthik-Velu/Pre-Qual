import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { EligibilityCheck } from './components/EligibilityCheck';
import { Dashboard } from './components/Dashboard';
import { InstaCashOffer } from './components/InstaCashOffer';
import { PreApprovedOffer } from './components/PreApprovedOffer';
import { PreQualificationForm } from './components/PreQualificationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPageWrapper />} />
        <Route path="/eligibility" element={<EligibilityCheck />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insta-cash" element={<InstaCashOffer />} />
        <Route path="/pre-approved" element={<PreApprovedOffer />} />
        <Route path="/pre-qualification" element={<PreQualificationForm />} />
      </Routes>
    </Router>
  );
}

function LoginPageWrapper() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    console.log('Login clicked, navigating to dashboard...');
    navigate('/dashboard');
  };

  return <LoginPage onLogin={handleLogin} />;
}

export default App;