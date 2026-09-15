# Pipeline Specification: Workflow_02

## 1. Pipeline Overview

- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: EXL
- **Schedule**: Daily at 04:00 AM EST
- **Average Runtime**: 06 mins 45 secs
- **Description**: Calculates key dates and aggregates claim volumes by industry type.

## 2. Ingested Data Sources

- **Industry_Classification.xlsx** (Excel File): `./Data/Industry_Classification.xlsx`
- **Policy_Holders.csv** (CSV File): `./Data/Policy_Holders.csv`
- **Claims_Intake_Log.xlsx** (Excel File): `./Data/Claims_Intake_Log.xlsx`

## 3. Published Targets

- **Industry_Claim_Aggregates.yxdb** (Alteryx DB): `Outputs/Industry_Claim_Aggregates.yxdb`

## 4. Pipeline Stages & Tools

- **[Input] Input Data** (`t1`): ./Data/Claims_Intake_Log.xlsx
- **[Parse] DateTime** (`t2`): Convert String Date to DateTime
- **[Transform] Summarize** (`t3`): Industry_Code:GroupBy; Loss_Amount:Sum
- **[Output] Output Data** (`t4`): Industry_Claim_Aggregates.yxdb
