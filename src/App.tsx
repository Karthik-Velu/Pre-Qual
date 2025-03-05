import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { InstaCashOffer } from './components/InstaCashOffer';
import { PreApprovedOffer } from './components/PreApprovedOffer';
import { PreQualification } from './components/PreQualification';

interface LoginPageWrapperProps {
  setIsLoggedIn: (value: boolean) => void;
  setUsername: (value: string) => void;
}

function LoginPageWrapper({ setIsLoggedIn, setUsername }: LoginPageWrapperProps) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the username in localStorage for persistence
    localStorage.setItem('username', loginData.username);
    setIsLoggedIn(true);
    setUsername(loginData.username);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Welcome to PreQual</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your account
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
  // Initialize state with values from localStorage if they exist
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  // Check if user is "John Doe" for conditional rendering
  const isJohnDoe = username.toLowerCase() === 'john doe';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPageWrapper setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard username={username} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/instacash"
          element={
            isLoggedIn ? (
              <InstaCashOffer />
            ) : (
              <Navigate to="/" replace />
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