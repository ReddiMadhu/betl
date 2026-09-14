# Technical Specification: Store Sales

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Distribution
- **Owner**: Amanda Foster
- **Description**: Retail agency and physical branch location production analysis.

## 2. Key Performance Indicators (KPIs)
- **Physical Branch Volume**
- **Walk-in Quotes**
- **Over-the-Counter Binds**
- **Staff Productivity Score**
- **Branch Profitability**
- **Local Market Share %**
- **Customer Wait Time**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: branch_daily_sales_fact, store_location_dim, agent_roster_dim, regional_quota_dim

## 4. Downstream Publishing Targets
- `Store_Sales_Analytics.pbix`
- `Regional_Director_Summary.xlsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Distribution.
