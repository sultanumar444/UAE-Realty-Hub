import { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { Slider } from "@/components/ui/slider";

interface MortgageCalculatorProps {
  price?: number;
  className?: string;
  compact?: boolean;
}

export function MortgageCalculator({ price = 2500000, className = "", compact = false }: MortgageCalculatorProps) {
  const { formatPrice } = useCurrency();
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
    <div className={`bg-white border border-border flex flex-col ${className}`}>
      <div className={`p-6 border-b border-border ${compact ? 'pb-4' : ''}`}>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-serif font-bold text-primary`}>
          Mortgage Calculator
        </h3>
        {!compact && (
          <p className="text-muted-foreground mt-2 text-sm">
            Estimate your monthly payments and explore financing options.
          </p>
        )}
      </div>

      <div className={`p-6 space-y-6 ${compact ? 'space-y-4' : ''}`}>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-primary">Property Price</label>
            <span className="text-sm font-bold text-secondary">{formatPrice(propertyPrice)}</span>
          </div>
          <input 
            type="number" 
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-primary">Down Payment</label>
            <span className="text-sm font-bold text-secondary">{downPaymentPercent}% ({formatPrice(downPayment)})</span>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Loan Term (Years)</label>
            <input 
              type="number" 
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-muted/50 border-none outline-none focus:ring-1 focus:ring-secondary text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-primary p-6 mt-auto">
        <div className="text-center mb-6">
          <div className="text-sm text-white/70 uppercase tracking-widest font-semibold mb-2">Monthly Payment</div>
          <div className={`${compact ? 'text-3xl' : 'text-4xl'} font-serif font-bold text-secondary`}>
            {formatPrice(monthlyPayment)}
          </div>
        </div>
        
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Principal Amount</span>
            <span className="text-white font-semibold">{formatPrice(loanAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Total Interest</span>
            <span className="text-white font-semibold">{formatPrice(totalInterest)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
