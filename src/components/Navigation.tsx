import React from 'react';
import { 
  Home, 
  CreditCard, 
  PiggyBank, 
  ArrowRightLeft, 
  Gift, 
  Settings,
  LogOut,
  Bell,
  Sun
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function Navigation({ currentTab, onTabChange, onLogout }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'accounts', name: 'Accounts', icon: PiggyBank },
    { id: 'transfers', name: 'Transfers', icon: ArrowRightLeft },
    { id: 'offers', name: 'Offers', icon: Gift },
    { id: 'cards', name: 'Cards', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Sun className="w-8 h-8 text-orange-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Suncoast Credit Union</span>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 
                      ${currentTab === tab.id
                        ? 'border-orange-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={onLogout}
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1C0A00] hover:bg-[#2C1810]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}