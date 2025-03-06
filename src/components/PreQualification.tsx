import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, DollarSign, Calendar, Lock } from 'lucide-react';

interface Offer {
  type: 'personal' | 'auto' | 'credit' | 'mortgage';
  name: string;
  amount: number;
  rate: number;
  term?: number;
  monthlyPayment: number;
}

export function PreQualification() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState(75000);
  const [agreeToSoftPull, setAgreeToSoftPull] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [customizedAmount, setCustomizedAmount] = useState(0);
  const [customizedTerm, setCustomizedTerm] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Sample offers - in real app, these would come from an API after soft credit pull
  const offers: Offer[] = [
    {
      type: 'personal',
      name: 'Personal Loan',
      amount: 25000,
      rate: 7.99,
      term: 60,
      monthlyPayment: 506.63
    },
    {
      type: 'auto',
      name: 'Auto Loan',
      amount: 35000,
      rate: 4.99,
      term: 72,
      monthlyPayment: 560.57
    },
    {
      type: 'credit',
      name: 'Credit Card',
      amount: 10000,
      rate: 14.99,
      monthlyPayment: 250
    },
    {
      type: 'mortgage',
      name: 'Mortgage',
      amount: 300000,
      rate: 6.5,
      term: 360,
      monthlyPayment: 1896.20
    }
  ];

  const handleContinue = () => {
    if (step === 1 && !agreeToSoftPull) {
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleOfferSelection = (offer: Offer) => {
    setSelectedOffer(offer);
    setCustomizedAmount(offer.amount);
    if (offer.term) setCustomizedTerm(offer.term);
    handleContinue();
  };

  const calculateMonthlyPayment = (amount: number, rate: number, months?: number) => {
    if (!months) return amount * (rate / 100) / 12; // Credit card minimum payment
    const monthlyRate = rate / 12 / 100;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Confirm Your Income</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income: ${income.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={30000}
                    max={500000}
                    step={1000}
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$30,000</span>
                    <span>$500,000</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={agreeToSoftPull}
                      onChange={(e) => setAgreeToSoftPull(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I authorize Aven Credit Union to perform a soft credit inquiry to check my loan eligibility.
                      This will not affect my credit score.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!agreeToSoftPull}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Check My Offers <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Your Pre-Qualified Offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.type}
                  className="bg-white rounded-lg border hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer p-6"
                  onClick={() => handleOfferSelection(offer)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold">{offer.name}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Pre-qualified
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">${offer.amount.toLocaleString()}</p>
                    <p className="text-gray-600">
                      {offer.rate}% APR
                      {offer.term ? ` for ${offer.term} months` : ''}
                    </p>
                    <p className="text-gray-600">
                      ${offer.monthlyPayment.toFixed(2)}/month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Customize Your {selectedOffer?.name}</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount: ${customizedAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={selectedOffer?.type === 'credit' ? 1000 : 5000}
                    max={selectedOffer?.amount || 50000}
                    step={100}
                    value={customizedAmount}
                    onChange={(e) => setCustomizedAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {selectedOffer?.term && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term: {customizedTerm} months
                    </label>
                    <input
                      type="range"
                      min={12}
                      max={selectedOffer.term}
                      step={12}
                      value={customizedTerm}
                      onChange={(e) => setCustomizedTerm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                  <p className="text-2xl font-bold">
                    ${calculateMonthlyPayment(
                      customizedAmount,
                      selectedOffer?.rate || 0,
                      selectedOffer?.term
                    ).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">at {selectedOffer?.rate}% APR</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              Continue to DocuSign <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Review and Sign Loan Agreement</h3>
              
              <div className="prose prose-sm max-w-none mb-6">
                <h4>Loan Details</h4>
                <ul>
                  <li>Loan Type: {selectedOffer?.name}</li>
                  <li>Loan Amount: ${customizedAmount.toLocaleString()}</li>
                  {selectedOffer?.term && <li>Term: {customizedTerm} months</li>}
                  <li>APR: {selectedOffer?.rate}%</li>
                  <li>Monthly Payment: ${calculateMonthlyPayment(
                    customizedAmount,
                    selectedOffer?.rate || 0,
                    selectedOffer?.term
                  ).toFixed(2)}</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I have reviewed and agree to the terms and conditions of the loan agreement
                  </span>
                </label>
              </div>

              <div className="flex justify-center">
                <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <FileText className="w-5 h-5 mr-2" />
                  Open in DocuSign
                </button>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!agreeToTerms}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Complete Application <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-6">
              Your loan has been approved and disbursed to your account.
            </p>
            
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="font-semibold mb-4">Loan Details</h3>
              <dl className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Loan Type</dt>
                  <dd className="font-medium">{selectedOffer?.name}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Amount</dt>
                  <dd className="font-medium">${customizedAmount.toLocaleString()}</dd>
                </div>
                {selectedOffer?.term && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Term</dt>
                    <dd className="font-medium">{customizedTerm} months</dd>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">APR</dt>
                  <dd className="font-medium">{selectedOffer?.rate}%</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Monthly Payment</dt>
                  <dd className="font-medium">${calculateMonthlyPayment(
                    customizedAmount,
                    selectedOffer?.rate || 0,
                    selectedOffer?.term
                  ).toFixed(2)}</dd>
                </div>
              </dl>
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
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">Pre-Qualification Application</span>
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
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
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
                      {s === 1 ? 'Income' :
                       s === 2 ? 'Offers' :
                       s === 3 ? 'Customize' :
                       s === 4 ? 'DocuSign' :
                       'Confirmation'}
                    </span>
                  </div>
                  {s < 5 && (
                    <div className={`
                      w-24 h-0.5 mx-4
                      ${s < step ? 'bg-blue-600' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12">
              {renderStep()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 