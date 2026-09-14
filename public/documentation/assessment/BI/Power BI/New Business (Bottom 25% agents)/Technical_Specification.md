# Technical Specification: New Business (Bottom 25% agents)

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Distribution
- **Owner**: Amanda Foster
- **Description**: New policy bind counts and conversion ratios for bottom quartile distribution channels.

## 2. Key Performance Indicators (KPIs)
- **New Bind Rate**
- **Submission Quality Score**
- **Quote-to-Bind Ratio**
- **Loss Ratio of New Policies**
- **Commission Yield**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: agent_monthly_production_fact, submission_fact, agency_branch_dim

## 4. Downstream Publishing Targets
- `New_Business_Agent_Intervention.pbix`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Distribution.
