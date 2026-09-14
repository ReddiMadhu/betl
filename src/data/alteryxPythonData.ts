/**
 * Static data for Alteryx → Python migration workspace
 */

export interface AltPyWorkflow {
  id: string;
  name: string;
  description: string;
  toolCount: number;
  complexity: 'Low' | 'Medium' | 'High';
  inputConnections: string[];
  outputConnections: string[];
  conversionConfidence: number;
  status: 'converted' | 'review' | 'manual';
}

export interface AltPyToolConversion {
  id: string;
  alteryxTool: string;
  pythonEquivalent: string;
  category: 'input' | 'transform' | 'join' | 'output' | 'spatial' | 'parse';
  confidence: number;
  notes: string;
  workflowId: string;
}

export interface AltPyCodeBlock {
  id: string;
  workflowName: string;
  fileName: string;
  language: 'python';
  code: string;
  lineCount: number;
  description: string;
}

export interface AltPyExportArtifact {
  id: string;
  fileName: string;
  type: 'python' | 'requirements' | 'readme' | 'config' | 'notebook';
  description: string;
  size: string;
}

/* ── Summary ── */
export const altPySummary = {
  totalWorkflows: 8,
  totalTools: 127,
  convertedTools: 118,
  manualReviewTools: 7,
  failedTools: 2,
  avgConfidence: 91,
  totalOutputScripts: 8,
  estimatedSavingsHrs: 320,
};

/* ── Workflows ── */
export const altPyWorkflows: AltPyWorkflow[] = [
  {
    id: 'wf-1', name: 'Claims Data Preparation',
    description: 'Daily ETL pipeline that ingests raw claims data, cleanses fields, applies business rules, and loads into the claims data warehouse.',
    toolCount: 22, complexity: 'High',
    inputConnections: ['SQL Server - Claims_Raw', 'Excel - Lookup_Tables'],
    outputConnections: ['SQL Server - Claims_DW', 'Shared Drive - Daily_Extract.csv'],
    conversionConfidence: 94, status: 'converted',
  },
  {
    id: 'wf-2', name: 'Policy Renewal Scoring',
    description: 'Monthly scoring workflow that calculates renewal propensity scores based on policyholder behavior and claims history.',
    toolCount: 18, complexity: 'High',
    inputConnections: ['Oracle - Policy_Master', 'CSV - External_Credit_Scores'],
    outputConnections: ['SQL Server - Renewal_Scores', 'Email - Score_Summary.xlsx'],
    conversionConfidence: 87, status: 'converted',
  },
  {
    id: 'wf-3', name: 'Agent Commission Calculator',
    description: 'Weekly commission calculation with tiered rates, overrides, and bonus qualifiers.',
    toolCount: 15, complexity: 'Medium',
    inputConnections: ['SQL Server - Sales_Transactions', 'Excel - Commission_Schedule'],
    outputConnections: ['SQL Server - Commission_Output', 'CSV - Commission_Detail.csv'],
    conversionConfidence: 96, status: 'converted',
  },
  {
    id: 'wf-4', name: 'Geospatial Risk Assessment',
    description: 'Quarterly spatial analysis workflow that overlays policy locations with hazard zones for catastrophe exposure assessment.',
    toolCount: 24, complexity: 'High',
    inputConnections: ['Shapefile - Hazard_Zones', 'SQL Server - Policy_Locations'],
    outputConnections: ['SQL Server - Risk_Zones', 'Shapefile - Exposure_Map'],
    conversionConfidence: 72, status: 'review',
  },
  {
    id: 'wf-5', name: 'Financial Reconciliation',
    description: 'Daily reconciliation between premium billing system and general ledger with variance detection.',
    toolCount: 12, complexity: 'Medium',
    inputConnections: ['SQL Server - Billing_System', 'SAP - General_Ledger'],
    outputConnections: ['SQL Server - Recon_Results', 'Email - Variance_Alert'],
    conversionConfidence: 93, status: 'converted',
  },
  {
    id: 'wf-6', name: 'Customer 360 Data Merge',
    description: 'Weekly merge of customer data from CRM, policy admin, and claims systems into unified customer profile.',
    toolCount: 19, complexity: 'High',
    inputConnections: ['Salesforce API', 'SQL Server - Policy_Admin', 'SQL Server - Claims'],
    outputConnections: ['SQL Server - Customer_360', 'Parquet - Customer_Snapshot'],
    conversionConfidence: 89, status: 'converted',
  },
  {
    id: 'wf-7', name: 'Regulatory Report Generator',
    description: 'Quarterly NAIC statutory reporting data preparation with format validation and submission file generation.',
    toolCount: 10, complexity: 'Medium',
    inputConnections: ['SQL Server - Statutory_Data'],
    outputConnections: ['XML - NAIC_Filing.xml', 'Excel - Regulatory_Workpaper.xlsx'],
    conversionConfidence: 95, status: 'converted',
  },
  {
    id: 'wf-8', name: 'Loss Development Triangle Builder',
    description: 'Monthly actuarial triangle builder that pivots claims data into accident year × development period format.',
    toolCount: 7, complexity: 'Low',
    inputConnections: ['SQL Server - Claims_History'],
    outputConnections: ['Excel - LDT_Output.xlsx', 'SQL Server - Actuarial_Triangles'],
    conversionConfidence: 98, status: 'converted',
  },
];

