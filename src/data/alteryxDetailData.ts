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
    avgRuntime: '',
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
    avgRuntime: '',
  },
  p4: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '',
  },
  p5: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '',
  },
  p6: {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '',
  },
};

// Policy Administration workflows use the same underlying Alteryx workflow definitions.
ALTERYX_DETAIL_DATA.p4 = ALTERYX_DETAIL_DATA.c11; // Workflow_03
ALTERYX_DETAIL_DATA.p5 = ALTERYX_DETAIL_DATA.c12; // Workflow_01
ALTERYX_DETAIL_DATA.p6 = ALTERYX_DETAIL_DATA.c13; // Workflow_02