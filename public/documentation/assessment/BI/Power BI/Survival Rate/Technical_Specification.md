# Technical Specification: Survival Rate

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Policy Administration
- **Owner**: Chris Morgan
- **Description**: Policy retention curves, lapse analysis, and survival rate tracking over renewal terms.

## 2. Key Performance Indicators (KPIs)
- **Year 1 Survival Rate**
- **Year 3 Survival Rate**
- **Year 5 Survival Rate**
- **Lapse Probability Index**
- **Premium Sensitivity Elasticity**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: policy_cohort_survival_fact, retention_decay_curve_dim, premium_bracket_dim

## 4. Downstream Publishing Targets
- `Policy_Survival_Analysis.pbix`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Policy Administration.
