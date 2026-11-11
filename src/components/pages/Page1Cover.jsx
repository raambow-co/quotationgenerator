import React from 'react';
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters';
import { Shield, Award, Zap, CheckCircle2, Calendar, FileText, MapPin, User, Phone, Mail, Sun, CheckCircle, Leaf, Trees, Clock, Compass } from 'lucide-react';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page1Cover({ quotation, settings }) {
  const company = settings?.company || {};
  const customer = quotation?.customer || {};
  const technical = quotation?.technical || {};
  const commercials = quotation?.commercials || {};

  const dcKw = technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.5;
  const acKw = technical?.acInverterCapacityKw || (technical?.systemCapacityKw ? Math.min(technical.systemCapacityKw, 5) : 5.0);
  const panelCount = technical?.panelCount || 10;
  const panelWattage = technical?.panelWattage || 550;
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));

  // Lifetime environmental metrics
  const lifetimeKwh = Math.round(annualKwh * 25);
  const co2OffsetTonnes = Math.round((lifetimeKwh * 0.82) / 1000); // 0.82 kg CO2 per kWh grid factor
  const treesEquivalent = Math.round(co2OffsetTonnes * 16.5); // ~16.5 trees per tonne of CO2

  return (
    <div className="a4-preview-sheet p-7 sm:p-8 flex flex-col justify-between text-slate-800 bg-white relative">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-brand-700 to-solar-orange" />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Jayarams Brand Lockup & Statutory Scheme Logos */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center space-x-3">
              <img 
                src="/jayarams-logo-lockup.png" 
                alt="JAYARAMS SOLAR SOLUTIONS" 
                className="h-12 sm:h-14 object-contain"
              />
            </div>
            
            {/* Statutory Scheme Emblems Header (MNRE & PM Surya Ghar) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
                <img 
                  src={EMBLEMS.pmSuryaGhar} 
                  alt="PM Surya Ghar Muft Bijli Yojana" 
                  className="h-10 object-contain"
                />
                <img 
                  src={EMBLEMS.mnre} 
                  alt="MNRE Govt of India" 
                  className="h-9 object-contain"
                />
              </div>
              
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-brand-900 text-[9.5px] font-bold tracking-wide border border-slate-200 uppercase">
                  <FileText className="w-3 h-3 text-solar-orange" />
                  <span>Techno-Commercial Proposal</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 font-mono font-medium">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
                <p className="text-[9.5px] text-slate-400">Date: {formatDate(quotation?.date || new Date())}</p>
              </div>
            </div>
          </div>

          {/* Hero Section with Photographic Solar Backdrop */}
          <div className="mt-2.5 rounded-xl text-white p-4 sm:p-5 relative overflow-hidden shadow-sm border border-slate-800">
            {/* Real Solar Rooftop Background Image with dark subtle gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/gi-structure.jpg" 
                alt="Solar Array" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-brand-950/90 to-brand-900/80" />
            </div>

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20">
                  <Sun className="w-3 h-3 text-solar-warm" />
                  Grid-Interactive Solar PV System
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9.5px] font-bold border border-emerald-400/30">
                  <CheckCircle className="w-3 h-3" />
                  DISCOM Empanelled EPC
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight font-display">
                Techno-Commercial Solar Proposal
              </h1>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Tailored high-efficiency solar photovoltaic power generation system engineered for maximum energy yield, structural durability, and substantial utility bill savings.
              </p>

              <div className="mt-2.5 pt-2.5 border-t border-white/15 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[9px] text-slate-300 font-semibold uppercase tracking-wider">Proposed DC Capacity</p>
                  <p className="text-lg font-black text-solar-warm">{dcKw} <span className="text-[11px] font-semibold text-white">kWp DC</span></p>
                  <p className="text-[8px] text-slate-300 font-medium">{panelCount} × {panelWattage}Wp Modules</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-300 font-semibold uppercase tracking-wider">Inverter AC Rating</p>
                  <p className="text-xs font-bold text-white mt-0.5">{acKw} kW AC Grid-Tied</p>
                  <p className="text-[8px] text-emerald-300 font-medium">Dual MPPT • 1.1x DC:AC</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-300 font-semibold uppercase tracking-wider">Est. Annual Generation</p>
                  <p className="text-xs font-bold text-white mt-0.5">~{formatNumber(annualKwh)} kWh/yr</p>
                  <p className="text-[8px] text-slate-300 font-medium">~{dailyKwh} kWh/day avg.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Site Details Grid */}
          <div className="mt-2.5">
            <h2 className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Client &amp; Site Specifications
            </h2>
            <div className="grid grid-cols-2 gap-3 bg-slate-50/90 p-3 rounded-lg border border-slate-200 text-xs">
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <User className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Client Name</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{customer?.name || 'Valued Customer'}</span>
                    {customer?.companyName && <span className="text-slate-500 block text-[11px]">{customer.companyName}</span>}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Installation Site Address</span>
                    <span className="text-slate-700 font-medium text-[11px]">{customer?.location || 'Plot #122, Phase-2, Jubilee Hills, Hyderabad, Telangana'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 border-l border-slate-200 pl-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Contact Mobile</span>
                    <span className="text-slate-700 font-medium text-[11px]">{customer?.phone || '+91 98492 48102'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Grid Phase</span>
                    <span className="text-slate-700 font-medium text-[11px]">{customer?.gridPhase || '3-Phase, 415V'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Sanctioned Load</span>
                    <span className="text-slate-700 font-medium text-[11px]">{customer?.sanctionedLoad || '10 kW (Connected Load)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8.5px] uppercase font-semibold">Roof Type &amp; Area</span>
                    <span className="text-slate-700 font-medium text-[11px]">{customer?.roofType || 'RCC Flat Concrete'} (~{technical?.roofAreaSqFt || 500} Sq.Ft)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Letter with Visual Inset Photo */}
          <div className="mt-2.5 p-3 rounded-lg bg-white border border-slate-200 flex gap-3.5 items-center">
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900 mb-0.5">
                Dear {customer?.name ? customer.name.split(' ')[0] : 'Sir / Madam'},
              </p>
              <p className="text-[10.5px] leading-relaxed text-slate-600">
                Thank you for considering <strong className="text-slate-900">JAYARAMS SOLAR SOLUTIONS PVT. LTD.</strong> for your rooftop solar installation. We are dedicated to delivering top-tier engineering standards, uncompromising quality, and long-term performance assurance.
              </p>
              <p className="text-[10.5px] leading-relaxed text-slate-600 mt-1">
                This proposal details the technical engineering design, Tier-1 equipment specifications, transparent investment economics, and our turnkey roadmap from statutory DISCOM net-metering facilitation to lifetime remote monitoring.
              </p>
              <p className="text-[9.5px] text-slate-500 mt-1 italic font-medium">
                For JAYARAMS SOLAR SOLUTIONS PVT. LTD. &mdash; Technical EPC Projects Division
              </p>
            </div>
            
            {/* Architectural Solar Inset Graphic (100% Full Uncropped Image) */}
            <div className="w-40 h-24 rounded-lg overflow-hidden border border-slate-200 relative shrink-0 shadow-xs bg-slate-950 flex items-center justify-center">
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
              <div className="absolute bottom-0 inset-x-0 z-20 bg-slate-900/85 backdrop-blur-xs text-white text-[7.5px] font-bold py-0.5 text-center">
                Jayarams Engineering
              </div>
            </div>
          </div>

          {/* 4 Pillars of Excellence */}
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <Shield className="w-3.5 h-3.5 text-brand-700 mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-slate-800">25-Yr Performance</p>
              <p className="text-[8px] text-slate-500">≥84.8% output; 12-yr product</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <Award className="w-3.5 h-3.5 text-solar-orange mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-slate-800">DISCOM Empanelled</p>
              <p className="text-[8px] text-slate-500">Eligible for PM Surya Ghar CFA</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <Zap className="w-3.5 h-3.5 text-brand-700 mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-slate-800">Up to 80–90% Offset*</p>
              <p className="text-[8px] text-slate-500">*Subject to load &amp; banking</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-slate-800">Turnkey EPC &amp; Liaison</p>
              <p className="text-[8px] text-slate-500">Full DISCOM facilitation</p>
            </div>
          </div>

          {/* Fast-Track Turnkey Execution Timeline (Days 1–15 Roadmap) */}
          <div className="mt-2.5 p-2.5 bg-gradient-to-r from-slate-50 via-brand-50/40 to-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-700" />
                Fast-Track Project Delivery Schedule (15-Day Turnkey SLA)
              </span>
              <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                Guaranteed On-Time Commissioning
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[8.5px]">
              <div className="bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                <span className="text-[7.5px] font-extrabold text-brand-900 bg-brand-50 px-1 py-0.2 rounded-full border border-brand-200 inline-block mb-0.5">
                  Days 1 – 3
                </span>
                <p className="font-bold text-slate-800 text-[9px]">3D Site Survey &amp; CAD</p>
                <p className="text-[7.5px] text-slate-500">LIDAR shading &amp; DISCOM portal filing</p>
              </div>

              <div className="bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                <span className="text-[7.5px] font-extrabold text-brand-900 bg-brand-50 px-1 py-0.2 rounded-full border border-brand-200 inline-block mb-0.5">
                  Days 4 – 7
                </span>
                <p className="font-bold text-slate-800 text-[9px]">Statutory Feasibility</p>
                <p className="text-[7.5px] text-slate-500">DISCOM DTR load sanction &amp; clearance</p>
              </div>

              <div className="bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                <span className="text-[7.5px] font-extrabold text-brand-900 bg-brand-50 px-1 py-0.2 rounded-full border border-brand-200 inline-block mb-0.5">
                  Days 8 – 12
                </span>
                <p className="font-bold text-slate-800 text-[9px]">Hardware &amp; Rigging</p>
                <p className="text-[7.5px] text-slate-500">Elevated GI structure, TOPCon &amp; 3 pits</p>
              </div>

              <div className="bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                <span className="text-[7.5px] font-extrabold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded-full border border-emerald-200 inline-block mb-0.5">
                  Days 13 – 15
                </span>
                <p className="font-bold text-slate-800 text-[9px]">Net-Meter &amp; Sync</p>
                <p className="text-[7.5px] text-slate-500">Bi-directional sync &amp; IoT app live</p>
              </div>
            </div>
          </div>

          {/* Environmental Lifetime Impact Badges */}
          <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-2xs">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[7.5px] text-slate-500 block uppercase font-bold">CO₂ Eliminated</span>
                <span className="text-[11px] font-black text-slate-800">~{co2OffsetTonnes} Tonnes</span>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-2xs">
              <Trees className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Trees Planted Eqv.</span>
                <span className="text-[11px] font-black text-slate-800">~{formatNumber(treesEquivalent)} Trees</span>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-2xs">
              <Sun className="w-4 h-4 text-solar-orange shrink-0" />
              <div className="text-left">
                <span className="text-[7.5px] text-slate-500 block uppercase font-bold">25-Yr Green Yield</span>
                <span className="text-[11px] font-black text-slate-800">~{formatNumber(lifetimeKwh)} kWh</span>
              </div>
            </div>

            <div className="bg-white p-1.5 rounded-lg border border-slate-200 flex items-center gap-2 shadow-2xs">
              <Compass className="w-4 h-4 text-brand-700 shrink-0" />
              <div className="text-left">
                <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Roof Integrity</span>
                <span className="text-[11px] font-black text-slate-800">Zero Puncture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-500 mt-2">
          <div>
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>Proposal Validity: {quotation?.validityDays || 30} Days</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 1 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