/* ── Tool Conversions ── */
export const altPyToolConversions: AltPyToolConversion[] = [
  { id: 'tc-1', alteryxTool: 'Input Data', pythonEquivalent: 'pd.read_sql() / pd.read_csv()', category: 'input', confidence: 99, notes: 'Direct mapping to pandas I/O', workflowId: 'wf-1' },
  { id: 'tc-2', alteryxTool: 'Select', pythonEquivalent: 'df[columns] / df.rename()', category: 'transform', confidence: 99, notes: 'Column selection and renaming', workflowId: 'wf-1' },
  { id: 'tc-3', alteryxTool: 'Filter', pythonEquivalent: 'df.query() / df[mask]', category: 'transform', confidence: 98, notes: 'Boolean masking with pandas', workflowId: 'wf-1' },
  { id: 'tc-4', alteryxTool: 'Formula', pythonEquivalent: 'df.assign() / df.apply()', category: 'transform', confidence: 95, notes: 'Calculated columns via assign or apply', workflowId: 'wf-1' },
  { id: 'tc-5', alteryxTool: 'Join', pythonEquivalent: 'pd.merge()', category: 'join', confidence: 98, notes: 'Supports all join types (inner, left, right, outer)', workflowId: 'wf-1' },
  { id: 'tc-6', alteryxTool: 'Summarize', pythonEquivalent: 'df.groupby().agg()', category: 'transform', confidence: 97, notes: 'GroupBy with multiple aggregation functions', workflowId: 'wf-1' },
  { id: 'tc-7', alteryxTool: 'Sort', pythonEquivalent: 'df.sort_values()', category: 'transform', confidence: 100, notes: 'Direct equivalent', workflowId: 'wf-1' },
  { id: 'tc-8', alteryxTool: 'Output Data', pythonEquivalent: 'df.to_sql() / df.to_csv()', category: 'output', confidence: 99, notes: 'Direct mapping to pandas output', workflowId: 'wf-1' },
  { id: 'tc-9', alteryxTool: 'Multi-Row Formula', pythonEquivalent: 'df.shift() / df.rolling()', category: 'transform', confidence: 88, notes: 'Row-offset via shift, rolling aggregations', workflowId: 'wf-2' },
  { id: 'tc-10', alteryxTool: 'Transpose', pythonEquivalent: 'df.melt() / df.pivot()', category: 'transform', confidence: 95, notes: 'Reshape operations', workflowId: 'wf-2' },
  { id: 'tc-11', alteryxTool: 'Cross Tab', pythonEquivalent: 'pd.pivot_table()', category: 'transform', confidence: 96, notes: 'Pivot table with aggregation', workflowId: 'wf-8' },
  { id: 'tc-12', alteryxTool: 'Union', pythonEquivalent: 'pd.concat()', category: 'join', confidence: 99, notes: 'Vertical concatenation', workflowId: 'wf-6' },
  { id: 'tc-13', alteryxTool: 'Unique', pythonEquivalent: 'df.drop_duplicates()', category: 'transform', confidence: 100, notes: 'Direct equivalent', workflowId: 'wf-6' },
  { id: 'tc-14', alteryxTool: 'Sample', pythonEquivalent: 'df.sample()', category: 'transform', confidence: 100, notes: 'Random sampling', workflowId: 'wf-2' },
  { id: 'tc-15', alteryxTool: 'RegEx', pythonEquivalent: 'df.str.extract() / re module', category: 'parse', confidence: 92, notes: 'Pattern matching and extraction', workflowId: 'wf-7' },
  { id: 'tc-16', alteryxTool: 'DateTime', pythonEquivalent: 'pd.to_datetime()', category: 'transform', confidence: 97, notes: 'Date parsing and formatting', workflowId: 'wf-1' },
  { id: 'tc-17', alteryxTool: 'Spatial Match', pythonEquivalent: 'geopandas.sjoin()', category: 'spatial', confidence: 72, notes: 'Requires geopandas; spatial join operations', workflowId: 'wf-4' },
  { id: 'tc-18', alteryxTool: 'Trade Area', pythonEquivalent: 'shapely.buffer()', category: 'spatial', confidence: 68, notes: 'Geometric buffer operations; may need manual tuning', workflowId: 'wf-4' },
  { id: 'tc-19', alteryxTool: 'Distance', pythonEquivalent: 'geopy.distance.geodesic()', category: 'spatial', confidence: 75, notes: 'Geodesic distance calculation', workflowId: 'wf-4' },
  { id: 'tc-20', alteryxTool: 'Email', pythonEquivalent: 'smtplib / sendgrid', category: 'output', confidence: 90, notes: 'Email notification via SMTP or API', workflowId: 'wf-5' },
];

