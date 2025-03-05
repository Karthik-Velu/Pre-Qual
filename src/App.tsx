import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { InstaCashOffer } from './components/InstaCashOffer';
import { PreApprovedOffer } from './components/PreApprovedOffer';
import { PreQualification } from './components/PreQualification';

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
  setUsername: (value: string) => void;
}

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">PreQual</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/eligibility')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to PreQual</h1>
          <p className="text-xl text-gray-600 mb-8">Your path to financial success starts here</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pre-Approved Offers</h2>
            <p className="text-gray-600">Discover your pre-approved loan offers with competitive rates.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">InstaCash</h2>
            <p className="text-gray-600">Quick cash solutions when you need them most.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pre-Qualification</h2>
            <p className="text-gray-600">Check your eligibility without affecting your credit score.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoginPage({ setIsLoggedIn, setUsername }: LoginPageProps) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('username', loginData.username);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setUsername(loginData.username);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your PreQual account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const isJohnDoe = username.toLowerCase() === 'john doe';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedUsername && storedIsLoggedIn) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
          } 
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard username={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/instacash"
          element={
            isLoggedIn ? (
              <InstaCashOffer />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/pre-approved"
          element={
            isLoggedIn && !isJohnDoe ? (
              <PreApprovedOffer />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/pre-qualification"
          element={
            isLoggedIn && isJohnDoe ? (
              <PreQualification />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}