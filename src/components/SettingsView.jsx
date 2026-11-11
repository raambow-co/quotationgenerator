import React, { useState } from 'react';
import { 
  Save, 
  ArrowLeft, 
  RotateCcw, 
  Settings as SettingsIcon, 
  IndianRupee, 
  Building, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2,
  QrCode,
  FileText,
  Award,
  Sparkles,
  Camera,
  Layers,
  Wrench,
  Check,
  ExternalLink,
  Info,
  Zap
} from 'lucide-react';
import { defaultSettings } from '../data/defaultSettings';

export default function SettingsView({ currentSettings, onSaveSettings, onResetDefaults, onBack }) {
  const [settings, setSettings] = useState(() => {
    const base = currentSettings || defaultSettings;
    return JSON.parse(JSON.stringify({
      ...defaultSettings,
      ...base,
      company: { ...defaultSettings.company, ...(base.company || {}) },
      qrPortals: { ...defaultSettings.qrPortals, ...(base.qrPortals || {}) },
      coverPage: { ...defaultSettings.coverPage, ...(base.coverPage || {}) },
      pricing: { ...defaultSettings.pricing, ...(base.pricing || {}) },
      equipmentCatalog: {
        ...defaultSettings.equipmentCatalog,
        ...(base.equipmentCatalog || {}),
        panelBrands: (Array.isArray(base.equipmentCatalog?.panelBrands) && base.equipmentCatalog.panelBrands.length > 0)
          ? base.equipmentCatalog.panelBrands
          : defaultSettings.equipmentCatalog.panelBrands,
        inverterBrands: (Array.isArray(base.equipmentCatalog?.inverterBrands) && base.equipmentCatalog.inverterBrands.length > 0)
          ? base.equipmentCatalog.inverterBrands
          : defaultSettings.equipmentCatalog.inverterBrands,
        structureTypes: (Array.isArray(base.equipmentCatalog?.structureTypes) && base.equipmentCatalog.structureTypes.length > 0)
          ? base.equipmentCatalog.structureTypes
          : defaultSettings.equipmentCatalog.structureTypes,
        structureSpecs: { ...defaultSettings.equipmentCatalog.structureSpecs, ...(base.equipmentCatalog?.structureSpecs || {}) },
        electricalSpecs: { ...defaultSettings.equipmentCatalog.electricalSpecs, ...(base.equipmentCatalog?.electricalSpecs || {}) }
      },
      warranties: { ...defaultSettings.warranties, ...(base.warranties || {}) },
      authorization: { ...defaultSettings.authorization, ...(base.authorization || {}) },
      omAssurance: { ...defaultSettings.omAssurance, ...(base.omAssurance || {}) },
      portfolioWorks: {
        ...defaultSettings.portfolioWorks,
        ...(base.portfolioWorks || {}),
        metrics: { ...defaultSettings.portfolioWorks.metrics, ...(base.portfolioWorks?.metrics || {}) },
        projects: (Array.isArray(base.portfolioWorks?.projects) && base.portfolioWorks.projects.length > 0)
          ? base.portfolioWorks.projects
          : defaultSettings.portfolioWorks.projects,
        fieldShowcasePhotos: (Array.isArray(base.portfolioWorks?.fieldShowcasePhotos) && base.portfolioWorks.fieldShowcasePhotos.length > 0)
          ? base.portfolioWorks.fieldShowcasePhotos
          : defaultSettings.portfolioWorks.fieldShowcasePhotos
      },
      executionRoadmap: (Array.isArray(base.executionRoadmap) && base.executionRoadmap.length > 0)
        ? base.executionRoadmap
        : defaultSettings.executionRoadmap,
      scopeOfWorkMatrix: (Array.isArray(base.scopeOfWorkMatrix) && base.scopeOfWorkMatrix.length > 0)
        ? base.scopeOfWorkMatrix
        : defaultSettings.scopeOfWorkMatrix,
      paymentMilestones: (Array.isArray(base.paymentMilestones) && base.paymentMilestones.length > 0)
        ? base.paymentMilestones
        : defaultSettings.paymentMilestones
    }));
  });
  const [activeTab, setActiveTab] = useState('company');
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onSaveSettings(settings);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all admin panel settings to factory defaults? Any custom modifications will be replaced.")) {
      onResetDefaults();
      setSettings(JSON.parse(JSON.stringify(defaultSettings)));
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 3500);
    }
  };

  // Helper updater
  const updateSettings = (path, value) => {
    setSettings(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  // Module catalog helpers
  const addPanelBrand = () => {
    const newBrand = {
      id: `brand-${Date.now()}`,
      name: 'Tier-1 Solar PV',
      model: '550Wp Bi-facial TOPCon Module',
      wattage: 550,
      cellType: 'N-Type TOPCon',
      efficiency: '22.0%',
      dimensions: '2278 × 1134 × 30 mm',
      weight: '31.0 kg'
    };
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        panelBrands: [...(prev.equipmentCatalog?.panelBrands || []), newBrand]
      }
    }));
  };

  const removePanelBrand = (idx) => {
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        panelBrands: prev.equipmentCatalog.panelBrands.filter((_, i) => i !== idx)
      }
    }));
  };

  // Inverter catalog helpers
  const addInverterBrand = () => {
    const newInv = {
      id: `inv-${Date.now()}`,
      name: 'Grid Inverter',
      model: 'Smart Dual-MPPT Solar Grid Inverter with Wi-Fi',
      efficiency: '98.5%',
      maxDcInput: '7500 W',
      mpptChannels: '2 MPPTs',
      warranty: '10 Years'
    };
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        inverterBrands: [...(prev.equipmentCatalog?.inverterBrands || []), newInv]
      }
    }));
  };

  const removeInverterBrand = (idx) => {
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        inverterBrands: prev.equipmentCatalog.inverterBrands.filter((_, i) => i !== idx)
      }
    }));
  };

  // Mounting Structure options helpers
  const addStructureType = () => {
    const newStructure = {
      id: `mms-${Date.now()}`,
      name: 'Custom Elevated Mounting Structure System (IS 875 Compliant)'
    };
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        structureTypes: [...(prev.equipmentCatalog?.structureTypes || []), newStructure]
      }
    }));
  };

  const removeStructureType = (idx) => {
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        structureTypes: (prev.equipmentCatalog?.structureTypes || []).filter((_, i) => i !== idx)
      }
    }));
  };

  // Milestone helpers
  const addMilestone = () => {
    const newMilestone = {
      milestone: "Custom Stage Milestone",
      percentage: 10,
      description: "Payment terms milestone description"
    };
    setSettings(prev => ({
      ...prev,
      paymentMilestones: [...(prev.paymentMilestones || []), newMilestone]
    }));
  };

  const removeMilestone = (idx) => {
    setSettings(prev => ({
      ...prev,
      paymentMilestones: prev.paymentMilestones.filter((_, i) => i !== idx)
    }));
  };

  // Scope matrix helpers
  const addScopeItem = () => {
    const newItem = {
      item: "New Deliverable / Engineering Scope Item",
      epc: true,
      client: false
    };
    setSettings(prev => ({
      ...prev,
      scopeOfWorkMatrix: [...(prev.scopeOfWorkMatrix || []), newItem]
    }));
  };

  const removeScopeItem = (idx) => {
    setSettings(prev => ({
      ...prev,
      scopeOfWorkMatrix: prev.scopeOfWorkMatrix.filter((_, i) => i !== idx)
    }));
  };

  const tabs = [
    { id: 'company', label: 'Company & Statutory', icon: Building, desc: 'Branding, addresses, registration & tax IDs' },
    { id: 'qr', label: 'QR Portals & Connect', icon: QrCode, desc: 'Facebook, Instagram, Website, Maps QRs' },
    { id: 'cover', label: 'Cover Page & Hero', icon: FileText, desc: 'Titles, subtitles, badges & value props' },
    { id: 'technical', label: 'Technical & Hardware', icon: Cpu, desc: 'Modules, inverters, MMS structure & cables' },
    { id: 'pricing', label: 'Pricing, Subsidy & ROI', icon: IndianRupee, desc: 'Base rates, GST, subsidy, tariff & assumptions' },
    { id: 'warranties', label: 'Warranties, Scope & O&M', icon: ShieldCheck, desc: 'Guarantees, scope matrix, roadmap & stamp' },
    { id: 'portfolio', label: 'Portfolio & Showcase', icon: Camera, desc: 'Track record metrics, 4 projects & 2 field photos' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-brand-700" />
              <span>Admin Panel &bull; Master Quotation Configuration</span>
            </h1>
            <p className="text-xs text-slate-500">
              Customize 100% of the quotation system &mdash; company credentials, hardware catalogs, pricing formulas, QR portals, portfolio works, and statutory guarantees.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-sm transition-all transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Settings successfully saved and persisted! All current and future quotations will immediately reflect these parameters.</span>
          </div>
          <span className="text-[10px] text-emerald-600 uppercase font-mono">Synced</span>
        </div>
      )}

      {/* Modern Tabs Navigation Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-brand-900 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-solar-warm' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* ============================================================== */}
        {/* TAB 1: COMPANY & STATUTORY CREDENTIALS */}
        {/* ============================================================== */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-brand-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Corporate Identity &amp; Branding Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Trade / Display Name</label>
                  <input
                    type="text"
                    value={settings.company?.name || ''}
                    onChange={(e) => updateSettings('company.name', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <span className="text-[10px] text-slate-400">Printed on quotation titles and covers</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Full Legal Registered Name</label>
                  <input
                    type="text"
                    value={settings.company?.legalName || ''}
                    onChange={(e) => updateSettings('company.legalName', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <span className="text-[10px] text-slate-400">Used for official contracts &amp; seals</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Brand Name</label>
                  <input
                    type="text"
                    value={settings.company?.shortName || ''}
                    onChange={(e) => updateSettings('company.shortName', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <span className="text-[10px] text-slate-400">e.g. JAYARAMS</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Tagline</label>
                  <input
                    type="text"
                    value={settings.company?.tagline || ''}
                    onChange={(e) => updateSettings('company.tagline', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <span className="text-[10px] text-slate-400">Appears in footers and cover statements</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Empanelment Subheading</label>
                  <input
                    type="text"
                    value={settings.company?.subheading || ''}
                    onChange={(e) => updateSettings('company.subheading', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">About Company Narrative (Page 5)</label>
                  <textarea
                    rows={3}
                    value={settings.company?.about || ''}
                    onChange={(e) => updateSettings('company.about', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Registered Address & Regional Contact Strip */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Headquarters, Regional Hubs &amp; Contact Coordinates
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters Full Address</label>
                  <input
                    type="text"
                    value={settings.company?.address || ''}
                    onChange={(e) => updateSettings('company.address', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Regional Branch Network</label>
                  <input
                    type="text"
                    value={settings.company?.branches || ''}
                    onChange={(e) => updateSettings('company.branches', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Support Phone Numbers</label>
                  <input
                    type="text"
                    value={settings.company?.phone || ''}
                    onChange={(e) => updateSettings('company.phone', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="text"
                    value={settings.company?.email || ''}
                    onChange={(e) => updateSettings('company.email', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Website URL</label>
                  <input
                    type="text"
                    value={settings.company?.website || ''}
                    onChange={(e) => updateSettings('company.website', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Statutory Registrations Banner */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-solar-orange" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Statutory Registrations &amp; DISCOM Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={settings.company?.gstin || ''}
                    onChange={(e) => updateSettings('company.gstin', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CIN Registration</label>
                  <input
                    type="text"
                    value={settings.company?.cin || ''}
                    onChange={(e) => updateSettings('company.cin', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MNRE Empanelment ID</label>
                  <input
                    type="text"
                    value={settings.company?.mnreEmpanelment || ''}
                    onChange={(e) => updateSettings('company.mnreEmpanelment', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MSME Registration Number</label>
                  <input
                    type="text"
                    value={settings.company?.msme || ''}
                    onChange={(e) => updateSettings('company.msme', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: QR PORTALS & SOCIAL MEDIA */}
        {/* ============================================================== */}
        {activeTab === 'qr' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-brand-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Four Official Digital Connect &amp; Location QR Codes (Page 5)
                </h2>
              </div>
              <span className="text-[11px] text-slate-500">Rendered side-by-side in exact 4-column layout</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook QR Card */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-700 flex items-center gap-1.5">
                    1. Facebook Portal
                  </span>
                  <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Social</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.facebook?.title || 'Facebook'}
                      onChange={(e) => updateSettings('qrPortals.facebook.title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Handle / Subtitle</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.facebook?.handle || '@jayaramssolar'}
                      onChange={(e) => updateSettings('qrPortals.facebook.handle', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Scan Action Text</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.facebook?.actionText || 'Scan to Follow'}
                      onChange={(e) => updateSettings('qrPortals.facebook.actionText', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Image Asset Path</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.facebook?.image || '/assets/qr/fb-qr.jpeg'}
                      onChange={(e) => updateSettings('qrPortals.facebook.image', e.target.value)}
                      className="w-full px-2.5 py-1.5 font-mono text-[10px] rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Instagram QR Card */}
              <div className="p-4 rounded-xl border border-pink-200 bg-pink-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-pink-700 flex items-center gap-1.5">
                    2. Instagram Portal
                  </span>
                  <span className="text-[9px] bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">Reels</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.instagram?.title || 'Instagram'}
                      onChange={(e) => updateSettings('qrPortals.instagram.title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Handle / Subtitle</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.instagram?.handle || '@jayaramssolar'}
                      onChange={(e) => updateSettings('qrPortals.instagram.handle', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Scan Action Text</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.instagram?.actionText || 'Scan to View'}
                      onChange={(e) => updateSettings('qrPortals.instagram.actionText', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Image Asset Path</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.instagram?.image || '/assets/qr/insta-qr.jpeg'}
                      onChange={(e) => updateSettings('qrPortals.instagram.image', e.target.value)}
                      className="w-full px-2.5 py-1.5 font-mono text-[10px] rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Website QR Card */}
              <div className="p-4 rounded-xl border border-brand-200 bg-brand-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-brand-900 flex items-center gap-1.5">
                    3. Official Website Portal
                  </span>
                  <span className="text-[9px] bg-brand-100 text-brand-900 px-2 py-0.5 rounded-full font-bold">Portal</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.website?.title || 'Website'}
                      onChange={(e) => updateSettings('qrPortals.website.title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Domain / Subtitle</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.website?.handle || 'jayaramsenergy.com'}
                      onChange={(e) => updateSettings('qrPortals.website.handle', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Scan Action Text</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.website?.actionText || 'Scan to Visit'}
                      onChange={(e) => updateSettings('qrPortals.website.actionText', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Image Asset Path</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.website?.image || '/assets/qr/web-qr.jpeg'}
                      onChange={(e) => updateSettings('qrPortals.website.image', e.target.value)}
                      className="w-full px-2.5 py-1.5 font-mono text-[10px] rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Google Maps QR Card */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                    4. Google Maps Office &amp; Directions
                  </span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Location</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.googleMaps?.title || 'Google Maps'}
                      onChange={(e) => updateSettings('qrPortals.googleMaps.title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Location / Subtitle</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.googleMaps?.handle || 'Jubilee Hills HQ'}
                      onChange={(e) => updateSettings('qrPortals.googleMaps.handle', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Scan Action Text</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.googleMaps?.actionText || 'Scan for Route'}
                      onChange={(e) => updateSettings('qrPortals.googleMaps.actionText', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Image Asset Path</label>
                    <input
                      type="text"
                      value={settings.qrPortals?.googleMaps?.image || '/assets/qr/loc-qr.jpeg'}
                      onChange={(e) => updateSettings('qrPortals.googleMaps.image', e.target.value)}
                      className="w-full px-2.5 py-1.5 font-mono text-[10px] rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: COVER PAGE & HERO */}
        {/* ============================================================== */}
        {activeTab === 'cover' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Cover Page Hero Section &amp; Value Propositions (Page 1)
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={settings.coverPage?.heroTitle || ''}
                    onChange={(e) => updateSettings('coverPage.heroTitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Top Badge 1</label>
                  <input
                    type="text"
                    value={settings.coverPage?.badge1 || ''}
                    onChange={(e) => updateSettings('coverPage.badge1', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle / Value Pitch</label>
                  <textarea
                    rows={2}
                    value={settings.coverPage?.heroSubtitle || ''}
                    onChange={(e) => updateSettings('coverPage.heroSubtitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Top Badge 2</label>
                  <input
                    type="text"
                    value={settings.coverPage?.badge2 || ''}
                    onChange={(e) => updateSettings('coverPage.badge2', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              {/* Key Features List */}
              <div className="pt-3 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Featured System Capabilities (Bullets on Page 1):
                </label>
                <div className="space-y-2">
                  {(settings.coverPage?.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...(settings.coverPage?.features || [])];
                          updated[idx] = e.target.value;
                          updateSettings('coverPage.features', updated);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = settings.coverPage.features.filter((_, i) => i !== idx);
                          updateSettings('coverPage.features', updated);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                        title="Remove Bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(settings.coverPage?.features || []), "High-Performance Engineered Solution"];
                      updateSettings('coverPage.features', updated);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200 mt-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Feature Bullet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: TECHNICAL & HARDWARE CATALOG */}
        {/* ============================================================== */}
        {activeTab === 'technical' && (
          <div className="space-y-6">
            {/* Solar Modules Catalog */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-solar-orange" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Solar PV Module Catalog (Tier-1 BloombergNEF)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addPanelBrand}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Module Model</span>
                </button>
              </div>

              <div className="space-y-3">
                {settings.equipmentCatalog?.panelBrands?.map((b, idx) => (
                  <div key={b?.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-900">Module Option #{idx + 1}</span>
                      {(settings.equipmentCatalog?.panelBrands?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => removePanelBrand(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Remove Module"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Brand Name</label>
                        <input
                          type="text"
                          value={b?.name || ''}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.panelBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), name: e.target.value };
                            updateSettings('equipmentCatalog.panelBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300 font-bold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Model Description</label>
                        <input
                          type="text"
                          value={b?.model || ''}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.panelBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), model: e.target.value };
                            updateSettings('equipmentCatalog.panelBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Rated Wattage (Wp)</label>
                        <input
                          type="number"
                          value={b?.wattage || 550}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.panelBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), wattage: parseInt(e.target.value) || 550 };
                            updateSettings('equipmentCatalog.panelBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Cell Tech</label>
                        <input
                          type="text"
                          value={b?.cellType || ''}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.panelBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), cellType: e.target.value };
                            updateSettings('equipmentCatalog.panelBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Efficiency</label>
                        <input
                          type="text"
                          value={b?.efficiency || '22.0%'}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.panelBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), efficiency: e.target.value };
                            updateSettings('equipmentCatalog.panelBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inverter Catalog */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Solar Grid Inverter Catalog
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addInverterBrand}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Inverter Model</span>
                </button>
              </div>

              <div className="space-y-3">
                {settings.equipmentCatalog?.inverterBrands?.map((inv, idx) => (
                  <div key={inv?.id || idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-900">Inverter Option #{idx + 1}</span>
                      {(settings.equipmentCatalog?.inverterBrands?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInverterBrand(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Remove Inverter"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Brand Name</label>
                        <input
                          type="text"
                          value={inv?.name || ''}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.inverterBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), name: e.target.value };
                            updateSettings('equipmentCatalog.inverterBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300 font-bold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Model Description</label>
                        <input
                          type="text"
                          value={inv?.model || ''}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.inverterBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), model: e.target.value };
                            updateSettings('equipmentCatalog.inverterBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Efficiency</label>
                        <input
                          type="text"
                          value={inv?.efficiency || '98.5%'}
                          onChange={(e) => {
                            const updated = [...(settings.equipmentCatalog?.inverterBrands || [])];
                            updated[idx] = { ...(updated[idx] || {}), efficiency: e.target.value };
                            updateSettings('equipmentCatalog.inverterBrands', updated);
                          }}
                          className="w-full px-2 py-1 bg-white rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure & Electrical Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Mounting Structure &amp; Electrical Balance of System (Page 2 BOM)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MMS Material Type</label>
                  <input
                    type="text"
                    value={settings.equipmentCatalog?.structureSpecs?.type || ''}
                    onChange={(e) => updateSettings('equipmentCatalog.structureSpecs.type', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Galvanization Zinc Coating</label>
                  <input
                    type="text"
                    value={settings.equipmentCatalog?.structureSpecs?.coating || ''}
                    onChange={(e) => updateSettings('equipmentCatalog.structureSpecs.coating', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Wind Rating Standard</label>
                  <input
                    type="text"
                    value={settings.equipmentCatalog?.structureSpecs?.windRating || ''}
                    onChange={(e) => updateSettings('equipmentCatalog.structureSpecs.windRating', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">DC Solar Cable Standard</label>
                  <input
                    type="text"
                    value={settings.equipmentCatalog?.electricalSpecs?.dcCable || ''}
                    onChange={(e) => updateSettings('equipmentCatalog.electricalSpecs.dcCable', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Earthing Chemical Standard</label>
                  <input
                    type="text"
                    value={settings.equipmentCatalog?.electricalSpecs?.earthing || ''}
                    onChange={(e) => updateSettings('equipmentCatalog.electricalSpecs.earthing', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* MMS Types for Form Dropdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Mounting Structure Options (Form Dropdown)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addStructureType}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-semibold text-xs hover:bg-brand-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Structure Option
                </button>
              </div>

              <div className="space-y-3">
                {(settings.equipmentCatalog?.structureTypes || []).map((st, idx) => {
                  const val = typeof st === 'string' ? st : (st?.name || '');
                  return (
                    <div key={st?.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const updated = [...(settings.equipmentCatalog?.structureTypes || [])];
                          if (typeof updated[idx] === 'string') {
                            updated[idx] = { id: `mms-${idx}`, name: e.target.value };
                          } else {
                            updated[idx] = { ...(updated[idx] || {}), name: e.target.value };
                          }
                          updateSettings('equipmentCatalog.structureTypes', updated);
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="Structure description..."
                      />
                      {(settings.equipmentCatalog?.structureTypes || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStructureType(idx)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove structure option"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: PRICING, SUBSIDY & ROI ASSUMPTIONS */}
        {/* ============================================================== */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Commercial Pricing Rates &amp; DISCOM Tariffs
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Residential Rate (₹/kWp)</label>
                  <input
                    type="number"
                    step="500"
                    value={settings.pricing?.defaultRatePerKw || 52000}
                    onChange={(e) => updateSettings('pricing.defaultRatePerKw', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 font-bold text-slate-900 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Standard residential turnkey baseline</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Commercial Rate (₹/kWp)</label>
                  <input
                    type="number"
                    step="500"
                    value={settings.pricing?.commercialRatePerKw || 45000}
                    onChange={(e) => updateSettings('pricing.commercialRatePerKw', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 font-bold text-slate-900 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Higher capacity installations</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Composite Solar GST (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.pricing?.defaultGstRate || 13.8}
                    onChange={(e) => updateSettings('pricing.defaultGstRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 font-bold text-slate-900 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">13.8% standard MNRE composite</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grid Electricity Tariff (₹/unit)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.pricing?.defaultTariffPerUnit || 8.5}
                    onChange={(e) => updateSettings('pricing.defaultTariffPerUnit', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 font-bold text-slate-900 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Avoided cost for financial ROI</span>
                </div>
              </div>
            </div>

            {/* Subsidy & Financial Model Parameters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-solar-warm" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Central Subsidy (CFA) &amp; Financial Assumptions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Subsidy Scheme Name</label>
                  <input
                    type="text"
                    value={settings.pricing?.defaultSubsidyScheme || 'PM Surya Ghar: Muft Bijli Yojana'}
                    onChange={(e) => updateSettings('pricing.defaultSubsidyScheme', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Standard Subsidy Amount (₹)</label>
                  <input
                    type="number"
                    step="1000"
                    value={settings.pricing?.defaultSubsidyAmount || 78000}
                    onChange={(e) => updateSettings('pricing.defaultSubsidyAmount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 font-bold text-emerald-700 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Direct DBT to consumer account</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tariff Escalation (% / year)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.pricing?.tariffEscalationRate || 3.5}
                    onChange={(e) => updateSettings('pricing.tariffEscalationRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Compounding grid price increase</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Panel Degradation (% / year)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={settings.pricing?.panelDegradationRate || 0.55}
                    onChange={(e) => updateSettings('pricing.panelDegradationRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Tier-1 TOPCon linear degradation</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CO₂ Factor (kg / kWh)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.pricing?.co2FactorPerKwh || 0.82}
                    onChange={(e) => updateSettings('pricing.co2FactorPerKwh', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trees Equivalent Factor</label>
                  <input
                    type="number"
                    step="0.5"
                    value={settings.pricing?.treeFactorPerTonne || 16.5}
                    onChange={(e) => updateSettings('pricing.treeFactorPerTonne', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                  <span className="text-[10px] text-slate-400">Trees per tonne CO₂</span>
                </div>
              </div>
            </div>

            {/* Default Payment Milestones */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Default Payment Milestone Stages (Page 3)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings.paymentMilestones || []).map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Milestone Stage Title</label>
                      <input
                        type="text"
                        value={m.milestone}
                        onChange={(e) => {
                          const updated = [...settings.paymentMilestones];
                          updated[idx].milestone = e.target.value;
                          updateSettings('paymentMilestones', updated);
                        }}
                        className="w-full px-2.5 py-1.5 font-bold bg-white rounded border border-slate-300"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Percentage (%)</label>
                      <input
                        type="number"
                        value={m.percentage}
                        onChange={(e) => {
                          const updated = [...settings.paymentMilestones];
                          updated[idx].percentage = parseInt(e.target.value) || 0;
                          updateSettings('paymentMilestones', updated);
                        }}
                        className="w-full px-2.5 py-1.5 font-bold text-center bg-white rounded border border-slate-300"
                      />
                    </div>
                    <div className="flex-1 min-w-[280px]">
                      <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Trigger Condition</label>
                      <input
                        type="text"
                        value={m.description}
                        onChange={(e) => {
                          const updated = [...settings.paymentMilestones];
                          updated[idx].description = e.target.value;
                          updateSettings('paymentMilestones', updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                      />
                    </div>
                    {settings.paymentMilestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: WARRANTIES, SCOPE MATRIX & O&M */}
        {/* ============================================================== */}
        {activeTab === 'warranties' && (
          <div className="space-y-6">
            {/* Warranty Guarantees */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Warranty &amp; Performance Guarantees
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">25-Year Linear Performance Warranty Statement</label>
                  <input
                    type="text"
                    value={settings.warranties?.panelPerformance || ''}
                    onChange={(e) => updateSettings('warranties.panelPerformance', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Solar PV Module Workmanship Defect Warranty</label>
                  <input
                    type="text"
                    value={settings.warranties?.panelProduct || ''}
                    onChange={(e) => updateSettings('warranties.panelProduct', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inverter Standard Warranty</label>
                  <input
                    type="text"
                    value={settings.warranties?.inverterWarranty || ''}
                    onChange={(e) => updateSettings('warranties.inverterWarranty', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Comprehensive Free Workmanship &amp; Preventive AMC</label>
                  <input
                    type="text"
                    value={settings.warranties?.workmanshipAmc || ''}
                    onChange={(e) => updateSettings('warranties.workmanshipAmc', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Scope of Work Matrix Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-brand-700" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Scope of Work Responsibility Matrix (Page 5 Table)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addScopeItem}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Scope Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {(settings.scopeOfWorkMatrix || []).map((row, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) => {
                        const updated = [...settings.scopeOfWorkMatrix];
                        updated[idx].item = e.target.value;
                        updateSettings('scopeOfWorkMatrix', updated);
                      }}
                      className="flex-1 px-3 py-1.5 font-medium bg-white rounded border border-slate-300"
                    />

                    <div className="flex items-center gap-4 shrink-0">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.epc}
                          onChange={(e) => {
                            const updated = [...settings.scopeOfWorkMatrix];
                            updated[idx].epc = e.target.checked;
                            updateSettings('scopeOfWorkMatrix', updated);
                          }}
                          className="rounded text-brand-900 focus:ring-brand-500"
                        />
                        <span className="font-semibold text-emerald-700">EPC Scope</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={row.client}
                          onChange={(e) => {
                            const updated = [...settings.scopeOfWorkMatrix];
                            updated[idx].client = e.target.checked;
                            updateSettings('scopeOfWorkMatrix', updated);
                          }}
                          className="rounded text-brand-900 focus:ring-brand-500"
                        />
                        <span className="font-semibold text-slate-700">Client Scope</span>
                      </label>

                      {settings.scopeOfWorkMatrix.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScopeItem(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete Row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authorized Signatory & Official Stamp Block */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Authorized Signatory &amp; Official Rubber Stamp (Page 3)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Signatory Name</label>
                  <input
                    type="text"
                    value={settings.authorization?.signatoryName || ''}
                    onChange={(e) => updateSettings('authorization.signatoryName', e.target.value)}
                    className="w-full px-3 py-2 font-bold rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation / Title</label>
                  <input
                    type="text"
                    value={settings.authorization?.signatoryTitle || ''}
                    onChange={(e) => updateSettings('authorization.signatoryTitle', e.target.value)}
                    className="w-full px-3 py-2 font-medium rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approval Badge Label</label>
                  <input
                    type="text"
                    value={settings.authorization?.approvedBadge || 'Approved & Signed'}
                    onChange={(e) => updateSettings('authorization.approvedBadge', e.target.value)}
                    className="w-full px-3 py-2 font-medium rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stamp Top Circular Text</label>
                  <input
                    type="text"
                    value={settings.authorization?.stampTop || '★ JAYARAMS SOLAR SOLUTIONS ★'}
                    onChange={(e) => updateSettings('authorization.stampTop', e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stamp Center Text</label>
                  <input
                    type="text"
                    value={settings.authorization?.stampCenter || 'AUTHORIZED'}
                    onChange={(e) => updateSettings('authorization.stampCenter', e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs font-bold rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stamp Bottom Circular Text</label>
                  <input
                    type="text"
                    value={settings.authorization?.stampBottom || 'TECHNICAL EPC DIVISION'}
                    onChange={(e) => updateSettings('authorization.stampBottom', e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: PORTFOLIO & SHOWCASE */}
        {/* ============================================================== */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {/* Top 4 Track Record Statistics */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Top 4 Track Record Metrics (Page 4 Header Banner)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* Metric 1 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-brand-900 block">Metric #1: Installations</span>
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.plantsCount || '850+'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.plantsCount', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-black text-brand-900 bg-white rounded border border-slate-300"
                    placeholder="850+"
                  />
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.plantsLabel || 'Rooftop Plants'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.plantsLabel', e.target.value)}
                    className="w-full px-2.5 py-1 text-[11px] bg-white rounded border border-slate-300"
                    placeholder="Rooftop Plants"
                  />
                </div>

                {/* Metric 2 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-brand-900 block">Metric #2: Capacity</span>
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.capacity || '12.8+ MW'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.capacity', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-black text-brand-900 bg-white rounded border border-slate-300"
                    placeholder="12.8+ MW"
                  />
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.capacityLabel || 'Total Capacity'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.capacityLabel', e.target.value)}
                    className="w-full px-2.5 py-1 text-[11px] bg-white rounded border border-slate-300"
                    placeholder="Total Capacity"
                  />
                </div>

                {/* Metric 3 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-brand-900 block">Metric #3: Savings</span>
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.savings || '₹4.8+ Cr'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.savings', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-black text-emerald-600 bg-white rounded border border-slate-300"
                    placeholder="₹4.8+ Cr"
                  />
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.savingsLabel || 'Annual Savings'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.savingsLabel', e.target.value)}
                    className="w-full px-2.5 py-1 text-[11px] bg-white rounded border border-slate-300"
                    placeholder="Annual Savings"
                  />
                </div>

                {/* Metric 4 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-brand-900 block">Metric #4: Approvals</span>
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.netMetering || '100%'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.netMetering', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-black text-brand-900 bg-white rounded border border-slate-300"
                    placeholder="100%"
                  />
                  <input
                    type="text"
                    value={settings.portfolioWorks?.metrics?.netMeteringLabel || 'Net-Metering'}
                    onChange={(e) => updateSettings('portfolioWorks.metrics.netMeteringLabel', e.target.value)}
                    className="w-full px-2.5 py-1 text-[11px] bg-white rounded border border-slate-300"
                    placeholder="Net-Metering"
                  />
                </div>
              </div>
            </div>

            {/* 4 Signature Projects */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-solar-orange" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    4 Signature Executed Projects (Page 4)
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500">Full uncropped photos with technical yields</span>
              </div>

              <div className="space-y-4">
                {(settings.portfolioWorks?.projects || []).slice(0, 4).map((p, idx) => (
                  <div key={p.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-brand-900">Project #{idx + 1}: {p.title}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{p.verifiedBadge || 'GPS Geotagged'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Project Title</label>
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].title = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-bold bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Category &amp; Capacity</label>
                        <input
                          type="text"
                          value={p.category}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].category = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Annual Generation</label>
                        <input
                          type="text"
                          value={p.annualGeneration}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].annualGeneration = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-bold bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Annual Savings</label>
                        <input
                          type="text"
                          value={p.annualSavings}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].annualSavings = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-bold text-emerald-700 bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Image Asset URL</label>
                        <input
                          type="text"
                          value={p.imageUrl}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].imageUrl = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-mono text-[10px] bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Short Engineering Summary</label>
                        <input
                          type="text"
                          value={p.description}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.projects];
                            updated[idx].description = e.target.value;
                            updateSettings('portfolioWorks.projects', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Extra Field Commissioning Showcase Photos */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    2 Field Commissioning Showcase Photos (Bottom of Page 4)
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500">Rendered side-by-side with location tags</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(settings.portfolioWorks?.extraShowcase || []).slice(0, 2).map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <span className="font-extrabold text-xs text-brand-900 block">Field Showcase Photo #{idx + 1}</span>
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Installation Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].title = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-bold bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Location Badge (Pill)</label>
                        <input
                          type="text"
                          value={item.locationPill}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].locationPill = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Category Overlay Label</label>
                        <input
                          type="text"
                          value={item.categoryPill}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].categoryPill = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Technical Specs / Verification Pill</label>
                        <input
                          type="text"
                          value={item.badgeText}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].badgeText = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Image Asset URL / Path</label>
                        <input
                          type="text"
                          value={item.imageUrl}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].imageUrl = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 font-mono text-[10px] bg-white rounded border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...settings.portfolioWorks.extraShowcase];
                            updated[idx].description = e.target.value;
                            updateSettings('portfolioWorks.extraShowcase', updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at Bottom */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Back to Dashboard
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-brand-900 text-white rounded-xl text-xs font-extrabold hover:bg-brand-800 shadow-md flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
