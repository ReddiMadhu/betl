# Technical Specification: Jornaya Dashboard PBI

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Customer
- **Owner**: Emily Watson
- **Description**: Customer journey touchpoint compliance, lead verification, and consumer intent analysis.

## 2. Key Performance Indicators (KPIs)
- **Lead TCPA Compliance %**
- **Consumer Intent Score**
- **Lead Age at Contact**
- **Shopping Behavior Velocity**
- **Lead Origin Verification Rate**
- **Conversion by Lead Token**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: jornaya_lead_events_fact, tcpa_consent_log, lead_generation_partner_dim, crm_lead_status_dim

## 4. Downstream Publishing Targets
- `Jornaya_Compliance_Analytics.pbix`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Customer.
