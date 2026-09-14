# Technical Specification: Beneficiary Services Aging Dashboard

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Customer
- **Owner**: Emily Watson
- **Description**: Aging analysis of unresolved beneficiary inquiries and open settlement queues.

## 2. Key Performance Indicators (KPIs)
- **Cases > 30 Days**
- **Cases > 60 Days**
- **Documentation Pending %**
- **Legal Review Escapes**
- **Average Days Open**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 3
- **Key Tables**: beneficiary_cases_fact, workflow_queue_dim, legal_escalations_dim

## 4. Downstream Publishing Targets
- `aging_cases_tableau.hyper`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Customer.
