import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Personal Information',
    fields: ['Full Name', 'Date of Birth', 'Address']
  },
  {
    title: 'Income Details',
    fields: ['Employment Status', 'Monthly Income', 'Years at Current Job']
  },
  {
    title: 'Loan Preferences',
    fields: ['Desired Amount', 'Loan Purpose', 'Preferred Term']
  }
];

export function PreQualificationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Get Pre-Qualified</h2>
      
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-blue-600 text-white' : 
                'bg-gray-200 text-gray-600'}
            `}>
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-gray-500">{step.fields.length} fields</p>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-1 bg-gray-200 mx-4" />
            )}
          </div>
        ))}
      </div>

      <form className="space-y-6">
        {steps[currentStep].fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field}
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Enter your ${field.toLowerCase()}`}
            />
          </div>
        ))}

        <div className="pt-4">
          <p className="text-sm text-gray-600 mb-4">
            By continuing, you agree to allow us to check your credit score. This will not affect your credit score.
          </p>
          
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(current => current - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(current => current + 1);
                } else {
                  // Handle form submission
                }
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Continue'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}