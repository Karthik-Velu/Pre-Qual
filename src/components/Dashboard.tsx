import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  DollarSign,
  Gift,
  FileText,
  CreditCard,
  Home,
  Car
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const accounts = [
    { name: 'Checking Account', balance: 5234.89, number: '****4321' },
    { name: 'Savings Account', balance: 12750.50, number: '****8765' }
  ];

  const recentTransactions = [
    { 
      id: 1,
      description: 'Amazon.com',
      amount: -84.99,
      date: '2024-03-15',
      type: 'debit'
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 3500.00,
      date: '2024-03-14',
      type: 'credit'
    },
    {
      id: 3,
      description: 'Starbucks',
      amount: -5.75,
      date: '2024-03-14',
      type: 'debit'
    }
  ];

  const preApprovedOffers = [
    {
      id: 'personal',
      name: 'Personal Loan',
      maxAmount: 25000,
      baseRate: 7.99,
      term: { min: 12, max: 60 },
      icon: <CreditCard className="w-8 h-8 text-blue-600" />
    },
    {
      id: 'home',
      name: 'Home Equity',
      maxAmount: 150000,
      baseRate: 5.99,
      term: { min: 60, max: 180 },
      icon: <Home className="w-8 h-8 text-blue-600" />
    },
    {
      id: 'auto',
      name: 'Auto Loan',
      maxAmount: 50000,
      baseRate: 4.99,
      term: { min: 36, max: 72 },
      icon: <Car className="w-8 h-8 text-blue-600" />
    }
  ];

  const instaCashOffer = {
    maxAmount: 5000,
    baseRate: 8.99,
    term: { min: 12, max: 24 },
    icon: <DollarSign className="w-8 h-8 text-orange-600" />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Pre-Approved Offers Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Pre-Approved Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {preApprovedOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/pre-approved')}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    {offer.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{offer.name}</h3>
                  <p className="text-2xl font-bold mb-2">Up to ${offer.maxAmount.toLocaleString()}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>From {offer.baseRate}% APR</p>
                    <p>{offer.term.min}-{offer.term.max} months</p>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View Offer
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* InstaCash Offer Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Cash Solution</h2>
            <div className="max-w-md">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  {instaCashOffer.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">InstaCash Offer</h3>
                <p className="text-3xl font-bold mb-2">Up to ${instaCashOffer.maxAmount.toLocaleString()}</p>
                <div className="space-y-1 text-sm opacity-90">
                  <p>From {instaCashOffer.baseRate}% APR</p>
                  <p>{instaCashOffer.term.min}-{instaCashOffer.term.max} months</p>
                  <p>Same Day Funding Available*</p>
                </div>
                <button 
                  onClick={() => navigate('/instacash')}
                  className="mt-4 w-full bg-white text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Get Cash Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}