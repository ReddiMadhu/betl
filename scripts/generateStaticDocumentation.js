import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDocDir = path.resolve(rootDir, 'public', 'documentation');

// Ensure directory helper
function ensureDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

// Write helper for XLSX
function writeExcelFile(filePath, sheets) {
	ensureDir(path.dirname(filePath));
	const wb = XLSX.utils.book_new();
	for (const [sheetName, data] of Object.entries(sheets)) {
		const ws = XLSX.utils.json_to_sheet(data);
		XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31));
	}
	XLSX.writeFile(wb, filePath);
}

// Write helper for Markdown
function writeMarkdownFile(filePath, content) {
	ensureDir(path.dirname(filePath));
	fs.writeFileSync(filePath, content.trim() + '\n', 'utf-8');
}

// ─────────────────────────────────────────────────────────────
// 1. GENERATE ASSESSMENT DOCUMENTATION
// ─────────────────────────────────────────────────────────────
const assessmentDir = path.join(publicDocDir, 'assessment');

console.log('Generating Assessment Documentation in:', assessmentDir);

// 1.1 Portfolio Executive Summary XLSX
writeExcelFile(
	path.join(assessmentDir, 'Portfolio_Assessment_Executive_Summary.xlsx'),
	{
		'Portfolio Overview': [
			{
				Metric: 'Total Discovered Assets',
				Value: 24,
				Category: 'Portfolio Scope',
			},
			{
				Metric: 'BI Dashboards & Reports',
				Value: 16,
				Category: 'Portfolio Scope',
			},
			{
				Metric: 'ETL Workflows & Pipelines',
				Value: 8,
				Category: 'Portfolio Scope',
			},
			{
				Metric: 'Business Areas Covered',
				Value: 7,
				Category: 'Business Coverage',
			},
			{
				Metric: 'Connected Data Sources',
				Value: 92,
				Category: 'Architecture',
			},
			{
				Metric: 'Downstream Data Targets',
				Value: 43,
				Category: 'Architecture',
			},
			{ Metric: 'Active Business KPIs', Value: 148, Category: 'Metrics' },
			{
				Metric: 'Estimated Redundancy Rate',
				Value: '38%',
				Category: 'Opportunity',
			},
		],
		'Business Areas': [
			{
				'Business Area': 'Claims',
				'Asset Count': 15,
				'BI Count': 9,
				'ETL Count': 6,
				'Primary Tech': 'Tableau / Alteryx',
				'Data Complexity': 'High',
			},
			{
				'Business Area': 'Underwriting',
				'Asset Count': 4,
				'BI Count': 3,
				'ETL Count': 1,
				'Primary Tech': 'Power BI / Tableau',
				'Data Complexity': 'Medium',
			},
			{
				'Business Area': 'Distribution',
				'Asset Count': 6,
				'BI Count': 5,
				'ETL Count': 1,
				'Primary Tech': 'Power BI / Tableau',
				'Data Complexity': 'Medium',
			},
			{
				'Business Area': 'Policy Administration',
				'Asset Count': 2,
				'BI Count': 2,
				'ETL Count': 0,
				'Primary Tech': 'Tableau / Power BI',
				'Data Complexity': 'Low',
			},
			{
				'Business Area': 'Finance',
				'Asset Count': 5,
				'BI Count': 5,
				'ETL Count': 0,
				'Primary Tech': 'Power BI / Tableau',
				'Data Complexity': 'High',
			},
			{
				'Business Area': 'Customer',
				'Asset Count': 3,
				'BI Count': 3,
				'ETL Count': 0,
				'Primary Tech': 'Tableau / Power BI',
				'Data Complexity': 'Medium',
			},
		],
		'Technology Landscape': [
			{
				Technology: 'Tableau',
				Domain: 'BI',
				'Asset Count': 10,
				'Health Score': '88/100',
				'Modernization Status': 'Candidate for Consolidation',
			},
			{
				Technology: 'Power BI',
				Domain: 'BI',
				'Asset Count': 9,
				'Health Score': '92/100',
				'Modernization Status': 'Strategic Target Platform',
			},
			{
				Technology: 'MicroStrategy',
				Domain: 'BI',
				'Asset Count': 2,
				'Health Score': '45/100',
				'Modernization Status': 'High Priority Migration',
			},
			{
				Technology: 'ThoughtSpot',
				Domain: 'BI',
				'Asset Count': 1,
				'Health Score': '95/100',
				'Modernization Status': 'Modern Self-Service Target',
			},
			{
				Technology: 'Alteryx',
				Domain: 'ETL',
				'Asset Count': 7,
				'Health Score': '74/100',
				'Modernization Status': 'Candidate for Cloud Migration',
			},
			{
				Technology: 'Python',
				Domain: 'ETL',
				'Asset Count': 1,
				'Health Score': '90/100',
				'Modernization Status': 'Strategic Modern Codebase',
			},
		],
	},
);

// 1.2 Portfolio Assessment Readme
writeMarkdownFile(
	path.join(assessmentDir, 'Portfolio_Assessment_Overview.md'),
	`# Enterprise BI & ETL Portfolio Assessment Overview

## Executive Summary
This assessment package encapsulates the discovered BI and ETL landscape across **7 Insurance Business Areas**, analyzing **24 assets** spanning Tableau, Power BI, MicroStrategy, ThoughtSpot, Alteryx, and Python pipelines.

## Hierarchy Structure
- \`BI/\`: Business Intelligence dashboards, dossiers, and semantic cubes grouped by technology.
  - \`Tableau/\`: 10 Dashboards & Reports
  - \`Power BI/\`: 9 Dashboards & Data Models
  - \`MicroStrategy/\`: 2 Legacy Dossiers & Semantic Cubes
  - \`ThoughtSpot/\`: 1 Search-driven Liveboard
- \`ETL/\`: Ingestion, transformation, and distribution workflows grouped by technology.
  - \`Alteryx/\`: 7 Analytical Workflows
  - \`Python/\`: 1 Modern Ingestion Pipeline

## Key Assessment Highlights
1. **High Redundancy in Claims & Finance**: Multiple dashboards across Tableau and Power BI share identical underlying fact tables and business metrics.
2. **MicroStrategy Modernization**: 2 legacy dossiers contain high technical debt and are prime candidates for decommissioning / re-platforming.
3. **ETL Dependency Optimization**: 5 Alteryx workflows can be merged into unified modern pipelines.
`,
);

