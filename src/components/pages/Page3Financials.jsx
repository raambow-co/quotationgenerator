import React from 'react';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';
import { IndianRupee, TrendingUp, CheckCircle, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page3Financials({ quotation, settings }) {
  const company = settings?.company || {};
  const commercials = quotation?.commercials || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};
  const paymentMilestones = quotation?.paymentMilestones || settings?.defaultPaymentTerms || [];

  const baseCost = commercials?.baseCost || (technical?.systemCapacityKw || 5) * 52000;
  const discount = commercials?.discount || 0;
  const priceAfterDiscount = commercials?.priceAfterDiscount || (baseCost - discount);
  const gst = commercials?.gstAmount || Math.round(priceAfterDiscount * 0.138);
  const totalGross = commercials?.totalGrossCost || (priceAfterDiscount + gst);
  const subsidy = commercials?.subsidyAmount !== undefined ? commercials.subsidyAmount : 78000;
  const netPayable = commercials?.netPayable !== undefined ? commercials.netPayable : Math.max(0, totalGross - subsidy);

  const annualSavings = technical?.estimatedAnnualSavings || Math.round((technical?.estimatedAnnualUnits || 7500) * 8.5);
  const paybackYears = commercials?.paybackYears || (annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : '3.4');
  const cumulativeSavings = commercials?.cumulativeSavings25Years || Math.round((annualSavings * 25) - netPayable);

  // 25-Year financial milestones for visual projection chart
  const cashflowProgression = [
    { year: 'Yr 1', savings: annualSavings, net: annualSavings - netPayable },
    { year: `Yr ${paybackYears}`, savings: Math.round(annualSavings * parseFloat(paybackYears)), net: 0, isPayback: true },
    { year: 'Yr 5', savings: annualSavings * 5, net: (annualSavings * 5) - netPayable },
    { year: 'Yr 10', savings: annualSavings * 10, net: (annualSavings * 10) - netPayable },
    { year: 'Yr 15', savings: annualSavings * 15, net: (annualSavings * 15) - netPayable },
    { year: 'Yr 25', savings: annualSavings * 25, net: cumulativeSavings, isMax: true }
  ];

  return (
    <div className="a4-preview-sheet p-8 sm:p-10 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-brand-700 to-solar-orange z-10" />

      {/* Jayarams Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <img src="/jayarams-logo-lockup.png" alt="JAYARAMS" className="h-10 object-contain" />
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-bold text-slate-800 tracking-tight">COMMERCIAL PROPOSAL & FINANCIAL ECONOMICS</p>
                <p className="text-[10px] text-slate-500">Transparent Pricing, Central Subsidy & Return on Investment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={EMBLEMS.mnre} alt="MNRE" className="h-8 object-contain hidden sm:block" />
              <div className="text-right text-[10px] text-slate-500">
                <p className="font-mono font-medium text-slate-700">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
                <p>Capacity: {technical?.systemCapacityKw || 5} kWp</p>
              </div>
            </div>
          </div>

          {/* Financial Layout: 2 Columns (Investment Table + ROI Card) */}
          <div className="mt-3.5 grid grid-cols-12 gap-3">
            {/* Left Column: Commercial Investment Breakdown (7 Cols) */}
            <div className="col-span-7 bg-white/95 border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
              <div>
                <div className="bg-slate-100/90 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-brand-700" />
                    Commercial Investment Schedule
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">All figures in INR (₹)</span>
                </div>

                <div className="p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Base System EPC Cost ({technical?.systemCapacityKw || 5} kWp @ {formatCurrency(commercials?.ratePerKw || 52000)}/kW)</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(baseCost)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 text-emerald-700">
                      <span className="font-medium">Special Commercial Discount</span>
                      <span className="font-semibold">- {formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Taxable EPC Sub-Total</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(priceAfterDiscount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">
                      Composite GST ({commercials?.gstRate || 13.8}% as per MNRE norms)
                    </span>
                    <span className="font-semibold text-slate-800">{formatCurrency(gst)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 bg-slate-50 px-2 rounded font-medium">
                    <span className="text-slate-700">Total Gross Project Cost (Inc. Taxes)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(totalGross)}</span>
                  </div>

                  {subsidy > 0 && (
                    <div className="flex justify-between items-center py-1.5 px-2.5 rounded bg-amber-50 border border-amber-200/90 text-amber-900 shadow-xs">
                      <div className="flex items-center gap-2">
                        <img 
                          src={EMBLEMS.pmSuryaGhar} 
                          alt="PM Surya Ghar Muft Bijli Yojana" 
                          className="h-8 object-contain shrink-0" 
                        />
                        <div>
                          <span className="font-bold block text-[10.5px]">PM Surya Ghar: Central Govt. Subsidy</span>
                          <span className="text-[8.5px] text-amber-700 font-medium">Direct Benefit Transfer (DBT) credited directly to client bank</span>
                        </div>
                      </div>
                      <span className="font-black text-amber-800 text-xs sm:text-sm shrink-0">- {formatCurrency(subsidy)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Net Effective Customer Investment Box */}
              <div className="p-3 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 text-white rounded-b-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-300 block">
                      Net Effective Customer Investment
                    </span>
                    <span className="text-[9.5px] text-slate-300">
                      Actual net out-of-pocket after direct central subsidy benefit
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black tracking-tight text-white block">
                      {formatCurrency(netPayable)}
                    </span>
                    <span className="text-[8.5px] text-emerald-300 font-semibold">&bull; Turnkey Inclusive</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: ROI & Payback Economics (5 Cols) */}
            <div className="col-span-5 bg-slate-50/95 border border-slate-200 rounded-lg p-3 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Return on Investment (ROI)
                  </h4>
                </div>

                <div className="mt-2 space-y-2 text-xs">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block uppercase font-semibold">Est. Annual Electricity Savings</span>
                    <span className="text-sm font-extrabold text-emerald-600">{formatCurrency(annualSavings)} / yr</span>
                    <span className="text-[8.5px] text-slate-400 block">Based on ₹8.5/unit average grid tariff</span>
                  </div>

                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block uppercase font-semibold">Capital Payback Period</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-brand-900">{paybackYears}</span>
                      <span className="text-xs font-bold text-slate-600">Years</span>
                    </div>
                    <span className="text-[8.5px] text-emerald-700 font-medium block">100% Free solar electricity post payback</span>
                  </div>

                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block uppercase font-semibold">25-Year Cumulative Savings</span>
                    <span className="text-sm font-extrabold text-solar-orange">{formatCurrency(cumulativeSavings)}</span>
                    <span className="text-[8.5px] text-slate-400 block">Net profits generated over plant lifetime</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[9px] text-slate-500 italic leading-snug">
                Solar offers 28% to 34% tax-free IRR, outperforming mutual funds and fixed deposits.
              </div>
            </div>
          </div>

          {/* Visual 25-Year Cumulative Cashflow Progression Curve */}
          <div className="mt-3 p-3 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                25-Year Cumulative Financial Savings Progression
              </span>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Breakeven at Year {paybackYears}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 text-center pt-1.5">
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
                  <span className={`text-[8.5px] font-extrabold uppercase block ${item.isPayback ? 'text-amber-800' : 'text-slate-500'}`}>
                    {item.year}
                  </span>
                  <span className={`text-[10px] font-black block mt-0.5 ${item.isPayback ? 'text-amber-900' : item.isMax ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {formatCurrency(item.savings)}
                  </span>
                  <span className="text-[7.5px] text-slate-400 block">
                    {item.isPayback ? '★ Break-even' : item.isMax ? 'Lifetime Net' : 'Cumulative'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Payment Schedule */}
          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-700" />
              Milestone Payment Schedule
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {paymentMilestones.map((item, idx) => (
                <div key={idx} className="bg-white/95 p-2 rounded-lg border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                    <span className="text-[10.5px] truncate">{item.milestone}</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-brand-50 text-brand-900 text-[9px] font-extrabold border border-brand-200 shrink-0">
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-tight">{item.description}</p>
                  <p className="text-[9.5px] font-bold text-slate-800 mt-1 pt-1 border-t border-slate-100">
                    Amount: {formatCurrency((netPayable * item.percentage) / 100)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Acceptance & Authorized Signatures Block with Realistic Jayarams Corporate Rubber Stamp */}
          <div className="mt-3 pt-2.5 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-xs">
              {/* Client Acceptance */}
              <div className="p-3 bg-white/95 border border-slate-200 rounded-lg flex flex-col justify-between shadow-xs">
                <div>
                  <p className="font-bold text-slate-800 text-[10.5px] mb-0.5">Customer Confirmation & Acceptance</p>
                  <p className="text-[8.5px] text-slate-500 mb-8">
                    I hereby accept this proposal and authorize Jayarams Solar Solutions to initiate engineering & DISCOM application.
                  </p>
                </div>
                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[9px] text-slate-600">
                  <span>Customer Signature: __________________</span>
                  <span>Date: ____________</span>
                </div>
              </div>

              {/* Jayarams Official Authorization with Visual Stamp */}
              <div className="p-3 bg-white/95 border border-slate-200 rounded-lg relative overflow-hidden flex flex-col justify-between shadow-xs">
                {/* Official Jayarams Rubber Stamp Vector Overlay */}
                <div className="absolute right-3 top-2 pointer-events-none select-none opacity-85">
                  <div className="w-24 h-24 rounded-full border-2 border-brand-800/80 p-0.5 flex items-center justify-center transform rotate-[-8deg]">
                    <div className="w-full h-full rounded-full border border-dashed border-brand-800/80 flex flex-col items-center justify-center p-1 text-center bg-brand-50/40">
                      <span className="text-[5.5px] font-black uppercase text-brand-900 tracking-wider">
                        ★ JAYARAMS SOLAR SOLUTIONS ★
                      </span>
                      <span className="text-[7.5px] font-extrabold text-brand-800 my-0.5">
                        AUTHORIZED
                      </span>
                      <span className="text-[5.5px] font-bold uppercase text-slate-600 tracking-wider">
                        TECHNICAL EPC DIVISION
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-slate-800 text-[10.5px]">For JAYARAMS SOLAR SOLUTIONS</p>
                    <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                      &#10003; Approved & Signed
                    </span>
                  </div>
                  <p className="text-[8.5px] text-slate-500 mb-8">
                    Technical EPC Engineering & Commercial Sales Division.
                  </p>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-1.5 flex justify-between text-[9px] text-slate-600">
                  <span className="font-semibold text-brand-900">Authorized Signatory & Seal</span>
                  <span>Date: {formatDate(quotation?.date || new Date())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.name}</span> &bull; Bank: {company?.bankDetails?.bankName} (A/C: {company?.bankDetails?.accountNumber})
          </div>
          <div className="flex items-center gap-4">
            <span>Prices inclusive of standard delivery, testing & DISCOM liaison</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 3 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
