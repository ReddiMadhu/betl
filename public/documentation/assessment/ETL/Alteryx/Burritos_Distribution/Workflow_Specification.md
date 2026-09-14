# Pipeline Specification: Burritos_Distribution

## 1. Pipeline Overview
- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Distribution
- **Owner**: Nina Patel
- **Schedule**: Weekly on Mondays
- **Average Runtime**: 09 mins 15 secs
- **Description**: Processes operational distribution data with date filtering and volume aggregations.

## 2. Ingested Data Sources
- **Agency_Production_Log.xlsx** (Excel File): `./Data/Agency_Production_Log.xlsx`
- **Channel_Quota.csv** (CSV File): `./Data/Channel_Quota.csv`
- **Agent_Roster.xlsx** (Excel File): `./Data/Agent_Roster.xlsx`
- **Commission_Tiers.csv** (CSV File): `./Data/Commission_Tiers.csv`
- **Product_Catalog.csv** (CSV File): `./Data/Product_Catalog.csv`

## 3. Published Targets
- **Distribution_Summary_Output.yxdb** (Alteryx DB): `Outputs/Distribution_Summary_Output.yxdb`
- **Agent_Scorecard_Feed.csv** (CSV File): `Outputs/Agent_Scorecard_Feed.csv`
- **Bottom_25_Agents_Extract.hyper** (Tableau Hyper): `TableauServer/Bottom_25.hyper`

## 4. Pipeline Stages & Tools
- **[Input] Input Data** (`t1`): Distribution source files
- **[Transform] Summarize & Quartile Rank** (`t2`): Rank agents by bind volume to identify lower 25%
- **[Output] Output Data** (`t3`): Tableau Hyper & CSV outputs
