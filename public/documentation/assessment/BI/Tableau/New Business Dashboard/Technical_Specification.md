# Technical Specification: New Business Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Policy Administration
- **Owner**: Diana Lee
- **Description**: New policy acquisition volumes, direct written premiums, and issue turnaround times.

## 2. Key Performance Indicators (KPIs)
- **New Policy Issue Count**
- **Direct Written Premium (DWP)**
- **Time to Issue (Days)**
- **E-signature Completion Rate**
- **Underwriter Referral %**
- **Channel Contribution**
- **Premium per Policy**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: policy_issuance_fact, submission_intake_fact, channel_dim, product_hierarchy_dim

## 4. Downstream Publishing Targets
- `new_biz_extract.hyper`
- `executive_weekly_issuance.xlsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Policy Administration.
