# ETL Rationalization Plan: Legacy Alteryx Workflows Retirement

## 1. Pipeline Overview
- **Domain**: ETL Engineering (Alteryx)
- **Business Area**: Claims
- **Action Type**: Decommission
- **Calculated Overlap**: **88%**
- **Target Architecture**: Decommission

## 2. Impacted Workflows
- **Claims_Extract_Volume_v2**
- **Workflow_01**

## 3. Engineering Rationale
Superceded by automated Python pipelines and updated Claims_Extract_Volume v1 workflow.

## 4. Migration & Consolidation Roadmap
De-schedule Alteryx Server jobs and archive workflow yxmd definitions.

## 5. Data Inputs & Target Feeds
- **Input Sources**: Raw_Claims_Feed.csv, Claims_Volume_Historical.xlsx
- **Output Targets**: Litigation_Risk_Categorization.yxdb
