# Technical Specification: P&C Claims Dashboard v3

## 1. Asset Overview
- **Technology**: MicroStrategy
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Tom Harrison
- **Description**: Multi-chapter property and casualty dossier with loss reserve projections and settlement metrics.

## 2. Key Performance Indicators (KPIs)
- **Incurred Loss**
- **Case Reserves**
- **Paid Indemnity**
- **Paid Medical**
- **Subrogation Recovery**
- **ALAE Expense**
- **ULAE Expense**
- **Closure Rate**
- **Average Severity**
- **Litigation Frequency**
- **Bodily Injury Ratio**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 5
- **Key Tables**: mstr_pc_claims_fact, mstr_loss_reserves_fact, mstr_litigation_dim, mstr_adjuster_dim, mstr_policy_dim

## 4. Downstream Publishing Targets
- `PC_Claims_Dossier_v3.mstr`
- `Claims_Cube_Cache.cube`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
