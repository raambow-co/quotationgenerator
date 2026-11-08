import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Printer, 
  Copy, 
  Trash2, 
  FileText, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Sun,
  Shield,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard({ 
  quotations, 
  onNewQuote, 
  onPreviewQuote, 
  onEditQuote, 
  onDuplicateQuote, 
  onDeleteQuote,
  onOpenSettings 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtered quotations
  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = 
      q.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.quotationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.technical?.panelBrand?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate high-level summary KPIs
  const totalKw = quotations.reduce((acc, q) => acc + (parseFloat(q.technical?.systemCapacityKw) || 0), 0);
  const totalValue = quotations.reduce((acc, q) => acc + (parseFloat(q.commercials?.netPayable) || 0), 0);
  const totalAnnualSavings = quotations.reduce((acc, q) => acc + (parseFloat(q.technical?.estimatedAnnualSavings) || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Sent':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Quick Action Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-card">
        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 bottom-0 w-64 h-64 bg-solar-orange/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
              <Sun className="w-3.5 h-3.5 text-solar-warm" />
              <span>Turnkey Solar EPC Proposal Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              Solar Quotation Generator
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Create standardized 5-page techno-commercial solar proposals with automated system engineering, Bill of Quantities, PM Surya Ghar subsidy calculations, and completed works portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onNewQuote}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-solar-orange" />
              <span>Generate New Quotation</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <span>Manage Pricing & Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Quotes */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Proposals</span>
            <FileText className="w-4 h-4 text-brand-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {quotations.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Active in database
          </p>
        </div>

        {/* Proposed Capacity */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Proposed Capacity</span>
            <Zap className="w-4 h-4 text-solar-orange" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {totalKw.toFixed(1)} <span className="text-sm font-semibold text-slate-500">kWp</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Clean rooftop solar
          </p>
        </div>

        {/* Total Pipeline Net Value */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Pipeline Net Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {formatCurrency(totalValue)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Net payable by customers
          </p>
        </div>

        {/* Customer Annual Savings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Client Bill Savings</span>
            <Sun className="w-4 h-4 text-solar-warm" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {formatCurrency(totalAnnualSavings)} <span className="text-xs font-semibold text-slate-500">/yr</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Projected annual reduction
          </p>
        </div>
      </div>

      {/* Main Content Area: Recent Quotations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        {/* Table Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Solar Quotations</h2>
            <p className="text-xs text-slate-500">Manage, preview, print or edit your 5-page customer proposals</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search client, quote #, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-56 sm:w-64"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Sent">Sent</option>
                <option value="Draft">Draft</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quotations Table */}
        <div className="overflow-x-auto">
          {filteredQuotations.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Quotation Ref & Date</th>
                  <th className="py-3 px-4">Customer & Location</th>
                  <th className="py-3 px-4">System Spec</th>
                  <th className="py-3 px-4">Commercials & Subsidy</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Ref & Date */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-brand-900 block">{q.quotationNumber}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{formatDate(q.date)}</span>
                    </td>

                    {/* Customer & Location */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{q.customer?.name || 'Customer'}</span>
                      {q.customer?.companyName && (
                        <span className="text-[11px] text-slate-500 block">{q.customer.companyName}</span>
                      )}
                      <span className="text-[10px] text-slate-400 truncate max-w-xs block mt-0.5">
                        {q.customer?.location || 'Hyderabad, TS'}
                      </span>
                    </td>

                    {/* System Spec */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {q.technical?.actualDcCapacityKw || q.technical?.systemCapacityKw || 5.5} kWp DC
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({q.technical?.panelCount || 10} panels)
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-700 font-medium block mt-0.5">
                        {q.technical?.panelBrand} &bull; {q.technical?.inverterBrand}
                      </span>
                    </td>

                    {/* Commercials */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block text-sm">
                        {formatCurrency(q.commercials?.netPayable)}
                      </span>
                      {q.commercials?.subsidyAmount > 0 ? (
                        <span className="inline-block text-[10px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 mt-0.5">
                          Subsidy: {formatCurrency(q.commercials.subsidyAmount)}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Gross: {formatCurrency(q.commercials?.totalGrossCost)}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(q.status)}`}>
                        {q.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onPreviewQuote(q)}
                          className="p-1.5 rounded-lg text-brand-900 hover:bg-brand-50 border border-slate-200 transition-colors"
                          title="Preview 5-Page A4 Proposal"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onEditQuote(q)}
                          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                          title="Edit Quotation Data"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDuplicateQuote(q)}
                          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                          title="Duplicate as New Proposal"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteQuote(q.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                          title="Delete Quotation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">No solar quotations found</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search filters or generate a new proposal.</p>
              <button
                onClick={onNewQuote}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-900 text-white rounded-lg text-xs font-bold hover:bg-brand-800 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Quotation</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Structure Guide Banner */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-200 text-brand-900">
            <Layers className="w-5 h-5 text-solar-orange" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              5-Page Standardized Solar Proposal Structure
            </h4>
            <p className="text-xs text-slate-500">
              Page 1 (Fixed Cover) &bull; Page 2 (Dynamic Specs & BOM) &bull; Page 3 (Dynamic Financials & Subsidy) &bull; Page 4 (Fixed Portfolio) &bull; Page 5 (Fixed Company Profile & Bank)
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="text-xs font-bold text-brand-900 hover:text-brand-700 flex items-center gap-1 shrink-0"
        >
          <span>Configure Defaults</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

