import React from 'react';
import { Cpu, Zap, Sun, ShieldCheck, Activity, Layers, Cable, CheckCircle2, BarChart3 } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import Watermark from '../common/Watermark';
import { getPanelLogo, getInverterLogo, getCableLogo, EMBLEMS } from '../../utils/brandLogos';

export default function Page2SystemSpec({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};

  const kw = technical?.systemCapacityKw || 5;
  const panelCount = technical?.panelCount || Math.ceil((kw * 1000) / (technical?.panelWattage || 550));
  const dailyUnits = technical?.estimatedDailyUnits || Math.round(kw * 4.3);
  const annualUnits = technical?.estimatedAnnualUnits || Math.round(dailyUnits * 365);
  const roofArea = technical?.roofAreaSqFt || Math.round(kw * 95);

  const panelLogo = getPanelLogo(technical?.panelBrand);
  const inverterLogo = getInverterLogo(technical?.inverterBrand);
  const cableLogo = getCableLogo();

  // Month-by-month solar generation profile index (simulating seasonal solar irradiance in India)
  const monthlyProfile = [
    { month: 'Jan', factor: 0.92 },
    { month: 'Feb', factor: 0.98 },
    { month: 'Mar', factor: 1.08 },
    { month: 'Apr', factor: 1.12 },
    { month: 'May', factor: 1.06 },
    { month: 'Jun', factor: 0.82 },
    { month: 'Jul', factor: 0.72 },
    { month: 'Aug', factor: 0.75 },
    { month: 'Sep', factor: 0.86 },
    { month: 'Oct', factor: 0.95 },
    { month: 'Nov', factor: 0.94 },
    { month: 'Dec', factor: 0.90 }
  ];

  const avgMonthly = annualUnits / 12;

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
                <p className="text-xs font-bold text-slate-800 tracking-tight">TECHNICAL SPECIFICATIONS & BILL OF MATERIALS</p>
                <p className="text-[10px] text-slate-500">System Design, Engineering Architecture & Components</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <p className="font-mono font-medium text-slate-700">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
              <p>Client: {customer?.name || 'Client'}</p>
            </div>
          </div>

          {/* Visual Hardware Component Gallery with Prominent Full Images & Brand Badges */}
          <div className="mt-3.5 grid grid-cols-4 gap-3">
            {/* 1. Solar Module Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-32 rounded-lg overflow-hidden relative bg-slate-950 mb-2 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover blur-sm opacity-35 scale-110 select-none pointer-events-none"
                />
                <img 
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80" 
                  alt="Solar PV Module" 
                  className="relative z-10 max-h-full max-w-full object-contain"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={panelLogo} alt="" className="h-3.5 max-w-[55px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                  TOPCon Bifacial
                </span>
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-slate-900 truncate">{technical?.panelBrand || 'Waaree Solar'}</p>
                <p className="text-[9px] text-slate-500 font-medium">{panelCount} Modules &times; {technical?.panelWattage || 550}Wp</p>
                <span className="text-[8.5px] text-emerald-700 font-extrabold block mt-0.5">25-Yr Linear Warranty</span>
              </div>
            </div>

            {/* 2. Solar Inverter Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-32 rounded-lg overflow-hidden relative bg-slate-950 mb-2 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover blur-sm opacity-35 scale-110 select-none pointer-events-none"
                />
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80" 
                  alt="Solar Inverter" 
                  className="relative z-10 max-h-full max-w-full object-contain"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={inverterLogo} alt="" className="h-3.5 max-w-[55px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                  &gt;98.5% Eff. &bull; Dual MPPT
                </span>
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-slate-900 truncate">{technical?.inverterBrand || 'Sungrow Power'}</p>
                <p className="text-[9px] text-slate-500 font-medium">Wi-Fi Telemetry &bull; Mobile App</p>
                <span className="text-[8.5px] text-slate-700 font-extrabold block mt-0.5">10-Yr Replacement Warranty</span>
              </div>
            </div>

            {/* 3. Elevated Mounting Structure Visual (100% Full Uncropped Real Photo) */}
            <div className="bg-white rounded-xl border border-brand-200/80 p-2.5 flex flex-col justify-between shadow-xs ring-1 ring-brand-100 hover:shadow-md transition-shadow">
              <div className="h-32 rounded-lg overflow-hidden relative bg-slate-950 mb-2 border border-slate-200 flex items-center justify-center">
                <img 
                  src="/assets/gi-structure.jpg" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover blur-sm opacity-35 scale-110 select-none pointer-events-none"
                />
                <img 
                  src="/assets/gi-structure.jpg" 
                  alt="Hot-Dip Galvanized Iron (GI) Structure" 
                  className="relative z-10 max-h-full max-w-full object-contain"
                />
                <span className="absolute top-1.5 left-1.5 z-20 bg-brand-950/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                  80µ Zinc GI
                </span>
                <span className="absolute bottom-1.5 right-1.5 z-20 bg-amber-500 text-slate-950 text-[7.5px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  150 km/h Wind Safe
                </span>
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-slate-900 truncate">Elevated GI Structure</p>
                <p className="text-[9px] text-slate-500 font-medium">7 to 9 ft Terrace Clearance</p>
                <span className="text-[8.5px] text-brand-900 font-extrabold block mt-0.5">Civil Pedestals Included</span>
              </div>
            </div>

            {/* 4. Electrical BOS & Cables Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-32 rounded-lg overflow-hidden relative bg-slate-950 mb-2 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=500&q=80" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover blur-sm opacity-35 scale-110 select-none pointer-events-none"
                />
                <img 
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=500&q=80" 
                  alt="Polycab Solar Cables & BOS" 
                  className="relative z-10 max-h-full max-w-full object-contain"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={cableLogo} alt="Polycab" className="h-3.5 max-w-[50px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                  Dual SPD &bull; IP65
                </span>
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-slate-900 truncate">Polycab Cables & BOS</p>
                <p className="text-[9px] text-slate-500 font-medium">3 Chemical Pits + LA</p>
                <span className="text-[8.5px] text-emerald-700 font-extrabold block mt-0.5">CEIG & DISCOM Compliant</span>
              </div>
            </div>
          </div>

          {/* Capacity & Yield KPI Bar */}
          <div className="mt-3 grid grid-cols-4 gap-2 bg-slate-50/90 p-2.5 rounded-lg border border-slate-200 text-center">
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-bold block">Proposed Capacity</span>
              <span className="text-sm font-extrabold text-brand-900">{kw} kWp</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-bold block">Daily Generation</span>
              <span className="text-sm font-extrabold text-solar-orange">~{dailyUnits} Units</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-bold block">Annual Yield</span>
              <span className="text-sm font-extrabold text-emerald-600">~{formatNumber(annualUnits)} kWh</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-bold block">Roof Required</span>
              <span className="text-sm font-extrabold text-slate-800">~{roofArea} Sq.Ft</span>
            </div>
          </div>

          {/* Detailed Bill of Materials (BOM) Table with Brand Logos */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-700" />
                Bill of Materials & Component Standards
              </h3>
              
              {/* Compliance Emblems: BIS & Make in India */}
              <div className="flex items-center gap-2">
                <img src={EMBLEMS.bis} alt="BIS Certified" className="h-4 object-contain" />
                <img src={EMBLEMS.makeInIndia} alt="Make in India" className="h-4 object-contain" />
                <span className="text-[8.5px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                  Tier-1 Certified
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-[10px] bg-white/95 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold text-[9px] uppercase tracking-wide">
                    <th className="py-1.5 px-2.5 w-6 text-center">#</th>
                    <th className="py-1.5 px-2.5 w-36">System Component</th>
                    <th className="py-1.5 px-2.5">Brand & Technical Specifications</th>
                    <th className="py-1.5 px-2.5 w-24 text-center">Quantity</th>
                    <th className="py-1.5 px-2.5 w-24 text-center">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {/* 1. PV Modules */}
                  <tr>
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">01</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Solar PV Modules
                    </td>
                    <td className="py-1.5 px-2.5">
                      <div className="flex items-center gap-2">
                        <img src={panelLogo} alt="" className="h-4 max-w-[50px] object-contain shrink-0" />
                        <div>
                          <span className="font-semibold text-brand-900">{technical?.panelBrand || 'Waaree Solar'}</span> — {technical?.panelModel || '550Wp Bi-facial Dual Glass TopCon'}
                          <span className="block text-[8px] text-slate-500">
                            N-Type TOPCon cells, Multi-busbar, IEC 61215/61730 & BIS Certified.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      {panelCount} Nos.
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-emerald-700 font-bold text-[9px]">
                      25 Yrs Linear
                    </td>
                  </tr>

                  {/* 2. Grid Inverter */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">02</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Solar Grid Inverter
                    </td>
                    <td className="py-1.5 px-2.5">
                      <div className="flex items-center gap-2">
                        <img src={inverterLogo} alt="" className="h-4 max-w-[50px] object-contain shrink-0" />
                        <div>
                          <span className="font-semibold text-brand-900">{technical?.inverterBrand || 'Sungrow Power'}</span> — {technical?.inverterModel || 'Smart On-Grid Dual MPPT Inverter'}
                          <span className="block text-[8px] text-slate-500">
                            &gt;98.5% peak efficiency, built-in Wi-Fi IoT telemetry module for real-time mobile tracking.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      1 Unit
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-slate-800 font-bold text-[9px]">
                      10 Years
                    </td>
                  </tr>

                  {/* 3. Mounting Structure */}
                  <tr>
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">03</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Mounting Structure
                    </td>
                    <td className="py-1.5 px-2.5">
                      <div className="flex items-center gap-2">
                        <img src="/assets/gi-structure.jpg" alt="GI Structure" className="h-4.5 w-7 rounded object-cover shrink-0 border border-slate-200" />
                        <div>
                          <span className="font-medium text-slate-900">{technical?.structureType || 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft'}</span>
                          <span className="block text-[8px] text-slate-500">
                            Min 80-micron zinc coating, certified to resist wind velocity up to 150 km/h, SS-304 hardware.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      1 Full Set
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-slate-800 font-bold text-[9px]">
                      15 Years
                    </td>
                  </tr>

                  {/* 4. Solar Cables */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">04</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Solar Cables & Wiring
                    </td>
                    <td className="py-1.5 px-2.5">
                      <div className="flex items-center gap-2">
                        <img src={cableLogo} alt="Polycab" className="h-4 max-w-[45px] object-contain shrink-0" />
                        <div>
                          <span className="font-medium text-slate-900">Polycab / Siechem TUV Certified 4 / 6 sq.mm DC & AC Cables</span>
                          <span className="block text-[8px] text-slate-500">
                            Electron-beam cross-linked, UV-resistant, flame retardant, low-smoke zero halogen (LSZH).
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      As per site
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-slate-800 font-bold text-[9px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 5. Protection Suite */}
                  <tr>
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">05</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      DCDB & ACDB Boxes
                    </td>
                    <td className="py-1.5 px-2.5">
                      <span className="font-medium text-slate-900">IP65 Weatherproof Enclosures with Dual Type-II Surge Protection (SPD)</span>
                      <span className="block text-[8px] text-slate-500">
                        Schneider / L&T miniature circuit breakers, DC fuse links, optical surge indicators.
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      1 Set
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-slate-800 font-bold text-[9px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 6. Earthing & Lightning */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">06</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Earthing & Lightning
                    </td>
                    <td className="py-1.5 px-2.5">
                      <span className="font-medium text-slate-900">Copper Bonded Chemical Earthing + Class A Lightning Arrester</span>
                      <span className="block text-[8px] text-slate-500">
                        3 Independent earthing pits (Solar Array DC, Inverter AC, LA) with carbon compound.
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      3 Pits
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-slate-800 font-bold text-[9px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 7. Net Metering */}
                  <tr>
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">07</td>
                    <td className="py-1.5 px-2.5 font-bold text-slate-900">
                      Net Metering Liaison
                    </td>
                    <td className="py-1.5 px-2.5">
                      <span className="font-medium text-slate-900">Complete Bi-Directional Net-Meter Feasibility & Approvals</span>
                      <span className="block text-[8px] text-slate-500">
                        Preparation of SLD, portal registration, CEIG / DISCOM inspection & meter synchronization.
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-center font-medium">
                      Turnkey
                    </td>
                    <td className="py-1.5 px-2.5 text-center text-emerald-700 font-bold text-[9px]">
                      Guaranteed
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Monthly Solar Generation Bar Chart */}
          <div className="mt-3 p-2 bg-slate-50/90 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-brand-700" />
                Projected Monthly Solar Power Generation Curve (Units / Month)
              </span>
              <span className="text-[9px] text-slate-500">Solar Irradiance Profile</span>
            </div>

            <div className="grid grid-cols-12 gap-1 items-end h-14 pt-1 px-1">
              {monthlyProfile.map((m, idx) => {
                const monthUnits = Math.round(avgMonthly * m.factor);
                const heightPercent = Math.min(100, Math.max(30, (m.factor / 1.15) * 100));
                const isPeak = m.factor >= 1.05;

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-[7.5px] font-mono text-slate-500 mb-0.5">
                      {monthUnits}
                    </span>
                    <div 
                      className={`w-full rounded-t transition-all ${
                        isPeak 
                          ? 'bg-gradient-to-t from-solar-orange to-solar-warm' 
                          : 'bg-gradient-to-t from-brand-800 to-brand-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[7.5px] font-semibold text-slate-600 mt-0.5 uppercase">
                      {m.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.name}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>Conforms to IEC 61215/61730 & MNRE Specifications</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 2 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
