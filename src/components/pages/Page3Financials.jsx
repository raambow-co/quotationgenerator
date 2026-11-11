import React from 'react';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { IndianRupee, TrendingUp, CheckCircle, Clock, ShieldCheck, Sparkles, CheckCircle2, Info, BarChart2, DollarSign, Percent } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const commercials = quotation?.commercials || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};
  const paymentMilestones = quotation?.paymentMilestones || settings?.defaultPaymentTerms || [];

  const dcKw = technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.5;
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const tariff = technical?.tariff || 8.5;

  const ratePerKw = commercials?.ratePerKw || 52000;
  const baseCost = commercials?.baseCost || Math.round(dcKw * ratePerKw);
  const discount = Math.round(commercials?.discount || 0);
  const priceAfterDiscount = commercials?.priceAfterDiscount || (baseCost - discount);
  const gstRate = commercials?.gstRate || 13.8;
  const gst = commercials?.gstAmount || Math.round((priceAfterDiscount * gstRate) / 100);
  const totalGross = commercials?.totalGrossCost || (priceAfterDiscount + gst);
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalGross - subsidy);

  // Exact arithmetic: annualKwh * tariff
  const annualSavings = Math.round(technical?.estimatedAnnualSavings || (annualKwh * tariff));
  const paybackYears = commercials?.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.3');

  // Exact 25-Year Calculations:
  // 1. Gross Undiscounted Value of Electricity Produced over 25 Years
  const gross25YrSavings = commercials?.gross25YrSavings || (annualSavings * 25);
  
  // 2. Net 25-Year Financial Profit (Gross Avoided Grid Expenses MINUS Net Initial Out-of-Pocket Cost)
  const net25YrProfit = commercials?.net25YrProfit || Math.max(0, gross25YrSavings - netPayable);

  // Milestone Progression Array with consistent Gross and Net tracking
  const pbYearFloat = parseFloat(paybackYears);
  const cashflowProgression = [
    { 
      year: 'Yr 1', 
      gross: annualSavings, 
      net: annualSavings - netPayable,
      label: 'Initial Yield'
    },
    { 
      year: `Yr ${paybackYears}`, 
      gross: Math.round(annualSavings * pbYearFloat), 
      net: 0, 
      isPayback: true,
      label: '★ Capital Recovered'
    },
    { 
      year: 'Yr 5', 
      gross: annualSavings * 5, 
      net: (annualSavings * 5) - netPayable,
      label: 'Net Profiting'
    },
    { 
      year: 'Yr 10', 
      gross: annualSavings * 10, 
      net: (annualSavings * 10) - netPayable,
      label: '10-Yr Milestone'
    },
    { 
      year: 'Yr 15', 
      gross: annualSavings * 15, 
      net: (annualSavings * 15) - netPayable,
      label: '15-Yr Milestone'
    },
    { 
      year: 'Yr 25', 
      gross: gross25YrSavings, 
      net: net25YrProfit, 
      isMax: true,
      label: '25-Yr Net Gain'
    }
  ];

  return (
    <div className="a4-preview-sheet p-7 sm:p-8 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-brand-700 to-solar-orange z-10" />

      {/* Jayarams Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-3">
              <img src="/jayarams-logo-lockup.png" alt="JAYARAMS SOLAR SOLUTIONS" className="h-9 object-contain" />
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-bold text-slate-800 tracking-tight">COMMERCIAL PROPOSAL &amp; FINANCIAL ECONOMICS</p>
                <p className="text-[10px] text-slate-500">Transparent EPC Pricing, PM Surya Ghar Central CFA &amp; ROI Model</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={EMBLEMS.mnre} alt="MNRE" className="h-7 object-contain hidden sm:block" />
              <div className="text-right text-[10px] text-slate-500">
                <p className="font-mono font-medium text-slate-700">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
                <p>System Size: {dcKw} kWp DC</p>
              </div>
            </div>
          </div>

          {/* Financial Layout: 2 Columns (Investment Table + ROI Card) */}
          <div className="mt-3 grid grid-cols-12 gap-3">
            {/* Left Column: Commercial Investment Breakdown (7 Cols) */}
            <div className="col-span-7 bg-white/95 border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
              <div>
                <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-brand-700" />
                    Commercial Investment Schedule
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-medium">All figures in INR (₹)</span>
                </div>

                <div className="p-2.5 space-y-1 text-xs">
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600">Base Turnkey EPC Cost ({dcKw} kWp DC @ {formatCurrency(ratePerKw)}/kWp)</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(baseCost)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center py-0.5 border-b border-slate-100 text-emerald-700">
                      <span className="font-medium">Special Commercial Discount</span>
                      <span className="font-semibold">- {formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600">Taxable EPC Sub-Total</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(priceAfterDiscount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
                    <span className="text-slate-600">
                      Composite GST ({gstRate}% as per MNRE 70:30 EPC norms)
                    </span>
                    <span className="font-semibold text-slate-800">{formatCurrency(gst)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 bg-slate-50 px-2 rounded font-medium">
                    <span className="text-slate-700">Total Gross Project Cost (Inc. Taxes)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(totalGross)}</span>
                  </div>

                  {subsidy > 0 && (
                    <div className="flex justify-between items-center py-1 px-2 rounded bg-amber-50 border border-amber-200 text-amber-900 shadow-xs">
                      <div className="flex items-center gap-2">
                        <img 
                          src={EMBLEMS.pmSuryaGhar} 
                          alt="PM Surya Ghar Muft Bijli Yojana" 
                          className="h-7 object-contain shrink-0" 
                        />
                        <div>
                          <span className="font-bold block text-[10px]">PM Surya Ghar: Central Govt. Subsidy (CFA)</span>
                          <span className="text-[8px] text-amber-700 font-medium">Direct Benefit Transfer (DBT) credited directly to client bank account</span>
                        </div>
                      </div>
                      <span className="font-black text-amber-800 text-xs sm:text-sm shrink-0">- {formatCurrency(subsidy)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Net Effective Customer Investment Box */}
              <div className="p-2.5 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white rounded-b-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[8.5px] uppercase font-extrabold tracking-wider text-slate-300 block">
                      Net Effective Customer Investment
                    </span>
                    <span className="text-[9px] text-slate-300">
                      Actual net out-of-pocket outlay post central DBT subsidy credit
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black tracking-tight text-white block">
                      {formatCurrency(netPayable)}
                    </span>
                    <span className="text-[8px] text-emerald-300 font-semibold">&bull; Turnkey Inclusive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: ROI & Payback Economics (5 Cols) */}
            <div className="col-span-5 bg-slate-50/95 border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Return on Investment (ROI)
                  </h4>
                </div>

                <div className="mt-1.5 space-y-1.5 text-xs">
                  <div className="bg-white p-1.5 rounded border border-slate-200">
                    <span className="text-[8.5px] text-slate-500 block uppercase font-semibold">Est. Annual Electricity Savings</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-600">{formatCurrency(annualSavings)} / yr</span>
                    <span className="text-[8px] text-slate-400 block">({formatNumber(annualKwh)} kWh &times; ₹{tariff}/kWh baseline)</span>
                  </div>

                  <div className="bg-white p-1.5 rounded border border-slate-200">
                    <span className="text-[8.5px] text-slate-500 block uppercase font-semibold">Capital Payback Period</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm sm:text-base font-black text-brand-900">{paybackYears}</span>
                      <span className="text-[10px] font-bold text-slate-600">Years</span>
                    </div>
                    <span className="text-[8px] text-emerald-700 font-medium block">100% Free solar energy generated post payback</span>
                  </div>

                  <div className="bg-white p-1.5 rounded border border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[8.5px] text-slate-500 uppercase font-semibold">25-Yr Net Financial Profit</span>
                      <span className="text-[8px] text-slate-400 font-mono">Gross: {formatCurrency(gross25YrSavings)}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-solar-orange">{formatCurrency(net25YrProfit)}</span>
                    <span className="text-[8px] text-slate-500 block">Net lifetime gain post capital recovery</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[8.5px] text-slate-600 leading-snug">
                <strong>Tax-Free Returns:</strong> Solar delivers 28% to 32% equity IRR, outperforming bank FDs and mutual funds.
              </div>
            </div>
          </div>

          {/* Comparative Asset Class Yield Analysis (Solar PV vs Traditional Investments) */}
          <div className="mt-2.5 p-2.5 bg-gradient-to-r from-slate-50 via-brand-50/50 to-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-brand-700" />
                Comparative Investment Yield: Rooftop Solar vs Traditional Asset Classes
              </span>
              <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                Highest Risk-Adjusted ROI
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[8.5px]">
              {/* Asset 1: Solar */}
              <div className="bg-white p-2 rounded-lg border-2 border-brand-800/40 shadow-xs relative overflow-hidden">
                <span className="absolute top-1 right-1 bg-solar-orange text-white text-[6.5px] font-black px-1 py-0.2 rounded uppercase">
                  Top Yield
                </span>
                <p className="font-extrabold text-brand-900 text-[9.5px]">Jayarams Solar PV</p>
                <p className="text-emerald-700 font-black text-xs mt-0.5">28% – 32% IRR</p>
                <p className="text-slate-500 text-[7.5px] mt-0.5 leading-tight">Tax-free avoided power cost &bull; Payback ~{paybackYears} Yrs</p>
              </div>

              {/* Asset 2: FD */}
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[9px]">Bank Fixed Deposit</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">6.8% – 7.2%</p>
                <p className="text-slate-500 text-[7.5px] mt-0.5 leading-tight">Pre-tax interest &bull; Taxed at slab &bull; Payback 10+ Yrs</p>
              </div>

              {/* Asset 3: Mutual Funds */}
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[9px]">Equity Mutual Funds</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">12% – 14%</p>
                <p className="text-slate-500 text-[7.5px] mt-0.5 leading-tight">Subject to market risk &bull; 12.5% LTCG &bull; Volatile</p>
              </div>

              {/* Asset 4: Real Estate */}
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <p className="font-bold text-slate-800 text-[9px]">Residential Property</p>
                <p className="text-slate-700 font-bold text-xs mt-0.5">2.5% – 3.2%</p>
                <p className="text-slate-500 text-[7.5px] mt-0.5 leading-tight">Gross rental yield &bull; Illiquid asset &bull; High upkeep</p>
              </div>
            </div>
          </div>

          {/* Visual 25-Year Cumulative Cashflow Progression (Harmonized Gross & Net) */}
          <div className="mt-2.5 p-2.5 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9.5px] font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                25-Year Financial Progression (Gross Electricity Value vs. Net Profit)
              </span>
              <span className="text-[8.5px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Capital Breakeven at Year {paybackYears}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 text-center pt-1">
              {cashflowProgression.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-1.5 rounded border transition-all ${
                    item.isPayback 
                      ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300' 
                      : item.isMax 
                        ? 'bg-emerald-50 border-emerald-300' 
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`text-[8px] font-extrabold uppercase block ${item.isPayback ? 'text-amber-800' : 'text-slate-500'}`}>
                    {item.year}
                  </span>
                  
                  {/* Gross Cumulative Electricity Value */}
                  <span className={`text-[9.5px] font-black block mt-0.5 ${item.isPayback ? 'text-amber-900' : item.isMax ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {formatCurrency(item.gross)}
                  </span>
                  <span className="text-[7px] text-slate-500 block">Gross Yield</span>

                  {/* Net Profit after capital outlay */}
                  <span className={`text-[8px] font-bold block mt-0.5 pt-0.5 border-t border-slate-200/60 ${item.net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {item.net >= 0 ? `+${formatCurrency(item.net)}` : formatCurrency(item.net)}
                  </span>
                  <span className="text-[6.5px] text-slate-400 block">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Financial Modeling Assumptions & Technical Baseline (Documentation Box) */}
          <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 text-[8px] text-slate-600 leading-tight">
            <p className="font-bold text-slate-800 text-[8.5px] mb-0.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-brand-700" />
              Documented Financial Modeling Assumptions:
            </p>
            <div className="grid grid-cols-3 gap-2 text-[7.5px] text-slate-600">
              <div>
                &bull; <strong>Tariff Baseline:</strong> ₹{tariff}/kWh residential slab. Conservative flat baseline modeled above without tariff inflation.
              </div>
              <div>
                &bull; <strong>Degradation &amp; Inflation:</strong> Factoring 0.55%/yr linear panel degradation and 3.0% annual grid tariff inflation, 25-yr net profit exceeds ₹21+ Lakhs.
              </div>
              <div>
                &bull; <strong>Subsidy Terms:</strong> ₹78,000 CFA under PM Surya Ghar DBT for residential &ge;3 kWp, credited directly to client bank by MNRE post-inspection.
              </div>
            </div>
          </div>

          {/* Milestone Payment Schedule */}
          <div className="mt-2.5">
            <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-brand-700" />
              Milestone Payment Schedule
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {paymentMilestones.map((item, idx) => (
                <div key={idx} className="bg-white/95 p-2 rounded-lg border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                    <span className="text-[9.5px] truncate">{item.milestone}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-brand-50 text-brand-900 text-[8.5px] font-extrabold border border-brand-200 shrink-0">
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-500 leading-tight">{item.description}</p>
                  <p className="text-[9px] font-bold text-slate-800 mt-1 pt-1 border-t border-slate-100">
                    Amount: {formatCurrency((netPayable * item.percentage) / 100)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Acceptance & Authorized Signatures Block with Realistic Jayarams Corporate Rubber Stamp */}
          <div className="mt-2.5 pt-2 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Client Acceptance */}
              <div className="p-3 bg-white/95 border border-slate-200 rounded-lg flex flex-col justify-between shadow-xs">
                <div>
                  <p className="font-bold text-slate-800 text-[10.5px] mb-0.5">Customer Confirmation &amp; Acceptance</p>
                  <p className="text-[8px] text-slate-500 leading-relaxed mb-4">
                    I hereby accept the technical and commercial terms of this proposal and authorize Jayarams Solar Solutions Pvt. Ltd. to initiate engineering survey, DISCOM portal filing, and installation.
                  </p>
                </div>
                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[8.5px] text-slate-600">
                  <span>Customer Signature: __________________</span>
                  <span>Date: ____________</span>
                </div>
              </div>

              {/* Jayarams Official Authorization with Visual Stamp */}
              <div className="p-3 bg-white/95 border border-slate-200 rounded-lg relative overflow-hidden flex flex-col justify-between shadow-xs">
                {/* Official Jayarams Rubber Stamp Vector Overlay */}
                <div className="absolute right-3 top-1 pointer-events-none select-none opacity-85">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-800/80 p-0.5 flex items-center justify-center transform rotate-[-8deg]">
                    <div className="w-full h-full rounded-full border border-dashed border-brand-800/80 flex flex-col items-center justify-center p-1 text-center bg-brand-50/40">
                      <span className="text-[5px] font-black uppercase text-brand-900 tracking-wider">
                        ★ JAYARAMS SOLAR SOLUTIONS ★
                      </span>
                      <span className="text-[7px] font-extrabold text-brand-800 my-0.2">
                        AUTHORIZED
                      </span>
                      <span className="text-[5px] font-bold uppercase text-slate-600 tracking-wider">
                        TECHNICAL EPC DIVISION
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-slate-800 text-[10.5px]">For JAYARAMS SOLAR SOLUTIONS PVT. LTD.</p>
                    <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-bold border border-emerald-200">
                      &#10003; Approved &amp; Signed
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-500 leading-relaxed mb-4">
                    Technical EPC Engineering &amp; Commercial Sales Division. Registered DISCOM Partner.
                  </p>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[8.5px] text-slate-600">
                  <span className="font-semibold text-brand-900">Authorized Signatory &amp; Seal</span>
                  <span>Date: {formatDate(quotation?.date || new Date())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; Bank: {company?.bankDetails?.bankName} (A/C: {company?.bankDetails?.accountNumber})
          </div>
          <div className="flex items-center gap-4">
            <span>Prices inclusive of standard delivery, testing &amp; DISCOM liaison</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 3 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
