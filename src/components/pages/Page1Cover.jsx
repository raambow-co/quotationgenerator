import React from 'react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { Shield, Award, Zap, CheckCircle2, Calendar, FileText, MapPin, User, Phone, Mail, Sun, CheckCircle } from 'lucide-react';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page1Cover({ quotation, settings }) {
  const company = settings?.company || {};
  const customer = quotation?.customer || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  return (
    <div className="a4-preview-sheet p-8 sm:p-10 flex flex-col justify-between text-slate-800 bg-white relative">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-900 via-brand-700 to-solar-orange" />

      {/* Header with Jayarams Brand Lockup & Statutory Scheme Logos */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-3">
            <img 
              src="/jayarams-logo-lockup.png" 
              alt="JAYARAMS" 
              className="h-14 sm:h-16 object-contain"
            />
          </div>
          
          {/* Statutory Scheme Emblems Header (MNRE & PM Surya Ghar) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-3.5">
              <img 
                src={EMBLEMS.pmSuryaGhar} 
                alt="PM Surya Ghar Muft Bijli Yojana" 
                className="h-11 object-contain"
              />
              <img 
                src={EMBLEMS.mnre} 
                alt="MNRE Govt of India" 
                className="h-10 object-contain"
              />
            </div>
            
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-brand-900 text-[10px] font-bold tracking-wide border border-slate-200 uppercase">
                <FileText className="w-3 h-3 text-solar-orange" />
                <span>Techno-Commercial Proposal</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono font-medium">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
              <p className="text-[10px] text-slate-400">Date: {formatDate(quotation?.date || new Date())}</p>
            </div>
          </div>
        </div>

        {/* Hero Section with Photographic Solar Backdrop */}
        <div className="mt-4 rounded-xl text-white p-6 relative overflow-hidden shadow-sm border border-slate-800">
          {/* Real Solar Rooftop Background Image with dark subtle gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80" 
              alt="Solar Array" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-brand-950/90 to-brand-900/80" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20">
                <Sun className="w-3 h-3 text-solar-warm" />
                Grid-Interactive Solar PV Solution
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                <CheckCircle className="w-3 h-3" />
                MNRE Approved EPC
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-display">
              Techno-Commercial Solar Proposal
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed">
              Tailored high-efficiency solar photovoltaic power generation system engineered for maximum energy yield, structural durability, and substantial utility bill savings.
            </p>

            <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Proposed Capacity</p>
                <p className="text-xl font-black text-solar-warm">{technical?.systemCapacityKw || 5} <span className="text-xs font-semibold text-white">kWp</span></p>
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">System Type</p>
                <p className="text-xs font-bold text-white mt-1">On-Grid Interactive</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Est. Annual Generation</p>
                <p className="text-xs font-bold text-white mt-1">~{technical?.estimatedAnnualUnits || '7,500'} Units/yr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Site Details Grid */}
        <div className="mt-4">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Client & Site Specifications
          </h2>
          <div className="grid grid-cols-2 gap-3 bg-slate-50/90 p-3.5 rounded-lg border border-slate-200 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Client Name</span>
                  <span className="font-bold text-slate-900 text-sm">{customer?.name || 'Valued Customer'}</span>
                  {customer?.companyName && <span className="text-slate-500 block text-xs">{customer.companyName}</span>}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Installation Site</span>
                  <span className="text-slate-700 font-medium">{customer?.location || 'Hyderabad, Telangana'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 border-l border-slate-200 pl-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Contact No.</span>
                  <span className="text-slate-700 font-medium">{customer?.phone || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Grid Phase</span>
                  <span className="text-slate-700 font-medium">{customer?.gridPhase || '3-Phase'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Sanctioned Load</span>
                  <span className="text-slate-700 font-medium">{customer?.sanctionedLoad || '10 kW'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase font-semibold">Roof Type</span>
                  <span className="text-slate-700 font-medium">{customer?.roofType || 'RCC Flat Concrete'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Letter with Visual Inset Photo */}
        <div className="mt-3.5 p-3.5 rounded-lg bg-white border border-slate-200 flex gap-4 items-center">
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 mb-1">
              Dear {customer?.name ? customer.name.split(' ')[0] : 'Sir / Madam'},
            </p>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Thank you for considering <strong className="text-slate-900">JAYARAMS SOLAR SOLUTIONS</strong> for your rooftop solar installation. We are dedicated to delivering top-tier engineering standards, uncompromising quality, and long-term performance assurance.
            </p>
            <p className="text-[11px] leading-relaxed text-slate-600 mt-1.5">
              This proposal details the technical architecture, high-efficiency Tier-1 equipment specifications, transparent investment economics, and our turnkey roadmap from statutory DISCOM net-metering approvals to lifetime remote monitoring.
            </p>
          </div>
          
          {/* Architectural Solar Inset Graphic (100% Full Uncropped Image) */}
          <div className="w-44 h-28 rounded-lg overflow-hidden border border-slate-200 relative shrink-0 shadow-xs bg-slate-950 flex items-center justify-center">
            <img 
              src="/assets/jayarams-engineering.png" 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover blur-sm opacity-35 scale-110 select-none pointer-events-none"
            />
            <img 
              src="/assets/jayarams-engineering.png" 
              alt="Jayarams Engineering" 
              className="relative z-10 max-h-full max-w-full object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 z-20 bg-slate-900/85 backdrop-blur-xs text-white text-[8px] font-bold py-0.5 text-center">
              Jayarams Engineering
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-3.5 grid grid-cols-4 gap-2.5">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <Shield className="w-4 h-4 text-brand-700 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-800">25-Year Warranty</p>
            <p className="text-[9px] text-slate-500">Tier-1 linear yield protection</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <Award className="w-4 h-4 text-solar-orange mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-800">MNRE Certified</p>
            <p className="text-[9px] text-slate-500">Eligible for Central Subsidies</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <Zap className="w-4 h-4 text-brand-700 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-800">Up to 90% Savings</p>
            <p className="text-[9px] text-slate-500">Rapid 3.2-3.8 year payback</p>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <p className="text-[11px] font-bold text-slate-800">Turnkey EPC</p>
            <p className="text-[9px] text-slate-500">End-to-end Net Metering</p>
          </div>
        </div>
      </div>

      {/* Page 1 Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
        <div>
          <span className="font-semibold text-slate-700">{company.name}</span> &bull; {company.tagline}
        </div>
        <div className="flex items-center gap-4">
          <span>Proposal Validity: {quotation?.validityDays || 30} Days</span>
          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 1 of 5</span>
        </div>
      </div>
    </div>
  );
}
