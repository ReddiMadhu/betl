# Technical Specification: Insurance Claim Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Rachel Torres
- **Description**: End-to-end insurance claim intake, triage status, and settlement cycle analysis.

## 2. Key Performance Indicators (KPIs)
- **Intake Volume**
- **Triage Velocity**
- **First Notice of Loss (FNOL)**
- **Auto-approval Rate**
- **Investigative Referral**
- **Settlement TAT**
- **Total Payout**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: fnol_intake_fact, claims_lifecycle_fact, investigation_log, policy_master_dim

## 4. Downstream Publishing Targets
- `intake_summary_tableau.hyper`
- `claims_ops_publish.tdsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
