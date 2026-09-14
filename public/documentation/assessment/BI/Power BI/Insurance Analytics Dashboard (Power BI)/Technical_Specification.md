# Technical Specification: Insurance Analytics Dashboard (Power BI)

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Finance
- **Owner**: Jennifer Adams
- **Description**: Power BI financial reporting with expense breakdown and quarterly margin analysis.

## 2. Key Performance Indicators (KPIs)
- **Direct Written Premium**
- **Net Incurred Claims**
- **Management Expense Ratio**
- **Commission Ratio**
- **Operating Margin %**
- **Underwriting Cash Flow**
- **Investment Yield**
- **Budget Variance**
- **EBITDA**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 5
- **Key Tables**: financial_general_ledger_fact, quarterly_reconciliation_fact, budget_allocation_dim, chart_of_accounts_dim, department_dim

## 4. Downstream Publishing Targets
- `Finance_Executive_PBI.pbix`
- `CFO_Quarterly_Deck_Feed.xlsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Finance.
