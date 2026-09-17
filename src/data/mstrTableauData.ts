/* ─────────────────────────────────────────────────────────
 * mstrTableauData.ts — Static data matching the ms-tb
 * frontend's exact data shapes for Objects, LogicExplorer,
 * and ExportCenter pages.
 * ───────────────────────────────────────────────────────── */

// ── Job Summary (mirrors api.Job + JobValidationSummary) ──

export const mstrJobSummary = {
  id: 'job-mstr-001',
  name: 'P&C Claims Dossier Migration',
  status: 'completed',
  mstrProjectName: 'Insurance Analytics',
  mstrVersion: '2021 Update 9',
  objectsTotal: 48,
  objectsProcessed: 48,
  objectsSucceeded: 45,
  objectsFailed: 1,
  objectsSkipped: 2,
  securityConfidence: 100,
  financialKpiConfidence: 97,
  structuralConfidence: 98,
  visualConfidence: 95,
  securityParity: true,
  blockerIssues: 0,
  mandatoryReviewFlags: 2,
  autoPublishOk: true,
  durationSeconds: 127,
};

// ── MigrationObject (mirrors api.MigrationObject) ──

export interface MstrMigrationObject {
  id: string;
  name: string;
  type_name: 'dossier' | 'cube' | 'attribute' | 'metric';
  status: string;
  confidence: number;
  translation_method?: string;
  expression_text?: string;
  tableau_calc?: string;
  tableau_field_name?: string;
  definition_chain?: { name: string; formula: string }[];
  dependencies?: string[];
  mstr_path?: string;
  mstr_definition?: Record<string, any>;
}

