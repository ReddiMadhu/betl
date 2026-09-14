# Technical Specification: Cross Sell Dashboard PBIP

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Distribution
- **Owner**: Amanda Foster
- **Description**: Power BI project format cross-sell tracker with customer segmentation slicing.

## 2. Key Performance Indicators (KPIs)
- **Commercial to Personal Ratio**
- **Property + Umbrella Rate**
- **Cross-Sell Penetration %**
- **Customer Segment Retention**
- **Avg Premium Per Multi-Holder**
- **Campaign Response %**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: customer_policy_matrix_fact, segmentation_profile_dim, marketing_touchpoint_dim

## 4. Downstream Publishing Targets
- `CrossSell_PBIP_Dataset.pbip`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Distribution.
