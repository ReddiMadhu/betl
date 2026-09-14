# Rationalization Plan: Claims Performance & Executive Consolidation

## 1. Executive Summary
- **Domain**: Business Intelligence (Tableau)
- **Business Area**: Claims
- **Action Type**: Consolidation
- **Calculated Overlap**: **72%**
- **Target Destination**: Claims - Executive Summary

## 2. Impacted Asset Inventory
- **Claims - Agent Performance**
- **Claims - Executive Summary**

## 3. Rationale
Both Tableau dashboards evaluate claims throughput, resolution turnaround times, and loss frequency from identical claims fact tables. Consolidating reduces visual fragmentation.

## 4. Execution Roadmap
Consolidate into Claims - Executive Summary. Port individual agent drill-through views.

## 5. KPIs & Data Sources
- **Preserved KPIs**: Incurred Claims, Paid Losses, Pending Reserves, Cycle Time, Loss Ratio, Adjuster SLA
- **Underlying Tables**: claims_fact, claims_loss_data, adjuster_dim
