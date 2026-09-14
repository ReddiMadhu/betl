# Rationalization Plan: Beneficiary Services Consolidation

## 1. Executive Summary
- **Domain**: Business Intelligence (Tableau)
- **Business Area**: Customer
- **Action Type**: Consolidation
- **Calculated Overlap**: **65%**
- **Target Destination**: Beneficiary Services v1

## 2. Impacted Asset Inventory
- **Beneficiary Services v1**
- **Beneficiary Services Aging Dashboard**

## 3. Rationale
Aging metrics and payout indicators can be displayed on a unified operational tab, removing redundant database queries.

## 4. Execution Roadmap
Merge Aging Dashboard views into a sub-tab of Beneficiary Services v1.

## 5. KPIs & Data Sources
- **Preserved KPIs**: Beneficiary Payout Velocity, Inquiry Volume, Cases > 30 Days, Cases > 60 Days
- **Underlying Tables**: beneficiary_cases_fact, contact_center_logs, workflow_queue_dim
