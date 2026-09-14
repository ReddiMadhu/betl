# Technical Specification: Claims - Agent Performance

## 1. Asset Overview
- **Technology**: Tableau
- **Domain**: BI Dashboard / Analytics
- **Business Area**: Claims
- **Owner**: Sarah Mitchell
- **Description**: Agent-level claims resolution performance, cycle times, and operational SLA tracking.

## 2. Key Performance Indicators (KPIs)
- **Cycle Time**
- **Claims Resolved**
- **Adjuster SLA**
- **Open Backlog**
- **Resolution Cost**
- **Reopened %**
- **Escalation Rate**
- **CSAT**

## 3. Data Ingestion & Source Schemas
- **Source Count**: 4
- **Key Tables**: claims_fact, adjuster_dim, sla_metrics_dim, team_hierarchy_dim

## 4. Downstream Publishing Targets
- `claims_agent_summary.hyper`
- `executive_kpi_feed.parquet`

## 5. Assessment Findings & Modernization Strategy
- **Status**: Complete & Verified
- **Consolidation Potential**: Evaluated for overlap with peer dashboards in Claims.
