import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Shield, Users, Wallet, ArrowRight, Building, Heart } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Sun className="w-10 h-10 text-orange-600" />
              <span className="ml-2 text-2xl font-bold">Suncoast Credit Union</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600">Personal</a>
              <a href="#" className="text-gray-700 hover:text-orange-600">Business</a>
              <a href="#" className="text-gray-700 hover:text-orange-600">About Us</a>
              <a href="#" className="text-gray-700 hover:text-orange-600">Resources</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-[#1C0A00] font-medium hover:text-orange-600"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/eligibility')}
                className="px-4 py-2 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
              >
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full text-white">
            <h1 className="text-5xl font-bold mb-6">Banking That Puts People First</h1>
            <p className="text-xl mb-8 max-w-2xl">Experience the credit union difference with Suncoast. Join our community of members and discover better banking.</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/eligibility')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
              >
                Check Your Eligibility <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-6 py-3 bg-white text-[#1C0A00] rounded-lg hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Suncoast?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience banking that puts your needs first with competitive rates and exceptional service.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-gray-600">Your financial security is our top priority with state-of-the-art protection.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Member-Owned</h3>
              <p className="text-gray-600">As a member, you're an owner with a voice in how we operate.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Wallet className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Better Rates</h3>
              <p className="text-gray-600">Enjoy competitive rates on loans and higher returns on savings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Financial Solutions for Every Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personal Loans",
                description: "Flexible personal loans with competitive rates for any purpose.",
                icon: Wallet
              },
              {
                title: "Auto Loans",
                description: "Get on the road with great rates on auto financing.",
                icon: Building
              },
              {
                title: "Credit Cards",
                description: "Rewards and benefits that put more money back in your pocket.",
                icon: Heart
              }
            ].map((product, index) => (
              <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <product.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button 
                  onClick={() => navigate('/eligibility')}
                  className="text-orange-600 font-medium hover:text-orange-700 flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C0A00] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sun className="w-8 h-8 text-orange-400" />
                <span className="ml-2 text-xl font-bold">Suncoast</span>
              </div>
              <p className="text-gray-400">Banking that puts people first.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Checking</a></li>
                <li><a href="#" className="hover:text-white">Savings</a></li>
                <li><a href="#" className="hover:text-white">Loans</a></li>
                <li><a href="#" className="hover:text-white">Credit Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}