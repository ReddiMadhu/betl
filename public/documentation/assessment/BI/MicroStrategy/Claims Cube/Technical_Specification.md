# Technical Specification: Claims Cube

## 1. Asset Overview
- **Technology**: MicroStrategy
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Tom Harrison
- **Description**: Multidimensional semantic cube for high-volume claims aggregation and financial reconciliation.

## 2. Key Performance Indicators (KPIs)
- **Total Aggregate Loss**
- **Earned Exposure**
- **Claim Count per 1000 Units**
- **Direct Incurred Amount**
- **Loss Ratio Index**
- **Actuarial Triangulation Factor**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: claims_master_aggregate, semantic_time_dimension, financial_ledger_dim

## 4. Downstream Publishing Targets
- `Claims_Enterprise_Cube.cube`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
