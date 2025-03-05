import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, ArrowRight, CheckCircle2 } from 'lucide-react';

export function InstaCashOffer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sun className="w-8 h-8 text-orange-600" />
              <span className="ml-2 text-xl font-bold">Suncoast Credit Union</span>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Insta Cash Offer</h1>
              <p className="text-gray-600">You're pre-approved for instant cash!</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Offer Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold">$5,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Term</p>
                    <p className="text-2xl font-bold">24 months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">APR</p>
                    <p className="text-2xl font-bold">8.99%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="text-2xl font-bold">$228</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  This offer expires in 7 days. Funds can be deposited directly into your Suncoast account within 24 hours of approval.
                </p>
              </div>

              <button
                onClick={() => navigate('/pre-qualification')}
                className="w-full py-4 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810] flex items-center justify-center"
              >
                Accept Offer <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}