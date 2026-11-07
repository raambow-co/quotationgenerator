import React, { useState } from 'react';
import { 
  Save, 
  ArrowLeft, 
  RotateCcw, 
  Settings as SettingsIcon, 
  IndianRupee, 
  Building, 
  Landmark, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2 
} from 'lucide-react';

export default function SettingsView({ currentSettings, onSaveSettings, onResetDefaults, onBack }) {
  const [settings, setSettings] = useState(() => JSON.parse(JSON.stringify(currentSettings)));
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(settings);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const addPanelBrand = () => {
    const newBrand = {
      id: `brand-${Date.now()}`,
      name: 'New Solar Brand',
      model: '550Wp TOPCon Bifacial',
      wattage: 550,
      cellType: 'N-Type TOPCon'
    };
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        panelBrands: [...prev.equipmentCatalog.panelBrands, newBrand]
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

  const addInverterBrand = () => {
    const newInv = {
      id: `inv-${Date.now()}`,
      name: 'New Inverter Brand',
      model: 'Multi-MPPT Smart Grid Inverter',
      efficiency: '98.5%'
    };
    setSettings(prev => ({
      ...prev,
      equipmentCatalog: {
        ...prev.equipmentCatalog,
        inverterBrands: [...prev.equipmentCatalog.inverterBrands, newInv]
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-brand-700" />
              <span>Admin Pricing & Default Settings</span>
            </h1>
            <p className="text-xs text-slate-500">
              Configure default base prices per kW, equipment catalog, bank remittance details, and corporate profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Future quotations will use these updated defaults.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: DEFAULT PRICING & TAXATION */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Default Pricing & Commercial Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Residential Rate (₹/kWp)
              </label>
              <input
                type="number"
                step="500"
                value={settings.pricing.defaultRatePerKw}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, defaultRatePerKw: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <span className="text-[10px] text-slate-400">Standard turnkey baseline</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Commercial Rate (₹/kWp)
              </label>
              <input
                type="number"
                step="500"
                value={settings.pricing.commercialRatePerKw}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, commercialRatePerKw: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <span className="text-[10px] text-slate-400">Large capacity &gt;25 kW</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Composite GST (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.pricing.defaultGstRate}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, defaultGstRate: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <span className="text-[10px] text-slate-400">13.8% MNRE norm</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Discom Tariff (₹/unit)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.pricing.defaultTariffPerUnit}
                onChange={(e) => setSettings({
                  ...settings,
                  pricing: { ...settings.pricing, defaultTariffPerUnit: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <span className="text-[10px] text-slate-400">For ROI calculations</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: COMPANY PROFILE & CONTACT */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-brand-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Company Branding & Official Coordinates (Printed on All 5 Pages)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Legal Name
              </label>
              <input
                type="text"
                value={settings.company.name}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, name: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Corporate Tagline / Slogan
              </label>
              <input
                type="text"
                value={settings.company.tagline}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, tagline: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Head Office Address
              </label>
              <input
                type="text"
                value={settings.company.address}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, address: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Branch Cities
              </label>
              <input
                type="text"
                value={settings.company.branches}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, branches: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GSTIN Registration Number
              </label>
              <input
                type="text"
                value={settings.company.gstin}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, gstin: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone Numbers
              </label>
              <input
                type="text"
                value={settings.company.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, phone: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email Address
              </label>
              <input
                type="text"
                value={settings.company.email}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, email: e.target.value }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: BANK REMITTANCE COORDINATES */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Official Bank Remittance Details (Printed on Page 5)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Beneficiary Account Name
              </label>
              <input
                type="text"
                value={settings.company.bankDetails.accountName}
                onChange={(e) => setSettings({
                  ...settings,
                  company: {
                    ...settings.company,
                    bankDetails: { ...settings.company.bankDetails, accountName: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={settings.company.bankDetails.bankName}
                onChange={(e) => setSettings({
                  ...settings,
                  company: {
                    ...settings.company,
                    bankDetails: { ...settings.company.bankDetails, bankName: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Account Number
              </label>
              <input
                type="text"
                value={settings.company.bankDetails.accountNumber}
                onChange={(e) => setSettings({
                  ...settings,
                  company: {
                    ...settings.company,
                    bankDetails: { ...settings.company.bankDetails, accountNumber: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={settings.company.bankDetails.ifscCode}
                onChange={(e) => setSettings({
                  ...settings,
                  company: {
                    ...settings.company,
                    bankDetails: { ...settings.company.bankDetails, ifscCode: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Branch Address
              </label>
              <input
                type="text"
                value={settings.company.bankDetails.branch}
                onChange={(e) => setSettings({
                  ...settings,
                  company: {
                    ...settings.company,
                    bankDetails: { ...settings.company.bankDetails, branch: e.target.value }
                  }
                })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: HARDWARE CATALOG (PANELS & INVERTERS) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-solar-orange" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Hardware Catalog (Tier-1 Modules & Inverters)
              </h2>
            </div>
            <button
              type="button"
              onClick={addPanelBrand}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-brand-900 bg-brand-50 rounded-lg hover:bg-brand-100 border border-brand-200"
            >
              <Plus className="w-3 h-3" />
              <span>Add Module Brand</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Configured Solar Module Brands:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {settings.equipmentCatalog.panelBrands.map((b, idx) => (
                <div key={b.id || idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{b.name}</p>
                    <p className="text-[10px] text-slate-500">{b.model} &bull; {b.wattage}Wp</p>
                  </div>
                  {settings.equipmentCatalog.panelBrands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePanelBrand(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Remove Brand"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800 shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

