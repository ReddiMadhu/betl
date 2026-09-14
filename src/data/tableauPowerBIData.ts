/**
 * Static data for Tableau → Power BI migration wizard
 * Mirrors the response shapes from tb-bi backend API
 */

/* ── Workbook Metadata (from /migration/:id/workbooks) ── */
export interface TbPbiWorksheet {
  name: string;
  title: string;
  chartType: string;
  dimensions: string[];
  measures: string[];
  filters: string[];
  datasource: string;
}

export interface TbPbiCalculatedField {
  name: string;
  caption: string;
  formula: string;
  role: 'measure' | 'dimension';
  datatype: string;
  workbook: string;
}

export interface TbPbiDataTable {
  displayName: string;
  rowCount: number;
  columnDetails: { name: string; dataType: string; sampleValues: string[] }[];
}

export interface TbPbiRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: string;
}

export interface TbPbiDaxConversion {
  id: string;
  fieldName: string;
  sourceFormula: string;
  daxFormula: string;
  confidence: number;
  status: 'valid' | 'warning' | 'error';
  warnings: string[];
  category: string;
}

export interface TbPbiExportArtifact {
  id: string;
  fileName: string;
  type: 'excel' | 'bim' | 'data' | 'readme';
  description: string;
  size: string;
}

/* ── Summary Counts ── */
export const tbPbiSummary = {
  totalDashboards: 3,
  totalWorksheets: 12,
  totalTables: 8,
  totalCalculatedFields: 24,
  totalParameters: 4,
  totalMeasures: 18,
};

/* ── Worksheets ── */
export const tbPbiWorksheets: TbPbiWorksheet[] = [
  {
    name: 'Claims Overview',
    title: 'Claims Overview Dashboard',
    chartType: 'Stacked Bar',
    dimensions: ['State', 'Claim Type', 'Policy Year'],
    measures: ['Total Claims', 'Average Severity', 'Claim Count'],
    filters: ['Date Range', 'Business Unit'],
    datasource: 'Claims_DataSource',
  },
  {
    name: 'Agent Performance',
    title: 'Agent Performance Scorecard',
    chartType: 'Heat Map',
    dimensions: ['Agent Name', 'Region', 'Quarter'],
    measures: ['Resolution Rate', 'Avg Handle Time', 'Customer Score'],
    filters: ['Department', 'Tenure Band'],
    datasource: 'HR_DataSource',
  },
  {
    name: 'Loss Ratio Trend',
    title: 'Loss Ratio Trend Analysis',
    chartType: 'Line Chart',
    dimensions: ['Month', 'LOB', 'Underwriter'],
    measures: ['Earned Premium', 'Incurred Loss', 'Loss Ratio'],
    filters: ['Year', 'Region'],
    datasource: 'Financial_DataSource',
  },
  {
    name: 'Reserve Adequacy',
    title: 'Reserve Adequacy Heat Map',
    chartType: 'Treemap',
    dimensions: ['Reserve Category', 'Accident Year', 'Development Period'],
    measures: ['IBNR Reserve', 'Case Reserve', 'Paid to Date'],
    filters: ['Valuation Date'],
    datasource: 'Actuarial_DataSource',
  },
  {
    name: 'Premium Distribution',
    title: 'Premium Distribution by Geography',
    chartType: 'Map',
    dimensions: ['State', 'ZIP Code', 'Territory'],
    measures: ['Written Premium', 'Policy Count', 'Avg Premium'],
    filters: ['Product Line', 'Effective Year'],
    datasource: 'Underwriting_DataSource',
  },
  {
    name: 'SLA Compliance',
    title: 'Service Level Agreement Dashboard',
    chartType: 'Gauge',
    dimensions: ['Service Type', 'Priority Level'],
    measures: ['SLA Met %', 'Avg Response Time', 'Breached Count'],
    filters: ['Date Range', 'Team'],
    datasource: 'Operations_DataSource',
  },
  {
    name: 'Fraud Detection',
    title: 'Fraud Indicator Analysis',
    chartType: 'Scatter Plot',
    dimensions: ['Claim ID', 'Indicator Type', 'Risk Score Band'],
    measures: ['Fraud Score', 'Claim Amount', 'Investigation Cost'],
    filters: ['Score Threshold', 'Investigation Status'],
    datasource: 'Claims_DataSource',
  },
  {
    name: 'Subrogation Recovery',
    title: 'Subrogation Recovery Tracking',
    chartType: 'Waterfall',
    dimensions: ['Recovery Stage', 'Quarter', 'Vendor'],
    measures: ['Amount Recovered', 'Outstanding Balance', 'Recovery Rate'],
    filters: ['Claim Type', 'Attorney Involved'],
    datasource: 'Financial_DataSource',
  },
  {
    name: 'Customer Retention',
    title: 'Policyholder Retention Analysis',
    chartType: 'Funnel',
    dimensions: ['Tenure Group', 'Product Bundle', 'Channel'],
    measures: ['Retention Rate', 'Lapse Count', 'Win-Back Rate'],
    filters: ['Renewal Period', 'Discount Applied'],
    datasource: 'CRM_DataSource',
  },
  {
    name: 'Underwriting Profitability',
    title: 'Underwriting P&L by Segment',
    chartType: 'Grouped Bar',
    dimensions: ['Segment', 'Line of Business', 'Year'],
    measures: ['Combined Ratio', 'Expense Ratio', 'Net Income'],
    filters: ['Region', 'Policy Size Band'],
    datasource: 'Financial_DataSource',
  },
  {
    name: 'Claims Cycle Time',
    title: 'End-to-End Claims Processing',
    chartType: 'Box Plot',
    dimensions: ['Claim Type', 'Complexity', 'Handler'],
    measures: ['Days to Close', 'Touch Points', 'Reopen Count'],
    filters: ['Status', 'Quarter'],
    datasource: 'Claims_DataSource',
  },
  {
    name: 'Catastrophe Impact',
    title: 'CAT Event Impact Dashboard',
    chartType: 'Dual Axis',
    dimensions: ['Event Name', 'State', 'Peril Type'],
    measures: ['CAT Losses', 'Policy Count Affected', 'Reinsurance Recovery'],
    filters: ['Event Year', 'Severity Category'],
    datasource: 'Actuarial_DataSource',
  },
];

