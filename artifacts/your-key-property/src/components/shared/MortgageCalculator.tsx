import { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { Slider } from "@/components/ui/slider";

interface MortgageCalculatorProps {
  price?: number;
  className?: string;
  compact?: boolean;
}

export function MortgageCalculator({ price = 2500000, className = "", compact = false }: MortgageCalculatorProps) {
  const { formatPrice, currency } = useCurrency();
  const [propertyPrice, setPropertyPrice] = useState(price);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermYears, setLoanTermYears] = useState(25);

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;
  
  // Amortization formula: M = P[r(1+r)^n]/[(1+r)^n - 1]
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;
  
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }
  
  const totalAmount = (monthlyPayment * totalPayments) + downPayment;
  const totalInterest = totalAmount - propertyPrice;

  return (
    <div className={`glass-panel flex flex-col ${className}`}>
      <div className={`p-8 border-b border-white/10 ${compact ? 'pb-6' : ''}`}>
        <h3 className={`${compact ? 'text-xl' : 'text-3xl'} font-serif font-bold text-white`}>
          Mortgage Calculator
        </h3>
        {!compact && (
          <p className="text-white/60 font-mono text-sm mt-2">
            Estimate your monthly payments.
          </p>
        )}
      </div>

      <div className={`p-8 space-y-8 ${compact ? 'space-y-6' : ''}`}>
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Property Price</label>
            <span className="text-xs font-mono font-bold text-secondary">{formatPrice(propertyPrice)}</span>
          </div>
          <input 
            type="number" 
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between mb-3">
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Down Payment</label>
            <span className="text-xs font-mono font-bold text-secondary">{downPaymentPercent}% ({formatPrice(downPayment)})</span>
          </div>
          <Slider 
            value={[downPaymentPercent]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => setDownPaymentPercent(val[0])}
            className="py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-3 block">Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-3 block">Loan Term (Years)</label>
            <input 
              type="number" 
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 outline-none focus:border-secondary text-white font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#0A1628]/80 p-8 mt-auto border-t border-white/10">
        <div className="text-center mb-8">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-3">Monthly Payment</div>
          <div className={`${compact ? 'text-4xl' : 'text-5xl'} font-serif font-bold text-secondary`}>
            {formatPrice(monthlyPayment)}
          </div>
        </div>
        
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex justify-between text-sm font-mono">
            <span className="text-white/60">Principal Amount</span>
            <span className="text-white font-bold">{formatPrice(loanAmount)}</span>
          </div>
          <div className="flex justify-between text-sm font-mono">
            <span className="text-white/60">Total Interest</span>
            <span className="text-white font-bold">{formatPrice(totalInterest)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}