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
  Car,
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export function Dashboard({ username, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isJohnDoe = username.toLowerCase() === 'john doe';

  const navigationItems = [
    { name: 'Offers', icon: <Gift className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Transactions', icon: <Receipt className="w-5 h-5" />, path: '/transactions' },
    { name: 'Accounts', icon: <PiggyBank className="w-5 h-5" />, path: '/accounts' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
    { name: 'Help', icon: <HelpCircle className="w-5 h-5" />, path: '/help' },
  ];

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold text-gray-900">Suncoast Bank</span>
        </div>
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold">PreQual</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {username}</span>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-700 font-medium hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* Pre-Approved Offers Section - Only show if not John Doe */}
            {!isJohnDoe && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Pre-Approved Offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">Personal Loan</h3>
                    <p className="text-gray-600 mb-4">Up to $25,000</p>
                    <button 
                      onClick={() => navigate('/pre-approved')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      View Offer
                    </button>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">Auto Loan</h3>
                    <p className="text-gray-600 mb-4">Up to $35,000</p>
                    <button 
                      onClick={() => navigate('/pre-approved')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      View Offer
                    </button>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">Credit Card</h3>
                    <p className="text-gray-600 mb-4">Up to $10,000</p>
                    <button 
                      onClick={() => navigate('/pre-approved')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      View Offer
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Pre-Qualification Section - Only show for John Doe */}
            {isJohnDoe && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Pre-Qualified</h2>
                <div className="max-w-md">
                  <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Pre-Qualification Application</h3>
                    <p className="text-gray-600 mb-4">
                      Check your loan options without impacting your credit score
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Takes only 5 minutes
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        No impact on credit score
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Multiple loan options
                      </li>
                    </ul>
                    <button 
                      onClick={() => navigate('/pre-qualification')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Pre-Qualification
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* InstaCash Offer Section - Show for all users */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">InstaCash</h2>
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
                <h3 className="text-lg font-semibold mb-2">Quick Cash Solution</h3>
                <p className="text-gray-600 mb-4">Need cash fast? Get up to $2,500 instantly</p>
                <button 
                  onClick={() => navigate('/instacash')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Get InstaCash
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}