/* ── Calculated Fields ── */
export const tbPbiCalculatedFields: TbPbiCalculatedField[] = [
  { name: 'Loss Ratio', caption: 'Loss Ratio', formula: 'SUM([Incurred Loss]) / SUM([Earned Premium])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Combined Ratio', caption: 'Combined Ratio', formula: '[Loss Ratio] + [Expense Ratio]', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Severity Index', caption: 'Severity Index', formula: 'SUM([Paid Loss]) / COUNTD([Claim ID])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Resolution Rate', caption: 'Resolution Rate', formula: 'COUNTD(IF [Status] = "Closed" THEN [Claim ID] END) / COUNTD([Claim ID])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'YoY Growth', caption: 'Year over Year Growth', formula: '(ZN(SUM([Current Year Premium])) - ZN(SUM([Prior Year Premium]))) / ZN(SUM([Prior Year Premium]))', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Running Total Claims', caption: 'Running Total Claims', formula: 'RUNNING_SUM(SUM([Claim Count]))', role: 'measure', datatype: 'INT', workbook: 'Claims_Analytics.twbx' },
  { name: 'Fraud Score Band', caption: 'Fraud Score Band', formula: 'IF [Fraud Score] >= 80 THEN "High" ELSEIF [Fraud Score] >= 50 THEN "Medium" ELSE "Low" END', role: 'dimension', datatype: 'STRING', workbook: 'Claims_Analytics.twbx' },
  { name: 'Agent Tenure', caption: 'Agent Tenure Band', formula: 'IF DATEDIFF(\'year\', [Hire Date], TODAY()) > 5 THEN "Senior" ELSEIF DATEDIFF(\'year\', [Hire Date], TODAY()) > 2 THEN "Mid" ELSE "Junior" END', role: 'dimension', datatype: 'STRING', workbook: 'Claims_Analytics.twbx' },
  { name: 'Recovery Efficiency', caption: 'Recovery Efficiency', formula: 'SUM([Recovered Amount]) / SUM([Subrogation Potential])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Days Open', caption: 'Days Open', formula: 'DATEDIFF(\'day\', [Open Date], IFNULL([Close Date], TODAY()))', role: 'measure', datatype: 'INT', workbook: 'Claims_Analytics.twbx' },
  { name: 'SLA Met Flag', caption: 'SLA Met', formula: 'IF [Days Open] <= [SLA Target Days] THEN "Met" ELSE "Breached" END', role: 'dimension', datatype: 'STRING', workbook: 'Claims_Analytics.twbx' },
  { name: 'Weighted Severity', caption: 'Weighted Severity', formula: 'SUM([Paid Loss] * [Weight Factor]) / SUM([Weight Factor])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'IBNR Factor', caption: 'IBNR Development Factor', formula: '{FIXED [Accident Year], [Development Period] : AVG([Development Factor])}', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'LOD Avg Premium', caption: 'LOD Avg Premium per State', formula: '{FIXED [State] : AVG([Written Premium])}', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Retention Rate', caption: 'Retention Rate', formula: 'COUNTD(IF [Renewed] = TRUE THEN [Policy ID] END) / COUNTD([Policy ID])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Net Promoter Score', caption: 'NPS Category', formula: 'IF [Survey Score] >= 9 THEN "Promoter" ELSEIF [Survey Score] >= 7 THEN "Passive" ELSE "Detractor" END', role: 'dimension', datatype: 'STRING', workbook: 'Claims_Analytics.twbx' },
  { name: 'Premium Adequacy', caption: 'Premium Adequacy Index', formula: 'SUM([Earned Premium]) / (SUM([Incurred Loss]) + SUM([Expense]))', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Expense Ratio', caption: 'Expense Ratio', formula: 'SUM([Underwriting Expense]) / SUM([Earned Premium])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Claim Frequency', caption: 'Claim Frequency', formula: 'COUNTD([Claim ID]) / SUM([Exposure Units])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Triangulation Cumulative', caption: 'Cumulative Paid', formula: 'RUNNING_SUM(SUM([Incremental Paid]))', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Reinsurance Net', caption: 'Net of Reinsurance', formula: 'SUM([Gross Loss]) - SUM([Ceded Loss])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'Handler Workload', caption: 'Handler Active Caseload', formula: '{FIXED [Handler ID] : COUNTD(IF [Status] = "Open" THEN [Claim ID] END)}', role: 'measure', datatype: 'INT', workbook: 'Claims_Analytics.twbx' },
  { name: 'Win Back Rate', caption: 'Win-Back Conversion Rate', formula: 'COUNTD(IF [Lapsed] = TRUE AND [Reinstated] = TRUE THEN [Policy ID] END) / COUNTD(IF [Lapsed] = TRUE THEN [Policy ID] END)', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
  { name: 'CAT Loading', caption: 'Catastrophe Loading Factor', formula: 'SUM(IF [Is CAT] = TRUE THEN [Incurred Loss] END) / SUM([Incurred Loss])', role: 'measure', datatype: 'REAL', workbook: 'Claims_Analytics.twbx' },
];

/* ── Data Tables ── */
export const tbPbiDataTables: TbPbiDataTable[] = [
  {
    displayName: 'Claims_Fact',
    rowCount: 125847,
    columnDetails: [
      { name: 'Claim_ID', dataType: 'VARCHAR', sampleValues: ['CLM-2024-001', 'CLM-2024-002', 'CLM-2024-003'] },
      { name: 'Policy_ID', dataType: 'VARCHAR', sampleValues: ['POL-88291', 'POL-88292', 'POL-88293'] },
      { name: 'Incurred_Date', dataType: 'DATE', sampleValues: ['2024-01-15', '2024-01-16', '2024-01-17'] },
      { name: 'Paid_Amount', dataType: 'DECIMAL', sampleValues: ['12500.00', '8750.50', '45200.00'] },
      { name: 'Status', dataType: 'VARCHAR', sampleValues: ['Open', 'Closed', 'Reserved'] },
    ],
  },
  {
    displayName: 'Policy_Dim',
    rowCount: 45230,
    columnDetails: [
      { name: 'Policy_ID', dataType: 'VARCHAR', sampleValues: ['POL-88291', 'POL-88292', 'POL-88293'] },
      { name: 'Effective_Date', dataType: 'DATE', sampleValues: ['2023-01-01', '2023-06-15', '2024-01-01'] },
      { name: 'Premium', dataType: 'DECIMAL', sampleValues: ['2450.00', '3100.00', '1890.50'] },
      { name: 'Line_of_Business', dataType: 'VARCHAR', sampleValues: ['Auto', 'Property', 'GL'] },
    ],
  },
  {
    displayName: 'Agent_Dim',
    rowCount: 342,
    columnDetails: [
      { name: 'Agent_ID', dataType: 'VARCHAR', sampleValues: ['AGT-101', 'AGT-102', 'AGT-103'] },
      { name: 'Agent_Name', dataType: 'VARCHAR', sampleValues: ['Sarah Chen', 'James Wilson', 'Maria Santos'] },
      { name: 'Region', dataType: 'VARCHAR', sampleValues: ['Northeast', 'Southeast', 'West'] },
      { name: 'Hire_Date', dataType: 'DATE', sampleValues: ['2019-03-15', '2021-07-01', '2018-11-20'] },
    ],
  },
  {
    displayName: 'Date_Dim',
    rowCount: 3652,
    columnDetails: [
      { name: 'Date_Key', dataType: 'INT', sampleValues: ['20240101', '20240102', '20240103'] },
      { name: 'Full_Date', dataType: 'DATE', sampleValues: ['2024-01-01', '2024-01-02', '2024-01-03'] },
      { name: 'Quarter', dataType: 'VARCHAR', sampleValues: ['Q1', 'Q1', 'Q1'] },
      { name: 'Fiscal_Year', dataType: 'INT', sampleValues: ['2024', '2024', '2024'] },
    ],
  },
  {
    displayName: 'Geography_Dim',
    rowCount: 1247,
    columnDetails: [
      { name: 'State', dataType: 'VARCHAR', sampleValues: ['California', 'Texas', 'New York'] },
      { name: 'Territory', dataType: 'VARCHAR', sampleValues: ['T-001', 'T-042', 'T-018'] },
      { name: 'ZIP_Code', dataType: 'VARCHAR', sampleValues: ['90210', '75001', '10001'] },
    ],
  },
  {
    displayName: 'Financial_Fact',
    rowCount: 89540,
    columnDetails: [
      { name: 'Transaction_ID', dataType: 'VARCHAR', sampleValues: ['TXN-001', 'TXN-002', 'TXN-003'] },
      { name: 'Earned_Premium', dataType: 'DECIMAL', sampleValues: ['1250.00', '3400.00', '890.50'] },
      { name: 'Incurred_Loss', dataType: 'DECIMAL', sampleValues: ['750.00', '2100.00', '430.25'] },
      { name: 'Expense', dataType: 'DECIMAL', sampleValues: ['312.50', '850.00', '222.63'] },
    ],
  },
  {
    displayName: 'Reinsurance_Fact',
    rowCount: 15230,
    columnDetails: [
      { name: 'Treaty_ID', dataType: 'VARCHAR', sampleValues: ['RE-2024-A', 'RE-2024-B', 'RE-2024-C'] },
      { name: 'Ceded_Premium', dataType: 'DECIMAL', sampleValues: ['500000.00', '750000.00', '320000.00'] },
      { name: 'Ceded_Loss', dataType: 'DECIMAL', sampleValues: ['280000.00', '510000.00', '190000.00'] },
    ],
  },
  {
    displayName: 'Survey_Response',
    rowCount: 28450,
    columnDetails: [
      { name: 'Response_ID', dataType: 'VARCHAR', sampleValues: ['SRV-001', 'SRV-002', 'SRV-003'] },
      { name: 'Survey_Score', dataType: 'INT', sampleValues: ['9', '7', '4'] },
      { name: 'Channel', dataType: 'VARCHAR', sampleValues: ['Online', 'Phone', 'Agent'] },
    ],
  },
];

/* ── Table Relationships ── */
export const tbPbiRelationships: TbPbiRelationship[] = [
  { fromTable: 'Claims_Fact', fromColumn: 'Policy_ID', toTable: 'Policy_Dim', toColumn: 'Policy_ID', type: 'Many-to-One' },
  { fromTable: 'Claims_Fact', fromColumn: 'Agent_ID', toTable: 'Agent_Dim', toColumn: 'Agent_ID', type: 'Many-to-One' },
  { fromTable: 'Claims_Fact', fromColumn: 'Incurred_Date', toTable: 'Date_Dim', toColumn: 'Full_Date', type: 'Many-to-One' },
  { fromTable: 'Claims_Fact', fromColumn: 'State', toTable: 'Geography_Dim', toColumn: 'State', type: 'Many-to-One' },
  { fromTable: 'Financial_Fact', fromColumn: 'Policy_ID', toTable: 'Policy_Dim', toColumn: 'Policy_ID', type: 'Many-to-One' },
  { fromTable: 'Financial_Fact', fromColumn: 'Date_Key', toTable: 'Date_Dim', toColumn: 'Date_Key', type: 'Many-to-One' },
  { fromTable: 'Reinsurance_Fact', fromColumn: 'Policy_ID', toTable: 'Policy_Dim', toColumn: 'Policy_ID', type: 'Many-to-One' },
  { fromTable: 'Survey_Response', fromColumn: 'Policy_ID', toTable: 'Policy_Dim', toColumn: 'Policy_ID', type: 'Many-to-One' },
];

/* ── DAX Conversions ── */
export const tbPbiDaxConversions: TbPbiDaxConversion[] = [
  {
    id: 'dax-1', fieldName: 'Loss Ratio', category: 'Aggregation',
    sourceFormula: 'SUM([Incurred Loss]) / SUM([Earned Premium])',
    daxFormula: 'Loss Ratio = DIVIDE(SUM(Financial_Fact[Incurred_Loss]), SUM(Financial_Fact[Earned_Premium]), 0)',
    confidence: 98, status: 'valid', warnings: [],
  },
  {
    id: 'dax-2', fieldName: 'Combined Ratio', category: 'Derived',
    sourceFormula: '[Loss Ratio] + [Expense Ratio]',
    daxFormula: 'Combined Ratio = [Loss Ratio] + [Expense Ratio]',
    confidence: 99, status: 'valid', warnings: [],
  },
  {
    id: 'dax-3', fieldName: 'Severity Index', category: 'Aggregation',
    sourceFormula: 'SUM([Paid Loss]) / COUNTD([Claim ID])',
    daxFormula: 'Severity Index = DIVIDE(SUM(Claims_Fact[Paid_Amount]), DISTINCTCOUNT(Claims_Fact[Claim_ID]), 0)',
    confidence: 97, status: 'valid', warnings: [],
  },
  {
    id: 'dax-4', fieldName: 'Resolution Rate', category: 'Conditional',
    sourceFormula: 'COUNTD(IF [Status] = "Closed" THEN [Claim ID] END) / COUNTD([Claim ID])',
    daxFormula: 'Resolution Rate = DIVIDE(CALCULATE(DISTINCTCOUNT(Claims_Fact[Claim_ID]), Claims_Fact[Status] = "Closed"), DISTINCTCOUNT(Claims_Fact[Claim_ID]), 0)',
    confidence: 95, status: 'valid', warnings: [],
  },
  {
    id: 'dax-5', fieldName: 'YoY Growth', category: 'Time Intelligence',
    sourceFormula: '(ZN(SUM([Current Year Premium])) - ZN(SUM([Prior Year Premium]))) / ZN(SUM([Prior Year Premium]))',
    daxFormula: 'YoY Growth = VAR _current = SUM(Policy_Dim[Premium])\nVAR _prior = CALCULATE(SUM(Policy_Dim[Premium]), SAMEPERIODLASTYEAR(Date_Dim[Full_Date]))\nRETURN DIVIDE(_current - _prior, _prior, 0)',
    confidence: 88, status: 'warning', warnings: ['Time intelligence requires Date table relationship'],
  },
  {
    id: 'dax-6', fieldName: 'Running Total Claims', category: 'Table Calc',
    sourceFormula: 'RUNNING_SUM(SUM([Claim Count]))',
    daxFormula: 'Running Total Claims = CALCULATE(SUM(Claims_Fact[Claim_Count]), FILTER(ALL(Date_Dim[Full_Date]), Date_Dim[Full_Date] <= MAX(Date_Dim[Full_Date])))',
    confidence: 82, status: 'warning', warnings: ['Running total context depends on visual axis; verify filter context'],
  },
  {
    id: 'dax-7', fieldName: 'Fraud Score Band', category: 'Conditional',
    sourceFormula: 'IF [Fraud Score] >= 80 THEN "High" ELSEIF [Fraud Score] >= 50 THEN "Medium" ELSE "Low" END',
    daxFormula: 'Fraud Score Band = SWITCH(TRUE(), Claims_Fact[Fraud_Score] >= 80, "High", Claims_Fact[Fraud_Score] >= 50, "Medium", "Low")',
    confidence: 99, status: 'valid', warnings: [],
  },
  {
    id: 'dax-8', fieldName: 'Agent Tenure Band', category: 'Date Calc',
    sourceFormula: 'IF DATEDIFF(\'year\', [Hire Date], TODAY()) > 5 THEN "Senior" ELSEIF DATEDIFF(\'year\', [Hire Date], TODAY()) > 2 THEN "Mid" ELSE "Junior" END',
    daxFormula: 'Agent Tenure Band = VAR _years = DATEDIFF(Agent_Dim[Hire_Date], TODAY(), YEAR)\nRETURN SWITCH(TRUE(), _years > 5, "Senior", _years > 2, "Mid", "Junior")',
    confidence: 96, status: 'valid', warnings: [],
  },
  {
    id: 'dax-9', fieldName: 'Recovery Efficiency', category: 'Aggregation',
    sourceFormula: 'SUM([Recovered Amount]) / SUM([Subrogation Potential])',
    daxFormula: 'Recovery Efficiency = DIVIDE(SUM(Claims_Fact[Recovered_Amount]), SUM(Claims_Fact[Subrogation_Potential]), 0)',
    confidence: 98, status: 'valid', warnings: [],
  },
  {
    id: 'dax-10', fieldName: 'Days Open', category: 'Date Calc',
    sourceFormula: 'DATEDIFF(\'day\', [Open Date], IFNULL([Close Date], TODAY()))',
    daxFormula: 'Days Open = DATEDIFF(Claims_Fact[Open_Date], IF(ISBLANK(Claims_Fact[Close_Date]), TODAY(), Claims_Fact[Close_Date]), DAY)',
    confidence: 97, status: 'valid', warnings: [],
  },
  {
    id: 'dax-11', fieldName: 'IBNR Development Factor', category: 'LOD Expression',
    sourceFormula: '{FIXED [Accident Year], [Development Period] : AVG([Development Factor])}',
    daxFormula: 'IBNR Development Factor = CALCULATE(AVERAGE(Claims_Fact[Development_Factor]), ALLEXCEPT(Claims_Fact, Claims_Fact[Accident_Year], Claims_Fact[Development_Period]))',
    confidence: 85, status: 'warning', warnings: ['LOD FIXED expression: verify ALLEXCEPT filter context matches Tableau behavior'],
  },
  {
    id: 'dax-12', fieldName: 'LOD Avg Premium per State', category: 'LOD Expression',
    sourceFormula: '{FIXED [State] : AVG([Written Premium])}',
    daxFormula: 'LOD Avg Premium per State = CALCULATE(AVERAGE(Policy_Dim[Premium]), ALLEXCEPT(Geography_Dim, Geography_Dim[State]))',
    confidence: 87, status: 'warning', warnings: ['LOD FIXED expression translated with ALLEXCEPT; validate cross-filter direction'],
  },
  {
    id: 'dax-13', fieldName: 'Retention Rate', category: 'Conditional',
    sourceFormula: 'COUNTD(IF [Renewed] = TRUE THEN [Policy ID] END) / COUNTD([Policy ID])',
    daxFormula: 'Retention Rate = DIVIDE(CALCULATE(DISTINCTCOUNT(Policy_Dim[Policy_ID]), Policy_Dim[Renewed] = TRUE()), DISTINCTCOUNT(Policy_Dim[Policy_ID]), 0)',
    confidence: 96, status: 'valid', warnings: [],
  },
  {
    id: 'dax-14', fieldName: 'Expense Ratio', category: 'Aggregation',
    sourceFormula: 'SUM([Underwriting Expense]) / SUM([Earned Premium])',
    daxFormula: 'Expense Ratio = DIVIDE(SUM(Financial_Fact[Expense]), SUM(Financial_Fact[Earned_Premium]), 0)',
    confidence: 98, status: 'valid', warnings: [],
  },
  {
    id: 'dax-15', fieldName: 'Claim Frequency', category: 'Aggregation',
    sourceFormula: 'COUNTD([Claim ID]) / SUM([Exposure Units])',
    daxFormula: 'Claim Frequency = DIVIDE(DISTINCTCOUNT(Claims_Fact[Claim_ID]), SUM(Policy_Dim[Exposure_Units]), 0)',
    confidence: 94, status: 'valid', warnings: [],
  },
  {
    id: 'dax-16', fieldName: 'Net of Reinsurance', category: 'Aggregation',
    sourceFormula: 'SUM([Gross Loss]) - SUM([Ceded Loss])',
    daxFormula: 'Net of Reinsurance = SUM(Claims_Fact[Gross_Loss]) - SUM(Reinsurance_Fact[Ceded_Loss])',
    confidence: 93, status: 'warning', warnings: ['Cross-table reference: ensure relationship exists between Claims_Fact and Reinsurance_Fact'],
  },
  {
    id: 'dax-17', fieldName: 'Handler Active Caseload', category: 'LOD Expression',
    sourceFormula: '{FIXED [Handler ID] : COUNTD(IF [Status] = "Open" THEN [Claim ID] END)}',
    daxFormula: 'Handler Active Caseload = CALCULATE(DISTINCTCOUNT(Claims_Fact[Claim_ID]), Claims_Fact[Status] = "Open", ALLEXCEPT(Claims_Fact, Claims_Fact[Handler_ID]))',
    confidence: 84, status: 'warning', warnings: ['LOD FIXED with conditional: verify ALLEXCEPT context'],
  },
  {
    id: 'dax-18', fieldName: 'CAT Loading Factor', category: 'Conditional',
    sourceFormula: 'SUM(IF [Is CAT] = TRUE THEN [Incurred Loss] END) / SUM([Incurred Loss])',
    daxFormula: 'CAT Loading Factor = DIVIDE(CALCULATE(SUM(Claims_Fact[Incurred_Loss]), Claims_Fact[Is_CAT] = TRUE()), SUM(Claims_Fact[Incurred_Loss]), 0)',
    confidence: 97, status: 'valid', warnings: [],
  },
];

/* ── Export Artifacts ── */
export const tbPbiExportArtifacts: TbPbiExportArtifact[] = [
  { id: 'exp-1', fileName: 'migration_report.xlsx', type: 'excel', description: 'DAX Conversions, Worksheet Analysis, Tables & Columns, Table Relationships', size: '2.4 MB' },
  { id: 'exp-2', fileName: 'model.bim', type: 'bim', description: 'Tabular Model for import via Tabular Editor', size: '156 KB' },
  { id: 'exp-3', fileName: 'table_data/', type: 'data', description: 'Excel extracts from Tableau data sources', size: '18.7 MB' },
  { id: 'exp-4', fileName: 'README.txt', type: 'readme', description: 'Migration summary & import guide', size: '4 KB' },
];
