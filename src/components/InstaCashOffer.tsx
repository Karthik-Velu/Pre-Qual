import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, ArrowRight, CheckCircle2, Calendar, Bank, Lock } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

export function InstaCashOffer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [term, setTerm] = useState(24);
  const [firstPaymentDate, setFirstPaymentDate] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Checking Account', number: '****4321', balance: 5234.89 },
    { id: '2', name: 'Savings Account', number: '****8765', balance: 12750.50 }
  ]);

  // Calculate monthly payment based on loan amount and term
  const calculateMonthlyPayment = (amount: number, months: number) => {
    const annualRate = 8.99;
    const monthlyRate = annualRate / 12 / 100;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, term);

  const handleLoanCustomization = () => {
    setOtpSent(true);
    setStep(2);
  };

  const handleOTPVerification = () => {
    // In a real app, verify OTP with backend
    setStep(3);
  };

  const handleDocuSign = () => {
    // In a real app, integrate with DocuSign
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Customize Your Loan</h2>
              
              {/* Loan Amount Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Term Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term: {term} months
                </label>
                <select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>

              {/* Monthly Payment Display */}
              <div className="bg-white p-4 rounded-lg border mb-6">
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="text-2xl font-bold">${monthlyPayment}</p>
              </div>

              {/* First Payment Date */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Payment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={firstPaymentDate}
                    onChange={(e) => setFirstPaymentDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <Calendar className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Deposit Account Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Deposit Account
                </label>
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAccount === account.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedAccount(account.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-gray-500">{account.number}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${account.balance.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Available Balance</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleLoanCustomization}
              disabled={!firstPaymentDate || !selectedAccount}
              className="w-full py-4 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810] flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Verify Your Identity</h2>
                <p className="text-gray-600">
                  We've sent a verification code to your registered phone number
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
                />
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setOtpSent(true)}
                  className="text-orange-600 hover:text-orange-700 text-sm"
                >
                  Resend Code
                </button>
              </div>
            </div>

            <button
              onClick={handleOTPVerification}
              disabled={otp.length !== 6}
              className="w-full py-4 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810] flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verify <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Sign Loan Agreement</h2>
                <p className="text-gray-600">
                  Please review and sign the loan agreement to complete your application
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border mb-6">
                <h3 className="font-semibold mb-4">Loan Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium">${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Term</span>
                    <span className="font-medium">{term} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">${monthlyPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">First Payment Date</span>
                    <span className="font-medium">{firstPaymentDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  By signing, you agree to the terms and conditions of the loan agreement.
                  The funds will be deposited into your selected account within 24 hours.
                </p>
              </div>
            </div>

            <button
              onClick={handleDocuSign}
              className="w-full py-4 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810] flex items-center justify-center"
            >
              Sign Agreement <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Loan Approved!</h2>
            <p className="text-gray-600 mb-6">
              Your loan has been successfully processed and the funds will be deposited into your account.
            </p>
            
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="font-semibold mb-4">Loan Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Account Number</span>
                  <span className="font-medium">#L-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">First Payment Date</span>
                  <span className="font-medium">{firstPaymentDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#1C0A00] text-white rounded-lg hover:bg-[#2C1810]"
            >
              Return to Dashboard
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
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${s < step ? 'bg-orange-600 text-white' : 
                      s === step ? 'bg-orange-100 text-orange-600' : 
                      'bg-gray-100 text-gray-400'}
                  `}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`
                      w-16 h-1 mx-2
                      ${s < step ? 'bg-orange-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>

            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}