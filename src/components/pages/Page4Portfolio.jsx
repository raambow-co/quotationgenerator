import React from 'react';
import { Award, CheckCircle2, Star, Building2, Home, Factory, GraduationCap, MapPin, Camera, ExternalLink, ShieldCheck, Wrench, Clock, Zap, ThumbsUp, Activity } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page4Portfolio({ quotation, settings }) {
  const company = settings?.company || {};
  const portfolio = settings?.portfolioWorks || {};
  const metrics = portfolio?.metrics || {};
  const projects = portfolio?.projects || [];
  const extraShowcase = portfolio?.extraShowcase || [];

  const getCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'building': return <Building2 className="w-2.5 h-2.5 text-solar-warm" />;
      case 'graduation': return <GraduationCap className="w-2.5 h-2.5 text-solar-warm" />;
      case 'factory': return <Factory className="w-2.5 h-2.5 text-solar-warm" />;
      case 'home':
      default:
        return <Home className="w-2.5 h-2.5 text-solar-warm" />;
    }
  };

  return (
    <div className="a4-preview-sheet p-7 sm:p-8 flex flex-col justify-between text-slate-800 bg-white relative overflow-hidden">
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
                <p className="text-xs font-bold text-slate-800 tracking-tight">PREVIOUS WORKS &amp; PORTFOLIO SHOWCASE</p>
                <p className="text-[10px] text-slate-500">Proven Track Record Across Residential, Commercial &amp; Industrial EPC</p>
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
              <p className="text-base font-black text-solar-warm leading-tight">{metrics.plantsCount || '850+'}</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">{metrics.plantsLabel || 'Rooftop Plants'}</p>
              <p className="text-[7.5px] text-slate-400">{metrics.plantsSubtitle || 'Across South India'}</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-white leading-tight">{metrics.capacity || '12.8+ MW'}</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">{metrics.capacityLabel || 'Total Capacity'}</p>
              <p className="text-[7.5px] text-slate-400">{metrics.capacitySubtitle || 'Grid Synchronized'}</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-emerald-400 leading-tight">{metrics.savings || '₹4.8+ Cr'}</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">{metrics.savingsLabel || 'Annual Savings'}</p>
              <p className="text-[7.5px] text-slate-400">{metrics.savingsSubtitle || 'For Esteemed Clients'}</p>
            </div>
            <div className="bg-brand-950 text-white p-2 rounded-lg text-center shadow-xs border border-brand-900">
              <p className="text-base font-black text-solar-warm leading-tight">{metrics.netMetering || '100%'}</p>
              <p className="text-[9px] text-slate-300 uppercase font-bold">{metrics.netMeteringLabel || 'Net-Metering'}</p>
              <p className="text-[7.5px] text-slate-400">{metrics.netMeteringSubtitle || 'Zero Statutory Delays'}</p>
            </div>
          </div>

          {/* 4 Featured Signature Projects with 100% FULL, UNCROPPED FIELD PHOTOS */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-brand-700" />
                <span>Signature Projects Executed by {company?.shortName || 'JAYARAMS'}</span>
              </h3>
              <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                &#10003; 100% Active Telemetry &amp; Field Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(projects.length > 0 ? projects.slice(0, 4) : [
                {
                  id: 'proj-1',
                  title: "Luxury Villa Rooftop — Mangalampeta",
                  category: "Residential • 10.0 kWp",
                  iconType: "home",
                  brand1: "/assets/brands/waaree.png",
                  brand2: "/assets/brands/sungrow.png",
                  verifiedBadge: "GPS Geotagged",
                  description: "Elevated GI pergola structure with 8.5-ft terrace clearance and zero roof puncture.",
                  annualGeneration: "15,800 kWh / yr",
                  annualSavings: "₹ 1,34,300 / yr",
                  imageUrl: "/assets/portfolio/project-1.jpg"
                },
                {
                  id: 'proj-2',
                  title: "Arogya Multi-Speciality — Polavaram",
                  category: "Commercial • 25.0 kWp",
                  iconType: "building",
                  brand1: "/assets/brands/tata-solar.png",
                  brand2: "/assets/brands/growatt.png",
                  verifiedBadge: "GPS Geotagged",
                  description: "Powers intensive healthcare diagnostics, OT facilities, and central HVAC cooling.",
                  annualGeneration: "39,500 kWh / yr",
                  annualSavings: "₹ 3,55,500 / yr",
                  imageUrl: "/assets/portfolio/project-2.jpg"
                },
                {
                  id: 'proj-3',
                  title: "St. Xavier Engineering — Mogarala",
                  category: "Institutional • 50.0 kWp",
                  iconType: "graduation",
                  brand1: "/assets/brands/adani.png",
                  brand2: "/assets/brands/solis.png",
                  verifiedBadge: "GPS Geotagged",
                  description: "Heavy-duty elevated anchor-ballasted mounting with multi-inverter sync.",
                  annualGeneration: "78,800 kWh / yr",
                  annualSavings: "₹ 7,10,000 / yr",
                  imageUrl: "/assets/portfolio/project-3.jpg"
                },
                {
                  id: 'proj-4',
                  title: "Apex Precision Tooling — Thenepalle",
                  category: "Industrial • 100.0 kWp",
                  iconType: "factory",
                  brand1: "/assets/brands/waaree.png",
                  brand2: "/assets/brands/sungrow.png",
                  verifiedBadge: "GPS Geotagged",
                  description: "Rapid 3.1-yr payback with accelerated depreciation 40% tax benefits.",
                  annualGeneration: "1,58,000 kWh / yr",
                  annualSavings: "₹ 14,22,000 / yr",
                  imageUrl: "/assets/portfolio/project-4.jpg"
                }
              ]).map((proj, idx) => (
                <div key={proj.id || idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                  {/* 100% FULL IMAGE DISPLAY */}
                  <div className="h-28 sm:h-30 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={proj.imageUrl || "/assets/portfolio/project-1.jpg"} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                    />
                    <img 
                      src={proj.imageUrl || "/assets/portfolio/project-1.jpg"} 
                      alt={proj.title} 
                      className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                    />
                    
                    {/* Floating Top Category Pill */}
                    <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      {getCategoryIcon(proj.iconType)}
                      <span>{proj.category}</span>
                    </div>

                    {/* Floating Top Brand Logos */}
                    {(proj.brand1 || proj.brand2) && (
                      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                        {proj.brand1 && <img src={proj.brand1} alt={proj.brand1Name || ""} className="h-2.5 object-contain" />}
                        {proj.brand1 && proj.brand2 && <span className="text-slate-300 text-[8px]">&bull;</span>}
                        {proj.brand2 && <img src={proj.brand2} alt={proj.brand2Name || ""} className="h-2.5 object-contain" />}
                      </div>
                    )}
                  </div>

                  {/* Card Details Below Full Photo */}
                  <div className="p-2 bg-white border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-[10.5px] truncate">{proj.title}</h4>
                      <span className="text-[7.5px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200 shrink-0">
                        {proj.verifiedBadge || "GPS Geotagged"}
                      </span>
                    </div>
                    <p className="text-[8px] text-slate-500 mt-0.5 leading-snug truncate">
                      {proj.description}
                    </p>

                    <div className="mt-1 grid grid-cols-2 gap-2 text-[8px] bg-slate-50 p-1 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Annual Generation</span>
                        <span className="font-extrabold text-slate-800">{proj.annualGeneration}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[6.5px] uppercase font-bold">Annual Savings</span>
                        <span className="font-black text-emerald-600">{proj.annualSavings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Field Installation Showcase — 2 Extra Geotagged Rooftop Arrays */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-solar-orange" />
                <span>Field Commissioning Showcase &amp; GPS Geotagged Installations</span>
              </h3>
              <span className="text-[8.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                &#10003; 100% Active On-Grid Operation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(extraShowcase.length > 0 ? extraShowcase.slice(0, 2) : [
                {
                  id: 'extra-1',
                  title: "Multi-String Elevated Rooftop Array",
                  description: "Dual-row elevated GI structure with integrated lightning protection & conduit routing",
                  locationPill: "Chittoor, AP",
                  categoryPill: "Elevated Rooftop Array • Heavy-Duty GI MMS",
                  badgeText: "150 km/h Wind Rated",
                  imageUrl: "/assets/showcase/project-extra-1.jpeg"
                },
                {
                  id: 'extra-2',
                  title: "GPS Field-Verified Turnkey Installation",
                  description: "Thenepalle, Andhra Pradesh • Net-meter synchronized with copper chemical earthing",
                  locationPill: "Thenepalle, AP",
                  categoryPill: "GPS Geotagged Rooftop Plant",
                  badgeText: "Field Verified",
                  imageUrl: "/assets/showcase/project-extra-2.jpeg"
                }
              ]).map((item, idx) => (
                <div key={item.id || idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-card flex flex-col justify-between hover:shadow-float transition-all">
                  <div className="h-32 sm:h-34 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={item.imageUrl || "/assets/showcase/project-extra-1.jpeg"} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none select-none" 
                    />
                    <img 
                      src={item.imageUrl || "/assets/showcase/project-extra-1.jpeg"} 
                      alt={item.title} 
                      className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                    />
                    
                    {/* Floating Top Category Pill */}
                    <div className="absolute top-2 left-2 z-20 bg-brand-950/90 backdrop-blur-md text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      {idx === 0 ? <Zap className="w-2.5 h-2.5 text-solar-warm" /> : <MapPin className="w-2.5 h-2.5 text-solar-warm" />}
                      <span>{item.categoryPill}</span>
                    </div>

                    {/* Floating Verified Badge */}
                    <div className="absolute top-2 right-2 z-20 bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[7.5px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{item.badgeText}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-white border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-[10.5px]">{item.title}</h4>
                      <p className="text-[8px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
                    </div>
                    <span className="text-[7.5px] text-brand-900 bg-brand-50 px-1.5 py-0.5 rounded font-bold border border-brand-200 shrink-0">
                      {item.locationPill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>All showcased installations are active &amp; grid synchronized</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 4 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
