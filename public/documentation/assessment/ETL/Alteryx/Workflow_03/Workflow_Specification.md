# Pipeline Specification: Workflow_03

## 1. Pipeline Overview

- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: EXL
- **Schedule**: Nightly at 01:30 AM EST
- **Average Runtime**: 22 mins 10 secs
- **Description**: Consolidates policy, claims and payment data from multiple sources.

## 2. Ingested Data Sources

- **Policy_Extract.csv** (CSV File): `./Data/Policy_Extract.csv`
- **Claims_Master.xlsx** (Excel File): `./Data/Claims_Master.xlsx`
- **Payment_Ledger.csv** (CSV File): `./Data/Payment_Ledger.csv`
- **Agent_Master.xlsx** (Excel File): `./Data/Agent_Master.xlsx`
- **Customer_Demographics.parquet** (Parquet File): `./Data/Customer_Demographics.parquet`

## 3. Published Targets

- **Integrated_Insurance_Cube.yxdb** (Alteryx DB): `Outputs/Integrated_Insurance_Cube.yxdb`
- **Claims_Financial_Audit.xlsx** (Excel File): `Outputs/Claims_Financial_Audit.xlsx`
- **Downstream_ETL_Trigger.json** (JSON File): `Kafka://topic/claims_curated`

## 4. Pipeline Stages & Tools

- **[Input] Input Data (x5)** (`t1`): Multi-source ingestion stream
- **[Join] Multiple Joins** (`t2`): Relational join graph across Policy, Claims, Payment
- **[Preparation] Filter & Impute** (`t3`): Impute missing reserve estimations
- **[Output] Output Data (x3)** (`t4`): Target distribution feeds
