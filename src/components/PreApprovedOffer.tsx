import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, ArrowRight, CheckCircle2, Calendar, Bank, Lock, FileText, CreditCard, Home, Car } from 'lucide-react';

interface LoanProduct {
  id: string;
  name: string;
  maxAmount: number;
  minAmount: number;
  baseRate: number;
  term: {
    min: number;
    max: number;
  };
  icon: React.ReactNode;
}

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

export function PreApprovedOffer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState(25000);
  const [term, setTerm] = useState(60);
  const [firstPaymentDate, setFirstPaymentDate] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [otp, setOtp] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const products: LoanProduct[] = [
    {
      id: 'personal',
      name: 'Personal Loan',
      maxAmount: 25000,
      minAmount: 5000,
      baseRate: 7.99,
      term: { min: 12, max: 60 },
      icon: <CreditCard className="w-8 h-8" />
    },
    {
      id: 'home',
      name: 'Home Equity',
      maxAmount: 150000,
      minAmount: 25000,
      baseRate: 5.99,
      term: { min: 60, max: 180 },
      icon: <Home className="w-8 h-8" />
    },
    {
      id: 'auto',
      name: 'Auto Loan',
      maxAmount: 50000,
      minAmount: 10000,
      baseRate: 4.99,
      term: { min: 36, max: 72 },
      icon: <Car className="w-8 h-8" />
    }
  ];

  const [accounts] = useState<Account[]>([
    { id: '1', name: 'Checking Account', number: '****4321', balance: 5234.89 },
    { id: '2', name: 'Savings Account', number: '****8765', balance: 12750.50 }
  ]);

  const selectedProductDetails = products.find(p => p.id === selectedProduct);

  const calculateMonthlyPayment = (amount: number, months: number, rate: number) => {
    const monthlyRate = rate / 12 / 100;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

  const monthlyPayment = selectedProductDetails 
    ? calculateMonthlyPayment(loanAmount, term, selectedProductDetails.baseRate)
    : '0.00';

  const handleProductSelection = (productId: string) => {
    setSelectedProduct(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      setLoanAmount(product.minAmount);
      setTerm(product.term.min);
    }
  };

  const handleLoanCustomization = () => {
    setStep(2);
  };

  const handleOTPVerification = () => {
    setStep(3);
  };

  const handleDocuSign = () => {
    setStep(4);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`
            relative flex items-center justify-center
            ${s <= step ? 'text-blue-600' : 'text-gray-400'}
          `}>
            <div className={`
              w-10 h-10 rounded-full border-2 flex items-center justify-center
              ${s < step ? 'bg-blue-600 border-blue-600 text-white' : 
                s === step ? 'border-blue-600 text-blue-600' : 
                'border-gray-300 text-gray-400'}
            `}>
              {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            <span className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">
              {s === 1 ? 'Select Offer' : s === 2 ? 'Verify Identity' : 'Sign Agreement'}
            </span>
          </div>
          {s < 3 && (
            <div className={`
              w-24 h-0.5 mx-4
              ${s < step ? 'bg-blue-600' : 'bg-gray-300'}
            `} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Product Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelection(product.id)}
                  className={`
                    p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105
                    ${selectedProduct === product.id 
                      ? 'bg-blue-50 border-2 border-blue-500 shadow-lg' 
                      : 'bg-white border border-gray-200 hover:shadow-md'}
                  `}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    {product.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold mb-2">Up to ${product.maxAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">From {product.baseRate}% APR</p>
                  <p className="text-sm text-gray-600">
                    {product.term.min}-{product.term.max} months
                  </p>
                </div>
              ))}
            </div>

            {selectedProductDetails && (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Customize Your {selectedProductDetails.name}</h3>
                
                {/* Loan Amount Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount: ${loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={selectedProductDetails.minAmount}
                    max={selectedProductDetails.maxAmount}
                    step={1000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>${selectedProductDetails.minAmount.toLocaleString()}</span>
                    <span>${selectedProductDetails.maxAmount.toLocaleString()}</span>
                  </div>
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
                    {Array.from(
                      { length: Math.floor((selectedProductDetails.term.max - selectedProductDetails.term.min) / 12) + 1 },
                      (_, i) => selectedProductDetails.term.min + i * 12
                    ).map((months) => (
                      <option key={months} value={months}>
                        {months} months
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Payment Display */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                  <p className="text-2xl font-bold">${monthlyPayment}</p>
                  <p className="text-sm text-gray-500">at {selectedProductDetails.baseRate}% APR</p>
                </div>

                {/* First Payment Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Payment Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstPaymentDate}
                      onClick={() => setShowCalendar(true)}
                      readOnly
                      placeholder="Select date"
                      className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <Calendar className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                    
                    {showCalendar && (
                      <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg p-4">
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setFirstPaymentDate(`2024-04-${i + 1}`);
                                setShowCalendar(false);
                              }}
                              className="p-2 hover:bg-gray-100 rounded"
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
                            ? 'border-blue-500 bg-blue-50'
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
            )}

            <button
              onClick={handleLoanCustomization}
              disabled={!selectedProduct || !firstPaymentDate || !selectedAccount}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
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
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
                />
              </div>

              <div className="text-center mt-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Resend Code
                </button>
              </div>
            </div>

            <button
              onClick={handleOTPVerification}
              disabled={otp.length !== 6}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verify <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Electronic Record and Signature Disclosure</h2>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm">
                  <h3>1. ELECTRONIC DELIVERY OF DOCUMENTS</h3>
                  <p>By agreeing to use electronic records and signatures, you consent to receive all communications, agreements, documents, notices, and disclosures electronically that we provide in connection with your loan.</p>
                  
                  <h3>2. HARDWARE AND SOFTWARE REQUIREMENTS</h3>
                  <p>To access and retain electronic records, you will need:</p>
                  <ul>
                    <li>A computer or mobile device with internet connectivity</li>
                    <li>A current web browser that includes 128-bit encryption</li>
                    <li>Sufficient storage space to save documents or a printer</li>
                  </ul>

                  <h3>3. WITHDRAWING CONSENT</h3>
                  <p>You may withdraw your consent to receive electronic records at any time by contacting us. However, withdrawal of consent may result in the termination of your loan application.</p>

                  <h3>4. LOAN DETAILS</h3>
                  {selectedProductDetails && (
                    <>
                      <p>Product: {selectedProductDetails.name}</p>
                      <p>Loan Amount: ${loanAmount.toLocaleString()}</p>
                      <p>Term: {term} months</p>
                      <p>Monthly Payment: ${monthlyPayment}</p>
                      <p>First Payment Date: {firstPaymentDate}</p>
                      <p>Annual Percentage Rate (APR): {selectedProductDetails.baseRate}%</p>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to use electronic records and signatures
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleDocuSign}
              disabled={!agreeToTerms}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
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
              Your {selectedProductDetails?.name} has been successfully approved and the funds will be deposited into your account.
            </p>
            
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="font-semibold mb-4">Loan Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Account Number</span>
                  <span className="font-medium">#L-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product</span>
                  <span className="font-medium">{selectedProductDetails?.name}</span>
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
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              <Sun className="w-8 h-8 text-blue-600" />
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderStepIndicator()}
            <div className="mt-12">
              {renderStep()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}