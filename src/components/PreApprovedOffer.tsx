import React, { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

interface PreApprovedOfferProps {
  type: string;
  maxAmount: number;
  minApr: number;
  maxApr: number;
  terms: number[];
  icon: React.ReactNode;
}

export function PreApprovedOffer({ type, maxAmount, minApr, maxApr, terms, icon }: PreApprovedOfferProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(maxAmount);
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);

  const monthlyPayment = (selectedAmount * (1 + maxApr/100)) / selectedTerm;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{type}</h3>
            <p className="text-gray-600">Up to ${maxAmount.toLocaleString()}</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount
            </label>
            <input
              type="range"
              min={maxAmount * 0.2}
              max={maxAmount}
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(Number(e.target.value))}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">${(maxAmount * 0.2).toLocaleString()}</span>
              <span className="text-sm text-gray-600">${selectedAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Term (months)
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {terms.map(term => (
                <option key={term} value={term}>{term} months</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">APR Range</span>
              <span className="font-medium">{minApr}% - {maxApr}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Est. Monthly Payment</span>
              <span className="font-medium">${monthlyPayment.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Continue Application
          </button>
        </div>
      )}
    </div>
  );
}