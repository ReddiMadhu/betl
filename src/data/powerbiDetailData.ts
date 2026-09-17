/* ─────────────────────────────────────────────────────────
 * Power BI Detail Data — per-asset extracted report & semantic model metadata
 * ───────────────────────────────────────────────────────── */

export interface PageDetail {
  id: string;
  name: string;
  visualType: string;
  dimensions: string[];
  measures: { name: string; type: 'explicit' | 'implicit' }[];
  visualSlots: {
    values: string;
    axes: string;
  };
}

export interface DAXMeasureDetail {
  id: string;
  name: string;
  expression: string;
  homeTable: string;
  formatString?: string;
  usedInPages: string[];
}

export interface SemanticTableDetail {
  tableName: string;
  displayName: string;
  rowCount: number;
  source: string;
  relationships: string[];
  columns: { name: string; type: string }[];
  sampleRows: Record<string, string | number | boolean>[];
}

export interface PowerBIKpiDetail {
  id: string;
  name: string;
  evidence: string;
  logic?: string | null;
  definition?: string | null;
  confidence?: string | null;
  page?: string | null;
  category?: string | null;
  source?: string | null;
}

export interface PowerBIDetailData {
  summary: {
    totalPages: number;
    totalVisuals: number;
    totalTables: number;
    totalDAXMeasures: number;
    totalKpis?: number;
  };
  kpis: PowerBIKpiDetail[];
  pages: PageDetail[];
  daxMeasures: DAXMeasureDetail[];
  tables: SemanticTableDetail[];
}

