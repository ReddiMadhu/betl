# Technical Specification: Claims - Executive Summary

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Sarah Mitchell
- **Description**: Executive overview of claims volume, paid losses, pending reserves, and loss frequency.

## 2. Key Performance Indicators (KPIs)
- **Incurred Claims**
- **Paid Losses**
- **Pending Reserves**
- **Loss Frequency**
- **Loss Severity**
- **Pure Premium**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: claims_fact, claims_loss_data, reserves_monthly_fact

## 4. Downstream Publishing Targets
- `claims_executive_extract.hyper`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
