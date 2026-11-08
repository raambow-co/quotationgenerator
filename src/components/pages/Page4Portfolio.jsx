import React from 'react';
import { Award, CheckCircle2, Star, Building2, Home, Factory, GraduationCap, MapPin, Camera, ExternalLink } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};

  return (
    <div className="a4-preview-sheet p-8 sm:p-10 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-900 via-brand-700 to-solar-orange z-10" />

      {/* Jayarams Official Subtle Watermark */}
      <Watermark />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-3">
              <img src="/jayarams-logo-lockup.png" alt="JAYARAMS" className="h-10 object-contain" />
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-bold text-slate-800 tracking-tight">PREVIOUS WORKS & PORTFOLIO SHOWCASE</p>
                <p className="text-[10px] text-slate-500">Proven Track Record Across Residential, Commercial & Industrial EPC</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="h-8 object-contain hidden sm:block" />
              <img src={EMBLEMS.mnre} alt="MNRE" className="h-8 object-contain" />
            </div>
          </div>

          {/* Proven Track Record Metrics */}
          <div className="mt-2.5 grid grid-cols-4 gap-2.5">
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-solar-warm leading-tight">850+</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">Rooftop Plants</p>
              <p className="text-[7.5px] text-slate-400">Across South India</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-white leading-tight">12.8+ MW</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">Total Capacity</p>
              <p className="text-[7.5px] text-slate-400">Grid Synchronized</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-emerald-400 leading-tight">₹4.8+ Cr</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">Annual Savings</p>
              <p className="text-[7.5px] text-slate-400">For Esteemed Clients</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-solar-warm leading-tight">100%</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">Net-Metering</p>
              <p className="text-[7.5px] text-slate-400">Zero Statutory Delays</p>
            </div>
          </div>

          {/* 4 Featured Signature Projects with 100% FULL, UNCROPPED FIELD PHOTOS */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-brand-700" />
                <span>Signature Projects Executed by JAYARAMS</span>
              </h3>
              <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                &#10003; 100% Active Telemetry & Field Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Project 1: Residential Villa Rooftop (Mangalampeta) */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                {/* 100% FULL IMAGE DISPLAY (Uncropped with ambient blur backdrop) */}
                <div className="h-60 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/portfolio/project-1.jpg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                  />
                  <img 
                    src="/assets/portfolio/project-1.jpg" 
                    alt="Residential Villa Solar Rooftop — Mangalampeta" 
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                  />
                  
                  {/* Floating Top Category Pill */}
                  <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8.5px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Home className="w-3 h-3 text-solar-warm" />
                    <span>Residential &bull; 10.0 kWp</span>
                  </div>

                  {/* Floating Top Brand Logos */}
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                    <img src="/assets/brands/waaree.png" alt="Waaree" className="h-3 object-contain" />
                    <span className="text-slate-300 text-[8px]">&bull;</span>
                    <img src="/assets/brands/sungrow.png" alt="Sungrow" className="h-3 object-contain" />
                  </div>
                </div>

                {/* Card Details Below Full Photo */}
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-[11px] truncate">Luxury Villa Rooftop — Mangalampeta</h4>
                    <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200 shrink-0">
                      GPS Geotagged
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    High-efficiency elevated pergola rooftop with zero roof puncture.
                  </p>

                  <div className="mt-1.5 grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Generation</span>
                      <span className="font-extrabold text-slate-800">15,800 kWh / yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Savings</span>
                      <span className="font-black text-emerald-600">₹ 1,34,300 / yr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 2: Commercial Healthcare (Polavaram) */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                {/* 100% FULL IMAGE DISPLAY (Uncropped with ambient blur backdrop) */}
                <div className="h-60 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/portfolio/project-2.jpg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                  />
                  <img 
                    src="/assets/portfolio/project-2.jpg" 
                    alt="Arogya Multi-Speciality Centre — Polavaram" 
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                  />
                  
                  {/* Floating Top Category Pill */}
                  <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8.5px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-solar-warm" />
                    <span>Commercial &bull; 25.0 kWp</span>
                  </div>

                  {/* Floating Top Brand Logos */}
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                    <img src="/assets/brands/tata-solar.png" alt="Tata Solar" className="h-3 object-contain" />
                    <span className="text-slate-300 text-[8px]">&bull;</span>
                    <img src="/assets/brands/growatt.png" alt="Growatt" className="h-3 object-contain" />
                  </div>
                </div>

                {/* Card Details Below Full Photo */}
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-[11px] truncate">Arogya Multi-Speciality — Polavaram</h4>
                    <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200 shrink-0">
                      GPS Geotagged
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    Powers intensive healthcare diagnostics and central HVAC cooling units.
                  </p>

                  <div className="mt-1.5 grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Generation</span>
                      <span className="font-extrabold text-slate-800">39,500 kWh / yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Savings</span>
                      <span className="font-black text-emerald-600">₹ 3,55,500 / yr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 3: Institutional Engineering Campus (Mogarala) */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                {/* 100% FULL IMAGE DISPLAY (Uncropped with ambient blur backdrop) */}
                <div className="h-60 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/portfolio/project-3.jpg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                  />
                  <img 
                    src="/assets/portfolio/project-3.jpg" 
                    alt="St. Xavier Engineering Campus — Mogarala" 
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                  />
                  
                  {/* Floating Top Category Pill */}
                  <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8.5px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-solar-warm" />
                    <span>Institutional &bull; 50.0 kWp</span>
                  </div>

                  {/* Floating Top Brand Logos */}
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                    <img src="/assets/brands/adani.png" alt="Adani" className="h-3 object-contain" />
                    <span className="text-slate-300 text-[8px]">&bull;</span>
                    <img src="/assets/brands/solis.png" alt="Solis" className="h-3 object-contain" />
                  </div>
                </div>

                {/* Card Details Below Full Photo */}
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-[11px] truncate">St. Xavier Engineering — Mogarala</h4>
                    <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200 shrink-0">
                      GPS Geotagged
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    Heavy-duty elevated anchor-ballasted mounting with multi-inverter sync.
                  </p>

                  <div className="mt-1.5 grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Generation</span>
                      <span className="font-extrabold text-slate-800">78,800 kWh / yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Savings</span>
                      <span className="font-black text-emerald-600">₹ 7,10,000 / yr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 4: Industrial Precision Facility (Thenepalle) */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                {/* 100% FULL IMAGE DISPLAY (Uncropped with ambient blur backdrop) */}
                <div className="h-60 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/portfolio/project-4.jpg" 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                  />
                  <img 
                    src="/assets/portfolio/project-4.jpg" 
                    alt="Apex Precision Tooling & Parts — Thenepalle" 
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                  />
                  
                  {/* Floating Top Category Pill */}
                  <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8.5px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <Factory className="w-3 h-3 text-solar-warm" />
                    <span>Industrial &bull; 100.0 kWp</span>
                  </div>

                  {/* Floating Top Brand Logos */}
                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                    <img src="/assets/brands/waaree.png" alt="Waaree" className="h-3 object-contain" />
                    <span className="text-slate-300 text-[8px]">&bull;</span>
                    <img src="/assets/brands/sungrow.png" alt="Sungrow" className="h-3 object-contain" />
                  </div>
                </div>

                {/* Card Details Below Full Photo */}
                <div className="p-2.5 bg-white border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-[11px] truncate">Apex Precision Tooling — Thenepalle</h4>
                    <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200 shrink-0">
                      GPS Geotagged
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">
                    Rapid 3.1-yr payback with accelerated depreciation 40% tax benefits.
                  </p>

                  <div className="mt-1.5 grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Generation</span>
                      <span className="font-extrabold text-slate-800">1,58,000 kWh / yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[7.5px] uppercase font-bold">Annual Savings</span>
                      <span className="font-black text-emerald-600">₹ 14,22,000 / yr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Testimonial & Excellence Guarantee */}
          <div className="mt-2.5 p-2 bg-gradient-to-r from-slate-100 via-brand-50/60 to-slate-100 rounded-lg border border-slate-200 flex items-center gap-2.5 shadow-xs">
            <div className="p-1.5 rounded-full bg-white shadow-xs shrink-0 border border-slate-200">
              <Star className="w-4 h-4 text-solar-warm fill-solar-warm" />
            </div>
            <div>
              <p className="text-[9.5px] italic text-slate-700 leading-tight">
                &ldquo;Jayarams delivered our turnkey solar rooftop seamlessly in 5 days with flawless zero-puncture roof engineering. The online telemetry app gives real-time yield and our bills dropped by 88%.&rdquo;
              </p>
              <p className="text-[8.5px] font-extrabold text-slate-800 mt-0.5 flex items-center gap-1.5">
                <span>&mdash; Dr. K. S. Rao, Jubilee Hills</span>
                <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-bold text-[7.5px] border border-emerald-200">
                  &#10003; Verified Client
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>All showcased installations are active & grid synchronized</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 4 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