export const mstrObjects: MstrMigrationObject[] = [
  // ── Dossiers ──
  {
    id: 'obj-d1',
    name: 'P&C Claims Executive Dashboard',
    type_name: 'dossier',
    status: 'valid',
    confidence: 0.98,
    mstr_path: '/Insurance Analytics/Dashboards',
    mstr_definition: {
      chapters: [
        { name: 'Overview', pages: [{ name: 'Claims Summary' }, { name: 'KPI Overview' }] },
        { name: 'Details', pages: [{ name: 'Regional Breakdown' }, { name: 'Adjuster Performance' }] },
        { name: 'Trends', pages: [{ name: 'Monthly Trends' }] },
      ],
    },
  },
  // ── Cube ──
  {
    id: 'obj-c1',
    name: 'Claims',
    type_name: 'cube',
    status: 'valid',
    confidence: 1.0,
    mstr_path: '/Insurance Analytics/Cubes',
  },
  // ── Attributes ──
  { id: 'obj-a1', name: 'Claim ID', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a2', name: 'Policy ID', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a3', name: 'Line of Business', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a4', name: 'Coverage', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a5', name: 'Loss Cause', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a6', name: 'Claim Status', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a7', name: 'State Name', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a8', name: 'Region State', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a9', name: 'Adjuster Name', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a10', name: 'Litigation', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a11', name: 'Loss Date', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  { id: 'obj-a12', name: 'Reported Date', type_name: 'attribute', status: 'valid', confidence: 1.0 },
  // ── Base Measures (no expression, simple SUM/AGG) ──
  { id: 'obj-m1', name: 'Paid Amount USD', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'SUM([Paid Amount USD])' },
  { id: 'obj-m2', name: 'Reserve Amount USD', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'SUM([Reserve Amount USD])' },
  { id: 'obj-m3', name: 'Recovery Amount USD', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'SUM([Recovery Amount USD])' },
  { id: 'obj-m4', name: 'Total Incurred USD', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'SUM([Total Incurred USD])' },
  { id: 'obj-m5', name: 'Claim Resolution Time Days', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'AVG([Claim Resolution Time Days])' },
  { id: 'obj-m6', name: 'Customer Age', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'AVG([Customer Age])' },
  { id: 'obj-m7', name: 'Claim Count', type_name: 'metric', status: 'valid', confidence: 1.0, tableau_calc: 'COUNTD([Claim ID])' },
  // ── Derived Metrics (with expressions & translations) ──
  {
    id: 'obj-dm1',
    name: 'Loss Ratio Percent',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.95,
    translation_method: 'Universal AST Compiler',
    expression_text: '([Paid Amount USD] + [Reserve Amount USD]) / [Total Incurred USD]',
    tableau_calc: 'SUM([Paid Amount USD] + [Reserve Amount USD])\n/ NULLIF(SUM([Total Incurred USD]), 0)',
    definition_chain: [
      { name: 'Paid Amount USD', formula: 'SUM(fact_claims.paid_amount)' },
      { name: 'Reserve Amount USD', formula: 'SUM(fact_claims.reserve_amount)' },
      { name: 'Total Incurred USD', formula: 'SUM(fact_claims.total_incurred)' },
      { name: 'Loss Ratio Percent', formula: '(Paid + Reserve) / Total Incurred' },
    ],
    dependencies: ['Paid Amount USD', 'Reserve Amount USD', 'Total Incurred USD'],
  },
  {
    id: 'obj-dm2',
    name: 'Recovery Rate Percent',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.93,
    translation_method: 'Universal AST Compiler',
    expression_text: '[Recovery Amount USD] / [Paid Amount USD]',
    tableau_calc: 'SUM([Recovery Amount USD])\n/ NULLIF(SUM([Paid Amount USD]), 0)',
    definition_chain: [
      { name: 'Recovery Amount USD', formula: 'SUM(fact_claims.recovery_amount)' },
      { name: 'Paid Amount USD', formula: 'SUM(fact_claims.paid_amount)' },
      { name: 'Recovery Rate Percent', formula: 'Recovery / Paid' },
    ],
    dependencies: ['Recovery Amount USD', 'Paid Amount USD'],
  },
  {
    id: 'obj-dm3',
    name: 'Avg Claim Duration',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.97,
    translation_method: 'Universal AST Compiler',
    expression_text: 'Avg([Claim Resolution Time Days])',
    tableau_calc: 'AVG([Claim Resolution Time Days])',
    dependencies: ['Claim Resolution Time Days'],
  },
  {
    id: 'obj-dm4',
    name: 'Litigation Ratio Percent',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.91,
    translation_method: 'Universal AST Compiler',
    expression_text: 'Count(Case When [Litigation] = "Yes" Then [Claim ID] End) / Count([Claim ID])',
    tableau_calc: 'COUNTD(IF [Litigation] = "Yes" THEN [Claim ID] END)\n/ NULLIF(COUNTD([Claim ID]), 0)',
    definition_chain: [
      { name: 'Litigation Claims', formula: 'COUNTD(IF litigation=Yes THEN claim_id END)' },
      { name: 'Total Claims', formula: 'COUNTD(claim_id)' },
      { name: 'Litigation Ratio Percent', formula: 'Litigation Claims / Total Claims' },
    ],
    dependencies: ['Litigation', 'Claim ID'],
  },
  {
    id: 'obj-dm5',
    name: 'Closed Ratio Percent',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.94,
    translation_method: 'Universal AST Compiler',
    expression_text: 'Count(Case When [Claim Status] = "Closed" Then [Claim ID] End) / Count([Claim ID])',
    tableau_calc: 'COUNTD(IF [Claim Status] = "Closed" THEN [Claim ID] END)\n/ NULLIF(COUNTD([Claim ID]), 0)',
    dependencies: ['Claim Status', 'Claim ID'],
  },
  {
    id: 'obj-dm6',
    name: 'Regional Incurred LOD',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.89,
    translation_method: 'Universal AST Compiler',
    expression_text: 'Sum([Total Incurred USD]) {Region State}',
    tableau_calc: '{ FIXED [Region State] : SUM([Total Incurred USD]) }',
    definition_chain: [
      { name: 'Total Incurred USD', formula: 'SUM(fact_claims.total_incurred)' },
      { name: 'Regional Incurred LOD', formula: 'FIXED [Region State] : SUM(Total Incurred)' },
    ],
    dependencies: ['Region State', 'Total Incurred USD'],
  },
  {
    id: 'obj-dm7',
    name: 'Adjuster Caseload Score',
    type_name: 'metric',
    status: 'requires_review',
    confidence: 0.78,
    translation_method: 'Heuristic fallback',
    expression_text: 'NTile(4, Count([Claim ID]) {[Adjuster Name]}, Desc)',
    tableau_calc: 'IF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.75)\nTHEN 4\nELSEIF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.50)\nTHEN 3\nELSEIF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.25)\nTHEN 2\nELSE 1\nEND',
    definition_chain: [
      { name: 'Adjuster Claims', formula: 'FIXED [Adjuster Name] : COUNTD([Claim ID])' },
      { name: 'Adjuster Caseload Score', formula: 'NTile quartile buckets' },
    ],
    dependencies: ['Adjuster Name', 'Claim ID'],
  },
  {
    id: 'obj-dm8',
    name: 'Prior Month Incurred',
    type_name: 'metric',
    status: 'valid',
    confidence: 0.92,
    translation_method: 'Universal AST Compiler',
    expression_text: 'Lag([Total Incurred USD], 1, [Loss Date Month])',
    tableau_calc: 'LOOKUP(SUM([Total Incurred USD]), -1)',
    dependencies: ['Total Incurred USD', 'Loss Date'],
  },
];

// ── Viz Plan Worksheets (mirrors api.getVizPlan response - 45 Real Worksheets) ──

export interface MstrWorksheet {
  id: string;
  viz_key: string;
  name: string;
  title: string;
  chapter: string;
  page: string;
  type: string;
  mark_type: string;
  datasource_name: string;
  columns: string[];
  rows: string[];
  dimensions: string[];
  measures: string[];
  filters: string[];
  encodings: { channel: string; field_name: string }[];
  used_calculated_fields: string[];
}

export const mstrWorksheets: MstrWorksheet[] = [
  {
    "id": "vis-W62",
    "viz_key": "W62",
    "name": "Avg Resolution Days",
    "title": "Avg Resolution Days",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg Resolution Days]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg Resolution Days]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg_Claim_Resolution_Days]"
      }
    ],
    "used_calculated_fields": [
      "[Avg Resolution Days]"
    ]
  },
  {
    "id": "vis-W70",
    "viz_key": "W70",
    "name": "Visualization 3",
    "title": "Visualization 3",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg (Fraud Score)]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg (Fraud Score)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg (Fraud Score)]"
      }
    ],
    "used_calculated_fields": [
      "[Avg (Fraud Score)]"
    ]
  },
  {
    "id": "vis-W72",
    "viz_key": "W72",
    "name": "Visualization 2 copy",
    "title": "Visualization 2 copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Subrogation]"
    ],
    "dimensions": [],
    "measures": [
      "[Subrogation]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Sum (Subrogation)]"
      }
    ],
    "used_calculated_fields": [
      "[Subrogation]"
    ]
  },
  {
    "id": "vis-W84",
    "viz_key": "W84",
    "name": "Visualization 2 copy copy",
    "title": "Visualization 2 copy copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Salvage]"
    ],
    "dimensions": [],
    "measures": [
      "[Salvage]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Salvage]"
      }
    ],
    "used_calculated_fields": [
      "[Salvage]"
    ]
  },
  {
    "id": "vis-W93",
    "viz_key": "W93",
    "name": "Total Claims by Loss Cause",
    "title": "Total Claims by Loss Cause",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred]"
    ],
    "rows": [
      "[Loss Cause]"
    ],
    "dimensions": [
      "[Loss Cause]"
    ],
    "measures": [
      "[Incurred USD ($M)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Loss Cause]"
      }
    ],
    "used_calculated_fields": [
      "[Incurred USD ($M)]"
    ]
  },
  {
    "id": "vis-W94",
    "viz_key": "W94",
    "name": "Top States By Incurred",
    "title": "Top States By Incurred",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[State]"
    ],
    "dimensions": [
      "[State]"
    ],
    "measures": [
      "[$M]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[State]"
      }
    ],
    "used_calculated_fields": [
      "[$M]"
    ]
  },
  {
    "id": "vis-W104",
    "viz_key": "W104",
    "name": "Claim Status Mix",
    "title": "Claim Status Mix",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Pie / Donut Chart (Angle + Slice)",
    "mark_type": "Pie",
    "datasource_name": "Claims",
    "columns": [
      "[Claim Status]"
    ],
    "rows": [
      "[Claim_cnt]"
    ],
    "dimensions": [
      "[Claim Status]"
    ],
    "measures": [
      "[Claim_cnt]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Claim Status]"
      }
    ],
    "used_calculated_fields": [
      "[Claim_cnt]"
    ]
  },
  {
    "id": "vis-W105",
    "viz_key": "W105",
    "name": "Coverage Loss Drivers",
    "title": "Coverage Loss Drivers",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[Coverage]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W132",
    "viz_key": "W132",
    "name": "Claims Volume",
    "title": "Claims Volume",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Total Claims]"
    ],
    "dimensions": [],
    "measures": [
      "[Total Claims]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Count (Claim ID)]"
      }
    ],
    "used_calculated_fields": [
      "[Total Claims]"
    ]
  },
  {
    "id": "vis-W137",
    "viz_key": "W137",
    "name": "Loss Expenses",
    "title": "Loss Expenses",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Total Incurred]"
    ],
    "dimensions": [],
    "measures": [
      "[Total Incurred]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Total Incurred]"
      }
    ],
    "used_calculated_fields": [
      "[Total Incurred]"
    ]
  },
  {
    "id": "vis-W152",
    "viz_key": "W152",
    "name": "Paid Amount",
    "title": "Paid Amount",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Cash Paid]"
    ],
    "dimensions": [],
    "measures": [
      "[Cash Paid]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Paid Amount]"
      }
    ],
    "used_calculated_fields": [
      "[Cash Paid]"
    ]
  },
  {
    "id": "vis-W168",
    "viz_key": "W168",
    "name": "Open Reserve",
    "title": "Open Reserve",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Outstanding Exposure]"
    ],
    "dimensions": [],
    "measures": [
      "[Outstanding Exposure]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Reserve]"
      }
    ],
    "used_calculated_fields": [
      "[Outstanding Exposure]"
    ]
  },
  {
    "id": "vis-W184",
    "viz_key": "W184",
    "name": "Incurred Per Claim",
    "title": "Incurred Per Claim",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg Severity]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg Severity]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg Severity]"
      }
    ],
    "used_calculated_fields": [
      "[Avg Severity]"
    ]
  },
  {
    "id": "vis-W205",
    "viz_key": "W205",
    "name": "Adjusters with Highest Avg Resoution Days",
    "title": "Adjusters with Highest Avg Resoution Days",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Avg_Claim_Resolution_Days]"
    ],
    "rows": [
      "[Adjuster Name]"
    ],
    "dimensions": [
      "[Adjuster Name]"
    ],
    "measures": [
      "[Avg_Claim_Resolution_Days]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Adjuster Name]"
      }
    ],
    "used_calculated_fields": [
      "[Avg_Claim_Resolution_Days]"
    ]
  },
  {
    "id": "vis-W209",
    "viz_key": "W209",
    "name": "Loss Trend: Monthly Claims and Incurred Amount",
    "title": "Loss Trend: Monthly Claims and Incurred Amount",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Dual-Axis Combination Chart (Bars + Lines)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Loss Date]"
    ],
    "rows": [
      "[Count (Claim ID)]",
      "[Total Incurred USD]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W257",
    "viz_key": "W257",
    "name": "Visualization 2 copy copy copy",
    "title": "Visualization 2 copy copy copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Recovery]"
    ],
    "dimensions": [],
    "measures": [
      "[Recovery]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Recovery]"
      }
    ],
    "used_calculated_fields": [
      "[Recovery]"
    ]
  },
  {
    "id": "vis-W252",
    "viz_key": "W252",
    "name": "Claim Severity Views: Incurred Loss and Average Severity",
    "title": "Claim Severity Views: Incurred Loss and Average Severity",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Dual-Axis Combination Chart (Bars + Lines)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Severity Band]"
    ],
    "rows": [
      "[Total Incurred USD]",
      "[Avg Severity]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W278",
    "viz_key": "W278",
    "name": "Severity Distribution",
    "title": "Severity Distribution",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Count (Claim ID)]"
    ],
    "rows": [
      "[Severity Band]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W284",
    "viz_key": "W284",
    "name": "Region Loss Heat Ranking",
    "title": "Region Loss Heat Ranking",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Square",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[Region]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Total Incurred USD]"
      },
      {
        "channel": "label",
        "field_name": "[Total Incurred USD]"
      }
    ],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W285",
    "viz_key": "W285",
    "name": "Line of Business Mix",
    "title": "Line of Business Mix",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[Line of Business]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W286",
    "viz_key": "W286",
    "name": "Paid",
    "title": "Paid",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Paid Amount]"
    ],
    "dimensions": [],
    "measures": [
      "[Paid Amount]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Paid Amount]"
      }
    ],
    "used_calculated_fields": [
      "[Paid Amount]"
    ]
  },
  {
    "id": "vis-W287",
    "viz_key": "W287",
    "name": "Reserve",
    "title": "Reserve",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Reserve]"
    ],
    "dimensions": [],
    "measures": [
      "[Reserve]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Reserve]"
      }
    ],
    "used_calculated_fields": [
      "[Reserve]"
    ]
  },
  {
    "id": "vis-W295",
    "viz_key": "W295",
    "name": "Recovery",
    "title": "Recovery",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Recovery]"
    ],
    "dimensions": [],
    "measures": [
      "[Recovery]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Recovery]"
      }
    ],
    "used_calculated_fields": [
      "[Recovery]"
    ]
  },
  {
    "id": "vis-W304",
    "viz_key": "W304",
    "name": "Net Loss",
    "title": "Net Loss",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Net Losses]"
    ],
    "dimensions": [],
    "measures": [
      "[Net Losses]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Net Losses]"
      }
    ],
    "used_calculated_fields": [
      "[Net Losses]"
    ]
  },
  {
    "id": "vis-W314",
    "viz_key": "W314",
    "name": "Avg Claim",
    "title": "Avg Claim",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg Claim]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg Claim]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg Severity]"
      }
    ],
    "used_calculated_fields": [
      "[Avg Claim]"
    ]
  },
  {
    "id": "vis-W325",
    "viz_key": "W325",
    "name": "Top Loss Causes by Incurred Loss",
    "title": "Top Loss Causes by Incurred Loss",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred]"
    ],
    "rows": [
      "[Loss Cause]"
    ],
    "dimensions": [
      "[Loss Cause]"
    ],
    "measures": [
      "[Total Incurred]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Loss Cause]"
      }
    ],
    "used_calculated_fields": [
      "[Total Incurred]"
    ]
  },
  {
    "id": "vis-W339",
    "viz_key": "W339",
    "name": "High Fraud Claims",
    "title": "High Fraud Claims",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[High Fraud Claims]"
    ],
    "dimensions": [],
    "measures": [
      "[High Fraud Claims]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[High Fraud Claims]"
      }
    ],
    "used_calculated_fields": [
      "[High Fraud Claims]"
    ]
  },
  {
    "id": "vis-W340",
    "viz_key": "W340",
    "name": "High Fraud Rate",
    "title": "High Fraud Rate",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[High Fraud Rate]"
    ],
    "dimensions": [],
    "measures": [
      "[High Fraud Rate]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[High Fraud Rate]"
      }
    ],
    "used_calculated_fields": [
      "[High Fraud Rate]"
    ]
  },
  {
    "id": "vis-W341",
    "viz_key": "W341",
    "name": "Avg Fraud Score",
    "title": "Avg Fraud Score",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg (Fraud Score)]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg (Fraud Score)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg (Fraud Score)]"
      }
    ],
    "used_calculated_fields": [
      "[Avg (Fraud Score)]"
    ]
  },
  {
    "id": "vis-W342",
    "viz_key": "W342",
    "name": "LItigation Claims",
    "title": "LItigation Claims",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Litigation Claims]"
    ],
    "dimensions": [],
    "measures": [
      "[Litigation Claims]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Litigation Claims]"
      }
    ],
    "used_calculated_fields": [
      "[Litigation Claims]"
    ]
  },
  {
    "id": "vis-W343",
    "viz_key": "W343",
    "name": "Litigation Rate",
    "title": "Litigation Rate",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Litigation Rate]"
    ],
    "dimensions": [],
    "measures": [
      "[Litigation Rate]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Litigation Rate]"
      }
    ],
    "used_calculated_fields": [
      "[Litigation Rate]"
    ]
  },
  {
    "id": "vis-W344",
    "viz_key": "W344",
    "name": "Litigation by State",
    "title": "Litigation by State",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Litigation Claims]"
    ],
    "rows": [
      "[State]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W345",
    "viz_key": "W345",
    "name": "Litigation Incurred Loss",
    "title": "Litigation Incurred Loss",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "type": "Line Chart (Date Continuous)",
    "mark_type": "Line",
    "datasource_name": "Claims",
    "columns": [
      "[Litigation Incurred Loss]"
    ],
    "rows": [
      "[State]"
    ],
    "dimensions": [
      "[State]"
    ],
    "measures": [
      "[Sum (Salvage)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[State]"
      }
    ],
    "used_calculated_fields": [
      "[Sum (Salvage)]"
    ]
  },
  {
    "id": "vis-W337",
    "viz_key": "W337",
    "name": "Regions",
    "title": "Regions",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Count (Region)]"
    ],
    "dimensions": [],
    "measures": [
      "[Count (Region)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Count (Region)]"
      }
    ],
    "used_calculated_fields": [
      "[Count (Region)]"
    ]
  },
  {
    "id": "vis-W347",
    "viz_key": "W347",
    "name": "States",
    "title": "States",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[States]"
    ],
    "dimensions": [],
    "measures": [
      "[States]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[States]"
      }
    ],
    "used_calculated_fields": [
      "[States]"
    ]
  },
  {
    "id": "vis-W352",
    "viz_key": "W352",
    "name": "Top States Loss",
    "title": "Top States Loss",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[(Top State Loss+Top State Loss)]"
    ],
    "dimensions": [],
    "measures": [
      "[(Top State Loss+Top State Loss)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Top State Loss]"
      }
    ],
    "used_calculated_fields": [
      "[(Top State Loss+Top State Loss)]"
    ]
  },
  {
    "id": "vis-W358",
    "viz_key": "W358",
    "name": "Incurred loss by state",
    "title": "Incurred loss by state",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[State]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W365",
    "viz_key": "W365",
    "name": "Claim Volume by region",
    "title": "Claim Volume by region",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Count (Claim ID)]"
    ],
    "rows": [
      "[Region]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W373",
    "viz_key": "W373",
    "name": "Incurred loss by region",
    "title": "Incurred loss by region",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Bar Chart (Horizontal/Vertical Columns)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Total Incurred USD]"
    ],
    "rows": [
      "[Region]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W382",
    "viz_key": "W382",
    "name": "Claim volume by state",
    "title": "Claim volume by state",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "type": "Text Cross-tab / Matrix Table",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Count (Claim ID)]"
    ],
    "rows": [
      "[State]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  },
  {
    "id": "vis-W230",
    "viz_key": "W230",
    "name": "Top Adjusters by Workload with Avg Resolution Days",
    "title": "Top Adjusters by Workload with Avg Resolution Days",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "type": "Dual-Axis Combination Chart (Bars + Lines)",
    "mark_type": "Bar",
    "datasource_name": "Claims",
    "columns": [
      "[Adjuster Name]"
    ],
    "rows": [
      "[Count (Claim ID)]",
      "[Avg_Claim_Resolution_Days]"
    ],
    "dimensions": [
      "[Adjuster Name]"
    ],
    "measures": [
      "[Claim Count]",
      "[Avg Resolution Days]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Adjuster Name]"
      }
    ],
    "used_calculated_fields": [
      "[Claim Count]",
      "[Avg Resolution Days]"
    ]
  },
  {
    "id": "vis-W231",
    "viz_key": "W231",
    "name": "Risk Lens: Avg Resolution Vs Fraud",
    "title": "Risk Lens: Avg Resolution Vs Fraud",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "type": "Scatter / Bubble Chart (X, Y, Size)",
    "mark_type": "Circle",
    "datasource_name": "Claims",
    "columns": [
      "[Avg (Fraud Score)]"
    ],
    "rows": [
      "[Avg_Claim_Resolution_Days]"
    ],
    "dimensions": [
      "[Adjuster Name]"
    ],
    "measures": [
      "[Avg (Fraud Score)]",
      "[Avg Resolution Days]",
      "[Count (Claim ID)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "color",
        "field_name": "[Adjuster Name]"
      }
    ],
    "used_calculated_fields": [
      "[Avg (Fraud Score)]",
      "[Avg Resolution Days]",
      "[Count (Claim ID)]"
    ]
  },
  {
    "id": "vis-W232",
    "viz_key": "W232",
    "name": "Total Adjusters",
    "title": "Total Adjusters",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Count (Adjuster Name)]"
    ],
    "dimensions": [],
    "measures": [
      "[Count (Adjuster Name)]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Count (Adjuster Name)]"
      }
    ],
    "used_calculated_fields": [
      "[Count (Adjuster Name)]"
    ]
  },
  {
    "id": "vis-W233",
    "viz_key": "W233",
    "name": "Avg Resolution",
    "title": "Avg Resolution",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "type": "Text Mark / KPI Big Number Card",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [],
    "rows": [
      "[Avg Resolution]"
    ],
    "dimensions": [],
    "measures": [
      "[Avg Resolution]"
    ],
    "filters": [],
    "encodings": [
      {
        "channel": "label",
        "field_name": "[Avg_Claim_Resolution_Days]"
      }
    ],
    "used_calculated_fields": [
      "[Avg Resolution]"
    ]
  },
  {
    "id": "vis-8CA503E3FAA940EE89C5D2678C6BB2DB",
    "viz_key": "8CA503E3FAA940EE89C5D2678C6BB2DB",
    "name": " Workload By Adjusters",
    "title": " Workload By Adjusters",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "type": "Sparkline / Trend Line Matrix Table",
    "mark_type": "Text",
    "datasource_name": "Claims",
    "columns": [
      "[Count (Claim ID)]",
      "[Avg_Claim_Resolution_Days]"
    ],
    "rows": [
      "[Adjuster Name]"
    ],
    "dimensions": [],
    "measures": [],
    "filters": [],
    "encodings": [],
    "used_calculated_fields": []
  }
];

