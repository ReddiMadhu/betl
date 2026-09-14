# Technical Specification: Motor Insurance Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Underwriting
- **Owner**: Lisa Wang
- **Description**: Commercial fleet and personal auto underwriting exposure and rating analysis.

## 2. Key Performance Indicators (KPIs)
- **Written Premium**
- **Loss Cost per Unit**
- **Vehicle Telematics Score**
- **Fleet Exposure Units**
- **Renewal Retention**
- **Quoted vs Bound**
- **Expense Ratio**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: underwriting_submissions_fact, fleet_vehicles_dim, rating_engine_output, broker_production_dim

## 4. Downstream Publishing Targets
- `motor_uw_extract.hyper`
- `fleet_risk_feed.csv`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Underwriting.
