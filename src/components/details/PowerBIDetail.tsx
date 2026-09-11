import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Layout,
  Grid,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Calendar,
  User,
  Calculator,
  Network,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * Page 1: Data Understanding - COMMAND CENTER DASHBOARD
 * (Power BI Semantic Model & Report Deep Inspection)
 *
 * Modeled after tb-bi migration-wizard Page1DataUnderstanding:
 * - Executive summary KPI bar (Report Pages, Visuals, Semantic Tables, DAX Measures)
 * - Report Pages / Visuals card with fields, measures, and visual containers
 * - DAX Measures card with DAX formula inspector and page filter sync
 * - Full-width Semantic Model Tables card with live multi-row preview & relationships
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

interface PageDetail {
  id: string;
  name: string;
  visualType: string;
  dimensions: string[];
  measures: { name: string; type: 'explicit' | 'implicit' }[];
  visualSlots: {
    values: string;
    axes: string;
  };
}

interface DAXMeasureDetail {
  id: string;
  name: string;
  expression: string;
  homeTable: string;
  formatString: string;
  usedInPages: string[];
}

interface SemanticTableDetail {
  tableName: string;
  displayName: string;
  rowCount: number;
  source: string;
  relationships: string[];
  columns: { name: string; type: string }[];
  sampleRows: Record<string, string | number | boolean>[];
}