export const POWERBI_DETAIL_DATA: Record<string, PowerBIDetailData> = {
  "u3": {
    "summary": {
      "totalPages": 6,
      "totalVisuals": 125,
      "totalTables": 31,
      "totalDAXMeasures": 139,
      "totalKpis": 34
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the '13/1 Survival Rate' worksheet and calculated fields related to survival rate.",
            "evidence": "Page 1 \u2022 Derived from the '13/1 Survival Rate' worksheet and calculated fields related to survival rate.",
            "logic": "Survival rate is calculated as the ratio of retained policies (LAG13) to the cohort size.",
            "definition": "The percentage of policies or agents retained over a specific period, broken down by agent.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "New Business Counts by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'NB Counts' worksheet and related calculated fields.",
            "evidence": "Page 1 \u2022 Derived from the 'NB Counts' worksheet and related calculated fields.",
            "logic": "Count of new business policies or applications processed by each agent.",
            "definition": "The total number of new policies or applications processed, segmented by agent.",
            "confidence": "90%"
      },
      {
            "id": "kpi_3",
            "name": "Bottom Quartile Agents by Survival Rate",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'Bottom 25% Agents' worksheet and survival rate quartile calculations.",
            "evidence": "Page 1 \u2022 Derived from the 'Bottom 25% Agents' worksheet and survival rate quartile calculations.",
            "logic": "Agents in the bottom 25% based on survival rate performance.",
            "definition": "The list of agents whose survival rate performance falls in the bottom quartile.",
            "confidence": "85%"
      },
      {
            "id": "kpi_4",
            "name": "Conversion Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data in the 'AOR + Agent' worksheet.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data in the 'AOR + Agent' worksheet.",
            "logic": "Conversion rate is calculated as the ratio of new business counts to quote counts.",
            "definition": "The percentage of quotes converted into new business policies, segmented by agent.",
            "confidence": "88%"
      },
      {
            "id": "kpi_5",
            "name": "Survival Rate Variance to Bottom Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields related to survival rate variance.",
            "evidence": "Page 1 \u2022 Derived from calculated fields related to survival rate variance.",
            "logic": "Difference between an agent's survival rate and the average survival rate of the bottom quartile.",
            "definition": "The variance in survival rate for an agent compared to the bottom quartile average.",
            "confidence": "80%"
      },
      {
            "id": "kpi_6",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the '13/1 Survival Rate' worksheet, which focuses on survival rate metrics for agents in the bottom quartile.",
            "evidence": "Page 1 \u2022 Derived from the '13/1 Survival Rate' worksheet, which focuses on survival rate metrics for agents in the bottom quartile.",
            "logic": "Calculated as the ratio of policies still active after 13 months to the total cohort of policies.",
            "definition": "The percentage of policies associated with an agent that remain active after 13 months.",
            "confidence": "95%"
      },
      {
            "id": "kpi_7",
            "name": "New Business Counts by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the 'NB Counts' worksheet, which tracks new business counts at the agent level.",
            "evidence": "Page 1 \u2022 Extracted from the 'NB Counts' worksheet, which tracks new business counts at the agent level.",
            "logic": "Count of new business policies attributed to each agent.",
            "definition": "The total number of new business policies generated by an agent.",
            "confidence": "90%"
      },
      {
            "id": "kpi_8",
            "name": "R12 Loss Ratio Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Sourced from the 'R12_Loss_Ratio_Score' worksheet, which evaluates rolling 12-month loss ratio scores for agents.",
            "evidence": "Page 1 \u2022 Sourced from the 'R12_Loss_Ratio_Score' worksheet, which evaluates rolling 12-month loss ratio scores for agents.",
            "logic": "Rolling 12-month loss ratio calculated as total claims divided by total premiums for each agent.",
            "definition": "A measure of an agent's loss ratio over the past 12 months, indicating the profitability of their portfolio.",
            "confidence": "92%"
      },
      {
            "id": "kpi_9",
            "name": "Overall Performance Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'R12_OVERALL_SCORE' worksheet, which provides a composite performance score for agents.",
            "evidence": "Page 1 \u2022 Derived from the 'R12_OVERALL_SCORE' worksheet, which provides a composite performance score for agents.",
            "logic": "Composite score based on multiple metrics, including survival rate, new business counts, and loss ratio.",
            "definition": "A comprehensive score reflecting an agent's overall performance across key business metrics.",
            "confidence": "88%"
      },
      {
            "id": "kpi_10",
            "name": "Survival Rate Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'Survival Rate Quartile' field in the datasource, used to categorize agents into quartiles based on survival rate.",
            "evidence": "Page 1 \u2022 Derived from the 'Survival Rate Quartile' field in the datasource, used to categorize agents into quartiles based on survival rate.",
            "logic": "Agents are ranked by survival rate and divided into quartiles.",
            "definition": "The quartile ranking of an agent based on their survival rate performance.",
            "confidence": "85%"
      },
      {
            "id": "kpi_11",
            "name": "R12 Loss Ratio Score",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the 'R12_Loss_Ratio_Score' worksheet.",
            "evidence": "Page 1 \u2022 Extracted from the 'R12_Loss_Ratio_Score' worksheet.",
            "logic": "Rolling 12-month loss ratio calculated as claims paid divided by premiums earned.",
            "definition": "The rolling 12-month loss ratio measures the proportion of claims paid relative to premiums earned over the past 12 months.",
            "confidence": "95%"
      },
      {
            "id": "kpi_12",
            "name": "Survival Rate",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the '13/1 Survival Rate' worksheet.",
            "evidence": "Page 1 \u2022 Extracted from the '13/1 Survival Rate' worksheet.",
            "logic": "Calculated as the ratio of active agents or policies at the end of a period to those at the beginning.",
            "definition": "The survival rate indicates the retention of agents or policies over a specific period.",
            "confidence": "90%"
      },
      {
            "id": "kpi_13",
            "name": "Survival Rate by Quartile",
            "page": "Page 1",
            "category": null,
            "source": "Derived from survival rate quartile rankings in the data source.",
            "evidence": "Page 1 \u2022 Derived from survival rate quartile rankings in the data source.",
            "logic": "Survival rate segmented into quartiles based on agent performance.",
            "definition": "The survival rate broken down by quartile highlights performance distribution among agents.",
            "confidence": "85%"
      },
      {
            "id": "kpi_14",
            "name": "Bottom 25% Agents by Survival Rate",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the 'Bottom 25% Agents' worksheet.",
            "evidence": "Page 1 \u2022 Extracted from the 'Bottom 25% Agents' worksheet.",
            "logic": "Agents ranked in the bottom quartile based on survival rate.",
            "definition": "Identifies agents in the bottom 25% for survival rate to target for improvement.",
            "confidence": "90%"
      },
      {
            "id": "kpi_15",
            "name": "R12 Loss Ratio Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the 'AOR + Agent' and 'R12_OVERALL_SCORE' worksheets.",
            "evidence": "Page 1 \u2022 Extracted from the 'AOR + Agent' and 'R12_OVERALL_SCORE' worksheets.",
            "logic": "Rolling 12-month loss ratio calculated for each agent.",
            "definition": "The rolling 12-month loss ratio score broken down by individual agents.",
            "confidence": "95%"
      },
      {
            "id": "kpi_16",
            "name": "Conversion Rate",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the calculated field 'Conversion Rate m'.",
            "evidence": "Page 1 \u2022 Derived from the calculated field 'Conversion Rate m'.",
            "logic": "Calculated as the ratio of new business counts to quote counts.",
            "definition": "The conversion rate measures the effectiveness of converting quotes into new business.",
            "confidence": "85%"
      },
      {
            "id": "kpi_17",
            "name": "Conversion Rate by Quartile",
            "page": "Page 1",
            "category": null,
            "source": "Derived from conversion rate quartile rankings in the data source.",
            "evidence": "Page 1 \u2022 Derived from conversion rate quartile rankings in the data source.",
            "logic": "Conversion rate segmented into quartiles based on agent performance.",
            "definition": "The conversion rate broken down by quartile highlights performance distribution among agents.",
            "confidence": "80%"
      },
      {
            "id": "kpi_18",
            "name": "Net Active Primary Agent Count",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the data source.",
            "evidence": "Page 1 \u2022 Extracted from the data source.",
            "logic": "Count of active primary agents during the reporting period.",
            "definition": "The total number of active primary agents within the reporting period.",
            "confidence": "85%"
      },
      {
            "id": "kpi_19",
            "name": "Import Assigned-Rate",
            "page": "Page 1",
            "category": null,
            "source": "Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "evidence": "Page 1 \u2022 Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "logic": "Sum of imports divided by sum of assignments.",
            "definition": "The rate at which imports are assigned relative to total assignments.",
            "confidence": "95%"
      },
      {
            "id": "kpi_20",
            "name": "Daily Assigned Import Rate by CY",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year.",
            "confidence": "90%"
      },
      {
            "id": "kpi_21",
            "name": "Import Assigned-Rate by Imported datetime adjusted",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "logic": "Sum of imports divided by sum of assignments over time.",
            "definition": "Analyzes the import assignment rate over time.",
            "confidence": "90%"
      },
      {
            "id": "kpi_22",
            "name": "Daily Assigned Import Rate by CY by State",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'State' using custom visual.",
            "evidence": "Page 1 \u2022 Worksheet 'State' using custom visual.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year, broken down by state.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year, segmented by state.",
            "confidence": "85%"
      },
      {
            "id": "kpi_23",
            "name": "Allocated_IND by bind",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Allocated_IND by bind' using area chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Allocated_IND by bind' using area chart.",
            "logic": "Distribution of allocated indicators by binding status.",
            "definition": "Shows the distribution of allocations based on whether they are bound or not.",
            "confidence": "80%"
      },
      {
            "id": "kpi_24",
            "name": "Import Assigned-Rate",
            "page": "Page 1",
            "category": null,
            "source": "Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "evidence": "Page 1 \u2022 Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "logic": "Sum of imports divided by sum of assignments.",
            "definition": "The rate at which imports are assigned relative to total assignments.",
            "confidence": "95%"
      },
      {
            "id": "kpi_25",
            "name": "Daily Assigned Import Rate by CY",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year.",
            "confidence": "90%"
      },
      {
            "id": "kpi_26",
            "name": "Import Assigned-Rate by Imported datetime adjusted",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "logic": "Sum of imports divided by sum of assignments over time.",
            "definition": "Analyzes the import assignment rate over time.",
            "confidence": "90%"
      },
      {
            "id": "kpi_27",
            "name": "Daily Assigned Import Rate by CY by State",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'State' using custom visual.",
            "evidence": "Page 1 \u2022 Worksheet 'State' using custom visual.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year, broken down by state.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year, segmented by state.",
            "confidence": "85%"
      },
      {
            "id": "kpi_28",
            "name": "Allocated_IND by bind",
            "page": "Page 1",
            "category": null,
            "source": "Worksheet 'Allocated_IND by bind' using area chart.",
            "evidence": "Page 1 \u2022 Worksheet 'Allocated_IND by bind' using area chart.",
            "logic": "Distribution of allocated indicators by binding status.",
            "definition": "Shows the distribution of allocations based on whether they are bound or not.",
            "confidence": "80%"
      },
      {
            "id": "kpi_29",
            "name": "New Business Counts by AOR and Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'AOR + Agent, NB Counts' worksheet.",
            "evidence": "Page 1 \u2022 Derived from the 'AOR + Agent, NB Counts' worksheet.",
            "logic": "Count of new business policies attributed to each AOR and agent.",
            "definition": "The total number of new business policies generated by each agent under a specific Agent of Record (AOR).",
            "confidence": "95%"
      },
      {
            "id": "kpi_30",
            "name": "R12 Overall Score by AOR and Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'AOR + Agent, R12_OVERALL_SCORE' worksheet.",
            "evidence": "Page 1 \u2022 Derived from the 'AOR + Agent, R12_OVERALL_SCORE' worksheet.",
            "logic": "Rolling 12-month performance score calculated for each agent under a specific AOR.",
            "definition": "A performance metric that evaluates the overall effectiveness of agents over the past 12 months.",
            "confidence": "90%"
      },
      {
            "id": "kpi_31",
            "name": "Conversion Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Ratio of new business counts to quote counts for each agent.",
            "definition": "The percentage of quotes converted into new business policies by each agent.",
            "confidence": "85%"
      },
      {
            "id": "kpi_32",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Ratio of agents retained in the bottom quartile to the total cohort size.",
            "definition": "The retention rate of agents in the bottom quartile over a specific period.",
            "confidence": "85%"
      },
      {
            "id": "kpi_33",
            "name": "R12 Loss Ratio Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Rolling 12-month loss ratio score for each agent.",
            "definition": "A metric that evaluates the loss ratio performance of agents over the past 12 months.",
            "confidence": "90%"
      },
      {
            "id": "kpi_34",
            "name": "R12 Loss Ratio Score Variance to Bottom Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Difference between an agent's R12 Loss Ratio Score and the average score of the bottom quartile.",
            "definition": "The variance in loss ratio performance of an agent compared to the average performance of agents in the bottom quartile. 139 DAX Measures: Tabs 6 Filtered tabs KPIs 34 AI Extracted KPIs Visuals 125",
            "confidence": "85%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Page 1",
        "visualType": "cardVisual",
        "dimensions": [
          "AOR + Agent",
          "District",
          "Agency state",
          "Reporting Period",
          "Line of Business"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "5 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "SRate",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "lag13m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "cohortm",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "sr quart",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "Conversion Rate m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_7",
        "name": "nb count m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_8",
        "name": "quote ind m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_9",
        "name": "AOR + Agent m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_10",
        "name": "AOR + Agent m2",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_11",
        "name": "AOR + Agent m3",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_12",
        "name": "SRate",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_13",
        "name": "lag13m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_14",
        "name": "cohortm",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_15",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_16",
        "name": "sr quart",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_17",
        "name": "Conversion Rate m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_18",
        "name": "nb count m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_19",
        "name": "quote ind m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_20",
        "name": "AOR + Agent m",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_21",
        "name": "AOR + Agent m2",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_22",
        "name": "AOR + Agent m3",
        "homeTable": "Bottom 25% Agents (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_23",
        "name": "SRate",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_24",
        "name": "lag13m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_25",
        "name": "cohortm",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_26",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_27",
        "name": "sr quart",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_28",
        "name": "Conversion Rate m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_29",
        "name": "nb count m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_30",
        "name": "quote ind m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_31",
        "name": "AOR + Agent m",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_32",
        "name": "AOR + Agent m2",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_33",
        "name": "AOR + Agent m3",
        "homeTable": "Loss Ratio (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_34",
        "name": "Import Assigned-Rate",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR(DIVIDE(SUM(Sheet1.Import),SUM(Sheet1.Assigned)),\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_35",
        "name": "Imported Count by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "CALCULATE(SUM(Sheet1.Import),USERELATIONSHIP(Sheet1.Imported datetime adjusted,Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_36",
        "name": "Assigned Count by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "CALCULATE(SUM(Sheet1.Assigned),USERELATIONSHIP(Sheet1.Imported datetime adjusted,Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_37",
        "name": "Daily Assigned Import Rate by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR([Imported Count by CY]/[Assigned Count by CY],\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_38",
        "name": "Import Rate-Assigned",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR(DIVIDE(SUM(Sheet1.Import),SUM(Sheet1.Assigned)),\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_39",
        "name": "Bind Rate",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "SUM(Sheet1.bind)/COUNT(Sheet1.Quote_Number_Final)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_40",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_41",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_42",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_43",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_44",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_45",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_46",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_47",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_48",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_49",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_50",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_51",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_52",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_53",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_54",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_55",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_56",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_57",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_58",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_59",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_60",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_61",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_62",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_63",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_64",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_65",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_66",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_67",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_68",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_69",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_70",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_71",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_72",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_73",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_74",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_75",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_76",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_77",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_78",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_79",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_80",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_81",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_82",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_83",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_84",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_85",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_86",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_87",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_88",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_89",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_90",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_91",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_92",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_93",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_94",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_95",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_96",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_97",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_98",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_99",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_100",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_101",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_102",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_103",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_104",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_105",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_106",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_107",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_108",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_109",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_110",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_111",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_112",
        "name": "MTD1",
        "homeTable": "Test (Embedded Model)",
        "expression": "SUM(Sheet1.MTD NB Counts)+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_113",
        "name": "MTD Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.MTD NB Counts),SUM(Sheet1.MTD Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_114",
        "name": "YTD Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.YTD NB Counts),SUM(Sheet1.YTD Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_115",
        "name": "Rolling Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.Rolling NB Counts),SUM(Sheet1.Rolling Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_116",
        "name": "DM Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.DM NB Counts),SUM(Sheet1.DM Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_117",
        "name": "Year",
        "homeTable": "Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_118",
        "name": "MonthNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_119",
        "name": "Month",
        "homeTable": "Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_120",
        "name": "QuarterNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_121",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_122",
        "name": "Day",
        "homeTable": "Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_123",
        "name": "Year",
        "homeTable": "Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_124",
        "name": "MonthNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_125",
        "name": "Month",
        "homeTable": "Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_126",
        "name": "QuarterNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_127",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_128",
        "name": "Day",
        "homeTable": "Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_129",
        "name": "SRate",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_130",
        "name": "lag13m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_131",
        "name": "cohortm",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_132",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_133",
        "name": "sr quart",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_134",
        "name": "Conversion Rate m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_135",
        "name": "nb count m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_136",
        "name": "quote ind m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_137",
        "name": "AOR + Agent m",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_138",
        "name": "AOR + Agent m2",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_139",
        "name": "AOR + Agent m3",
        "homeTable": "New Business (Bottom 25% agents) (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "PBI Data (2)",
        "displayName": "PBI Data (2) (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Loss Ratio.pbix)",
        "relationships": [
          "PBI Data (2) -> Model Context"
        ],
        "columns": [
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC"
          },
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Line of Business": "Commercial Auto",
            "Agency state": "TX",
            "AOR + Agent": "AOR-201 Robert Miller",
            "Reporting Period": "2023-Q4"
          },
          {
            "Line of Business": "Property",
            "Agency state": "FL",
            "AOR + Agent": "AOR-205 Lisa Anderson",
            "Reporting Period": "2023-Q4"
          },
          {
            "Line of Business": "General Liability",
            "Agency state": "CA",
            "AOR + Agent": "AOR-212 Kevin Patel",
            "Reporting Period": "2023-Q4"
          }
        ]
      },
      {
        "tableName": "PBI Data (3)",
        "displayName": "PBI Data (3) (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Loss Ratio.pbix)",
        "relationships": [
          "PBI Data (3) -> Model Context"
        ],
        "columns": [
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC"
          },
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Line of Business": "Commercial Auto",
            "Agency state": "TX",
            "AOR + Agent": "AOR-201 Robert Miller",
            "Reporting Period": "2023-Q4"
          },
          {
            "Line of Business": "Property",
            "Agency state": "FL",
            "AOR + Agent": "AOR-205 Lisa Anderson",
            "Reporting Period": "2023-Q4"
          },
          {
            "Line of Business": "General Liability",
            "Agency state": "CA",
            "AOR + Agent": "AOR-212 Kevin Patel",
            "Reporting Period": "2023-Q4"
          }
        ]
      },
      {
        "tableName": "PBI Data",
        "displayName": "PBI Data (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (Loss Ratio.pbix)",
        "relationships": [
          "PBI Data -> Model Context"
        ],
        "columns": [
          {
            "name": "District",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "District": "District 1 - North",
            "Agent": "AOR-201 Robert Miller"
          },
          {
            "District": "District 2 - South",
            "Agent": "AOR-205 Lisa Anderson"
          },
          {
            "District": "District 3 - West",
            "Agent": "AOR-212 Kevin Patel"
          }
        ]
      }
    ]
  },
  "u6": {
    "summary": {
      "totalPages": 2,
      "totalVisuals": 27,
      "totalTables": 19,
      "totalDAXMeasures": 95,
      "totalKpis": 10
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Import Assigned-Rate",
            "page": "Page 2",
            "category": null,
            "source": "Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "evidence": "Page 2 \u2022 Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "logic": "Sum of imports divided by sum of assignments.",
            "definition": "The rate at which imports are assigned relative to total assignments.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "Daily Assigned Import Rate by CY",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year.",
            "confidence": "90%"
      },
      {
            "id": "kpi_3",
            "name": "Import Assigned-Rate by Imported datetime adjusted",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "logic": "Sum of imports divided by sum of assignments over time.",
            "definition": "Analyzes the import assignment rate over time.",
            "confidence": "90%"
      },
      {
            "id": "kpi_4",
            "name": "Daily Assigned Import Rate by CY by State",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'State' using custom visual.",
            "evidence": "Page 2 \u2022 Worksheet 'State' using custom visual.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year, broken down by state.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year, segmented by state.",
            "confidence": "85%"
      },
      {
            "id": "kpi_5",
            "name": "Allocated_IND by bind",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Allocated_IND by bind' using area chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Allocated_IND by bind' using area chart.",
            "logic": "Distribution of allocated indicators by binding status.",
            "definition": "Shows the distribution of allocations based on whether they are bound or not.",
            "confidence": "80%"
      },
      {
            "id": "kpi_6",
            "name": "Import Assigned-Rate",
            "page": "Page 2",
            "category": null,
            "source": "Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "evidence": "Page 2 \u2022 Unnamed worksheet using 'Import Assigned-Rate' metric.",
            "logic": "Sum of imports divided by sum of assignments.",
            "definition": "The rate at which imports are assigned relative to total assignments.",
            "confidence": "95%"
      },
      {
            "id": "kpi_7",
            "name": "Daily Assigned Import Rate by CY",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Daily Assigned Import Rate by CY by Imported datetime adjusted' using line chart.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year.",
            "confidence": "90%"
      },
      {
            "id": "kpi_8",
            "name": "Import Assigned-Rate by Imported datetime adjusted",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Import Assigned-Rate by Imported datetime adjusted' using line chart.",
            "logic": "Sum of imports divided by sum of assignments over time.",
            "definition": "Analyzes the import assignment rate over time.",
            "confidence": "90%"
      },
      {
            "id": "kpi_9",
            "name": "Daily Assigned Import Rate by CY by State",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'State' using custom visual.",
            "evidence": "Page 2 \u2022 Worksheet 'State' using custom visual.",
            "logic": "Daily import rate calculated as imported count divided by assigned count for the calendar year, broken down by state.",
            "definition": "Tracks the daily rate of imports assigned for the calendar year, segmented by state.",
            "confidence": "85%"
      },
      {
            "id": "kpi_10",
            "name": "Allocated_IND by bind",
            "page": "Page 2",
            "category": null,
            "source": "Worksheet 'Allocated_IND by bind' using area chart.",
            "evidence": "Page 2 \u2022 Worksheet 'Allocated_IND by bind' using area chart.",
            "logic": "Distribution of allocated indicators by binding status.",
            "definition": "Shows the distribution of allocations based on whether they are bound or not. Tabs 2 Filtered tabs KPIs 10 AI Extracted KPIs Visuals 27",
            "confidence": "80%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Page 1",
        "visualType": "slicer",
        "dimensions": [
          "Daily Assigned Import Rate by CY",
          "Import Assigned-Rate",
          "Imported datetime adjusted",
          "State"
        ],
        "measures": [
          {
            "name": "Imported datetime adjusted",
            "type": "explicit"
          },
          {
            "name": "State",
            "type": "explicit"
          },
          {
            "name": "LOB",
            "type": "explicit"
          },
          {
            "name": "Daily Assigned Import Rate by CY",
            "type": "explicit"
          },
          {
            "name": "Import Assigned-Rate",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "Page 1 Primary Metric Grid",
          "axes": "Page 1 Categorical Breakdown"
        }
      },
      {
        "id": "pg_2",
        "name": "Page 2",
        "visualType": "areaChart",
        "dimensions": [
          "Allocated_IND)",
          "bind"
        ],
        "measures": [
          {
            "name": "Total Premium",
            "type": "explicit"
          },
          {
            "name": "Policies Bound",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "Page 2 Primary Metric Grid",
          "axes": "Page 2 Categorical Breakdown"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Import Assigned-Rate",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR(DIVIDE(SUM(Sheet1.Import),SUM(Sheet1.Assigned)),\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "Imported Count by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "CALCULATE(SUM(Sheet1.Import),USERELATIONSHIP(Sheet1.Imported datetime adjusted,Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "Assigned Count by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "CALCULATE(SUM(Sheet1.Assigned),USERELATIONSHIP(Sheet1.Imported datetime adjusted,Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Daily Assigned Import Rate by CY",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR([Imported Count by CY]/[Assigned Count by CY],\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "Import Rate-Assigned",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "IFERROR(DIVIDE(SUM(Sheet1.Import),SUM(Sheet1.Assigned)),\"\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "Bind Rate",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "SUM(Sheet1.bind)/COUNT(Sheet1.Quote_Number_Final)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_7",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_8",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_9",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_10",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_11",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_12",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_13",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_14",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_15",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_16",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_17",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_18",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_19",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_20",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_21",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_22",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_23",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_24",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_25",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_26",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_27",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_28",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_29",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_30",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_31",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_32",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_33",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_34",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_35",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_36",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_37",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_38",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_39",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_40",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_41",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_42",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_43",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_44",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_45",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_46",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_47",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_48",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_49",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_50",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_51",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_52",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_53",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_54",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_55",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_56",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_57",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_58",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_59",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_60",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_61",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_62",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_63",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_64",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_65",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_66",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_67",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_68",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_69",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_70",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_71",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_72",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_73",
        "name": "Year",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_74",
        "name": "MonthNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_75",
        "name": "Month",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_76",
        "name": "QuarterNo",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_77",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "FFQ_Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_78",
        "name": "Day",
        "homeTable": "FFQ_Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_79",
        "name": "MTD1",
        "homeTable": "Test (Embedded Model)",
        "expression": "SUM(Sheet1.MTD NB Counts)+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_80",
        "name": "MTD Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.MTD NB Counts),SUM(Sheet1.MTD Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_81",
        "name": "YTD Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.YTD NB Counts),SUM(Sheet1.YTD Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_82",
        "name": "Rolling Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.Rolling NB Counts),SUM(Sheet1.Rolling Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_83",
        "name": "DM Conversion Rate1",
        "homeTable": "Test (Embedded Model)",
        "expression": "DIVIDE(SUM(Sheet1.DM NB Counts),SUM(Sheet1.DM Quote Counts),BLANK())+0",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_84",
        "name": "Year",
        "homeTable": "Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_85",
        "name": "MonthNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_86",
        "name": "Month",
        "homeTable": "Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_87",
        "name": "QuarterNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_88",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_89",
        "name": "Day",
        "homeTable": "Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_90",
        "name": "Year",
        "homeTable": "Test (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_91",
        "name": "MonthNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_92",
        "name": "Month",
        "homeTable": "Test (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_93",
        "name": "QuarterNo",
        "homeTable": "Test (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_94",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Test (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_95",
        "name": "Day",
        "homeTable": "Test (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "Sheet1",
        "displayName": "Sheet1",
        "rowCount": 1250,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "Daily Assigned Import Rate by CY",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Import Assigned-Rate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Imported datetime adjusted",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "LOB",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "State",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "bind",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Daily Assigned Import Rate by CY": 0.85,
            "Import Assigned-Rate": 0.92,
            "Imported datetime adjusted": 20230901,
            "LOB": 1.0,
            "State": 39.0,
            "bind": 1.0
          },
          {
            "Daily Assigned Import Rate by CY": 0.78,
            "Import Assigned-Rate": 0.88,
            "Imported datetime adjusted": 20230902,
            "LOB": 2.0,
            "State": 42.0,
            "bind": 0.0
          },
          {
            "Daily Assigned Import Rate by CY": 0.91,
            "Import Assigned-Rate": 0.95,
            "Imported datetime adjusted": 20230903,
            "LOB": 1.0,
            "State": 26.0,
            "bind": 1.0
          }
        ]
      },
      {
        "tableName": "Sum(Sheet1",
        "displayName": "Sum(Sheet1",
        "rowCount": 1250,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "Allocated_IND",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Allocated_IND": 100
          },
          {
            "Allocated_IND": 200
          },
          {
            "Allocated_IND": 300
          }
        ]
      }
    ]
  },
  "d3": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 41,
      "totalTables": 6,
      "totalDAXMeasures": 37,
      "totalKpis": 13
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Bind Household Rate by Customer Age Bucket",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY CUSTOMER AGE BUCKET",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY CUSTOMER AGE BUCKET",
            "logic": "Bind_HH_Rate is calculated as the ratio of unique policies to distinct household numbers, broken down by customer age bucket.",
            "definition": "The percentage of households within each customer age bucket that successfully bind a policy.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "Total Alerts by Customer Age Bucket",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY CUSTOMER AGE BUCKET",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY CUSTOMER AGE BUCKET",
            "logic": "Total Alert is the sum of all alerts, broken down by customer age bucket.",
            "definition": "The total number of alerts generated for each customer age bucket.",
            "confidence": "95%"
      },
      {
            "id": "kpi_3",
            "name": "Bind Household Rate by Customer Segment",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY CUSTOMER SEGMENT",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY CUSTOMER SEGMENT",
            "logic": "Bind_HH_Rate is calculated as the ratio of unique policies to distinct household numbers, broken down by customer segment.",
            "definition": "The percentage of households within each customer segment that successfully bind a policy.",
            "confidence": "95%"
      },
      {
            "id": "kpi_4",
            "name": "Total Alerts by Customer Segment",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY CUSTOMER SEGMENT",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY CUSTOMER SEGMENT",
            "logic": "Total Alert is the sum of all alerts, broken down by customer segment.",
            "definition": "The total number of alerts generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_5",
            "name": "Bind Household Rate by State",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY STATE",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY STATE",
            "logic": "Bind_HH_Rate is calculated as the ratio of unique policies to distinct household numbers, broken down by state.",
            "definition": "The percentage of households within each state that successfully bind a policy.",
            "confidence": "95%"
      },
      {
            "id": "kpi_6",
            "name": "Total Alerts by State",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY STATE",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY STATE",
            "logic": "Total Alert is the sum of all alerts, broken down by state.",
            "definition": "The total number of alerts generated for each state.",
            "confidence": "95%"
      },
      {
            "id": "kpi_7",
            "name": "Bind Household Rate by Territory",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY TERRITORY",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY TERRITORY",
            "logic": "Bind_HH_Rate is calculated as the ratio of unique policies to distinct household numbers, broken down by territory.",
            "definition": "The percentage of households within each territory that successfully bind a policy.",
            "confidence": "95%"
      },
      {
            "id": "kpi_8",
            "name": "Total Alerts by Territory",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS & BIND RATE BY TERRITORY",
            "evidence": "Summary \u2022 Worksheet: ALERTS & BIND RATE BY TERRITORY",
            "logic": "Total Alert is the sum of all alerts, broken down by territory.",
            "definition": "The total number of alerts generated for each territory.",
            "confidence": "95%"
      },
      {
            "id": "kpi_9",
            "name": "Average Alerts by Weekday",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: AVERAGE ALERTS BY WEEKDAYS",
            "evidence": "Summary \u2022 Worksheet: AVERAGE ALERTS BY WEEKDAYS",
            "logic": "Average number of alerts calculated for each weekday.",
            "definition": "The average number of alerts generated on each weekday, providing insights into shopping behavior trends.",
            "confidence": "90%"
      },
      {
            "id": "kpi_10",
            "name": "Bind Household Rate by A/B Test Group",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: LIFE A/B TEST",
            "evidence": "Summary \u2022 Worksheet: LIFE A/B TEST",
            "logic": "Bind_HH_Rate is calculated as the ratio of unique policies to distinct household numbers, broken down by A/B test group.",
            "definition": "The percentage of households within each A/B test group that successfully bind a policy.",
            "confidence": "90%"
      },
      {
            "id": "kpi_11",
            "name": "Total Alerts by Date",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: TOTAL ALERTS BY DATE",
            "evidence": "Summary \u2022 Worksheet: TOTAL ALERTS BY DATE",
            "logic": "Total Alert is the sum of all alerts, broken down by date.",
            "definition": "The total number of alerts generated on each date.",
            "confidence": "85%"
      },
      {
            "id": "kpi_12",
            "name": "Bind Quote Rate",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS",
            "evidence": "Summary \u2022 Worksheet: ALERTS",
            "logic": "Bind_Quote_rate is calculated as the ratio of unique policies to unique quotes.",
            "definition": "The percentage of quotes that successfully result in a policy binding.",
            "confidence": "85%"
      },
      {
            "id": "kpi_13",
            "name": "Unique Life Premium",
            "page": "Summary",
            "category": "Summary",
            "source": "Worksheet: ALERTS",
            "evidence": "Summary \u2022 Worksheet: ALERTS",
            "logic": "Unique Life Premium is the sum of life premiums for unique policies.",
            "definition": "The total premium amount for unique life insurance policies. Tabs 1 Filtered tabs KPIs 13 AI Extracted KPIs Visuals 41",
            "confidence": "85%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Customer",
        "visualType": "tableEx",
        "dimensions": [
          "SHOPPING_ALERT_DATE",
          "PLCY_NUM",
          "Total Alert",
          "Multiple_Email_Indictor",
          "Age Bucket",
          "Customer.EHH_SGMT_VAL"
        ],
        "measures": [
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_Alert_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_Quote_rate",
            "type": "explicit"
          },
          {
            "name": "Ctrl Group Bind HH Rate %",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "6 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      },
      {
        "id": "pg_2",
        "name": "Territory/State",
        "visualType": "tableEx",
        "dimensions": [
          "Territory",
          "SHOPPING_ALERT_DATE",
          "AGENT_STATE",
          "Total Alert",
          "Agency_State",
          "Multiple_Email_Indictor"
        ],
        "measures": [
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_Alert_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_Quote_rate",
            "type": "explicit"
          },
          {
            "name": "Ctrl Group Bind HH Rate %",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "6 measure(s) bound",
          "axes": "7 dimension(s) mapped"
        }
      },
      {
        "id": "pg_3",
        "name": "Summary",
        "visualType": "funnel",
        "dimensions": [
          "Weekday",
          "Territory",
          "Agency_Division",
          "SHOPPING_ALERT_DATE",
          "Agent_AOR",
          "Days to Quote"
        ],
        "measures": [
          {
            "name": "Bind_Quote_rate",
            "type": "explicit"
          },
          {
            "name": "Bind_HH_Rate",
            "type": "explicit"
          },
          {
            "name": "Bind_Alert_Rate",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "3 measure(s) bound",
          "axes": "10 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Bind_Alert_Rate",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DIVIDE(\n    SUM(PBI Data.UNIQUE_POLICY), \n    DISTINCTCOUNT(PBI Data.ALERT_ID)\n)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "Bind_HH_Rate",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DIVIDE(\n    SUM(PBI Data.UNIQUE_POLICY), \n    DISTINCTCOUNT(PBI Data.ENTPRS_HH_NUM)\n    )",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "Bind_Quote_rate",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DIVIDE(\n    SUM(PBI Data.UNIQUE_POLICY), \n    SUM(PBI Data.UNIQUE_QUOTES)\n)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Ctrl Group Bind HH Rate %",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "CALCULATE (\n    [Bind_HH_Rate], \n    PBI Data.AB_TEST_GROUP = \"Holdout\"\n    )",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "Weekday1",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "IF(WEEKDAY(PBI Data.SHOPPING_ALERT_DATE,2)=1, \"Monday\", IF(WEEKDAY(PBI Data.SHOPPING_ALERT_DATE,2)=2,\"Tuesday\", IF(WEEKDAY(PBI Data.SHOPPING_ALERT_DATE,2)=3,\"Wednesday\", IF(WEEKDAY(PBI Data.SHOPPING_ALERT_DATE,2)=4,\"Thursday\", IF(WEEKDAY(PBI Data.SHOPPING_ALERT_DATE,2)=5,\"Friday\", \"Weekend\")))))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "avg_alert",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "AVERAGE(PBI Data.Total Alert)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_7",
        "name": "Measure",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "CALCULATE(AVERAGE(PBI Data.Total Alert))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_8",
        "name": "Year",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_9",
        "name": "MonthNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_10",
        "name": "Month",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_11",
        "name": "QuarterNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_12",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Jornaya Dashboard PBI (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_13",
        "name": "Day",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_14",
        "name": "Year",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_15",
        "name": "MonthNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_16",
        "name": "Month",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_17",
        "name": "QuarterNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_18",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Jornaya Dashboard PBI (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_19",
        "name": "Day",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_20",
        "name": "Year",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_21",
        "name": "MonthNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_22",
        "name": "Month",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_23",
        "name": "QuarterNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_24",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Jornaya Dashboard PBI (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_25",
        "name": "Day",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_26",
        "name": "Year",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_27",
        "name": "MonthNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_28",
        "name": "Month",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_29",
        "name": "QuarterNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_30",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Jornaya Dashboard PBI (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_31",
        "name": "Day",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_32",
        "name": "Year",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_33",
        "name": "MonthNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_34",
        "name": "Month",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_35",
        "name": "QuarterNo",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_36",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Jornaya Dashboard PBI (Embedded Model)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_37",
        "name": "Day",
        "homeTable": "Jornaya Dashboard PBI (Embedded Model)",
        "expression": "DAY([Date])\n\n\n--------",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "PBI Data",
        "displayName": "PBI Data (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Jornaya Dashboard PBI.pbix)",
        "relationships": [
          "PBI Data -> Model Context"
        ],
        "columns": [
          {
            "name": "Weekday",
            "type": "NUMERIC"
          },
          {
            "name": "Territory",
            "type": "NUMERIC"
          },
          {
            "name": "Agency_Division",
            "type": "NUMERIC"
          },
          {
            "name": "AB_TEST_GROUP",
            "type": "NUMERIC"
          },
          {
            "name": "SHOPPING_ALERT_DATE",
            "type": "NUMERIC"
          },
          {
            "name": "PLCY_NUM",
            "type": "NUMERIC"
          },
          {
            "name": "AGENT_STATE",
            "type": "NUMERIC"
          },
          {
            "name": "Total Alert",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Weekday": "Monday",
            "Territory": "Northeast",
            "Agency_Division": "Commercial",
            "AB_TEST_GROUP": "Test A",
            "SHOPPING_ALERT_DATE": "2023-08-14",
            "PLCY_NUM": "POL-44012",
            "AGENT_STATE": "NY",
            "Total Alert": 14
          },
          {
            "Weekday": "Wednesday",
            "Territory": "Midwest",
            "Agency_Division": "Personal",
            "AB_TEST_GROUP": "Control",
            "SHOPPING_ALERT_DATE": "2023-08-16",
            "PLCY_NUM": "POL-44089",
            "AGENT_STATE": "IL",
            "Total Alert": 8
          },
          {
            "Weekday": "Friday",
            "Territory": "Southeast",
            "Agency_Division": "Commercial",
            "AB_TEST_GROUP": "Test B",
            "SHOPPING_ALERT_DATE": "2023-08-18",
            "PLCY_NUM": "POL-44155",
            "AGENT_STATE": "FL",
            "Total Alert": 22
          }
        ]
      }
    ]
  },
  "d4": {
    "summary": {
      "totalPages": 2,
      "totalVisuals": 48,
      "totalTables": 22,
      "totalDAXMeasures": 94,
      "totalKpis": 22
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Average Unit Price This Year by Category",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: Avg $/Unit TY by Category",
            "evidence": "Tooltip \u2022 Worksheet: Avg $/Unit TY by Category",
            "logic": "Average unit price for the current year, grouped by item category.",
            "definition": "The average price per unit sold this year for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "Total Sales Variance Percentage by Fiscal Month",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: Last Year Sales, This Year Sales, Total Sales Variance % by FiscalMonth",
            "evidence": "Tooltip \u2022 Worksheet: Last Year Sales, This Year Sales, Total Sales Variance % by FiscalMonth",
            "logic": "Percentage change in total sales between this year and last year, grouped by fiscal month.",
            "definition": "The percentage difference in total sales compared to the previous year, tracked monthly.",
            "confidence": "95%"
      },
      {
            "id": "kpi_3",
            "name": "Total Sales by Chain",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: TotalSales by Chain, Name",
            "evidence": "Tooltip \u2022 Worksheet: TotalSales by Chain, Name",
            "logic": "Sum of total sales grouped by store chain.",
            "definition": "The total revenue generated by each store chain.",
            "confidence": "90%"
      },
      {
            "id": "kpi_4",
            "name": "Total Sales by Store Name",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: TotalSales by Chain, Name",
            "evidence": "Tooltip \u2022 Worksheet: TotalSales by Chain, Name",
            "logic": "Sum of total sales grouped by individual store names.",
            "definition": "The total revenue generated by each store.",
            "confidence": "90%"
      },
      {
            "id": "kpi_5",
            "name": "Sales Per Square Foot by District",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: Sales Per Sq Ft by District",
            "evidence": "Tooltip \u2022 Worksheet: Sales Per Sq Ft by District",
            "logic": "Total sales divided by the selling area size, grouped by district.",
            "definition": "A measure of sales efficiency, indicating revenue generated per square foot of selling area in each district.",
            "confidence": "92%"
      },
      {
            "id": "kpi_6",
            "name": "This Year Sales by Chain",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: This Year Sales by Chain",
            "evidence": "Tooltip \u2022 Worksheet: This Year Sales by Chain",
            "logic": "Sum of this year's sales grouped by store chain.",
            "definition": "The total revenue generated by each store chain in the current year.",
            "confidence": "90%"
      },
      {
            "id": "kpi_7",
            "name": "Total Units Sold by Store Name",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: TotalUnits by Name",
            "evidence": "Tooltip \u2022 Worksheet: TotalUnits by Name",
            "logic": "Sum of total units sold grouped by store name.",
            "definition": "The total number of units sold by each store.",
            "confidence": "88%"
      },
      {
            "id": "kpi_8",
            "name": "Total Sales Variance Percentage",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: Total Sales Variance % by FiscalMonth",
            "evidence": "Tooltip \u2022 Worksheet: Total Sales Variance % by FiscalMonth",
            "logic": "Percentage change in total sales between this year and last year.",
            "definition": "The overall percentage difference in total sales compared to the previous year.",
            "confidence": "85%"
      },
      {
            "id": "kpi_9",
            "name": "Total Sales Variance Percentage by Fiscal Month and District Manager",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Worksheet: Total Sales Variance by FiscalMonth and District Manager",
            "evidence": "Tooltip \u2022 Worksheet: Total Sales Variance by FiscalMonth and District Manager",
            "logic": "Percentage change in total sales between this year and last year, grouped by fiscal month and district manager.",
            "definition": "The percentage difference in total sales compared to the previous year, tracked monthly and by district manager.",
            "confidence": "90%"
      },
      {
            "id": "kpi_10",
            "name": "Total Revenue",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue' worksheet using a KPI card.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue' worksheet using a KPI card.",
            "logic": "SUM(Fact.ProductRevenue)",
            "definition": "The total revenue generated from all opportunities.",
            "confidence": "100%"
      },
      {
            "id": "kpi_11",
            "name": "Total Opportunity Count",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Count' worksheet using a KPI card.",
            "evidence": "Tooltip \u2022 Extracted from the 'Count' worksheet using a KPI card.",
            "logic": "COUNTA(Fact.Opportunity ID)",
            "definition": "The total number of sales opportunities.",
            "confidence": "100%"
      },
      {
            "id": "kpi_12",
            "name": "Opportunity Count by Region",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Opportunity Count by Region, State' worksheet using a treemap.",
            "evidence": "Tooltip \u2022 Extracted from the 'Opportunity Count by Region, State' worksheet using a treemap.",
            "logic": "COUNTA(Fact.Opportunity ID) grouped by Account[Region]",
            "definition": "The number of sales opportunities grouped by region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_13",
            "name": "Opportunity Count by State",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Opportunity Count by Region, State' worksheet using a treemap.",
            "evidence": "Tooltip \u2022 Extracted from the 'Opportunity Count by Region, State' worksheet using a treemap.",
            "logic": "COUNTA(Fact.Opportunity ID) grouped by Account[State]",
            "definition": "The number of sales opportunities grouped by state.",
            "confidence": "100%"
      },
      {
            "id": "kpi_14",
            "name": "Opportunity Count by Sales Stage",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Pipeline by Stage' worksheet using a bar chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Pipeline by Stage' worksheet using a bar chart.",
            "logic": "COUNTA(Fact.Opportunity ID) grouped by SalesStage[Sales Stage]",
            "definition": "The number of sales opportunities at each stage of the sales pipeline.",
            "confidence": "100%"
      },
      {
            "id": "kpi_15",
            "name": "Revenue by Region",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue by Region and State' worksheet using a bar chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue by Region and State' worksheet using a bar chart.",
            "logic": "SUM(Fact.ProductRevenue) grouped by Account[Region]",
            "definition": "The total revenue generated grouped by region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_16",
            "name": "Revenue by State",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue by Region and State' worksheet using a bar chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue by Region and State' worksheet using a bar chart.",
            "logic": "SUM(Fact.ProductRevenue) grouped by Account[State]",
            "definition": "The total revenue generated grouped by state.",
            "confidence": "100%"
      },
      {
            "id": "kpi_17",
            "name": "Revenue by Month",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue, Opportunity Count by Month' worksheet using a line chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue, Opportunity Count by Month' worksheet using a line chart.",
            "logic": "SUM(Fact.ProductRevenue) grouped by Fact[Month]",
            "definition": "The total revenue generated grouped by month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_18",
            "name": "Opportunity Count by Month",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue, Opportunity Count by Month' worksheet using a stacked column chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue, Opportunity Count by Month' worksheet using a stacked column chart.",
            "logic": "COUNTA(Fact.Opportunity ID) grouped by Fact[Month]",
            "definition": "The number of sales opportunities grouped by month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_19",
            "name": "Revenue by Segment",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Revenue by Segment' worksheet using a donut chart.",
            "evidence": "Tooltip \u2022 Extracted from the 'Revenue by Segment' worksheet using a donut chart.",
            "logic": "SUM(Fact.ProductRevenue) grouped by Account[Segment]",
            "definition": "The total revenue generated grouped by customer segment.",
            "confidence": "100%"
      },
      {
            "id": "kpi_20",
            "name": "Revenue by State (Map)",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'State' worksheet using a filled map.",
            "evidence": "Tooltip \u2022 Extracted from the 'State' worksheet using a filled map.",
            "logic": "SUM(Fact.ProductRevenue) grouped by Account[State]",
            "definition": "The total revenue generated grouped by state, visualized on a map.",
            "confidence": "100%"
      },
      {
            "id": "kpi_21",
            "name": "Average Revenue by Opportunity Size",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Avg Revenue by Opportunity Size' worksheet using a matrix.",
            "evidence": "Tooltip \u2022 Extracted from the 'Avg Revenue by Opportunity Size' worksheet using a matrix.",
            "logic": "AVERAGE(Fact.ProductRevenue) grouped by Opportunity[Opportunity Size]",
            "definition": "The average revenue generated per opportunity size.",
            "confidence": "100%"
      },
      {
            "id": "kpi_22",
            "name": "Factored Revenue by Opportunity Size",
            "page": "Tooltip",
            "category": "Tooltip",
            "source": "Extracted from the 'Avg Revenue by Opportunity Size' worksheet using a matrix.",
            "evidence": "Tooltip \u2022 Extracted from the 'Avg Revenue by Opportunity Size' worksheet using a matrix.",
            "logic": "SUM(Fact.FactoredProductRevenue) grouped by Opportunity[Opportunity Size]",
            "definition": "The factored revenue generated per opportunity size. Tabs 2 Filtered tabs KPIs 22 AI Extracted KPIs Visuals 48",
            "confidence": "100%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Opportunity Overview",
        "visualType": "basicShape",
        "dimensions": [
          "Region",
          "Month",
          "Product Code",
          "State",
          "Sales Stage"
        ],
        "measures": [
          {
            "name": "Revenue",
            "type": "explicit"
          },
          {
            "name": "Opportunity Count",
            "type": "explicit"
          },
          {
            "name": "Opportunity Count",
            "type": "explicit"
          },
          {
            "name": "Revenue",
            "type": "explicit"
          },
          {
            "name": "Revenue",
            "type": "explicit"
          },
          {
            "name": "Opportunity Count",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "8 measure(s) bound",
          "axes": "5 dimension(s) mapped"
        }
      },
      {
        "id": "pg_2",
        "name": "Detail",
        "visualType": "pivotTable",
        "dimensions": [
          "Partner",
          "Region",
          "Opportunity Size"
        ],
        "measures": [
          {
            "name": "Opportunity Count",
            "type": "explicit"
          },
          {
            "name": "Revenue",
            "type": "explicit"
          },
          {
            "name": "Factored Revenue",
            "type": "explicit"
          },
          {
            "name": "Avg Revenue",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "4 measure(s) bound",
          "axes": "3 dimension(s) mapped"
        }
      },
      {
        "id": "pg_3",
        "name": "Tooltip",
        "visualType": "card",
        "dimensions": [
          "Segment"
        ],
        "measures": [
          {
            "name": "Revenue",
            "type": "explicit"
          },
          {
            "name": "Revenue",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "2 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Average Selling Area Size",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "AVERAGE(Store.SellingAreaSize)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "New Stores",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE(COUNTA(Store.Store Type), FILTER(ALL(Store), Store.Store Type=\"New Store\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "New Stores Target",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "14",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Total Stores",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "COUNTA(Store.StoreNumberName)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "Open Store Count",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "COUNTA(Store.OpenDate)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "Regular_Sales_Dollars",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "SUM([Sum_Regular_Sales_Dollars])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_7",
        "name": "Markdown_Sales_Dollars",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "SUM([Sum_Markdown_Sales_Dollars])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_8",
        "name": "TotalSales",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Regular_Sales_Dollars]+[Markdown_Sales_Dollars]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_9",
        "name": "TotalSalesLY",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE([TotalSales], Sales.ScenarioID=2)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_10",
        "name": "Gross Margin This Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE(SUM([Sum_GrossMarginAmount]), Sales.ScenarioID=1)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_11",
        "name": "Gross Margin This Year %",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Gross Margin This Year]/[TotalSalesTY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_12",
        "name": "Gross Margin Last Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE(SUM([Sum_GrossMarginAmount]), Sales.ScenarioID=2)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_13",
        "name": "Gross Margin Last Year %",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Gross Margin Last Year]/[TotalSalesLY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_14",
        "name": "Regular_Sales_Units",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "SUM([Sum_Regular_Sales_Units])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_15",
        "name": "Markdown_Sales_Units",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "SUM([Sum_Markdown_Sales_Units])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_16",
        "name": "TotalUnits",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Regular_Sales_Units]+[Markdown_Sales_Units]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_17",
        "name": "Total Units Last Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE([TotalUnits], Sales.ScenarioID=2)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_18",
        "name": "Total Units This Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE([TotalUnits], Sales.ScenarioID=1)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_19",
        "name": "Avg $/Unit TY",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "IF([Total Units This Year]<>0, [TotalSalesTY]/[Total Units This Year], BLANK())",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_20",
        "name": "Avg $/Unit LY",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "IF([Total Units Last Year]<>0, [TotalSalesLY]/[Total Units Last Year], BLANK())",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_21",
        "name": "Total Sales Var",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[TotalSalesTY]-[TotalSalesLY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_22",
        "name": "Total Sales Var %",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "IF([TotalSalesLY]<>0, [Total Sales Var]/[TotalSalesLY], BLANK())",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_23",
        "name": "Sales Per Sq Ft",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "([TotalSalesTY]/(DISTINCTCOUNT([MonthID])*SUM(Store.SellingAreaSize)))*12",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_24",
        "name": "Last Year Sales",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[TotalSalesLY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_25",
        "name": "Total Sales Variance",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Total Sales Var]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_26",
        "name": "Total Sales Variance %",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Total Sales Var %]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_27",
        "name": "Store Count",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "DISTINCTCOUNT(Store.LocationID)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_28",
        "name": "Average Unit Price",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Avg $/Unit TY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_29",
        "name": "Average Unit Price Last Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[Avg $/Unit LY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_30",
        "name": "TotalSalesTY",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "CALCULATE([TotalSales], Sales.ScenarioID=1)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_31",
        "name": "This Year Sales",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[TotalSalesTY]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_32",
        "name": "Count of OpenDate",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "COUNTA(Store.OpenDate)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_33",
        "name": "City",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "Store.City Name & \", \"&Store.Territory",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_34",
        "name": "Open Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "YEAR(Store.OpenDate)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_35",
        "name": "Store Type",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "IF(Store.Open Year=2014, \"New Store\", \"Same Store\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_36",
        "name": "Open Month No",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "MONTH(Store.OpenDate)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_37",
        "name": "Open Month",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "FORMAT(Store.OpenDate, \"MMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_38",
        "name": "ReportingPeriodID",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "[MonthID]&\"01\"",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_39",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_40",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_41",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_42",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_43",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (4d92da28...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_44",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_45",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_46",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_47",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_48",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_49",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (4d92da28...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_50",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_51",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_52",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_53",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_54",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_55",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (4d92da28...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_56",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_57",
        "name": "Category (clusters) 2",
        "homeTable": "Live Cloud Dataset (4d92da28...)",
        "expression": "VAR __ClusterValue = \n  LOOKUPVALUE(\n    ClusterMappingTable 2.ClusterId,\n    ClusterMappingTable 2.Category,\n    Item.Category\n  )\n\nRETURN\n  SWITCH(\n    __ClusterValue,\n    BLANK(),\n    BLANK(),\n    CONCATENATE(\"Cluster\", __ClusterValue)\n  )",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_58",
        "name": "Avg Opportunity Days",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "AVERAGE(Fact.Opportunity Days)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_59",
        "name": "Avg Revenue",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "AVERAGE(Fact.ProductRevenue)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_60",
        "name": "Factored Revenue",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "SUM(Fact.FactoredProductRevenue)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_61",
        "name": "Opportunity Count",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "COUNTA(Fact.Opportunity ID)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_62",
        "name": "Revenue",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "SUM(Fact.ProductRevenue)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_63",
        "name": "Tot Opportunity Days",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "SUM(Fact.Opportunity Days)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_64",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "YEAR(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_65",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "MONTH(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_66",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "FORMAT(Fact.Date, \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_67",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_68",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (055d0d5c...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_69",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "DAY(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_70",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "YEAR(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_71",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "MONTH(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_72",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "FORMAT(Fact.Date, \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_73",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_74",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (055d0d5c...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_75",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "DAY(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_76",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "YEAR(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_77",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "MONTH(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_78",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "FORMAT(Fact.Date, \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_79",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_80",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (055d0d5c...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_81",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "DAY(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_82",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "YEAR(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_83",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "MONTH(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_84",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "FORMAT(Fact.Date, \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_85",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_86",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (055d0d5c...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_87",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "DAY(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_88",
        "name": "Date",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "Fact.EstimatedCloseDate.[Date]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_89",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "YEAR(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_90",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "MONTH(Fact.Date)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_91",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "FORMAT(Fact.Date, \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_92",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_93",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (055d0d5c...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_94",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (055d0d5c...)",
        "expression": "DAY(Fact.Date)\n\n------",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "Fact",
        "displayName": "Fact (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "Fact -> Model Context"
        ],
        "columns": [
          {
            "name": "Month",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Month": "January",
            "Opportunity Days": 45,
            "ProductRevenue": 125000.0,
            "FactoredProductRevenue": 106250.0,
            "Opportunity ID": "OPP-1001"
          },
          {
            "Month": "February",
            "Opportunity Days": 32,
            "ProductRevenue": 98000.0,
            "FactoredProductRevenue": 83300.0,
            "Opportunity ID": "OPP-1002"
          },
          {
            "Month": "March",
            "Opportunity Days": 60,
            "ProductRevenue": 210000.0,
            "FactoredProductRevenue": 178500.0,
            "Opportunity ID": "OPP-1003"
          }
        ]
      },
      {
        "tableName": "Product",
        "displayName": "Product (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "Product -> Model Context"
        ],
        "columns": [
          {
            "name": "Product Code",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Product Code": "PROD-AUTO",
            "Product Name": "Commercial Fleet Auto",
            "Category": "Automotive"
          },
          {
            "Product Code": "PROD-HOME",
            "Product Name": "Homeowners Comprehensive",
            "Category": "Property"
          },
          {
            "Product Code": "PROD-COMM",
            "Product Name": "General Commercial Liability",
            "Category": "Liability"
          }
        ]
      },
      {
        "tableName": "Account",
        "displayName": "Account (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "Account -> Model Context"
        ],
        "columns": [
          {
            "name": "Region",
            "type": "TEXT"
          },
          {
            "name": "State",
            "type": "TEXT"
          },
          {
            "name": "Segment",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Region": "East",
            "State": "NY",
            "Segment": 1
          },
          {
            "Region": "West",
            "State": "CA",
            "Segment": 2
          },
          {
            "Region": "Central",
            "State": "TX",
            "Segment": 3
          }
        ]
      },
      {
        "tableName": "SalesStage",
        "displayName": "SalesStage (Semantic Model)",
        "rowCount": 45600,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "SalesStage -> Model Context"
        ],
        "columns": [
          {
            "name": "Sales Stage",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Sales Stage": 1
          },
          {
            "Sales Stage": 2
          },
          {
            "Sales Stage": 3
          }
        ]
      },
      {
        "tableName": "Opportunity",
        "displayName": "Opportunity (Semantic Model)",
        "rowCount": 54800,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "Opportunity -> Model Context"
        ],
        "columns": [
          {
            "name": "Opportunity Size",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Opportunity Size": 1
          },
          {
            "Opportunity Size": 2
          },
          {
            "Opportunity Size": 3
          }
        ]
      },
      {
        "tableName": "Partner",
        "displayName": "Partner (Semantic Model)",
        "rowCount": 64000,
        "source": "Power Query (Revenue Opportunities.pbix)",
        "relationships": [
          "Partner -> Model Context"
        ],
        "columns": [
          {
            "name": "Partner",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Partner": 101
          },
          {
            "Partner": 102
          },
          {
            "Partner": 103
          }
        ]
      }
    ]
  },
  "d5": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 32,
      "totalTables": 3,
      "totalDAXMeasures": 11,
      "totalKpis": 5
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the '13/1 Survival Rate' worksheet, which focuses on survival rate metrics for agents in the bottom quartile.",
            "evidence": "Page 1 \u2022 Derived from the '13/1 Survival Rate' worksheet, which focuses on survival rate metrics for agents in the bottom quartile.",
            "logic": "Calculated as the ratio of policies still active after 13 months to the total cohort of policies.",
            "definition": "The percentage of policies associated with an agent that remain active after 13 months.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "New Business Counts by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Extracted from the 'NB Counts' worksheet, which tracks new business counts at the agent level.",
            "evidence": "Page 1 \u2022 Extracted from the 'NB Counts' worksheet, which tracks new business counts at the agent level.",
            "logic": "Count of new business policies attributed to each agent.",
            "definition": "The total number of new business policies generated by an agent.",
            "confidence": "90%"
      },
      {
            "id": "kpi_3",
            "name": "R12 Loss Ratio Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Sourced from the 'R12_Loss_Ratio_Score' worksheet, which evaluates rolling 12-month loss ratio scores for agents.",
            "evidence": "Page 1 \u2022 Sourced from the 'R12_Loss_Ratio_Score' worksheet, which evaluates rolling 12-month loss ratio scores for agents.",
            "logic": "Rolling 12-month loss ratio calculated as total claims divided by total premiums for each agent.",
            "definition": "A measure of an agent's loss ratio over the past 12 months, indicating the profitability of their portfolio.",
            "confidence": "92%"
      },
      {
            "id": "kpi_4",
            "name": "Overall Performance Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'R12_OVERALL_SCORE' worksheet, which provides a composite performance score for agents.",
            "evidence": "Page 1 \u2022 Derived from the 'R12_OVERALL_SCORE' worksheet, which provides a composite performance score for agents.",
            "logic": "Composite score based on multiple metrics, including survival rate, new business counts, and loss ratio.",
            "definition": "A comprehensive score reflecting an agent's overall performance across key business metrics.",
            "confidence": "88%"
      },
      {
            "id": "kpi_5",
            "name": "Survival Rate Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'Survival Rate Quartile' field in the datasource, used to categorize agents into quartiles based on survival rate.",
            "evidence": "Page 1 \u2022 Derived from the 'Survival Rate Quartile' field in the datasource, used to categorize agents into quartiles based on survival rate.",
            "logic": "Agents are ranked by survival rate and divided into quartiles.",
            "definition": "The quartile ranking of an agent based on their survival rate performance. -----",
            "confidence": "85%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Page 1",
        "visualType": "cardVisual",
        "dimensions": [
          "AOR + Agent",
          "District",
          "Agency state",
          "Reporting Period",
          "Line of Business",
          "Agency State"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "SRate",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "lag13m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_3",
        "name": "cohortm",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_4",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_5",
        "name": "sr quart",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_6",
        "name": "Conversion Rate m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_7",
        "name": "nb count m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_8",
        "name": "quote ind m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_9",
        "name": "AOR + Agent m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_10",
        "name": "AOR + Agent m2",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_11",
        "name": "AOR + Agent m3",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "PBI Data",
        "displayName": "PBI Data (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Bottom 25% Agents.pbix)",
        "relationships": [
          "PBI Data -> Model Context"
        ],
        "columns": [
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "District",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          },
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency State",
            "type": "TEXT"
          }
        ],
        "sampleRows": [
          {
            "AOR + Agent": 101,
            "District": 4,
            "Reporting Period": 202303,
            "Line of Business": 1,
            "Agency State": "OH"
          },
          {
            "AOR + Agent": 104,
            "District": 2,
            "Reporting Period": 202303,
            "Line of Business": 2,
            "Agency State": "PA"
          },
          {
            "AOR + Agent": 109,
            "District": 7,
            "Reporting Period": 202303,
            "Line of Business": 1,
            "Agency State": "MI"
          }
        ]
      },
      {
        "tableName": "PBI Data (2)",
        "displayName": "PBI Data (2) (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Bottom 25% Agents.pbix)",
        "relationships": [
          "PBI Data (2) -> Model Context"
        ],
        "columns": [
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC"
          },
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Line of Business": 1,
            "Agency state": 39,
            "AOR + Agent": 101,
            "Reporting Period": 202303
          },
          {
            "Line of Business": 2,
            "Agency state": 42,
            "AOR + Agent": 104,
            "Reporting Period": 202303
          },
          {
            "Line of Business": 1,
            "Agency state": 26,
            "AOR + Agent": 109,
            "Reporting Period": 202303
          }
        ]
      },
      {
        "tableName": "PBI Data (3)",
        "displayName": "PBI Data (3) (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (Bottom 25% Agents.pbix)",
        "relationships": [
          "PBI Data (3) -> Model Context"
        ],
        "columns": [
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC"
          },
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Line of Business": 1,
            "Agency state": 39,
            "AOR + Agent": 101,
            "Reporting Period": 202303
          },
          {
            "Line of Business": 2,
            "Agency state": 42,
            "AOR + Agent": 104,
            "Reporting Period": 202303
          },
          {
            "Line of Business": 1,
            "Agency state": 26,
            "AOR + Agent": 109,
            "Reporting Period": 202303
          }
        ]
      }
    ]
  },
  "d9": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 22,
      "totalTables": 3,
      "totalDAXMeasures": 11,
      "totalKpis": 6
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "New Business Counts by AOR and Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'AOR + Agent, NB Counts' worksheet.",
            "evidence": "Page 1 \u2022 Derived from the 'AOR + Agent, NB Counts' worksheet.",
            "logic": "Count of new business policies attributed to each AOR and agent.",
            "definition": "The total number of new business policies generated by each agent under a specific Agent of Record (AOR).",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "R12 Overall Score by AOR and Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'AOR + Agent, R12_OVERALL_SCORE' worksheet.",
            "evidence": "Page 1 \u2022 Derived from the 'AOR + Agent, R12_OVERALL_SCORE' worksheet.",
            "logic": "Rolling 12-month performance score calculated for each agent under a specific AOR.",
            "definition": "A performance metric that evaluates the overall effectiveness of agents over the past 12 months.",
            "confidence": "90%"
      },
      {
            "id": "kpi_3",
            "name": "Conversion Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Ratio of new business counts to quote counts for each agent.",
            "definition": "The percentage of quotes converted into new business policies by each agent.",
            "confidence": "85%"
      },
      {
            "id": "kpi_4",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Ratio of agents retained in the bottom quartile to the total cohort size.",
            "definition": "The retention rate of agents in the bottom quartile over a specific period.",
            "confidence": "85%"
      },
      {
            "id": "kpi_5",
            "name": "R12 Loss Ratio Score by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Rolling 12-month loss ratio score for each agent.",
            "definition": "A metric that evaluates the loss ratio performance of agents over the past 12 months.",
            "confidence": "90%"
      },
      {
            "id": "kpi_6",
            "name": "R12 Loss Ratio Score Variance to Bottom Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data.",
            "logic": "Difference between an agent's R12 Loss Ratio Score and the average score of the bottom quartile.",
            "definition": "The variance in loss ratio performance of an agent compared to the average performance of agents in the bottom quartile. Report Overview Analyzing New Business (Bottom 25% agents).pbix",
            "confidence": "85%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Page 1",
        "visualType": "textbox",
        "dimensions": [
          "Agent)"
        ],
        "measures": [
          {
            "name": "Agency State",
            "type": "explicit"
          },
          {
            "name": "Line of Business",
            "type": "explicit"
          },
          {
            "name": "Reporting Period",
            "type": "explicit"
          },
          {
            "name": "Agency state",
            "type": "explicit"
          },
          {
            "name": "Line of Business",
            "type": "explicit"
          },
          {
            "name": "Reporting Period",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "Page 1 Primary Metric Grid",
          "axes": "Page 1 Categorical Breakdown"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "SRate",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "lag13m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_3",
        "name": "cohortm",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_4",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_5",
        "name": "sr quart",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_6",
        "name": "Conversion Rate m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_7",
        "name": "nb count m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_8",
        "name": "quote ind m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_9",
        "name": "AOR + Agent m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_10",
        "name": "AOR + Agent m2",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_11",
        "name": "AOR + Agent m3",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "PBI Data",
        "displayName": "PBI Data",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "AOR + Agent",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Agency State",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "District",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Line of Business",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "AOR + Agent": 101.0,
            "Agency State": 39.0,
            "District": 4.0,
            "Line of Business": 1.0,
            "Reporting Period": 202303.0
          },
          {
            "AOR + Agent": 104.0,
            "Agency State": 42.0,
            "District": 2.0,
            "Line of Business": 2.0,
            "Reporting Period": 202303.0
          },
          {
            "AOR + Agent": 109.0,
            "Agency State": 26.0,
            "District": 7.0,
            "Line of Business": 1.0,
            "Reporting Period": 202303.0
          }
        ]
      },
      {
        "tableName": "PBI Data (2)",
        "displayName": "PBI Data (2)",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "AOR + Agent",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Line of Business",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "AOR + Agent": 101.0,
            "Agency state": 39.0,
            "Line of Business": 1.0,
            "Reporting Period": 202303.0
          },
          {
            "AOR + Agent": 104.0,
            "Agency state": 42.0,
            "Line of Business": 2.0,
            "Reporting Period": 202303.0
          },
          {
            "AOR + Agent": 109.0,
            "Agency state": 26.0,
            "Line of Business": 1.0,
            "Reporting Period": 202303.0
          }
        ]
      },
      {
        "tableName": "Sum(PBI Data",
        "displayName": "Sum(PBI Data",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "NB Counts",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "NB Counts Agents in Bottom Quartile",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "NB Counts": 45.0,
            "NB Counts Agents in Bottom Quartile": 12.0
          },
          {
            "NB Counts": 58.0,
            "NB Counts Agents in Bottom Quartile": 16.0
          },
          {
            "NB Counts": 62.0,
            "NB Counts Agents in Bottom Quartile": 19.0
          }
        ]
      },
      {
        "tableName": "Sum(PBI Data (2)",
        "displayName": "Sum(PBI Data (2)",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "R12 Loss Score Ratio Var to Bottom Quartile",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "R12_OVERALL_SCORE",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "R12 Loss Score Ratio Var to Bottom Quartile": -0.14,
            "R12_OVERALL_SCORE": 78.5
          },
          {
            "R12 Loss Score Ratio Var to Bottom Quartile": -0.08,
            "R12_OVERALL_SCORE": 82.1
          },
          {
            "R12 Loss Score Ratio Var to Bottom Quartile": -0.22,
            "R12_OVERALL_SCORE": 71.3
          }
        ]
      },
      {
        "tableName": "Min(PBI Data (2)",
        "displayName": "Min(PBI Data (2)",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "Agent",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Agent": 101.0
          },
          {
            "Agent": 104.0
          },
          {
            "Agent": 109.0
          }
        ]
      },
      {
        "tableName": "Min(PBI Data",
        "displayName": "Min(PBI Data",
        "rowCount": 3500,
        "source": "Import (Direct Lake)",
        "relationships": [
          "1:* to Fact_Production"
        ],
        "columns": [
          {
            "name": "Agent",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Agent": 101.0
          },
          {
            "Agent": 104.0
          },
          {
            "Agent": 109.0
          }
        ]
      }
    ]
  },
  "p1": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 22,
      "totalTables": 3,
      "totalDAXMeasures": 11,
      "totalKpis": 5
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Survival Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the '13/1 Survival Rate' worksheet and calculated fields related to survival rate.",
            "evidence": "Page 1 \u2022 Derived from the '13/1 Survival Rate' worksheet and calculated fields related to survival rate.",
            "logic": "Survival rate is calculated as the ratio of retained policies (LAG13) to the cohort size.",
            "definition": "The percentage of policies or agents retained over a specific period, broken down by agent.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "New Business Counts by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'NB Counts' worksheet and related calculated fields.",
            "evidence": "Page 1 \u2022 Derived from the 'NB Counts' worksheet and related calculated fields.",
            "logic": "Count of new business policies or applications processed by each agent.",
            "definition": "The total number of new policies or applications processed, segmented by agent.",
            "confidence": "90%"
      },
      {
            "id": "kpi_3",
            "name": "Bottom Quartile Agents by Survival Rate",
            "page": "Page 1",
            "category": null,
            "source": "Derived from the 'Bottom 25% Agents' worksheet and survival rate quartile calculations.",
            "evidence": "Page 1 \u2022 Derived from the 'Bottom 25% Agents' worksheet and survival rate quartile calculations.",
            "logic": "Agents in the bottom 25% based on survival rate performance.",
            "definition": "The list of agents whose survival rate performance falls in the bottom quartile.",
            "confidence": "85%"
      },
      {
            "id": "kpi_4",
            "name": "Conversion Rate by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields and agent-level data in the 'AOR + Agent' worksheet.",
            "evidence": "Page 1 \u2022 Derived from calculated fields and agent-level data in the 'AOR + Agent' worksheet.",
            "logic": "Conversion rate is calculated as the ratio of new business counts to quote counts.",
            "definition": "The percentage of quotes converted into new business policies, segmented by agent.",
            "confidence": "88%"
      },
      {
            "id": "kpi_5",
            "name": "Survival Rate Variance to Bottom Quartile by Agent",
            "page": "Page 1",
            "category": null,
            "source": "Derived from calculated fields related to survival rate variance.",
            "evidence": "Page 1 \u2022 Derived from calculated fields related to survival rate variance.",
            "logic": "Difference between an agent's survival rate and the average survival rate of the bottom quartile.",
            "definition": "The variance in survival rate for an agent compared to the bottom quartile average. Analyzing Survival Rate.pbix",
            "confidence": "80%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Page 1",
        "visualType": "cardVisual",
        "dimensions": [
          "AOR + Agent",
          "District",
          "Agency state",
          "Reporting Period",
          "Line of Business",
          "Agency State"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "SRate",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([lag13m],[cohortm],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "lag13m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).LAG13)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_3",
        "name": "cohortm",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Cohort)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_4",
        "name": "Survival Rate Agents in Bottom Quartile m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "CALCULATE(\n    DISTINCTCOUNT(PBI DATA (3).Agent),\n    FILTER(PBI DATA (3).sr quart = \"1st Quartile\"))",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_5",
        "name": "sr quart",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SUM(PBI DATA (3).Survival Rate Quartile)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_6",
        "name": "Conversion Rate m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "DIVIDE([nb count m],[quote ind m],0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_7",
        "name": "nb count m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.NB Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_8",
        "name": "quote ind m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "COUNT(PBI Data.Quote Ind Counts)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_9",
        "name": "AOR + Agent m",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_10",
        "name": "AOR + Agent m2",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_11",
        "name": "AOR + Agent m3",
        "homeTable": "Survival Rate (Embedded Model)",
        "expression": "SELECTEDVALUE(PBI Data.AOR,\"\") & \"-\" & SELECTEDVALUE(PBI Data.Agent Name,\"\")",
        "formatString": "string",
        "usedInPages": [
          "Page 1"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "PBI Data",
        "displayName": "PBI Data (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Survival Rate.pbix)",
        "relationships": [
          "PBI Data -> Model Context"
        ],
        "columns": [
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "District",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          },
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency State",
            "type": "TEXT"
          }
        ],
        "sampleRows": [
          {
            "AOR + Agent": 301,
            "District": 5,
            "Reporting Period": 202302,
            "Line of Business": 1,
            "Agency State": "IL"
          },
          {
            "AOR + Agent": 308,
            "District": 1,
            "Reporting Period": 202302,
            "Line of Business": 2,
            "Agency State": "OH"
          },
          {
            "AOR + Agent": 315,
            "District": 8,
            "Reporting Period": 202302,
            "Line of Business": 1,
            "Agency State": "IN"
          }
        ]
      },
      {
        "tableName": "PBI Data (3)",
        "displayName": "PBI Data (3) (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Survival Rate.pbix)",
        "relationships": [
          "PBI Data (3) -> Model Context"
        ],
        "columns": [
          {
            "name": "Line of Business",
            "type": "NUMERIC"
          },
          {
            "name": "Agency state",
            "type": "NUMERIC"
          },
          {
            "name": "AOR + Agent",
            "type": "NUMERIC"
          },
          {
            "name": "Reporting Period",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Line of Business": 1,
            "Agency state": 17,
            "AOR + Agent": 301,
            "Reporting Period": 202302
          },
          {
            "Line of Business": 2,
            "Agency state": 39,
            "AOR + Agent": 308,
            "Reporting Period": 202302
          },
          {
            "Line of Business": 1,
            "Agency state": 18,
            "AOR + Agent": 315,
            "Reporting Period": 202302
          }
        ]
      }
    ]
  },
  "f1": {
    "summary": {
      "totalPages": 4,
      "totalVisuals": 34,
      "totalTables": 11,
      "totalDAXMeasures": 28,
      "totalKpis": 36
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Actual Spend by IT Area",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Area.",
            "definition": "The total amount of money spent in each IT Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_2",
            "name": "Planned Spend by IT Area",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Area.",
            "definition": "The total budgeted amount for each IT Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_3",
            "name": "Actual Spend by IT Sub Area",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Sub Area.",
            "definition": "The total amount of money spent in each IT Sub Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_4",
            "name": "Planned Spend by IT Sub Area",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Sub Area.",
            "definition": "The total budgeted amount for each IT Sub Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_5",
            "name": "Variance Percentage by Business Area",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Business Area.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Business Area.",
            "confidence": "100%"
      },
      {
            "id": "kpi_6",
            "name": "Variance Percentage by Month",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each month.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_7",
            "name": "Variance Percentage by Sales Region",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Sales Region.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Sales Region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_8",
            "name": "Monthly Spend Amount by Scenario",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "logic": "Sum of spend amounts grouped by month and scenario (e.g., Actual, Plan).",
            "definition": "The total spend amount for each month, categorized by scenario such as Actual or Plan.",
            "confidence": "100%"
      },
      {
            "id": "kpi_9",
            "name": "Year-to-Date Spend by Cost Elements",
            "page": "IT Spend Trend",
            "category": "IT Spend Trend",
            "source": "Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "evidence": "IT Spend Trend \u2022 Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "logic": "Cumulative sum of spend amounts for the year, grouped by cost elements.",
            "definition": "The total spend amount from the beginning of the year to date, categorized by cost elements.",
            "confidence": "90%"
      },
      {
            "id": "kpi_10",
            "name": "Actual Spend by IT Area",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Area.",
            "definition": "The total amount of money spent in each IT Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_11",
            "name": "Planned Spend by IT Area",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Area.",
            "definition": "The total budgeted amount for each IT Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_12",
            "name": "Actual Spend by IT Sub Area",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Sub Area.",
            "definition": "The total amount of money spent in each IT Sub Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_13",
            "name": "Planned Spend by IT Sub Area",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Sub Area.",
            "definition": "The total budgeted amount for each IT Sub Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_14",
            "name": "Variance Percentage by Business Area",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Business Area.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Business Area.",
            "confidence": "100%"
      },
      {
            "id": "kpi_15",
            "name": "Variance Percentage by Month",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each month.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_16",
            "name": "Variance Percentage by Sales Region",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Sales Region.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Sales Region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_17",
            "name": "Monthly Spend Amount by Scenario",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "logic": "Sum of spend amounts grouped by month and scenario (e.g., Actual, Plan).",
            "definition": "The total spend amount for each month, categorized by scenario such as Actual or Plan.",
            "confidence": "100%"
      },
      {
            "id": "kpi_18",
            "name": "Year-to-Date Spend by Cost Elements",
            "page": "Spend By Cost Elements",
            "category": "Spend By Cost Elements",
            "source": "Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "evidence": "Spend By Cost Elements \u2022 Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "logic": "Cumulative sum of spend amounts for the year, grouped by cost elements.",
            "definition": "The total spend amount from the beginning of the year to date, categorized by cost elements.",
            "confidence": "90%"
      },
      {
            "id": "kpi_19",
            "name": "Actual Spend by IT Area",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Area.",
            "definition": "The total amount of money spent in each IT Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_20",
            "name": "Planned Spend by IT Area",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Area.",
            "definition": "The total budgeted amount for each IT Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_21",
            "name": "Actual Spend by IT Sub Area",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Sub Area.",
            "definition": "The total amount of money spent in each IT Sub Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_22",
            "name": "Planned Spend by IT Sub Area",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Sub Area.",
            "definition": "The total budgeted amount for each IT Sub Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_23",
            "name": "Variance Percentage by Business Area",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Business Area.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Business Area.",
            "confidence": "100%"
      },
      {
            "id": "kpi_24",
            "name": "Variance Percentage by Month",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each month.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_25",
            "name": "Variance Percentage by Sales Region",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Sales Region.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Sales Region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_26",
            "name": "Monthly Spend Amount by Scenario",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "logic": "Sum of spend amounts grouped by month and scenario (e.g., Actual, Plan).",
            "definition": "The total spend amount for each month, categorized by scenario such as Actual or Plan.",
            "confidence": "100%"
      },
      {
            "id": "kpi_27",
            "name": "Year-to-Date Spend by Cost Elements",
            "page": "Plan Variance Analysis",
            "category": "Plan Variance Analysis",
            "source": "Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "evidence": "Plan Variance Analysis \u2022 Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "logic": "Cumulative sum of spend amounts for the year, grouped by cost elements.",
            "definition": "The total spend amount from the beginning of the year to date, categorized by cost elements.",
            "confidence": "90%"
      },
      {
            "id": "kpi_28",
            "name": "Actual Spend by IT Area",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Info \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Area.",
            "definition": "The total amount of money spent in each IT Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_29",
            "name": "Planned Spend by IT Area",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Info \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Area.",
            "definition": "The total budgeted amount for each IT Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_30",
            "name": "Actual Spend by IT Sub Area",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "evidence": "Info \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Actual]' field.",
            "logic": "Sum of actual spend values grouped by IT Sub Area.",
            "definition": "The total amount of money spent in each IT Sub Area, as recorded in the actual spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_31",
            "name": "Planned Spend by IT Sub Area",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "evidence": "Info \u2022 Derived from the 'Actual, Plan by IT Area, IT Sub Area' worksheet using the 'Fact[Plan]' field.",
            "logic": "Sum of planned spend values grouped by IT Sub Area.",
            "definition": "The total budgeted amount for each IT Sub Area, as per the planned spend data.",
            "confidence": "100%"
      },
      {
            "id": "kpi_32",
            "name": "Variance Percentage by Business Area",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Info \u2022 Derived from the 'Var Plan % by Business Area' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Business Area.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Business Area.",
            "confidence": "100%"
      },
      {
            "id": "kpi_33",
            "name": "Variance Percentage by Month",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Info \u2022 Derived from the 'Var Plan % by Month' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each month.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each month.",
            "confidence": "100%"
      },
      {
            "id": "kpi_34",
            "name": "Variance Percentage by Sales Region",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "evidence": "Info \u2022 Derived from the 'Var Plan % by Sales Region' worksheet using the 'Fact[Var Plan %]' field.",
            "logic": "Percentage difference between actual and planned spend for each Sales Region.",
            "definition": "The percentage by which the actual spend deviates from the planned spend for each Sales Region.",
            "confidence": "100%"
      },
      {
            "id": "kpi_35",
            "name": "Monthly Spend Amount by Scenario",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "evidence": "Info \u2022 Derived from the 'Amount by Month' worksheet using the 'Fact[Amount]' and 'Scenario[Scenario]' fields.",
            "logic": "Sum of spend amounts grouped by month and scenario (e.g., Actual, Plan).",
            "definition": "The total spend amount for each month, categorized by scenario such as Actual or Plan.",
            "confidence": "100%"
      },
      {
            "id": "kpi_36",
            "name": "Year-to-Date Spend by Cost Elements",
            "page": "Info",
            "category": "Info",
            "source": "Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "evidence": "Info \u2022 Derived from the 'YTD Spend by Cost Elements' worksheet.",
            "logic": "Cumulative sum of spend amounts for the year, grouped by cost elements.",
            "definition": "The total spend amount from the beginning of the year to date, categorized by cost elements. Report Overview Analyzing IT Spend Analysis Sample PBIX.pbix",
            "confidence": "90%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Info",
        "visualType": "Card / Clustered Bar",
        "dimensions": [
          "Dimension"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "0 dimension(s) mapped"
        }
      },
      {
        "id": "pg_2",
        "name": "IT Spend Trend",
        "visualType": "scatterChart",
        "dimensions": [
          "Period",
          "Month",
          "IT Sub Area",
          "Sales Region",
          "IT Area",
          "Business Area"
        ],
        "measures": [
          {
            "name": "Var Plan %",
            "type": "explicit"
          },
          {
            "name": "Var Plan %",
            "type": "explicit"
          },
          {
            "name": "Actual",
            "type": "explicit"
          },
          {
            "name": "Plan",
            "type": "explicit"
          },
          {
            "name": "Var Plan",
            "type": "explicit"
          },
          {
            "name": "Var Plan %",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "7 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      },
      {
        "id": "pg_3",
        "name": "Spend By Cost Elements",
        "visualType": "clusteredBarChart",
        "dimensions": [
          "Month",
          "Scenario",
          "Department",
          "Cost element name",
          "Cost Element Group",
          "IT Sub Area"
        ],
        "measures": [
          {
            "name": "Var Plan %",
            "type": "explicit"
          },
          {
            "name": "Amount",
            "type": "explicit"
          },
          {
            "name": "Actual",
            "type": "explicit"
          },
          {
            "name": "_Actual/Plan Goal",
            "type": "explicit"
          },
          {
            "name": "_Actual/Plan Status",
            "type": "explicit"
          },
          {
            "name": "Var Plan %",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "7 measure(s) bound",
          "axes": "9 dimension(s) mapped"
        }
      },
      {
        "id": "pg_4",
        "name": "Plan Variance Analysis",
        "visualType": "clusteredColumnChart",
        "dimensions": [
          "Month",
          "IT Sub Area",
          "Country/Region",
          "Sales Region",
          "IT Area",
          "Business Area"
        ],
        "measures": [
          {
            "name": "Var Plan %",
            "type": "explicit"
          },
          {
            "name": "Var LE1 %",
            "type": "explicit"
          },
          {
            "name": "Var LE2 %",
            "type": "explicit"
          },
          {
            "name": "Var LE3 %",
            "type": "explicit"
          },
          {
            "name": "Var Plan",
            "type": "explicit"
          },
          {
            "name": "Var Plan",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "9 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Actual Spend",
        "homeTable": "Fact",
        "expression": "SUM(Fact[Actual])",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend",
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_2",
        "name": "Planned Spend",
        "homeTable": "Fact",
        "expression": "SUM(Fact[Plan])",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend",
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_3",
        "name": "Var Plan %",
        "homeTable": "Fact",
        "expression": "DIVIDE(SUM(Fact[Actual]) - SUM(Fact[Plan]), SUM(Fact[Plan]), 0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_4",
        "name": "Var Plan",
        "homeTable": "Fact",
        "expression": "SUM(Fact[Actual]) - SUM(Fact[Plan])",
        "formatString": "$#,##0",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_5",
        "name": "Amount",
        "homeTable": "Fact",
        "expression": "SUM(Fact[Amount])",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_6",
        "name": "_Actual/Plan Goal",
        "homeTable": "Fact",
        "expression": "IF([Var Plan %] <= 0, 1, 0)",
        "formatString": "0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_7",
        "name": "_Actual/Plan Status",
        "homeTable": "Fact",
        "expression": "SWITCH(TRUE(), [Var Plan %] <= 0, 1, [Var Plan %] <= 0.05, 0, -1)",
        "formatString": "0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_8",
        "name": "Var LE1 %",
        "homeTable": "Fact",
        "expression": "DIVIDE(SUM(Fact[Actual]) - SUM(Fact[LE1]), SUM(Fact[LE1]), 0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_9",
        "name": "Var LE2 %",
        "homeTable": "Fact",
        "expression": "DIVIDE(SUM(Fact[Actual]) - SUM(Fact[LE2]), SUM(Fact[LE2]), 0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_10",
        "name": "Var LE3 %",
        "homeTable": "Fact",
        "expression": "DIVIDE(SUM(Fact[Actual]) - SUM(Fact[LE3]), SUM(Fact[LE3]), 0)",
        "formatString": "0.0%",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_11",
        "name": "YTD Actual Spend",
        "homeTable": "Fact",
        "expression": "TOTALYTD(SUM(Fact[Actual]), 'Calendar'[Date])",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_12",
        "name": "YTD Planned Spend",
        "homeTable": "Fact",
        "expression": "TOTALYTD(SUM(Fact[Plan]), 'Calendar'[Date])",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_13",
        "name": "Monthly Spend Amount",
        "homeTable": "Fact",
        "expression": "CALCULATE(SUM(Fact[Amount]), ALLEXCEPT('Calendar', 'Calendar'[Month]))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_14",
        "name": "Spend by Cost Element",
        "homeTable": "Cost Element",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLEXCEPT('Cost Element', 'Cost Element'[Cost Element Group]))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_15",
        "name": "Variance Latest Estimates",
        "homeTable": "Fact",
        "expression": "SUM(Fact[Var LE3 %])",
        "formatString": "0.0%",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_16",
        "name": "Actual Spend by Region",
        "homeTable": "Sales Region",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLSELECTED('Sales Region'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_17",
        "name": "Planned Spend by Region",
        "homeTable": "Sales Region",
        "expression": "CALCULATE(SUM(Fact[Plan]), ALLSELECTED('Sales Region'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_18",
        "name": "Actual Spend by IT Area",
        "homeTable": "IT Area",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLSELECTED('IT Area'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_19",
        "name": "Planned Spend by IT Area",
        "homeTable": "IT Area",
        "expression": "CALCULATE(SUM(Fact[Plan]), ALLSELECTED('IT Area'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_20",
        "name": "Cost Element Group Spend",
        "homeTable": "Cost Element",
        "expression": "SUM(Fact[Amount])",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_21",
        "name": "Department Spend",
        "homeTable": "Department",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLSELECTED('Department'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_22",
        "name": "VP Spend",
        "homeTable": "Executive",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLSELECTED('Executive'))",
        "formatString": "$#,##0",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_23",
        "name": "Year",
        "homeTable": "Calendar",
        "expression": "YEAR('Calendar'[Date])",
        "formatString": "0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_24",
        "name": "MonthNo",
        "homeTable": "Calendar",
        "expression": "MONTH('Calendar'[Date])",
        "formatString": "0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_25",
        "name": "Month",
        "homeTable": "Calendar",
        "expression": "FORMAT('Calendar'[Date], \"MMMM\")",
        "formatString": "string",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_26",
        "name": "QuarterNo",
        "homeTable": "Calendar",
        "expression": "INT(('Calendar'[MonthNo] + 2) / 3)",
        "formatString": "0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_27",
        "name": "Quarter",
        "homeTable": "Calendar",
        "expression": "\"Qtr \" & 'Calendar'[QuarterNo]",
        "formatString": "string",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_28",
        "name": "Day",
        "homeTable": "Calendar",
        "expression": "DAY('Calendar'[Date])",
        "formatString": "0",
        "usedInPages": [
          "IT Spend Trend"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "Country Region",
        "displayName": "Country Region (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Country Region -> Model Context"
        ],
        "columns": [
          {
            "name": "Country/Region",
            "type": "TEXT"
          },
          {
            "name": "Sales Region",
            "type": "TEXT"
          }
        ],
        "sampleRows": [
          {
            "Country/Region": "United States",
            "Sales Region": "North America"
          },
          {
            "Country/Region": "United Kingdom",
            "Sales Region": "EMEA"
          },
          {
            "Country/Region": "Germany",
            "Sales Region": "EMEA"
          }
        ]
      },
      {
        "tableName": "Fact",
        "displayName": "Fact (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Fact -> Model Context"
        ],
        "columns": [
          {
            "name": "ID",
            "type": "INTEGER"
          },
          {
            "name": "Name",
            "type": "TEXT"
          },
          {
            "name": "Metric_Value",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "ID": 1001,
            "Name": "Hardware Infrastructure",
            "Metric_Value": 245000.0
          },
          {
            "ID": 1002,
            "Name": "Software Licensing",
            "Metric_Value": 189000.0
          },
          {
            "ID": 1003,
            "Name": "Cloud Services",
            "Metric_Value": 312000.0
          }
        ]
      },
      {
        "tableName": "Date",
        "displayName": "Date (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Date -> Model Context"
        ],
        "columns": [
          {
            "name": "Period",
            "type": "NUMERIC"
          },
          {
            "name": "Month",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Period": 202301,
            "Month": 1
          },
          {
            "Period": 202302,
            "Month": 2
          },
          {
            "Period": 202303,
            "Month": 3
          }
        ]
      },
      {
        "tableName": "IT Area",
        "displayName": "IT Area (Semantic Model)",
        "rowCount": 45600,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "IT Area -> Model Context"
        ],
        "columns": [
          {
            "name": "IT Sub Area",
            "type": "NUMERIC"
          },
          {
            "name": "IT Area",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "IT Sub Area": 101,
            "IT Area": 10
          },
          {
            "IT Sub Area": 102,
            "IT Area": 10
          },
          {
            "IT Sub Area": 201,
            "IT Area": 20
          }
        ]
      },
      {
        "tableName": "Business Area",
        "displayName": "Business Area (Semantic Model)",
        "rowCount": 54800,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Business Area -> Model Context"
        ],
        "columns": [
          {
            "name": "Business Area",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Business Area": 1
          },
          {
            "Business Area": 2
          },
          {
            "Business Area": 3
          }
        ]
      },
      {
        "tableName": "Scenario",
        "displayName": "Scenario (Semantic Model)",
        "rowCount": 64000,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Scenario -> Model Context"
        ],
        "columns": [
          {
            "name": "Scenario",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Scenario": 1
          },
          {
            "Scenario": 2
          },
          {
            "Scenario": 3
          }
        ]
      },
      {
        "tableName": "Cost Element",
        "displayName": "Cost Element (Semantic Model)",
        "rowCount": 73200,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Cost Element -> Model Context"
        ],
        "columns": [
          {
            "name": "Cost Element Group",
            "type": "NUMERIC"
          },
          {
            "name": "Cost element name",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Cost Element Group": 10,
            "Cost element name": 101
          },
          {
            "Cost Element Group": 10,
            "Cost element name": 102
          },
          {
            "Cost Element Group": 20,
            "Cost element name": 201
          }
        ]
      },
      {
        "tableName": "Department",
        "displayName": "Department (Semantic Model)",
        "rowCount": 82400,
        "source": "Power Query (IT Spend Analysis Sample PBIX.pbix)",
        "relationships": [
          "Department -> Model Context"
        ],
        "columns": [
          {
            "name": "VP",
            "type": "NUMERIC"
          },
          {
            "name": "Department",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "VP": 1,
            "Department": 101
          },
          {
            "VP": 2,
            "Department": 102
          },
          {
            "VP": 3,
            "Department": 103
          }
        ]
      }
    ]
  },
  "f3": {
    "summary": {
      "totalPages": 18,
      "totalVisuals": 166,
      "totalTables": 16,
      "totalDAXMeasures": 73,
      "totalKpis": 198
    },
    "kpis": [
      {
            "id": "kpi_1",
            "name": "Sales Amount by Product Category",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_2",
            "name": "Sales Amount by Product",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_3",
            "name": "Sales Amount by Segment",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_4",
            "name": "Net Sales by Location",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_5",
            "name": "Return Rate",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Net Sales \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_6",
            "name": "Returns by Location",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Net Sales \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_7",
            "name": "WIF Sales",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Net Sales \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_8",
            "name": "WIF Total Profit",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Net Sales \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_9",
            "name": "WIF Total Forecast",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Net Sales \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_10",
            "name": "Units Sold",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Net Sales \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_11",
            "name": "Units Returned",
            "page": "Net Sales",
            "category": "Net Sales",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Net Sales \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_12",
            "name": "Sales Amount by Product Category",
            "page": "Returns",
            "category": "Returns",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_13",
            "name": "Sales Amount by Product",
            "page": "Returns",
            "category": "Returns",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_14",
            "name": "Sales Amount by Segment",
            "page": "Returns",
            "category": "Returns",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_15",
            "name": "Net Sales by Location",
            "page": "Returns",
            "category": "Returns",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Returns \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_16",
            "name": "Return Rate",
            "page": "Returns",
            "category": "Returns",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Returns \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_17",
            "name": "Returns by Location",
            "page": "Returns",
            "category": "Returns",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_18",
            "name": "WIF Sales",
            "page": "Returns",
            "category": "Returns",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Returns \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_19",
            "name": "WIF Total Profit",
            "page": "Returns",
            "category": "Returns",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Returns \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_20",
            "name": "WIF Total Forecast",
            "page": "Returns",
            "category": "Returns",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Returns \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_21",
            "name": "Units Sold",
            "page": "Returns",
            "category": "Returns",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Returns \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_22",
            "name": "Units Returned",
            "page": "Returns",
            "category": "Returns",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Returns \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_23",
            "name": "Sales Amount by Product Category",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Return Rate \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_24",
            "name": "Sales Amount by Product",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Return Rate \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_25",
            "name": "Sales Amount by Segment",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Return Rate \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_26",
            "name": "Net Sales by Location",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Return Rate \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_27",
            "name": "Return Rate",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_28",
            "name": "Returns by Location",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Return Rate \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_29",
            "name": "WIF Sales",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Return Rate \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_30",
            "name": "WIF Total Profit",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Return Rate \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_31",
            "name": "WIF Total Forecast",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Return Rate \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_32",
            "name": "Units Sold",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Return Rate \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_33",
            "name": "Units Returned",
            "page": "Return Rate",
            "category": "Return Rate",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Return Rate \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_34",
            "name": "Sales Amount by Product Category",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Market Basket Analysis \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_35",
            "name": "Sales Amount by Product",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Market Basket Analysis \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_36",
            "name": "Sales Amount by Segment",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Market Basket Analysis \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_37",
            "name": "Net Sales by Location",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Market Basket Analysis \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_38",
            "name": "Return Rate",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Market Basket Analysis \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_39",
            "name": "Returns by Location",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Market Basket Analysis \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_40",
            "name": "WIF Sales",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Market Basket Analysis \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_41",
            "name": "WIF Total Profit",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Market Basket Analysis \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_42",
            "name": "WIF Total Forecast",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Market Basket Analysis \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_43",
            "name": "Units Sold",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Market Basket Analysis \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_44",
            "name": "Units Returned",
            "page": "Market Basket Analysis",
            "category": "Market Basket Analysis",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Market Basket Analysis \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_45",
            "name": "Sales Amount by Product Category",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "CathegoryBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_46",
            "name": "Sales Amount by Product",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "CathegoryBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_47",
            "name": "Sales Amount by Segment",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "CathegoryBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_48",
            "name": "Net Sales by Location",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "CathegoryBreackdown \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_49",
            "name": "Return Rate",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "CathegoryBreackdown \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_50",
            "name": "Returns by Location",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "CathegoryBreackdown \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_51",
            "name": "WIF Sales",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "CathegoryBreackdown \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_52",
            "name": "WIF Total Profit",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "CathegoryBreackdown \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_53",
            "name": "WIF Total Forecast",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "CathegoryBreackdown \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_54",
            "name": "Units Sold",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "CathegoryBreackdown \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_55",
            "name": "Units Returned",
            "page": "CathegoryBreackdown",
            "category": "CathegoryBreackdown",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "CathegoryBreackdown \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_56",
            "name": "Sales Amount by Product Category",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "KeyInfluencers \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_57",
            "name": "Sales Amount by Product",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "KeyInfluencers \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_58",
            "name": "Sales Amount by Segment",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "KeyInfluencers \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_59",
            "name": "Net Sales by Location",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "KeyInfluencers \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_60",
            "name": "Return Rate",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "KeyInfluencers \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_61",
            "name": "Returns by Location",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "KeyInfluencers \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_62",
            "name": "WIF Sales",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "KeyInfluencers \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_63",
            "name": "WIF Total Profit",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "KeyInfluencers \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_64",
            "name": "WIF Total Forecast",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "KeyInfluencers \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_65",
            "name": "Units Sold",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "KeyInfluencers \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_66",
            "name": "Units Returned",
            "page": "KeyInfluencers",
            "category": "KeyInfluencers",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "KeyInfluencers \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_67",
            "name": "Sales Amount by Product Category",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "StoreBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_68",
            "name": "Sales Amount by Product",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "StoreBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_69",
            "name": "Sales Amount by Segment",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "StoreBreackdown \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_70",
            "name": "Net Sales by Location",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "StoreBreackdown \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_71",
            "name": "Return Rate",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "StoreBreackdown \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_72",
            "name": "Returns by Location",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "StoreBreackdown \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_73",
            "name": "WIF Sales",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "StoreBreackdown \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_74",
            "name": "WIF Total Profit",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "StoreBreackdown \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_75",
            "name": "WIF Total Forecast",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "StoreBreackdown \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_76",
            "name": "Units Sold",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "StoreBreackdown \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_77",
            "name": "Units Returned",
            "page": "StoreBreackdown",
            "category": "StoreBreackdown",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "StoreBreackdown \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_78",
            "name": "Sales Amount by Product Category",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "NetSales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_79",
            "name": "Sales Amount by Product",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "NetSales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_80",
            "name": "Sales Amount by Segment",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "NetSales \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_81",
            "name": "Net Sales by Location",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "NetSales \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_82",
            "name": "Return Rate",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "NetSales \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_83",
            "name": "Returns by Location",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "NetSales \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_84",
            "name": "WIF Sales",
            "page": "NetSales",
            "category": "NetSales",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "NetSales \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_85",
            "name": "WIF Total Profit",
            "page": "NetSales",
            "category": "NetSales",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "NetSales \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_86",
            "name": "WIF Total Forecast",
            "page": "NetSales",
            "category": "NetSales",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "NetSales \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_87",
            "name": "Units Sold",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "NetSales \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_88",
            "name": "Units Returned",
            "page": "NetSales",
            "category": "NetSales",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "NetSales \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_89",
            "name": "Sales Amount by Product Category",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "WhatIf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_90",
            "name": "Sales Amount by Product",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "WhatIf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_91",
            "name": "Sales Amount by Segment",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "WhatIf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_92",
            "name": "Net Sales by Location",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "WhatIf \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_93",
            "name": "Return Rate",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "WhatIf \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_94",
            "name": "Returns by Location",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "WhatIf \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_95",
            "name": "WIF Sales",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "WhatIf \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_96",
            "name": "WIF Total Profit",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "WhatIf \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_97",
            "name": "WIF Total Forecast",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "WhatIf \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_98",
            "name": "Units Sold",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "WhatIf \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_99",
            "name": "Units Returned",
            "page": "WhatIf",
            "category": "WhatIf",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "WhatIf \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_100",
            "name": "Sales Amount by Product Category",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetCategory \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_101",
            "name": "Sales Amount by Product",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetCategory \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_102",
            "name": "Sales Amount by Segment",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetCategory \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_103",
            "name": "Net Sales by Location",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "RetCategory \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_104",
            "name": "Return Rate",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "RetCategory \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_105",
            "name": "Returns by Location",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "RetCategory \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_106",
            "name": "WIF Sales",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetCategory \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_107",
            "name": "WIF Total Profit",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetCategory \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_108",
            "name": "WIF Total Forecast",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "RetCategory \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_109",
            "name": "Units Sold",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "RetCategory \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_110",
            "name": "Units Returned",
            "page": "RetCategory",
            "category": "RetCategory",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "RetCategory \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_111",
            "name": "Sales Amount by Product Category",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetKeyInf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_112",
            "name": "Sales Amount by Product",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetKeyInf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_113",
            "name": "Sales Amount by Segment",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetKeyInf \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_114",
            "name": "Net Sales by Location",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "RetKeyInf \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_115",
            "name": "Return Rate",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "RetKeyInf \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_116",
            "name": "Returns by Location",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "RetKeyInf \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_117",
            "name": "WIF Sales",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetKeyInf \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_118",
            "name": "WIF Total Profit",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetKeyInf \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_119",
            "name": "WIF Total Forecast",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "RetKeyInf \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_120",
            "name": "Units Sold",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "RetKeyInf \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_121",
            "name": "Units Returned",
            "page": "RetKeyInf",
            "category": "RetKeyInf",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "RetKeyInf \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_122",
            "name": "Sales Amount by Product Category",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetStoreBre \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_123",
            "name": "Sales Amount by Product",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetStoreBre \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_124",
            "name": "Sales Amount by Segment",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "RetStoreBre \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_125",
            "name": "Net Sales by Location",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "RetStoreBre \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_126",
            "name": "Return Rate",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "RetStoreBre \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_127",
            "name": "Returns by Location",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "RetStoreBre \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_128",
            "name": "WIF Sales",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetStoreBre \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_129",
            "name": "WIF Total Profit",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "RetStoreBre \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_130",
            "name": "WIF Total Forecast",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "RetStoreBre \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_131",
            "name": "Units Sold",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "RetStoreBre \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_132",
            "name": "Units Returned",
            "page": "RetStoreBre",
            "category": "RetStoreBre",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "RetStoreBre \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_133",
            "name": "Sales Amount by Product Category",
            "page": "Legal",
            "category": "Legal",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Legal \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_134",
            "name": "Sales Amount by Product",
            "page": "Legal",
            "category": "Legal",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Legal \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_135",
            "name": "Sales Amount by Segment",
            "page": "Legal",
            "category": "Legal",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Legal \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_136",
            "name": "Net Sales by Location",
            "page": "Legal",
            "category": "Legal",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Legal \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_137",
            "name": "Return Rate",
            "page": "Legal",
            "category": "Legal",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Legal \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_138",
            "name": "Returns by Location",
            "page": "Legal",
            "category": "Legal",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Legal \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_139",
            "name": "WIF Sales",
            "page": "Legal",
            "category": "Legal",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Legal \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_140",
            "name": "WIF Total Profit",
            "page": "Legal",
            "category": "Legal",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Legal \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_141",
            "name": "WIF Total Forecast",
            "page": "Legal",
            "category": "Legal",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Legal \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_142",
            "name": "Units Sold",
            "page": "Legal",
            "category": "Legal",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Legal \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_143",
            "name": "Units Returned",
            "page": "Legal",
            "category": "Legal",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Legal \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_144",
            "name": "Sales Amount by Product Category",
            "page": "Intro",
            "category": "Intro",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Intro \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_145",
            "name": "Sales Amount by Product",
            "page": "Intro",
            "category": "Intro",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Intro \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_146",
            "name": "Sales Amount by Segment",
            "page": "Intro",
            "category": "Intro",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Intro \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_147",
            "name": "Net Sales by Location",
            "page": "Intro",
            "category": "Intro",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Intro \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_148",
            "name": "Return Rate",
            "page": "Intro",
            "category": "Intro",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Intro \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_149",
            "name": "Returns by Location",
            "page": "Intro",
            "category": "Intro",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Intro \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_150",
            "name": "WIF Sales",
            "page": "Intro",
            "category": "Intro",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Intro \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_151",
            "name": "WIF Total Profit",
            "page": "Intro",
            "category": "Intro",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Intro \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_152",
            "name": "WIF Total Forecast",
            "page": "Intro",
            "category": "Intro",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Intro \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_153",
            "name": "Units Sold",
            "page": "Intro",
            "category": "Intro",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Intro \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_154",
            "name": "Units Returned",
            "page": "Intro",
            "category": "Intro",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Intro \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_155",
            "name": "Sales Amount by Product Category",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_156",
            "name": "Sales Amount by Product",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_157",
            "name": "Sales Amount by Segment",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Net Sales Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_158",
            "name": "Net Sales by Location",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Net Sales Tooltip \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_159",
            "name": "Return Rate",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Net Sales Tooltip \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_160",
            "name": "Returns by Location",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Net Sales Tooltip \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_161",
            "name": "WIF Sales",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Net Sales Tooltip \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_162",
            "name": "WIF Total Profit",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Net Sales Tooltip \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_163",
            "name": "WIF Total Forecast",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Net Sales Tooltip \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_164",
            "name": "Units Sold",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Net Sales Tooltip \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_165",
            "name": "Units Returned",
            "page": "Net Sales Tooltip",
            "category": "Net Sales Tooltip",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Net Sales Tooltip \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_166",
            "name": "Sales Amount by Product Category",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_167",
            "name": "Sales Amount by Product",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_168",
            "name": "Sales Amount by Segment",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Returns Tooltip \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_169",
            "name": "Net Sales by Location",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Returns Tooltip \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_170",
            "name": "Return Rate",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Returns Tooltip \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_171",
            "name": "Returns by Location",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Returns Tooltip \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_172",
            "name": "WIF Sales",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Returns Tooltip \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_173",
            "name": "WIF Total Profit",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Returns Tooltip \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_174",
            "name": "WIF Total Forecast",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Returns Tooltip \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_175",
            "name": "Units Sold",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Returns Tooltip \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_176",
            "name": "Units Returned",
            "page": "Returns Tooltip",
            "category": "Returns Tooltip",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Returns Tooltip \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_177",
            "name": "Sales Amount by Product Category",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A1 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_178",
            "name": "Sales Amount by Product",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A1 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_179",
            "name": "Sales Amount by Segment",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A1 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_180",
            "name": "Net Sales by Location",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Q&A1 \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_181",
            "name": "Return Rate",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Q&A1 \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_182",
            "name": "Returns by Location",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Q&A1 \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_183",
            "name": "WIF Sales",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Q&A1 \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_184",
            "name": "WIF Total Profit",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Q&A1 \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_185",
            "name": "WIF Total Forecast",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Q&A1 \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_186",
            "name": "Units Sold",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Q&A1 \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_187",
            "name": "Units Returned",
            "page": "Q&A1",
            "category": "Q&A1",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Q&A1 \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned.",
            "confidence": "90%"
      },
      {
            "id": "kpi_188",
            "name": "Sales Amount by Product Category",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A2 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Category]'",
            "definition": "The total sales revenue generated for each product category.",
            "confidence": "95%"
      },
      {
            "id": "kpi_189",
            "name": "Sales Amount by Product",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A2 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Product]'",
            "definition": "The total sales revenue generated for each product.",
            "confidence": "95%"
      },
      {
            "id": "kpi_190",
            "name": "Sales Amount by Segment",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Category Breakdown worksheet, bar chart visualization",
            "evidence": "Q&A2 \u2022 Category Breakdown worksheet, bar chart visualization",
            "logic": "Sum of 'Sales[Amount]' grouped by 'Product[Segment]'",
            "definition": "The total sales revenue generated for each customer segment.",
            "confidence": "95%"
      },
      {
            "id": "kpi_191",
            "name": "Net Sales by Location",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Net Sales by Location worksheet, custom visual",
            "evidence": "Q&A2 \u2022 Net Sales by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Net Sales]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total net sales revenue generated at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_192",
            "name": "Return Rate",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Return Rate worksheet, card visualization",
            "evidence": "Q&A2 \u2022 Return Rate worksheet, card visualization",
            "logic": "Calculated as 'Analysis DAX[Return Rate]'",
            "definition": "The percentage of products returned relative to total sales.",
            "confidence": "95%"
      },
      {
            "id": "kpi_193",
            "name": "Returns by Location",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Returns by Location worksheet, custom visual",
            "evidence": "Q&A2 \u2022 Returns by Location worksheet, custom visual",
            "logic": "Sum of 'Analysis DAX[Returns]' plotted by 'Store[Latitude]' and 'Store[Longitude]'",
            "definition": "The total number of product returns at each store location.",
            "confidence": "90%"
      },
      {
            "id": "kpi_194",
            "name": "WIF Sales",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Q&A2 \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected sales under hypothetical scenarios using 'Analysis DAX[WIF Sales]'",
            "definition": "The forecasted sales revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_195",
            "name": "WIF Total Profit",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "What If Analysis Forecast worksheet, stacked column chart",
            "evidence": "Q&A2 \u2022 What If Analysis Forecast worksheet, stacked column chart",
            "logic": "Projected profit under hypothetical scenarios using 'Analysis DAX[WIF Total Profit]'",
            "definition": "The forecasted total profit under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_196",
            "name": "WIF Total Forecast",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "What If Analysis Forecast worksheet, line chart",
            "evidence": "Q&A2 \u2022 What If Analysis Forecast worksheet, line chart",
            "logic": "Projected total forecast using 'Analysis DAX[WIF Total Forecast]'",
            "definition": "The total forecasted revenue under a 'What If' scenario.",
            "confidence": "85%"
      },
      {
            "id": "kpi_197",
            "name": "Units Sold",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Units Sold worksheet, card visualization",
            "evidence": "Q&A2 \u2022 Units Sold worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Sold]'",
            "definition": "The total number of units sold.",
            "confidence": "90%"
      },
      {
            "id": "kpi_198",
            "name": "Units Returned",
            "page": "Q&A2",
            "category": "Q&A2",
            "source": "Units Returned worksheet, card visualization",
            "evidence": "Q&A2 \u2022 Units Returned worksheet, card visualization",
            "logic": "Sum of 'Analysis DAX[Units Returned]'",
            "definition": "The total number of units returned. Analyzing Sales & Returns Sample v3.pbix",
            "confidence": "90%"
      }
],
    "pages": [
      {
        "id": "pg_1",
        "name": "Legal",
        "visualType": "Card / Clustered Bar",
        "dimensions": [
          "Dimension"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "0 dimension(s) mapped"
        }
      },
      {
        "id": "pg_2",
        "name": "Intro",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "Design Factor",
          "Topic"
        ],
        "measures": [
          {
            "name": "Info Tooltip",
            "type": "explicit"
          },
          {
            "name": "Info Tooltip 2",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "2 measure(s) bound",
          "axes": "2 dimension(s) mapped"
        }
      },
      {
        "id": "pg_3",
        "name": "Net Sales",
        "visualType": "card",
        "dimensions": [
          "Product",
          "Segment",
          "Promotion",
          "Unit",
          "Type",
          "Latitude"
        ],
        "measures": [
          {
            "name": "Net Sales",
            "type": "explicit"
          },
          {
            "name": "Units Sold",
            "type": "explicit"
          },
          {
            "name": "Net Sales",
            "type": "explicit"
          },
          {
            "name": "Units Sold",
            "type": "explicit"
          },
          {
            "name": "Net Sales",
            "type": "explicit"
          },
          {
            "name": "Net Sales",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "7 measure(s) bound",
          "axes": "12 dimension(s) mapped"
        }
      },
      {
        "id": "pg_4",
        "name": "Returns",
        "visualType": "card",
        "dimensions": [
          "Product",
          "Segment",
          "Type",
          "Status",
          "Dates",
          "Age"
        ],
        "measures": [
          {
            "name": "Returns",
            "type": "explicit"
          },
          {
            "name": "Returns",
            "type": "explicit"
          },
          {
            "name": "Returns",
            "type": "explicit"
          },
          {
            "name": "Units Returned",
            "type": "explicit"
          },
          {
            "name": "Returns",
            "type": "explicit"
          },
          {
            "name": "Units Returned",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "9 measure(s) bound",
          "axes": "13 dimension(s) mapped"
        }
      },
      {
        "id": "pg_5",
        "name": "Return Rate",
        "visualType": "card",
        "dimensions": [
          "Category Image",
          "Date",
          "Type",
          "Latitude",
          "Longitude",
          "Product Image"
        ],
        "measures": [
          {
            "name": "Net Sales",
            "type": "explicit"
          },
          {
            "name": "WIF Profit",
            "type": "explicit"
          },
          {
            "name": "WIF Forecast",
            "type": "explicit"
          },
          {
            "name": "Return Rate",
            "type": "explicit"
          },
          {
            "name": "WIF Total Forecast",
            "type": "explicit"
          },
          {
            "name": "WIF Forecast",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "11 measure(s) bound",
          "axes": "8 dimension(s) mapped"
        }
      },
      {
        "id": "pg_6",
        "name": "Market Basket Analysis",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "RuleID",
          "Category Image",
          "Segmented by",
          "Product",
          "Product Image",
          "URL"
        ],
        "measures": [
          {
            "name": "Lift Label",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "1 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      },
      {
        "id": "pg_7",
        "name": "Net Sales Tooltip",
        "visualType": "simpleImageEBC4593F96F1425FB3D84C5BF02B5075",
        "dimensions": [
          "Category Image",
          "Product Image"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "2 dimension(s) mapped"
        }
      },
      {
        "id": "pg_8",
        "name": "Returns Tooltip",
        "visualType": "simpleImageEBC4593F96F1425FB3D84C5BF02B5075",
        "dimensions": [
          "Category Image",
          "Product Image"
        ],
        "measures": [
          {
            "name": "Returns",
            "type": "explicit"
          },
          {
            "name": "Return Rate",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "2 measure(s) bound",
          "axes": "2 dimension(s) mapped"
        }
      },
      {
        "id": "pg_9",
        "name": "CathegoryBreackdown",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_10",
        "name": "KeyInfluencers",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_11",
        "name": "StoreBreackdown",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_12",
        "name": "NetSales",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_13",
        "name": "WhatIf",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_14",
        "name": "RetCategory",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_15",
        "name": "RetKeyInf",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_16",
        "name": "RetStoreBre",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_17",
        "name": "Q&A1",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_18",
        "name": "Q&A2",
        "visualType": "PBI_CV_885EF3C3_31C1_4745_B2B9_20771D5AD196",
        "dimensions": [
          "URL"
        ],
        "measures": [
          {
            "name": "Measure",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "0 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Net Sales",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE(SUM(Sales.Amount),Sales.Status=\"Sold\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "Product Top N",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "SWITCH(\n    TRUE(),\n    ISINSCOPE(Product.Product),\n    RANKX(ALL(Product.Product),[Net Sales],,DESC),\n    ISINSCOPE(Product.Segment),\n    RANKX(ALL(Product.Segment),[Net Sales],,DESC),\n    RANKX(ALL(Product.Category),[Net Sales],,DESC)\n)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "Product Sales Top 3",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([Product Top N]<4,[Net Sales],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Product Sales Other",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([Product Top N]>3,[Net Sales],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "Net Sales PM",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Net Sales],PREVIOUSMONTH(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "Last 2 Months Net Sales",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[Net Sales]+[Net Sales PM]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_7",
        "name": "Store Top N",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "RANKX(ALL(Store.Store),[Net Sales],,DESC)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_8",
        "name": "Store Sales Other",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([Store Top N]>3,[Net Sales],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_9",
        "name": "Store Sales Top 3",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([Store Top N]<4,[Net Sales],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_10",
        "name": "Net Sales Variance",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[Net Sales]-[Net Sales PM]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_11",
        "name": "Net Sales Variance %",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([Net Sales],[Net Sales PM],0)-1",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_12",
        "name": "Net Sales Indicator",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(IF([Net Sales Variance %]<=0,\"\",\"+\"),FORMAT([Net Sales Variance %],\"0.0%\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_13",
        "name": "Units Sold",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE(SUM(Sales.Unit),Sales.Status=\"Sold\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_14",
        "name": "Units Sold PM",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Units Sold],PREVIOUSMONTH(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_15",
        "name": "Units Sold Variance %",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([Units Sold],[Units Sold PM],0)-1",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_16",
        "name": "Units Sold Indicator",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(IF([Units Sold Variance %]<=0,\"\",\"+\"),FORMAT([Units Sold Variance %],\"0.0%\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_17",
        "name": "Returns",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE(SUM(Sales.Amount),Sales.Status=\"Returned\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_18",
        "name": "Returns PM",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Returns],PREVIOUSMONTH(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_19",
        "name": "Last 2 Months Returns",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[Returns]+[Returns PM]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_20",
        "name": "Returns Variance",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[Returns]-[Returns PM]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_21",
        "name": "Returns Variance %",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "(DIVIDE([Returns],[Returns PM],0)-1)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_22",
        "name": "Units Returned",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE(SUM(Sales.Unit),Sales.Status=\"Returned\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_23",
        "name": "Units Returned PM",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Units Returned],PREVIOUSMONTH(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_24",
        "name": "Units Returned Variance %",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([Units Returned],[Units Returned PM],0)-1",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_25",
        "name": "Returns Indicator",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(IF([Returns Variance %]<=0,\"\",\"+\"),FORMAT([Returns Variance %],\"0.0%\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_26",
        "name": "ProductR Top N",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "SWITCH(\n    TRUE(),\n    ISINSCOPE(Product.Product),\n    RANKX(ALL(Product.Product),[Returns],,DESC),\n    ISINSCOPE(Product.Segment),\n    RANKX(ALL(Product.Segment),[Returns],,DESC),\n    RANKX(ALL(Product.Category),[Returns],,DESC)\n)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_27",
        "name": "Product Returns Other",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([ProductR Top N]>3,[Returns],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_28",
        "name": "Product Returns Top 3",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([ProductR Top N]<4,[Returns],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_29",
        "name": "StoreR Top N",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "RANKX(ALL(Store.Store),[Returns],,DESC)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_30",
        "name": "Store Returns Other",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([StoreR Top N]>3,[Returns],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_31",
        "name": "Returns Sales Top 3",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([StoreR Top N]<4,[Returns],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_32",
        "name": "Units Returned Indicator",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(IF([Returns Variance %]<=0,\"\",\"+\"),FORMAT([Returns Variance %],\"0.0%\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_33",
        "name": "Return Rate",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE((ROUND(((DIVIDE([Returns],SUM(Sales.Amount),0))*100),0)),100,0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_34",
        "name": "% Return Rate Value",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "SELECTEDVALUE(% Return Rate.% Return Rate)/100",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_35",
        "name": "WIF Units Returned",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([Units Returned]-[WIF Units Returned Average]<0,0,[Units Returned]-[WIF Units Returned Average])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_36",
        "name": "WIF Units Returned Average",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([WIF Units Returned Difference],CALCULATE(DISTINCTCOUNT(Calendar.Date), ALL('Calendar')),0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_37",
        "name": "WIF Units Returned Difference",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[WIF Units Returned_1]-[WIF Units Returned_2]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_38",
        "name": "WIF Units Returned_1",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Units Returned], ALLSELECTED(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_39",
        "name": "WIF Units Returned_2",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([WIF Adjusted Units Returned], ALLSELECTED(Calendar.Date))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_40",
        "name": "WIF Adjusted Units Returned",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE((SUM(Sales.Unit)*% Return Rate.% Return Rate Value),1,0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_41",
        "name": "WIF Adjusted Net Sales",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "(SUM(Sales.Unit)*[WIF Price per Unit])-DIVIDE((SUM(Sales.Unit)*% Return Rate.% Return Rate Value),1,0)*[WIF Price per Unit]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_42",
        "name": "WIF Price per Unit",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([Net Sales],[Units Sold],0)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_43",
        "name": "WIF Profit",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([WIF Same]=0,0,IF(ROUNDDOWN([WIF Adjusted Net Sales]-[Net Sales],0)<0,0,ROUNDDOWN([WIF Adjusted Net Sales]-[Net Sales],0)))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_44",
        "name": "Profit Difference",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([WIF Adjusted Sales],[Net Sales],0)-1",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_45",
        "name": "WIF Adjusted Sales",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[WIF Units Returned_1]*[WIF Price per Unit]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_46",
        "name": "WIF Sales",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([Net Sales],ALL(Calendar.Date.[Month]))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_47",
        "name": "WIF Same",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "IF([% Return Rate Value]>=CALCULATE([Return Rate],ALL(Store.Type),ALL(Store.Store)),0,1)",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_48",
        "name": "WIF Forecast",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "[Net Sales]+[WIF Profit]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_49",
        "name": "WIF Total Forecast",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([WIF Forecast],ALL(Calendar.Date.[Month]))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_50",
        "name": "WIF Total Profit",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CALCULATE([WIF Profit],ALL(Calendar.Date.[Month]))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_51",
        "name": "Net Sales Label",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(\"\",FORMAT([Net Sales],\"$0,000\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_52",
        "name": "WIF Profit Difference",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DIVIDE([WIF Forecast],[Net Sales],0)-1",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_53",
        "name": "Profit Indicator",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(IF([WIF Profit Difference]<=0,\"\",\"+\"),FORMAT([WIF Profit Difference],\"0.0%\"))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_54",
        "name": "Total Return Rate",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "Total Return Rate",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_55",
        "name": "CALCULATE([Return Rate],ALL(Calendar.Date.[Month]))",
        "homeTable": "Association",
        "expression": "Live Cloud Dataset (32526d1d...)\nVALUE(CONCATENATE([Product Top N],(SUM(Association.Importance))))",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_56",
        "name": "Info Tooltip",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "\"https://imagizer.imageshack.com/img923/4052/lLHy3U.gif\"",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_57",
        "name": "Lift Label",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "CONCATENATE(FORMAT(SUM(Association.Importance),\"0.0\"),\"x\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_58",
        "name": "Info Tooltip 2",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "\"https://imagizer.imageshack.com/img921/2483/uMs9ZQ.gif\"",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_59",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_60",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_61",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_62",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_63",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (32526d1d...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_64",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_65",
        "name": "Year",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "YEAR([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_66",
        "name": "MonthNo",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "MONTH([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_67",
        "name": "Month",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "FORMAT([Date], \"MMMM\")",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_68",
        "name": "QuarterNo",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "QuarterNo",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_69",
        "name": "INT(([MonthNo] + 2) / 3)",
        "homeTable": "Quarter",
        "expression": "Live Cloud Dataset (32526d1d...)\n\"Qtr \" & [QuarterNo]",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_70",
        "name": "Day",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "DAY([Date])",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_71",
        "name": "Empty",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "\"\"",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_72",
        "name": "Empty",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "\" \"",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      },
      {
        "id": "dax_73",
        "name": "Segmented by",
        "homeTable": "Live Cloud Dataset (32526d1d...)",
        "expression": "\"#ffffff\"\n\n-----",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Overview"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "Details",
        "displayName": "Details (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Details -> Model Context"
        ],
        "columns": [
          {
            "name": "Design Factor",
            "type": "NUMERIC"
          },
          {
            "name": "Topic",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Design Factor": 1.25,
            "Topic": 101
          },
          {
            "Design Factor": 0.95,
            "Topic": 102
          },
          {
            "Design Factor": 1.1,
            "Topic": 103
          }
        ]
      },
      {
        "tableName": "Product",
        "displayName": "Product (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Product -> Model Context"
        ],
        "columns": [
          {
            "name": "Category Image",
            "type": "TEXT"
          },
          {
            "name": "Product",
            "type": "NUMERIC"
          },
          {
            "name": "Segment",
            "type": "NUMERIC"
          },
          {
            "name": "Category",
            "type": "TEXT"
          },
          {
            "name": "Product Image",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Category Image": "https://assets.store.com/cat1.png",
            "Product": 101,
            "Segment": 1,
            "Category": "Monitors",
            "Product Image": 1001
          },
          {
            "Category Image": "https://assets.store.com/cat2.png",
            "Product": 102,
            "Segment": 2,
            "Category": "Peripherals",
            "Product Image": 1002
          },
          {
            "Category Image": "https://assets.store.com/cat3.png",
            "Product": 103,
            "Segment": 1,
            "Category": "Office",
            "Product Image": 1003
          }
        ]
      },
      {
        "tableName": "Sales",
        "displayName": "Sales (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Sales -> Model Context"
        ],
        "columns": [
          {
            "name": "Status",
            "type": "NUMERIC"
          },
          {
            "name": "Dates",
            "type": "NUMERIC"
          },
          {
            "name": "Date",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Status": 1,
            "Dates": 20230501,
            "Date": 20230501
          },
          {
            "Status": 1,
            "Dates": 20230502,
            "Date": 20230502
          },
          {
            "Status": 2,
            "Dates": 20230503,
            "Date": 20230503
          }
        ]
      },
      {
        "tableName": "Analysis DAX",
        "displayName": "Analysis DAX (Semantic Model)",
        "rowCount": 45600,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Analysis DAX -> Model Context"
        ],
        "columns": [
          {
            "name": "ID",
            "type": "INTEGER"
          },
          {
            "name": "Name",
            "type": "TEXT"
          },
          {
            "name": "Metric_Value",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "ID": 301,
            "Name": "Total Sales Amount",
            "Metric_Value": 892400.0
          },
          {
            "ID": 302,
            "Name": "Total Return Amount",
            "Metric_Value": 42100.0
          },
          {
            "ID": 303,
            "Name": "Return Rate %",
            "Metric_Value": 4.72
          }
        ]
      },
      {
        "tableName": "Store",
        "displayName": "Store (Semantic Model)",
        "rowCount": 54800,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Store -> Model Context"
        ],
        "columns": [
          {
            "name": "Latitude",
            "type": "NUMERIC"
          },
          {
            "name": "Store",
            "type": "NUMERIC"
          },
          {
            "name": "Longitude",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Latitude": 40.7128,
            "Store": 101,
            "Longitude": -74.006
          },
          {
            "Latitude": 34.0522,
            "Store": 102,
            "Longitude": -118.2437
          },
          {
            "Latitude": 41.8781,
            "Store": 103,
            "Longitude": -87.6298
          }
        ]
      },
      {
        "tableName": "Customer",
        "displayName": "Customer (Semantic Model)",
        "rowCount": 64000,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Customer -> Model Context"
        ],
        "columns": [
          {
            "name": "Type",
            "type": "TEXT"
          },
          {
            "name": "Segment",
            "type": "NUMERIC"
          },
          {
            "name": "Promotion",
            "type": "NUMERIC"
          },
          {
            "name": "Unit",
            "type": "NUMERIC"
          },
          {
            "name": "Product",
            "type": "NUMERIC"
          },
          {
            "name": "Age",
            "type": "NUMERIC"
          },
          {
            "name": "Price Range",
            "type": "NUMERIC"
          },
          {
            "name": "Category",
            "type": "TEXT"
          }
        ],
        "sampleRows": [
          {
            "Type": "Loyalty Member",
            "Segment": 1,
            "Promotion": 10,
            "Unit": 2,
            "Product": 101,
            "Age": 34,
            "Price Range": 2,
            "Category": "Monitors"
          },
          {
            "Type": "New Customer",
            "Segment": 3,
            "Promotion": 15,
            "Unit": 1,
            "Product": 102,
            "Age": 28,
            "Price Range": 1,
            "Category": "Peripherals"
          },
          {
            "Type": "Repeat Customer",
            "Segment": 2,
            "Promotion": 0,
            "Unit": 1,
            "Product": 103,
            "Age": 45,
            "Price Range": 2,
            "Category": "Office"
          }
        ]
      },
      {
        "tableName": "Calendar",
        "displayName": "Calendar (Semantic Model)",
        "rowCount": 73200,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Calendar -> Model Context"
        ],
        "columns": [
          {
            "name": "Date",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Date": 20230101
          },
          {
            "Date": 20230102
          },
          {
            "Date": 20230103
          }
        ]
      },
      {
        "tableName": "% Return Rate",
        "displayName": "% Return Rate (Semantic Model)",
        "rowCount": 82400,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "% Return Rate -> Model Context"
        ],
        "columns": [
          {
            "name": "% Return Rate",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "% Return Rate": 4.72
          },
          {
            "% Return Rate": 5.1
          },
          {
            "% Return Rate": 3.85
          }
        ]
      },
      {
        "tableName": "Association",
        "displayName": "Association (Semantic Model)",
        "rowCount": 91600,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Association -> Model Context"
        ],
        "columns": [
          {
            "name": "RuleID",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "RuleID": 101
          },
          {
            "RuleID": 102
          },
          {
            "RuleID": 103
          }
        ]
      },
      {
        "tableName": "Associated Product",
        "displayName": "Associated Product (Semantic Model)",
        "rowCount": 100800,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Associated Product -> Model Context"
        ],
        "columns": [
          {
            "name": "Product Image",
            "type": "NUMERIC"
          },
          {
            "name": "Segmented by",
            "type": "NUMERIC"
          },
          {
            "name": "Product",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Product Image": 1001,
            "Segmented by": 1,
            "Product": 101
          },
          {
            "Product Image": 1002,
            "Segmented by": 2,
            "Product": 102
          },
          {
            "Product Image": 1003,
            "Segmented by": 1,
            "Product": 103
          }
        ]
      },
      {
        "tableName": "Design DAX",
        "displayName": "Design DAX (Semantic Model)",
        "rowCount": 110000,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Design DAX -> Model Context"
        ],
        "columns": [
          {
            "name": "ID",
            "type": "INTEGER"
          },
          {
            "name": "Name",
            "type": "TEXT"
          },
          {
            "name": "Metric_Value",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "ID": 401,
            "Name": "Visual Color Scale",
            "Metric_Value": 1.0
          },
          {
            "ID": 402,
            "Name": "Dynamic Card Title",
            "Metric_Value": 1.0
          },
          {
            "ID": 403,
            "Name": "Conditional Format Indicator",
            "Metric_Value": 1.0
          }
        ]
      },
      {
        "tableName": "Tooltip Info",
        "displayName": "Tooltip Info (Semantic Model)",
        "rowCount": 119200,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Tooltip Info -> Model Context"
        ],
        "columns": [
          {
            "name": "URL",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "URL": 1
          },
          {
            "URL": 2
          },
          {
            "URL": 3
          }
        ]
      },
      {
        "tableName": "Tooltip Info2",
        "displayName": "Tooltip Info2 (Semantic Model)",
        "rowCount": 128400,
        "source": "Power Query (Sales & Returns Sample v3.pbix)",
        "relationships": [
          "Tooltip Info2 -> Model Context"
        ],
        "columns": [
          {
            "name": "URL",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "URL": 1
          },
          {
            "URL": 2
          },
          {
            "URL": 3
          }
        ]
      }
    ]
  },
  "f2": {
    "summary": {
      "totalPages": 5,
      "totalVisuals": 26,
      "totalTables": 5,
      "totalDAXMeasures": 11,
      "totalKpis": 7
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Physical Branch Volume",
        "evidence": "Store Sales Overview \u2022 Store Sales",
        "logic": "SUM(Sales[Amount])",
        "definition": "Total sales amount generated through physical store branches."
      },
      {
        "id": "kpi_2",
        "name": "Walk-in Quotes",
        "evidence": "Store Sales Overview \u2022 Walk-in Traffic",
        "logic": "COUNT(Store[WalkInQuotes])",
        "definition": "Number of insurance quotation inquiries initiated in-store."
      },
      {
        "id": "kpi_3",
        "name": "Over-the-Counter Binds",
        "evidence": "Store Sales Overview \u2022 In-Store Conversions",
        "logic": "SUM(Sales[Binds])",
        "definition": "Total bound insurance policies executed at branch locations."
      },
      {
        "id": "kpi_4",
        "name": "Staff Productivity Score",
        "evidence": "District Monthly Sales \u2022 Regional Performance",
        "logic": "DIVIDE([Net Sales], [Staff Count], 0)",
        "definition": "Average production and revenue output per branch employee."
      },
      {
        "id": "kpi_5",
        "name": "Branch Profitability",
        "evidence": "District Monthly Sales \u2022 Store Profit",
        "logic": "[Net Sales] - [Operating Expenses]",
        "definition": "Operating margin and net profitability per physical branch."
      },
      {
        "id": "kpi_6",
        "name": "Local Market Share %",
        "evidence": "District Monthly Sales \u2022 Territory Penetration",
        "logic": "DIVIDE([Store Sales], [Total Regional Sales], 0)",
        "definition": "Percentage of regional insurance sales captured by the store."
      },
      {
        "id": "kpi_7",
        "name": "Customer Wait Time",
        "evidence": "New Stores \u2022 Service Quality",
        "logic": "AVERAGE(Service[WaitMinutes])",
        "definition": "Average minutes customers wait before receiving branch assistance."
      }
    ],
    "pages": [
      {
        "id": "pg_1",
        "name": "Store Sales Overview",
        "visualType": "azureMap",
        "dimensions": [
          "District",
          "FiscalMonth",
          "Chain",
          "PostalCode",
          "StoreNumber",
          "Store Type"
        ],
        "measures": [
          {
            "name": "This Year Sales",
            "type": "explicit"
          },
          {
            "name": "Total Sales Var %",
            "type": "explicit"
          },
          {
            "name": "Sales Per Sq Ft",
            "type": "explicit"
          },
          {
            "name": "This Year Sales",
            "type": "explicit"
          },
          {
            "name": "Total Sales Var %",
            "type": "explicit"
          },
          {
            "name": "This Year Sales",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "10 measure(s) bound",
          "axes": "6 dimension(s) mapped"
        }
      },
      {
        "id": "pg_2",
        "name": "District Monthly Sales",
        "visualType": "scatterChart",
        "dimensions": [
          "FiscalMonth",
          "Chain",
          "Name",
          "Category"
        ],
        "measures": [
          {
            "name": "TotalSales",
            "type": "explicit"
          },
          {
            "name": "Last Year Sales",
            "type": "explicit"
          },
          {
            "name": "This Year Sales",
            "type": "explicit"
          },
          {
            "name": "Total Sales Variance %",
            "type": "explicit"
          },
          {
            "name": "Total Sales Variance %",
            "type": "explicit"
          },
          {
            "name": "Avg $/Unit TY",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "7 measure(s) bound",
          "axes": "4 dimension(s) mapped"
        }
      },
      {
        "id": "pg_3",
        "name": "New Stores",
        "visualType": "cardVisual",
        "dimensions": [
          "FiscalMonth",
          "Chain",
          "Name",
          "Buyer"
        ],
        "measures": [
          {
            "name": "Total Sales Variance %",
            "type": "explicit"
          },
          {
            "name": "Last Year Sales",
            "type": "explicit"
          },
          {
            "name": "This Year Sales",
            "type": "explicit"
          },
          {
            "name": "This Year Sales",
            "type": "explicit"
          },
          {
            "name": "Last Year Sales",
            "type": "explicit"
          },
          {
            "name": "Total Sales Var %",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "10 measure(s) bound",
          "axes": "4 dimension(s) mapped"
        }
      },
      {
        "id": "pg_4",
        "name": "Info Page",
        "visualType": "barChart",
        "dimensions": [
          "Category"
        ],
        "measures": [
          {
            "name": "TotalSales",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "1 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      },
      {
        "id": "pg_5",
        "name": "Tooltip",
        "visualType": "treemap",
        "dimensions": [
          "Name"
        ],
        "measures": [
          {
            "name": "TotalUnits",
            "type": "explicit"
          }
        ],
        "visualSlots": {
          "values": "1 measure(s) bound",
          "axes": "1 dimension(s) mapped"
        }
      }
    ],
    "daxMeasures": [
      {
        "id": "dax_1",
        "name": "Net Sales",
        "homeTable": "Sales",
        "expression": "CALCULATE(SUM(Sales.Amount), Sales.Status=\"Sold\")",
        "formatString": "$#,##0",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_2",
        "name": "Store Top N",
        "homeTable": "Store",
        "expression": "RANKX(ALL(Store.Store), [Net Sales],, DESC)",
        "formatString": "0",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_3",
        "name": "Store Sales Other",
        "homeTable": "Store",
        "expression": "IF([Store Top N]>3, [Net Sales], 0)",
        "formatString": "$#,##0",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Store Sales Top 3",
        "homeTable": "Store",
        "expression": "IF([Store Top N]<4, [Net Sales], 0)",
        "formatString": "$#,##0",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_5",
        "name": "Net Sales Variance",
        "homeTable": "Sales",
        "expression": "[Net Sales] - [Net Sales PM]",
        "formatString": "$#,##0",
        "usedInPages": [
          "District Monthly Sales"
        ]
      },
      {
        "id": "dax_6",
        "name": "Net Sales Variance %",
        "homeTable": "Sales",
        "expression": "DIVIDE([Net Sales], [Net Sales PM], 0) - 1",
        "formatString": "0.0%",
        "usedInPages": [
          "District Monthly Sales"
        ]
      },
      {
        "id": "dax_7",
        "name": "Net Sales Indicator",
        "homeTable": "Sales",
        "expression": "CONCATENATE(IF([Net Sales Variance %]<=0, \"\", \"+\"), FORMAT([Net Sales Variance %], \"0.0%\"))",
        "formatString": "string",
        "usedInPages": [
          "District Monthly Sales"
        ]
      },
      {
        "id": "dax_8",
        "name": "Units Sold",
        "homeTable": "Sales",
        "expression": "CALCULATE(SUM(Sales.Unit), Sales.Status=\"Sold\")",
        "formatString": "#,##0",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_9",
        "name": "Units Sold PM",
        "homeTable": "Sales",
        "expression": "CALCULATE([Units Sold], PREVIOUSMONTH(Calendar.Date))",
        "formatString": "#,##0",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_10",
        "name": "Units Sold Variance %",
        "homeTable": "Sales",
        "expression": "DIVIDE([Units Sold], [Units Sold PM], 0) - 1",
        "formatString": "0.0%",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_11",
        "name": "Units Sold Indicator",
        "homeTable": "Sales",
        "expression": "CONCATENATE(IF([Units Sold Variance %]<=0, \"\", \"+\"), FORMAT([Units Sold Variance %], \"0.0%\"))",
        "formatString": "string",
        "usedInPages": [
          "New Stores"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "Time",
        "displayName": "Time (Semantic Model)",
        "rowCount": 18000,
        "source": "Power Query (Store Sales.pbix)",
        "relationships": [
          "Time -> Model Context"
        ],
        "columns": [
          {
            "name": "FiscalMonth",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "FiscalMonth": 1
          },
          {
            "FiscalMonth": 2
          },
          {
            "FiscalMonth": 3
          }
        ]
      },
      {
        "tableName": "Sales",
        "displayName": "Sales (Semantic Model)",
        "rowCount": 27200,
        "source": "Power Query (Store Sales.pbix)",
        "relationships": [
          "Sales -> Model Context"
        ],
        "columns": [
          {
            "name": "ID",
            "type": "INTEGER"
          },
          {
            "name": "Name",
            "type": "TEXT"
          },
          {
            "name": "Metric_Value",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "ID": 501,
            "Name": "Gross Sales",
            "Metric_Value": 124500.5
          },
          {
            "ID": 502,
            "Name": "Discounts & Allowances",
            "Metric_Value": 14200.0
          },
          {
            "ID": 503,
            "Name": "Net Sales",
            "Metric_Value": 110300.5
          }
        ]
      },
      {
        "tableName": "District",
        "displayName": "District (Semantic Model)",
        "rowCount": 36400,
        "source": "Power Query (Store Sales.pbix)",
        "relationships": [
          "District -> Model Context"
        ],
        "columns": [
          {
            "name": "District",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "District": 1
          },
          {
            "District": 2
          },
          {
            "District": 3
          }
        ]
      },
      {
        "tableName": "Store",
        "displayName": "Store (Semantic Model)",
        "rowCount": 45600,
        "source": "Power Query (Store Sales.pbix)",
        "relationships": [
          "Store -> Model Context"
        ],
        "columns": [
          {
            "name": "Name",
            "type": "TEXT"
          },
          {
            "name": "Chain",
            "type": "NUMERIC"
          },
          {
            "name": "PostalCode",
            "type": "NUMERIC"
          },
          {
            "name": "StoreNumber",
            "type": "NUMERIC"
          },
          {
            "name": "Store Type",
            "type": "TEXT"
          }
        ],
        "sampleRows": [
          {
            "Name": "Store 101 - Main St",
            "Chain": 1,
            "PostalCode": 10001,
            "StoreNumber": 101,
            "Store Type": "Flagship"
          },
          {
            "Name": "Store 102 - West End",
            "Chain": 1,
            "PostalCode": 10025,
            "StoreNumber": 102,
            "Store Type": "Standard"
          },
          {
            "Name": "Store 103 - Airport Plaza",
            "Chain": 2,
            "PostalCode": 11430,
            "StoreNumber": 103,
            "Store Type": "Express"
          }
        ]
      },
      {
        "tableName": "Item",
        "displayName": "Item (Semantic Model)",
        "rowCount": 54800,
        "source": "Power Query (Store Sales.pbix)",
        "relationships": [
          "Item -> Model Context"
        ],
        "columns": [
          {
            "name": "Category",
            "type": "TEXT"
          },
          {
            "name": "Buyer",
            "type": "NUMERIC"
          }
        ],
        "sampleRows": [
          {
            "Category": "Electronics",
            "Buyer": 101
          },
          {
            "Category": "Apparel",
            "Buyer": 102
          },
          {
            "Category": "Home Goods",
            "Buyer": 103
          }
        ]
      }
    ]
  },
  "d8": {
    "summary": {
      "totalPages": 0,
      "totalVisuals": 0,
      "totalTables": 0,
      "totalDAXMeasures": 0,
      "totalKpis": 0
    },
    "kpis": [],
    "pages": [],
    "daxMeasures": [],
    "tables": []
  },
  "d10": {
    "summary": {
      "totalPages": 0,
      "totalVisuals": 0,
      "totalTables": 0,
      "totalDAXMeasures": 0,
      "totalKpis": 0
    },
    "kpis": [],
    "pages": [],
    "daxMeasures": [],
    "tables": []
  }
};
