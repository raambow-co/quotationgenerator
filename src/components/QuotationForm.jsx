import React, { useState, useEffect } from 'react';
import { calculateSolarMetrics, calculateFinancials, calculateSubsidy } from '../utils/calculations';
import { generateQuotationNumber, formatCurrency } from '../utils/formatters';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Zap, 
  User, 
  MapPin, 
  Cpu, 
  IndianRupee, 
  Clock, 
  Sparkles, 
  FileCheck, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  Edit3
} from 'lucide-react';

export default function QuotationForm({ initialData, settings, onSave, onCancel, onPreview }) {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer', 'technical', 'commercials', 'terms'

  // Initialize Form Data
  const [formData, setFormData] = useState(() => {
    if (initialData) return initialData;

    const defaultKw = 5.0;
    const defaultMetrics = calculateSolarMetrics(defaultKw, settings?.pricing?.defaultTariffPerUnit || 8.5, 550);
    const defaultSubsidy = calculateSubsidy(defaultKw, settings?.pricing?.defaultSubsidyScheme || 'pm-surya-ghar');
    const defaultFin = calculateFinancials({
      capacityKw: defaultKw,
      pricePerKw: settings?.pricing?.defaultRatePerKw || 52000,
      gstRate: settings?.pricing?.defaultGstRate || 13.8,
      subsidyAmount: defaultSubsidy,
      annualSavings: defaultMetrics.annualSavings
    });

    return {
      id: `quote-${Date.now()}`,
      quotationNumber: generateQuotationNumber(),
      date: new Date().toISOString().split('T')[0],
      validityDays: 30,
      status: 'Draft',
      customer: {
        name: '',
        companyName: '',
        phone: '',
        email: '',
        location: '',
        consumerNumber: '',
        sanctionedLoad: '5 kW',
        gridPhase: '3-Phase',
        roofType: 'RCC Flat Concrete Terrace'
      },
      technical: {
        systemCapacityKw: defaultKw,
        panelBrand: settings?.equipmentCatalog?.panelBrands?.[0]?.name || 'Waaree Solar',
        panelModel: settings?.equipmentCatalog?.panelBrands?.[0]?.model || '550Wp Bi-facial Dual Glass TopCon',
        panelWattage: 550,
        panelCount: defaultMetrics.panelCount,
        inverterBrand: settings?.equipmentCatalog?.inverterBrands?.[0]?.name || 'Sungrow Power',
        inverterModel: settings?.equipmentCatalog?.inverterBrands?.[0]?.model || 'Smart On-Grid Dual MPPT Inverter',
        structureType: settings?.equipmentCatalog?.structureTypes?.[0]?.name || 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft',
        cablesAndBOS: settings?.equipmentCatalog?.cableBrands || 'Polycab / Siechem 4 sq.mm TUV Solar Cables',
        monitoring: 'Smart Wi-Fi IoT Cloud Real-time Mobile Application',
        estimatedDailyUnits: defaultMetrics.dailyUnits,
        estimatedAnnualUnits: defaultMetrics.annualUnits,
        estimatedMonthlySavings: defaultMetrics.monthlySavings,
        estimatedAnnualSavings: defaultMetrics.annualSavings,
        roofAreaSqFt: defaultMetrics.roofAreaSqFt,
        co2SavedTonnes: defaultMetrics.annualCo2SavedTonnes
      },
      commercials: {
        ratePerKw: settings?.pricing?.defaultRatePerKw || 52000,
        baseCost: defaultFin.basePrice,
        discount: 0,
        priceAfterDiscount: defaultFin.priceAfterDiscount,
        gstRate: settings?.pricing?.defaultGstRate || 13.8,
        gstAmount: defaultFin.gst,
        totalGrossCost: defaultFin.totalGrossCost,
        subsidyScheme: 'PM Surya Ghar: Muft Bijli Yojana',
        subsidyAmount: defaultSubsidy,
        netPayable: defaultFin.netPayable,
        paybackYears: defaultFin.paybackYears,
        cumulativeSavings25Years: defaultFin.lifetimeSavings25Years
      },
      warranties: { ...(settings?.warranties || settings?.defaultWarranties || {}) },
      paymentMilestones: [...(settings?.paymentMilestones || settings?.defaultPaymentTerms || [])],
      notes: 'Includes turnkey DISCOM Net-Metering facilitation, foundation column civil work, and complimentary solar panel cleaning maintenance kit.',
      preparedBy: 'Jayarams Solar Engineering & Sales Team'
    };
  });

  // Track which dropdowns are in "Other / Custom" mode with text input visible
  const [customFields, setCustomFields] = useState(() => {
    const isCustomPanel = initialData?.technical?.panelBrand
      ? !settings?.equipmentCatalog?.panelBrands?.some(b => b.name === initialData.technical.panelBrand)
      : false;
    const isCustomInverter = initialData?.technical?.inverterBrand
      ? !settings?.equipmentCatalog?.inverterBrands?.some(inv => inv.name === initialData.technical.inverterBrand)
      : false;
    const isCustomStructure = initialData?.technical?.structureType
      ? !settings?.equipmentCatalog?.structureTypes?.some(st => (typeof st === 'string' ? st : st.name) === initialData.technical.structureType)
      : false;
    const standardRoofs = [
      'RCC Flat Concrete Terrace',
      'Industrial Trapezoidal Metal Sheet',
      'Slanted Clay / Mangalore Tiled Roof',
      'Elevated Gazebo / Pergola Rooftop'
    ];
    const isCustomRoof = initialData?.customer?.roofType
      ? !standardRoofs.includes(initialData.customer.roofType)
      : false;
    const standardPhases = [
      'Single Phase (1-Phase 230V)',
      '3-Phase (415V LT)',
      '3-Phase (11kV HT)'
    ];
    const isCustomPhase = initialData?.customer?.gridPhase
      ? !standardPhases.includes(initialData.customer.gridPhase)
      : false;
    const standardWattages = [550, 545, 500, 580];
    const isCustomWattage = initialData?.technical?.panelWattage
      ? !standardWattages.includes(initialData.technical.panelWattage)
      : false;
    const standardSubsidies = [
      'PM Surya Ghar: Muft Bijli Yojana',
      'Commercial - Accelerated Depreciation (Tax Benefit 40%)',
      'none'
    ];
    const isCustomSubsidy = initialData?.commercials?.subsidyScheme
      ? !standardSubsidies.includes(initialData.commercials.subsidyScheme)
      : false;

    return {
      panelBrand: isCustomPanel,
      inverterBrand: isCustomInverter,
      structureType: isCustomStructure,
      roofType: isCustomRoof,
      gridPhase: isCustomPhase,
      panelWattage: isCustomWattage,
      subsidyScheme: isCustomSubsidy
    };
  });

  // Recompute automatically when capacity, panel wattage, rate, discount, or subsidy changes
  const handleCapacityChange = (kwValue, newWattage = null) => {
    const kw = parseFloat(kwValue) || 0;
    const wattage = newWattage !== null ? newWattage : (formData.technical.panelWattage || 550);
    const metrics = calculateSolarMetrics(kw, 8.5, wattage);
    const subsidy = calculateSubsidy(metrics.actualDcCapacityKw, formData.commercials.subsidyScheme);
    
    const fin = calculateFinancials({
      capacityKw: metrics.actualDcCapacityKw,
      pricePerKw: formData.commercials.ratePerKw,
      gstRate: formData.commercials.gstRate,
      discountAmount: formData.commercials.discount,
      subsidyAmount: subsidy,
      annualSavings: metrics.annualSavings
    });

    setFormData(prev => ({
      ...prev,
      technical: {
        ...prev.technical,
        systemCapacityKw: metrics.actualDcCapacityKw,
        actualDcCapacityKw: metrics.actualDcCapacityKw,
        acInverterCapacityKw: kw,
        panelWattage: wattage,
        panelCount: metrics.panelCount,
        estimatedDailyUnits: metrics.dailyUnits,
        estimatedAnnualUnits: metrics.annualUnits,
        estimatedMonthlySavings: metrics.monthlySavings,
        estimatedAnnualSavings: metrics.annualSavings,
        roofAreaSqFt: metrics.roofAreaSqFt,
        co2SavedTonnes: metrics.annualCo2SavedTonnes
      },
      commercials: {
        ...prev.commercials,
        baseCost: fin.basePrice,
        priceAfterDiscount: fin.priceAfterDiscount,
        gstAmount: fin.gst,
        totalGrossCost: fin.totalGrossCost,
        subsidyAmount: subsidy,
        netPayable: fin.netPayable,
        paybackYears: fin.paybackYears,
        gross25YrSavings: fin.gross25YrSavings,
        net25YrProfit: fin.net25YrProfit,
        cumulativeSavings25Years: fin.net25YrProfit
      }
    }));
  };

  const handleCommercialChange = (field, value) => {
    const updatedCommercials = {
      ...formData.commercials,
      [field]: parseFloat(value) || 0
    };

    const fin = calculateFinancials({
      capacityKw: formData.technical.actualDcCapacityKw || formData.technical.systemCapacityKw,
      pricePerKw: field === 'ratePerKw' ? value : updatedCommercials.ratePerKw,
      discountAmount: field === 'discount' ? value : updatedCommercials.discount,
      gstRate: field === 'gstRate' ? value : updatedCommercials.gstRate,
      subsidyAmount: field === 'subsidyAmount' ? value : updatedCommercials.subsidyAmount,
      annualSavings: formData.technical.estimatedAnnualSavings
    });

    setFormData(prev => ({
      ...prev,
      commercials: {
        ...prev.commercials,
        ...updatedCommercials,
        baseCost: fin.basePrice,
        priceAfterDiscount: fin.priceAfterDiscount,
        gstAmount: fin.gst,
        totalGrossCost: fin.totalGrossCost,
        netPayable: fin.netPayable,
        paybackYears: fin.paybackYears,
        gross25YrSavings: fin.gross25YrSavings,
        net25YrProfit: fin.net25YrProfit,
        cumulativeSavings25Years: fin.net25YrProfit
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const quickKwOptions = [3, 4, 5, 6, 8, 10, 15, 20, 25, 50];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Form Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-subtle">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>{initialData ? 'Edit Solar Quotation' : 'Create New Solar Quotation'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200 font-mono font-bold">
                {formData.quotationNumber}
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Fill in client requirements and technical specifications to generate the 5-page proposal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onPreview(formData)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-4 h-4 text-brand-700" />
            <span>Live 5-Page Preview</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 text-white" />
            <span>Save & Generate Proposal</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left (8 cols) + Live Summary Card Right (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('customer')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'customer'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. Client & Site Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('technical')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'technical'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-solar-warm" />
              <span>2. Solar System Specs (P2)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('commercials')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'commercials'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Pricing & Subsidy (P3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'terms'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>4. Milestones & Notes</span>
            </button>
          </div>

          {/* Form Content Cards */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-6">
            {/* TAB 1: CUSTOMER & SITE */}
            {activeTab === 'customer' && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-700" />
                    Customer & Installation Site Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    This information appears on Page 1 (Cover) and official DISCOM documentation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Rajesh Varma"
                      value={formData.customer.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Varma Agro Industries / Residential"
                      value={formData.customer.companyName}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, companyName: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98490 12345"
                      value={formData.customer.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, phone: e.target.value }
                      })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border ${
                        formData.customer.phone && formData.customer.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '').replace(/^0/, '').length !== 10
                          ? 'border-amber-400 bg-amber-50/20'
                          : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500`}
                    />
                    {formData.customer.phone && formData.customer.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '').replace(/^0/, '').length !== 10 && (
                      <p className="text-[10px] text-amber-600 mt-1 font-medium">
                        ⚠️ Indian mobile numbers should have 10 digits (currently {formData.customer.phone.replace(/[\s\-\+]/g, '').replace(/^91/, '').replace(/^0/, '').length} digits).
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={formData.customer.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Installation Site Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot #112, Road #4, Gachibowli Hills, Hyderabad, Telangana - 500032"
                      value={formData.customer.location}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Include Plot/Door No., Street, Area, City, and PIN code for DISCOM net-metering feasibility.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Electricity Consumer Service No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TSSPDCL-04829104"
                      value={formData.customer.consumerNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, consumerNumber: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sanctioned Connected Load
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10 kW / 15 HP"
                      value={formData.customer.sanctionedLoad}
                      onChange={(e) => setFormData({
                        ...formData,
                        customer: { ...formData.customer, sanctionedLoad: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Grid Connection Phase
                      </label>
                      {customFields.gridPhase && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.gridPhase ? '__custom__' : (formData.customer.gridPhase || '3-Phase (415V LT)')}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, gridPhase: true }));
                          const std = ['Single Phase (1-Phase 230V)', '3-Phase (415V LT)', '3-Phase (11kV HT)'];
                          if (std.includes(formData.customer.gridPhase)) {
                            setFormData(prev => ({
                              ...prev,
                              customer: { ...prev.customer, gridPhase: '3-Phase 415V Dedicated Feeder' }
                            }));
                          }
                        } else {
                          setCustomFields(prev => ({ ...prev, gridPhase: false }));
                          setFormData(prev => ({
                            ...prev,
                            customer: { ...prev.customer, gridPhase: e.target.value }
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="Single Phase (1-Phase 230V)">Single Phase (1-Phase 230V)</option>
                      <option value="3-Phase (415V LT)">3-Phase (415V LT)</option>
                      <option value="3-Phase (11kV HT)">3-Phase (11kV HT)</option>
                      <option value="__custom__">Other / Custom Grid Voltage...</option>
                    </select>
                    {customFields.gridPhase && (
                      <div className="mt-1.5 animate-in fade-in duration-200">
                        <input
                          type="text"
                          value={formData.customer.gridPhase || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            customer: { ...prev.customer, gridPhase: e.target.value }
                          }))}
                          placeholder="Type custom grid voltage / phase..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Terrace / Rooftop Type
                      </label>
                      {customFields.roofType && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.roofType ? '__custom__' : (formData.customer.roofType || 'RCC Flat Concrete Terrace')}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, roofType: true }));
                          const std = [
                            'RCC Flat Concrete Terrace',
                            'Industrial Trapezoidal Metal Sheet',
                            'Slanted Clay / Mangalore Tiled Roof',
                            'Elevated Gazebo / Pergola Rooftop'
                          ];
                          if (std.includes(formData.customer.roofType)) {
                            setFormData(prev => ({
                              ...prev,
                              customer: { ...prev.customer, roofType: 'Custom Rooftop Profile' }
                            }));
                          }
                        } else {
                          setCustomFields(prev => ({ ...prev, roofType: false }));
                          setFormData(prev => ({
                            ...prev,
                            customer: { ...prev.customer, roofType: e.target.value }
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="RCC Flat Concrete Terrace">RCC Flat Concrete Terrace</option>
                      <option value="Industrial Trapezoidal Metal Sheet">Industrial Trapezoidal Metal Sheet</option>
                      <option value="Slanted Clay / Mangalore Tiled Roof">Slanted Clay / Mangalore Tiled Roof</option>
                      <option value="Elevated Gazebo / Pergola Rooftop">Elevated Gazebo / Pergola Rooftop</option>
                      <option value="__custom__">Other / Custom Terrace Type...</option>
                    </select>
                    {customFields.roofType && (
                      <div className="mt-1.5 animate-in fade-in duration-200">
                        <input
                          type="text"
                          value={formData.customer.roofType || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            customer: { ...prev.customer, roofType: e.target.value }
                          }))}
                          placeholder="Type custom terrace profile (e.g. Standing Seam Metal, Curved Arch)..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('technical')}
                    className="px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800 transition-colors"
                  >
                    Next: Technical Specifications &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: TECHNICAL SYSTEM SPECS */}
            {activeTab === 'technical' && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-brand-700" />
                      Solar System Capacity & Hardware Selection (Page 2 Matter)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select capacity and Tier-1 hardware brands. Calculations update live.
                    </p>
                  </div>
                </div>

                {/* Quick Capacity Pickers */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Quick Preset System Capacity (kWp)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {quickKwOptions.map(kw => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => handleCapacityChange(kw)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          formData.technical.systemCapacityKw === kw
                            ? 'bg-brand-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {kw} kWp
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      System Capacity (kWp) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.5"
                        min="1"
                        max="500"
                        required
                        value={formData.technical.systemCapacityKw}
                        onChange={(e) => handleCapacityChange(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                      <span className="absolute right-3 top-2 text-xs text-slate-400 font-semibold">kWp</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Module Rating (Wp)
                      </label>
                      {customFields.panelWattage && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.panelWattage ? '__custom__' : (formData.technical.panelWattage || 550)}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, panelWattage: true }));
                        } else {
                          setCustomFields(prev => ({ ...prev, panelWattage: false }));
                          const w = parseInt(e.target.value, 10);
                          handleCapacityChange(formData.technical.systemCapacityKw, w);
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value={550}>550 Wp (Waaree Arka TOPCon Bifacial)</option>
                      <option value={545}>545 Wp (Adani Mono PERC)</option>
                      <option value={500}>500 Wp (Tata Solar Mono)</option>
                      <option value={580}>580 Wp (Ultra High Yield)</option>
                      <option value="__custom__">Other / Custom Wattage (Wp)...</option>
                    </select>
                    {customFields.panelWattage && (
                      <div className="mt-1.5 animate-in fade-in duration-200 flex items-center gap-2">
                        <input
                          type="number"
                          step="5"
                          min="100"
                          max="1000"
                          value={formData.technical.panelWattage || 550}
                          onChange={(e) => {
                            const w = parseInt(e.target.value, 10) || 550;
                            handleCapacityChange(formData.technical.systemCapacityKw, w);
                          }}
                          placeholder="Type custom wattage..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-300 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-bold"
                        />
                        <span className="text-xs font-bold text-slate-600 shrink-0">Wp</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Exact DC Sizing &amp; Modules
                    </label>
                    <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
                      {formData.technical.panelCount} Modules &bull; {formData.technical.actualDcCapacityKw || formData.technical.systemCapacityKw} kWp DC
                    </div>
                  </div>
                </div>

                {/* Brands Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Solar PV Module Brand
                      </label>
                      {customFields.panelBrand && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.panelBrand ? '__custom__' : (formData.technical.panelBrand || '')}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, panelBrand: true }));
                          const brandList = settings?.equipmentCatalog?.panelBrands || [];
                          if (brandList.some(b => b.name === formData.technical.panelBrand) || !formData.technical.panelBrand) {
                            setFormData(prev => ({
                              ...prev,
                              technical: {
                                ...prev.technical,
                                panelBrand: 'Custom Solar Brand',
                                panelModel: '550Wp Bi-facial Dual Glass 16BB TOPCon'
                              }
                            }));
                          }
                        } else {
                          setCustomFields(prev => ({ ...prev, panelBrand: false }));
                          const brandObj = settings?.equipmentCatalog?.panelBrands?.find(b => b.name === e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            technical: {
                              ...prev.technical,
                              panelBrand: e.target.value,
                              panelModel: brandObj?.model || prev.technical.panelModel
                            }
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      {settings?.equipmentCatalog?.panelBrands?.map(b => (
                        <option key={b.id} value={b.name}>{b.name} &bull; {b.model}</option>
                      ))}
                      <option value="__custom__">Other / Custom Brand...</option>
                    </select>

                    {customFields.panelBrand && (
                      <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2 animate-in fade-in duration-200">
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Type Custom Module Brand</label>
                          <input
                            type="text"
                            value={formData.technical.panelBrand || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              technical: { ...prev.technical, panelBrand: e.target.value }
                            }))}
                            placeholder="e.g. Canadian Solar / Vikram Solar / LONGi"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Type Custom Model &amp; Cell Specs</label>
                          <input
                            type="text"
                            value={formData.technical.panelModel || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              technical: { ...prev.technical, panelModel: e.target.value }
                            }))}
                            placeholder="e.g. 550Wp Bi-facial Dual Glass 16BB TOPCon (IS/IEC 61215)"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Solar Inverter Brand &amp; Tech
                      </label>
                      {customFields.inverterBrand && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.inverterBrand ? '__custom__' : (formData.technical.inverterBrand || '')}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, inverterBrand: true }));
                          const invList = settings?.equipmentCatalog?.inverterBrands || [];
                          if (invList.some(inv => inv.name === formData.technical.inverterBrand) || !formData.technical.inverterBrand) {
                            setFormData(prev => ({
                              ...prev,
                              technical: {
                                ...prev.technical,
                                inverterBrand: 'Custom Inverter Brand',
                                inverterModel: 'Smart On-Grid Dual MPPT Inverter with IoT Wi-Fi'
                              }
                            }));
                          }
                        } else {
                          setCustomFields(prev => ({ ...prev, inverterBrand: false }));
                          const invObj = settings?.equipmentCatalog?.inverterBrands?.find(inv => inv.name === e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            technical: {
                              ...prev.technical,
                              inverterBrand: e.target.value,
                              inverterModel: invObj?.model || prev.technical.inverterModel
                            }
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      {settings?.equipmentCatalog?.inverterBrands?.map(inv => (
                        <option key={inv.id} value={inv.name}>{inv.name} &bull; {inv.model}</option>
                      ))}
                      <option value="__custom__">Other / Custom Inverter...</option>
                    </select>

                    {customFields.inverterBrand && (
                      <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg space-y-2 animate-in fade-in duration-200">
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Type Custom Inverter Brand</label>
                          <input
                            type="text"
                            value={formData.technical.inverterBrand || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              technical: { ...prev.technical, inverterBrand: e.target.value }
                            }))}
                            placeholder="e.g. Deye / Fronius / GoodWe / Enphase"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Type Custom Inverter Model &amp; Topology</label>
                          <input
                            type="text"
                            value={formData.technical.inverterModel || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              technical: { ...prev.technical, inverterModel: e.target.value }
                            }))}
                            placeholder="e.g. Smart Multi-MPPT 98.6% Efficiency On-Grid Inverter"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Mounting Structure (MMS)
                      </label>
                      {customFields.structureType && (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Edit3 className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                    <select
                      value={customFields.structureType ? '__custom__' : (formData.technical.structureType || '')}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setCustomFields(prev => ({ ...prev, structureType: true }));
                          const structList = settings?.equipmentCatalog?.structureTypes || [];
                          if (structList.some(st => (typeof st === 'string' ? st : st.name) === formData.technical.structureType) || !formData.technical.structureType) {
                            setFormData(prev => ({
                              ...prev,
                              technical: {
                                ...prev.technical,
                                structureType: 'Custom Hot-Dip GI Elevated Mounting Structure'
                              }
                            }));
                          }
                        } else {
                          setCustomFields(prev => ({ ...prev, structureType: false }));
                          setFormData(prev => ({
                            ...prev,
                            technical: { ...prev.technical, structureType: e.target.value }
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      {(settings?.equipmentCatalog?.structureTypes && settings.equipmentCatalog.structureTypes.length > 0
                        ? settings.equipmentCatalog.structureTypes
                        : [
                            { id: 'gi-elevated', name: 'Hot-Dip Galvanized Iron (GI) — Elevated 7 to 9 ft Roof Clearance (IS 875 Compliant)' },
                            { id: 'alum-flush', name: 'Anodized High-Strength Aluminum — Non-Elevated Flush Mount' },
                            { id: 'tin-shed', name: 'Industrial Metal Sheet / Klip-Lok Bracket System' },
                            { id: 'mono-slope', name: 'Super-Elevated Heavy Duty High-Clearance Gazebo / Pergola Design' }
                          ]
                      ).map(st => {
                        const name = typeof st === 'string' ? st : st.name;
                        const id = typeof st === 'string' ? st : (st.id || name);
                        return <option key={id} value={name}>{name}</option>;
                      })}
                      <option value="__custom__">Other / Custom Structure System...</option>
                    </select>

                    {customFields.structureType && (
                      <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg animate-in fade-in duration-200">
                        <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Type Custom Structure Specification</label>
                        <input
                          type="text"
                          value={formData.technical.structureType || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            technical: { ...prev.technical, structureType: e.target.value }
                          }))}
                          placeholder="e.g. Hot-Dip Galvanized Iron (80µm) — Custom Elevated 10 ft with Gazebo Walkway"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Generation Metrics Overrides */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-2">Estimated Yield Parameters</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Daily Generation (kWh/day)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.technical.estimatedDailyUnits}
                        onChange={(e) => {
                          const daily = parseFloat(e.target.value) || 0;
                          const annual = Math.round(daily * 365);
                          const savings = Math.round(annual * (formData.technical.tariff || 8.5));
                          setFormData({
                            ...formData,
                            technical: { 
                              ...formData.technical, 
                              estimatedDailyUnits: daily,
                              estimatedAnnualUnits: annual,
                              estimatedAnnualSavings: savings,
                              estimatedMonthlySavings: Math.round(savings / 12)
                            }
                          });
                        }}
                        className="w-full px-2 py-1 text-xs font-semibold rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Annual Yield (kWh/year)</span>
                      <input
                        type="number"
                        step="1"
                        value={formData.technical.estimatedAnnualUnits}
                        onChange={(e) => {
                          const annual = parseInt(e.target.value, 10) || 0;
                          const daily = Number((annual / 365).toFixed(1));
                          const savings = Math.round(annual * (formData.technical.tariff || 8.5));
                          setFormData({
                            ...formData,
                            technical: { 
                              ...formData.technical, 
                              estimatedAnnualUnits: annual,
                              estimatedDailyUnits: daily,
                              estimatedAnnualSavings: savings,
                              estimatedMonthlySavings: Math.round(savings / 12)
                            }
                          });
                        }}
                        className="w-full px-2 py-1 text-xs font-semibold rounded border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Rooftop Area (Sq.Ft)</span>
                      <input
                        type="number"
                        value={formData.technical.roofAreaSqFt}
                        onChange={(e) => setFormData({
                          ...formData,
                          technical: { ...formData.technical, roofAreaSqFt: parseInt(e.target.value, 10) || 0 }
                        })}
                        className="w-full px-2 py-1 text-xs font-semibold rounded border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('customer')}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                  >
                    &larr; Back: Client Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('commercials')}
                    className="px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800"
                  >
                    Next: Pricing & Subsidy &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: PRICING & SUBSIDY */}
            {activeTab === 'commercials' && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      Commercial Pricing, Government Subsidy & Returns (Page 3 Matter)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure turnkey rate per kW, tax slab, central subsidies and discounts.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rate per kW (₹/kWp) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="500"
                        required
                        value={formData.commercials.ratePerKw}
                        onChange={(e) => handleCommercialChange('ratePerKw', e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                      <span className="absolute right-3 top-2 text-xs text-slate-400 font-semibold">₹</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Discount (₹)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={formData.commercials.discount}
                      onChange={(e) => handleCommercialChange('discount', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-800 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      GST Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.commercials.gstRate}
                      onChange={(e) => handleCommercialChange('gstRate', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold text-slate-800 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                    <span className="text-[10px] text-slate-400">13.8% standard composite</span>
                  </div>
                </div>

                {/* Subsidy Configuration */}
                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-solar-orange" />
                      Government Subsidy Scheme & Direct Benefit
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold">
                      Direct DBT to Client Account
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-amber-900">
                          Subsidy Category
                        </label>
                        {customFields.subsidyScheme && (
                          <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1 bg-amber-100/70 px-1.5 py-0.5 rounded border border-amber-300">
                            <Edit3 className="w-2.5 h-2.5" />
                            Custom
                          </span>
                        )}
                      </div>
                      <select
                        value={customFields.subsidyScheme ? '__custom__' : (formData.commercials.subsidyScheme || 'PM Surya Ghar: Muft Bijli Yojana')}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setCustomFields(prev => ({ ...prev, subsidyScheme: true }));
                            setFormData(prev => ({
                              ...prev,
                              commercials: {
                                ...prev.commercials,
                                subsidyScheme: 'Custom Government / State Renewable Subsidy Scheme'
                              }
                            }));
                          } else {
                            setCustomFields(prev => ({ ...prev, subsidyScheme: false }));
                            const scheme = e.target.value;
                            const sub = calculateSubsidy(formData.technical.systemCapacityKw, scheme);
                            setFormData(prev => ({
                              ...prev,
                              commercials: {
                                ...prev.commercials,
                                subsidyScheme: scheme,
                                subsidyAmount: sub
                              }
                            }));
                            handleCommercialChange('subsidyAmount', sub);
                          }
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="PM Surya Ghar: Muft Bijli Yojana">PM Surya Ghar: Muft Bijli Yojana (Central DBT)</option>
                        <option value="Commercial - Accelerated Depreciation (Tax Benefit 40%)">Commercial / Industrial (Tax Benefit)</option>
                        <option value="none">No Subsidy Applicable</option>
                        <option value="__custom__">Other / Custom Subsidy Scheme...</option>
                      </select>

                      {customFields.subsidyScheme && (
                        <div className="mt-1.5 animate-in fade-in duration-200">
                          <input
                            type="text"
                            value={formData.commercials.subsidyScheme || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              commercials: { ...prev.commercials, subsidyScheme: e.target.value }
                            }))}
                            placeholder="Type custom subsidy scheme name..."
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-amber-900 mb-1">
                        Direct Subsidy Amount (₹)
                      </label>
                      <input
                        type="number"
                        step="1000"
                        value={formData.commercials.subsidyAmount}
                        onChange={(e) => handleCommercialChange('subsidyAmount', e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold text-amber-900 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Real-time Calculation Breakdown in Form */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base EPC Cost:</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(formData.commercials.baseCost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST ({formData.commercials.gstRate}%):</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(formData.commercials.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Gross Cost:</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(formData.commercials.totalGrossCost)}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 font-medium">
                    <span>Less Government Subsidy:</span>
                    <span>- {formatCurrency(formData.commercials.subsidyAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-brand-900">
                    <span>Net Effective Customer Investment:</span>
                    <span>{formatCurrency(formData.commercials.netPayable)}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('technical')}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                  >
                    &larr; Back: Technical Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('terms')}
                    className="px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800"
                  >
                    Next: Milestones & Terms &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: MILESTONES & TERMS */}
            {activeTab === 'terms' && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-700" />
                    Payment Milestones, Proposal Validity & Notes
                  </h3>
                  <p className="text-xs text-slate-500">
                    Commercial milestone schedules and customized quotation notes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quotation Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Validity Period (Days)
                    </label>
                    <input
                      type="number"
                      value={formData.validityDays}
                      onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value, 10) || 30 })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quotation Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Sent">Sent to Client</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved / Confirmed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Scope Notes & Commitments (Printed on Proposal)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    placeholder="Enter any custom client scope conditions or inclusions..."
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('commercials')}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                  >
                    &larr; Back: Pricing
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800 shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Quotation & View 5 Pages</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Live Proposal Economics Summary Card */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-subtle sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Live Proposal Metrics
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Auto-Calculated
              </span>
            </div>

            {/* Capacity Highlight */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">System Size</p>
              <p className="text-3xl font-extrabold text-brand-900 tracking-tight mt-0.5">
                {formData.technical.systemCapacityKw} <span className="text-base font-semibold text-slate-600">kWp</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {formData.technical.panelCount} Solar Modules &bull; {formData.technical.panelBrand}
              </p>
            </div>

            {/* Financial Highlights */}
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Gross Project Cost:</span>
                <span className="font-semibold text-slate-800">{formatCurrency(formData.commercials.totalGrossCost)}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100 text-amber-700">
                <span>Government Subsidy:</span>
                <span className="font-bold">- {formatCurrency(formData.commercials.subsidyAmount)}</span>
              </div>

              <div className="p-3 bg-brand-900 text-white rounded-lg">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                  Net Investment
                </span>
                <span className="text-xl font-bold tracking-tight block">
                  {formatCurrency(formData.commercials.netPayable)}
                </span>
                <span className="text-[9px] text-slate-300">Client's actual out-of-pocket</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-emerald-900">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-medium">Est. Annual Savings:</span>
                  <span className="font-bold">{formatCurrency(formData.technical.estimatedAnnualSavings)} / yr</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px]">
                  <span>Capital Payback Period:</span>
                  <span className="font-bold text-emerald-800">{formData.commercials.paybackYears} Years</span>
                </div>
              </div>
            </div>

            {/* 5-Page Overview Pill */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 block mb-2">Proposal Document Structure:</span>
              <ul className="text-[10px] space-y-1.5 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span><strong>Page 1 (Fixed):</strong> Cover & Executive Intro</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-solar-orange" />
                  <span><strong>Page 2 (Dynamic):</strong> System BOM & Technical Spec</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-solar-orange" />
                  <span><strong>Page 3 (Dynamic):</strong> Financials & Milestones</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span><strong>Page 4 (Fixed):</strong> Previous Completed Works</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span><strong>Page 5 (Fixed):</strong> Profile, Bank Details & Terms</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onPreview(formData)}
                className="w-full mt-4 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-brand-700" />
                <span>Open 5-Page A4 Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