// ── Viz Plan Dashboards (5 Executive Chapters / Dossier Pages) ──

export interface MstrDashboard {
  name: string;
  layout: string;
  worksheets: string[];
}

export const mstrDashboards: MstrDashboard[] = [
  {
    "name": "Executive Summary",
    "layout": "auto-tiled",
    "worksheets": [
      "Avg Resolution Days",
      "Avg (Fraud Score)",
      "Sum (Subrogation)",
      "Salvage",
      "Total Claims by Loss Cause",
      "Top States By Incurred",
      "Claim Status Mix",
      "Coverage Loss Drivers",
      "Claims Volume",
      "Loss Expenses",
      "Paid Amount",
      "Open Reserve",
      "Incurred Per Claim",
      "Adjusters with Highest Avg Resoution Days",
      "Loss Trend: Monthly Claims and Incurred Amount",
      "Recovery"
    ]
  },
  {
    "name": "Financial & Severity View",
    "layout": "auto-tiled",
    "worksheets": [
      "Claim Severity Views: Incurred Loss and Average Severity",
      "Severity Distribution",
      "Region Loss Heat Ranking",
      "Line of Business Mix",
      "Paid",
      "Reserve",
      "Recovery (2)",
      "Net Loss",
      "Avg Claim",
      "Top Loss Causes by Incurred Loss"
    ]
  },
  {
    "name": "Fraud & Litigation View",
    "layout": "auto-tiled",
    "worksheets": [
      "High Fraud Claims",
      "High Fraud Rate",
      "Avg Fraud Score",
      "LItigation Claims",
      "Litigation Rate",
      "Litigation by State",
      "Litigation Incurred Loss"
    ]
  },
  {
    "name": "Geography View",
    "layout": "auto-tiled",
    "worksheets": [
      "Regions",
      "States",
      "Top States Loss",
      "Incurred loss by state",
      "Claim Volume by region",
      "Incurred loss by region",
      "Claim volume by state"
    ]
  },
  {
    "name": "Adjuster Performance View",
    "layout": "auto-tiled",
    "worksheets": [
      "Top Adjusters by Workload with Avg Resolution Days",
      "Risk Lens: Avg Resolution Vs Fraud",
      "Total Adjusters",
      "Avg Resolution",
      "Workload By Adjusters"
    ]
  }
];

