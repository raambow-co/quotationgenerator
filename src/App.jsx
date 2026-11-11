import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuotationForm from './components/QuotationForm';
import QuotationPreview from './components/QuotationPreview';
import SettingsView from './components/SettingsView';
import { sampleQuotations } from './data/sampleQuotations';
import { defaultSettings } from './data/defaultSettings';
import { generateQuotationNumber } from './utils/formatters';
import { 
  Sun, 
  FileText, 
  Plus, 
  Settings as SettingsIcon, 
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const STORAGE_KEY_QUOTES = 'jayarams_solar_quotations_v1';
const STORAGE_KEY_SETTINGS = 'jayarams_solar_settings_v1';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 bg-white rounded-xl border border-slate-200 shadow-subtle text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Something went wrong while rendering</h2>
          <p className="text-xs text-slate-500 mt-1">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="mt-4 px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'form', 'preview', 'settings'
  const [currentQuotation, setCurrentQuotation] = useState(null);

  // Load Quotations from LocalStorage or Fallback to Samples
  const [quotations, setQuotations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUOTES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading quotations from storage:', e);
    }
    return sampleQuotations;
  });

  // Load Settings from LocalStorage or Fallback to Defaults (with Deep Merge)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with defaultSettings to ensure all newly configurable keys are available
        return {
          ...defaultSettings,
          ...parsed,
          company: { ...defaultSettings.company, ...(parsed.company || {}) },
          qrPortals: { ...defaultSettings.qrPortals, ...(parsed.qrPortals || {}) },
          coverPage: { ...defaultSettings.coverPage, ...(parsed.coverPage || {}) },
          pricing: { ...defaultSettings.pricing, ...(parsed.pricing || {}) },
          equipmentCatalog: {
            ...defaultSettings.equipmentCatalog,
            ...(parsed.equipmentCatalog || {}),
            panelBrands: (Array.isArray(parsed.equipmentCatalog?.panelBrands) && parsed.equipmentCatalog.panelBrands.length > 0)
              ? parsed.equipmentCatalog.panelBrands
              : defaultSettings.equipmentCatalog.panelBrands,
            inverterBrands: (Array.isArray(parsed.equipmentCatalog?.inverterBrands) && parsed.equipmentCatalog.inverterBrands.length > 0)
              ? parsed.equipmentCatalog.inverterBrands
              : defaultSettings.equipmentCatalog.inverterBrands,
            structureTypes: (Array.isArray(parsed.equipmentCatalog?.structureTypes) && parsed.equipmentCatalog.structureTypes.length > 0)
              ? parsed.equipmentCatalog.structureTypes
              : defaultSettings.equipmentCatalog.structureTypes,
            structureSpecs: { ...defaultSettings.equipmentCatalog.structureSpecs, ...(parsed.equipmentCatalog?.structureSpecs || {}) },
            electricalSpecs: { ...defaultSettings.equipmentCatalog.electricalSpecs, ...(parsed.equipmentCatalog?.electricalSpecs || {}) }
          },
          warranties: { ...defaultSettings.warranties, ...(parsed.warranties || {}) },
          paymentMilestones: (Array.isArray(parsed.paymentMilestones) && parsed.paymentMilestones.length > 0)
            ? parsed.paymentMilestones
            : defaultSettings.paymentMilestones,
          authorization: { ...defaultSettings.authorization, ...(parsed.authorization || {}) },
          omAssurance: { ...defaultSettings.omAssurance, ...(parsed.omAssurance || {}) },
          portfolioWorks: {
            ...defaultSettings.portfolioWorks,
            ...(parsed.portfolioWorks || {}),
            metrics: { ...defaultSettings.portfolioWorks.metrics, ...(parsed.portfolioWorks?.metrics || {}) },
            projects: (Array.isArray(parsed.portfolioWorks?.projects) && parsed.portfolioWorks.projects.length > 0)
              ? parsed.portfolioWorks.projects
              : defaultSettings.portfolioWorks.projects,
            fieldShowcasePhotos: (Array.isArray(parsed.portfolioWorks?.fieldShowcasePhotos) && parsed.portfolioWorks.fieldShowcasePhotos.length > 0)
              ? parsed.portfolioWorks.fieldShowcasePhotos
              : defaultSettings.portfolioWorks.fieldShowcasePhotos
          },
          executionRoadmap: (Array.isArray(parsed.executionRoadmap) && parsed.executionRoadmap.length > 0)
            ? parsed.executionRoadmap
            : defaultSettings.executionRoadmap,
          scopeOfWorkMatrix: (Array.isArray(parsed.scopeOfWorkMatrix) && parsed.scopeOfWorkMatrix.length > 0)
            ? parsed.scopeOfWorkMatrix
            : defaultSettings.scopeOfWorkMatrix
        };
      }
    } catch (e) {
      console.error('Error loading settings from storage:', e);
    }
    return defaultSettings;
  });

  // Persist Quotations
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotations));
    } catch (e) {
      console.error('Failed to save quotations:', e);
    }
  }, [quotations]);

  // Persist Settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  // Handlers
  const handleNewQuote = () => {
    setCurrentQuotation(null);
    setView('form');
  };

  const handleEditQuote = (quote) => {
    setCurrentQuotation(quote);
    setView('form');
  };

  const handlePreviewQuote = (quote) => {
    setCurrentQuotation(quote);
    setView('preview');
  };

  const handleDuplicateQuote = (quote) => {
    const cloned = {
      ...JSON.parse(JSON.stringify(quote)),
      id: `quote-${Date.now()}`,
      quotationNumber: generateQuotationNumber(),
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      customer: {
        ...quote.customer,
        name: `${quote.customer.name} (Copy)`
      }
    };
    setQuotations(prev => [cloned, ...prev]);
  };

  const handleDeleteQuote = (quoteId) => {
    if (window.confirm('Are you sure you want to delete this solar quotation?')) {
      setQuotations(prev => prev.filter(q => q.id !== quoteId));
      if (currentQuotation?.id === quoteId) {
        setCurrentQuotation(null);
        setView('dashboard');
      }
    }
  };

  const handleSaveQuote = (savedData) => {
    setQuotations(prev => {
      const exists = prev.some(q => q.id === savedData.id);
      if (exists) {
        return prev.map(q => q.id === savedData.id ? savedData : q);
      } else {
        return [savedData, ...prev];
      }
    });
    setCurrentQuotation(savedData);
    setView('preview');
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset all pricing and company settings to Jayarams default values?')) {
      setSettings(defaultSettings);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Global Navigation Header (Hidden when printing) */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('dashboard')}
              className="flex items-center gap-3 text-left group"
            >
              <img 
                src="/jayarams-logo-lockup.png" 
                alt="JAYARAMS" 
                className="h-10 sm:h-11 object-contain transition-transform group-hover:scale-[1.02]"
              />
            </button>
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <div className="hidden md:block">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Turnkey Solar EPC Solutions
              </span>
              <span className="text-xs font-bold text-slate-700">
                Quotation Generator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('dashboard')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'dashboard'
                  ? 'bg-brand-50 text-brand-900 border border-brand-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={handleNewQuote}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'form'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-brand-900 text-white hover:bg-brand-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Quotation</span>
            </button>

            <button
              onClick={() => setView('settings')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'settings'
                  ? 'bg-brand-50 text-brand-900 border border-brand-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Settings & Pricing Defaults"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1">
        <ErrorBoundary onReset={() => setView('dashboard')}>
          {view === 'dashboard' && (
            <Dashboard
              quotations={quotations}
              onNewQuote={handleNewQuote}
              onPreviewQuote={handlePreviewQuote}
              onEditQuote={handleEditQuote}
              onDuplicateQuote={handleDuplicateQuote}
              onDeleteQuote={handleDeleteQuote}
              onOpenSettings={() => setView('settings')}
            />
          )}

          {view === 'form' && (
            <QuotationForm
              initialData={currentQuotation}
              settings={settings}
              onSave={handleSaveQuote}
              onCancel={() => setView('dashboard')}
              onPreview={(data) => {
                setCurrentQuotation(data);
                setView('preview');
              }}
            />
          )}

          {view === 'preview' && (
            <QuotationPreview
              quotation={currentQuotation || quotations?.[0] || sampleQuotations?.[0]}
              settings={settings}
              onBack={() => setView('dashboard')}
              onEdit={(q) => {
                setCurrentQuotation(q);
                setView('form');
              }}
            />
          )}

          {view === 'settings' && (
            <SettingsView
              currentSettings={settings}
              onSaveSettings={handleSaveSettings}
              onResetDefaults={handleResetSettings}
              onBack={() => setView('dashboard')}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Global Minimal Footer (Hidden when printing or in preview) */}
      {view !== 'preview' && (
        <footer className="no-print bg-white border-t border-slate-200 py-4 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">JAYARAMS SOLAR SOLUTIONS</span>
              <span>&bull;</span>
              <span>Built on Trust. Driven by Excellence.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>5-Page Standardized A4 Export</span>
              <span>&bull;</span>
              <span>MNRE Subsidy Compatible</span>
              <span>&bull;</span>
              <span>Direct A4 Print Ready</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

