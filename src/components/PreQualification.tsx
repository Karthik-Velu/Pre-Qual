import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, DollarSign, Calendar, Lock } from 'lucide-react';

export function PreQualification() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanPurpose: '',
    loanAmount: 25000,
    employmentStatus: '',
    annualIncome: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    dateOfBirth: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    setStep(4); // Move to success step
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
              {s === 1 ? 'Loan Details' : s === 2 ? 'Personal Info' : 'Review'}
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
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Purpose
                  </label>
                  <select
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select purpose</option>
                    <option value="debt_consolidation">Debt Consolidation</option>
                    <option value="home_improvement">Home Improvement</option>
                    <option value="major_purchase">Major Purchase</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Loan Amount: ${formData.loanAmount.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    name="loanAmount"
                    min={5000}
                    max={50000}
                    step={1000}
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$5,000</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select status</option>
                    <option value="employed">Employed</option>
                    <option value="self_employed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="text"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    placeholder="Enter your annual income"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.loanPurpose || !formData.employmentStatus || !formData.annualIncome}
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
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security Number
                  </label>
                  <input
                    type="password"
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleInputChange}
                    placeholder="XXX-XX-XXXX"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Loan Details</h4>
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Loan Purpose</dt>
                      <dd className="font-medium">{formData.loanPurpose}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Loan Amount</dt>
                      <dd className="font-medium">${formData.loanAmount.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Employment Status</dt>
                      <dd className="font-medium">{formData.employmentStatus}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Annual Income</dt>
                      <dd className="font-medium">${formData.annualIncome}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Name</dt>
                      <dd className="font-medium">{formData.firstName} {formData.lastName}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Email</dt>
                      <dd className="font-medium">{formData.email}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Phone</dt>
                      <dd className="font-medium">{formData.phone}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <dt className="text-gray-600">Address</dt>
                      <dd className="font-medium">
                        {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the terms and conditions and authorize a soft credit pull
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!formData.agreeToTerms}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Application <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              We've received your pre-qualification application and will review it shortly.
              You'll receive an email with your loan options within 24 hours.
            </p>
            
            <div className="bg-white p-6 rounded-lg border mb-6">
              <h3 className="font-semibold mb-4">Next Steps</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                  <span>Review your email for loan options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                  <span>Select your preferred loan option</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                  <span>Complete the full application process</span>
                </li>
              </ul>
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