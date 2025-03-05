import React, { useState } from 'react';
import { Sun } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <Sun className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-2xl font-semibold text-center">Suncoast Credit Union</h1>
          </div>

          <h2 className="text-3xl font-medium text-center mb-8">
            Hello! Welcome to<br />Suncoast Credit Union
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User name
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Johndoe_95739"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600 hover:bg-gray-200"
                >
                  Get user ID
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#1C0A00] hover:bg-[#2C1810] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C0A00]"
            >
              Login →
            </button>

            <div className="text-center">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an internet banking?
            </p>
            <button className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Register for new user
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden md:block md:w-1/2 bg-black">
        <div 
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1635840420799-f75477b0b977?auto=format&fit=crop&q=80&w=1000')`
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Get a truly functional banking platform
              </h2>
              <div className="flex space-x-2">
                <div className="w-12 h-1 bg-white rounded-full"></div>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                <div className="w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}