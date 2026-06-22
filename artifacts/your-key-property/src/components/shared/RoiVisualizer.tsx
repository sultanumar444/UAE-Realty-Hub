import { useState, useEffect } from "react";
import { useCurrency } from "@/lib/currency";
import { Slider } from "@/components/ui/slider";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const tooltipStyle = {
  contentStyle: {
    background: "rgba(10, 22, 40, 0.92)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "0px",
    backdropFilter: "blur(8px)",
    fontFamily: "'Questrial', sans-serif",
    fontSize: "12px",
    color: "#fff",
  },
  labelStyle: { color: "rgba(255,255,255,0.6)", fontFamily: "'Questrial', sans-serif", fontSize: "11px" },
  itemStyle: { color: "#fff" },
};

interface RoiVisualizerProps {
  initialPrice?: number;
  compact?: boolean;
}

const PRESETS = {
  "Dubai Marina": 6.5,
  "Downtown Dubai": 5.5,
  "Business Bay": 7.0,
  "JBR": 6.0,
  "Palm Jumeirah": 5.0,
  "Saadiyat Island": 6.0,
  "Al Reem Island": 7.5,
  "Yas Island": 7.0,
  "Custom": 6.0,
};

export function RoiVisualizer({ initialPrice = 2500000, compact = false }: RoiVisualizerProps) {
  const { formatPrice, convert, toAed, symbol, currency } = useCurrency();
  const [price, setPrice] = useState(initialPrice);
  const [priceInput, setPriceInput] = useState(String(Math.round(convert(initialPrice))));
  const [area, setArea] = useState<keyof typeof PRESETS>("Custom");
  const [rentalYield, setRentalYield] = useState(PRESETS["Custom"]);
  const [appreciation, setAppreciation] = useState(5.0);
  const [serviceCharge, setServiceCharge] = useState(1.5);
  const [downPayment, setDownPayment] = useState(25);
  const [holdingPeriod, setHoldingPeriod] = useState(10);

  useEffect(() => {
    setPriceInput(String(Math.round(convert(price))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handlePriceChange = (raw: string) => {
    setPriceInput(raw);
    setPrice(toAed(Number(raw) || 0));
  };

  // Financial Math
  const investedCapital = (price * downPayment) / 100;
  const loanAmount = price - investedCapital;
  
  // Assuming a static mortgage rate for the visualizer simplicity, e.g. 4.5%
  const mortgageRate = 4.5;
  const monthlyRate = mortgageRate / 100 / 12;
  const loanTermYears = 25;
  const totalPayments = loanTermYears * 12;
  
  const monthlyMortgage = loanAmount > 0 
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : 0;
  const annualMortgage = monthlyMortgage * 12;

  let currentPropertyValue = price;
  let cumulativeRent = 0;
  let cumulativeCosts = 0;
  let breakEvenYear: number | null = null;
  
  const chartData = [];
  
  for (let year = 1; year <= holdingPeriod; year++) {
    // Appreciation
    currentPropertyValue = currentPropertyValue * (1 + appreciation / 100);
    
    // Rent calculation (yield on current value)
    const annualRent = currentPropertyValue * (rentalYield / 100);
    cumulativeRent += annualRent;
    
    // Costs calculation (service charge on initial/current value? usually fixed or slightly inflating, let's use initial)
    const annualServiceCharge = price * (serviceCharge / 100);
    const annualCosts = annualServiceCharge + annualMortgage;
    cumulativeCosts += annualCosts;
    
    // Equity (Property Value - Remaining Loan)
    // Simple remaining loan calculation
    const remainingPayments = totalPayments - (year * 12);
    let remainingLoan = 0;
    if (remainingPayments > 0 && loanAmount > 0) {
      remainingLoan = loanAmount * (Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, year * 12)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }
    const equity = currentPropertyValue - remainingLoan;
    const netIncome = cumulativeRent - cumulativeCosts;

    // Total profit position: equity gained beyond invested capital + net rental income to date
    const totalProfit = (equity - investedCapital) + netIncome;
    if (breakEvenYear === null && totalProfit >= 0) {
      breakEvenYear = year;
    }
    
    chartData.push({
      year: `Year ${year}`,
      propertyValue: Math.round(currentPropertyValue),
      cumulativeRent: Math.round(cumulativeRent),
      cumulativeCosts: Math.round(cumulativeCosts),
      netIncome: Math.round(netIncome),
      equity: Math.round(equity)
    });
  }

  const finalYear = chartData[chartData.length - 1];
  const totalNetProfit = finalYear.equity - investedCapital + finalYear.netIncome;
  const totalRoiPercentage = (totalNetProfit / investedCapital) * 100;
  const cashOnCash = (finalYear.netIncome / holdingPeriod) / investedCapital * 100;
  const projectedExitValue = finalYear.propertyValue;
  const grossYield = rentalYield;
  
  const handleAreaChange = (newArea: keyof typeof PRESETS) => {
    setArea(newArea);
    setRentalYield(PRESETS[newArea]);
  };

  return (
    <div className={`glass-panel p-6 ${compact ? "space-y-6" : "space-y-8"}`}>
      {!compact && (
        <div className="mb-6 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Investment ROI Visualizer</h2>
          <p className="text-white/60 font-mono text-sm">Model your returns from altitude.</p>
        </div>
      )}
      
      <div className={`grid grid-cols-1 ${compact ? "" : "lg:grid-cols-3"} gap-8`}>
        {/* Controls */}
        <div className="space-y-6 lg:col-span-1 border-r border-white/10 pr-0 lg:pr-8">
          <div>
            <label className="text-xs font-mono text-secondary mb-2 block uppercase tracking-widest">Property Price ({symbol})</label>
            <input 
              type="number" 
              value={priceInput}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full bg-white/5 border border-white/20 text-white font-mono p-3 focus:outline-none focus:border-secondary"
            />
          </div>
          
          <div>
            <label className="text-xs font-mono text-secondary mb-2 block uppercase tracking-widest">Area Preset</label>
            <select 
              value={area}
              onChange={(e) => handleAreaChange(e.target.value as keyof typeof PRESETS)}
              className="w-full bg-white/5 border border-white/20 text-white font-mono p-3 focus:outline-none focus:border-secondary appearance-none"
            >
              {Object.keys(PRESETS).map(k => (
                <option key={k} value={k} className="bg-primary text-white">{k}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Rental Yield</span>
                <span className="text-xs font-mono text-secondary">{rentalYield.toFixed(1)}%</span>
              </div>
              <Slider value={[rentalYield]} min={1} max={15} step={0.1} onValueChange={(v) => { setRentalYield(v[0]); setArea("Custom"); }} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Capital Appreciation</span>
                <span className="text-xs font-mono text-secondary">{appreciation.toFixed(1)}%</span>
              </div>
              <Slider value={[appreciation]} min={-5} max={20} step={0.1} onValueChange={(v) => setAppreciation(v[0])} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Service Charge & Costs</span>
                <span className="text-xs font-mono text-secondary">{serviceCharge.toFixed(1)}%</span>
              </div>
              <Slider value={[serviceCharge]} min={0} max={5} step={0.1} onValueChange={(v) => setServiceCharge(v[0])} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Down Payment</span>
                <span className="text-xs font-mono text-secondary">{downPayment}%</span>
              </div>
              <Slider value={[downPayment]} min={10} max={100} step={5} onValueChange={(v) => setDownPayment(v[0])} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-white/70 uppercase">Holding Period (Years)</span>
                <span className="text-xs font-mono text-secondary">{holdingPeriod}</span>
              </div>
              <Slider value={[holdingPeriod]} min={1} max={15} step={1} onValueChange={(v) => setHoldingPeriod(v[0])} />
            </div>
          </div>
        </div>
        
        {/* Results & Visuals */}
        <div className={`space-y-8 ${compact ? "" : "lg:col-span-2"}`}>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Total ROI</div>
              <div className={`text-xl font-mono ${totalRoiPercentage >= 0 ? "text-green-400" : "text-red-400"}`}>{totalRoiPercentage >= 0 ? "+" : ""}{totalRoiPercentage.toFixed(1)}%</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Gross Yield</div>
              <div className="text-xl font-mono text-white">{grossYield.toFixed(1)}%</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Net Yield</div>
              <div className="text-xl font-mono text-white">{(rentalYield - serviceCharge).toFixed(1)}%</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Cash on Cash</div>
              <div className="text-xl font-mono text-white">{cashOnCash.toFixed(1)}%</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Break-Even</div>
              <div className="text-xl font-mono text-white">{breakEvenYear ? `Year ${breakEvenYear}` : `> ${holdingPeriod}y`}</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Projected Exit Value</div>
              <div className="text-xl font-mono text-white truncate">{formatPrice(projectedExitValue)}</div>
            </div>
            <div className="bg-white/5 p-4 border border-white/10 md:col-span-2">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">Total Net Profit</div>
              <div className="text-xl font-mono text-secondary truncate">{formatPrice(totalNetProfit)}</div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="space-y-8">
            <div className="h-[250px]">
              <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest mb-4">Projected Value & Equity</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9974C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C9974C" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} tickFormatter={(val) => `${symbol} ${(convert(val)/1000000).toFixed(1)}M`} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} formatter={(value: number) => formatPrice(value)} cursor={{ stroke: 'rgba(255,255,255,0.2)' }} />
                  <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#C9974C" fillOpacity={1} fill="url(#colorValue)" />
                  <Area type="monotone" dataKey="equity" name="Total Equity" stroke="#10b981" fillOpacity={1} fill="url(#colorEquity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-[250px]">
              <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest mb-4">Cumulative Rent vs Costs</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} tickFormatter={(val) => `${symbol} ${(convert(val)/1000000).toFixed(1)}M`} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} formatter={(value: number) => formatPrice(value)} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="cumulativeRent" name="Cumulative Rent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cumulativeCosts" name="Cumulative Costs" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}