# Technical Specification: Claims - State Performance

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: James Chen
- **Description**: Geographic and state-by-state claims distribution and severity metrics.

## 2. Key Performance Indicators (KPIs)
- **State Incurred Loss**
- **Litigation %**
- **Avg Settlement Cost**
- **Regulatory Compliance %**
- **State Volume Rank**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 2
- **Key Tables**: claims_geo_fact, state_jurisdiction_dim

## 4. Downstream Publishing Targets
- `state_performance_extract.hyper`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
