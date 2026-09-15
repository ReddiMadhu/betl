# Pipeline Specification: Claims_Extract_Volume_v2

## 1. Pipeline Overview

- **Technology**: Alteryx
- **Domain**: ETL Pipeline / Data Transformation
- **Business Area**: Claims
- **Owner**: EXL
- **Schedule**: Weekly on Saturdays
- **Average Runtime**: 11 mins 20 secs
- **Description**: Secondary extract workflow for aging-litigation risk categorization.

## 2. Ingested Data Sources

- **Claims_Volume_Historical.xlsx** (Excel File): `./Data/Claims_Volume_Historical.xlsx`
- **Litigation_Scores.csv** (CSV File): `./Data/Litigation_Scores.csv`
- **Adjuster_Caseload.xlsx** (Excel File): `./Data/Adjuster_Caseload.xlsx`
- **State_Statute_Limits.csv** (CSV File): `./Data/State_Statute_Limits.csv`

## 3. Published Targets

- **Litigation_Risk_Categorization.yxdb** (Alteryx DB): `Outputs/Litigation_Risk_Categorization.yxdb`

## 4. Pipeline Stages & Tools

- **[Input] Input Data** (`t1`): ./Data/Claims_Volume_Historical.xlsx
- **[Preparation] Formula** (`t2`): Risk_Tier = IF Age > 90 THEN "High" ELSE "Normal" ENDIF
- **[Output] Output Data** (`t3`): Litigation_Risk_Categorization.yxdb
