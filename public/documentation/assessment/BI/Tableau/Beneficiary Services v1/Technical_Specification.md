# Technical Specification: Beneficiary Services v1

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Customer
- **Owner**: Emily Watson
- **Description**: Beneficiary claims processing and customer payout satisfaction indicators.

## 2. Key Performance Indicators (KPIs)
- **Beneficiary Payout Velocity**
- **First Contact Resolution**
- **Inquiry Volume**
- **Customer Satisfaction (CSAT)**
- **Net Promoter Score (NPS)**
- **Document Verification TAT**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: beneficiary_cases_fact, contact_center_logs, customer_survey_fact, payment_disbursement_fact

## 4. Downstream Publishing Targets
- `beneficiary_kpis.hyper`
- `customer_care_audit.xlsx`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Customer.
