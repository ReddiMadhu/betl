# Pipeline Specification: Workflow_04

## 1. Pipeline Overview
- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Underwriting
- **Owner**: Kevin Liu
- **Schedule**: Daily at 05:00 AM EST
- **Average Runtime**: 18 mins 40 secs
- **Description**: Consolidates operational data across volume performance, geography, and operation metrics.

## 2. Ingested Data Sources
- **UW_Submissions.csv** (CSV File): `./Data/UW_Submissions.csv`
- **Broker_Territories.xlsx** (Excel File): `./Data/Broker_Territories.xlsx`
- **Risk_Class_Lookups.csv** (CSV File): `./Data/Risk_Class_Lookups.csv`
- **Fleet_Telematic_Aggregates.parquet** (Parquet File): `./Data/Fleet_Telematic_Aggregates.parquet`
- **Actuarial_Rating_Tables.xlsx** (Excel File): `./Data/Actuarial_Rating_Tables.xlsx`
- **Reinsurance_Limits.csv** (CSV File): `./Data/Reinsurance_Limits.csv`
- **Historical_Loss_Ratios.csv** (CSV File): `./Data/Historical_Loss_Ratios.csv`

## 3. Published Targets
- **UW_Operational_Metrics.yxdb** (Alteryx DB): `Outputs/UW_Operational_Metrics.yxdb`
- **Broker_Exposure_Summary.xlsx** (Excel File): `Outputs/Broker_Exposure_Summary.xlsx`
- **Fleet_Risk_Ratings.csv** (CSV File): `Outputs/Fleet_Risk_Ratings.csv`

## 4. Pipeline Stages & Tools
- **[Input] Multi-Input Ingestion** (`t1`): 7 Source Connectors
- **[Join] Spatial Match & Geographic Join** (`t2`): Match broker location to territory boundaries
- **[Transform] Rating Factor Calculation** (`t3`): Multi-tier commercial exposure risk calculation
- **[Output] Multi-target Output** (`t4`): Downstream feeding UW Tableau & Power BI
