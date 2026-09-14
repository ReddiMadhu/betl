# Technical Specification: Healthcare Claim Analysis Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Rachel Torres
- **Description**: Healthcare provider claims, medical billing breakdown, and diagnostic code metrics.

## 2. Key Performance Indicators (KPIs)
- **Medical Billed Amount**
- **Allowed vs Paid**
- **Diagnosis Group Severity**
- **Out-of-network %**
- **Pharmacy Spend**
- **Provider Utilization**
- **Denial Rate**
- **Appeal Success Rate**
- **Copay Collection**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 5
- **Key Tables**: medical_claims_fact, icd10_diagnosis_dim, provider_network_dim, pharmacy_rx_fact, billing_adjustments_fact

## 4. Downstream Publishing Targets
- `healthcare_analytics.hyper`
- `provider_scorecard.csv`
- `actuarial_sample.parquet`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