// ── Calculation Items (mirrors LogicExplorer's CalculationItem) ──

export interface MstrCalculationItem {
  id: string;
  name: string;
  category: 'LOD' | 'CONDITIONAL' | 'TABLE_CALC' | 'STANDARD';
  formulaType: string;
  sourceFormula: string;
  targetCalc: string;
  method: string;
  confidence: number;
  validationStatus: 'VALID' | 'WARNING' | 'FAIL';
  datasource: string;
  explanation: string;
  definitionChain?: { name: string; formula: string }[];
}

export const mstrCalculations: MstrCalculationItem[] = [
  {
    id: 'calc-1',
    name: 'Loss Ratio Percent',
    category: 'STANDARD',
    formulaType: 'Standard Measure',
    sourceFormula: '([Paid Amount USD] + [Reserve Amount USD]) / [Total Incurred USD]',
    targetCalc: 'SUM([Paid Amount USD] + [Reserve Amount USD])\n/ NULLIF(SUM([Total Incurred USD]), 0)',
    method: 'Universal AST Compiler',
    confidence: 0.95,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
    definitionChain: [
      { name: 'Paid Amount USD', formula: 'SUM(fact_claims.paid_amount)' },
      { name: 'Reserve Amount USD', formula: 'SUM(fact_claims.reserve_amount)' },
      { name: 'Total Incurred USD', formula: 'SUM(fact_claims.total_incurred)' },
      { name: 'Loss Ratio Percent', formula: '(Paid + Reserve) / Total Incurred' },
    ],
  },
  {
    id: 'calc-2',
    name: 'Recovery Rate Percent',
    category: 'STANDARD',
    formulaType: 'Standard Measure',
    sourceFormula: '[Recovery Amount USD] / [Paid Amount USD]',
    targetCalc: 'SUM([Recovery Amount USD])\n/ NULLIF(SUM([Paid Amount USD]), 0)',
    method: 'Universal AST Compiler',
    confidence: 0.93,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
    definitionChain: [
      { name: 'Recovery Amount USD', formula: 'SUM(fact_claims.recovery_amount)' },
      { name: 'Paid Amount USD', formula: 'SUM(fact_claims.paid_amount)' },
      { name: 'Recovery Rate Percent', formula: 'Recovery / Paid' },
    ],
  },
  {
    id: 'calc-3',
    name: 'Litigation Ratio Percent',
    category: 'CONDITIONAL',
    formulaType: 'Conditional Logic',
    sourceFormula: 'Count(Case When [Litigation] = "Yes" Then [Claim ID] End) / Count([Claim ID])',
    targetCalc: 'COUNTD(IF [Litigation] = "Yes" THEN [Claim ID] END)\n/ NULLIF(COUNTD([Claim ID]), 0)',
    method: 'Universal AST Compiler',
    confidence: 0.91,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
    definitionChain: [
      { name: 'Litigation Claims', formula: 'COUNTD(IF litigation=Yes THEN claim_id END)' },
      { name: 'Total Claims', formula: 'COUNTD(claim_id)' },
      { name: 'Litigation Ratio Percent', formula: 'Litigation Claims / Total Claims' },
    ],
  },
  {
    id: 'calc-4',
    name: 'Closed Ratio Percent',
    category: 'CONDITIONAL',
    formulaType: 'Conditional Logic',
    sourceFormula: 'Count(Case When [Claim Status] = "Closed" Then [Claim ID] End) / Count([Claim ID])',
    targetCalc: 'COUNTD(IF [Claim Status] = "Closed" THEN [Claim ID] END)\n/ NULLIF(COUNTD([Claim ID]), 0)',
    method: 'Universal AST Compiler',
    confidence: 0.94,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
  },
  {
    id: 'calc-5',
    name: 'Regional Incurred LOD',
    category: 'LOD',
    formulaType: 'LOD Expression',
    sourceFormula: 'Sum([Total Incurred USD]) {Region State}',
    targetCalc: '{ FIXED [Region State] : SUM([Total Incurred USD]) }',
    method: 'Universal AST Compiler',
    confidence: 0.89,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
    definitionChain: [
      { name: 'Total Incurred USD', formula: 'SUM(fact_claims.total_incurred)' },
      { name: 'Regional Incurred LOD', formula: 'FIXED [Region State] : SUM(Total Incurred)' },
    ],
  },
  {
    id: 'calc-6',
    name: 'Adjuster Caseload Score',
    category: 'LOD',
    formulaType: 'LOD Expression',
    sourceFormula: 'NTile(4, Count([Claim ID]) {[Adjuster Name]}, Desc)',
    targetCalc: 'IF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.75)\nTHEN 4\nELSEIF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.50)\nTHEN 3\nELSEIF { FIXED [Adjuster Name] : COUNTD([Claim ID]) } >= PERCENTILE({ FIXED [Adjuster Name] : COUNTD([Claim ID]) }, 0.25)\nTHEN 2\nELSE 1\nEND',
    method: 'Heuristic fallback',
    confidence: 0.78,
    validationStatus: 'WARNING',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Heuristic fallback. Requires manual review.',
    definitionChain: [
      { name: 'Adjuster Claims', formula: 'FIXED [Adjuster Name] : COUNTD([Claim ID])' },
      { name: 'Adjuster Caseload Score', formula: 'NTile quartile buckets' },
    ],
  },
  {
    id: 'calc-7',
    name: 'Prior Month Incurred',
    category: 'TABLE_CALC',
    formulaType: 'Table Calculation',
    sourceFormula: 'Lag([Total Incurred USD], 1, [Loss Date Month])',
    targetCalc: 'LOOKUP(SUM([Total Incurred USD]), -1)',
    method: 'Universal AST Compiler',
    confidence: 0.92,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
  },
  {
    id: 'calc-8',
    name: 'Avg Claim Duration',
    category: 'STANDARD',
    formulaType: 'Standard Measure',
    sourceFormula: 'Avg([Claim Resolution Time Days])',
    targetCalc: 'AVG([Claim Resolution Time Days])',
    method: 'Universal AST Compiler',
    confidence: 0.97,
    validationStatus: 'VALID',
    datasource: 'MicroStrategy Schema',
    explanation: 'Source formula quoted from MicroStrategy. Engine: Universal AST Compiler.',
  },
];

// ── Sample Data Preview (mirrors Objects.tsx sampleDataRows) ──

