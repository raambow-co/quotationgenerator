import React from 'react';
import { Shield, CheckCircle2, Building, Phone, Mail, Globe, MapPin, Award, Zap, QrCode, Wrench, ShieldCheck, HeartHandshake, FileCheck, ExternalLink, Navigation } from 'lucide-react';
import Watermark from '../common/Watermark';
import { EMBLEMS } from '../../utils/brandLogos';

export default function Page5CompanyProfile({ quotation, settings }) {
  const company = settings?.company || {};
  const qr = settings?.qrPortals || {};
  const roadmap = settings?.executionRoadmap || [
    { step: 1, title: "3D CAD Survey", description: "Shadow trajectory & roof load analysis." },
    { step: 2, title: "Engineering", description: "SLD design & structural calculations." },
    { step: 3, title: "DISCOM Approvals", description: "Net-metering feasibility liaison." },
    { step: 4, title: "Installation", description: "Elevated GI MMS & TOPCon rigging." },
    { step: 5, title: "Commissioning", description: "3-pit earthing test & grid sync." },
    { step: 6, title: "Telemetry & AMC", description: "24/7 Cloud app monitoring." }
  ];
  const scopeMatrix = settings?.scopeOfWorkMatrix || [
    { item: "Supply of Tier-1 Bifacial Solar PV Modules & Smart Grid Inverter", epc: true, client: false },
    { item: "Custom Hot-Dip GI Structure (80µ Zinc), Civil Pedestals & Rigging", epc: true, client: false },
    { item: "ACDB, DCDB, 3 Chemical Earthing Pits (IS 3043) & Lightning Arrester", epc: true, client: false },
    { item: "State DISCOM Bi-Directional Net-Metering Documentation & Approvals", epc: true, client: false },
    { item: "5-Year Comprehensive Workmanship, Structural & Yield AMC Guarantee", epc: true, client: false },
    { item: "Shadow-Free Terrace Space & Water Point with Hose for Panel Cleaning", epc: false, client: true }
  ];
  const om = settings?.omAssurance || {};
  const omFeatures = om?.features || [
    { title: "Biannual Health Check", description: "I-V curve tracer tests & thermography" },
    { title: "24/7 Telemetry Desk", description: "Automated inverter fault alert system" },
    { title: "Torque Audit", description: "Annual SS-304 fastener torque checks" },
    { title: "Regional Hubs", description: "Hyd • Vzg • Vja • Blr • Chn" }
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
              <img src="/jayarams-logo-lockup.png" alt="JAYARAMS" className="h-9 object-contain" />
              <div className="border-l border-slate-300 pl-3">
                <p className="text-xs font-bold text-slate-800 tracking-tight">COMPANY PROFILE, ACCREDITATIONS &amp; DIGITAL CONNECTIVITY</p>
                <p className="text-[10px] text-slate-500">Corporate Credentials, Standard Scope Matrix &amp; Official Digital Portals</p>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <span className="font-mono font-medium text-slate-700">GSTIN: {company?.gstin || '36AABCJ9821K1ZX'}</span>
            </div>
          </div>

          {/* About Jayarams Section */}
          <div className="mt-2.5 p-3 rounded-lg bg-slate-50/90 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-solar-orange" />
                About {company.legalName || 'JAYARAMS SOLAR SOLUTIONS PVT. LTD.'}
              </h3>
              <span className="text-[10px] text-slate-500 italic font-medium">&ldquo;{company.tagline || 'Built on Trust. Driven by Excellence.'}&rdquo;</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              {company.about || `${company.legalName || 'JAYARAMS SOLAR SOLUTIONS PVT. LTD.'} is a premier clean energy EPC company specializing in high-performance rooftop solar installations across residential, commercial, institutional, and industrial facilities.`}
            </p>
          </div>

          {/* Visual Accreditations & Statutory Emblems Strip with REAL Logos */}
          <div className="mt-2.5 grid grid-cols-5 gap-2">
            {/* 1. DISCOM Empanelled */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-21">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.mnre} alt="MNRE" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">DISCOM Empanelled</span>
                <span className="text-[7.5px] text-slate-400 block">TSSPDCL &amp; APCPDCL</span>
              </div>
            </div>

            {/* 2. ISO 9001 */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-21">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.iso} alt="ISO 9001:2015" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">ISO 9001:2015</span>
                <span className="text-[7.5px] text-slate-400 block">Quality EPC Certified</span>
              </div>
            </div>

            {/* 3. Make in India */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-21">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.makeInIndia} alt="Make in India" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">Make in India</span>
                <span className="text-[7.5px] text-slate-400 block">DCR Compliant</span>
              </div>
            </div>

            {/* 4. BIS Certified */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-21">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.bis} alt="BIS Certified" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">BIS Certified</span>
                <span className="text-[7.5px] text-slate-400 block">IS 14286 Standards</span>
              </div>
            </div>

            {/* 5. PM Surya Ghar */}
            <div className="bg-white/95 p-2 rounded-lg border border-slate-200 text-center shadow-xs flex flex-col justify-between items-center h-21">
              <div className="h-10 flex items-center justify-center">
                <img src={EMBLEMS.pmSuryaGhar} alt="PM Surya Ghar" className="max-h-9 object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-900 block leading-tight">PM Surya Ghar</span>
                <span className="text-[7.5px] text-slate-400 block">National Portal Partner</span>
              </div>
            </div>
          </div>

          {/* 6-Step Turnkey Execution Process */}
          <div className="mt-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-brand-700" />
              Our 6-Step Precision Execution Roadmap
            </h3>
            <div className="grid grid-cols-6 gap-2 text-[9.5px]">
              {roadmap.map((step, idx) => (
                <div key={idx} className="p-2 bg-white/95 rounded-lg border border-slate-200 shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-brand-900 text-white font-black text-[9px] inline-flex items-center justify-center mb-1">
                    {step.step || (idx + 1)}
                  </span>
                  <p className="font-bold text-slate-800 text-[9.5px] truncate">{step.title}</p>
                  <p className="text-slate-500 text-[8px] mt-0.5 leading-tight">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Scope of Work Division (Table) */}
          <div className="mt-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-brand-700" />
              Scope of Work Responsibility Matrix
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden text-[9px] bg-white/95 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[8.5px] uppercase tracking-wide">
                    <th className="py-1.5 px-3 w-1/2">Deliverable / Responsibility Scope</th>
                    <th className="py-1.5 px-3 w-1/4 text-center">{company?.shortName || 'Jayarams'} Scope</th>
                    <th className="py-1.5 px-3 w-1/4 text-center">Client Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {scopeMatrix.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : ""}>
                      <td className="py-1.5 px-3 font-medium text-slate-800">{row.item}</td>
                      <td className="py-1.5 px-3 text-center">
                        {row.epc ? (
                          <span className="text-emerald-700 font-bold">&#10003; Full Scope</span>
                        ) : (
                          <span className="text-slate-400">&mdash;</span>
                        )}
                      </td>
                      <td className="py-1.5 px-3 text-center">
                        {row.client ? (
                          <span className="text-brand-900 font-bold">&#10003; Client Scope</span>
                        ) : (
                          <span className="text-slate-400">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Jayarams 5-Year Comprehensive O&M & Pan-South India Network Strip */}
          <div className="mt-2.5 p-2 bg-gradient-to-r from-slate-50 via-brand-50/40 to-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                5-Year Comprehensive Operation &amp; Maintenance (O&amp;M) Assurance
              </span>
              <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
                {om?.tagline || 'Pan-South India Service Network'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[8.5px]">
              {omFeatures.map((feat, idx) => (
                <div key={idx} className="bg-white p-1.5 rounded border border-slate-200 shadow-2xs">
                  <span className="font-bold text-slate-900 block text-[9px] truncate">{feat.title}</span>
                  <span className="text-slate-500 text-[7.5px] block mt-0.5">{feat.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Headquarters & Regional Contact Strip */}
          <div className="mt-2.5 p-2.5 bg-slate-50/95 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-2 flex-1">
              <div className="p-1.5 rounded-md bg-brand-900 text-white shrink-0 mt-0.5">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-[10px] block">Corporate Headquarters</span>
                <span className="text-[9px] text-slate-600 leading-snug block">{company?.address || 'Plot #48, Road No. 36, Jubilee Hills, Hyderabad - 500033'}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 shrink-0" />

            <div className="flex items-center gap-4 text-[9px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-brand-700 shrink-0" />
                <span className="font-medium text-slate-800">{company?.phone || '+91 98480 12345 / +91 89127 65432'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-brand-700 shrink-0" />
                <span className="font-medium text-slate-800">{company?.email || 'solar@jayaramsenergy.com'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-brand-700 shrink-0" />
                <span className="font-medium text-slate-800">{company?.website || 'www.jayaramsenergy.com'}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 shrink-0" />

            <div className="text-[8.5px] text-slate-600 shrink-0">
              <span className="text-slate-400 block text-[7px] uppercase font-bold">Regional Network Hubs</span>
              <span className="font-bold text-brand-900">{company?.branches || 'Hyd • Vzg • Vja • Blr'}</span>
            </div>
          </div>

          {/* 4 Official Digital & Location QR Portals Side-by-Side */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-solar-orange" />
                <span>Official Digital Connect &amp; Location Portals</span>
              </h3>
              <span className="text-[8.5px] text-slate-500 font-medium">Scan with camera to connect instantly</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 text-center">
              {/* 1. Facebook */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    {qr?.facebook?.title || 'Facebook'}
                  </span>
                  <span className="text-[7.5px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">{qr?.facebook?.badge || 'Social'}</span>
                </div>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.facebook?.image || "/assets/qr/fb-qr.jpeg"} 
                    alt="Facebook QR Code" 
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
                <div className="mt-1.5 w-full">
                  <span className="text-[8.5px] font-bold text-slate-800 block truncate">{qr?.facebook?.handle || '@jayaramssolar'}</span>
                  <span className="text-[7px] text-blue-600 font-semibold block mt-0.5">{qr?.facebook?.actionText || 'Scan to Follow'}</span>
                </div>
              </div>

              {/* 2. Instagram */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-pink-400 transition-colors">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold text-pink-600 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    {qr?.instagram?.title || 'Instagram'}
                  </span>
                  <span className="text-[7.5px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.2 rounded border border-pink-200">{qr?.instagram?.badge || 'Reels'}</span>
                </div>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.instagram?.image || "/assets/qr/insta-qr.jpeg"} 
                    alt="Instagram QR Code" 
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
                <div className="mt-1.5 w-full">
                  <span className="text-[8.5px] font-bold text-slate-800 block truncate">{qr?.instagram?.handle || '@jayaramssolar'}</span>
                  <span className="text-[7px] text-pink-600 font-semibold block mt-0.5">{qr?.instagram?.actionText || 'Scan to View'}</span>
                </div>
              </div>

              {/* 3. Official Website */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-brand-500 transition-colors">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold text-brand-900 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-solar-orange" />
                    {qr?.website?.title || 'Website'}
                  </span>
                  <span className="text-[7.5px] font-semibold text-brand-900 bg-brand-50 px-1.5 py-0.2 rounded border border-brand-200">{qr?.website?.badge || 'Portal'}</span>
                </div>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.website?.image || "/assets/qr/web-qr.jpeg"} 
                    alt="Official Website QR Code" 
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
                <div className="mt-1.5 w-full">
                  <span className="text-[8.5px] font-bold text-slate-800 block truncate">{qr?.website?.handle || 'jayaramsenergy.com'}</span>
                  <span className="text-[7px] text-brand-700 font-semibold block mt-0.5">{qr?.website?.actionText || 'Scan to Visit'}</span>
                </div>
              </div>

              {/* 4. Google Maps Location */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col items-center justify-between hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {qr?.googleMaps?.title || 'Google Maps'}
                  </span>
                  <span className="text-[7.5px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">{qr?.googleMaps?.badge || 'Location'}</span>
                </div>
                <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-2xs w-full flex items-center justify-center">
                  <img 
                    src={qr?.googleMaps?.image || "/assets/qr/loc-qr.jpeg"} 
                    alt="Google Maps Location QR Code" 
                    className="w-20 h-20 object-contain rounded"
                  />
                </div>
                <div className="mt-1.5 w-full">
                  <span className="text-[8.5px] font-bold text-slate-800 block truncate">{qr?.googleMaps?.handle || 'Jubilee Hills HQ'}</span>
                  <span className="text-[7px] text-emerald-600 font-semibold block mt-0.5">{qr?.googleMaps?.actionText || 'Scan for Route'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Statutory Registrations Banner */}
        <div className="py-1 px-3 bg-slate-100 rounded border border-slate-200 flex items-center justify-between text-[8px] text-slate-600 font-mono mt-2">
          <span>CIN: {company?.cin || 'U40106TG2020PTC144589'}</span>
          <span>&bull;</span>
          <span>GSTIN: {company?.gstin || '36AABCJ9821K1ZX'}</span>
          <span>&bull;</span>
          <span>MNRE Empanelment: {company?.mnreEmpanelment || 'TS-DISCOM-8492'}</span>
          <span>&bull;</span>
          <span>MSME: {company?.msme || 'UDYAM-TS-02-0048192'}</span>
        </div>

        {/* Page 5 Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 mt-1">
          <div>
            <span className="font-semibold text-slate-700">{company.legalName || 'Jayarams Solar Solutions Pvt. Ltd.'}</span> &bull; {company.tagline}
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
