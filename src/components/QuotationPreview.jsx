import React, { useState } from 'react';
import Page1Cover from './pages/Page1Cover';
import Page2SystemSpec from './pages/Page2SystemSpec';
import Page3Financials from './pages/Page3Financials';
import Page4Portfolio from './pages/Page4Portfolio';
import Page5CompanyProfile from './pages/Page5CompanyProfile';
import { Printer, Download, Eye, ZoomIn, ZoomOut, RotateCcw, ArrowLeft, Edit3, CheckCircle2 } from 'lucide-react';

export default function QuotationPreview({ quotation, settings, onBack, onEdit }) {
  const [activePage, setActivePage] = useState('all'); // 'all', '1', '2', '3', '4', '5'
  const [zoomLevel, setZoomLevel] = useState(100);

  const handlePrint = () => {
    // When printing, ensure all 5 pages are rendered
    if (activePage !== 'all') {
      setActivePage('all');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(130, Math.max(60, prev + delta)));
  };

  const pages = [
    { id: '1', title: 'Page 1: Cover & Intro', fixed: false },
    { id: '2', title: 'Page 2: System Spec & BOM', fixed: false },
    { id: '3', title: 'Page 3: Commercials & Terms', fixed: false },
    { id: '4', title: 'Page 4: Portfolio & Showcase', fixed: false },
    { id: '5', title: 'Page 5: Company & Connect', fixed: false },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Floating Control Bar (Hidden when printing) */}
      <div className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-subtle flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>{quotation?.quotationNumber || 'Quotation Preview'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {quotation?.customer?.name || 'Customer'}
              </span>
            </h2>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActivePage('all')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activePage === 'all'
                ? 'bg-white text-brand-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 5 Pages
          </button>
          {pages.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                activePage === p.id
                  ? 'bg-white text-brand-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title={p.title}
            >
              <span>Page {p.id}</span>
            </button>
          ))}
        </div>

        {/* Actions & Zoom */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-slate-600">
            <button 
              onClick={() => handleZoom(-10)} 
              className="p-1 hover:text-slate-900 rounded" 
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 w-9 text-center">{zoomLevel}%</span>
            <button 
              onClick={() => handleZoom(10)} 
              className="p-1 hover:text-slate-900 rounded" 
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(100)} 
              className="p-1 hover:text-slate-900 rounded text-slate-400" 
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {onEdit && (
            <button
              onClick={() => onEdit(quotation)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Data</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save 5-Page PDF</span>
          </button>
        </div>
      </div>

      {/* Preview Workspace Area */}
      <div className="flex-1 overflow-auto py-8 px-4 flex justify-center print-container">
        <div 
          className="transition-transform duration-150 origin-top flex flex-col items-center gap-8 print-wrapper"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Page 1: Fixed Cover */}
          {(activePage === 'all' || activePage === '1') && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Page 1 of 5 &bull; Fixed Cover & Introduction</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[9px] font-mono">Template Fixed</span>
              </div>
              <Page1Cover quotation={quotation} settings={settings} />
            </div>
          )}

          {/* Page 2: Editable System Spec & BOM */}
          {(activePage === 'all' || activePage === '2') && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Page 2 of 5 &bull; System Design & Bill of Materials</span>
                <span className="px-1.5 py-0.5 rounded bg-solar-subtle border border-solar-border text-solar-amber text-[9px] font-mono">Dynamic / Editable</span>
              </div>
              <Page2SystemSpec quotation={quotation} settings={settings} />
            </div>
          )}

          {/* Page 3: Editable Commercials & Financials */}
          {(activePage === 'all' || activePage === '3') && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Page 3 of 5 &bull; Commercial Proposal & Payback Economics</span>
                <span className="px-1.5 py-0.5 rounded bg-solar-subtle border border-solar-border text-solar-amber text-[9px] font-mono">Dynamic / Editable</span>
              </div>
              <Page3Financials quotation={quotation} settings={settings} />
            </div>
          )}

          {/* Page 4: Dynamic Portfolio & Showcase */}
          {(activePage === 'all' || activePage === '4') && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Page 4 of 5 &bull; Completed Projects &amp; Field Showcase</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono">Dynamic / Admin Configurable</span>
              </div>
              <Page4Portfolio quotation={quotation} settings={settings} />
            </div>
          )}

          {/* Page 5: Dynamic Company Profile, Scope Matrix & Connect */}
          {(activePage === 'all' || activePage === '5') && (
            <div className="flex flex-col items-center">
              <div className="no-print mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Page 5 of 5 &bull; Company Profile, Accreditations &amp; Digital Connect</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono">Dynamic / Admin Configurable</span>
              </div>
              <Page5CompanyProfile quotation={quotation} settings={settings} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

