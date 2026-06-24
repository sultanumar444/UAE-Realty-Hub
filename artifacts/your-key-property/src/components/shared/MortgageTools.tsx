import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currency";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { GetInTouchDialog } from "@/components/shared/GetInTouchDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const tooltipStyle = {
  contentStyle: {
    background: "rgba(10, 22, 40, 0.92)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "0px",
    fontFamily: "'Questrial', sans-serif",
    fontSize: "12px",
    color: "#fff",
  },
  labelStyle: { color: "rgba(255,255,255,0.6)", fontFamily: "'Questrial', sans-serif", fontSize: "11px" },
  itemStyle: { color: "#fff" },
};

function monthlyPayment(principal: number, annualRate: number, years: number) {
  if (principal <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function Control({
  label,
  unit,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-mono text-white/70 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-mono text-secondary">
          {display}
          <span className="text-white/40 ms-1">{unit}</span>
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} />
    </div>
  );
}

function ResultCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-white/5 p-4 border border-white/10">
      <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">{label}</div>
      <div className={`text-xl font-mono truncate ${accent ? "text-secondary" : "text-white"}`}>{value}</div>
    </div>
  );
}

/* ---------------- Mortgage Calculator ---------------- */
function MortgageCalculator() {
  const { formatPrice } = useCurrency();
  const [price, setPrice] = useState(1500000);
  const [downPct, setDownPct] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const downAmount = (price * downPct) / 100;
  const loan = price - downAmount;
  const monthly = monthlyPayment(loan, rate, years);

  const pieData = [
    { name: "Down Payment", value: Math.round(downAmount) },
    { name: "Loan", value: Math.round(loan) },
  ];
  const COLORS = ["#C9974C", "#7c6df2"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Control label="Property Price" unit="AED" value={price} display={formatPrice(price)} min={300000} max={30000000} step={50000} onChange={setPrice} />
        <Control label="Down Payment" unit="%" value={downPct} display={`${downPct}`} min={10} max={80} step={1} onChange={setDownPct} />
        <Control label="Interest Rate" unit="%" value={rate} display={rate.toFixed(2)} min={1} max={10} step={0.05} onChange={setRate} />
        <Control label="Loan Period" unit="yrs" value={years} display={`${years}`} min={5} max={30} step={1} onChange={setYears} />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <ResultCard label="Down Payment" value={formatPrice(downAmount)} />
          <ResultCard label="Total Interest" value={formatPrice(monthly * years * 12 - loan)} accent />
        </div>
      </div>
      <div className="bg-[#0A1628]/60 border border-white/10 p-6 flex flex-col">
        <div className="relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={pieData} innerRadius={62} outerRadius={88} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} stroke="none" />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} formatter={(v: number) => formatPrice(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block" style={{ background: COLORS[0] }} />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">Down Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block" style={{ background: COLORS[1] }} />
            <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">Loan</span>
          </div>
        </div>
        <div className="text-center mt-5">
          <div className="text-4xl font-mono text-white">{formatPrice(monthly)}</div>
          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-1">Monthly Payment</div>
        </div>
        <div className="bg-secondary mt-6 p-5 text-center">
          <div className="text-[10px] font-mono text-[#0A1628]/70 uppercase tracking-widest mb-1">Total Loan Amount</div>
          <div className="text-2xl font-mono font-bold text-[#0A1628]">{formatPrice(loan)}</div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Link href="/properties">
              <Button className="w-full bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-none font-mono text-[11px] uppercase tracking-widest">
                View Units
              </Button>
            </Link>
            <GetInTouchDialog>
              <Button className="w-full bg-[#0A1628] hover:bg-[#0A1628]/90 text-white rounded-none font-mono text-[11px] uppercase tracking-widest">
                Get Pre-Approval
              </Button>
            </GetInTouchDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Amortization ---------------- */
function Amortization() {
  const { formatPrice, symbol, convert } = useCurrency();
  const [loan, setLoan] = useState(1125000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const data = useMemo(() => {
    const monthly = monthlyPayment(loan, rate, years);
    const r = rate / 100 / 12;
    let balance = loan;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;
    const rows = [];
    for (let year = 1; year <= years; year++) {
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        const principal = monthly - interest;
        balance = Math.max(0, balance - principal);
        cumulativeInterest += interest;
        cumulativePrincipal += principal;
      }
      rows.push({
        year: `Y${year}`,
        balance: Math.round(balance),
        principal: Math.round(cumulativePrincipal),
        interest: Math.round(cumulativeInterest),
      });
    }
    return rows;
  }, [loan, rate, years]);

  const totalInterest = data[data.length - 1]?.interest ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-6 lg:col-span-1">
        <Control label="Loan Amount" unit="AED" value={loan} display={formatPrice(loan)} min={200000} max={20000000} step={25000} onChange={setLoan} />
        <Control label="Interest Rate" unit="%" value={rate} display={rate.toFixed(2)} min={1} max={10} step={0.05} onChange={setRate} />
        <Control label="Loan Period" unit="yrs" value={years} display={`${years}`} min={5} max={30} step={1} onChange={setYears} />
        <div className="grid grid-cols-1 gap-3 pt-2">
          <ResultCard label="Total Interest Paid" value={formatPrice(totalInterest)} accent />
          <ResultCard label="Total Repayment" value={formatPrice(loan + totalInterest)} />
        </div>
      </div>
      <div className="lg:col-span-2 h-[320px]">
        <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest mb-4">Balance & Equity Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="mtPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9974C" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#C9974C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mtBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c6df2" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7c6df2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} tickFormatter={(val) => `${symbol} ${(convert(val) / 1000000).toFixed(1)}M`} tickLine={false} axisLine={false} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => formatPrice(v)} />
            <Area type="monotone" dataKey="principal" name="Equity (Principal Paid)" stroke="#C9974C" fill="url(#mtPrincipal)" />
            <Area type="monotone" dataKey="balance" name="Outstanding Balance" stroke="#7c6df2" fill="url(#mtBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- Refinancing ---------------- */
function Refinancing() {
  const { formatPrice } = useCurrency();
  const [balance, setBalance] = useState(1000000);
  const [currentRate, setCurrentRate] = useState(5.5);
  const [newRate, setNewRate] = useState(4.0);
  const [years, setYears] = useState(20);

  const currentMonthly = monthlyPayment(balance, currentRate, years);
  const newMonthly = monthlyPayment(balance, newRate, years);
  const monthlySaving = currentMonthly - newMonthly;
  const lifetimeSaving = monthlySaving * years * 12;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Control label="Outstanding Balance" unit="AED" value={balance} display={formatPrice(balance)} min={200000} max={20000000} step={25000} onChange={setBalance} />
        <Control label="Current Rate" unit="%" value={currentRate} display={currentRate.toFixed(2)} min={1} max={10} step={0.05} onChange={setCurrentRate} />
        <Control label="New Rate" unit="%" value={newRate} display={newRate.toFixed(2)} min={1} max={10} step={0.05} onChange={setNewRate} />
        <Control label="Remaining Period" unit="yrs" value={years} display={`${years}`} min={5} max={30} step={1} onChange={setYears} />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ResultCard label="Current Monthly" value={formatPrice(currentMonthly)} />
          <ResultCard label="New Monthly" value={formatPrice(newMonthly)} accent />
        </div>
        <div className="bg-secondary/10 border border-secondary/30 p-6 text-center">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-2">Estimated Lifetime Saving</div>
          <div className={`text-3xl font-mono ${lifetimeSaving >= 0 ? "text-secondary" : "text-red-400"}`}>{formatPrice(lifetimeSaving)}</div>
          <div className="text-xs font-mono text-white/50 mt-2">
            {monthlySaving >= 0 ? `${formatPrice(monthlySaving)} saved every month` : "Refinancing increases your payment"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Rent vs Buy ---------------- */
function RentVsBuy() {
  const { formatPrice, symbol, convert } = useCurrency();
  const [price, setPrice] = useState(1500000);
  const [rent, setRent] = useState(90000);
  const [years, setYears] = useState(10);
  const [appreciation, setAppreciation] = useState(5);

  const data = useMemo(() => {
    const downPct = 25;
    const loan = price - (price * downPct) / 100;
    const monthly = monthlyPayment(loan, 4.5, 25);
    let value = price;
    let buyCost = (price * downPct) / 100;
    let rentCost = 0;
    let annualRent = rent;
    const rows = [];
    for (let year = 1; year <= years; year++) {
      buyCost += monthly * 12 + price * 0.015;
      rentCost += annualRent;
      annualRent *= 1.05;
      value *= 1 + appreciation / 100;
      const buyNet = buyCost - value;
      rows.push({ year: `Y${year}`, buy: Math.round(buyNet), rent: Math.round(rentCost) });
    }
    return rows;
  }, [price, rent, years, appreciation]);

  const final = data[data.length - 1];
  const buyWins = final ? final.buy < final.rent : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="space-y-6 lg:col-span-1">
        <Control label="Property Price" unit="AED" value={price} display={formatPrice(price)} min={300000} max={20000000} step={50000} onChange={setPrice} />
        <Control label="Annual Rent" unit="AED" value={rent} display={formatPrice(rent)} min={20000} max={1000000} step={5000} onChange={setRent} />
        <Control label="Appreciation" unit="%" value={appreciation} display={appreciation.toFixed(1)} min={0} max={15} step={0.5} onChange={setAppreciation} />
        <Control label="Horizon" unit="yrs" value={years} display={`${years}`} min={3} max={25} step={1} onChange={setYears} />
        <div className={`p-4 border text-center ${buyWins ? "bg-secondary/10 border-secondary/30" : "bg-white/5 border-white/10"}`}>
          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">Verdict</div>
          <div className={`text-lg font-mono ${buyWins ? "text-secondary" : "text-white"}`}>
            {buyWins ? "Buying wins long-term" : "Renting is cheaper here"}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 h-[320px]">
        <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest mb-4">Net Cost of Buying vs Renting</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} tickFormatter={(val) => `${symbol} ${(convert(val) / 1000000).toFixed(1)}M`} tickLine={false} axisLine={false} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => formatPrice(v)} />
            <Area type="monotone" dataKey="buy" name="Net Cost — Buy" stroke="#C9974C" fill="transparent" />
            <Area type="monotone" dataKey="rent" name="Cumulative Rent" stroke="#7c6df2" fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------------- House Affordability ---------------- */
function Affordability() {
  const { formatPrice } = useCurrency();
  const [income, setIncome] = useState(40000);
  const [debts, setDebts] = useState(3000);
  const [savings, setSavings] = useState(500000);
  const [rate, setRate] = useState(4.5);

  const maxInstalment = income * 0.5 - debts;
  const r = rate / 100 / 12;
  const n = 25 * 12;
  const maxLoan = maxInstalment > 0 ? (maxInstalment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : 0;
  const downCovered = savings;
  const maxPrice = maxLoan + downCovered;

  const barData = [
    { name: "Down Payment", value: Math.round(downCovered) },
    { name: "Financed", value: Math.round(maxLoan) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Control label="Monthly Income" unit="AED" value={income} display={formatPrice(income)} min={10000} max={300000} step={1000} onChange={setIncome} />
        <Control label="Monthly Debts" unit="AED" value={debts} display={formatPrice(debts)} min={0} max={100000} step={500} onChange={setDebts} />
        <Control label="Savings for Down Payment" unit="AED" value={savings} display={formatPrice(savings)} min={0} max={10000000} step={25000} onChange={setSavings} />
        <Control label="Interest Rate" unit="%" value={rate} display={rate.toFixed(2)} min={1} max={10} step={0.05} onChange={setRate} />
      </div>
      <div className="space-y-4">
        <div className="bg-secondary/10 border border-secondary/30 p-6 text-center">
          <div className="text-[10px] font-mono text-secondary uppercase tracking-widest mb-2">You Can Afford Up To</div>
          <div className="text-3xl font-mono text-secondary">{formatPrice(maxPrice)}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ResultCard label="Max Loan" value={formatPrice(maxLoan)} />
          <ResultCard label="Max Monthly" value={formatPrice(Math.max(0, maxInstalment))} />
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={11} width={100} tickLine={false} axisLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => formatPrice(v)} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                <Cell fill="#C9974C" />
                <Cell fill="#7c6df2" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const TOOLS = [
  { id: "mortgage", label: "Mortgage Calculator", node: <MortgageCalculator /> },
  { id: "amortization", label: "Amortization", node: <Amortization /> },
  { id: "refinancing", label: "Refinancing", node: <Refinancing /> },
  { id: "rentvsbuy", label: "Rent vs Buy", node: <RentVsBuy /> },
  { id: "affordability", label: "House Affordability", node: <Affordability /> },
];

export function MortgageTools() {
  return (
    <div className="glass-panel p-6 md:p-8">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Mortgage Tools</h2>
        <p className="text-white/60 font-mono text-sm">Plan every financial angle of your purchase.</p>
      </div>
      <Tabs defaultValue="mortgage">
        <TabsList className="flex flex-wrap h-auto bg-transparent gap-2 mb-8 p-0">
          {TOOLS.map((tool) => (
            <TabsTrigger
              key={tool.id}
              value={tool.id}
              className="rounded-none border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/60 data-[state=active]:bg-secondary data-[state=active]:text-[#0A1628] data-[state=active]:border-secondary"
            >
              {tool.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TOOLS.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="mt-0">
            {tool.node}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
