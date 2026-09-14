# Technical Specification: Bottom 25% Agents

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Distribution
- **Owner**: Amanda Foster
- **Description**: Agent production review identifying lower quartile broker support needs and coaching targets.

## 2. Key Performance Indicators (KPIs)
- **Agent Premium Volume**
- **Policy Bind Rate**
- **Quote Count**
- **Underwriting Rejection %**
- **Agent Tenure (Months)**
- **Coaching Need Score**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: agent_monthly_production_fact, broker_profile_dim, training_history_dim, lead_assignment_fact

## 4. Downstream Publishing Targets
- `Agent_Support_Optimization.pbix`
- `Distribution_Ops_Export.csv`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Distribution.