// Define BI Assets data
const biAssets = [
	{
		tech: 'Tableau',
		name: 'Claims - Agent Performance',
		area: 'Claims',
		owner: 'Sarah Mitchell',
		sources: 4,
		targets: 2,
		kpis: 8,
		kpiList: [
			'Cycle Time',
			'Claims Resolved',
			'Adjuster SLA',
			'Open Backlog',
			'Resolution Cost',
			'Reopened %',
			'Escalation Rate',
			'CSAT',
		],
		desc: 'Agent-level claims resolution performance, cycle times, and operational SLA tracking.',
		tables: [
			'claims_fact',
			'adjuster_dim',
			'sla_metrics_dim',
			'team_hierarchy_dim',
		],
		targetsList: [
			'claims_agent_summary.hyper',
			'executive_kpi_feed.parquet',
		],
	},
	{
		tech: 'Tableau',
		name: 'Claims - Executive Summary',
		area: 'Claims',
		owner: 'Sarah Mitchell',
		sources: 3,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Incurred Claims',
			'Paid Losses',
			'Pending Reserves',
			'Loss Frequency',
			'Loss Severity',
			'Pure Premium',
		],
		desc: 'Executive overview of claims volume, paid losses, pending reserves, and loss frequency.',
		tables: ['claims_fact', 'claims_loss_data', 'reserves_monthly_fact'],
		targetsList: ['claims_executive_extract.hyper'],
	},
	{
		tech: 'Tableau',
		name: 'Claims - State Performance',
		area: 'Claims',
		owner: 'James Chen',
		sources: 2,
		targets: 1,
		kpis: 5,
		kpiList: [
			'State Incurred Loss',
			'Litigation %',
			'Avg Settlement Cost',
			'Regulatory Compliance %',
			'State Volume Rank',
		],
		desc: 'Geographic and state-by-state claims distribution and severity metrics.',
		tables: ['claims_geo_fact', 'state_jurisdiction_dim'],
		targetsList: ['state_performance_extract.hyper'],
	},
	{
		tech: 'Tableau',
		name: 'Insurance Claim Dashboard',
		area: 'Claims',
		owner: 'Rachel Torres',
		sources: 4,
		targets: 2,
		kpis: 7,
		kpiList: [
			'Intake Volume',
			'Triage Velocity',
			'First Notice of Loss (FNOL)',
			'Auto-approval Rate',
			'Investigative Referral',
			'Settlement TAT',
			'Total Payout',
		],
		desc: 'End-to-end insurance claim intake, triage status, and settlement cycle analysis.',
		tables: [
			'fnol_intake_fact',
			'claims_lifecycle_fact',
			'investigation_log',
			'policy_master_dim',
		],
		targetsList: [
			'intake_summary_tableau.hyper',
			'claims_ops_publish.tdsx',
		],
	},
	{
		tech: 'Tableau',
		name: 'Healthcare Claim Analysis Dashboard',
		area: 'Claims',
		owner: 'Rachel Torres',
		sources: 5,
		targets: 3,
		kpis: 9,
		kpiList: [
			'Medical Billed Amount',
			'Allowed vs Paid',
			'Diagnosis Group Severity',
			'Out-of-network %',
			'Pharmacy Spend',
			'Provider Utilization',
			'Denial Rate',
			'Appeal Success Rate',
			'Copay Collection',
		],
		desc: 'Healthcare provider claims, medical billing breakdown, and diagnostic code metrics.',
		tables: [
			'medical_claims_fact',
			'icd10_diagnosis_dim',
			'provider_network_dim',
			'pharmacy_rx_fact',
			'billing_adjustments_fact',
		],
		targetsList: [
			'healthcare_analytics.hyper',
			'provider_scorecard.csv',
			'actuarial_sample.parquet',
		],
	},
	{
		tech: 'Tableau',
		name: 'Car Insurance Dashboard',
		area: 'Claims',
		owner: 'Sarah Mitchell',
		sources: 3,
		targets: 2,
		kpis: 6,
		kpiList: [
			'Bodily Injury Loss',
			'Property Damage Loss',
			'Collision Severity',
			'Comprehensive Loss Ratio',
			'Salvage Recovery',
			'Rental Car Days',
		],
		desc: 'Auto physical damage and bodily injury claims summary and repair cost analytics.',
		tables: ['auto_claims_fact', 'vehicle_vin_dim', 'repair_shop_dim'],
		targetsList: [
			'auto_claims_tableau.hyper',
			'salvage_recovery_feed.xlsx',
		],
	},
	{
		tech: 'Tableau',
		name: 'Motor Insurance Dashboard',
		area: 'Underwriting',
		owner: 'Lisa Wang',
		sources: 4,
		targets: 2,
		kpis: 7,
		kpiList: [
			'Written Premium',
			'Loss Cost per Unit',
			'Vehicle Telematics Score',
			'Fleet Exposure Units',
			'Renewal Retention',
			'Quoted vs Bound',
			'Expense Ratio',
		],
		desc: 'Commercial fleet and personal auto underwriting exposure and rating analysis.',
		tables: [
			'underwriting_submissions_fact',
			'fleet_vehicles_dim',
			'rating_engine_output',
			'broker_production_dim',
		],
		targetsList: ['motor_uw_extract.hyper', 'fleet_risk_feed.csv'],
	},
	{
		tech: 'Tableau',
		name: 'Cross Sell Dashboard',
		area: 'Distribution',
		owner: 'Amanda Foster',
		sources: 3,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Cross-Sell Ratio',
			'Multi-policy Discount Impact',
			'Bundled Renewal Rate',
			'Customer Lifetime Value',
			'Agent Cross-sell Commission',
			'Line of Business Penetration',
		],
		desc: 'Policy cross-selling opportunities across commercial, property, and casualty lines.',
		tables: [
			'policy_customer_mapping_fact',
			'product_crosssell_matrix',
			'agent_performance_dim',
		],
		targetsList: ['cross_sell_analytics.hyper'],
	},
	{
		tech: 'Tableau',
		name: 'New Business Dashboard',
		area: 'Policy Administration',
		owner: 'Diana Lee',
		sources: 4,
		targets: 2,
		kpis: 7,
		kpiList: [
			'New Policy Issue Count',
			'Direct Written Premium (DWP)',
			'Time to Issue (Days)',
			'E-signature Completion Rate',
			'Underwriter Referral %',
			'Channel Contribution',
			'Premium per Policy',
		],
		desc: 'New policy acquisition volumes, direct written premiums, and issue turnaround times.',
		tables: [
			'policy_issuance_fact',
			'submission_intake_fact',
			'channel_dim',
			'product_hierarchy_dim',
		],
		targetsList: [
			'new_biz_extract.hyper',
			'executive_weekly_issuance.xlsx',
		],
	},
	{
		tech: 'Tableau',
		name: 'Insurance Analytics Dashboard (Tableau)',
		area: 'Finance',
		owner: 'Jennifer Adams',
		sources: 4,
		targets: 2,
		kpis: 8,
		kpiList: [
			'Combined Ratio',
			'Underwriting Profit',
			'Net Investment Income',
			'Earned Premium',
			'Operating Ratio',
			'Solvency Margin',
			'Statutory Capital',
			'Return on Equity (ROE)',
		],
		desc: 'Tableau financial overview covering combined ratios, investment return, and written premiums.',
		tables: [
			'general_ledger_fact',
			'statutory_financials_fact',
			'investment_portfolio_fact',
			'cost_center_dim',
		],
		targetsList: [
			'finance_exec_summary.hyper',
			'regulatory_filing_extract.csv',
		],
	},
	{
		tech: 'Tableau',
		name: 'Beneficiary Services v1',
		area: 'Customer',
		owner: 'Emily Watson',
		sources: 4,
		targets: 2,
		kpis: 6,
		kpiList: [
			'Beneficiary Payout Velocity',
			'First Contact Resolution',
			'Inquiry Volume',
			'Customer Satisfaction (CSAT)',
			'Net Promoter Score (NPS)',
			'Document Verification TAT',
		],
		desc: 'Beneficiary claims processing and customer payout satisfaction indicators.',
		tables: [
			'beneficiary_cases_fact',
			'contact_center_logs',
			'customer_survey_fact',
			'payment_disbursement_fact',
		],
		targetsList: ['beneficiary_kpis.hyper', 'customer_care_audit.xlsx'],
	},
	{
		tech: 'Tableau',
		name: 'Beneficiary Services Aging Dashboard',
		area: 'Customer',
		owner: 'Emily Watson',
		sources: 3,
		targets: 1,
		kpis: 5,
		kpiList: [
			'Cases > 30 Days',
			'Cases > 60 Days',
			'Documentation Pending %',
			'Legal Review Escapes',
			'Average Days Open',
		],
		desc: 'Aging analysis of unresolved beneficiary inquiries and open settlement queues.',
		tables: [
			'beneficiary_cases_fact',
			'workflow_queue_dim',
			'legal_escalations_dim',
		],
		targetsList: ['aging_cases_tableau.hyper'],
	},
	// Power BI
	{
		tech: 'Power BI',
		name: 'Loss Ratio',
		area: 'Claims',
		owner: 'Michael Zhang',
		sources: 4,
		targets: 2,
		kpis: 8,
		kpiList: [
			'Earned Premium',
			'Incurred Losses',
			'Loss Ratio %',
			'Expense Ratio %',
			'Combined Ratio %',
			'Quarterly Trend Variance',
			'IBNR Reserve %',
			'Catastrophe Loss %',
		],
		desc: 'Incurred losses compared against earned premiums with quarterly trend modeling.',
		tables: [
			'claims_loss_data',
			'earned_premium_fact',
			'actuarial_reserves_dim',
			'calendar_hierarchy_dim',
		],
		targetsList: [
			'PowerBI_Loss_Ratio_Dataset.pbix',
			'Finance_Loss_Ratio_Feed.csv',
		],
	},
	{
		tech: 'Power BI',
		name: 'FFQ Test',
		area: 'Underwriting',
		owner: 'Michael Zhang',
		sources: 3,
		targets: 1,
		kpis: 5,
		kpiList: [
			'Rating Verification Score',
			'Model Deviation %',
			'Quote Conversion',
			'Pricing Anomaly Count',
			'Rule Engine Latency',
		],
		desc: 'Full form quotation rating engine verification and risk scoring model.',
		tables: [
			'quote_engine_logs',
			'risk_score_matrix',
			'underwriter_override_fact',
		],
		targetsList: ['FFQ_Validation_Model.pbix'],
	},
	{
		tech: 'Power BI',
		name: 'Test',
		area: 'Underwriting',
		owner: 'Michael Zhang',
		sources: 2,
		targets: 1,
		kpis: 4,
		kpiList: [
			'Sample Variance',
			'Test Pass Rate',
			'Model Loss Delta',
			'Execution Duration',
		],
		desc: 'Underwriting risk scoring experimental dataset and sandbox report.',
		tables: ['sandbox_test_results', 'scoring_parameters_dim'],
		targetsList: ['Test_Sandbox_Report.pbix'],
	},
	{
		tech: 'Power BI',
		name: 'Bottom 25% Agents',
		area: 'Distribution',
		owner: 'Amanda Foster',
		sources: 4,
		targets: 2,
		kpis: 6,
		kpiList: [
			'Agent Premium Volume',
			'Policy Bind Rate',
			'Quote Count',
			'Underwriting Rejection %',
			'Agent Tenure (Months)',
			'Coaching Need Score',
		],
		desc: 'Agent production review identifying lower quartile broker support needs and coaching targets.',
		tables: [
			'agent_monthly_production_fact',
			'broker_profile_dim',
			'training_history_dim',
			'lead_assignment_fact',
		],
		targetsList: [
			'Agent_Support_Optimization.pbix',
			'Distribution_Ops_Export.csv',
		],
	},
	{
		tech: 'Power BI',
		name: 'New Business (Bottom 25% agents)',
		area: 'Distribution',
		owner: 'Amanda Foster',
		sources: 3,
		targets: 1,
		kpis: 5,
		kpiList: [
			'New Bind Rate',
			'Submission Quality Score',
			'Quote-to-Bind Ratio',
			'Loss Ratio of New Policies',
			'Commission Yield',
		],
		desc: 'New policy bind counts and conversion ratios for bottom quartile distribution channels.',
		tables: [
			'agent_monthly_production_fact',
			'submission_fact',
			'agency_branch_dim',
		],
		targetsList: ['New_Business_Agent_Intervention.pbix'],
	},
	{
		tech: 'Power BI',
		name: 'Cross Sell Dashboard PBIP',
		area: 'Distribution',
		owner: 'Amanda Foster',
		sources: 3,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Commercial to Personal Ratio',
			'Property + Umbrella Rate',
			'Cross-Sell Penetration %',
			'Customer Segment Retention',
			'Avg Premium Per Multi-Holder',
			'Campaign Response %',
		],
		desc: 'Power BI project format cross-sell tracker with customer segmentation slicing.',
		tables: [
			'customer_policy_matrix_fact',
			'segmentation_profile_dim',
			'marketing_touchpoint_dim',
		],
		targetsList: ['CrossSell_PBIP_Dataset.pbip'],
	},
	{
		tech: 'Power BI',
		name: 'Store Sales',
		area: 'Distribution',
		owner: 'Amanda Foster',
		sources: 4,
		targets: 2,
		kpis: 7,
		kpiList: [
			'Physical Branch Volume',
			'Walk-in Quotes',
			'Over-the-Counter Binds',
			'Staff Productivity Score',
			'Branch Profitability',
			'Local Market Share %',
			'Customer Wait Time',
		],
		desc: 'Retail agency and physical branch location production analysis.',
		tables: [
			'branch_daily_sales_fact',
			'store_location_dim',
			'agent_roster_dim',
			'regional_quota_dim',
		],
		targetsList: [
			'Store_Sales_Analytics.pbix',
			'Regional_Director_Summary.xlsx',
		],
	},
	{
		tech: 'Power BI',
		name: 'Survival Rate',
		area: 'Policy Administration',
		owner: 'Chris Morgan',
		sources: 3,
		targets: 1,
		kpis: 5,
		kpiList: [
			'Year 1 Survival Rate',
			'Year 3 Survival Rate',
			'Year 5 Survival Rate',
			'Lapse Probability Index',
			'Premium Sensitivity Elasticity',
		],
		desc: 'Policy retention curves, lapse analysis, and survival rate tracking over renewal terms.',
		tables: [
			'policy_cohort_survival_fact',
			'retention_decay_curve_dim',
			'premium_bracket_dim',
		],
		targetsList: ['Policy_Survival_Analysis.pbix'],
	},
	{
		tech: 'Power BI',
		name: 'Insurance Analytics Dashboard (Power BI)',
		area: 'Finance',
		owner: 'Jennifer Adams',
		sources: 5,
		targets: 2,
		kpis: 9,
		kpiList: [
			'Direct Written Premium',
			'Net Incurred Claims',
			'Management Expense Ratio',
			'Commission Ratio',
			'Operating Margin %',
			'Underwriting Cash Flow',
			'Investment Yield',
			'Budget Variance',
			'EBITDA',
		],
		desc: 'Power BI financial reporting with expense breakdown and quarterly margin analysis.',
		tables: [
			'financial_general_ledger_fact',
			'quarterly_reconciliation_fact',
			'budget_allocation_dim',
			'chart_of_accounts_dim',
			'department_dim',
		],
		targetsList: [
			'Finance_Executive_PBI.pbix',
			'CFO_Quarterly_Deck_Feed.xlsx',
		],
	},
	{
		tech: 'Power BI',
		name: 'IT Spend Analysis Sample',
		area: 'Finance',
		owner: 'Mark Sullivan',
		sources: 4,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Total IT Capex',
			'Total IT Opex',
			'Cloud Infrastructure Spend',
			'Software License Cost per User',
			'Vendor Concentration %',
			'Budget vs Actual %',
		],
		desc: 'Departmental IT operational expenditure, vendor allocation, and budget variance tracking.',
		tables: [
			'it_expense_fact',
			'vendor_contract_dim',
			'it_cost_center_dim',
			'asset_depreciation_dim',
		],
		targetsList: ['IT_Spend_Management.pbix'],
	},
	{
		tech: 'Power BI',
		name: 'Revenue Opportunities',
		area: 'Finance',
		owner: 'Jennifer Adams',
		sources: 4,
		targets: 2,
		kpis: 7,
		kpiList: [
			'Pipeline Expansion Revenue',
			'Rate Increase Capacity',
			'Under-insured Coverage Lift',
			'Broker Incentive ROI',
			'Cross-LOB Revenue Synergy',
			'Target Market Potential',
			'Net Growth Rate',
		],
		desc: 'Premium growth opportunities, rate change impacts, and pipeline revenue forecast.',
		tables: [
			'market_opportunity_fact',
			'rate_modeling_scenario_fact',
			'broker_tier_dim',
			'geographic_territory_dim',
		],
		targetsList: [
			'Revenue_Expansion_Modeling.pbix',
			'Strategic_Growth_Export.csv',
		],
	},
	{
		tech: 'Power BI',
		name: 'Sales & Returns Sample v3',
		area: 'Finance',
		owner: 'Jennifer Adams',
		sources: 6,
		targets: 3,
		kpis: 10,
		kpiList: [
			'Gross Written Premium',
			'Returned Endorsement Value',
			'Cancellation Refund %',
			'Net Written Premium',
			'Policy Chargeback Count',
			'Dispute Resolution Rate',
			'Billing Reconciliation Gap',
			'Audit Recovery $',
			'Credit Surcharge %',
			'Commission Recapture',
		],
		desc: 'Financial reconciliation of premium billing, returned endorsements, and net revenue.',
		tables: [
			'billing_transactions_fact',
			'endorsement_adjustments_fact',
			'refunds_cancellations_fact',
			'payment_gateway_logs',
			'customer_account_dim',
			'policy_history_dim',
		],
		targetsList: [
			'Premium_Reconciliation_Master.pbix',
			'Audit_Exceptions.xlsx',
			'GL_Posting_Feed.csv',
		],
	},
	{
		tech: 'Power BI',
		name: 'Jornaya Dashboard PBI',
		area: 'Customer',
		owner: 'Emily Watson',
		sources: 4,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Lead TCPA Compliance %',
			'Consumer Intent Score',
			'Lead Age at Contact',
			'Shopping Behavior Velocity',
			'Lead Origin Verification Rate',
			'Conversion by Lead Token',
		],
		desc: 'Customer journey touchpoint compliance, lead verification, and consumer intent analysis.',
		tables: [
			'jornaya_lead_events_fact',
			'tcpa_consent_log',
			'lead_generation_partner_dim',
			'crm_lead_status_dim',
		],
		targetsList: ['Jornaya_Compliance_Analytics.pbix'],
	},
	// MicroStrategy
	{
		tech: 'MicroStrategy',
		name: 'P&C Claims Dashboard v3',
		area: 'Claims',
		owner: 'Tom Harrison',
		sources: 5,
		targets: 2,
		kpis: 11,
		kpiList: [
			'Incurred Loss',
			'Case Reserves',
			'Paid Indemnity',
			'Paid Medical',
			'Subrogation Recovery',
			'ALAE Expense',
			'ULAE Expense',
			'Closure Rate',
			'Average Severity',
			'Litigation Frequency',
			'Bodily Injury Ratio',
		],
		desc: 'Multi-chapter property and casualty dossier with loss reserve projections and settlement metrics.',
		tables: [
			'mstr_pc_claims_fact',
			'mstr_loss_reserves_fact',
			'mstr_litigation_dim',
			'mstr_adjuster_dim',
			'mstr_policy_dim',
		],
		targetsList: ['PC_Claims_Dossier_v3.mstr', 'Claims_Cube_Cache.cube'],
	},
	{
		tech: 'MicroStrategy',
		name: 'Claims Cube',
		area: 'Claims',
		owner: 'Tom Harrison',
		sources: 3,
		targets: 1,
		kpis: 6,
		kpiList: [
			'Total Aggregate Loss',
			'Earned Exposure',
			'Claim Count per 1000 Units',
			'Direct Incurred Amount',
			'Loss Ratio Index',
			'Actuarial Triangulation Factor',
		],
		desc: 'Multidimensional semantic cube for high-volume claims aggregation and financial reconciliation.',
		tables: [
			'claims_master_aggregate',
			'semantic_time_dimension',
			'financial_ledger_dim',
		],
		targetsList: ['Claims_Enterprise_Cube.cube'],
	},
	// ThoughtSpot
	{
		tech: 'ThoughtSpot',
		name: 'Liveboards Summary',
		area: 'Claims & Distribution',
		owner: 'Modernization CoE',
		sources: 6,
		targets: 2,
		kpis: 12,
		kpiList: [
			'Real-time Claims Intake',
			'Instant Loss Severity',
			'Natural Language Query Count',
			'Search-to-Answer Latency',
			'Executive Liveboard Views',
			'Automated Anomaly Alerts',
			'Underwriter Self-service Queries',
			'Broker Production Velocity',
			'Customer Sentiment Score',
			'Fraud Risk Probability',
			'Daily Active Explorers',
			'Top Searched Insurance Terms',
		],
		desc: 'AI-powered Search and Liveboard analytics across consolidated insurance data models.',
		tables: [
			'snowflake_curated_claims_view',
			'snowflake_curated_policy_view',
			'snowflake_customer_360',
			'agent_production_stream',
			'fraud_detection_ml_scores',
			'market_benchmark_dim',
		],
		targetsList: [
			'Enterprise_Executive_Liveboard.tsl',
			'ThoughtSpot_TML_Package.zip',
		],
	},
];

