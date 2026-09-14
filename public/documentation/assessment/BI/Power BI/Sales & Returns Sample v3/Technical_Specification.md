# Technical Specification: Sales & Returns Sample v3

## 1. Asset Overview
- **Technology**: Power BI
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Finance
- **Owner**: Jennifer Adams
- **Description**: Financial reconciliation of premium billing, returned endorsements, and net revenue.

## 2. Key Performance Indicators (KPIs)
- **Gross Written Premium**
- **Returned Endorsement Value**
- **Cancellation Refund %**
- **Net Written Premium**
- **Policy Chargeback Count**
- **Dispute Resolution Rate**
- **Billing Reconciliation Gap**
- **Audit Recovery $**
- **Credit Surcharge %**
- **Commission Recapture**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 6
- **Key Tables**: billing_transactions_fact, endorsement_adjustments_fact, refunds_cancellations_fact, payment_gateway_logs, customer_account_dim, policy_history_dim

## 4. Downstream Publishing Targets
- `Premium_Reconciliation_Master.pbix`
- `Audit_Exceptions.xlsx`
- `GL_Posting_Feed.csv`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Finance.
