# Technical Specification: Insurance Analytics Dashboard (Tableau)

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Finance
- **Owner**: Jennifer Adams
- **Description**: Tableau financial overview covering combined ratios, investment return, and written premiums.

## 2. Key Performance Indicators (KPIs)
- **Combined Ratio**
- **Underwriting Profit**
- **Net Investment Income**
- **Earned Premium**
- **Operating Ratio**
- **Solvency Margin**
- **Statutory Capital**
- **Return on Equity (ROE)**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: general_ledger_fact, statutory_financials_fact, investment_portfolio_fact, cost_center_dim

## 4. Downstream Publishing Targets
- `finance_exec_summary.hyper`
- `regulatory_filing_extract.csv`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Finance.