// Define ETL Assets data
const etlAssets = [
	{
		tech: 'Alteryx',
		name: 'Claims_Extract_Volume',
		area: 'Claims',
		owner: 'EXL',
		sources: 4,
		targets: 5,
		schedule: 'Daily at 02:00 AM EST',
		avgRuntime: '14 mins 32 secs',
		desc: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.',
		inputs: [
			{
				name: 'Claims_Volume_Extract_Demo.xlsx',
				type: 'Excel File',
				location: './Data/Claims_Volume_Extract_Demo.xlsx',
			},
			{
				name: 'Policy_Master_Demo.xlsx',
				type: 'Excel File',
				location: './Data/Policy_Master_Demo.xlsx',
			},
			{
				name: 'Adjuster_Hierarchy.csv',
				type: 'CSV File',
				location: './Data/Adjuster_Hierarchy.csv',
			},
			{
				name: 'State_Taxonomy.xlsx',
				type: 'Excel File',
				location: './Data/State_Taxonomy.xlsx',
			},
		],
		outputs: [
			{
				name: 'Demo_Claims_Quarter_Summary.yxdb',
				type: 'Alteryx DB',
				location: 'Temp/Demo_Claims_Quarter_Summary.yxdb',
			},
			{
				name: 'Demo_Claims_Team_LastQuarter.yxdb',
				type: 'Alteryx DB',
				location: 'Temp/Demo_Claims_Team_LastQuarter.yxdb',
			},
			{
				name: 'Claims_Historical_Extract_Demo_Output.xlsx',
				type: 'Excel File',
				location: 'Outputs/Claims_Historical_Extract_Demo_Output.xlsx',
			},
			{
				name: 'Claims_Executive_Summary.hyper',
				type: 'Tableau Hyper',
				location:
					'TableauServer/DataSources/Claims_Executive_Summary.hyper',
			},
			{
				name: 'Claims_Operational_Curated.parquet',
				type: 'Parquet File',
				location: 'S3://insurance-lake/claims/curated/',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data',
				category: 'Input',
				configuration:
					'./Data/Claims_Volume_Extract_Demo.xlsx|||Sheet1$',
			},
			{
				toolId: 't2',
				toolName: 'Block Until Done',
				category: 'Preparation',
				configuration: 'Sequential branch execution',
			},
			{
				toolId: 't3',
				toolName: 'Summarize',
				category: 'Transform',
				configuration:
					'Quarter End Date:GroupBy; Claim Status:GroupBy; Claim Number:CountDistinct',
			},
			{
				toolId: 't4',
				toolName: 'Cross Tab',
				category: 'Transform',
				configuration:
					'GroupField: Quarter End Date | Header: Claim Status | Data: CountDistinct',
			},
			{
				toolId: 't5',
				toolName: 'Select',
				category: 'Preparation',
				configuration:
					'Selects Quarter End Date, Preclaim, Active_Pending, Approved',
			},
			{
				toolId: 't6',
				toolName: 'Sort',
				category: 'Preparation',
				configuration: 'Quarter End Date Descending',
			},
			{
				toolId: 't7',
				toolName: 'Join',
				category: 'Join',
				configuration:
					'LeftField: Quarter End Date | RightField: Last Quarter',
			},
			{
				toolId: 't8',
				toolName: 'Output Data',
				category: 'Output',
				configuration:
					'Claims_Historical_Extract_Demo_Output.xlsx|||Detail',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Workflow_01',
		area: 'Claims',
		owner: 'EXL',
		sources: 3,
		targets: 1,
		schedule: 'Weekly on Sundays',
		avgRuntime: '08 mins 12 secs',
		desc: 'Consolidates claims and payments data through various transformations.',
		inputs: [
			{
				name: 'Raw_Claims_Feed.csv',
				type: 'CSV File',
				location: './Data/Raw_Claims_Feed.csv',
			},
			{
				name: 'Payment_Transactions.xlsx',
				type: 'Excel File',
				location: './Data/Payment_Transactions.xlsx',
			},
			{
				name: 'Vendor_Disbursements.csv',
				type: 'CSV File',
				location: './Data/Vendor_Disbursements.csv',
			},
		],
		outputs: [
			{
				name: 'Consolidated_Payments_Output.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/Consolidated_Payments_Output.yxdb',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data',
				category: 'Input',
				configuration: './Data/Raw_Claims_Feed.csv',
			},
			{
				toolId: 't2',
				toolName: 'Formula',
				category: 'Preparation',
				configuration:
					'Payment_Amount = IF IsNull(Payment) THEN 0 ELSE Payment ENDIF',
			},
			{
				toolId: 't3',
				toolName: 'Join',
				category: 'Join',
				configuration: 'Left: Claim_ID == Right: Claim_ID',
			},
			{
				toolId: 't4',
				toolName: 'Output Data',
				category: 'Output',
				configuration: 'Consolidated_Payments_Output.yxdb',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Workflow_02',
		area: 'Claims',
		owner: 'EXL',
		sources: 3,
		targets: 1,
		schedule: 'Daily at 04:00 AM EST',
		avgRuntime: '06 mins 45 secs',
		desc: 'Calculates key dates and aggregates claim volumes by industry type.',
		inputs: [
			{
				name: 'Industry_Classification.xlsx',
				type: 'Excel File',
				location: './Data/Industry_Classification.xlsx',
			},
			{
				name: 'Policy_Holders.csv',
				type: 'CSV File',
				location: './Data/Policy_Holders.csv',
			},
			{
				name: 'Claims_Intake_Log.xlsx',
				type: 'Excel File',
				location: './Data/Claims_Intake_Log.xlsx',
			},
		],
		outputs: [
			{
				name: 'Industry_Claim_Aggregates.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/Industry_Claim_Aggregates.yxdb',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data',
				category: 'Input',
				configuration: './Data/Claims_Intake_Log.xlsx',
			},
			{
				toolId: 't2',
				toolName: 'DateTime',
				category: 'Parse',
				configuration: 'Convert String Date to DateTime',
			},
			{
				toolId: 't3',
				toolName: 'Summarize',
				category: 'Transform',
				configuration: 'Industry_Code:GroupBy; Loss_Amount:Sum',
			},
			{
				toolId: 't4',
				toolName: 'Output Data',
				category: 'Output',
				configuration: 'Industry_Claim_Aggregates.yxdb',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Workflow_03',
		area: 'Claims',
		owner: 'EXL',
		sources: 5,
		targets: 3,
		schedule: 'Nightly at 01:30 AM EST',
		avgRuntime: '22 mins 10 secs',
		desc: 'Consolidates policy, claims and payment data from multiple sources.',
		inputs: [
			{
				name: 'Policy_Extract.csv',
				type: 'CSV File',
				location: './Data/Policy_Extract.csv',
			},
			{
				name: 'Claims_Master.xlsx',
				type: 'Excel File',
				location: './Data/Claims_Master.xlsx',
			},
			{
				name: 'Payment_Ledger.csv',
				type: 'CSV File',
				location: './Data/Payment_Ledger.csv',
			},
			{
				name: 'Agent_Master.xlsx',
				type: 'Excel File',
				location: './Data/Agent_Master.xlsx',
			},
			{
				name: 'Customer_Demographics.parquet',
				type: 'Parquet File',
				location: './Data/Customer_Demographics.parquet',
			},
		],
		outputs: [
			{
				name: 'Integrated_Insurance_Cube.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/Integrated_Insurance_Cube.yxdb',
			},
			{
				name: 'Claims_Financial_Audit.xlsx',
				type: 'Excel File',
				location: 'Outputs/Claims_Financial_Audit.xlsx',
			},
			{
				name: 'Downstream_ETL_Trigger.json',
				type: 'JSON File',
				location: 'Kafka://topic/claims_curated',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data (x5)',
				category: 'Input',
				configuration: 'Multi-source ingestion stream',
			},
			{
				toolId: 't2',
				toolName: 'Multiple Joins',
				category: 'Join',
				configuration:
					'Relational join graph across Policy, Claims, Payment',
			},
			{
				toolId: 't3',
				toolName: 'Filter & Impute',
				category: 'Preparation',
				configuration: 'Impute missing reserve estimations',
			},
			{
				toolId: 't4',
				toolName: 'Output Data (x3)',
				category: 'Output',
				configuration: 'Target distribution feeds',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Claims_Extract_Volume_v2',
		area: 'Claims',
		owner: 'EXL',
		sources: 4,
		targets: 5,
		schedule: 'Weekly on Saturdays',
		avgRuntime: '11 mins 20 secs',
		desc: 'Secondary extract workflow for aging-litigation risk categorization.',
		inputs: [
			{
				name: 'Claims_Volume_Historical.xlsx',
				type: 'Excel File',
				location: './Data/Claims_Volume_Historical.xlsx',
			},
			{
				name: 'Litigation_Scores.csv',
				type: 'CSV File',
				location: './Data/Litigation_Scores.csv',
			},
			{
				name: 'Adjuster_Caseload.xlsx',
				type: 'Excel File',
				location: './Data/Adjuster_Caseload.xlsx',
			},
			{
				name: 'State_Statute_Limits.csv',
				type: 'CSV File',
				location: './Data/State_Statute_Limits.csv',
			},
		],
		outputs: [
			{
				name: 'Litigation_Risk_Categorization.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/Litigation_Risk_Categorization.yxdb',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data',
				category: 'Input',
				configuration: './Data/Claims_Volume_Historical.xlsx',
			},
			{
				toolId: 't2',
				toolName: 'Formula',
				category: 'Preparation',
				configuration:
					'Risk_Tier = IF Age > 90 THEN "High" ELSE "Normal" ENDIF',
			},
			{
				toolId: 't3',
				toolName: 'Output Data',
				category: 'Output',
				configuration: 'Litigation_Risk_Categorization.yxdb',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Workflow_04',
		area: 'Underwriting',
		owner: 'Kevin Liu',
		sources: 7,
		targets: 3,
		schedule: 'Daily at 05:00 AM EST',
		avgRuntime: '18 mins 40 secs',
		desc: 'Consolidates operational data across volume performance, geography, and operation metrics.',
		inputs: [
			{
				name: 'UW_Submissions.csv',
				type: 'CSV File',
				location: './Data/UW_Submissions.csv',
			},
			{
				name: 'Broker_Territories.xlsx',
				type: 'Excel File',
				location: './Data/Broker_Territories.xlsx',
			},
			{
				name: 'Risk_Class_Lookups.csv',
				type: 'CSV File',
				location: './Data/Risk_Class_Lookups.csv',
			},
			{
				name: 'Fleet_Telematic_Aggregates.parquet',
				type: 'Parquet File',
				location: './Data/Fleet_Telematic_Aggregates.parquet',
			},
			{
				name: 'Actuarial_Rating_Tables.xlsx',
				type: 'Excel File',
				location: './Data/Actuarial_Rating_Tables.xlsx',
			},
			{
				name: 'Reinsurance_Limits.csv',
				type: 'CSV File',
				location: './Data/Reinsurance_Limits.csv',
			},
			{
				name: 'Historical_Loss_Ratios.csv',
				type: 'CSV File',
				location: './Data/Historical_Loss_Ratios.csv',
			},
		],
		outputs: [
			{
				name: 'UW_Operational_Metrics.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/UW_Operational_Metrics.yxdb',
			},
			{
				name: 'Broker_Exposure_Summary.xlsx',
				type: 'Excel File',
				location: 'Outputs/Broker_Exposure_Summary.xlsx',
			},
			{
				name: 'Fleet_Risk_Ratings.csv',
				type: 'CSV File',
				location: 'Outputs/Fleet_Risk_Ratings.csv',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Multi-Input Ingestion',
				category: 'Input',
				configuration: '7 Source Connectors',
			},
			{
				toolId: 't2',
				toolName: 'Spatial Match & Geographic Join',
				category: 'Join',
				configuration: 'Match broker location to territory boundaries',
			},
			{
				toolId: 't3',
				toolName: 'Rating Factor Calculation',
				category: 'Transform',
				configuration:
					'Multi-tier commercial exposure risk calculation',
			},
			{
				toolId: 't4',
				toolName: 'Multi-target Output',
				category: 'Output',
				configuration: 'Downstream feeding UW Tableau & Power BI',
			},
		],
	},
	{
		tech: 'Alteryx',
		name: 'Workflow_08',
		area: 'Distribution',
		owner: 'Nina Patel',
		sources: 5,
		targets: 3,
		schedule: 'Weekly on Mondays',
		avgRuntime: '09 mins 15 secs',
		desc: 'Processes operational distribution data with date filtering and volume aggregations.',
		inputs: [
			{
				name: 'Agency_Production_Log.xlsx',
				type: 'Excel File',
				location: './Data/Agency_Production_Log.xlsx',
			},
			{
				name: 'Channel_Quota.csv',
				type: 'CSV File',
				location: './Data/Channel_Quota.csv',
			},
			{
				name: 'Agent_Roster.xlsx',
				type: 'Excel File',
				location: './Data/Agent_Roster.xlsx',
			},
			{
				name: 'Commission_Tiers.csv',
				type: 'CSV File',
				location: './Data/Commission_Tiers.csv',
			},
			{
				name: 'Product_Catalog.csv',
				type: 'CSV File',
				location: './Data/Product_Catalog.csv',
			},
		],
		outputs: [
			{
				name: 'Distribution_Summary_Output.yxdb',
				type: 'Alteryx DB',
				location: 'Outputs/Distribution_Summary_Output.yxdb',
			},
			{
				name: 'Agent_Scorecard_Feed.csv',
				type: 'CSV File',
				location: 'Outputs/Agent_Scorecard_Feed.csv',
			},
			{
				name: 'Bottom_25_Agents_Extract.hyper',
				type: 'Tableau Hyper',
				location: 'TableauServer/Bottom_25.hyper',
			},
		],
		tools: [
			{
				toolId: 't1',
				toolName: 'Input Data',
				category: 'Input',
				configuration: 'Distribution source files',
			},
			{
				toolId: 't2',
				toolName: 'Summarize & Quartile Rank',
				category: 'Transform',
				configuration:
					'Rank agents by bind volume to identify lower 25%',
			},
			{
				toolId: 't3',
				toolName: 'Output Data',
				category: 'Output',
				configuration: 'Tableau Hyper & CSV outputs',
			},
		],
	},
	// Python
	{
		tech: 'Python',
		name: 'claims_processing',
		area: 'Claims',
		owner: 'EXL',
		sources: 4,
		targets: 5,
		schedule: 'Streaming / Hourly Batch',
		avgRuntime: '01 mins 48 secs',
		desc: 'Vectorized Python ETL pipeline for automated claims ingestion, schema validation, and delta lake publishing.',
		inputs: [
			{
				name: 's3://insurance-raw/claims_stream/*.parquet',
				type: 'Parquet Stream',
				location: 'AWS S3',
			},
			{
				name: 'postgres://core_db/policy_master',
				type: 'PostgreSQL DB',
				location: 'RDS PostgreSQL',
			},
			{
				name: 'kafka://claims-events-topic',
				type: 'Kafka Event Topic',
				location: 'Confluent Cloud',
			},
			{
				name: 's3://insurance-ref/icd_codes.parquet',
				type: 'Delta Reference',
				location: 'AWS S3',
			},
		],
		outputs: [
			{
				name: 's3://insurance-lake/claims/curated_delta/',
				type: 'Delta Lake',
				location: 'AWS S3 Delta Table',
			},
			{
				name: 'snowflake://analytics_db/claims_fact',
				type: 'Snowflake Table',
				location: 'Snowflake Warehouse',
			},
			{
				name: 'kafka://claims-processed-events',
				type: 'Kafka Topic',
				location: 'Confluent Cloud',
			},
			{
				name: 'redis://cache/claims_realtime_metrics',
				type: 'Redis Cache',
				location: 'ElastiCache',
			},
			{
				name: 'elasticsearch://claims_search_index',
				type: 'Elasticsearch Index',
				location: 'OpenSearch',
			},
		],
		tools: [
			{
				toolId: 'py1',
				toolName: 'Polars / PyArrow Ingestion',
				category: 'Input',
				configuration: 'High-throughput vectorized file reading',
			},
			{
				toolId: 'py2',
				toolName: 'Pydantic Schema Validation',
				category: 'Preparation',
				configuration: 'Strict type validation & anomaly flagging',
			},
			{
				toolId: 'py3',
				toolName: 'NumPy / Polars Join & Transforms',
				category: 'Transform',
				configuration: 'High performance deduplication and aggregation',
			},
			{
				toolId: 'py4',
				toolName: 'Delta Lake & Snowflake Sink',
				category: 'Output',
				configuration: 'ACID compliant atomic merge writes',
			},
		],
	},
];

// Write BI assessment files
for (const item of biAssets) {
	const assetDir = path.join(assessmentDir, 'BI', item.tech, item.name);

	// 1. Assessment Excel workbook
	writeExcelFile(
		path.join(
			assetDir,
			`${item.name.replace(/[/\\?%*:|"<>]/g, '_')}_Assessment.xlsx`,
		),
		{
			'Overview & Metadata': [
				{ Attribute: 'Asset Name', Value: item.name },
				{ Attribute: 'Domain', Value: 'Business Intelligence (BI)' },
				{ Attribute: 'Technology Platform', Value: item.tech },
				{ Attribute: 'Business Area', Value: item.area },
				{ Attribute: 'Asset Owner', Value: item.owner },
				{ Attribute: 'Connected Sources Count', Value: item.sources },
				{ Attribute: 'Data Target Feeds Count', Value: item.targets },
				{ Attribute: 'Tracked KPIs Count', Value: item.kpis },
				{ Attribute: 'Business Description', Value: item.desc },
				{ Attribute: 'Assessment Health Status', Value: 'Validated' },
			],
			'KPIs & Business Metrics': item.kpiList.map((kpi, idx) => ({
				'KPI #': idx + 1,
				'KPI Name': kpi,
				'Business Importance': idx < 3 ? 'Critical' : 'Operational',
				'Update Frequency': 'Daily',
				'Calculation Type': 'Aggregated Fact Metric',
			})),
			'Data Sources & Tables': item.tables.map((tbl, idx) => ({
				'Source #': idx + 1,
				'Table / Source Name': tbl,
				'Source System': 'Enterprise Insurance Data Lake / DW',
				Format: 'Relational View / Fact Table',
				'Refresh Schedule': 'Nightly at 01:00 AM',
			})),
			'Target Outputs': item.targetsList.map((tgt, idx) => ({
				'Target #': idx + 1,
				'Output Target': tgt,
				'Consumer System': 'Executive & Operational Insurance Users',
				Format: tgt.includes('.hyper')
					? 'Tableau Hyper Extract'
					: tgt.includes('.pbix')
						? 'Power BI Dataset'
						: 'Structured Feed',
			})),
			'Complexity & Risk Score': [
				{
					Metric: 'Data Model Complexity',
					Score: '7.8 / 10',
					Evaluation: 'Moderate multi-table snowflake schema',
				},
				{
					Metric: 'Calculation Logic Complexity',
					Score: '6.5 / 10',
					Evaluation:
						'Standard aggregations with several LOD expressions',
				},
				{
					Metric: 'Security & Access Governance',
					Score: '8.2 / 10',
					Evaluation: 'Row-level security based on adjuster region',
				},
				{
					Metric: 'Overall Modernization Effort',
					Score: 'Medium',
					Evaluation:
						'Straightforward conversion to modern self-service',
				},
			],
		},
	);

	// 2. Technical Specification Markdown
	writeMarkdownFile(
		path.join(assetDir, 'Technical_Specification.md'),
		`# Technical Specification: ${item.name}

## 1. Asset Overview
- **Technology**: ${item.tech}
- **Domain**: BI Dashboard / Analytics
- **Business Area**: ${item.area}
- **Owner**: ${item.owner}
- **Description**: ${item.desc}

## 2. Key Performance Indicators (KPIs)
${item.kpiList.map((k) => `- **${k}**`).join('\n')}

## 3. Data Ingestion & Source Schemas
- **Source Count**: ${item.sources}
- **Key Tables**: ${item.tables.join(', ')}

## 4. Downstream Publishing Targets
${item.targetsList.map((t) => `- \`${t}\``).join('\n')}

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in ${item.area}.
`,
	);
}

// Write ETL assessment files
for (const item of etlAssets) {
	const assetDir = path.join(assessmentDir, 'ETL', item.tech, item.name);

	// 1. Assessment Excel workbook
	writeExcelFile(
		path.join(
			assetDir,
			`${item.name.replace(/[/\\?%*:|"<>]/g, '_')}_Assessment.xlsx`,
		),
		{
			'Workflow Overview': [
				{ Attribute: 'Pipeline Name', Value: item.name },
				{ Attribute: 'Domain', Value: 'ETL / Data Engineering' },
				{ Attribute: 'Technology Engine', Value: item.tech },
				{ Attribute: 'Business Area', Value: item.area },
				{ Attribute: 'Pipeline Owner', Value: item.owner },
				{ Attribute: 'Execution Schedule', Value: item.schedule },
				{ Attribute: 'Average Runtime', Value: item.avgRuntime },
				{ Attribute: 'Input Sources Count', Value: item.sources },
				{ Attribute: 'Output Targets Count', Value: item.targets },
				{ Attribute: 'Pipeline Description', Value: item.desc },
			],
			'Pipeline Stages & Tools': item.tools.map((tool, idx) => ({
				'Stage #': idx + 1,
				'Tool ID': tool.toolId,
				'Tool Name': tool.toolName,
				Category: tool.category,
				'Configuration Details': tool.configuration,
				'Validation Status': 'Valid',
			})),
			'Input Connections': item.inputs.map((inp, idx) => ({
				'Input #': idx + 1,
				'Source File / Table': inp.name,
				Type: inp.type,
				'Source Location': inp.location,
				'Verification Status': 'Active',
			})),
			'Output Targets': item.outputs.map((out, idx) => ({
				'Output #': idx + 1,
				'Target Name': out.name,
				Type: out.type,
				'Target Location': out.location,
				'Downstream Consumer': 'BI Dashboards / Curated Lake',
			})),
		},
	);

	// 2. Workflow Specification Markdown
	writeMarkdownFile(
		path.join(assetDir, 'Workflow_Specification.md'),
		`# Pipeline Specification: ${item.name}

## 1. Pipeline Overview
- **Technology**: ${item.tech}
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: ${item.area}
- **Owner**: ${item.owner}
- **Schedule**: ${item.schedule}
- **Average Runtime**: ${item.avgRuntime}
- **Description**: ${item.desc}

## 2. Ingested Data Sources
${item.inputs.map((i) => `- **${i.name}** (${i.type}): \`${i.location}\``).join('\n')}

## 3. Published Targets
${item.outputs.map((o) => `- **${o.name}** (${o.type}): \`${o.location}\``).join('\n')}

## 4. Pipeline Stages & Tools
${item.tools.map((t) => `- **[${t.category}] ${t.toolName}** (\`${t.toolId}\`): ${t.configuration}`).join('\n')}
`,
	);
}

// ─────────────────────────────────────────────────────────────
// 2. GENERATE RATIONALIZATION DOCUMENTATION
// ─────────────────────────────────────────────────────────────
const rationalizationDir = path.join(publicDocDir, 'rationalization');
console.log('Generating Rationalization Documentation in:', rationalizationDir);

// 2.1 Portfolio Rationalization Strategy XLSX
writeExcelFile(
	path.join(rationalizationDir, 'Portfolio_Rationalization_Strategy.xlsx'),
	{
		'Rationalization Summary': [
			{
				Category: 'Consolidate / Merge BI',
				Recommendations: 5,
				'Assets Impacted': 11,
				'Potential Cost Savings': '$145,000 / yr',
				'Risk Level': 'Low',
			},
			{
				Category: 'Consolidate / Merge ETL',
				Recommendations: 1,
				'Assets Impacted': 2,
				'Potential Cost Savings': '$60,000 / yr',
				'Risk Level': 'Low',
			},
			{
				Category: 'Decommission / Retire BI',
				Recommendations: 4,
				'Assets Impacted': 4,
				'Potential Cost Savings': '$95,000 / yr',
				'Risk Level': 'Very Low',
			},
			{
				Category: 'Decommission / Retire ETL',
				Recommendations: 2,
				'Assets Impacted': 2,
				'Potential Cost Savings': '$40,000 / yr',
				'Risk Level': 'Very Low',
			},
			{
				Category: 'Retain / Modernize BI',
				Recommendations: 15,
				'Assets Impacted': 15,
				'Strategic Value': 'High Core Value',
				'Risk Level': 'None',
			},
			{
				Category: 'Retain / Modernize ETL',
				Recommendations: 4,
				'Assets Impacted': 4,
				'Strategic Value': 'Mission Critical Ingestion',
				'Risk Level': 'None',
			},
			{
				Category: 'BI-ETL Connections Mapped',
				Recommendations: 32,
				'Assets Impacted': 32,
				'Lineage Integrity': '100% Validated',
				'Risk Level': 'None',
			},
		],
		'Overlap Analysis': [
			{
				'Overlap Metric': 'Source Metadata Overlaps',
				Count: 18,
				Domain: 'BI',
				Description:
					'Multiple dashboards querying identical tables with redundant schema definitions',
			},
			{
				'Overlap Metric': 'Logic & Metric Overlaps',
				Count: 12,
				Domain: 'BI',
				Description:
					'Duplicated formula and calculated field logic across separate workbooks',
			},
			{
				'Overlap Metric': 'KPI Overlaps',
				Count: 24,
				Domain: 'BI',
				Description:
					'Identical key performance indicators computed independently',
			},
			{
				'Overlap Metric': 'ETL Source Overlaps',
				Count: 14,
				Domain: 'ETL',
				Description:
					'Multiple workflows reading the same underlying operational Excel files',
			},
			{
				'Overlap Metric': 'ETL Logic Overlaps',
				Count: 9,
				Domain: 'ETL',
				Description:
					'Duplicate filtering and aggregation logic across disparate workflow files',
			},
			{
				'Overlap Metric': 'Cross-Technology Overlaps',
				Count: 8,
				Domain: 'BI & ETL',
				Description:
					'Overlaps spanning across Tableau, Power BI, and Alteryx pipelines',
			},
		],
		'Action Roadmap': [
			{
				Phase: 'Phase 1: Quick Wins',
				Action: 'Decommission unused test reports (FFQ Test, Test) and obsolete extracts',
				Duration: '2 Weeks',
				Effort: 'Low',
			},
			{
				Phase: 'Phase 2: Consolidation',
				Action: 'Merge Claims Performance & Executive Summary in Tableau',
				Duration: '4 Weeks',
				Effort: 'Medium',
			},
			{
				Phase: 'Phase 3: Cross-Tech Merge',
				Action: 'Consolidate Finance and Distribution dashboards across Tableau & Power BI',
				Duration: '6 Weeks',
				Effort: 'Medium-High',
			},
			{
				Phase: 'Phase 4: ETL Optimization',
				Action: 'Consolidate Alteryx Claims Extract workflows and migrate to Python Delta pipeline',
				Duration: '8 Weeks',
				Effort: 'High',
			},
		],
	},
);

// 2.2 Portfolio Rationalization Markdown Overview
writeMarkdownFile(
	path.join(rationalizationDir, 'Portfolio_Rationalization_Summary.md'),
	`# Enterprise Rationalization Strategy & Action Matrix

## Executive Summary
The Rationalization Engine analyzed cross-platform overlaps, schema redundancies, KPI duplication, and BI-ETL lineage across the insurance portfolio.

## Key Recommendations
1. **Consolidate 5 BI dashboard clusters**: Unify duplicate dashboards in Claims, Distribution, and Finance, eliminating up to 72% overlapping logic.
2. **Consolidate 2 Alteryx ETL Workflows**: Merge \`Claims_Extract_Volume\` and \`Workflow_03\` into a single optimized pipeline.
3. **Decommission 6 Redundant Assets**: Safely retire unutilized sandbox reports and legacy MicroStrategy dossiers with zero downstream impact.
4. **Preserve 19 Strategic Core Assets**: Retain modern dashboards and production ETL pipelines with verified lineage.

## Financial & Operational ROI
- **Annual Operational Savings**: ~$340,000 / year (Licensing, Cloud Compute & Maintenance)
- **Report Redundancy Reduction**: -42%
- **Maintenance Overhead Reduction**: -55%
`,
);

// Rationalization BI Recommendations
const rationalizationBiRecs = [
	{
		tech: 'Tableau',
		clusterName: 'Claims Performance & Executive Consolidation',
		category: 'Consolidation',
		area: 'Claims',
		overlapPct: 72,
		assets: ['Claims - Agent Performance', 'Claims - Executive Summary'],
		target: 'Claims - Executive Summary',
		rationale:
			'Both Tableau dashboards evaluate claims throughput, resolution turnaround times, and loss frequency from identical claims fact tables. Consolidating reduces visual fragmentation.',
		action: 'Consolidate into Claims - Executive Summary. Port individual agent drill-through views.',
		kpis: [
			'Incurred Claims',
			'Paid Losses',
			'Pending Reserves',
			'Cycle Time',
			'Loss Ratio',
			'Adjuster SLA',
		],
		tables: ['claims_fact', 'claims_loss_data', 'adjuster_dim'],
	},
	{
		tech: 'Tableau',
		clusterName: 'Beneficiary Services Consolidation',
		category: 'Consolidation',
		area: 'Customer',
		overlapPct: 65,
		assets: [
			'Beneficiary Services v1',
			'Beneficiary Services Aging Dashboard',
		],
		target: 'Beneficiary Services v1',
		rationale:
			'Aging metrics and payout indicators can be displayed on a unified operational tab, removing redundant database queries.',
		action: 'Merge Aging Dashboard views into a sub-tab of Beneficiary Services v1.',
		kpis: [
			'Beneficiary Payout Velocity',
			'Inquiry Volume',
			'Cases > 30 Days',
			'Cases > 60 Days',
		],
		tables: [
			'beneficiary_cases_fact',
			'contact_center_logs',
			'workflow_queue_dim',
		],
	},
	{
		tech: 'Power BI',
		clusterName: 'Distribution Agent Performance Merge',
		category: 'Consolidation',
		area: 'Distribution',
		overlapPct: 68,
		assets: ['Bottom 25% Agents', 'New Business (Bottom 25% agents)'],
		target: 'Bottom 25% Agents',
		rationale:
			'Both Power BI reports analyze lower quartile agent productivity and new bind conversion from the same underlying agent monthly production tables.',
		action: 'Merge New Business metrics as a dedicated page in Bottom 25% Agents report.',
		kpis: [
			'Agent Premium Volume',
			'Policy Bind Rate',
			'Submission Quality Score',
			'Quote-to-Bind Ratio',
		],
		tables: [
			'agent_monthly_production_fact',
			'broker_profile_dim',
			'submission_fact',
		],
	},
	{
		tech: 'Power BI',
		clusterName: 'Finance Analytics Cross-Platform Merge',
		category: 'Consolidation',
		area: 'Finance',
		overlapPct: 81,
		assets: [
			'Insurance Analytics Dashboard (Tableau)',
			'Insurance Analytics Dashboard (Power BI)',
		],
		target: 'Insurance Analytics Dashboard (Power BI)',
		rationale:
			'Identical financial reporting datasets replicated across both Tableau and Power BI. Standardizing on Power BI eliminates redundant license overhead.',
		action: 'Retire Tableau version and migrate unique drill-downs to Power BI master financial model.',
		kpis: [
			'Combined Ratio',
			'Underwriting Profit',
			'Net Investment Income',
			'Earned Premium',
			'Operating Margin %',
		],
		tables: [
			'financial_general_ledger_fact',
			'statutory_financials_fact',
			'budget_allocation_dim',
		],
	},
	{
		tech: 'Power BI',
		clusterName: 'Underwriting Sandbox Decommission',
		category: 'Decommission',
		area: 'Underwriting',
		overlapPct: 90,
		assets: ['FFQ Test', 'Test'],
		target: 'Decommission',
		rationale:
			'Sandbox and proof-of-concept reports with zero active user traffic in the past 90 days.',
		action: 'Archive datasets to cold storage and decommission active Power BI workspaces.',
		kpis: [
			'Rating Verification Score',
			'Model Deviation %',
			'Sample Variance',
		],
		tables: ['sandbox_test_results', 'scoring_parameters_dim'],
	},
	{
		tech: 'MicroStrategy',
		clusterName: 'P&C Legacy Migration & Retirement',
		category: 'Decommission & Migration',
		area: 'Claims',
		overlapPct: 85,
		assets: ['P&C Claims Dashboard v3', 'Claims Cube'],
		target: 'Snowflake + ThoughtSpot Liveboard',
		rationale:
			'Legacy MicroStrategy dossiers incur heavy server infrastructure costs. Core dimensions are fully covered by modern Snowflake data models.',
		action: 'Migrate active user cohorts to ThoughtSpot Liveboards and decommission MicroStrategy intelligence servers.',
		kpis: [
			'Incurred Loss',
			'Case Reserves',
			'Paid Indemnity',
			'Subrogation Recovery',
		],
		tables: ['mstr_pc_claims_fact', 'mstr_loss_reserves_fact'],
	},
	{
		tech: 'ThoughtSpot',
		clusterName: 'Enterprise Liveboards Modernization',
		category: 'Retain & Expand',
		area: 'Claims & Distribution',
		overlapPct: 15,
		assets: ['Liveboards Summary'],
		target: 'Strategic Target Platform',
		rationale:
			'AI-driven self-service liveboards connected directly to Snowflake lakehouse architecture with sub-second response times.',
		action: 'Maintain as primary self-service exploration platform for business analysts.',
		kpis: [
			'Real-time Claims Intake',
			'Instant Loss Severity',
			'Natural Language Search',
		],
		tables: ['snowflake_curated_claims_view', 'snowflake_customer_360'],
	},
];

// Rationalization ETL Recommendations
const rationalizationEtlRecs = [
	{
		tech: 'Alteryx',
		clusterName: 'Claims Extract Workflows Merge',
		category: 'Consolidation',
		area: 'Claims',
		overlapPct: 78,
		assets: ['Claims_Extract_Volume', 'Workflow_03'],
		target: 'Unified Claims Ingestion Pipeline',
		rationale:
			'Both workflows read identical claims excel workbooks and perform redundant aggregation logic for quarterly claims reporting.',
		action: 'Merge Workflow_03 policy joins into Claims_Extract_Volume and eliminate redundant intermediate staging outputs.',
		inputs: [
			'Claims_Volume_Extract_Demo.xlsx',
			'Policy_Master_Demo.xlsx',
			'Claims_Master.xlsx',
		],
		outputs: [
			'Claims_Historical_Extract_Demo_Output.xlsx',
			'Integrated_Insurance_Cube.yxdb',
		],
	},
	{
		tech: 'Alteryx',
		clusterName: 'Legacy Alteryx Workflows Retirement',
		category: 'Decommission',
		area: 'Claims',
		overlapPct: 88,
		assets: ['Claims_Extract_Volume_v2', 'Workflow_01'],
		target: 'Decommission',
		rationale:
			'Superceded by automated Python pipelines and updated Claims_Extract_Volume v1 workflow.',
		action: 'De-schedule Alteryx Server jobs and archive workflow yxmd definitions.',
		inputs: ['Raw_Claims_Feed.csv', 'Claims_Volume_Historical.xlsx'],
		outputs: ['Litigation_Risk_Categorization.yxdb'],
	},
	{
		tech: 'Python',
		clusterName: 'Vectorized Claims Pipeline Modernization',
		category: 'Retain & Scale',
		area: 'Claims',
		overlapPct: 10,
		assets: ['claims_processing'],
		target: 'Enterprise Core Data Pipeline',
		rationale:
			'Highly optimized Python & Polars pipeline executing sub-2-minute streaming ingestion into Delta Lake and Snowflake.',
		action: 'Promote as the gold standard pattern for legacy ETL workflow migration.',
		inputs: [
			's3://insurance-raw/claims_stream/*.parquet',
			'postgres://core_db/policy_master',
		],
		outputs: [
			's3://insurance-lake/claims/curated_delta/',
			'snowflake://analytics_db/claims_fact',
		],
	},
];

// Write BI Rationalization files
for (const item of rationalizationBiRecs) {
	const folderDir = path.join(
		rationalizationDir,
		'BI',
		item.tech,
		item.clusterName,
	);

	// 1. Rationalization Excel workbook
	writeExcelFile(
		path.join(
			folderDir,
			`${item.clusterName.replace(/[/\\?%*:|"<>]/g, '_')}_Rationalization.xlsx`,
		),
		{
			'Recommendation Summary': [
				{ Parameter: 'Recommendation Title', Value: item.clusterName },
				{ Parameter: 'Domain', Value: 'Business Intelligence' },
				{ Parameter: 'Technology', Value: item.tech },
				{ Parameter: 'Action Category', Value: item.category },
				{ Parameter: 'Business Area', Value: item.area },
				{
					Parameter: 'Calculated Overlap %',
					Value: `${item.overlapPct}%`,
				},
				{ Parameter: 'Target Platform / Asset', Value: item.target },
				{
					Parameter: 'Recommendation Rationale',
					Value: item.rationale,
				},
				{ Parameter: 'Implementation Action Plan', Value: item.action },
			],
			'Impacted Assets': item.assets.map((assetName, idx) => ({
				'Asset #': idx + 1,
				'Asset Name': assetName,
				Technology: item.tech,
				'Current Status':
					item.category === 'Consolidation'
						? assetName === item.target
							? 'Target to Retain'
							: 'Candidate for Merge'
						: 'Candidate for Retirement',
				'Data Overlap': `${item.overlapPct}% with cluster`,
			})),
			'Common KPIs': item.kpis.map((kpi, idx) => ({
				'KPI #': idx + 1,
				'KPI Name': kpi,
				'Consolidation Strategy': 'Preserve in master semantic layer',
			})),
			'Underlying Tables': item.tables.map((tbl, idx) => ({
				'Table #': idx + 1,
				'Table Name': tbl,
				'Query Optimization': 'Eliminate duplicate extract polling',
			})),
		},
	);

	// 2. Markdown Action Plan
	writeMarkdownFile(
		path.join(
			folderDir,
			`${item.category.replace(/[^a-zA-Z0-9]/g, '_')}_Plan.md`,
		),
		`# Rationalization Plan: ${item.clusterName}

## 1. Executive Summary
- **Domain**: Business Intelligence (${item.tech})
- **Business Area**: ${item.area}
- **Action Type**: ${item.category}
- **Calculated Overlap**: **${item.overlapPct}%**
- **Target Destination**: ${item.target}

## 2. Impacted Asset Inventory
${item.assets.map((a) => `- **${a}**`).join('\n')}

## 3. Rationale
${item.rationale}

## 4. Execution Roadmap
${item.action}

## 5. KPIs & Data Sources
- **Preserved KPIs**: ${item.kpis.join(', ')}
- **Underlying Tables**: ${item.tables.join(', ')}
`,
	);
}

// Write ETL Rationalization files
for (const item of rationalizationEtlRecs) {
	const folderDir = path.join(
		rationalizationDir,
		'ETL',
		item.tech,
		item.clusterName,
	);

	// 1. Rationalization Excel workbook
	writeExcelFile(
		path.join(
			folderDir,
			`${item.clusterName.replace(/[/\\?%*:|"<>]/g, '_')}_Rationalization.xlsx`,
		),
		{
			'Recommendation Summary': [
				{
					Parameter: 'Pipeline Recommendation',
					Value: item.clusterName,
				},
				{ Parameter: 'Domain', Value: 'ETL / Data Engineering' },
				{ Parameter: 'Technology', Value: item.tech },
				{ Parameter: 'Action Category', Value: item.category },
				{ Parameter: 'Business Area', Value: item.area },
				{
					Parameter: 'Calculated Overlap %',
					Value: `${item.overlapPct}%`,
				},
				{ Parameter: 'Target Architecture', Value: item.target },
				{ Parameter: 'Rationale', Value: item.rationale },
				{ Parameter: 'Action', Value: item.action },
			],
			'Impacted Workflows': item.assets.map((name, idx) => ({
				'Workflow #': idx + 1,
				'Workflow Name': name,
				Technology: item.tech,
				'Current State': 'Active Alteryx Server Job',
				'Target Action':
					item.category === 'Consolidation'
						? 'Merge into single optimized flow'
						: 'Retire and archive',
			})),
			'Source Connections': item.inputs.map((inp, idx) => ({
				'Source #': idx + 1,
				'Input Name': inp,
				'Consolidation Strategy': 'Unify data lake extract connector',
			})),
			'Target Outputs': item.outputs.map((out, idx) => ({
				'Target #': idx + 1,
				'Output Name': out,
				'Consolidation Strategy':
					'Direct publication to cloud lakehouse',
			})),
		},
	);

	// 2. Markdown Action Plan
	writeMarkdownFile(
		path.join(
			folderDir,
			`${item.category.replace(/[^a-zA-Z0-9]/g, '_')}_Plan.md`,
		),
		`# ETL Rationalization Plan: ${item.clusterName}

## 1. Pipeline Overview
- **Domain**: ETL Engineering (${item.tech})
- **Business Area**: ${item.area}
- **Action Type**: ${item.category}
- **Calculated Overlap**: **${item.overlapPct}%**
- **Target Architecture**: ${item.target}

## 2. Impacted Workflows
${item.assets.map((a) => `- **${a}**`).join('\n')}

## 3. Engineering Rationale
${item.rationale}

## 4. Migration & Consolidation Roadmap
${item.action}

## 5. Data Inputs & Target Feeds
- **Input Sources**: ${item.inputs.join(', ')}
- **Output Targets**: ${item.outputs.join(', ')}
`,
	);
}

// ─────────────────────────────────────────────────────────────
// 3. GENERATE MANIFEST JSON FOR INSTANT BROWSER ZIP CREATION
// ─────────────────────────────────────────────────────────────
function buildManifest(dir, baseDir = dir) {
	const items = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

		if (entry.isDirectory()) {
			items.push(...buildManifest(fullPath, baseDir));
		} else {
			items.push({
				path: relPath,
				url: `/documentation/${path.relative(publicDocDir, fullPath).replace(/\\/g, '/')}`,
				size: fs.statSync(fullPath).size,
			});
		}
	}
	return items;
}

const assessmentManifest = buildManifest(assessmentDir);
const rationalizationManifest = buildManifest(rationalizationDir);

writeMarkdownFile(
	path.join(publicDocDir, 'manifest.json'),
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			assessment: assessmentManifest,
			rationalization: rationalizationManifest,
		},
		null,
		2,
	),
);

console.log('✅ Successfully generated static documentation and manifest!');
console.log(`- Assessment files: ${assessmentManifest.length}`);
console.log(`- Rationalization files: ${rationalizationManifest.length}`);
