import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, CheckCircle2 } from 'lucide-react';

interface UserData {
  phone: string;
  dob: string;
  firstName: string;
  lastName: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  email: string;
  income: string;
}

export function EligibilityCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    phone: '',
    dob: '',
    firstName: '',
    lastName: '',
    ssn: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    email: '',
    income: '',
  });

  const handleInitialSubmit = () => {
    // Simulate API call to fetch PII data
    setUserData({
      ...userData,
      firstName: 'John',
      lastName: 'Doe',
      ssn: '***-**-1234',
      address: {
        street: '123 Main St',
        city: 'Tampa',
        state: 'FL',
        zip: '33601',
      },
      email: 'john.doe@example.com',
      income: '75000',
    });
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Let's Get Started</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button
                onClick={handleInitialSubmit}
                className="w-full py-3 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Verify Your Information</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SSN
                  </label>
                  <input
                    type="text"
                    value={userData.ssn}
                    onChange={(e) => setUserData({ ...userData, ssn: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={userData.address.street}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, street: e.target.value }
                    })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={userData.address.city}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, city: e.target.value }
                    })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={userData.address.state}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, state: e.target.value }
                    })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={userData.address.zip}
                    onChange={(e) => setUserData({
                      ...userData,
                      address: { ...userData.address, zip: e.target.value }
                    })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Annual Income
                  </label>
                  <input
                    type="text"
                    value={userData.income}
                    onChange={(e) => setUserData({ ...userData, income: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                By continuing, you authorize Suncoast Credit Union to obtain your credit report and verify your information. 
                This will not affect your credit score. We use this information to provide you with personalized offers 
                and verify your identity in accordance with applicable laws.
              </p>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
            >
              Continue to Verification
            </button>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Identity Verification</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Upload Driver's License</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your driver's license or click to upload</p>
                  <button className="text-orange-600 font-medium">Browse Files</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Take a Selfie</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Take a clear photo of yourself</p>
                  <button className="text-orange-600 font-medium">Open Camera</button>
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full py-3 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verification Complete!</h2>
              <p className="text-gray-600">You're eligible for the following offers:</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                {
                  type: "Personal Loan",
                  amount: "Up to $25,000",
                  apr: "8.99% - 15.99% APR"
                },
                {
                  type: "Credit Card",
                  amount: "Up to $10,000",
                  apr: "16.99% - 24.99% APR"
                },
                {
                  type: "Auto Loan",
                  amount: "Up to $35,000",
                  apr: "4.99% - 9.99% APR"
                }
              ].map((offer, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{offer.type}</h3>
                  <p className="text-gray-600 mb-2">{offer.amount}</p>
                  <p className="text-gray-600 mb-4">{offer.apr}</p>
                  <button className="text-orange-600 font-medium">View Details</button>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-800">
                To proceed with your application, you'll need to open a Share Account with a minimum deposit of $5. 
                This account establishes your membership with Suncoast Credit Union.
              </p>
            </div>

            <button
              onClick={() => setStep(5)}
              className="w-full py-3 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
            >
              Open Share Account & Continue
            </button>
          </div>
        );

      case 5:
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Final Steps</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">Review & Sign Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span>Share Account Agreement</span>
                  <button className="text-orange-600">Review & Sign</button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span>Loan Agreement</span>
                  <button className="text-orange-600">Review & Sign</button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span>Electronic Communications Consent</span>
                  <button className="text-orange-600">Review & Sign</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
            >
              Complete Application
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sun className="w-8 h-8 text-orange-600" />
              <span className="ml-2 text-xl font-bold">Suncoast Credit Union</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}