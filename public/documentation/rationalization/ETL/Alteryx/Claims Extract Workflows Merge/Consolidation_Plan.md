# ETL Rationalization Plan: Claims Extract Workflows Merge

## 1. Pipeline Overview
- **Domain**: ETL Engineering (Alteryx)
- **Business Area**: Claims
- **Action Type**: Consolidation
- **Calculated Overlap**: **78%**
- **Target Architecture**: Unified Claims Ingestion Pipeline

## 2. Impacted Workflows
- **Claims_Extract_Volume**
- **Workflow_03**

## 3. Engineering Rationale
Both workflows read identical claims excel workbooks and perform redundant aggregation logic for quarterly claims reporting.

## 4. Migration & Consolidation Roadmap
Merge Workflow_03 policy joins into Claims_Extract_Volume and eliminate redundant intermediate staging outputs.

## 5. Data Inputs & Target Feeds
- **Input Sources**: Claims_Volume_Extract_Demo.xlsx, Policy_Master_Demo.xlsx, Claims_Master.xlsx
- **Output Targets**: Claims_Historical_Extract_Demo_Output.xlsx, Integrated_Insurance_Cube.yxdb