export const mstrSampleDataRows = [
  {
    'Claim ID': 'CLM-2021000580',
    'Policy ID': 'POL-38914',
    'Line of Business': 'Commercial Auto',
    'Coverage': 'Collision',
    'Loss Cause': 'Rear-end Collision',
    'Claim Status': 'Closed',
    'Loss Date': '2021-04-12',
    'Reported Date': '2021-04-15',
    'State Name': 'Texas',
    'Region State': 'South',
    'Customer Age': 42,
    'Litigation': 'No',
    'Paid Amount USD': '$14,250.00',
    'Reserve Amount USD': '$0.00',
    'Recovery Amount USD': '$1,200.00',
    'Total Incurred USD': '$14,250.00',
    'Claim Resolution Time Days': 18,
    'Adjuster Name': 'Amanda Scott',
  },
  {
    'Claim ID': 'CLM-2021000884',
    'Policy ID': 'POL-19284',
    'Line of Business': 'Personal Auto',
    'Coverage': 'Comprehensive',
    'Loss Cause': 'Windshield Damage',
    'Claim Status': 'Closed',
    'Loss Date': '2021-05-20',
    'Reported Date': '2021-05-21',
    'State Name': 'California',
    'Region State': 'West',
    'Customer Age': 35,
    'Litigation': 'No',
    'Paid Amount USD': '$1,150.00',
    'Reserve Amount USD': '$0.00',
    'Recovery Amount USD': '$0.00',
    'Total Incurred USD': '$1,150.00',
    'Claim Resolution Time Days': 5,
    'Adjuster Name': 'Brian Martinez',
  },
  {
    'Claim ID': 'CLM-2021001249',
    'Policy ID': 'POL-55421',
    'Line of Business': 'Commercial Property',
    'Coverage': 'Property Damage',
    'Loss Cause': 'Water Leak',
    'Claim Status': 'Open',
    'Loss Date': '2021-06-03',
    'Reported Date': '2021-06-05',
    'State Name': 'Florida',
    'Region State': 'Southeast',
    'Customer Age': 58,
    'Litigation': 'Yes',
    'Paid Amount USD': '$8,400.00',
    'Reserve Amount USD': '$12,500.00',
    'Recovery Amount USD': '$0.00',
    'Total Incurred USD': '$20,900.00',
    'Claim Resolution Time Days': 45,
    'Adjuster Name': 'Carlos Rivera',
  },
  {
    'Claim ID': 'CLM-2021001890',
    'Policy ID': 'POL-78210',
    'Line of Business': 'Personal Auto',
    'Coverage': 'Bodily Injury',
    'Loss Cause': 'Intersection Impact',
    'Claim Status': 'In Review',
    'Loss Date': '2021-07-14',
    'Reported Date': '2021-07-16',
    'State Name': 'New York',
    'Region State': 'Northeast',
    'Customer Age': 29,
    'Litigation': 'Yes',
    'Paid Amount USD': '$28,900.00',
    'Reserve Amount USD': '$15,000.00',
    'Recovery Amount USD': '$5,400.00',
    'Total Incurred USD': '$43,900.00',
    'Claim Resolution Time Days': 64,
    'Adjuster Name': 'Amanda Scott',
  },
  {
    'Claim ID': 'CLM-2021002341',
    'Policy ID': 'POL-44109',
    'Line of Business': 'Homeowners',
    'Coverage': 'Dwelling',
    'Loss Cause': 'Hail Storm',
    'Claim Status': 'Closed',
    'Loss Date': '2021-08-01',
    'Reported Date': '2021-08-02',
    'State Name': 'Colorado',
    'Region State': 'West',
    'Customer Age': 47,
    'Litigation': 'No',
    'Paid Amount USD': '$9,750.00',
    'Reserve Amount USD': '$0.00',
    'Recovery Amount USD': '$0.00',
    'Total Incurred USD': '$9,750.00',
    'Claim Resolution Time Days': 12,
    'Adjuster Name': 'Brian Martinez',
  },
];

// ── Export Artifacts (mirrors api.ArtifactItem) ──

export interface MstrArtifact {
  id: string;
  type: string;
  file_name: string;
  description: string;
  size_bytes: number;
  environment: string;
  download_url?: string;
}

export const mstrArtifacts: MstrArtifact[] = [
  {
    id: 'art-1',
    type: 'twbx',
    file_name: 'PC_Claims_Executive_Dashboard_prod.twbx',
    description: 'Production-ready Tableau packaged workbook configured with production datasource paths for direct server deployment.',
    size_bytes: 1171277,
    environment: 'production',
    download_url: '/exports/mstr-tableau/PC_Claims_Executive_Dashboard_prod.twbx',
  },
  {
    id: 'art-2',
    type: 'twbx',
    file_name: 'PC_Claims_Executive_Dashboard_staging.twbx',
    description: 'Self-contained staging workbook with embedded extracts for local validation & Tableau Desktop verification.',
    size_bytes: 219424,
    environment: 'staging',
    download_url: '/exports/mstr-tableau/PC_Claims_Executive_Dashboard_staging.twbx',
  },
  {
    id: 'art-3',
    type: 'hyper',
    file_name: 'Claims_Extract.hyper',
    description: 'High-performance Hyper extract containing pre-aggregated analytical rows.',
    size_bytes: 524288,
    environment: 'production',
    download_url: '/exports/mstr-tableau/Claims_Extract.hyper',
  },
  {
    id: 'art-4',
    type: 'tds',
    file_name: 'Claims_Datasource.tds',
    description: 'Tableau data source definition with calculated field logic & metadata.',
    size_bytes: 8277,
    environment: 'production',
    download_url: '/exports/mstr-tableau/Claims_Datasource.tds',
  },
  {
    id: 'art-5',
    type: 'xlsx',
    file_name: 'PC_Claims_Migration_Documentation.xlsx',
    description: 'Comprehensive extraction & translation report: Overview & KPIs, MSTR Source Metadata, Metric & Logic Translation Matrix, Visual & Worksheet Mapping, and Execution Audit Trail.',
    size_bytes: 13445,
    environment: 'documentation',
    download_url: '/exports/mstr-tableau/PC_Claims_Migration_Documentation.xlsx',
  },
];

// ── Visual Conversion Cards (mirrors DashboardInventory.tsx ConversionCardItem - 45 Visuals) ──

export interface MstrVisualDef {
  type?: string | null;
  rows: string[];
  columns: string[];
  color?: string | null;
  tooltip?: string[];
  filters?: string[];
  metrics?: string[];
  attributes?: string[];
  mstrFormulas?: string[];
  sampleRaw?: string;
  sampleFormatted?: string;
}

export interface TableauVisualDef {
  markType: string;
  columnsShelf: string[];
  rowsShelf: string[];
  colorEncoding?: string | null;
  labelEncoding?: string | null;
  tooltipShelf?: string[];
  filtersShelf?: string[];
  tableauCalculations?: string[];
  worksheetXmlSpec?: string;
}

export interface ConversionCardItem {
  id: string;
  index: number;
  vizKey?: string;
  worksheetName: string;
  chapter: string;
  page: string;
  chartType: string;
  markType?: string;
  status: 'SUCCESS' | 'MANUAL_REVIEW';
  failureReason?: string | null;
  mstrVisualType?: string | null;
  mstr: MstrVisualDef;
  tableau: TableauVisualDef;
}

