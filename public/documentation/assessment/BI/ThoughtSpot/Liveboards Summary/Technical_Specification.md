# Technical Specification: Liveboards Summary

## 1. Asset Overview
- **Technology**: ThoughtSpot
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims & Distribution
- **Owner**: Modernization CoE
- **Description**: AI-powered Search and Liveboard analytics across consolidated insurance data models.

## 2. Key Performance Indicators (KPIs)
- **Real-time Claims Intake**
- **Instant Loss Severity**
- **Natural Language Query Count**
- **Search-to-Answer Latency**
- **Executive Liveboard Views**
- **Automated Anomaly Alerts**
- **Underwriter Self-service Queries**
- **Broker Production Velocity**
- **Customer Sentiment Score**
- **Fraud Risk Probability**
- **Daily Active Explorers**
- **Top Searched Insurance Terms**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 6
- **Key Tables**: snowflake_curated_claims_view, snowflake_curated_policy_view, snowflake_customer_360, agent_production_stream, fraud_detection_ml_scores, market_benchmark_dim

## 4. Downstream Publishing Targets
- `Enterprise_Executive_Liveboard.tsl`
- `ThoughtSpot_TML_Package.zip`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims & Distribution.
