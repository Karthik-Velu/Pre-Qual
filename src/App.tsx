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
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-[#662D91]">aven.</span>
                <span className="text-sm text-gray-600 ml-1">Credit Union</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Personal</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Business</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Digital banking</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Mortgage</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Education</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <span className="sr-only">Search</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="px-3 py-1 rounded-full bg-[#662D91] text-white text-sm">ES</button>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Log In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-r from-[#F7941D] via-[#F15A29] to-[#ED1E79] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pr-12">
              <h1 className="text-6xl font-bold text-white space-y-2">
                <span className="block">Unlock Your</span>
                <span className="block">Financial</span>
                <span className="block">Potential</span>
              </h1>
              <button 
                onClick={() => navigate('/pre-qualification')}
                className="mt-8 px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <span>Pre-Qualify me</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="w-1/2 relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="/images/hero-image.jpg" 
                  alt="Father and child smiling" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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