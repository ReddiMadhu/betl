# Technical Specification: FFQ Test

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Underwriting
- **Owner**: Michael Zhang
- **Description**: Full form quotation rating engine verification and risk scoring model.

## 2. Key Performance Indicators (KPIs)
- **Rating Verification Score**
- **Model Deviation %**
- **Quote Conversion**
- **Pricing Anomaly Count**
- **Rule Engine Latency**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: quote_engine_logs, risk_score_matrix, underwriter_override_fact

## 4. Downstream Publishing Targets
- `FFQ_Validation_Model.pbix`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Underwriting.
