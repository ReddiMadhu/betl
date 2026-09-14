# Technical Specification: IT Spend Analysis Sample

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Finance
- **Owner**: Mark Sullivan
- **Description**: Departmental IT operational expenditure, vendor allocation, and budget variance tracking.

## 2. Key Performance Indicators (KPIs)
- **Total IT Capex**
- **Total IT Opex**
- **Cloud Infrastructure Spend**
- **Software License Cost per User**
- **Vendor Concentration %**
- **Budget vs Actual %**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: it_expense_fact, vendor_contract_dim, it_cost_center_dim, asset_depreciation_dim

## 4. Downstream Publishing Targets
- `IT_Spend_Management.pbix`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Finance.
