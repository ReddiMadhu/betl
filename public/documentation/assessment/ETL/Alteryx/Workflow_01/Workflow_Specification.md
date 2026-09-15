# Pipeline Specification: Workflow_01

## 1. Pipeline Overview

- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: EXL
- **Schedule**: Weekly on Sundays
- **Average Runtime**: 08 mins 12 secs
- **Description**: Consolidates claims and payments data through various transformations.

## 2. Ingested Data Sources

- **Raw_Claims_Feed.csv** (CSV File): `./Data/Raw_Claims_Feed.csv`
- **Payment_Transactions.xlsx** (Excel File): `./Data/Payment_Transactions.xlsx`
- **Vendor_Disbursements.csv** (CSV File): `./Data/Vendor_Disbursements.csv`

## 3. Published Targets

- **Consolidated_Payments_Output.yxdb** (Alteryx DB): `Outputs/Consolidated_Payments_Output.yxdb`

## 4. Pipeline Stages & Tools

- **[Input] Input Data** (`t1`): ./Data/Raw_Claims_Feed.csv
- **[Preparation] Formula** (`t2`): Payment_Amount = IF IsNull(Payment) THEN 0 ELSE Payment ENDIF
- **[Join] Join** (`t3`): Left: Claim_ID == Right: Claim_ID
- **[Output] Output Data** (`t4`): Consolidated_Payments_Output.yxdb
