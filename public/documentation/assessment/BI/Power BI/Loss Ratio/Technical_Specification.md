# Technical Specification: Loss Ratio

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Michael Zhang
- **Description**: Incurred losses compared against earned premiums with quarterly trend modeling.

## 2. Key Performance Indicators (KPIs)
- **Earned Premium**
- **Incurred Losses**
- **Loss Ratio %**
- **Expense Ratio %**
- **Combined Ratio %**
- **Quarterly Trend Variance**
- **IBNR Reserve %**
- **Catastrophe Loss %**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: claims_loss_data, earned_premium_fact, actuarial_reserves_dim, calendar_hierarchy_dim

## 4. Downstream Publishing Targets
- `PowerBI_Loss_Ratio_Dataset.pbix`
- `Finance_Loss_Ratio_Feed.csv`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
