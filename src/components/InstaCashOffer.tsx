import React from 'react';
import { Clock, DollarSign, CalendarDays, Percent } from 'lucide-react';

interface InstaCashOfferProps {
  amount: number;
  term: number;
  apr: number;
  monthlyPayment: number;
  expiresIn: number;
}

export function InstaCashOffer({ amount, term, apr, monthlyPayment, expiresIn }: InstaCashOfferProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">InstaCash Offer</h2>
          <p className="text-blue-100">Pre-approved loan based on your cashflow</p>
        </div>
        <div className="flex items-center bg-blue-500/30 rounded-full px-4 py-2">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">Expires in {expiresIn}h</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div>
          <p className="text-blue-100 text-sm mb-1">Loan Amount</p>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="text-xl font-bold">{amount.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">Term</p>
          <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-1" />
            <span className="text-xl font-bold">{term} months</span>
          </div>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">APR</p>
          <div className="flex items-center">
            <Percent className="w-5 h-5 mr-1" />
            <span className="text-xl font-bold">{apr}%</span>
          </div>
        </div>
        <div>
          <p className="text-blue-100 text-sm mb-1">Monthly Payment</p>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="text-xl font-bold">{monthlyPayment}</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
        Accept Offer
      </button>
    </div>
  );
}