function getPowerBIMetadata(_assetName: string) {
  const summary = {
    totalPages: 4,
    totalVisuals: 10,
    totalTables: 5,
    totalDAXMeasures: 8,
  };

  const pages: PageDetail[] = [
    {
      id: 'pg1',
      name: 'Executive KPI Summary',
      visualType: 'Card / Clustered Bar',
      dimensions: ['Calendar[Quarter]', 'Policy[Line of Business]'],
      measures: [
        { name: 'Total Earned Premium', type: 'explicit' },
        { name: 'Loss Ratio %', type: 'explicit' },
        { name: 'Active Incurred Claims', type: 'explicit' },
      ],
      visualSlots: {
        values: '[Total Earned Premium], [Loss Ratio %]',
        axes: 'Axis: Calendar[Quarter], Legend: Policy[Line of Business]',
      },
    },
    {
      id: 'pg2',
      name: 'Claims Frequency & Severity',
      visualType: 'Line and Stacked Column',
      dimensions: ['Calendar[Month Year]', 'Claims[Claim Type]'],
      measures: [
        { name: 'Claims Count MTD', type: 'explicit' },
        { name: 'Avg Claim Severity', type: 'explicit' },
      ],
      visualSlots: {
        values: 'Column: [Claims Count MTD], Line: [Avg Claim Severity]',
        axes: 'Shared Axis: Calendar[Month Year]',
      },
    },
    {
      id: 'pg3',
      name: 'Underwriting Performance Matrix',
      visualType: 'Matrix Table',
      dimensions: ['Geography[Region]', 'Policy[Underwriter]', 'Policy[Class Code]'],
      measures: [
        { name: 'Total Written Premium', type: 'explicit' },
        { name: 'Combined Ratio', type: 'explicit' },
        { name: 'YoY Premium Growth', type: 'explicit' },
      ],
      visualSlots: {
        values: '[Total Written Premium], [Combined Ratio], [YoY Premium Growth]',
        axes: 'Rows: Geography[Region] > Underwriter, Columns: Calendar[Year]',
      },
    },
    {
      id: 'pg4',
      name: 'Regional Exposure Geographic View',
      visualType: 'Azure Map / Filled Map',
      dimensions: ['Geography[State]', 'Geography[County]'],
      measures: [
        { name: 'Total Insured Value (TIV)', type: 'explicit' },
        { name: 'Loss Ratio %', type: 'explicit' },
      ],
      visualSlots: {
        values: 'Bubble Size: [Total Insured Value (TIV)], Color: [Loss Ratio %]',
        axes: 'Location: Geography[State]',
      },
    },
  ];

  const daxMeasures: DAXMeasureDetail[] = [
    {
      id: 'dax1',
      name: 'Loss Ratio %',
      expression: 'DIVIDE(\n  [Total Incurred Losses],\n  [Total Earned Premium],\n  0\n)',
      homeTable: 'Measures Table',
      formatString: '0.0%',
      usedInPages: ['Executive KPI Summary', 'Regional Exposure Geographic View'],
    },
    {
      id: 'dax2',
      name: 'Total Earned Premium',
      expression: 'SUMX(\n  Policy,\n  Policy[Written Premium] * Policy[Earning Factor]\n)',
      homeTable: 'Policy',
      formatString: '$#,##0',
      usedInPages: ['Executive KPI Summary'],
    },
    {
      id: 'dax3',
      name: 'Claims Count MTD',
      expression: 'CALCULATE(\n  COUNTROWS( Claims ),\n  DATESMTD( Calendar[Date] )\n)',
      homeTable: 'Claims',
      formatString: '#,##0',
      usedInPages: ['Claims Frequency & Severity'],
    },
    {
      id: 'dax4',
      name: 'Avg Claim Severity',
      expression: 'AVERAGEX(\n  Claims,\n  Claims[Claim Amount]\n)',
      homeTable: 'Claims',
      formatString: '$#,##0',
      usedInPages: ['Claims Frequency & Severity'],
    },
    {
      id: 'dax5',
      name: 'YoY Premium Growth',
      expression: 'VAR CurrentYear = [Total Earned Premium]\nVAR PriorYear =\n  CALCULATE(\n    [Total Earned Premium],\n    SAMEPERIODLASTYEAR( Calendar[Date] )\n  )\nRETURN\n  DIVIDE( CurrentYear - PriorYear, PriorYear, 0 )',
      homeTable: 'Measures Table',
      formatString: '+0.0%;-0.0%;0.0%',
      usedInPages: ['Underwriting Performance Matrix'],
    },
    {
      id: 'dax6',
      name: 'Combined Ratio',
      expression: '[Loss Ratio %] + DIVIDE([Underwriting Expenses], [Total Earned Premium], 0)',
      homeTable: 'Measures Table',
      formatString: '0.0%',
      usedInPages: ['Underwriting Performance Matrix'],
    },
    {
      id: 'dax7',
      name: 'Active Incurred Claims',
      expression: 'CALCULATE(\n  COUNT( Claims[Claim ID] ),\n  Claims[Status] IN { "Open", "Under Investigation", "In Review" }\n)',
      homeTable: 'Claims',
      formatString: '#,##0',
      usedInPages: ['Executive KPI Summary'],
    },
    {
      id: 'dax8',
      name: 'Total Insured Value (TIV)',
      expression: 'SUM( Policy[Building TIV] ) + SUM( Policy[Contents TIV] )',
      homeTable: 'Policy',
      formatString: '$#,##0',
      usedInPages: ['Regional Exposure Geographic View'],
    },
  ];

  const tables: SemanticTableDetail[] = [
    {
      tableName: 'Policy',
      displayName: 'Policy (Core Fact)',
      rowCount: 2450000,
      source: 'Azure SQL Database',
      relationships: ['Claims (1:N on PolicyID)', 'Customer (N:1 on CustID)', 'Calendar (N:1 on EffectiveDate)'],
      columns: [
        { name: 'PolicyID', type: 'Int64' },
        { name: 'PolicyNumber', type: 'String' },
        { name: 'LineOfBusiness', type: 'String' },
        { name: 'EffectiveDate', type: 'DateTime' },
        { name: 'WrittenPremium', type: 'Decimal' },
        { name: 'Status', type: 'String' },
      ],
      sampleRows: [
        { PolicyID: 104281, PolicyNumber: 'POL-COM-001', LineOfBusiness: 'Commercial Property', EffectiveDate: '2025-06-01', WrittenPremium: 48500.0, Status: 'In Force' },
        { PolicyID: 104282, PolicyNumber: 'POL-AUTO-094', LineOfBusiness: 'Commercial Auto', EffectiveDate: '2025-07-15', WrittenPremium: 112000.0, Status: 'In Force' },
        { PolicyID: 104283, PolicyNumber: 'POL-GL-201', LineOfBusiness: 'General Liability', EffectiveDate: '2025-08-01', WrittenPremium: 29000.0, Status: 'Renewed' },
        { PolicyID: 104284, PolicyNumber: 'POL-WC-552', LineOfBusiness: 'Workers Comp', EffectiveDate: '2025-08-12', WrittenPremium: 76400.0, Status: 'In Force' },
        { PolicyID: 104285, PolicyNumber: 'POL-CYB-108', LineOfBusiness: 'Cyber Risk', EffectiveDate: '2025-09-01', WrittenPremium: 34200.0, Status: 'In Force' },
      ],
    },
    {
      tableName: 'Claims',
      displayName: 'Claims (Loss Transactions)',
      rowCount: 890000,
      source: 'Snowflake Data Warehouse',
      relationships: ['Policy (N:1 on PolicyID)', 'Calendar (N:1 on LossDate)'],
      columns: [
        { name: 'ClaimID', type: 'Int64' },
        { name: 'PolicyID', type: 'Int64' },
        { name: 'ClaimAmount', type: 'Decimal' },
        { name: 'LossDate', type: 'DateTime' },
        { name: 'ClaimType', type: 'String' },
        { name: 'Status', type: 'String' },
      ],
      sampleRows: [
        { ClaimID: 80112, PolicyID: 104281, ClaimAmount: 18450.0, LossDate: '2025-11-04', ClaimType: 'Water Damage', Status: 'Closed' },
        { ClaimID: 80113, PolicyID: 104282, ClaimAmount: 64200.0, LossDate: '2025-12-14', ClaimType: 'Collision', Status: 'Open' },
        { ClaimID: 80114, PolicyID: 104284, ClaimAmount: 9200.0, LossDate: '2026-01-09', ClaimType: 'Medical Only', Status: 'Closed' },
        { ClaimID: 80115, PolicyID: 104285, ClaimAmount: 145000.0, LossDate: '2026-01-20', ClaimType: 'Ransomware Interruption', Status: 'Under Investigation' },
        { ClaimID: 80116, PolicyID: 104283, ClaimAmount: 32100.0, LossDate: '2026-02-02', ClaimType: 'Slip and Fall', Status: 'In Review' },
      ],
    },
    {
      tableName: 'Calendar',
      displayName: 'Calendar (Time Dimension)',
      rowCount: 3650,
      source: 'DAX Generated Table',
      relationships: ['Policy[EffectiveDate] (1:N)', 'Claims[LossDate] (1:N)'],
      columns: [
        { name: 'Date', type: 'DateTime' },
        { name: 'Year', type: 'Int64' },
        { name: 'Quarter', type: 'String' },
        { name: 'MonthYear', type: 'String' },
        { name: 'IsCurrentYear', type: 'Boolean' },
      ],
      sampleRows: [
        { Date: '2025-01-01', Year: 2025, Quarter: 'Q1', MonthYear: 'Jan 2025', IsCurrentYear: false },
        { Date: '2025-04-01', Year: 2025, Quarter: 'Q2', MonthYear: 'Apr 2025', IsCurrentYear: false },
        { Date: '2025-07-01', Year: 2025, Quarter: 'Q3', MonthYear: 'Jul 2025', IsCurrentYear: false },
        { Date: '2025-10-01', Year: 2025, Quarter: 'Q4', MonthYear: 'Oct 2025', IsCurrentYear: false },
        { Date: '2026-01-01', Year: 2026, Quarter: 'Q1', MonthYear: 'Jan 2026', IsCurrentYear: true },
      ],
    },
    {
      tableName: 'Geography',
      displayName: 'Geography (Territory Dimension)',
      rowCount: 52,
      source: 'Azure Blob Storage / CSV',
      relationships: ['Policy[StateCode] (1:N)'],
      columns: [
        { name: 'StateCode', type: 'String' },
        { name: 'State', type: 'String' },
        { name: 'Region', type: 'String' },
        { name: 'CatastropheRiskTier', type: 'String' },
      ],
      sampleRows: [
        { StateCode: 'CA', State: 'California', Region: 'West Coast', CatastropheRiskTier: 'Tier 1 (Wildfire / Earthquake)' },
        { StateCode: 'TX', State: 'Texas', Region: 'South Central', CatastropheRiskTier: 'Tier 1 (Hail / Windstorm)' },
        { StateCode: 'FL', State: 'Florida', Region: 'Southeast', CatastropheRiskTier: 'Tier 1 (Hurricane)' },
        { StateCode: 'NY', State: 'New York', Region: 'Northeast', CatastropheRiskTier: 'Tier 3 (Standard)' },
        { StateCode: 'IL', State: 'Illinois', Region: 'Midwest', CatastropheRiskTier: 'Tier 2 (Severe Convective Storm)' },
      ],
    },
  ];

  return { summary, pages, daxMeasures, tables };
}

