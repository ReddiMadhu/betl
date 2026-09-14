# Rationalization Plan: P&C Legacy Migration & Retirement

## 1. Executive Summary
- **Domain**: Business Intelligence (MicroStrategy)
- **Business Area**: Claims
- **Action Type**: Decommission & Migration
- **Calculated Overlap**: **85%**
- **Target Destination**: Snowflake + ThoughtSpot Liveboard

## 2. Impacted Asset Inventory
- **P&C Claims Dashboard v3**
- **Claims Cube**

## 3. Rationale
Legacy MicroStrategy dossiers incur heavy server infrastructure costs. Core dimensions are fully covered by modern Snowflake data models.

## 4. Execution Roadmap
Migrate active user cohorts to ThoughtSpot Liveboards and decommission MicroStrategy intelligence servers.

## 5. KPIs & Data Sources
- **Preserved KPIs**: Incurred Loss, Case Reserves, Paid Indemnity, Subrogation Recovery
- **Underlying Tables**: mstr_pc_claims_fact, mstr_loss_reserves_fact
