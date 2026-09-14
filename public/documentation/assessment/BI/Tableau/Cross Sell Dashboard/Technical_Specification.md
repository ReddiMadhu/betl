# Technical Specification: Cross Sell Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Distribution
- **Owner**: Amanda Foster
- **Description**: Policy cross-selling opportunities across commercial, property, and casualty lines.

## 2. Key Performance Indicators (KPIs)
- **Cross-Sell Ratio**
- **Multi-policy Discount Impact**
- **Bundled Renewal Rate**
- **Customer Lifetime Value**
- **Agent Cross-sell Commission**
- **Line of Business Penetration**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: policy_customer_mapping_fact, product_crosssell_matrix, agent_performance_dim

## 4. Downstream Publishing Targets
- `cross_sell_analytics.hyper`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Distribution.
