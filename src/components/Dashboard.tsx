import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  DollarSign,
  Gift,
  FileText,
  CreditCard
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Offers and Pre-Qualification Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Special Offers & Pre-Qualification</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/insta-cash')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold">Insta Cash Offer</h3>
            </div>
            <p className="text-gray-600">Get instant access to cash with our special offer</p>
          </button>

          <button 
            onClick={() => navigate('/pre-approved')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Pre-Approved Offers</h3>
            </div>
            <p className="text-gray-600">View your personalized pre-approved offers</p>
          </button>

          <button 
            onClick={() => navigate('/pre-qualification')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Pre-Qualification</h3>
            </div>
            <p className="text-gray-600">Check your eligibility for various products</p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accounts Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Accounts</h2>
          <div className="space-y-4">
            {accounts.map((account, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${account.balance.toLocaleString()}</p>
                    <button className="text-sm text-blue-600 hover:text-blue-500">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium">Send Money</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium">Scheduled Payments</p>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  {transaction.type === 'credit' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-500 font-medium">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}