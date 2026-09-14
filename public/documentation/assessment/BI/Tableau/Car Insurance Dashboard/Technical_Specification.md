# Technical Specification: Car Insurance Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Sarah Mitchell
- **Description**: Auto physical damage and bodily injury claims summary and repair cost analytics.

## 2. Key Performance Indicators (KPIs)
- **Bodily Injury Loss**
- **Property Damage Loss**
- **Collision Severity**
- **Comprehensive Loss Ratio**
- **Salvage Recovery**
- **Rental Car Days**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: auto_claims_fact, vehicle_vin_dim, repair_shop_dim

## 4. Downstream Publishing Targets
- `auto_claims_tableau.hyper`
- `salvage_recovery_feed.xlsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
