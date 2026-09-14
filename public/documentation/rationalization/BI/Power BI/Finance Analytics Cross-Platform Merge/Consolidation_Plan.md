# Rationalization Plan: Finance Analytics Cross-Platform Merge

## 1. Executive Summary
- **Domain**: Business Intelligence (Power BI)
- **Business Area**: Finance
- **Action Type**: Consolidation
- **Calculated Overlap**: **81%**
- **Target Destination**: Insurance Analytics Dashboard (Power BI)

## 2. Impacted Asset Inventory
- **Insurance Analytics Dashboard (Tableau)**
- **Insurance Analytics Dashboard (Power BI)**

## 3. Rationale
Identical financial reporting datasets replicated across both Tableau and Power BI. Standardizing on Power BI eliminates redundant license overhead.

## 4. Execution Roadmap
Retire Tableau version and migrate unique drill-downs to Power BI master financial model.

## 5. KPIs & Data Sources
- **Preserved KPIs**: Combined Ratio, Underwriting Profit, Net Investment Income, Earned Premium, Operating Margin %
- **Underlying Tables**: financial_general_ledger_fact, statutory_financials_fact, budget_allocation_dim
