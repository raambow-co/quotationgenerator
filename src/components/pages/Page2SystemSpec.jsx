import React from 'react';
import { Cpu, Zap, Sun, ShieldCheck, Activity, Layers, Cable, CheckCircle2, BarChart3 } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import Watermark from '../common/Watermark';
import { getPanelLogo, getInverterLogo, getCableLogo, EMBLEMS } from '../../utils/brandLogos';

export default function Page2SystemSpec({ quotation, settings }) {
  const company = settings?.company || {};
  const technical = quotation?.technical || {};
  const customer = quotation?.customer || {};

  const dcKw = technical?.actualDcCapacityKw || technical?.systemCapacityKw || 5.5;
  const acKw = technical?.acInverterCapacityKw || (technical?.systemCapacityKw ? Math.min(technical.systemCapacityKw, 5) : 5.0);
  const panelCount = technical?.panelCount || 10;
  const panelWattage = technical?.panelWattage || 550;
  const annualKwh = technical?.estimatedAnnualUnits || Math.round((technical?.estimatedDailyUnits || (dcKw * 4.25)) * 365);
  const dailyKwh = technical?.estimatedDailyUnits || Number((annualKwh / 365).toFixed(1));
  const roofArea = technical?.roofAreaSqFt || Math.round(dcKw * 90);

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

  const avgMonthly = annualKwh / 12;

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
              <img src="/jayarams-logo-lockup.png" alt="JAYARAMS SOLAR SOLUTIONS" className="h-10 object-contain" />
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-bold text-slate-800 tracking-tight">TECHNICAL SPECIFICATIONS &amp; BILL OF MATERIALS</p>
                <p className="text-[10px] text-slate-500">System Sizing, Engineering Design &amp; Equipment Standards</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <p className="font-mono font-medium text-slate-700">Ref: {quotation?.quotationNumber || 'JAY-SOL-2026-0001'}</p>
              <p>Client: {customer?.name || 'Valued Customer'}</p>
            </div>
          </div>

          {/* Visual Hardware Component Gallery with Locally-Hosted High-Resolution Assets */}
          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {/* 1. Solar Module Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-28 rounded-lg overflow-hidden relative bg-slate-950 mb-1.5 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="/assets/hardware/solar-module.svg" 
                  alt="Waaree Solar PV Module" 
                  className="w-full h-full object-contain p-1"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={panelLogo} alt="" className="h-3.5 max-w-[55px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded">
                  Bifacial TOPCon
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 truncate">{technical?.panelBrand || 'Waaree Solar'}</p>
                <p className="text-[8.5px] text-slate-500 font-medium">{panelCount} Nos &times; {panelWattage}Wp = {dcKw} kWp</p>
                <span className="text-[8px] text-emerald-700 font-extrabold block mt-0.5">25-Yr Performance • 12-Yr Product</span>
              </div>
            </div>

            {/* 2. Solar Inverter Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-28 rounded-lg overflow-hidden relative bg-slate-950 mb-1.5 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="/assets/hardware/solar-inverter.svg" 
                  alt="Solar On-Grid Inverter" 
                  className="w-full h-full object-contain p-1"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={inverterLogo} alt="" className="h-3.5 max-w-[55px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded">
                  &gt;98.4% Eff. &bull; Dual MPPT
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 truncate">{technical?.inverterBrand || 'Sungrow Power'}</p>
                <p className="text-[8.5px] text-slate-500 font-medium">{acKw} kW AC &bull; Wi-Fi IoT Cloud</p>
                <span className="text-[8px] text-slate-700 font-extrabold block mt-0.5">10-Yr Replacement Warranty</span>
              </div>
            </div>

            {/* 3. Elevated Mounting Structure Visual (100% Full Real Installation Photo) */}
            <div className="bg-white rounded-xl border border-brand-200/80 p-2 flex flex-col justify-between shadow-xs ring-1 ring-brand-100 hover:shadow-md transition-shadow">
              <div className="h-28 rounded-lg overflow-hidden relative bg-slate-950 mb-1.5 border border-slate-200 flex items-center justify-center">
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
                <span className="absolute top-1.5 left-1.5 z-20 bg-brand-950/90 text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                  80µ Zinc GI
                </span>
                <span className="absolute bottom-1.5 right-1.5 z-20 bg-amber-500 text-slate-950 text-[7px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  IS 875 158 km/h
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 truncate">Elevated GI Structure</p>
                <p className="text-[8.5px] text-slate-500 font-medium">7 to 9 ft Clearance (IS 875 Vb=44m/s)</p>
                <span className="text-[8.5px] text-brand-900 font-extrabold block mt-0.5">15-Yr Structural Guarantee</span>
              </div>
            </div>

            {/* 4. Electrical BOS & Cables Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div className="h-28 rounded-lg overflow-hidden relative bg-slate-950 mb-1.5 border border-slate-200/80 flex items-center justify-center">
                <img 
                  src="/assets/hardware/solar-cables.svg" 
                  alt="Polycab Solar Cables & BOS" 
                  className="w-full h-full object-contain p-1"
                />
                {/* Brand Logo Floating Overlay */}
                <div className="absolute top-1.5 right-1.5 z-20 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                  <img src={cableLogo} alt="Polycab" className="h-3.5 max-w-[50px] object-contain" />
                </div>
                <span className="absolute bottom-1.5 left-1.5 z-20 bg-brand-950/85 backdrop-blur-sm text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded">
                  Dual SPD &bull; IP65
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 truncate">Polycab Cables &amp; BOS</p>
                <p className="text-[8.5px] text-slate-500 font-medium">3 Chemical Pits (IS 3043) + LA</p>
                <span className="text-[8px] text-emerald-700 font-extrabold block mt-0.5">CEIG &amp; DISCOM Compliant</span>
              </div>
            </div>
          </div>

          {/* Sizing & Yield KPI Bar (Consistently Expressed in kWp DC and kWh) */}
          <div className="mt-2.5 grid grid-cols-4 gap-2 bg-slate-50/90 p-2 rounded-lg border border-slate-200 text-center">
            <div>
              <span className="text-[8.5px] text-slate-500 uppercase font-bold block">Proposed DC Capacity</span>
              <span className="text-xs sm:text-sm font-extrabold text-brand-900">{dcKw} kWp DC</span>
              <span className="text-[7.5px] text-slate-500 block">({acKw} kW AC Inverter)</span>
            </div>
            <div>
              <span className="text-[8.5px] text-slate-500 uppercase font-bold block">Daily Generation</span>
              <span className="text-xs sm:text-sm font-extrabold text-solar-orange">~{dailyKwh} kWh / day</span>
              <span className="text-[7.5px] text-slate-500 block">(Avg. 4.25 kWh/kWp)</span>
            </div>
            <div>
              <span className="text-[8.5px] text-slate-500 uppercase font-bold block">Annual Yield</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600">~{formatNumber(annualKwh)} kWh / yr</span>
              <span className="text-[7.5px] text-slate-500 block">(= {dailyKwh} &times; 365)</span>
            </div>
            <div>
              <span className="text-[8.5px] text-slate-500 uppercase font-bold block">Roof Required</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800">~{roofArea} Sq.Ft</span>
              <span className="text-[7.5px] text-slate-500 block">(Shadow-Free RCC)</span>
            </div>
          </div>

          {/* Detailed Bill of Materials (BOM) Table with Rigorous Technical Standards */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-700" />
                Bill of Materials &amp; Technical Component Standards
              </h3>
              
              {/* Compliance Emblems: BIS & Make in India */}
              <div className="flex items-center gap-2">
                <img src={EMBLEMS.bis} alt="BIS Certified" className="h-3.5 object-contain" />
                <img src={EMBLEMS.makeInIndia} alt="Make in India" className="h-3.5 object-contain" />
                <span className="text-[8px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                  ALMM Listed • BNEF Tier-1
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-[9.5px] bg-white/95 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold text-[8.5px] uppercase tracking-wide">
                    <th className="py-1 px-2 w-6 text-center">#</th>
                    <th className="py-1 px-2 w-32">Component</th>
                    <th className="py-1 px-2">Brand, Exact Model &amp; Applicable Standards</th>
                    <th className="py-1 px-2 w-24 text-center">Quantity</th>
                    <th className="py-1 px-2 w-24 text-center">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {/* 1. PV Modules */}
                  <tr>
                    <td className="py-1 px-2 text-center font-bold text-slate-400">01</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      Solar PV Modules
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img src={panelLogo} alt="" className="h-3.5 max-w-[45px] object-contain shrink-0" />
                        <div>
                          <span className="font-semibold text-brand-900">{technical?.panelBrand || 'Waaree Solar'}</span> — {technical?.panelModel || 'Arka Series 550Wp Bi-facial Dual Glass TOPCon (WXS-550-BIF)'}
                          <span className="block text-[7.5px] text-slate-500">
                            144 Half-cut N-Type TOPCon cells, 16BB, Multi-busbar, 21.5% efficiency. Certified per IEC 61215:2021, IEC 61730-1/2, IS 14286:2010, ALMM Listed.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      {panelCount} Nos. ({dcKw} kWp DC)
                    </td>
                    <td className="py-1 px-2 text-center text-emerald-700 font-bold text-[8.5px]">
                      25-Yr Performance<br/><span className="text-[7.5px] text-slate-500 font-normal">12-Yr Product</span>
                    </td>
                  </tr>

                  {/* 2. Grid Inverter */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1 px-2 text-center font-bold text-slate-400">02</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      Solar Grid Inverter
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img src={inverterLogo} alt="" className="h-3.5 max-w-[45px] object-contain shrink-0" />
                        <div>
                          <span className="font-semibold text-brand-900">{technical?.inverterBrand || 'Sungrow Power'}</span> — {technical?.inverterModel || 'SG5.0RS Dual-MPPT Smart On-Grid Inverter'}
                          <span className="block text-[7.5px] text-slate-500">
                            Peak efficiency &gt;98.4%, built-in Wi-Fi IoT telemetry, IP65 enclosure. Complies with IEC 62109-1/2, IEC 61727, and IEC 62116 anti-islanding.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      1 Unit ({acKw} kW AC)
                    </td>
                    <td className="py-1 px-2 text-center text-slate-800 font-bold text-[8.5px]">
                      10 Years
                    </td>
                  </tr>

                  {/* 3. Mounting Structure */}
                  <tr>
                    <td className="py-1 px-2 text-center font-bold text-slate-400">03</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      Mounting Structure
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img src="/assets/gi-structure.jpg" alt="GI Structure" className="h-4 w-6 rounded object-cover shrink-0 border border-slate-200" />
                        <div>
                          <span className="font-medium text-slate-900">{technical?.structureType || 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance'}</span>
                          <span className="block text-[7.5px] text-slate-500">
                            Min 80-micron zinc coating per IS 4759, engineered per IS 875 (Part 3): 2015 for design wind velocity Vb = 44 m/s (158 km/h), SS-304 fasteners.
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      1 Full Set
                    </td>
                    <td className="py-1 px-2 text-center text-slate-800 font-bold text-[8.5px]">
                      15 Years
                    </td>
                  </tr>

                  {/* 4. Solar Cables */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1 px-2 text-center font-bold text-slate-400">04</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      Solar Cables &amp; Wiring
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img src={cableLogo} alt="Polycab" className="h-3.5 max-w-[40px] object-contain shrink-0" />
                        <div>
                          <span className="font-medium text-slate-900">Polycab / Siechem 1.5kV DC Solar PV Cable (4 / 6 sq.mm) &amp; Finolex AC Cable</span>
                          <span className="block text-[7.5px] text-slate-500">
                            TUV certified per EN 50618 / 2PfG 1169, electron-beam cross-linked, UV &amp; ozone resistant, low-smoke zero halogen (~40m DC + 25m AC run).
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      As per site
                    </td>
                    <td className="py-1 px-2 text-center text-slate-800 font-bold text-[8.5px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 5. Protection Suite */}
                  <tr>
                    <td className="py-1 px-2 text-center font-bold text-slate-400">05</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      DCDB &amp; ACDB Boxes
                    </td>
                    <td className="py-1 px-2">
                      <span className="font-medium text-slate-900">IP65 Weatherproof Polycarbonate Enclosures with Dual Type-II SPDs</span>
                      <span className="block text-[7.5px] text-slate-500">
                        1000V DC 16A gPV fuses, Type-II 1000V DC SPD per IEC 61643-11, Schneider / L&amp;T 415V/240V AC MCB/MCCB with RCD protection.
                      </span>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      1 Set
                    </td>
                    <td className="py-1 px-2 text-center text-slate-800 font-bold text-[8.5px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 6. Earthing & Lightning */}
                  <tr className="bg-slate-50/40">
                    <td className="py-1 px-2 text-center font-bold text-slate-400">06</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      Earthing &amp; Lightning
                    </td>
                    <td className="py-1 px-2">
                      <span className="font-medium text-slate-900">Copper Bonded Chemical Earthing (3 Dedicated Pits) + Class-A LA</span>
                      <span className="block text-[7.5px] text-slate-500">
                        3 Independent earthing pits (Solar Array DC, Inverter AC, LA) with 17.2mm dia &times; 3.0m rods and carbon compound (&lt; 5 &Omega; loop per IS 3043:2018).
                      </span>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      3 Pits
                    </td>
                    <td className="py-1 px-2 text-center text-slate-800 font-bold text-[8.5px]">
                      5 Years
                    </td>
                  </tr>

                  {/* 7. Net Metering */}
                  <tr>
                    <td className="py-1 px-2 text-center font-bold text-slate-400">07</td>
                    <td className="py-1 px-2 font-bold text-slate-900">
                      DISCOM Net-Metering
                    </td>
                    <td className="py-1 px-2">
                      <span className="font-medium text-slate-900">Complete Bi-Directional Net-Meter Application &amp; Regulatory Liaison</span>
                      <span className="block text-[7.5px] text-slate-500">
                        Preparation of SLD, online portal filing, DTR feasibility check, CEIG/DISCOM inspection coordination &amp; meter sync assistance. (Subject to utility statutory norms).
                      </span>
                    </td>
                    <td className="py-1 px-2 text-center font-medium">
                      Full Scope
                    </td>
                    <td className="py-1 px-2 text-center text-emerald-700 font-bold text-[8.5px]">
                      Facilitation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Monthly Solar Generation Bar Chart (Expressed in kWh/Month) */}
          <div className="mt-2.5 p-2 bg-slate-50/90 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9.5px] font-bold text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-brand-700" />
                Projected Monthly Solar Power Generation Curve (kWh / Month)
              </span>
              <span className="text-[8.5px] text-slate-500 font-medium">Telangana / AP Solar Irradiance Profile</span>
            </div>

            <div className="grid grid-cols-12 gap-1 items-end h-12 pt-1 px-1">
              {monthlyProfile.map((m, idx) => {
                const monthKwh = Math.round(avgMonthly * m.factor);
                const heightPercent = Math.min(100, Math.max(30, (m.factor / 1.15) * 100));
                const isPeak = m.factor >= 1.05;

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-[7px] font-mono text-slate-500 mb-0.5">
                      {monthKwh}
                    </span>
                    <div 
                      className={`w-full rounded-t transition-all ${
                        isPeak 
                          ? 'bg-gradient-to-t from-solar-orange to-solar-warm' 
                          : 'bg-gradient-to-t from-brand-800 to-brand-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[7px] font-semibold text-slate-600 mt-0.5 uppercase">
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
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>Conforms to IEC 61215/61730, IS 14286 &amp; IS 875 Standards</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 2 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
