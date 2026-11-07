import React from 'react';
import { Shield, CheckCircle2, Building, Phone, Mail, Globe, MapPin, Landmark, Award, Zap, QrCode } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const bank = company?.bankDetails || {};

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
                <p className="text-xs font-bold text-slate-800 tracking-tight">COMPANY PROFILE, ACCREDITATIONS & REMITTANCE</p>
                <p className="text-[10px] text-slate-500">Corporate Credentials, Standard Scope Matrix & Bank Coordinates</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <span className="font-mono font-medium text-slate-700">GSTIN: {company?.gstin || '36AABCJ9821K1ZX'}</span>
            </div>
          </div>

          {/* About Jayarams Section */}
          <div className="mt-3.5 p-3.5 rounded-lg bg-slate-50/90 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-solar-orange" />
                About JAYARAMS SOLAR SOLUTIONS
              </h3>
              <span className="text-[10px] text-slate-500 italic">&ldquo;Built on Trust. Driven by Excellence.&rdquo;</span>
            </div>
            <p className="text-[10.5px] text-slate-600 leading-relaxed">
              <strong className="text-slate-800">JAYARAMS</strong> is a premier turnkey solar EPC and clean energy systems integrator. We specialize in conceptualizing, engineering, procuring, constructing, and maintaining high-yield solar rooftop power plants for luxury residential estates, commercial establishments, hospitals, educational institutions, and industrial production facilities across South India.
            </p>
          </div>

          {/* Visual Accreditations & Statutory Emblems Strip with REAL Logos */}
          <div className="mt-3 grid grid-cols-5 gap-2">
            {/* 1. MNRE */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-20">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.mnre} alt="MNRE" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">MNRE Approved</span>
                <span className="text-[7.5px] text-slate-400 block">Govt. of India</span>
              </div>
            </div>

            {/* 2. ISO 9001 */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-20">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.iso} alt="ISO 9001:2015" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">ISO 9001:2015</span>
                <span className="text-[7.5px] text-slate-400 block">Quality Certified</span>
              </div>
            </div>

            {/* 3. Make in India */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-20">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.makeInIndia} alt="Make in India" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">Make in India</span>
                <span className="text-[7.5px] text-slate-400 block">DCR Compliant</span>
              </div>
            </div>

            {/* 4. BIS Certified */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-20">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.bis} alt="BIS Certified" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">BIS Certified</span>
                <span className="text-[7.5px] text-slate-400 block">IS Standards</span>
              </div>
            </div>

            {/* 5. PM Surya Ghar */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-20">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">PM Surya Ghar</span>
                <span className="text-[7.5px] text-slate-400 block">Subsidy Partner</span>
              </div>
            </div>
          </div>

          {/* 6-Step Turnkey Execution Process */}
          <div className="mt-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Our 6-Step Precision Execution Roadmap
            </h3>
            <div className="grid grid-cols-6 gap-2 text-[9.5px]">
              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  1
                </span>
                <p className="font-bold text-slate-800 text-[10px]">3D CAD Survey</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">Shadow trajectory & load test.</p>
              </div>

              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  2
                </span>
                <p className="font-bold text-slate-800 text-[10px]">Engineering</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">String & cable calculations.</p>
              </div>

              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  3
                </span>
                <p className="font-bold text-slate-800 text-[10px]">DISCOM Approvals</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">Net-metering feasibility liaison.</p>
              </div>

              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  4
                </span>
                <p className="font-bold text-slate-800 text-[10px]">Installation</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">GI structure & module rigging.</p>
              </div>

              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  5
                </span>
                <p className="font-bold text-slate-800 text-[10px]">Commissioning</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">Earthing test & grid sync.</p>
              </div>

              <div className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                  6
                </span>
                <p className="font-bold text-slate-800 text-[10px]">Telemetry & AMC</p>
                <p className="text-slate-500 text-[8.5px] mt-0.5 leading-tight">24/7 Cloud app monitoring.</p>
              </div>
            </div>
          </div>

          {/* Standard Scope of Work Division (Table) */}
          <div className="mt-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Scope of Work Responsibility Matrix
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-[9.5px] bg-white/95">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[9px]">
                    <th className="py-1 px-3 w-1/2">Deliverable / Responsibility Scope</th>
                    <th className="py-1 px-3 w-1/4 text-center">Jayarams Scope</th>
                    <th className="py-1 px-3 w-1/4 text-center">Client Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-1 px-3 font-medium text-slate-800">Supply of Tier-1 Solar PV Modules & Grid Inverter</td>
                    <td className="py-1 px-3 text-center text-emerald-700 font-bold">&#10003; Full Scope</td>
                    <td className="py-1 px-3 text-center text-slate-400">&mdash;</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-1 px-3 font-medium text-slate-800">Custom MMS Structure, Civil Pedestals & Mechanical Rigging</td>
                    <td className="py-1 px-3 text-center text-emerald-700 font-bold">&#10003; Full Scope</td>
                    <td className="py-1 px-3 text-center text-slate-400">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-3 font-medium text-slate-800">ACDB, DCDB, Chemical Earthing Pits (3 Nos) & Lightning Arrester</td>
                    <td className="py-1 px-3 text-center text-emerald-700 font-bold">&#10003; Full Scope</td>
                    <td className="py-1 px-3 text-center text-slate-400">&mdash;</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-1 px-3 font-medium text-slate-800">State DISCOM Net-Metering Documentation & Approvals</td>
                    <td className="py-1 px-3 text-center text-emerald-700 font-bold">&#10003; Full Scope</td>
                    <td className="py-1 px-3 text-center text-slate-400">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-3 font-medium text-slate-800">Shadow-free Terrace Space & Water Tap for Cleaning</td>
                    <td className="py-1 px-3 text-center text-slate-400">&mdash;</td>
                    <td className="py-1 px-3 text-center text-brand-900 font-bold">&#10003; Client Scope</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Banking Details, Instant UPI QR Code & Corporate Coordinates */}
          <div className="mt-3 grid grid-cols-12 gap-3 text-xs">
            {/* Bank Coordinates & UPI QR Code (7 cols) */}
            <div className="col-span-7 p-3 bg-slate-50/95 rounded-lg border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="space-y-1 text-[9.5px] flex-1">
                <div className="flex items-center gap-1.5 mb-1 font-bold text-slate-800 text-[10.5px]">
                  <Landmark className="w-3.5 h-3.5 text-brand-700" />
                  <span>Official Bank Coordinates for Remittances</span>
                </div>
                <p><span className="text-slate-500">A/C Name:</span> <strong className="text-slate-800">{bank?.accountName || 'Jayarams Solar Solutions Pvt. Ltd.'}</strong></p>
                <p><span className="text-slate-500">Bank:</span> <strong className="text-slate-800">{bank?.bankName || 'HDFC Bank Ltd.'}</strong></p>
                <p><span className="text-slate-500">A/C No:</span> <strong className="text-brand-900 font-mono text-xs">{bank?.accountNumber || '50200084729103'}</strong></p>
                <p><span className="text-slate-500">IFSC Code:</span> <strong className="text-brand-900 font-mono text-xs">{bank?.ifscCode || 'HDFC0001628'}</strong></p>
                <p><span className="text-slate-500">Branch:</span> <span className="text-slate-700">{bank?.branch || 'Jubilee Hills Main Branch, Hyderabad'}</span></p>
              </div>

              {/* Instant Scan & Pay UPI QR Code Graphic */}
              <div className="w-24 shrink-0 bg-white p-1.5 rounded-lg border border-slate-300 text-center shadow-xs">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded flex items-center justify-center border border-slate-200 relative overflow-hidden">
                  {/* Decorative stylized QR graphic */}
                  <svg className="w-16 h-16 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
                    <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
                    <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.15" />
                    <rect x="5" y="5" width="3" height="3" fill="currentColor" />
                    <rect x="16" y="5" width="3" height="3" fill="currentColor" />
                    <rect x="5" y="16" width="3" height="3" fill="currentColor" />
                    <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 18v3M18 14v3" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[7.5px] font-black uppercase text-brand-900 block mt-1 tracking-wider">
                  Scan to Pay
                </span>
                <span className="text-[6.5px] text-slate-400 block">UPI / GPay / PhonePe</span>
              </div>
            </div>

            {/* Corporate Offices & Contact (5 cols) */}
            <div className="col-span-5 p-3 bg-slate-50/95 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5 font-bold text-slate-800 text-[10.5px]">
                  <Building className="w-3.5 h-3.5 text-brand-700" />
                  <span>Headquarters & Branches</span>
                </div>
                <div className="space-y-1 text-[9.5px] text-slate-600">
                  <p className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                    <span className="leading-snug">{company?.address || 'Plot #48, Road No. 36, Jubilee Hills, Hyderabad - 500033'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{company?.phone || '+91 98480 12345 / +91 89127 65432'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{company?.email || 'solar@jayaramsenergy.com'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-200 text-[8.5px] text-brand-900 font-bold">
                Branches: {company?.branches || 'Hyderabad | Visakhapatnam | Bangalore | Vijayawada'}
              </div>
            </div>
          </div>
        </div>

        {/* Page 5 Footer */}
        <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">{company.name}</span> &bull; {company.tagline}
          </div>
          <div className="flex items-center gap-4">
            <span>Thank you for choosing sovereign clean energy</span>
            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Page 5 of 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
