import type { LucideIcon } from 'lucide-react';
import { FileInput, FileOutput, Cpu } from 'lucide-react';

export interface AlteryxTool {
  id: string;
  name: string;
  category: 'Input' | 'Preparation' | 'Join' | 'Parse' | 'Transform' | 'Output' | 'Control' | string;
  description: string;
  configuration: string;
  status: 'valid' | 'warning' | 'error';
}

export interface ConnectionInfo {
  id: string;
  name: string;
  type: string;
  details: string;
  direction: 'input' | 'output';
}

export interface PipelineStage {
  id: string;
  label: string;
  tools: number;
  icon: LucideIcon;
  color: string;
}

export interface AlteryxDetailData {
  tools: AlteryxTool[];
  connections: ConnectionInfo[];
  pipelineStages: PipelineStage[];
  connectionCount?: number;
  schedule: string;
  lastRunStatus: string;
  avgRuntime: string;
  complexity?: 'Low' | 'Medium' | 'High';
  criticality?: 'Low' | 'Medium' | 'High';
}

export const ALTERYX_DETAIL_DATA: Record<string, AlteryxDetailData> = {
  c10: {
    tools: [
      { id: 't1', name: 'Input Data', category: 'Input', description: 'Reads the claims volume Excel workbook.', configuration: '.\\Data\\Claims_Volume_Extract_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't2', name: 'Block Until Done', category: 'Preparation', description: 'Reads the workbook once, then fans out to downstream branches.', configuration: 'Sequential branch execution', status: 'valid' },
      { id: 't3', name: 'Summarize', category: 'Transform', description: 'Claims volume by quarter and status.', configuration: 'Quarter End Date:GroupBy;Claim Status:GroupBy;Claim Number:CountDistinct', status: 'valid' },
      { id: 't4', name: 'Cross Tab', category: 'Transform', description: 'Pivots claim status counts by quarter.', configuration: 'GroupField: Quarter End Date\nHeaderField: Claim Status\nDataField: CountDistinct_Claim Number\nMethod: Sum', status: 'valid' },
      { id: 't5', name: 'Select', category: 'Preparation', description: 'Selects the required historical summary fields.', configuration: 'Quarter End Date;Preclaim;Active_Pending;Approved;Stable_and_Mature', status: 'valid' },
      { id: 't6', name: 'Sort', category: 'Preparation', description: 'Sorts quarters in descending order.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't7', name: 'Browse', category: 'Output', description: 'Previews the quarterly claims summary.', configuration: 'Temp\\Demo_Claims_Quarter_Summary.yxdb', status: 'valid' },
      { id: 't8', name: 'Summarize', category: 'Transform', description: 'Claims volume by manager and examiner.', configuration: 'Quarter End Date:GroupBy;Claim Status:GroupBy;Manager:GroupBy;Examiner:GroupBy;Claim Number:CountDistinct', status: 'valid' },
      { id: 't9', name: 'Summarize', category: 'Transform', description: 'Finds the most recent quarter end date.', configuration: 'Quarter End Date:Max', status: 'valid' },
      { id: 't10', name: 'Join', category: 'Join', description: 'Keeps records matching the most recent quarter.', configuration: 'LeftField: Quarter End Date\nRightField: Last Quarter', status: 'valid' },
      { id: 't11', name: 'Cross Tab', category: 'Transform', description: 'Creates manager/examiner status columns.', configuration: 'GroupField: Quarter End Date;Manager;Examiner\nHeaderField: Claim Status\nDataField: CountDistinct_Claim Number\nMethod: Sum', status: 'valid' },
      { id: 't12', name: 'Select', category: 'Preparation', description: 'Selects final manager/examiner summary fields.', configuration: 'Quarter End Date;Manager;Examiner;Preclaim;Active_Pending;Approved;Stable_and_Mature', status: 'valid' },
      { id: 't13', name: 'Sort', category: 'Preparation', description: 'Sorts the manager/examiner output by quarter.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't14', name: 'Browse', category: 'Output', description: 'Previews the latest-quarter team summary.', configuration: 'Temp\\Demo_Claims_Team_LastQuarter.yxdb', status: 'valid' },
      { id: 't15', name: 'Select', category: 'Preparation', description: 'Selects claim-level detail fields.', configuration: 'Quarter End Date;Claim Number;Policy Number;Team;Manager;Examiner;Claim Status;Disability Date;ICD1Code;ICD1Description;ICD1GroupName', status: 'valid' },
      { id: 't16', name: 'Sort', category: 'Preparation', description: 'Sorts claim-level detail by quarter.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't17', name: 'Output Data', category: 'Output', description: 'Writes claim-level detail to Excel.', configuration: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail', status: 'valid' },
      { id: 't18', name: 'Output Data', category: 'Output', description: 'Writes the quarter/status summary to Excel.', configuration: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary', status: 'valid' },
      { id: 't101', name: 'Input Data', category: 'Input', description: 'Reads Policy Master attributes.', configuration: '.\\Data\\Policy_Master_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't102', name: 'Input Data', category: 'Input', description: 'Reads claim payment transaction history.', configuration: '.\\Data\\Claim_Payments_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't103', name: 'Input Data', category: 'Input', description: 'Reads Adjuster Diary notes.', configuration: '.\\Data\\Claim_Diary_Notes_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't104', name: 'Summarize', category: 'Transform', description: 'Rolls payment transactions up to one row per claim.', configuration: 'Payment Amount:Sum:Total Paid;Payment Amount:Count:Payment Count;Claim Number:GroupBy:Claim Number', status: 'valid' },
      { id: 't111', name: 'Join', category: 'Join', description: 'Enriches claims with Policy attributes.', configuration: 'LeftField: Policy Number\nRightField: Policy Number', status: 'valid' },
      { id: 't112', name: 'Join', category: 'Join', description: 'Enriches claims with payment summary.', configuration: 'LeftField: Claim Number\nRightField: Claim Number', status: 'valid' },
      { id: 't113', name: 'Union', category: 'Join', description: 'Combines matched and unmatched claim records.', configuration: 'Auto Config by Name', status: 'valid' },
      { id: 't114', name: 'Formula', category: 'Transform', description: 'Fills missing payment values with zero.', configuration: 'Total Paid=if isnull([Total Paid]) then 0 else [Total Paid] endif;\nPayment Count=if isnull([Payment Count]) then 0 else [Payment Count] endif', status: 'valid' },
      { id: 't115', name: 'Join', category: 'Join', description: 'Attaches Adjuster Diary notes to claims.', configuration: 'LeftField: Claim Number\nRightField: Claim Number', status: 'valid' },
      { id: 't116', name: 'Union', category: 'Join', description: 'Combines claims with and without diary entries.', configuration: 'Auto Config by Name', status: 'valid' },
      { id: 't117', name: 'Formula', category: 'Transform', description: 'Normalizes litigation/reopened flags and calculates days since activity.', configuration: "Litigation Flag=if isnull([Litigation Flag]) then 'N' else [Litigation Flag] endif;\nReopened Flag=if isnull([Reopened Flag]) then 'N' else [Reopened Flag] endif;\nDays Since Last Activity=if isnull([Last Activity Date]) then Null() else DateTimeDiff(DateTimeToday(),[Last Activity Date],'days') endif", status: 'valid' },
      { id: 't118', name: 'Formula', category: 'Transform', description: 'Assigns an aging bucket based on days since last activity.', configuration: "Aging Bucket=if isnull([Days Since Last Activity]) then 'No Diary Activity' elseif [Days Since Last Activity] > 90 then '90+ Days' elseif [Days Since Last Activity] > 30 then '31-90 Days' else '0-30 Days' endif", status: 'valid' },
      { id: 't130', name: 'Summarize', category: 'Transform', description: 'Summarizes claims by product type and quarter.', configuration: 'Quarter End Date:GroupBy;Product Type:GroupBy;Claim Number:CountDistinct:Claim Count;Total Paid:Sum:Total Paid Amount', status: 'valid' },
      { id: 't131', name: 'Sort', category: 'Preparation', description: 'Sorts product type results.', configuration: 'Quarter End Date Descending;Product Type Ascending', status: 'valid' },
      { id: 't132', name: 'Output Data', category: 'Output', description: 'Writes product type analysis to Excel.', configuration: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary', status: 'valid' },
      { id: 't140', name: 'Summarize', category: 'Transform', description: 'Summarizes claims by state and quarter.', configuration: 'Quarter End Date:GroupBy;State:GroupBy;Claim Number:CountDistinct:Claim Count;Total Paid:Sum:Total Paid', status: 'valid' },
      { id: 't141', name: 'Sort', category: 'Preparation', description: 'Sorts state results.', configuration: 'Quarter End Date Descending;State Ascending', status: 'valid' },
      { id: 't142', name: 'Output Data', category: 'Output', description: 'Writes state analysis to Excel.', configuration: 'Claims_By_State_Demo_Output.xlsx|||StateSummary', status: 'valid' },
      { id: 't150', name: 'Summarize', category: 'Transform', description: 'Counts claims by aging bucket and litigation status.', configuration: 'Aging Bucket:GroupBy;Litigation Flag:GroupBy;Claim Number:CountDistinct:Claim Count', status: 'valid' },
      { id: 't151', name: 'Sort', category: 'Preparation', description: 'Sorts aging and litigation results.', configuration: 'Aging Bucket Ascending;Litigation Flag Ascending', status: 'valid' },
      { id: 't152', name: 'Output Data', category: 'Output', description: 'Writes aging/litigation risk analysis to Excel.', configuration: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary', status: 'valid' },
    ],
    connections: [
      { id: 'c1', name: 'Claims Volume Excel', type: 'Excel', details: '.\\Data\\Claims_Volume_Extract_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c2', name: 'Policy Master', type: 'Excel', details: '.\\Data\\Policy_Master_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c3', name: 'Claim Payments', type: 'Excel', details: '.\\Data\\Claim_Payments_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c4', name: 'Adjuster Diary', type: 'Excel', details: '.\\Data\\Claim_Diary_Notes_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c5', name: 'Claims Historical Detail', type: 'Excel', details: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail', direction: 'output' },
      { id: 'c6', name: 'Claims Quarter Summary', type: 'Excel', details: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary', direction: 'output' },
      { id: 'c7', name: 'Product Type Summary', type: 'Excel', details: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary', direction: 'output' },
      { id: 'c8', name: 'State Summary', type: 'Excel', details: 'Claims_By_State_Demo_Output.xlsx|||StateSummary', direction: 'output' },
      { id: 'c9', name: 'Aging/Litigation Risk Summary', type: 'Excel', details: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary', direction: 'output' },
    ],
    pipelineStages: [
      { id: 's1', label: 'Extract', tools: 4, icon: FileInput, color: '#3B82F6' },
      { id: 's2', label: 'Transform', tools: 30, icon: Cpu, color: '#F59E0B' },
      { id: 's3', label: 'Load', tools: 5, icon: FileOutput, color: '#22C55E' },
    ],
    connectionCount: 41,
    schedule: 'Daily 5:30 AM EST',
    lastRunStatus: 'Success',
    avgRuntime: '32s',
    complexity: 'High',
    criticality: 'High',
  },
  c11: {
    tools: [
      { id: '#1', name: 'TextInput', category: 'Input', description: 'Provides a sample dataset with policy information including Policy_ID, Policy Type, Plan, and Policy_Start_Date.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextInput.TextInput\nTool Type: TextInput', status: 'valid' },
      { id: '#2', name: 'TextToColumns', category: 'Parse', description: "Splits the values in 'Field1' into separate columns.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextToColumns.TextToColumns\nTool Type: TextToColumns', status: 'valid' },
      { id: '#3', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames fields from the output of TextToColumns tool #2, dropping Field1 and keeping all other fields.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#4', name: 'DynamicRename', category: 'Preparation', description: "Renames fields based on the first row values, specifically for fields 'Name: 1', 'Name: 2', 'Name: 3', 'Name: 4', and any other field starting with 'Name'.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.DynamicRename.DynamicRename\nTool Type: DynamicRename', status: 'valid' },
      { id: '#6', name: 'TextInput', category: 'Input', description: 'Provides a sample dataset with policy information including Policy_ID, Snapshot_Month, and Monthly_Premium.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextInput.TextInput\nTool Type: TextInput', status: 'valid' },
      { id: '#7', name: 'TextToColumns', category: 'Parse', description: "Splits the values in 'Field1' into separate columns.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextToColumns.TextToColumns\nTool Type: TextToColumns', status: 'valid' },
      { id: '#8', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames fields from the output of TextToColumns tool #7, dropping Field1 and keeping all other fields.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#9', name: 'DynamicRename', category: 'Preparation', description: "Renames fields based on the first row values received from upstream tool #8, using the 'FirstRow' rename mode.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.DynamicRename.DynamicRename\nTool Type: DynamicRename', status: 'valid' },
      { id: '#16', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames columns to Policy_Start_Date and Unknown from the output of DynamicRename #4.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#17', name: 'Join', category: 'Join', description: 'Joining data from tools #16 and #9 on the Policy_ID field.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.Join.Join\nTool Type: Join', status: 'valid' },
      { id: '#18', name: 'Formula', category: 'Transform', description: "Categorizes records into Premium_Group based on Monthly_Premium value, assigning 'High' or 'Medium' labels.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.Formula.Formula\nTool Type: Formula', status: 'valid' },
      { id: '#22', name: 'Join', category: 'Join', description: "Joining data from upstream tools #25 and #29 on the 'Diagnosis_Type' field.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.Join.Join\nTool Type: Join', status: 'valid' },
      { id: '#23', name: 'Join', category: 'Join', description: 'Joining two input data streams on Claim_ID, combining records from both streams where the Claim_ID matches.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.Join.Join\nTool Type: Join', status: 'valid' },
      { id: '#24', name: 'Join', category: 'Join', description: 'Joining two input data streams on Claim_ID, combining records from both streams where the Claim_ID matches.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.Join.Join\nTool Type: Join', status: 'valid' },
      { id: '#25', name: 'Summarize', category: 'Transform', description: 'Groups diagnosis data by Diagnosis_Type and calculates the maximum ICD_Code for each group, storing it as Max_ICD_Code.', configuration: 'XML Tool Name: AlteryxSpatialPluginsGui.Summarize.Summarize\nTool Type: Summarize', status: 'valid' },
      { id: '#26', name: 'TextToColumns', category: 'Parse', description: "Splits the 'Field1' column into multiple columns based on a delimiter.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextToColumns.TextToColumns\nTool Type: TextToColumns', status: 'valid' },
      { id: '#27', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames specific columns from the output of TextToColumns tool #26, keeping columns 1, 2, and 3.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#28', name: 'TextInput', category: 'Input', description: 'Provides a sample dataset with Claim_ID, Diagnosis_Type, and ICD_Code fields for testing or demonstration purposes within the Diagnosis Data container.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextInput.TextInput\nTool Type: TextInput', status: 'valid' },
      { id: '#29', name: 'DynamicRename', category: 'Preparation', description: "Renames fields based on the first row values received from upstream tool #27, specifically using the values in the first row to rename fields like 'Name: 1', 'Name: 2', etc.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.DynamicRename.DynamicRename\nTool Type: DynamicRename', status: 'valid' },
      { id: '#31', name: 'TextInput', category: 'Input', description: 'Provides sample claims data with 6 fields (Claim_ID, Policy_ID, Customer_ID, Claim_Date, Claim_Status, Service_Location) and 26 records for testing or demonstration purposes within the Claims Data container.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextInput.TextInput\nTool Type: TextInput', status: 'valid' },
      { id: '#32', name: 'TextToColumns', category: 'Parse', description: "Splits the 'Field1' column into multiple columns based on a delimiter.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextToColumns.TextToColumns\nTool Type: TextToColumns', status: 'valid' },
      { id: '#33', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and retains the first 6 columns from the output of TextToColumns tool #32, discarding any unknown columns.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#34', name: 'DynamicRename', category: 'Preparation', description: 'Renames fields based on the first row values from the upstream data, specifically using the values in the first row of the selected fields.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.DynamicRename.DynamicRename\nTool Type: DynamicRename', status: 'valid' },
      { id: '#36', name: 'Formula', category: 'Transform', description: 'Calculates Month_End_Date by adding one month to Payment_Date, trimming to the first day of that month, then subtracting one day.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.Formula.Formula\nTool Type: Formula', status: 'valid' },
      { id: '#37', name: 'Summarize', category: 'Transform', description: "Groups input data by Claim_ID and Month_End_Date, calculating the sum of Payment_Amount as 'Paid Amount' and the count of distinct Payment_ID as 'Payments Made'.", configuration: 'XML Tool Name: AlteryxSpatialPluginsGui.Summarize.Summarize\nTool Type: Summarize', status: 'valid' },
      { id: '#38', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames columns from the output of Formula tool #36, keeping Payment_Amount and Unknown fields.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#39', name: 'TextInput', category: 'Input', description: 'Provides a sample dataset with payment information including Payment_ID, Claim_ID, Payment_Date, and Payment_Amount.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextInput.TextInput\nTool Type: TextInput', status: 'valid' },
      { id: '#40', name: 'TextToColumns', category: 'Parse', description: "Splits the values in 'Field1' into separate columns.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.TextToColumns.TextToColumns\nTool Type: TextToColumns', status: 'valid' },
      { id: '#41', name: 'AlteryxSelect', category: 'Preparation', description: 'Selects and renames specific columns from the output of TextToColumns tool #40, keeping columns 1 to 4.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.AlteryxSelect.AlteryxSelect\nTool Type: AlteryxSelect', status: 'valid' },
      { id: '#42', name: 'DynamicRename', category: 'Preparation', description: "Renames fields based on the first row values from the upstream data, specifically using the values in the first row to rename fields like 'Name: 1', 'Name: 2', etc.", configuration: 'XML Tool Name: AlteryxBasePluginsGui.DynamicRename.DynamicRename\nTool Type: DynamicRename', status: 'valid' },
      { id: '#43', name: 'ControlContainer', category: 'Preparation', description: "A ControlContainer tool serving as a terminal node in the WF03 workflow, displaying a caption 'WF01 (Claims Summary)' with specific styling.", configuration: 'XML Tool Name: AlteryxGuiToolkit.ControlContainer.ControlContainer\nTool Type: ControlContainer', status: 'valid' },
      { id: '#44', name: 'Summarize', category: 'Transform', description: 'Groups input data by Policy_ID, counting distinct Claim_ID, summing Paid Amount, and finding the maximum Claim_Date.', configuration: 'XML Tool Name: AlteryxSpatialPluginsGui.Summarize.Summarize\nTool Type: Summarize', status: 'valid' },
      { id: '#45', name: 'Join', category: 'Join', description: 'Joining data from tools #18 and #44 on the Policy_ID field.', configuration: 'XML Tool Name: AlteryxBasePluginsGui.Join.Join\nTool Type: Join', status: 'valid' },
      { id: '#46', name: 'ControlContainer', category: 'Preparation', description: "The ControlContainer tool #46 serves as a container for the 'Data Ingestion' section, visually grouping related tools or elements together with a specific style.", configuration: 'XML Tool Name: AlteryxGuiToolkit.ControlContainer.ControlContainer\nTool Type: ControlContainer', status: 'valid' },
    ],
    connections: [
  {
    id: 'wf03-in-1',
    name: 'Policy Data',
    type: 'Alteryx Text Input',
    details: 'Policy_ID, Policy Type, Plan, Policy_Start_Date',
    direction: 'input',
  },
  {
    id: 'wf03-in-2',
    name: 'Policy Premium Data',
    type: 'Alteryx Text Input',
    details: 'Policy_ID, Snapshot_Month, Monthly_Premium',
    direction: 'input',
  },
  {
    id: 'wf03-in-3',
    name: 'Diagnosis Data',
    type: 'Alteryx Text Input',
    details: 'Claim_ID, Diagnosis_Type, ICD_Code',
    direction: 'input',
  },
  {
    id: 'wf03-in-4',
    name: 'Claims Data',
    type: 'Alteryx Text Input',
    details: 'Claim_ID, Policy_ID, Customer_ID, Claim_Date, Claim_Status, Service_Location',
    direction: 'input',
  },
  {
    id: 'wf03-in-5',
    name: 'Payment Data',
    type: 'Alteryx Text Input',
    details: 'Payment_ID, Claim_ID, Payment_Date, Payment_Amount',
    direction: 'input',
  },
  {
    id: 'wf03-out-1',
    name: 'Policy Claims Summary',
    type: 'Alteryx Workflow Output',
    details: 'Policy-level summary combining premium, claims, diagnosis and payment information',
    direction: 'output',
  },
  {
    id: 'wf03-out-2',
    name: 'Claims Detail Output',
    type: 'Alteryx Workflow Output',
    details: 'Consolidated claims and payment data with calculated Month_End_Date and Premium_Group',
    direction: 'output',
  },
  {
    id: 'wf03-out-3',
    name: 'Claims Analysis Output',
    type: 'Alteryx Workflow Output',
    details: 'Aggregated claims information used for downstream analysis',
    direction: 'output',
  },
],
    pipelineStages: [
      { id: 's1', label: 'Extract', tools: 5, icon: FileInput, color: '#3B82F6' },
      { id: 's2', label: 'Transform', tools: 27, icon: Cpu, color: '#F59E0B' },
      { id: 's3', label: 'Load', tools: 2, icon: FileOutput, color: '#22C55E' },
    ],
    connectionCount: 32,
    schedule: 'Daily 6:00 AM EST',
    lastRunStatus: 'Success',
    avgRuntime: '15s',
    complexity: 'High',
    criticality: 'High',
  },
  c12: {
  tools: [
    {
      id: '#1',
      name: 'Join',
      category: 'Join',
      description: "Joins data from upstream tools #5 and #9 on the 'Diagnosis_Type' field.",
      configuration: "Left input: Tool #5\nRight input: Tool #9\nJoin field: Diagnosis_Type",
      status: 'valid',
    },
    {
      id: '#2',
      name: 'Join',
      category: 'Join',
      description: 'Joins two input data streams on Claim_ID to combine relevant data.',
      configuration: 'Join field: Claim_ID',
      status: 'valid',
    },
    {
      id: '#3',
      name: 'Join',
      category: 'Join',
      description: 'Merges data from upstream tools #2 and #17 on the Claim_ID field.',
      configuration: 'Left input: Tool #2\nRight input: Tool #17\nJoin field: Claim_ID',
      status: 'valid',
    },
    {
      id: '#4',
      name: 'DbFileOutput',
      category: 'Output',
      description: 'Writes the joined data from upstream tool #3 to an Excel file named WF01_Output.xlsx, specifically to the Sheet1 worksheet.',
      configuration: 'WF01_Output.xlsx|||Sheet1',
      status: 'valid',
    },
    {
      id: '#5',
      name: 'Summarize',
      category: 'Transform',
      description: 'Groups Diagnosis data by Diagnosis_Type and calculates the maximum ICD_Code for each group, storing it as Max_ICD_Code.',
      configuration: 'Diagnosis_Type: GroupBy\nICD_Code: Max -> Max_ICD_Code',
      status: 'valid',
    },
    {
      id: '#6',
      name: 'TextToColumns',
      category: 'Parse',
      description: "Splits the values in 'Field1' into separate columns.",
      configuration: 'Input field: Field1',
      status: 'valid',
    },
    {
      id: '#7',
      name: 'AlteryxSelect',
      category: 'Preparation',
      description: 'Selects and renames columns from the output of TextToColumns tool #6, keeping the first three columns and dropping any unknown columns.',
      configuration: 'Input: Tool #6\nKeep: first 3 columns\nDrop: unknown columns',
      status: 'valid',
    },
    {
      id: '#8',
      name: 'TextInput',
      category: 'Input',
      description: 'Provides a sample dataset with Claim_ID, Diagnosis_Type, and ICD_Code fields for testing or demonstration purposes within the Diagnosis Data container.',
      configuration: 'Fields: Claim_ID, Diagnosis_Type, ICD_Code',
      status: 'valid',
    },
    {
      id: '#9',
      name: 'DynamicRename',
      category: 'Preparation',
      description: "Renames fields based on the first row values received from upstream tool #7, specifically using the first row to rename fields such as 'Name: 1', 'Name: 2', 'Name: 3', and 'Name: *Unknown'.",
      configuration: 'Input: Tool #7\nRename mode: First Row',
      status: 'valid',
    },
    {
      id: '#11',
      name: 'TextInput',
      category: 'Input',
      description: 'Provides a sample claims dataset with 26 rows, including fields like Claim_ID, Policy_ID, and Claim_Status, within the Claims Data container.',
      configuration: 'Sample claims dataset\nRecords: 26\nKey fields: Claim_ID, Policy_ID, Claim_Status',
      status: 'valid',
    },
    {
      id: '#12',
      name: 'TextToColumns',
      category: 'Parse',
      description: "Splits the 'Field1' column into multiple columns based on a delimiter.",
      configuration: 'Input field: Field1',
      status: 'valid',
    },
    {
      id: '#13',
      name: 'AlteryxSelect',
      category: 'Preparation',
      description: 'Selects and retains the first 6 columns from the output of TextToColumns tool #12, dropping any unknown columns.',
      configuration: 'Input: Tool #12\nKeep: first 6 columns\nDrop: unknown columns',
      status: 'valid',
    },
    {
      id: '#14',
      name: 'DynamicRename',
      category: 'Preparation',
      description: "Renames fields based on the first row values from the upstream data, specifically using the first row to rename fields such as 'Name: 1', 'Name: 2', etc.",
      configuration: 'Input: Tool #13\nRename mode: First Row',
      status: 'valid',
    },
    {
      id: '#16',
      name: 'Formula',
      category: 'Transform',
      description: 'Calculates Month_End_Date by adding one month to Payment_Date, trimming to the first day of that month, then subtracting one day.',
      configuration: "Month_End_Date = DateTimeAdd(DateTimeTrim(DateTimeAdd([Payment_Date], 1, 'months'), 'month'), -1, 'days')",
      status: 'valid',
    },
    {
      id: '#17',
      name: 'Summarize',
      category: 'Transform',
      description: 'Groups payments data by Claim_ID and Month_End_Date, calculating the total Paid Amount and count of distinct Payments Made.',
      configuration: 'Claim_ID: GroupBy\nMonth_End_Date: GroupBy\nPayment_Amount: Sum -> Paid Amount\nPayment_ID: CountDistinct -> Payments Made',
      status: 'valid',
    },
    {
      id: '#18',
      name: 'AlteryxSelect',
      category: 'Preparation',
      description: "Selects and renames fields from the output of Formula tool #16, specifically keeping 'Payment_Amount' as Int16 and '*Unknown'.",
      configuration: "Input: Tool #16\nKeep: Payment_Amount, *Unknown\nPayment_Amount type: Int16",
      status: 'valid',
    },
    {
      id: '#19',
      name: 'TextInput',
      category: 'Input',
      description: 'Provides a sample payment dataset with fields like Payment_ID, Claim_ID, Payment_Date, and Payment_Amount to be used downstream in the workflow.',
      configuration: 'Fields: Payment_ID, Claim_ID, Payment_Date, Payment_Amount',
      status: 'valid',
    },
    {
      id: '#20',
      name: 'TextToColumns',
      category: 'Parse',
      description: "Splits the 'Field1' column into multiple columns based on a delimiter.",
      configuration: 'Input field: Field1',
      status: 'valid',
    },
    {
      id: '#21',
      name: 'AlteryxSelect',
      category: 'Preparation',
      description: 'Selects and retains specific columns from the output of TextToColumns tool #20, dropping any unknown fields.',
      configuration: 'Input: Tool #20\nDrop: unknown fields',
      status: 'valid',
    },
    {
      id: '#22',
      name: 'DynamicRename',
      category: 'Preparation',
      description: "Renames fields based on the first row values from the upstream data, specifically using the values in the first row to rename fields such as 'Name: 1', 'Name: 2', etc.",
      configuration: 'Input: Tool #21\nRename mode: First Row',
      status: 'valid',
    },
  ],

  connections: [
    {
      id: 'wf01-in-1',
      name: 'Source Input #1',
      type: 'Alteryx Text Input',
      details: 'Diagnosis Data — Claim_ID, Diagnosis_Type, ICD_Code',
      direction: 'input',
    },
    {
      id: 'wf01-in-2',
      name: 'Source Input #2',
      type: 'Alteryx Text Input',
      details: 'Claims Data — 26 sample records including Claim_ID, Policy_ID, Claim_Status',
      direction: 'input',
    },
    {
      id: 'wf01-in-3',
      name: 'Source Input #3',
      type: 'Alteryx Text Input',
      details: 'Payment Data — Payment_ID, Claim_ID, Payment_Date, Payment_Amount',
      direction: 'input',
    },
    {
      id: 'wf01-out-1',
      name: 'WF01 Output',
      type: 'Excel',
      details: 'WF01_Output.xlsx|||Sheet1',
      direction: 'output',
    },
  ],

  pipelineStages: [
    {
      id: 's1',
      label: 'Extract',
      tools: 3,
      icon: FileInput,
      color: '#3B82F6',
    },
    {
      id: 's2',
      label: 'Transform',
      tools: 16,
      icon: Cpu,
      color: '#F59E0B',
    },
    {
      id: 's3',
      label: 'Load',
      tools: 1,
      icon: FileOutput,
      color: '#22C55E',
    },
  ],

  connectionCount: 20,
  schedule: '',
  lastRunStatus: '',
  avgRuntime: '16s',
  complexity: 'Medium',
  criticality: 'Medium',
},
    c13: {
    tools: [
      {
        id: '#1',
        name: 'TextInput',
        category: 'Input',
        description: 'Applies the configured TextInput operation to the incoming data stream.',
        configuration: 'Tool Type: TextInput',
        status: 'valid',
      },
      {
        id: '#2',
        name: 'AlteryxSelect',
        category: 'Preparation',
        description: 'Selects and renames fields from the input data, keeping CLAIM_ID and INDUSTRY_TYPE, and dropping all other fields.',
        configuration: 'Keep: CLAIM_ID, INDUSTRY_TYPE\nDrop: all other fields',
        status: 'valid',
      },
      {
        id: '#4',
        name: 'Formula',
        category: 'Transform',
        description: 'Generates Clm_Service_Date as a random date between 2024-01-01 and 2026-01-01, and Month_End_Date as the last day of the month following Clm_Service_Date.',
        configuration: 'Clm_Service_Date: Random date between 2024-01-01 and 2026-01-01\nMonth_End_Date: Last day of month following Clm_Service_Date',
        status: 'valid',
      },
      {
        id: '#6',
        name: 'Summarize',
        category: 'Transform',
        description: 'Groups input data by INDUSTRY_TYPE and Month_End_Date, and counts distinct CLAIM_ID values.',
        configuration: 'INDUSTRY_TYPE: GroupBy\nMonth_End_Date: GroupBy\nCLAIM_ID: CountDistinct',
        status: 'valid',
      },
      {
        id: '#7',
        name: 'BrowseV2',
        category: 'Output',
        description: 'Displays the output data from the Summarize tool (#6) for analysis and review.',
        configuration: 'Input: Tool #6',
        status: 'valid',
      },
      {
        id: '#8',
        name: 'TextInput',
        category: 'Input',
        description: 'Provides sample claim data as a comma-separated string in a single field named Field1, containing 26 rows of claim information.',
        configuration: 'Field: Field1\nRecords: 26',
        status: 'valid',
      },
      {
        id: '#9',
        name: 'TextToColumns',
        category: 'Parse',
        description: "Splits the values in 'Field1' into separate columns.",
        configuration: 'Input field: Field1',
        status: 'valid',
      },
      {
        id: '#10',
        name: 'AlteryxSelect',
        category: 'Preparation',
        description: 'Selects and renames fields from the output of TextToColumns tool #9, dropping Field1 and keeping all other fields.',
        configuration: 'Input: Tool #9\nDrop: Field1\nKeep: remaining fields',
        status: 'valid',
      },
      {
        id: '#11',
        name: 'DynamicRename',
        category: 'Preparation',
        description: "Renames fields based on the first row values from the upstream data, specifically using values such as 'Name: 1', 'Name: 2', etc.",
        configuration: 'Input: Tool #10\nRename mode: First Row',
        status: 'valid',
      },
      {
        id: '#13',
        name: 'ControlContainer',
        category: 'Control',
        description: 'Root-level ControlContainer that is currently disabled and not executing, making it inert in workflow WF02.',
        configuration: 'Disabled\nRoot-level container',
        status: 'valid',
      },
      {
        id: '#14',
        name: 'TextInput',
        category: 'Input',
        description: 'Provides a sample dataset with payment information including Payment_ID, Claim_ID, Payment_Date, and Payment_Amount.',
        configuration: 'Fields: Payment_ID, Claim_ID, Payment_Date, Payment_Amount',
        status: 'valid',
      },
      {
        id: '#15',
        name: 'TextToColumns',
        category: 'Parse',
        description: "Splits the values in 'Field1' into separate columns.",
        configuration: 'Input field: Field1',
        status: 'valid',
      },
      {
        id: '#16',
        name: 'AlteryxSelect',
        category: 'Preparation',
        description: 'Selects and renames fields from the output of TextToColumns tool #15, dropping Field1 and keeping all other fields.',
        configuration: 'Input: Tool #15\nDrop: Field1\nKeep: remaining fields',
        status: 'valid',
      },
      {
        id: '#17',
        name: 'DynamicRename',
        category: 'Preparation',
        description: 'Renames fields based on the first row values received from upstream tool #16, using the selected fields.',
        configuration: 'Input: Tool #16\nRename mode: First Row',
        status: 'valid',
      },
      {
        id: '#19',
        name: 'ControlContainer',
        category: 'Control',
        description: "The ControlContainer tool #19 is a container for the 'Data Ingestion' process, grouping related tools or actions together.",
        configuration: 'Caption: Data Ingestion',
        status: 'valid',
      },
      {
        id: '#20',
        name: 'Join',
        category: 'Join',
        description: 'Joins two data streams on Claim_ID, combining records from both inputs into a single output based on matching Claim_ID values.',
        configuration: 'Join field: Claim_ID',
        status: 'valid',
      },
      {
        id: '#21',
        name: 'Formula',
        category: 'Transform',
        description: 'Calculates Month_End_Date by adding one month to Payment_Date, trimming to the first day of that month, then subtracting one day.',
        configuration: "Month_End_Date = DateTimeAdd(DateTimeTrim(DateTimeAdd([Payment_Date], 1, 'months'), 'month'), -1, 'days')",
        status: 'valid',
      },
      {
        id: '#22',
        name: 'AlteryxSelect',
        category: 'Preparation',
        description: "Selects and retains only 'Claim_Date' and '*Unknown' fields from the input data.",
        configuration: 'Keep: Claim_Date, *Unknown',
        status: 'valid',
      },
      {
        id: '#23',
        name: 'AlteryxSelect',
        category: 'Preparation',
        description: 'Selects and renames specific fields from the upstream data, keeping Payment_Date, Payment_Amount, and Unknown fields.',
        configuration: 'Keep: Payment_Date, Payment_Amount, Unknown',
        status: 'valid',
      },
      {
        id: '#24',
        name: 'Summarize',
        category: 'Transform',
        description: 'Groups input data by Service_Location and Month_End_Date, counting distinct Claim_ID values as Claim_Count.',
        configuration: 'Service_Location: GroupBy\nMonth_End_Date: GroupBy\nClaim_ID: CountDistinct -> Claim_Count',
        status: 'valid',
      },
      {
        id: '#25',
        name: 'BrowseV2',
        category: 'Output',
        description: 'Inspects and reviews the output data from Summarize tool #24.',
        configuration: 'Input: Tool #24',
        status: 'valid',
      },
      {
        id: '#26',
        name: 'ControlContainer',
        category: 'Control',
        description: "The ControlContainer tool #26 serves as a container for grouping tools in the 'Merge and Transformation' section, with configured styling and error handling properties.",
        configuration: 'Caption: Merge and Transformation',
        status: 'valid',
      },
      {
        id: '#27',
        name: 'DbFileOutput',
        category: 'Output',
        description: 'Writes data to the Excel file SL_Monthly_C_Volume.xlsx, specifically to the Sheet1 worksheet.',
        configuration: 'SL_Monthly_C_Volume.xlsx|||Sheet1',
        status: 'valid',
      },
    ],

    connections: [
      {
        id: 'wf02-in-1',
        name: 'Source Input #1',
        type: 'Alteryx Text Input',
        details: 'TextInput tool #1 — incoming claim data used for the CLAIM_ID and INDUSTRY_TYPE processing branch.',
        direction: 'input',
      },
      {
        id: 'wf02-in-2',
        name: 'Source Input #8',
        type: 'Alteryx Text Input',
        details: 'TextInput tool #8 — 26-row sample claim dataset provided through Field1.',
        direction: 'input',
      },
      {
        id: 'wf02-in-3',
        name: 'Source Input #14',
        type: 'Alteryx Text Input',
        details: 'TextInput tool #14 — Payment_ID, Claim_ID, Payment_Date, and Payment_Amount.',
        direction: 'input',
      },
      {
        id: 'wf02-out-1',
        name: 'SL Monthly C Volume',
        type: 'Excel',
        details: 'SL_Monthly_C_Volume.xlsx|||Sheet1',
        direction: 'output',
      },
    ],

    pipelineStages: [
      {
        id: 's1',
        label: 'Extract',
        tools: 3,
        icon: FileInput,
        color: '#3B82F6',
      },
      {
        id: 's2',
        label: 'Transform',
        tools: 19,
        icon: Cpu,
        color: '#F59E0B',
      },
      {
        id: 's3',
        label: 'Load',
        tools: 1,
        icon: FileOutput,
        color: '#22C55E',
      },
    ],

    connectionCount: 18,
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '16s',
    complexity: 'Medium',
    criticality: 'Medium',
  },
  c14: {
    tools: [
      { id: 't1', name: 'Input Data', category: 'Input', description: 'Reads the claims volume Excel workbook.', configuration: '.\\Data\\Claims_Volume_Extract_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't2', name: 'Block Until Done', category: 'Preparation', description: 'Reads the workbook once, then fans out to downstream branches.', configuration: 'Sequential branch execution', status: 'valid' },
      { id: 't3', name: 'Summarize', category: 'Transform', description: 'Claims volume by quarter and status.', configuration: 'Quarter End Date:GroupBy;Claim Status:GroupBy;Claim Number:CountDistinct', status: 'valid' },
      { id: 't4', name: 'Cross Tab', category: 'Transform', description: 'Pivots claim status counts by quarter.', configuration: 'GroupField: Quarter End Date\nHeaderField: Claim Status\nDataField: CountDistinct_Claim Number\nMethod: Sum', status: 'valid' },
      { id: 't5', name: 'Select', category: 'Preparation', description: 'Selects the required historical summary fields.', configuration: 'Quarter End Date;Preclaim;Active_Pending;Approved;Stable_and_Mature', status: 'valid' },
      { id: 't6', name: 'Sort', category: 'Preparation', description: 'Sorts quarters in descending order.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't7', name: 'Browse', category: 'Output', description: 'Previews the quarterly claims summary.', configuration: 'Temp\\Demo_Claims_Quarter_Summary.yxdb', status: 'valid' },
      { id: 't8', name: 'Summarize', category: 'Transform', description: 'Claims volume by manager and examiner.', configuration: 'Quarter End Date:GroupBy;Claim Status:GroupBy;Manager:GroupBy;Examiner:GroupBy;Claim Number:CountDistinct', status: 'valid' },
      { id: 't9', name: 'Summarize', category: 'Transform', description: 'Finds the most recent quarter end date.', configuration: 'Quarter End Date:Max', status: 'valid' },
      { id: 't10', name: 'Join', category: 'Join', description: 'Keeps records matching the most recent quarter.', configuration: 'LeftField: Quarter End Date\nRightField: Last Quarter', status: 'valid' },
      { id: 't11', name: 'Cross Tab', category: 'Transform', description: 'Creates manager/examiner status columns.', configuration: 'GroupField: Quarter End Date;Manager;Examiner\nHeaderField: Claim Status\nDataField: CountDistinct_Claim Number\nMethod: Sum', status: 'valid' },
      { id: 't12', name: 'Select', category: 'Preparation', description: 'Selects final manager/examiner summary fields.', configuration: 'Quarter End Date;Manager;Examiner;Preclaim;Active_Pending;Approved;Stable_and_Mature', status: 'valid' },
      { id: 't13', name: 'Sort', category: 'Preparation', description: 'Sorts the manager/examiner output by quarter.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't14', name: 'Browse', category: 'Output', description: 'Previews the latest-quarter team summary.', configuration: 'Temp\\Demo_Claims_Team_LastQuarter.yxdb', status: 'valid' },
      { id: 't15', name: 'Select', category: 'Preparation', description: 'Selects claim-level detail fields.', configuration: 'Quarter End Date;Claim Number;Policy Number;Team;Manager;Examiner;Claim Status;Disability Date;ICD1Code;ICD1Description;ICD1GroupName', status: 'valid' },
      { id: 't16', name: 'Sort', category: 'Preparation', description: 'Sorts claim-level detail by quarter.', configuration: 'Quarter End Date Descending', status: 'valid' },
      { id: 't17', name: 'Output Data', category: 'Output', description: 'Writes claim-level detail to Excel.', configuration: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail', status: 'valid' },
      { id: 't18', name: 'Output Data', category: 'Output', description: 'Writes the quarter/status summary to Excel.', configuration: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary', status: 'valid' },
      { id: 't101', name: 'Input Data', category: 'Input', description: 'Reads Policy Master attributes.', configuration: '.\\Data\\Policy_Master_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't102', name: 'Input Data', category: 'Input', description: 'Reads claim payment transaction history.', configuration: '.\\Data\\Claim_Payments_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't103', name: 'Input Data', category: 'Input', description: 'Reads Adjuster Diary notes.', configuration: '.\\Data\\Claim_Diary_Notes_Demo.xlsx|||Sheet1$', status: 'valid' },
      { id: 't104', name: 'Summarize', category: 'Transform', description: 'Rolls payment transactions up to one row per claim.', configuration: 'Payment Amount:Sum:Total Paid;Payment Amount:Count:Payment Count;Claim Number:GroupBy:Claim Number', status: 'valid' },
      { id: 't111', name: 'Join', category: 'Join', description: 'Enriches claims with Policy attributes.', configuration: 'LeftField: Policy Number\nRightField: Policy Number', status: 'valid' },
      { id: 't112', name: 'Join', category: 'Join', description: 'Enriches claims with payment summary.', configuration: 'LeftField: Claim Number\nRightField: Claim Number', status: 'valid' },
      { id: 't113', name: 'Union', category: 'Join', description: 'Combines matched and unmatched claim records.', configuration: 'Auto Config by Name', status: 'valid' },
      { id: 't114', name: 'Formula', category: 'Transform', description: 'Fills missing payment values with zero.', configuration: 'Total Paid=if isnull([Total Paid]) then 0 else [Total Paid] endif;\nPayment Count=if isnull([Payment Count]) then 0 else [Payment Count] endif', status: 'valid' },
      { id: 't115', name: 'Join', category: 'Join', description: 'Attaches Adjuster Diary notes to claims.', configuration: 'LeftField: Claim Number\nRightField: Claim Number', status: 'valid' },
      { id: 't116', name: 'Union', category: 'Join', description: 'Combines claims with and without diary entries.', configuration: 'Auto Config by Name', status: 'valid' },
      { id: 't117', name: 'Formula', category: 'Transform', description: 'Normalizes litigation/reopened flags and calculates days since activity.', configuration: "Litigation Flag=if isnull([Litigation Flag]) then 'N' else [Litigation Flag] endif;\nReopened Flag=if isnull([Reopened Flag]) then 'N' else [Reopened Flag] endif;\nDays Since Last Activity=if isnull([Last Activity Date]) then Null() else DateTimeDiff(DateTimeToday(),[Last Activity Date],'days') endif", status: 'valid' },
      { id: 't118', name: 'Formula', category: 'Transform', description: 'Assigns an aging bucket based on days since last activity.', configuration: "Aging Bucket=if isnull([Days Since Last Activity]) then 'No Diary Activity' elseif [Days Since Last Activity] > 90 then '90+ Days' elseif [Days Since Last Activity] > 30 then '31-90 Days' else '0-30 Days' endif", status: 'valid' },
      { id: 't130', name: 'Summarize', category: 'Transform', description: 'Summarizes claims by product type and quarter.', configuration: 'Quarter End Date:GroupBy;Product Type:GroupBy;Claim Number:CountDistinct:Claim Count;Total Paid:Sum:Total Paid Amount', status: 'valid' },
      { id: 't131', name: 'Sort', category: 'Preparation', description: 'Sorts product type results.', configuration: 'Quarter End Date Descending;Product Type Ascending', status: 'valid' },
      { id: 't132', name: 'Output Data', category: 'Output', description: 'Writes product type analysis to Excel.', configuration: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary', status: 'valid' },
      { id: 't140', name: 'Summarize', category: 'Transform', description: 'Summarizes claims by state and quarter.', configuration: 'Quarter End Date:GroupBy;State:GroupBy;Claim Number:CountDistinct:Claim Count;Total Paid:Sum:Total Paid', status: 'valid' },
      { id: 't141', name: 'Sort', category: 'Preparation', description: 'Sorts state results.', configuration: 'Quarter End Date Descending;State Ascending', status: 'valid' },
      { id: 't142', name: 'Output Data', category: 'Output', description: 'Writes state analysis to Excel.', configuration: 'Claims_By_State_Demo_Output.xlsx|||StateSummary', status: 'valid' },
      { id: 't150', name: 'Summarize', category: 'Transform', description: 'Counts claims by aging bucket and litigation status.', configuration: 'Aging Bucket:GroupBy;Litigation Flag:GroupBy;Claim Number:CountDistinct:Claim Count', status: 'valid' },
      { id: 't151', name: 'Sort', category: 'Preparation', description: 'Sorts aging and litigation results.', configuration: 'Aging Bucket Ascending;Litigation Flag Ascending', status: 'valid' },
      { id: 't152', name: 'Output Data', category: 'Output', description: 'Writes aging/litigation risk analysis to Excel.', configuration: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary', status: 'valid' },
    ],
    connections: [
      { id: 'c1', name: 'Claims Volume Excel', type: 'Excel', details: '.\\Data\\Claims_Volume_Extract_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c2', name: 'Policy Master', type: 'Excel', details: '.\\Data\\Policy_Master_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c3', name: 'Claim Payments', type: 'Excel', details: '.\\Data\\Claim_Payments_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c4', name: 'Adjuster Diary', type: 'Excel', details: '.\\Data\\Claim_Diary_Notes_Demo.xlsx|||Sheet1$', direction: 'input' },
      { id: 'c5', name: 'Claims Historical Detail', type: 'Excel', details: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail', direction: 'output' },
      { id: 'c6', name: 'Claims Quarter Summary', type: 'Excel', details: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary', direction: 'output' },
      { id: 'c7', name: 'Product Type Summary', type: 'Excel', details: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary', direction: 'output' },
      { id: 'c8', name: 'State Summary', type: 'Excel', details: 'Claims_By_State_Demo_Output.xlsx|||StateSummary', direction: 'output' },
      { id: 'c9', name: 'Aging/Litigation Risk Summary', type: 'Excel', details: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary', direction: 'output' },
    ],
    pipelineStages: [
      { id: 's1', label: 'Extract', tools: 4, icon: FileInput, color: '#3B82F6' },
      { id: 's2', label: 'Transform', tools: 30, icon: Cpu, color: '#F59E0B' },
      { id: 's3', label: 'Load', tools: 5, icon: FileOutput, color: '#22C55E' },
    ],
    connectionCount: 41,
    schedule: 'Daily 5:30 AM EST',
    lastRunStatus: 'Success',
    avgRuntime: '32s',
    complexity: 'High',
    criticality: 'High',
  },
    u4: {
    tools: [
      {
        id: '#30',
        name: 'TextInput',
        category: 'Input',
        description:
          'Provides a sample dataset with 30 records and 10 fields including Policy_ID, Age, Health_Status, and BMI.',
        configuration:
          'Records: 30\nFields: 10\nKey fields: Policy_ID, Age, Health_Status, BMI',
        status: 'valid',
      },
      {
        id: '#31',
        name: 'TextInput',
        category: 'Input',
        description:
          'Provides a static dataset with attribute-value-weight mappings for various customer characteristics, such as Age, Health_Status, and Policy_Type.',
        configuration:
          'Static attribute-value-weight mapping dataset\nAttributes include: Age, Health_Status, Policy_Type',
        status: 'valid',
      },
      {
        id: '#35',
        name: 'BrowseV2',
        category: 'Output',
        description:
          'Inspects and profiles the output data from the upstream macro tool #36.',
        configuration: 'Input: Tool #36',
        status: 'valid',
      },
      {
        id: '#36',
        name: 'Workflow_04_Macro.yxmc',
        category: 'Transform',
        description:
          "Executes a custom macro 'Workflow_04_Macro.yxmc' as part of the workflow.",
        configuration:
          'Macro: Workflow_04_Macro.yxmc\nTool Type: yxmc',
        status: 'valid',
      },
    ],

    connections: [
      {
        id: 'wf04-in-1',
        name: 'Source Input #30',
        type: 'Alteryx Text Input',
        details:
          'TextInput tool #30 — 30 records and 10 fields including Policy_ID, Age, Health_Status, and BMI.',
        direction: 'input',
      },
      {
        id: 'wf04-in-2',
        name: 'Source Input #31',
        type: 'Alteryx Text Input',
        details:
          'TextInput tool #31 — static attribute-value-weight mappings for customer characteristics including Age, Health_Status, and Policy_Type.',
        direction: 'input',
      },
    ],

    pipelineStages: [
      {
        id: 's1',
        label: 'Extract',
        tools: 2,
        icon: FileInput,
        color: '#3B82F6',
      },
      {
        id: 's2',
        label: 'Transform',
        tools: 1,
        icon: Cpu,
        color: '#F59E0B',
      },
      {
        id: 's3',
        label: 'Load',
        tools: 1,
        icon: FileOutput,
        color: '#22C55E',
      },
    ],

    connectionCount: 3,
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '12s',
    complexity: 'Low',
    criticality: 'Low',
  },
    d6: {
    tools: [
      {
        id: '#1',
        name: 'DbFileInput',
        category: 'Input',
        description:
          "Reads data from the Excel file '4701229_YK5IEQ9R.xlsx', specifically from the 'Sheet1' sheet, and extracts the 'Date' and 'Burritos' fields.",
        configuration:
          '4701229_YK5IEQ9R.xlsx|||Sheet1$\nFields: Date, Burritos',
        status: 'valid',
      },
      {
        id: '#3',
        name: 'DateTime',
        category: 'Transform',
        description:
          "Converts the 'Date' field to a custom datetime format and outputs it as 'DateTime_Out'.",
        configuration:
          'Input field: Date\nOutput field: DateTime_Out\nCustom datetime format',
        status: 'valid',
      },
      {
        id: '#4',
        name: 'Filter',
        category: 'Transform',
        description:
          "Filters records where the day of the week in 'DateTime_Out' is 'Thursday'.",
        configuration:
          "Filter condition: DayOfWeek([DateTime_Out]) = 'Thursday'",
        status: 'valid',
      },
      {
        id: '#5',
        name: 'Summarize',
        category: 'Transform',
        description:
          "Calculates the average value of 'Burritos' and outputs it as 'Avg_Burritos'.",
        configuration:
          'Burritos: Average -> Avg_Burritos',
        status: 'valid',
      },
      {
        id: '#6',
        name: 'DbFileOutput',
        category: 'Output',
        description:
          'Writes the summarized data to an Excel file named Workflow8_output.xlsx, specifically to the Sheet1 worksheet.',
        configuration:
          'Workflow8_output.xlsx|||Sheet1',
        status: 'valid',
      },
    ],

    connections: [
      {
        id: 'burritos-in-1',
        name: '4701229_YK5IEQ9R.xlsx',
        type: 'Excel',
        details:
          '4701229_YK5IEQ9R.xlsx|||Sheet1$',
        direction: 'input',
      },
      {
        id: 'burritos-out-1',
        name: 'Workflow8 Output',
        type: 'Excel',
        details:
          'Workflow8_output.xlsx|||Sheet1',
        direction: 'output',
      },
    ],

    pipelineStages: [
      {
        id: 's1',
        label: 'Extract',
        tools: 1,
        icon: FileInput,
        color: '#3B82F6',
      },
      {
        id: 's2',
        label: 'Transform',
        tools: 3,
        icon: Cpu,
        color: '#F59E0B',
      },
      {
        id: 's3',
        label: 'Load',
        tools: 1,
        icon: FileOutput,
        color: '#22C55E',
      },
    ],

    connectionCount: 4,
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '13s',
    complexity: 'Low',
    criticality: 'Low',
  },
  p4: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '17s',
  },
  p5: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '12s',
  },
  p6: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '12s',
  },
};

// Policy Administration workflows use the same underlying Alteryx workflow definitions.
ALTERYX_DETAIL_DATA.p4 = ALTERYX_DETAIL_DATA.c11; // Workflow_03
ALTERYX_DETAIL_DATA.p5 = ALTERYX_DETAIL_DATA.c12; // Workflow_01
ALTERYX_DETAIL_DATA.p6 = ALTERYX_DETAIL_DATA.c13; // Workflow_02

/* ─────────────────────────────────────────────────────────
 * Workflow SVG Path Configuration
 * 
 * Maps workflow asset IDs to browser-openable SVG paths/URLs.
 * Uses Vite static asset imports to resolve direct browser URLs.
 * ───────────────────────────────────────────────────────── */
import demoClaimsVolumeExtractSvg from './Demo Claims Volume Extract.svg';

export const WORKFLOW_SVG_PATHS: Record<string, string> = {
  // Add/import the corresponding workflow SVG assets here.
  c10: demoClaimsVolumeExtractSvg, // Claims_Extract_Volume
  c11: '', // Workflow_03
  c12: '', // Workflow_01
  c13: '', // Workflow_02
  c14: demoClaimsVolumeExtractSvg, // Claims_Extract_Volume_v2
  u4: '',  // Workflow_04
  d6: '',  // Workflow_08
  p4: '',  // Workflow_03 (Policy Administration)
  p5: '',  // Workflow_01 (Policy Administration)
  p6: '',  // Workflow_02 (Policy Administration)
};

/* ── Alteryx Workflow Overview / Business Intelligence Types ── */
export interface BusinessInput {
  toolId?: number | string;
  name: string;
  sourceFilename?: string;
  sourceType?: string;
  businessRole?: string;
}

export interface BusinessOutput {
  toolId?: number | string;
  name: string;
  destinationType?: string;
  businessMeaning?: string;
  likelyUse?: string;
}

export interface BusinessStage {
  stageNumber: number;
  name: string;
  shortTitle?: string;
  summary: string;
  description?: string;
  businessPurpose?: string;
  majorTransformation?: string;
  toolCount: number;
  toolIds: (number | string)[];
  annotations?: string[];
}

export interface WorkflowBusinessSummary {
  businessPurpose: string;
  oneLinePurpose: string;
  sourceInputs: BusinessInput[];
  processingStages: BusinessStage[];
  businessOutputs: BusinessOutput[];
  metrics?: {
    totalNodes: number;
    totalConnections: number;
    inputCount: number;
    outputCount: number;
  };
}

export const WORKFLOW_BUSINESS_SUMMARIES: Record<string, WorkflowBusinessSummary> = {
  c10: {
    oneLinePurpose: 'Extracts and enriches claims data from multiple Excel sources, summarising claim volume by quarter and status.',
    businessPurpose: 'Extracts historical claims volume and financial payment transactions from core Excel workbooks, enriches claim details with policy attributes and adjuster notes, and generates executive quarterly, product-level, geographical, and aging risk summary deliverables.',
    sourceInputs: [
      { name: 'Claims_Volume_Extract_Demo.xlsx', sourceFilename: 'Claims_Volume_Extract_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Primary claims volume extract' },
      { name: 'Policy_Master_Demo.xlsx', sourceFilename: 'Policy_Master_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Policy reference attributes' },
      { name: 'Claim_Payments_Demo.xlsx', sourceFilename: 'Claim_Payments_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Claim payment transactions' },
      { name: 'Claim_Diary_Notes_Demo.xlsx', sourceFilename: 'Claim_Diary_Notes_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Adjuster diary notes' },
    ],
    businessOutputs: [
      { name: 'Claims Historical Detail', destinationType: 'Excel (Detail Sheet)', likelyUse: 'Claim-level audit and historical analysis' },
      { name: 'Claims Quarter Summary', destinationType: 'Excel (QuarterSummary Sheet)', likelyUse: 'Quarterly management volume reporting' },
      { name: 'Product Type Summary', destinationType: 'Excel (ProductTypeSummary Sheet)', likelyUse: 'Product line loss performance reviews' },
      { name: 'State Summary', destinationType: 'Excel (StateSummary Sheet)', likelyUse: 'Geographical volume and state distribution' },
      { name: 'Aging/Litigation Risk Summary', destinationType: 'Excel (AgingRiskSummary Sheet)', likelyUse: 'Litigation tracking and diary aging risk' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Extract Claims Data',
        shortTitle: '01 EXTRACT CLAIMS DATA',
        summary: 'Reads claims volume dataset and initializes branch processing.',
        businessPurpose: 'Primary claims data extraction from core operational workbook.',
        majorTransformation: 'Sequential branch fan-out via Block Until Done.',
        toolCount: 2,
        toolIds: ['t1', 't2'],
        annotations: ['Reads Claims_Volume_Extract_Demo.xlsx', 'Fans out to quarterly and team summarization branches'],
      },
      {
        stageNumber: 2,
        name: 'Create Summarizations',
        shortTitle: '02 CREATE SUMMARIZATIONS',
        summary: 'Claims volume aggregation by quarter and status with cross-tab pivots.',
        businessPurpose: 'Quarterly historical volume and status distribution rollups.',
        majorTransformation: 'CrossTab pivot and quarter-end date descending sorting.',
        toolCount: 5,
        toolIds: ['t3', 't4', 't5', 't6', 't7'],
        annotations: ['Group by Quarter End Date and Claim Status', 'Pivot claim status counts', 'Preview temp snapshot in Browse'],
      },
      {
        stageNumber: 3,
        name: 'Latest Quarter Team Analysis',
        shortTitle: '03 LATEST QUARTER TEAM ANALYSIS',
        summary: 'Claims volume aggregation by manager and examiner for the most recent quarter.',
        businessPurpose: 'Executive team productivity scorecard for the active reporting period.',
        majorTransformation: 'Finds max quarter and filters managerial records via Join.',
        toolCount: 7,
        toolIds: ['t8', 't9', 't10', 't11', 't12', 't13', 't14'],
        annotations: ['Find latest reporting quarter end date', 'Join manager and examiner summaries to latest quarter', 'CrossTab pivot by team and manager'],
      },
      {
        stageNumber: 4,
        name: 'Detail Exports',
        shortTitle: '04 DETAIL EXPORTS',
        summary: 'Prepares claim-level historical details and quarterly summary Excel exports.',
        businessPurpose: 'Publishes core historical claim detail and quarterly volume worksheets.',
        majorTransformation: 'Field projection, sorting, and multi-tab Excel output generation.',
        toolCount: 4,
        toolIds: ['t15', 't16', 't17', 't18'],
        annotations: ['Select claim detail and diagnosis fields', 'Write Claims_Historical_Extract_Demo_Output.xlsx (Detail & QuarterSummary)'],
      },
      {
        stageNumber: 5,
        name: 'Additional Claims Data Sources',
        shortTitle: '05 ADDITIONAL CLAIMS DATA SOURCES',
        summary: 'Ingests policy master, payments, and adjuster diary records.',
        businessPurpose: 'Enrichment feed ingestion from auxiliary underwriting and transaction systems.',
        majorTransformation: 'Multi-source file ingestion.',
        toolCount: 3,
        toolIds: ['t101', 't102', 't103'],
        annotations: ['Reads Policy_Master_Demo.xlsx', 'Reads Claim_Payments_Demo.xlsx', 'Reads Claim_Diary_Notes_Demo.xlsx'],
      },
      {
        stageNumber: 6,
        name: 'Enrichment & Joins',
        shortTitle: '06 ENRICHMENT & JOINS',
        summary: 'Aggregates payments and executes relational joins to enrich claims with policy and diary notes.',
        businessPurpose: 'Consolidates financial payment metrics and adjuster notes with base claims.',
        majorTransformation: 'Payment summarization, multi-table left outer joins, and null flag default formatting.',
        toolCount: 8,
        toolIds: ['t104', 't111', 't112', 't113', 't114', 't115', 't116', 't117'],
        annotations: ['Roll up total payments per claim', 'Join claims with policy master attributes', 'Join claims with adjuster diary entries', 'Default missing payments to 0'],
      },
      {
        stageNumber: 7,
        name: 'Aging Risk Categorization',
        shortTitle: '07 AGING RISK CATEGORIZATION',
        summary: 'Computes activity duration and assigns aging risk buckets.',
        businessPurpose: 'Categorizes claims into duration-based aging risk tiers.',
        majorTransformation: 'Calculates date difference from current date and assigns aging buckets (0-30, 31-90, 90+ days).',
        toolCount: 1,
        toolIds: ['t118'],
        annotations: ['DateTimeDiff calculation against DateTimeToday()', 'Assign Aging Bucket categories'],
      },
      {
        stageNumber: 8,
        name: 'Risk & Geographic Exports',
        shortTitle: '08 RISK & GEOGRAPHIC EXPORTS',
        summary: 'Aggregates and outputs claims by product type, state, and aging/litigation risk.',
        businessPurpose: 'Publishes segmented risk, state-level, and product-line reporting deliverables.',
        majorTransformation: 'Multidimensional rollups and Excel report exports.',
        toolCount: 9,
        toolIds: ['t130', 't131', 't132', 't140', 't141', 't142', 't150', 't151', 't152'],
        annotations: ['Summarize and write Claims_By_Product_Type_Demo_Output.xlsx', 'Summarize and write Claims_By_State_Demo_Output.xlsx', 'Summarize and write Claims_Aging_Risk_Demo_Output.xlsx'],
      },
    ],
  },
  c11: {
    oneLinePurpose: 'Consolidates policy, claims and payment data from multiple sources.',
    businessPurpose: 'Ingests multi-source policy data, customer demographics, and transactional claims payments to calculate month-end schedules, categorize premium risk tiers, and generate consolidated claims marts.',
    sourceInputs: [
      { name: 'Source Input #1', sourceFilename: 'Policy Data', sourceType: 'Alteryx Text Input', businessRole: 'Policy profiles (Policy_ID, Plan, Start Date)' },
      { name: 'Source Input #2', sourceFilename: 'Policy Premium Data', sourceType: 'Alteryx Text Input', businessRole: 'Snapshot month and monthly premium amounts' },
      { name: 'Source Input #3', sourceFilename: 'Claims Data', sourceType: 'Alteryx Text Input', businessRole: 'Core claims transaction records' },
      { name: 'Source Input #4', sourceFilename: 'Diagnosis Data', sourceType: 'Alteryx Text Input', businessRole: 'Diagnosis types and ICD codes' },
      { name: 'Source Input #5', sourceFilename: 'Payment Data', sourceType: 'Alteryx Text Input', businessRole: 'Payment transactions and amounts' },
    ],
    businessOutputs: [
      { name: 'Policy Consolidation Output', destinationType: 'Excel / Control Container', likelyUse: 'Enterprise policy administration reporting' },
      { name: 'Claims Consolidated Mart', destinationType: 'Enterprise Mart', likelyUse: 'Downstream cross-sell and claims dashboards' },
      { name: 'SL Monthly Volume', destinationType: 'Analytical Dataset', likelyUse: 'Executive claims frequency tracking' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Data Ingestion',
        shortTitle: '01 DATA INGESTION',
        summary: 'Ingests policy, premium, claims, diagnosis, and payment source datasets.',
        businessPurpose: 'Extracts multi-stream input feeds into standardized pipeline branches.',
        majorTransformation: 'Simultaneous 5-stream data ingestion.',
        toolCount: 5,
        toolIds: ['#1', '#6', '#28', '#31', '#39'],
        annotations: ['Ingest Policy Data (#1)', 'Ingest Policy Premium (#6)', 'Ingest Diagnosis Data (#28)', 'Ingest Claims Data (#31)', 'Ingest Payment Data (#39)'],
      },
      {
        stageNumber: 2,
        name: 'Parsing & Schema Standardization',
        shortTitle: '02 PARSING & SCHEMA STANDARDIZATION',
        summary: 'Delimits text records, strips delimiters, and standardizes column schemas.',
        businessPurpose: 'Cleanses raw input feeds and enforces canonical field schemas.',
        majorTransformation: 'Delimiter splitting, dynamic header assignment, and column projection.',
        toolCount: 15,
        toolIds: ['#2', '#3', '#4', '#7', '#8', '#9', '#26', '#27', '#29', '#32', '#33', '#34', '#40', '#41', '#42'],
        annotations: ['Text to columns delimiter splitting across all streams', 'Dynamic renaming from first row headers', 'Select and cast typed columns'],
      },
      {
        stageNumber: 3,
        name: 'Policy & Premium Enrichment',
        shortTitle: '03 POLICY & PREMIUM ENRICHMENT',
        summary: 'Joins policy profiles with monthly premium metrics and assigns premium tier categories.',
        businessPurpose: 'Derives policyholder premium risk tiers (High / Medium).',
        majorTransformation: 'Join on Policy_ID and Premium_Group formula evaluation.',
        toolCount: 4,
        toolIds: ['#16', '#17', '#18', '#46'],
        annotations: ['Join Policy Data with Premium Data on Policy_ID', 'Formula: categorize Monthly_Premium into Premium_Group', 'Data Ingestion Control Container'],
      },
      {
        stageNumber: 4,
        name: 'Diagnosis & Payment Rollup',
        shortTitle: '04 DIAGNOSIS & PAYMENT ROLLUP',
        summary: 'Aggregates max ICD codes, computes month-end payment schedules, and rolls up paid amounts per claim.',
        businessPurpose: 'Calculates chronological payment deadlines and primary diagnosis codes.',
        majorTransformation: 'Month_End_Date formula derivation and grouped metric aggregations.',
        toolCount: 6,
        toolIds: ['#22', '#25', '#36', '#37', '#38', '#44'],
        annotations: ['Formula: DateTimeTrim Month_End_Date derivation', 'Summarize: Max ICD_Code by Diagnosis_Type', 'Summarize: Paid Amount sum and distinct Payments Made count'],
      },
      {
        stageNumber: 5,
        name: 'Claims & Policy Consolidation',
        shortTitle: '05 CLAIMS & POLICY CONSOLIDATION',
        summary: 'Joins enriched policy records with claims and payment aggregations for downstream publication.',
        businessPurpose: 'Publishes unified enterprise analytical claims mart.',
        majorTransformation: 'Multi-stream relational joins on Claim_ID and Policy_ID.',
        toolCount: 4,
        toolIds: ['#23', '#24', '#43', '#45'],
        annotations: ['Join claims with diagnosis ICD rollups', 'Join claims with payment aggregates', 'Join consolidated claims with policy profiles', 'Control Container WF01 (Claims Summary)'],
      },
    ],
  },
  c12: {
    oneLinePurpose: 'Consolidates claims and payments data through various transformations.',
    businessPurpose: 'Consolidates claims payment records, calculates month-end dates, derives maximum diagnosis ICD codes per claim, and produces unified claims settlement output.',
    sourceInputs: [
      { name: 'Source Input #1', sourceFilename: 'Claims Data', sourceType: 'Alteryx Text Input', businessRole: 'Base claims transactions' },
      { name: 'Source Input #2', sourceFilename: 'Diagnosis Data', sourceType: 'Alteryx Text Input', businessRole: 'Claim diagnosis classifications and ICD codes' },
      { name: 'Source Input #3', sourceFilename: 'Payment Data', sourceType: 'Alteryx Text Input', businessRole: 'Claim settlement payment details' },
    ],
    businessOutputs: [
      { name: 'WF01_Output.xlsx', destinationType: 'Excel Workbook (Sheet1)', likelyUse: 'Claims consolidation and settlement reporting' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Source Extraction',
        shortTitle: '01 SOURCE EXTRACTION',
        summary: 'Ingests raw claims, diagnosis, and payment transaction text feeds.',
        businessPurpose: 'Input data feed extraction from core transactional tables.',
        majorTransformation: 'Multi-stream ingestion.',
        toolCount: 3,
        toolIds: ['#8', '#11', '#15'],
        annotations: ['Ingest Claims Data (#8)', 'Ingest Diagnosis Data (#11)', 'Ingest Payment Data (#15)'],
      },
      {
        stageNumber: 2,
        name: 'Parsing & Schema Standardization',
        shortTitle: '02 PARSING & SCHEMA STANDARDIZATION',
        summary: 'Delimits text feeds into structured columns and renames schema fields.',
        businessPurpose: 'Cleanses raw feeds and applies header renaming.',
        majorTransformation: 'Delimiter splitting and dynamic renaming.',
        toolCount: 6,
        toolIds: ['#6', '#7', '#9', '#12', '#13', '#14', '#18', '#19', '#20'],
        annotations: ['Text to columns on Field1', 'Select required columns and rename headers'],
      },
      {
        stageNumber: 3,
        name: 'Payment Schedule & ICD Rollup',
        shortTitle: '03 PAYMENT SCHEDULE & ICD ROLLUP',
        summary: 'Computes month-end payment dates, aggregates payment totals, and finds max ICD codes.',
        businessPurpose: 'Derives settlement payment dates and rollup metrics per claim.',
        majorTransformation: 'Month_End_Date formula and Summarize aggregations.',
        toolCount: 4,
        toolIds: ['#16', '#17', '#5', '#10'],
        annotations: ['Formula: Month_End_Date derivation', 'Summarize: Sum of Payment_Amount and distinct Payment_ID count', 'Summarize: Max ICD_Code by Diagnosis_Type'],
      },
      {
        stageNumber: 4,
        name: 'Relational Integration',
        shortTitle: '04 RELATIONAL INTEGRATION',
        summary: 'Joins diagnosis records, payment summaries, and claims records on Claim_ID.',
        businessPurpose: 'Integrates disparate streams into single enriched claims record.',
        majorTransformation: 'Relational joins on Claim_ID and Diagnosis_Type.',
        toolCount: 3,
        toolIds: ['#1', '#2', '#3'],
        annotations: ['Join claims with payment summary', 'Join claims with diagnosis classification'],
      },
      {
        stageNumber: 5,
        name: 'Deliverable Export',
        shortTitle: '05 DELIVERABLE EXPORT',
        summary: 'Writes consolidated claims and payment records to Excel output.',
        businessPurpose: 'Exports finalized settlement reporting dataset.',
        majorTransformation: 'Output file generation.',
        toolCount: 1,
        toolIds: ['#4'],
        annotations: ['Write WF01_Output.xlsx (Sheet1)'],
      },
    ],
  },
  c13: {
    oneLinePurpose: 'Calculates key dates and aggregates claim volumes by industry type.',
    businessPurpose: 'Calculates key operational dates including Clm_Service_Date and Month_End_Date using predefined formula logic and aggregates claim volume summaries by industry sector.',
    sourceInputs: [
      { name: 'Source Input #1', sourceFilename: 'Claim Industry Data', sourceType: 'Alteryx Text Input', businessRole: 'Industry classifications' },
      { name: 'Source Input #2', sourceFilename: 'Claims Data', sourceType: 'Alteryx Text Input', businessRole: 'Claims transaction records' },
      { name: 'Source Input #3', sourceFilename: 'Payment Data', sourceType: 'Alteryx Text Input', businessRole: 'Payment history records' },
    ],
    businessOutputs: [
      { name: 'SL_Monthly_C_Volume.xlsx', destinationType: 'Excel Workbook (Sheet1)', likelyUse: 'Industry claim volume performance reports' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Source Ingestion',
        shortTitle: '01 SOURCE INGESTION',
        summary: 'Ingests claim industry data, claims data, and payment stream inputs.',
        businessPurpose: 'Extracts 3 transactional feeds into the workflow.',
        majorTransformation: 'Multi-stream text input extraction.',
        toolCount: 3,
        toolIds: ['#1', '#7', '#11'],
        annotations: ['Ingest Claim Industry Data', 'Ingest Claims Data', 'Ingest Payment Data'],
      },
      {
        stageNumber: 2,
        name: 'Field Extraction & Parsing',
        shortTitle: '02 FIELD EXTRACTION & PARSING',
        summary: 'Parses delimited strings and applies dynamic column headers.',
        businessPurpose: 'Standardizes column types and formats.',
        majorTransformation: 'Text delimiter parsing and field selection.',
        toolCount: 6,
        toolIds: ['#2', '#5', '#6', '#8', '#9', '#10'],
        annotations: ['Text to columns delimiter parsing', 'Dynamic column renaming', 'Select required attributes'],
      },
      {
        stageNumber: 3,
        name: 'Date Derivation & Summarization',
        shortTitle: '03 DATE DERIVATION & SUMMARIZATION',
        summary: 'Derives service dates, month-end dates, and calculates payment aggregates.',
        businessPurpose: 'Computes settlement chronology and payment sums.',
        majorTransformation: 'Clm_Service_Date and Month_End_Date formulas with Summarize totals.',
        toolCount: 4,
        toolIds: ['#12', '#13', '#14', '#15'],
        annotations: ['Formula: Clm_Service_Date derivation', 'Formula: Month_End_Date derivation', 'Summarize payment totals by claim'],
      },
      {
        stageNumber: 4,
        name: 'Industry Join',
        shortTitle: '04 INDUSTRY JOIN',
        summary: 'Joins claims with industry classification and service date rollups.',
        businessPurpose: 'Enriches claims with commercial industry sectors.',
        majorTransformation: 'Relational join on Claim_ID and Industry_Type.',
        toolCount: 4,
        toolIds: ['#3', '#4', '#16'],
        annotations: ['Join claims with industry categories', 'Filter active industry claims'],
      },
      {
        stageNumber: 5,
        name: 'Volume Publication',
        shortTitle: '05 VOLUME PUBLICATION',
        summary: 'Exports monthly industry claim volume reports to Excel.',
        businessPurpose: 'Publishes industry volume summary deliverable.',
        majorTransformation: 'Excel output generation.',
        toolCount: 1,
        toolIds: ['#17'],
        annotations: ['Write SL_Monthly_C_Volume.xlsx'],
      },
    ],
  },
  c14: {
    oneLinePurpose: 'Secondary extract workflow for aging-litigation risk categorization.',
    businessPurpose: 'Extracts historical claims volume and financial payment transactions from core Excel workbooks, enriches claim details with policy attributes and adjuster notes, and generates executive quarterly, product-level, geographical, and aging risk summary deliverables.',
    sourceInputs: [
      { name: 'Claims_Volume_Extract_Demo.xlsx', sourceFilename: 'Claims_Volume_Extract_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Primary claims volume extract' },
      { name: 'Policy_Master_Demo.xlsx', sourceFilename: 'Policy_Master_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Policy reference attributes' },
      { name: 'Claim_Payments_Demo.xlsx', sourceFilename: 'Claim_Payments_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Claim payment transactions' },
      { name: 'Claim_Diary_Notes_Demo.xlsx', sourceFilename: 'Claim_Diary_Notes_Demo.xlsx', sourceType: 'Excel Workbook', businessRole: 'Adjuster diary notes' },
    ],
    businessOutputs: [
      { name: 'Claims Historical Detail', destinationType: 'Excel (Detail Sheet)', likelyUse: 'Claim-level audit and historical analysis' },
      { name: 'Claims Quarter Summary', destinationType: 'Excel (QuarterSummary Sheet)', likelyUse: 'Quarterly management volume reporting' },
      { name: 'Product Type Summary', destinationType: 'Excel (ProductTypeSummary Sheet)', likelyUse: 'Product line loss performance reviews' },
      { name: 'State Summary', destinationType: 'Excel (StateSummary Sheet)', likelyUse: 'Geographical volume and state distribution' },
      { name: 'Aging/Litigation Risk Summary', destinationType: 'Excel (AgingRiskSummary Sheet)', likelyUse: 'Litigation tracking and diary aging risk' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Extract Claims Data',
        shortTitle: '01 EXTRACT CLAIMS DATA',
        summary: 'Reads claims volume dataset and initializes branch processing.',
        businessPurpose: 'Primary claims data extraction from core operational workbook.',
        majorTransformation: 'Sequential branch fan-out via Block Until Done.',
        toolCount: 2,
        toolIds: ['t1', 't2'],
        annotations: ['Reads Claims_Volume_Extract_Demo.xlsx', 'Fans out to quarterly and team summarization branches'],
      },
      {
        stageNumber: 2,
        name: 'Create Summarizations',
        shortTitle: '02 CREATE SUMMARIZATIONS',
        summary: 'Claims volume aggregation by quarter and status with cross-tab pivots.',
        businessPurpose: 'Quarterly historical volume and status distribution rollups.',
        majorTransformation: 'CrossTab pivot and quarter-end date descending sorting.',
        toolCount: 5,
        toolIds: ['t3', 't4', 't5', 't6', 't7'],
        annotations: ['Group by Quarter End Date and Claim Status', 'Pivot claim status counts', 'Preview temp snapshot in Browse'],
      },
      {
        stageNumber: 3,
        name: 'Latest Quarter Team Analysis',
        shortTitle: '03 LATEST QUARTER TEAM ANALYSIS',
        summary: 'Claims volume aggregation by manager and examiner for the most recent quarter.',
        businessPurpose: 'Executive team productivity scorecard for the active reporting period.',
        majorTransformation: 'Finds max quarter and filters managerial records via Join.',
        toolCount: 7,
        toolIds: ['t8', 't9', 't10', 't11', 't12', 't13', 't14'],
        annotations: ['Find latest reporting quarter end date', 'Join manager and examiner summaries to latest quarter', 'CrossTab pivot by team and manager'],
      },
      {
        stageNumber: 4,
        name: 'Detail Exports',
        shortTitle: '04 DETAIL EXPORTS',
        summary: 'Prepares claim-level historical details and quarterly summary Excel exports.',
        businessPurpose: 'Publishes core historical claim detail and quarterly volume worksheets.',
        majorTransformation: 'Field projection, sorting, and multi-tab Excel output generation.',
        toolCount: 4,
        toolIds: ['t15', 't16', 't17', 't18'],
        annotations: ['Select claim detail and diagnosis fields', 'Write Claims_Historical_Extract_Demo_Output.xlsx (Detail & QuarterSummary)'],
      },
      {
        stageNumber: 5,
        name: 'Additional Claims Data Sources',
        shortTitle: '05 ADDITIONAL CLAIMS DATA SOURCES',
        summary: 'Ingests policy master, payments, and adjuster diary records.',
        businessPurpose: 'Enrichment feed ingestion from auxiliary underwriting and transaction systems.',
        majorTransformation: 'Multi-source file ingestion.',
        toolCount: 3,
        toolIds: ['t101', 't102', 't103'],
        annotations: ['Reads Policy_Master_Demo.xlsx', 'Reads Claim_Payments_Demo.xlsx', 'Reads Claim_Diary_Notes_Demo.xlsx'],
      },
      {
        stageNumber: 6,
        name: 'Enrichment & Joins',
        shortTitle: '06 ENRICHMENT & JOINS',
        summary: 'Aggregates payments and executes relational joins to enrich claims with policy and diary notes.',
        businessPurpose: 'Consolidates financial payment metrics and adjuster notes with base claims.',
        majorTransformation: 'Payment summarization, multi-table left outer joins, and null flag default formatting.',
        toolCount: 8,
        toolIds: ['t104', 't111', 't112', 't113', 't114', 't115', 't116', 't117'],
        annotations: ['Roll up total payments per claim', 'Join claims with policy master attributes', 'Join claims with adjuster diary entries', 'Default missing payments to 0'],
      },
      {
        stageNumber: 7,
        name: 'Aging Risk Categorization',
        shortTitle: '07 AGING RISK CATEGORIZATION',
        summary: 'Computes activity duration and assigns aging risk buckets.',
        businessPurpose: 'Categorizes claims into duration-based aging risk tiers.',
        majorTransformation: 'Calculates date difference from current date and assigns aging buckets (0-30, 31-90, 90+ days).',
        toolCount: 1,
        toolIds: ['t118'],
        annotations: ['DateTimeDiff calculation against DateTimeToday()', 'Assign Aging Bucket categories'],
      },
      {
        stageNumber: 8,
        name: 'Risk & Geographic Exports',
        shortTitle: '08 RISK & GEOGRAPHIC EXPORTS',
        summary: 'Aggregates and outputs claims by product type, state, and aging/litigation risk.',
        businessPurpose: 'Publishes segmented risk, state-level, and product-line reporting deliverables.',
        majorTransformation: 'Multidimensional rollups and Excel report exports.',
        toolCount: 9,
        toolIds: ['t130', 't131', 't132', 't140', 't141', 't142', 't150', 't151', 't152'],
        annotations: ['Summarize and write Claims_By_Product_Type_Demo_Output.xlsx', 'Summarize and write Claims_By_State_Demo_Output.xlsx', 'Summarize and write Claims_Aging_Risk_Demo_Output.xlsx'],
      },
    ],
  },
  u4: {
    oneLinePurpose: 'Consolidates operational data across volume performance, geography, and operation metrics.',
    businessPurpose: 'Ingests customer underwriting profiles and characteristic weight tables, evaluates risk scores via custom underwriting macro logic, and outputs validated underwriting profiles.',
    sourceInputs: [
      { name: 'Source Input #30', sourceFilename: 'Customer Underwriting Data', sourceType: 'Alteryx Text Input', businessRole: 'Customer demographic and policy records' },
      { name: 'Source Input #31', sourceFilename: 'Customer Characteristics Mapping', sourceType: 'Alteryx Text Input', businessRole: 'Attribute-value-weight mappings' },
    ],
    businessOutputs: [
      { name: 'Underwriting Profile Inspection', destinationType: 'BrowseV2 Output', likelyUse: 'Underwriting validation and rating inspection' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Profile Ingestion',
        shortTitle: '01 PROFILE INGESTION',
        summary: 'Ingests customer demographic attributes and characteristic weight tables.',
        businessPurpose: 'Extracts underwriting profiles and score mappings.',
        majorTransformation: 'Dual stream text input extraction.',
        toolCount: 2,
        toolIds: ['#30', '#31'],
        annotations: ['Ingest Customer Underwriting Data', 'Ingest Customer Characteristics Mapping'],
      },
      {
        stageNumber: 2,
        name: 'Macro Execution',
        shortTitle: '02 MACRO EXECUTION',
        summary: 'Executes custom Underwriting Macro logic to calculate customer risk ratings.',
        businessPurpose: 'Underwriting risk scoring and rating computation.',
        majorTransformation: 'Custom macro execution (Workflow_04_Macro.yxmc).',
        toolCount: 1,
        toolIds: ['#36'],
        annotations: ['Execute Workflow_04_Macro.yxmc on incoming profiles'],
      },
      {
        stageNumber: 3,
        name: 'Profile Inspection',
        shortTitle: '03 PROFILE INSPECTION',
        summary: 'Profiles and inspects transformed underwriting risk scores.',
        businessPurpose: 'Output validation.',
        majorTransformation: 'Data profiling and preview.',
        toolCount: 1,
        toolIds: ['#35'],
        annotations: ['Inspect and profile output records in BrowseV2'],
      },
    ],
  },
  d6: {
    oneLinePurpose: 'Processes operational distribution data with date filtering and volume aggregations.',
    businessPurpose: 'Reads regional operational distribution datasets, parses dates, filters records for Thursday operational cycles, and calculates average distribution volume for reporting.',
    sourceInputs: [
      { name: '4701229_YK5IEQ9R.xlsx', sourceFilename: '4701229_YK5IEQ9R.xlsx', sourceType: 'Excel Workbook (Sheet1)', businessRole: 'Distribution volume and date records' },
    ],
    businessOutputs: [
      { name: 'Workflow8_output.xlsx', destinationType: 'Excel Workbook (Sheet1)', likelyUse: 'Thursday operational distribution volume report' },
    ],
    processingStages: [
      {
        stageNumber: 1,
        name: 'Data Ingestion',
        shortTitle: '01 DATA INGESTION',
        summary: 'Reads operational distribution records from Excel workbook.',
        businessPurpose: 'Extracts source records from 4701229_YK5IEQ9R.xlsx.',
        majorTransformation: 'Excel workbook file reading.',
        toolCount: 1,
        toolIds: ['#1'],
        annotations: ['Read 4701229_YK5IEQ9R.xlsx (Sheet1)'],
      },
      {
        stageNumber: 2,
        name: 'Date Parsing & Filtering',
        shortTitle: '02 DATE PARSING & FILTERING',
        summary: 'Converts date strings to datetime and filters records for Thursday cycles.',
        businessPurpose: 'Standardizes dates and isolates Thursday operational schedules.',
        majorTransformation: 'Custom datetime parsing and DayOfWeek filter.',
        toolCount: 2,
        toolIds: ['#3', '#4'],
        annotations: ['Convert Date to DateTime_Out', "Filter: DayOfWeek([DateTime_Out]) = 'Thursday'"],
      },
      {
        stageNumber: 3,
        name: 'Volume Summarization',
        shortTitle: '03 VOLUME SUMMARIZATION',
        summary: 'Calculates average distribution volume metrics.',
        businessPurpose: 'Computes average distribution volume for the period.',
        majorTransformation: 'Average aggregation on Burritos field.',
        toolCount: 1,
        toolIds: ['#5'],
        annotations: ['Summarize: Average of Burritos -> Avg_Burritos'],
      },
      {
        stageNumber: 4,
        name: 'Report Export',
        shortTitle: '04 REPORT EXPORT',
        summary: 'Publishes summarized distribution metrics to Workflow8_output.xlsx.',
        businessPurpose: 'Delivers distribution reporting workbook.',
        majorTransformation: 'Excel output generation.',
        toolCount: 1,
        toolIds: ['#6'],
        annotations: ['Write Workflow8_output.xlsx (Sheet1)'],
      },
    ],
  },
};

// Aliases
WORKFLOW_BUSINESS_SUMMARIES.p4 = WORKFLOW_BUSINESS_SUMMARIES.c11;
WORKFLOW_BUSINESS_SUMMARIES.p5 = WORKFLOW_BUSINESS_SUMMARIES.c12;
WORKFLOW_BUSINESS_SUMMARIES.p6 = WORKFLOW_BUSINESS_SUMMARIES.c13;

/**
 * Returns deterministic business summary facts for a given workflow asset.
 * Falls back to dynamically generated facts from detailData if not explicitly registered.
 */
export function getWorkflowBusinessSummary(assetId: string, detailData?: AlteryxDetailData, fallbackDescription?: string): WorkflowBusinessSummary {
  const registered = WORKFLOW_BUSINESS_SUMMARIES[assetId];
  if (registered) return registered;

  // Dynamic fallback from detailData
  const tools = detailData?.tools ?? [];
  const connections = detailData?.connections ?? [];
  const inputConns = connections.filter((c) => c.direction === 'input');
  const outputConns = connections.filter((c) => c.direction === 'output');

  const sourceInputs: BusinessInput[] = inputConns.length > 0
    ? inputConns.map((c, i) => ({
        name: c.name || `Source Input #${i + 1}`,
        sourceFilename: c.name,
        sourceType: c.type || 'Data Source',
      }))
    : [{ name: 'Source Input #1', sourceFilename: 'Source Data', sourceType: 'Data Source' }];

  const businessOutputs: BusinessOutput[] = outputConns.length > 0
    ? outputConns.map((c) => ({
        name: c.name || 'Analytical Deliverable',
        destinationType: c.type || 'Output Dataset',
        likelyUse: 'Downstream analytical reporting',
      }))
    : [{ name: 'Analytical Output', destinationType: 'Output Dataset', likelyUse: 'Reporting' }];

  const stages: BusinessStage[] = detailData?.pipelineStages && detailData.pipelineStages.length > 0
    ? detailData.pipelineStages.map((stg, i) => ({
        stageNumber: i + 1,
        name: stg.label,
        shortTitle: `0${i + 1} ${stg.label.toUpperCase()}`,
        summary: `${stg.label} operational stage processing ${stg.tools} tools.`,
        toolCount: stg.tools,
        toolIds: tools.slice(i * 3, i * 3 + stg.tools).map((t) => t.id),
      }))
    : [
        {
          stageNumber: 1,
          name: 'Data Ingestion & Extraction',
          shortTitle: '01 DATA INGESTION',
          summary: 'Extracts and validates raw input feeds.',
          toolCount: inputConns.length || 1,
          toolIds: tools.filter((t) => t.category === 'Input').map((t) => t.id),
        },
        {
          stageNumber: 2,
          name: 'Transformation & Processing',
          shortTitle: '02 TRANSFORMATION & PROCESSING',
          summary: 'Applies business rules, filtering, and metric aggregations.',
          toolCount: Math.max(1, tools.length - inputConns.length - outputConns.length),
          toolIds: tools.filter((t) => t.category !== 'Input' && t.category !== 'Output').map((t) => t.id),
        },
        {
          stageNumber: 3,
          name: 'Deliverables Publication',
          shortTitle: '03 DELIVERABLES PUBLICATION',
          summary: 'Publishes finalized analytical reporting deliverables.',
          toolCount: outputConns.length || 1,
          toolIds: tools.filter((t) => t.category === 'Output').map((t) => t.id),
        },
      ];

  return {
    oneLinePurpose: fallbackDescription || 'Data preparation and reporting workflow.',
    businessPurpose: fallbackDescription || 'Executes multi-stage data integration and analytical transformation pipeline to publish reporting deliverables.',
    sourceInputs,
    processingStages: stages,
    businessOutputs,
  };
}