export const mstrVisualConversions: ConversionCardItem[] = [
  {
    "id": "vis-W62",
    "index": 1,
    "vizKey": "W62",
    "worksheetName": "Avg Resolution Days",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg Resolution Days]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg Resolution Days"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg Resolution Days]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg_Claim_Resolution_Days]",
      "tooltipShelf": [
        "[Avg Resolution Days]"
      ],
      "tableauCalculations": [
        "SUM([Avg Resolution Days])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Avg Resolution Days\">\n  <table>\n    <rows>[Avg Resolution Days]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg_Claim_Resolution_Days]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W70",
    "index": 2,
    "vizKey": "W70",
    "worksheetName": "Visualization 3",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg (Fraud Score)]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg (Fraud Score)"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Fraud Score]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg (Fraud Score)]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg (Fraud Score)]",
      "tooltipShelf": [
        "[Avg (Fraud Score)]"
      ],
      "tableauCalculations": [
        "AVG([Fraud Score])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Visualization 3\">\n  <table>\n    <rows>[Avg (Fraud Score)]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg (Fraud Score)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W72",
    "index": 3,
    "vizKey": "W72",
    "worksheetName": "Visualization 2 copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Subrogation]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Subrogation"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Subrogation]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Sum (Subrogation)]",
      "tooltipShelf": [
        "[Subrogation]"
      ],
      "tableauCalculations": [
        "SUM([Subrogation])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Visualization 2 copy\">\n  <table>\n    <rows>[Subrogation]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Sum (Subrogation)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W84",
    "index": 4,
    "vizKey": "W84",
    "worksheetName": "Visualization 2 copy copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Salvage]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Salvage"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Salvage]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Salvage]",
      "tooltipShelf": [
        "[Salvage]"
      ],
      "tableauCalculations": [
        "SUM([Salvage])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Visualization 2 copy copy\">\n  <table>\n    <rows>[Salvage]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Salvage]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W93",
    "index": 5,
    "vizKey": "W93",
    "worksheetName": "Total Claims by Loss Cause",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Loss Cause]"
      ],
      "columns": [
        "[Total Incurred]"
      ],
      "color": "[Loss Cause]",
      "metrics": [
        "Incurred USD ($M)"
      ],
      "attributes": [
        "Loss Cause"
      ],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred]"
      ],
      "rowsShelf": [
        "[Loss Cause]"
      ],
      "colorEncoding": "[Loss Cause]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Incurred USD ($M)]"
      ],
      "tableauCalculations": [
        "SUM([Incurred USD ($M)])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Total Claims by Loss Cause\">\n  <table>\n    <rows>[Loss Cause]</rows>\n    <cols>[Total Incurred]</cols>\n    <encodings>\n    <color column=\"[Loss Cause]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W94",
    "index": 6,
    "vizKey": "W94",
    "worksheetName": "Top States By Incurred",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[State]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": "[State]",
      "metrics": [
        "$M"
      ],
      "attributes": [
        "State"
      ],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[State]"
      ],
      "colorEncoding": "[State]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[$M]"
      ],
      "tableauCalculations": [
        "SUM([$M])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Top States By Incurred\">\n  <table>\n    <rows>[State]</rows>\n    <cols>[Total Incurred USD]</cols>\n    <encodings>\n    <color column=\"[State]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W104",
    "index": 7,
    "vizKey": "W104",
    "worksheetName": "Claim Status Mix",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Pie / Donut Chart (Angle + Slice)",
    "mstrVisualType": "donut_chart",
    "markType": "Pie",
    "status": "SUCCESS",
    "mstr": {
      "type": "donut_chart",
      "rows": [
        "[Claim_cnt]"
      ],
      "columns": [
        "[Claim Status]"
      ],
      "color": "[Claim Status]",
      "metrics": [
        "Claim_cnt"
      ],
      "attributes": [
        "Claim Status"
      ],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Pie",
      "columnsShelf": [
        "[Claim Status]"
      ],
      "rowsShelf": [
        "[Claim_cnt]"
      ],
      "colorEncoding": "[Claim Status]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Claim_cnt]"
      ],
      "tableauCalculations": [
        "SUM([Claim_cnt])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Claim Status Mix\">\n  <table>\n    <rows>[Claim_cnt]</rows>\n    <cols>[Claim Status]</cols>\n    <encodings>\n    <color column=\"[Claim Status]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W105",
    "index": 8,
    "vizKey": "W105",
    "worksheetName": "Coverage Loss Drivers",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Coverage]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[Coverage]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Coverage Loss Drivers\">\n  <table>\n    <rows>[Coverage]</rows>\n    <cols>[Total Incurred USD]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W132",
    "index": 9,
    "vizKey": "W132",
    "worksheetName": "Claims Volume",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Total Claims]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Total Claims"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Total Claims]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Count (Claim ID)]",
      "tooltipShelf": [
        "[Total Claims]"
      ],
      "tableauCalculations": [
        "SUM([Total Claims])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Claims Volume\">\n  <table>\n    <rows>[Total Claims]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Count (Claim ID)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W137",
    "index": 10,
    "vizKey": "W137",
    "worksheetName": "Loss Expenses",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Total Incurred]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Total Incurred"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Total Incurred USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Total Incurred]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Total Incurred]",
      "tooltipShelf": [
        "[Total Incurred]"
      ],
      "tableauCalculations": [
        "SUM([Total Incurred USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Loss Expenses\">\n  <table>\n    <rows>[Total Incurred]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Total Incurred]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W152",
    "index": 11,
    "vizKey": "W152",
    "worksheetName": "Paid Amount",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Cash Paid]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Cash Paid"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Cash Paid]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Paid Amount]",
      "tooltipShelf": [
        "[Cash Paid]"
      ],
      "tableauCalculations": [
        "SUM([Cash Paid])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Paid Amount\">\n  <table>\n    <rows>[Cash Paid]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Paid Amount]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W168",
    "index": 12,
    "vizKey": "W168",
    "worksheetName": "Open Reserve",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Outstanding Exposure]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Outstanding Exposure"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Reserve Amount USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Outstanding Exposure]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Reserve]",
      "tooltipShelf": [
        "[Outstanding Exposure]"
      ],
      "tableauCalculations": [
        "SUM([Reserve Amount USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Open Reserve\">\n  <table>\n    <rows>[Outstanding Exposure]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Reserve]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W184",
    "index": 13,
    "vizKey": "W184",
    "worksheetName": "Incurred Per Claim",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg Severity]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg Severity"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Total Incurred USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg Severity]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg Severity]",
      "tooltipShelf": [
        "[Avg Severity]"
      ],
      "tableauCalculations": [
        "AVG([Total Incurred USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Incurred Per Claim\">\n  <table>\n    <rows>[Avg Severity]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg Severity]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W205",
    "index": 14,
    "vizKey": "W205",
    "worksheetName": "Adjusters with Highest Avg Resoution Days",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Adjuster Name]"
      ],
      "columns": [
        "[Avg_Claim_Resolution_Days]"
      ],
      "color": "[Adjuster Name]",
      "metrics": [
        "Avg_Claim_Resolution_Days"
      ],
      "attributes": [
        "Adjuster Name"
      ],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Claim Resolution Time Days]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Avg_Claim_Resolution_Days]"
      ],
      "rowsShelf": [
        "[Adjuster Name]"
      ],
      "colorEncoding": "[Adjuster Name]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Avg_Claim_Resolution_Days]"
      ],
      "tableauCalculations": [
        "AVG([Claim Resolution Time Days])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Adjusters with Highest Avg Resoution Days\">\n  <table>\n    <rows>[Adjuster Name]</rows>\n    <cols>[Avg_Claim_Resolution_Days]</cols>\n    <encodings>\n    <color column=\"[Adjuster Name]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W209",
    "index": 15,
    "vizKey": "W209",
    "worksheetName": "Loss Trend: Monthly Claims and Incurred Amount",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Dual-Axis Combination Chart (Bars + Lines)",
    "mstrVisualType": "combo_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "combo_chart",
      "rows": [
        "[Count (Claim ID)]",
        "[Total Incurred USD]"
      ],
      "columns": [
        "[Loss Date]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Loss Date]"
      ],
      "rowsShelf": [
        "[Count (Claim ID)]",
        "[Total Incurred USD]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Loss Trend: Monthly Claims and Incurred Amount\">\n  <table>\n    <rows>[Count (Claim ID)][Total Incurred USD]</rows>\n    <cols>[Loss Date]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W257",
    "index": 16,
    "vizKey": "W257",
    "worksheetName": "Visualization 2 copy copy copy",
    "chapter": "Claims Operations Report",
    "page": "Executive Summary",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Recovery]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Recovery"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Recovery Amount USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Recovery]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Recovery]",
      "tooltipShelf": [
        "[Recovery]"
      ],
      "tableauCalculations": [
        "SUM([Recovery Amount USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Visualization 2 copy copy copy\">\n  <table>\n    <rows>[Recovery]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Recovery]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W252",
    "index": 17,
    "vizKey": "W252",
    "worksheetName": "Claim Severity Views: Incurred Loss and Average Severity",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Dual-Axis Combination Chart (Bars + Lines)",
    "mstrVisualType": "combo_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "combo_chart",
      "rows": [
        "[Total Incurred USD]",
        "[Avg Severity]"
      ],
      "columns": [
        "[Severity Band]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Severity Band]"
      ],
      "rowsShelf": [
        "[Total Incurred USD]",
        "[Avg Severity]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Claim Severity Views: Incurred Loss and Average Severity\">\n  <table>\n    <rows>[Total Incurred USD][Avg Severity]</rows>\n    <cols>[Severity Band]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W278",
    "index": 18,
    "vizKey": "W278",
    "worksheetName": "Severity Distribution",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Severity Band]"
      ],
      "columns": [
        "[Count (Claim ID)]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Count (Claim ID)]"
      ],
      "rowsShelf": [
        "[Severity Band]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Severity Distribution\">\n  <table>\n    <rows>[Severity Band]</rows>\n    <cols>[Count (Claim ID)]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W284",
    "index": 19,
    "vizKey": "W284",
    "worksheetName": "Region Loss Heat Ranking",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Square",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Region]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": "[Total Incurred USD]",
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Square",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[Region]"
      ],
      "colorEncoding": "[Total Incurred USD]",
      "labelEncoding": "[Total Incurred USD]",
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Region Loss Heat Ranking\">\n  <table>\n    <rows>[Region]</rows>\n    <cols>[Total Incurred USD]</cols>\n    <encodings>\n    <text column=\"[Total Incurred USD]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W285",
    "index": 20,
    "vizKey": "W285",
    "worksheetName": "Line of Business Mix",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Line of Business]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[Line of Business]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Line of Business Mix\">\n  <table>\n    <rows>[Line of Business]</rows>\n    <cols>[Total Incurred USD]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W286",
    "index": 21,
    "vizKey": "W286",
    "worksheetName": "Paid",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Paid Amount]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Paid Amount"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Paid Amount USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Paid Amount]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Paid Amount]",
      "tooltipShelf": [
        "[Paid Amount]"
      ],
      "tableauCalculations": [
        "SUM([Paid Amount USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Paid\">\n  <table>\n    <rows>[Paid Amount]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Paid Amount]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W287",
    "index": 22,
    "vizKey": "W287",
    "worksheetName": "Reserve",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Reserve]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Reserve"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Reserve Amount USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Reserve]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Reserve]",
      "tooltipShelf": [
        "[Reserve]"
      ],
      "tableauCalculations": [
        "SUM([Reserve Amount USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Reserve\">\n  <table>\n    <rows>[Reserve]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Reserve]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W295",
    "index": 23,
    "vizKey": "W295",
    "worksheetName": "Recovery",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Recovery]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Recovery"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Recovery Amount USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Recovery]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Recovery]",
      "tooltipShelf": [
        "[Recovery]"
      ],
      "tableauCalculations": [
        "SUM([Recovery Amount USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Recovery\">\n  <table>\n    <rows>[Recovery]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Recovery]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W304",
    "index": 24,
    "vizKey": "W304",
    "worksheetName": "Net Loss",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Net Losses]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Net Losses"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Net Loss]@ID){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Net Losses]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Net Losses]",
      "tooltipShelf": [
        "[Net Losses]"
      ],
      "tableauCalculations": [
        "SUM([Net Loss])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Net Loss\">\n  <table>\n    <rows>[Net Losses]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Net Losses]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W314",
    "index": 25,
    "vizKey": "W314",
    "worksheetName": "Avg Claim",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg Claim]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg Claim"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Total Incurred USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg Claim]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg Severity]",
      "tooltipShelf": [
        "[Avg Claim]"
      ],
      "tableauCalculations": [
        "AVG([Total Incurred USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Avg Claim\">\n  <table>\n    <rows>[Avg Claim]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg Severity]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W325",
    "index": 26,
    "vizKey": "W325",
    "worksheetName": "Top Loss Causes by Incurred Loss",
    "chapter": "Claims Operations Report",
    "page": "Financial & Severity View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Loss Cause]"
      ],
      "columns": [
        "[Total Incurred]"
      ],
      "color": "[Loss Cause]",
      "metrics": [
        "Total Incurred"
      ],
      "attributes": [
        "Loss Cause"
      ],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([Total Incurred USD]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred]"
      ],
      "rowsShelf": [
        "[Loss Cause]"
      ],
      "colorEncoding": "[Loss Cause]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Total Incurred]"
      ],
      "tableauCalculations": [
        "SUM([Total Incurred USD])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Top Loss Causes by Incurred Loss\">\n  <table>\n    <rows>[Loss Cause]</rows>\n    <cols>[Total Incurred]</cols>\n    <encodings>\n    <color column=\"[Loss Cause]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W339",
    "index": 27,
    "vizKey": "W339",
    "worksheetName": "High Fraud Claims",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[High Fraud Claims]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "High Fraud Claims"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >([High Fraud Flag]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[High Fraud Claims]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[High Fraud Claims]",
      "tooltipShelf": [
        "[High Fraud Claims]"
      ],
      "tableauCalculations": [
        "SUM([High Fraud Flag])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"High Fraud Claims\">\n  <table>\n    <rows>[High Fraud Claims]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[High Fraud Claims]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W340",
    "index": 28,
    "vizKey": "W340",
    "worksheetName": "High Fraud Rate",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[High Fraud Rate]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "High Fraud Rate"
      ],
      "attributes": [],
      "mstrFormulas": [
        "[High Fraud Claims] / Total_Claims"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[High Fraud Rate]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[High Fraud Rate]",
      "tooltipShelf": [
        "[High Fraud Rate]"
      ],
      "tableauCalculations": [
        "[High Fraud Claims] / [Total_Claims]"
      ],
      "worksheetXmlSpec": "<worksheet name=\"High Fraud Rate\">\n  <table>\n    <rows>[High Fraud Rate]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[High Fraud Rate]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W341",
    "index": 29,
    "vizKey": "W341",
    "worksheetName": "Avg Fraud Score",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg (Fraud Score)]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg (Fraud Score)"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Fraud Score]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg (Fraud Score)]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg (Fraud Score)]",
      "tooltipShelf": [
        "[Avg (Fraud Score)]"
      ],
      "tableauCalculations": [
        "AVG([Fraud Score])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Avg Fraud Score\">\n  <table>\n    <rows>[Avg (Fraud Score)]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg (Fraud Score)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W342",
    "index": 30,
    "vizKey": "W342",
    "worksheetName": "LItigation Claims",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Litigation Claims]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Litigation Claims"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >(Litigation_Flag){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Litigation Claims]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Litigation Claims]",
      "tooltipShelf": [
        "[Litigation Claims]"
      ],
      "tableauCalculations": [
        "SUM([Litigation_Flag])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"LItigation Claims\">\n  <table>\n    <rows>[Litigation Claims]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Litigation Claims]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W343",
    "index": 31,
    "vizKey": "W343",
    "worksheetName": "Litigation Rate",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Litigation Rate]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Litigation Rate"
      ],
      "attributes": [],
      "mstrFormulas": [
        "[Litigation Claims] / Total_Claims"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Litigation Rate]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Litigation Rate]",
      "tooltipShelf": [
        "[Litigation Rate]"
      ],
      "tableauCalculations": [
        "[Litigation Claims] / [Total_Claims]"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Litigation Rate\">\n  <table>\n    <rows>[Litigation Rate]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Litigation Rate]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W344",
    "index": 32,
    "vizKey": "W344",
    "worksheetName": "Litigation by State",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[State]"
      ],
      "columns": [
        "[Litigation Claims]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Litigation Claims]"
      ],
      "rowsShelf": [
        "[State]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Litigation by State\">\n  <table>\n    <rows>[State]</rows>\n    <cols>[Litigation Claims]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W345",
    "index": 33,
    "vizKey": "W345",
    "worksheetName": "Litigation Incurred Loss",
    "chapter": "Claims Operations Report",
    "page": "Fraud & Litigation View",
    "chartType": "Line Chart (Date Continuous)",
    "mstrVisualType": "line_chart",
    "markType": "Line",
    "status": "SUCCESS",
    "mstr": {
      "type": "line_chart",
      "rows": [
        "[State]"
      ],
      "columns": [
        "[Litigation Incurred Loss]"
      ],
      "color": "[State]",
      "metrics": [
        "Sum (Salvage)"
      ],
      "attributes": [
        "State"
      ],
      "mstrFormulas": [
        "Sum<UseLookupForAttributes=False >(Salvage){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Line",
      "columnsShelf": [
        "[Litigation Incurred Loss]"
      ],
      "rowsShelf": [
        "[State]"
      ],
      "colorEncoding": "[State]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Sum (Salvage)]"
      ],
      "tableauCalculations": [
        "SUM([Salvage])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Litigation Incurred Loss\">\n  <table>\n    <rows>[State]</rows>\n    <cols>[Litigation Incurred Loss]</cols>\n    <encodings>\n    <color column=\"[State]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W337",
    "index": 34,
    "vizKey": "W337",
    "worksheetName": "Regions",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Count (Region)]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Count (Region)"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Count<Distinct=True , UseLookupForAttributes=False >(Region){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Count (Region)]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Count (Region)]",
      "tooltipShelf": [
        "[Count (Region)]"
      ],
      "tableauCalculations": [
        "COUNTD([Region])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Regions\">\n  <table>\n    <rows>[Count (Region)]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Count (Region)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W347",
    "index": 35,
    "vizKey": "W347",
    "worksheetName": "States",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[States]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "States"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Count<Distinct=True , UseLookupForAttributes=False >(State){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[States]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[States]",
      "tooltipShelf": [
        "[States]"
      ],
      "tableauCalculations": [
        "COUNTD([State])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"States\">\n  <table>\n    <rows>[States]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[States]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W352",
    "index": 36,
    "vizKey": "W352",
    "worksheetName": "Top States Loss",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[(Top State Loss+Top State Loss)]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "(Top State Loss+Top State Loss)"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[(Top State Loss+Top State Loss)]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Top State Loss]",
      "tooltipShelf": [
        "[(Top State Loss+Top State Loss)]"
      ],
      "tableauCalculations": [
        "SUM([(Top State Loss+Top State Loss)])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Top States Loss\">\n  <table>\n    <rows>[(Top State Loss+Top State Loss)]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Top State Loss]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W358",
    "index": 37,
    "vizKey": "W358",
    "worksheetName": "Incurred loss by state",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[State]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[State]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Incurred loss by state\">\n  <table>\n    <rows>[State]</rows>\n    <cols>[Total Incurred USD]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W365",
    "index": 38,
    "vizKey": "W365",
    "worksheetName": "Claim Volume by region",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Region]"
      ],
      "columns": [
        "[Count (Claim ID)]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Count (Claim ID)]"
      ],
      "rowsShelf": [
        "[Region]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Claim Volume by region\">\n  <table>\n    <rows>[Region]</rows>\n    <cols>[Count (Claim ID)]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W373",
    "index": 39,
    "vizKey": "W373",
    "worksheetName": "Incurred loss by region",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Bar Chart (Horizontal/Vertical Columns)",
    "mstrVisualType": "bar_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "bar_chart",
      "rows": [
        "[Region]"
      ],
      "columns": [
        "[Total Incurred USD]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Total Incurred USD]"
      ],
      "rowsShelf": [
        "[Region]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Incurred loss by region\">\n  <table>\n    <rows>[Region]</rows>\n    <cols>[Total Incurred USD]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W382",
    "index": 40,
    "vizKey": "W382",
    "worksheetName": "Claim volume by state",
    "chapter": "Claims Operations Report",
    "page": "Geography View",
    "chartType": "Text Cross-tab / Matrix Table",
    "mstrVisualType": "grid",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "grid",
      "rows": [
        "[State]"
      ],
      "columns": [
        "[Count (Claim ID)]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Count (Claim ID)]"
      ],
      "rowsShelf": [
        "[State]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\"Claim volume by state\">\n  <table>\n    <rows>[State]</rows>\n    <cols>[Count (Claim ID)]</cols>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W230",
    "index": 41,
    "vizKey": "W230",
    "worksheetName": "Top Adjusters by Workload with Avg Resolution Days",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "chartType": "Dual-Axis Combination Chart (Bars + Lines)",
    "mstrVisualType": "combo_chart",
    "markType": "Bar",
    "status": "SUCCESS",
    "mstr": {
      "type": "combo_chart",
      "rows": [
        "[Count (Claim ID)]",
        "[Avg_Claim_Resolution_Days]"
      ],
      "columns": [
        "[Adjuster Name]"
      ],
      "color": "[Adjuster Name]",
      "metrics": [
        "Claim Count",
        "Avg Resolution Days"
      ],
      "attributes": [
        "Adjuster Name"
      ],
      "mstrFormulas": [
        "Default Aggregation (SUM)",
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Bar",
      "columnsShelf": [
        "[Adjuster Name]"
      ],
      "rowsShelf": [
        "[Count (Claim ID)]",
        "[Avg_Claim_Resolution_Days]"
      ],
      "colorEncoding": "[Adjuster Name]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Claim Count]",
        "[Avg Resolution Days]"
      ],
      "tableauCalculations": [
        "SUM([Claim Count])",
        "SUM([Avg Resolution Days])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Top Adjusters by Workload with Avg Resolution Days\">\n  <table>\n    <rows>[Count (Claim ID)][Avg_Claim_Resolution_Days]</rows>\n    <cols>[Adjuster Name]</cols>\n    <encodings>\n    <color column=\"[Adjuster Name]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W231",
    "index": 42,
    "vizKey": "W231",
    "worksheetName": "Risk Lens: Avg Resolution Vs Fraud",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "chartType": "Scatter / Bubble Chart (X, Y, Size)",
    "mstrVisualType": "bubble_chart",
    "markType": "Circle",
    "status": "SUCCESS",
    "mstr": {
      "type": "bubble_chart",
      "rows": [
        "[Avg_Claim_Resolution_Days]"
      ],
      "columns": [
        "[Avg (Fraud Score)]"
      ],
      "color": "[Adjuster Name]",
      "metrics": [
        "Avg (Fraud Score)",
        "Avg Resolution Days",
        "Count (Claim ID)"
      ],
      "attributes": [
        "Adjuster Name"
      ],
      "mstrFormulas": [
        "Avg<UseLookupForAttributes=False >([Fraud Score]){~+}",
        "Default Aggregation (SUM)",
        "Count<UseLookupForAttributes=False >([Claim ID]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Circle",
      "columnsShelf": [
        "[Avg (Fraud Score)]"
      ],
      "rowsShelf": [
        "[Avg_Claim_Resolution_Days]"
      ],
      "colorEncoding": "[Adjuster Name]",
      "labelEncoding": null,
      "tooltipShelf": [
        "[Avg (Fraud Score)]",
        "[Avg Resolution Days]",
        "[Count (Claim ID)]"
      ],
      "tableauCalculations": [
        "AVG([Fraud Score])",
        "SUM([Avg Resolution Days])",
        "COUNT([Claim ID])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Risk Lens: Avg Resolution Vs Fraud\">\n  <table>\n    <rows>[Avg_Claim_Resolution_Days]</rows>\n    <cols>[Avg (Fraud Score)]</cols>\n    <encodings>\n    <color column=\"[Adjuster Name]\" /> <!-- Color shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W232",
    "index": 43,
    "vizKey": "W232",
    "worksheetName": "Total Adjusters",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Count (Adjuster Name)]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Count (Adjuster Name)"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Count<Distinct=True , UseLookupForAttributes=False >([Adjuster Name]){~+}"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Count (Adjuster Name)]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Count (Adjuster Name)]",
      "tooltipShelf": [
        "[Count (Adjuster Name)]"
      ],
      "tableauCalculations": [
        "COUNTD([Adjuster Name])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Total Adjusters\">\n  <table>\n    <rows>[Count (Adjuster Name)]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Count (Adjuster Name)]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-W233",
    "index": 44,
    "vizKey": "W233",
    "worksheetName": "Avg Resolution",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "chartType": "Text Mark / KPI Big Number Card",
    "mstrVisualType": "kpi",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "kpi",
      "rows": [
        "[Avg Resolution]"
      ],
      "columns": [],
      "color": null,
      "metrics": [
        "Avg Resolution"
      ],
      "attributes": [],
      "mstrFormulas": [
        "Default Aggregation (SUM)"
      ],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [],
      "rowsShelf": [
        "[Avg Resolution]"
      ],
      "colorEncoding": null,
      "labelEncoding": "[Avg_Claim_Resolution_Days]",
      "tooltipShelf": [
        "[Avg Resolution]"
      ],
      "tableauCalculations": [
        "SUM([Avg Resolution])"
      ],
      "worksheetXmlSpec": "<worksheet name=\"Avg Resolution\">\n  <table>\n    <rows>[Avg Resolution]</rows>\n    <cols></cols>\n    <encodings>\n    <text column=\"[Avg_Claim_Resolution_Days]\" /> <!-- Label shelf -->\n    </encodings>\n  </table>\n</worksheet>"
    }
  },
  {
    "id": "vis-8CA503E3FAA940EE89C5D2678C6BB2DB",
    "index": 45,
    "vizKey": "8CA503E3FAA940EE89C5D2678C6BB2DB",
    "worksheetName": " Workload By Adjusters",
    "chapter": "Claims Operations Report",
    "page": "Adjuster Performance View",
    "chartType": "Sparkline / Trend Line Matrix Table",
    "mstrVisualType": "microcharts",
    "markType": "Text",
    "status": "SUCCESS",
    "mstr": {
      "type": "microcharts",
      "rows": [
        "[Adjuster Name]"
      ],
      "columns": [
        "[Count (Claim ID)]",
        "[Avg_Claim_Resolution_Days]"
      ],
      "color": null,
      "metrics": [],
      "attributes": [],
      "mstrFormulas": [],
      "sampleRaw": "N/A (Multi-row)",
      "sampleFormatted": "N/A (Multi-row)"
    },
    "tableau": {
      "markType": "Text",
      "columnsShelf": [
        "[Count (Claim ID)]",
        "[Avg_Claim_Resolution_Days]"
      ],
      "rowsShelf": [
        "[Adjuster Name]"
      ],
      "colorEncoding": null,
      "labelEncoding": null,
      "tooltipShelf": [],
      "tableauCalculations": [],
      "worksheetXmlSpec": "<worksheet name=\" Workload By Adjusters\">\n  <table>\n    <rows>[Adjuster Name]</rows>\n    <cols>[Count (Claim ID)][Avg_Claim_Resolution_Days]</cols>\n  </table>\n</worksheet>"
    }
  }
];