/* ── Code Blocks ── */
export const altPyCodeBlocks: AltPyCodeBlock[] = [
  {
    id: 'cb-1', workflowName: 'Claims Data Preparation', fileName: 'claims_data_prep.py',
    language: 'python', lineCount: 145,
    description: 'Complete ETL pipeline: read from SQL Server, cleanse, apply business rules, load to warehouse.',
    code: `"""Claims Data Preparation Pipeline
Converted from Alteryx workflow: Claims Data Preparation
Generated: 2024-11-15
"""

import pandas as pd
import sqlalchemy as sa
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Configuration ──
SOURCE_CONN = "mssql+pyodbc://server/Claims_Raw?driver=ODBC+Driver+17+for+SQL+Server"
TARGET_CONN = "mssql+pyodbc://server/Claims_DW?driver=ODBC+Driver+17+for+SQL+Server"

def extract_claims():
    """Extract raw claims data from source database."""
    engine = sa.create_engine(SOURCE_CONN)
    query = """
    SELECT Claim_ID, Policy_ID, Incurred_Date, Paid_Amount,
           Status, Adjuster_ID, State, Claim_Type
    FROM dbo.Raw_Claims
    WHERE Incurred_Date >= DATEADD(day, -1, GETDATE())
    """
    df = pd.read_sql(query, engine)
    logger.info(f"Extracted {len(df)} claims records")
    return df

def extract_lookups():
    """Load lookup tables from Excel."""
    return pd.read_excel("//shared/lookups/Lookup_Tables.xlsx",
                         sheet_name="Status_Mapping")

def cleanse_data(df: pd.DataFrame) -> pd.DataFrame:
    """Apply data cleansing rules."""
    df = df.copy()
    df['Claim_ID'] = df['Claim_ID'].str.strip().str.upper()
    df['State'] = df['State'].str.strip().str.title()
    df['Paid_Amount'] = pd.to_numeric(df['Paid_Amount'], errors='coerce').fillna(0)
    df['Incurred_Date'] = pd.to_datetime(df['Incurred_Date'], errors='coerce')
    df = df.dropna(subset=['Claim_ID', 'Policy_ID'])
    logger.info(f"Cleansed data: {len(df)} records retained")
    return df

def apply_business_rules(df: pd.DataFrame, lookups: pd.DataFrame) -> pd.DataFrame:
    """Apply business rules and enrich with lookups."""
    df = pd.merge(df, lookups, left_on='Status', right_on='Code', how='left')
    df['Severity_Band'] = pd.cut(df['Paid_Amount'],
        bins=[0, 5000, 25000, 100000, float('inf')],
        labels=['Low', 'Medium', 'High', 'Severe'])
    df['Processing_Date'] = datetime.now()
    return df

def load_to_warehouse(df: pd.DataFrame):
    """Load processed data to target warehouse."""
    engine = sa.create_engine(TARGET_CONN)
    df.to_sql('Claims_Processed', engine, if_exists='append', index=False)
    logger.info(f"Loaded {len(df)} records to Claims_DW")

def main():
    logger.info("Starting Claims Data Preparation pipeline")
    raw = extract_claims()
    lookups = extract_lookups()
    clean = cleanse_data(raw)
    enriched = apply_business_rules(clean, lookups)
    load_to_warehouse(enriched)
    logger.info("Pipeline completed successfully")

if __name__ == "__main__":
    main()`,
  },
  {
    id: 'cb-2', workflowName: 'Policy Renewal Scoring', fileName: 'policy_renewal_scoring.py',
    language: 'python', lineCount: 98,
    description: 'Monthly renewal scoring with propensity model features and tiered output.',
    code: `"""Policy Renewal Scoring Pipeline
Converted from Alteryx workflow: Policy Renewal Scoring
"""

import pandas as pd
import numpy as np
import sqlalchemy as sa
import logging

logger = logging.getLogger(__name__)

def score_renewals():
    engine = sa.create_engine("oracle+cx_oracle://user:pass@host/Policy_Master")
    policies = pd.read_sql("SELECT * FROM Policy_Master WHERE Expiry_Date > SYSDATE", engine)
    
    # Feature engineering
    policies['Tenure_Years'] = (pd.Timestamp.now() - pd.to_datetime(policies['Inception_Date'])).dt.days / 365
    policies['Claims_Ratio'] = policies['Total_Claims'] / policies['Total_Premium'].replace(0, np.nan)
    policies['Payment_Regularity'] = policies['On_Time_Payments'] / policies['Total_Payments'].replace(0, np.nan)
    
    # Scoring logic (simplified from Alteryx multi-row formula)
    policies['Renewal_Score'] = (
        policies['Tenure_Years'].clip(upper=10) * 10 +
        (1 - policies['Claims_Ratio'].fillna(0).clip(upper=1)) * 40 +
        policies['Payment_Regularity'].fillna(0.5) * 30 +
        policies['Credit_Score'].fillna(650).clip(300, 850).sub(300).div(550) * 20
    )
    
    policies['Score_Tier'] = pd.cut(policies['Renewal_Score'],
        bins=[0, 40, 60, 80, 100],
        labels=['At Risk', 'Monitor', 'Stable', 'Loyal'])
    
    return policies

if __name__ == "__main__":
    result = score_renewals()
    print(f"Scored {len(result)} policies")`,
  },
  {
    id: 'cb-3', workflowName: 'Agent Commission Calculator', fileName: 'agent_commission.py',
    language: 'python', lineCount: 72,
    description: 'Tiered commission calculation with overrides and bonus qualifiers.',
    code: `"""Agent Commission Calculator
Converted from Alteryx workflow: Agent Commission Calculator
"""

import pandas as pd
import numpy as np
import sqlalchemy as sa

def calculate_commissions():
    engine = sa.create_engine("mssql+pyodbc://server/Sales?driver=ODBC+Driver+17")
    txns = pd.read_sql("SELECT * FROM Sales_Transactions WHERE Week = DATEPART(wk, GETDATE())-1", engine)
    schedule = pd.read_excel("//shared/Commission_Schedule.xlsx")
    
    # Merge with commission schedule
    result = pd.merge(txns, schedule, on='Product_Category', how='left')
    
    # Tiered rate calculation
    result['Base_Commission'] = result['Premium'] * result['Base_Rate']
    result['Override'] = np.where(result['Premium'] > result['Override_Threshold'],
                                   result['Premium'] * result['Override_Rate'], 0)
    result['Bonus'] = np.where(result.groupby('Agent_ID')['Premium'].transform('sum') > 50000,
                                result['Base_Commission'] * 0.05, 0)
    result['Total_Commission'] = result['Base_Commission'] + result['Override'] + result['Bonus']
    
    return result

if __name__ == "__main__":
    commissions = calculate_commissions()
    commissions.to_csv("Commission_Detail.csv", index=False)`,
  },
];

