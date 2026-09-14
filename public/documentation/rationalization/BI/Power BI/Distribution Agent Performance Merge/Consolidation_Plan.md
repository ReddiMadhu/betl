# Rationalization Plan: Distribution Agent Performance Merge

## 1. Executive Summary
- **Domain**: Business Intelligence (Power BI)
- **Business Area**: Distribution
- **Action Type**: Consolidation
- **Calculated Overlap**: **68%**
- **Target Destination**: Bottom 25% Agents

## 2. Impacted Asset Inventory
- **Bottom 25% Agents**
- **New Business (Bottom 25% agents)**

## 3. Rationale
Both Power BI reports analyze lower quartile agent productivity and new bind conversion from the same underlying agent monthly production tables.

## 4. Execution Roadmap
Merge New Business metrics as a dedicated page in Bottom 25% Agents report.

## 5. KPIs & Data Sources
- **Preserved KPIs**: Agent Premium Volume, Policy Bind Rate, Submission Quality Score, Quote-to-Bind Ratio
- **Underlying Tables**: agent_monthly_production_fact, broker_profile_dim, submission_fact
