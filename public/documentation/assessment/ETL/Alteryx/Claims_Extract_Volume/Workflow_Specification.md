# Pipeline Specification: Claims_Extract_Volume

## 1. Pipeline Overview
- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: Mass Mutual
- **Schedule**: Daily at 02:00 AM EST
- **Average Runtime**: 14 mins 32 secs
- **Description**: Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.

## 2. Ingested Data Sources
- **Claims_Volume_Extract_Demo.xlsx** (Excel File): `./Data/Claims_Volume_Extract_Demo.xlsx`
- **Policy_Master_Demo.xlsx** (Excel File): `./Data/Policy_Master_Demo.xlsx`
- **Adjuster_Hierarchy.csv** (CSV File): `./Data/Adjuster_Hierarchy.csv`
- **State_Taxonomy.xlsx** (Excel File): `./Data/State_Taxonomy.xlsx`

## 3. Published Targets
- **Demo_Claims_Quarter_Summary.yxdb** (Alteryx DB): `Temp/Demo_Claims_Quarter_Summary.yxdb`
- **Demo_Claims_Team_LastQuarter.yxdb** (Alteryx DB): `Temp/Demo_Claims_Team_LastQuarter.yxdb`
- **Claims_Historical_Extract_Demo_Output.xlsx** (Excel File): `Outputs/Claims_Historical_Extract_Demo_Output.xlsx`
- **Claims_Executive_Summary.hyper** (Tableau Hyper): `TableauServer/DataSources/Claims_Executive_Summary.hyper`
- **Claims_Operational_Curated.parquet** (Parquet File): `S3://insurance-lake/claims/curated/`

## 4. Pipeline Stages & Tools
- **[Input] Input Data** (`t1`): ./Data/Claims_Volume_Extract_Demo.xlsx|||Sheet1$
- **[Preparation] Block Until Done** (`t2`): Sequential branch execution
- **[Transform] Summarize** (`t3`): Quarter End Date:GroupBy; Claim Status:GroupBy; Claim Number:CountDistinct
- **[Transform] Cross Tab** (`t4`): GroupField: Quarter End Date | Header: Claim Status | Data: CountDistinct
- **[Preparation] Select** (`t5`): Selects Quarter End Date, Preclaim, Active_Pending, Approved
- **[Preparation] Sort** (`t6`): Quarter End Date Descending
- **[Join] Join** (`t7`): LeftField: Quarter End Date | RightField: Last Quarter
- **[Output] Output Data** (`t8`): Claims_Historical_Extract_Demo_Output.xlsx|||Detail