/* ── Export Artifacts ── */
export const altPyExportArtifacts: AltPyExportArtifact[] = [
  { id: 'ea-1', fileName: 'claims_data_prep.py', type: 'python', description: 'Claims Data Preparation ETL pipeline', size: '4.2 KB' },
  { id: 'ea-2', fileName: 'policy_renewal_scoring.py', type: 'python', description: 'Policy Renewal Scoring pipeline', size: '3.1 KB' },
  { id: 'ea-3', fileName: 'agent_commission.py', type: 'python', description: 'Agent Commission Calculator', size: '2.4 KB' },
  { id: 'ea-4', fileName: 'financial_reconciliation.py', type: 'python', description: 'Financial Reconciliation pipeline', size: '3.8 KB' },
  { id: 'ea-5', fileName: 'customer_360_merge.py', type: 'python', description: 'Customer 360 Data Merge', size: '4.5 KB' },
  { id: 'ea-6', fileName: 'regulatory_report.py', type: 'python', description: 'Regulatory Report Generator', size: '2.9 KB' },
  { id: 'ea-7', fileName: 'loss_triangle_builder.py', type: 'python', description: 'Loss Development Triangle Builder', size: '1.8 KB' },
  { id: 'ea-8', fileName: 'geospatial_risk.py', type: 'python', description: 'Geospatial Risk Assessment (partial)', size: '5.1 KB' },
  { id: 'ea-9', fileName: 'requirements.txt', type: 'requirements', description: 'Python dependencies (pandas, sqlalchemy, geopandas, etc.)', size: '256 B' },
  { id: 'ea-10', fileName: 'README.md', type: 'readme', description: 'Migration guide and setup instructions', size: '3.2 KB' },
  { id: 'ea-11', fileName: 'config.yaml', type: 'config', description: 'Database connections and environment configuration', size: '1.1 KB' },
];