export default function PowerBIDetail({ asset, onBack }: Props) {
  const metadata = useMemo(() => getPowerBIMetadata(asset.name), [asset.name]);

  const [pageSearch, setPageSearch] = useState('');
  const [measureSearch, setMeasureSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  const [selectedPage, setSelectedPage] = useState<PageDetail | null>(null);
  const [expandedFormulas, setExpandedFormulas] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFormula = (id: string) => {
    setExpandedFormulas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter pages
  const filteredPages = useMemo(() => {
    if (!pageSearch.trim()) return metadata.pages;
    const q = pageSearch.toLowerCase();
    return metadata.pages.filter(
      (pg) =>
        pg.name.toLowerCase().includes(q) ||
        pg.visualType.toLowerCase().includes(q) ||
        pg.dimensions.some((d) => d.toLowerCase().includes(q))
    );
  }, [metadata.pages, pageSearch]);

  // Filter measures
  const filteredMeasures = useMemo(() => {
    let list = metadata.daxMeasures;

    if (selectedPage) {
      list = list.filter((m) => m.usedInPages.includes(selectedPage.name));
    }

    if (measureSearch.trim()) {
      const q = measureSearch.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.expression.toLowerCase().includes(q) ||
          m.homeTable.toLowerCase().includes(q)
      );
    }

    return list;
  }, [metadata.daxMeasures, selectedPage, measureSearch]);

  // Filter tables
  const filteredTables = useMemo(() => {
    if (!tableSearch.trim()) return metadata.tables;
    const q = tableSearch.toLowerCase();
    return metadata.tables.filter(
      (t) =>
        t.displayName.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q) ||
        t.columns.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [metadata.tables, tableSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 pb-12"
    >
      {/* ── Header ── */}
      <div
        className="rounded-2xl border p-6 theme-transition shadow-sm"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={onBack}
              className="p-2.5 rounded-xl border cursor-pointer hover:scale-105 active:scale-95 transition-all mt-0.5 shrink-0"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
              title="Back to Asset Discovery"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0 border"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <img
                  src={TECHNOLOGY_LOGOS['Power BI']}
                  alt="Power BI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {asset.name}
                  </h1>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(242, 200, 17, 0.15)',
                      borderColor: 'rgba(242, 200, 17, 0.4)',
                      color: '#B48400',
                    }}
                  >
                    Power BI Report & Semantic Model
                  </span>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-subtle)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {asset.businessArea}
                  </span>
                </div>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Source Dashboard Exploration — Complete inspection of report pages, DAX measures, and data model tables
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {asset.owner || 'Author: Rachel Davies'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Last Refresh: Today, 04:30 AM
                  </span>
                  <span>•</span>
                  <span>Storage: Import Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Executive Summary Bar (4 KPI Cards from Page 1 Command Center) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Report Pages Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Layout className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalPages}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Report Pages
            </div>
          </div>
        </div>

        {/* Visuals Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Grid className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalVisuals}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Visual Containers
            </div>
          </div>
        </div>

        {/* Semantic Model Tables Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalTables}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Semantic Model Tables
            </div>
          </div>
        </div>

        {/* DAX Measures Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalDAXMeasures}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              DAX Calculated Measures
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-Column Grid Layout: Pages/Visuals & DAX Measures ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Pages & Visuals Card */}
        <div
          className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
          style={{
            height: '470px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {/* Card Header */}
          <div
            className="p-4 border-b shrink-0"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Grid className="w-5 h-5 text-blue-500" />
                Report Pages & Visuals ({filteredPages.length})
              </h2>
              <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                Click page to filter DAX
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search report pages or visual types..."
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of Pages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredPages.map((pg) => {
              const isSelected = selectedPage?.id === pg.id;
              return (
                <div
                  key={pg.id}
                  className="rounded-xl border transition-all cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: isSelected
                      ? 'color-mix(in srgb, #3B82F6 10%, var(--color-bg-elevated))'
                      : 'var(--color-surface)',
                    borderColor: isSelected ? '#3B82F6' : 'var(--color-border-subtle)',
                    boxShadow: isSelected ? '0 0 0 1px #3B82F6' : 'none',
                  }}
                  onClick={() => setSelectedPage(isSelected ? null : pg)}
                >
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {pg.name}
                        </h3>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                          style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            borderColor: 'rgba(59, 130, 246, 0.25)',
                            color: '#3B82F6',
                          }}
                        >
                          {pg.visualType}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        {pg.dimensions.length} Fields • {pg.measures.length} DAX Measures
                      </p>
                    </div>
                    <div className="shrink-0 text-blue-500">
                      {isSelected ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isSelected && (
                    <div
                      className="px-3.5 pb-3.5 pt-2 border-t text-xs space-y-2.5"
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {/* Fields list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Referenced Columns
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {pg.dimensions.map((d, i) => (
                              <div key={i} className="truncate pl-1.5 border-l-2 border-amber-400 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                {d}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Measures list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Explicit DAX Measures
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {pg.measures.map((m, i) => (
                              <div key={i} className="truncate pl-1.5 border-l-2 border-emerald-500 text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                [{m.name}] ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Visual Slots */}
                      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          Visual Bindings
                        </span>
                        <div className="p-2 rounded border space-y-1 text-[11px]" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                          <div>
                            <span className="font-bold text-[9px] uppercase text-gray-400">Values: </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{pg.visualSlots.values}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[9px] uppercase text-gray-400">Axes/Slices: </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{pg.visualSlots.axes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: DAX Measures Card */}
        <div
          className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
          style={{
            height: '470px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {/* Card Header */}
          <div
            className="p-4 border-b shrink-0"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Calculator className="w-5 h-5 text-emerald-500" />
                DAX Measures ({filteredMeasures.length})
              </h2>
              {selectedPage && (
                <div
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px]"
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#3B82F6',
                  }}
                >
                  <span>Filtered by: {selectedPage.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPage(null)}
                    className="font-bold cursor-pointer hover:opacity-75"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search DAX measures or syntax..."
                value={measureSearch}
                onChange={(e) => setMeasureSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of DAX Measures */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredMeasures.map((m) => {
              const isExpanded = expandedFormulas.has(m.id);
              const isCopied = copiedId === m.id;
              return (
                <div
                  key={m.id}
                  className="rounded-xl border overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: isExpanded ? '#10B981' : 'var(--color-border-subtle)',
                  }}
                >
                  <div
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-opacity-80"
                    onClick={() => toggleFormula(m.id)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          [{m.name}]
                        </h3>
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                          {m.homeTable}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Format: {m.formatString}
                        </span>
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        Bound in {m.usedInPages.length} report page{m.usedInPages.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded DAX Formula Box */}
                  {isExpanded && (
                    <div
                      className="px-3.5 py-3 border-t text-xs space-y-2"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                          DAX Calculation Formula
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyFormula(m.expression, m.id);
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold cursor-pointer hover:opacity-80 px-2 py-0.5 rounded border"
                          style={{
                            borderColor: 'var(--color-border-primary)',
                            color: isCopied ? '#22C55E' : 'var(--color-text-secondary)',
                          }}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Copied' : 'Copy DAX'}</span>
                        </button>
                      </div>
                      <pre
                        className="p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto border"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border-primary)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <code>{m.expression}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full-Width Data Tables Card ── */}
      <div
        className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        {/* Card Header */}
        <div
          className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0"
          style={{ borderColor: 'var(--color-border-primary)' }}
        >
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-500" />
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Semantic Model Tables & Schema Preview ({filteredTables.length})
            </h2>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search model tables or columns..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Card Body - List of Tables with Live Data Previews */}
        <div className="p-4 space-y-4 max-h-[560px] overflow-y-auto">
          {filteredTables.map((tbl) => (
            <div
              key={tbl.tableName}
              className="rounded-xl border overflow-hidden shadow-xs"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              {/* Table Meta Bar */}
              <div
                className="px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <h3 className="font-bold text-xs" style={{ color: 'var(--color-text-primary)' }}>
                    {tbl.displayName}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">({tbl.source})</span>
                </div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{tbl.rowCount.toLocaleString()}</strong> rows ×{' '}
                  <strong style={{ color: 'var(--color-text-primary)' }}>{tbl.columns.length}</strong> columns
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className="border-b"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      {tbl.columns.map((col, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <div>{col.name}</div>
                          <span className="text-[9px] font-mono text-gray-400 font-normal">
                            {col.type}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    {tbl.sampleRows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: rowIdx % 2 === 0 ? 'transparent' : 'var(--color-bg-tertiary)' }}
                      >
                        {tbl.columns.map((col, colIdx) => (
                          <td
                            key={colIdx}
                            className="px-4 py-2 whitespace-nowrap font-mono text-[11px]"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {row[col.name] !== undefined && row[col.name] !== null
                              ? String(row[col.name])
                              : <span className="text-gray-400 italic">null</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Relationships Footer */}
              <div
                className="px-4 py-2.5 border-t text-[11px] flex flex-wrap items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Network size={12} className="text-blue-500" />
                  <span className="font-semibold text-gray-400">Relationships:</span>
                  {tbl.relationships.map((rel, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-1.5 py-0.5 rounded border text-[10px] font-mono"
                      style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                    >
                      {rel}
                    </span>
                  ))}
                </div>
                <div>Showing 5 of {tbl.rowCount.toLocaleString()} sample rows</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
