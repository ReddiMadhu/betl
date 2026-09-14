# ETL Rationalization Plan: Vectorized Claims Pipeline Modernization

## 1. Pipeline Overview
- **Domain**: ETL Engineering (Python)
- **Business Area**: Claims
- **Action Type**: Retain & Scale
- **Calculated Overlap**: **10%**
- **Target Architecture**: Enterprise Core Data Pipeline

## 2. Impacted Workflows
- **claims_processing**

## 3. Engineering Rationale
Highly optimized Python & Polars pipeline executing sub-2-minute streaming ingestion into Delta Lake and Snowflake.

## 4. Migration & Consolidation Roadmap
Promote as the gold standard pattern for legacy ETL workflow migration.

## 5. Data Inputs & Target Feeds
- **Input Sources**: s3://insurance-raw/claims_stream/*.parquet, postgres://core_db/policy_master
- **Output Targets**: s3://insurance-lake/claims/curated_delta/, snowflake://analytics_db/claims_fact
