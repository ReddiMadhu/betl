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
  formatString: string;
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

export interface PowerBIDetailData {
  summary: {
    totalPages: number;
    totalVisuals: number;
    totalTables: number;
    totalDAXMeasures: number;
  };
  pages: PageDetail[];
  daxMeasures: DAXMeasureDetail[];
  tables: SemanticTableDetail[];
}

export const POWERBI_DETAIL_DATA: Record<string, PowerBIDetailData> = {
  "d3": {
    "summary": {
      "totalPages": 3,
      "totalVisuals": 41,
      "totalTables": 1,
      "totalDAXMeasures": 4
    },
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
        "name": "Bind_HH_Rate",
        "expression": "CALCULATE(SUM(PBI Data[Bind_HH_Rate]), ALLSELECTED())",
        "homeTable": "PBI Data",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Summary"
        ]
      },
      {
        "id": "dax_2",
        "name": "Bind_Alert_Rate",
        "expression": "CALCULATE(SUM(PBI Data[Bind_Alert_Rate]), ALLSELECTED())",
        "homeTable": "PBI Data",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Summary"
        ]
      },
      {
        "id": "dax_3",
        "name": "Bind_Quote_rate",
        "expression": "CALCULATE(SUM(PBI Data[Bind_Quote_rate]), ALLSELECTED())",
        "homeTable": "PBI Data",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Summary"
        ]
      },
      {
        "id": "dax_4",
        "name": "Ctrl Group Bind HH Rate %",
        "expression": "CALCULATE(SUM(PBI Data[Ctrl Group Bind HH Rate %]), ALLSELECTED())",
        "homeTable": "PBI Data",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Territory/State"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  },
  "d4": {
    "summary": {
      "totalPages": 3,
      "totalVisuals": 22,
      "totalTables": 6,
      "totalDAXMeasures": 4
    },
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
        "name": "Revenue",
        "expression": "CALCULATE(SUM(Fact[Revenue]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Tooltip"
        ]
      },
      {
        "id": "dax_2",
        "name": "Opportunity Count",
        "expression": "CALCULATE(SUM(Fact[Opportunity Count]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Detail"
        ]
      },
      {
        "id": "dax_3",
        "name": "Factored Revenue",
        "expression": "CALCULATE(SUM(Fact[Factored Revenue]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Detail"
        ]
      },
      {
        "id": "dax_4",
        "name": "Avg Revenue",
        "expression": "CALCULATE(SUM(Fact[Avg Revenue]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Detail"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
      "totalDAXMeasures": 3
    },
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
        "name": "Total PBI Data Volume",
        "expression": "COUNTROWS(PBI Data)",
        "homeTable": "PBI Data",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "Total PBI Data (2) Volume",
        "expression": "COUNTROWS(PBI Data (2))",
        "homeTable": "PBI Data (2)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_3",
        "name": "Total PBI Data (3) Volume",
        "expression": "COUNTROWS(PBI Data (3))",
        "homeTable": "PBI Data (3)",
        "formatString": "#,##0",
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  },
  "u3": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 22,
      "totalTables": 3,
      "totalDAXMeasures": 3
    },
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
        "name": "Total PBI Data (2) Volume",
        "expression": "COUNTROWS(PBI Data (2))",
        "homeTable": "PBI Data (2)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "Total PBI Data (3) Volume",
        "expression": "COUNTROWS(PBI Data (3))",
        "homeTable": "PBI Data (3)",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_3",
        "name": "Total PBI Data Volume",
        "expression": "COUNTROWS(PBI Data)",
        "homeTable": "PBI Data",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  },
  "f1": {
    "summary": {
      "totalPages": 4,
      "totalVisuals": 34,
      "totalTables": 8,
      "totalDAXMeasures": 10
    },
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
        "name": "Var Plan %",
        "expression": "CALCULATE(SUM(Fact[Var Plan %]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_2",
        "name": "Actual",
        "expression": "CALCULATE(SUM(Fact[Actual]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_3",
        "name": "Plan",
        "expression": "CALCULATE(SUM(Fact[Plan]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "IT Spend Trend"
        ]
      },
      {
        "id": "dax_4",
        "name": "Var Plan",
        "expression": "CALCULATE(SUM(Fact[Var Plan]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_5",
        "name": "Amount",
        "expression": "CALCULATE(SUM(Fact[Amount]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_6",
        "name": "_Actual/Plan Goal",
        "expression": "CALCULATE(SUM(Fact[_Actual/Plan Goal]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_7",
        "name": "_Actual/Plan Status",
        "expression": "CALCULATE(SUM(Fact[_Actual/Plan Status]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Spend By Cost Elements"
        ]
      },
      {
        "id": "dax_8",
        "name": "Var LE3 %",
        "expression": "CALCULATE(SUM(Fact[Var LE3 %]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_9",
        "name": "Var LE1 %",
        "expression": "CALCULATE(SUM(Fact[Var LE1 %]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Plan Variance Analysis"
        ]
      },
      {
        "id": "dax_10",
        "name": "Var LE2 %",
        "expression": "CALCULATE(SUM(Fact[Var LE2 %]), ALLSELECTED())",
        "homeTable": "Fact",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Plan Variance Analysis"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  },
  "p1": {
    "summary": {
      "totalPages": 1,
      "totalVisuals": 22,
      "totalTables": 2,
      "totalDAXMeasures": 2
    },
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
        "name": "Total PBI Data Volume",
        "expression": "COUNTROWS(PBI Data)",
        "homeTable": "PBI Data",
        "formatString": "#,##0",
        "usedInPages": [
          "Page 1"
        ]
      },
      {
        "id": "dax_2",
        "name": "Total PBI Data (3) Volume",
        "expression": "COUNTROWS(PBI Data (3))",
        "homeTable": "PBI Data (3)",
        "formatString": "#,##0",
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
      "totalDAXMeasures": 11
    },
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
        "name": "This Year Sales",
        "expression": "CALCULATE(SUM(Sales[This Year Sales]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_2",
        "name": "Total Sales Var %",
        "expression": "CALCULATE(SUM(Sales[Total Sales Var %]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_3",
        "name": "Sales Per Sq Ft",
        "expression": "CALCULATE(SUM(Sales[Sales Per Sq Ft]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_4",
        "name": "Last Year Sales",
        "expression": "CALCULATE(SUM(Sales[Last Year Sales]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_5",
        "name": "New Stores",
        "expression": "CALCULATE(SUM(Store[New Stores]), ALLSELECTED())",
        "homeTable": "Store",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Store Sales Overview"
        ]
      },
      {
        "id": "dax_6",
        "name": "TotalSales",
        "expression": "CALCULATE(SUM(Sales[TotalSales]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Info Page"
        ]
      },
      {
        "id": "dax_7",
        "name": "Total Sales Variance %",
        "expression": "CALCULATE(SUM(Sales[Total Sales Variance %]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_8",
        "name": "Avg $/Unit TY",
        "expression": "CALCULATE(SUM(Sales[Avg $/Unit TY]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "District Monthly Sales"
        ]
      },
      {
        "id": "dax_9",
        "name": "Total Sales Var",
        "expression": "CALCULATE(SUM(Sales[Total Sales Var]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_10",
        "name": "TotalSalesTY",
        "expression": "CALCULATE(SUM(Sales[TotalSalesTY]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "New Stores"
        ]
      },
      {
        "id": "dax_11",
        "name": "TotalUnits",
        "expression": "CALCULATE(SUM(Sales[TotalUnits]), ALLSELECTED())",
        "homeTable": "Sales",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Tooltip"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  },
  "f3": {
    "summary": {
      "totalPages": 18,
      "totalVisuals": 166,
      "totalTables": 13,
      "totalDAXMeasures": 14
    },
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
        "name": "Info Tooltip",
        "expression": "CALCULATE(SUM(Details[Info Tooltip]), ALLSELECTED())",
        "homeTable": "Details",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Intro"
        ]
      },
      {
        "id": "dax_2",
        "name": "Info Tooltip 2",
        "expression": "CALCULATE(SUM(Details[Info Tooltip 2]), ALLSELECTED())",
        "homeTable": "Details",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Intro"
        ]
      },
      {
        "id": "dax_3",
        "name": "Net Sales",
        "expression": "CALCULATE(SUM(Analysis DAX[Net Sales]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_4",
        "name": "Units Sold",
        "expression": "CALCULATE(SUM(Analysis DAX[Units Sold]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Net Sales"
        ]
      },
      {
        "id": "dax_5",
        "name": "Returns",
        "expression": "CALCULATE(SUM(Analysis DAX[Returns]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Returns Tooltip"
        ]
      },
      {
        "id": "dax_6",
        "name": "Units Returned",
        "expression": "CALCULATE(SUM(Analysis DAX[Units Returned]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Returns"
        ]
      },
      {
        "id": "dax_7",
        "name": "WIF Profit",
        "expression": "CALCULATE(SUM(Analysis DAX[WIF Profit]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_8",
        "name": "WIF Forecast",
        "expression": "CALCULATE(SUM(Analysis DAX[WIF Forecast]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_9",
        "name": "Return Rate",
        "expression": "CALCULATE(SUM(Analysis DAX[Return Rate]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Returns Tooltip"
        ]
      },
      {
        "id": "dax_10",
        "name": "WIF Total Forecast",
        "expression": "CALCULATE(SUM(Analysis DAX[WIF Total Forecast]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_11",
        "name": "Total Return Rate",
        "expression": "CALCULATE(SUM(Analysis DAX[Total Return Rate]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_12",
        "name": "WIF Sales",
        "expression": "CALCULATE(SUM(Analysis DAX[WIF Sales]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_13",
        "name": "WIF Total Profit",
        "expression": "CALCULATE(SUM(Analysis DAX[WIF Total Profit]), ALLSELECTED())",
        "homeTable": "Analysis DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Return Rate"
        ]
      },
      {
        "id": "dax_14",
        "name": "Lift Label",
        "expression": "CALCULATE(SUM(Design DAX[Lift Label]), ALLSELECTED())",
        "homeTable": "Design DAX",
        "formatString": "#,##0.00",
        "usedInPages": [
          "Market Basket Analysis"
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
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
            "ID": 101,
            "Status": "Active",
            "Amount": 4500.0
          },
          {
            "ID": 102,
            "Status": "Pending",
            "Amount": 2100.0
          },
          {
            "ID": 103,
            "Status": "Completed",
            "Amount": 8900.0
          }
        ]
      }
    ]
  }
,
  "d8": {
  "summary": {
    "totalPages": 0,
    "totalVisuals": 0,
    "totalTables": 0,
    "totalDAXMeasures": 0
  },
  "pages": [],
  "daxMeasures": [],
  "tables": []
},
  "d9": {
  "summary": {
    "totalPages": 1,
    "totalVisuals": 22,
    "totalTables": 6,
    "totalDAXMeasures": 4
  },
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
      "name": "Total New Business Premium",
      "expression": "SUM(Production[New_Business_Amount])",
      "homeTable": "Production",
      "formatString": "0,##0",
      "usedInPages": [
        "Page 1"
      ]
    },
    {
      "id": "dax_2",
      "name": "Bottom Quartile Agent Count",
      "expression": "CALCULATE(COUNTROWS(Agent), Agent[Production_Quartile] = 4)",
      "homeTable": "Agent",
      "formatString": "#,##0",
      "usedInPages": [
        "Page 1"
      ]
    },
    {
      "id": "dax_3",
      "name": "Average Bind Velocity (Days)",
      "expression": "AVERAGE(Production[Days_To_Bind])",
      "homeTable": "Production",
      "formatString": "0.0",
      "usedInPages": [
        "Page 1"
      ]
    },
    {
      "id": "dax_4",
      "name": "Conversion Rate",
      "expression": "DIVIDE([Policies Bound], [Quotes Submitted], 0)",
      "homeTable": "Production",
      "formatString": "0.0%",
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
          "AOR + Agent": 150,
          "Agency State": 150,
          "District": 150,
          "Line of Business": 150,
          "Reporting Period": 150
        },
        {
          "AOR + Agent": 300,
          "Agency State": 300,
          "District": 300,
          "Line of Business": 300,
          "Reporting Period": 300
        },
        {
          "AOR + Agent": 450,
          "Agency State": 450,
          "District": 450,
          "Line of Business": 450,
          "Reporting Period": 450
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
          "AOR + Agent": 150,
          "Agency state": 150,
          "Line of Business": 150,
          "Reporting Period": 150
        },
        {
          "AOR + Agent": 300,
          "Agency state": 300,
          "Line of Business": 300,
          "Reporting Period": 300
        },
        {
          "AOR + Agent": 450,
          "Agency state": 450,
          "Line of Business": 450,
          "Reporting Period": 450
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
          "NB Counts": 150,
          "NB Counts Agents in Bottom Quartile": 150
        },
        {
          "NB Counts": 300,
          "NB Counts Agents in Bottom Quartile": 300
        },
        {
          "NB Counts": 450,
          "NB Counts Agents in Bottom Quartile": 450
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
          "R12 Loss Score Ratio Var to Bottom Quartile": 150,
          "R12_OVERALL_SCORE": 150
        },
        {
          "R12 Loss Score Ratio Var to Bottom Quartile": 300,
          "R12_OVERALL_SCORE": 300
        },
        {
          "R12 Loss Score Ratio Var to Bottom Quartile": 450,
          "R12_OVERALL_SCORE": 450
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
          "Agent": 150
        },
        {
          "Agent": 300
        },
        {
          "Agent": 450
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
          "Agent": 150
        },
        {
          "Agent": 300
        },
        {
          "Agent": 450
        }
      ]
    }
  ]
},
  "d10": {
  "summary": {
    "totalPages": 0,
    "totalVisuals": 0,
    "totalTables": 0,
    "totalDAXMeasures": 0
  },
  "pages": [],
  "daxMeasures": [],
  "tables": []
},
  "u5": {
  "summary": {
    "totalPages": 2,
    "totalVisuals": 19,
    "totalTables": 6,
    "totalDAXMeasures": 3
  },
  "pages": [
    {
      "id": "pg_1",
      "name": "Page 1",
      "visualType": "slicer",
      "dimensions": [
        "MTD Conversion Rate)",
        "MTD NB Counts)",
        "MTD Quote Counts)",
        "Month Year.Variation.Date Hierarchy.Month",
        "Month Year.Variation.Date Hierarchy.Year"
      ],
      "measures": [
        {
          "name": "Month Year.Variation.Date Hierarchy.Year",
          "type": "explicit"
        },
        {
          "name": "Month Year.Variation.Date Hierarchy.Month",
          "type": "explicit"
        },
        {
          "name": "MTD NB Counts",
          "type": "explicit"
        },
        {
          "name": "MTD Quote Counts",
          "type": "explicit"
        },
        {
          "name": "MTD Conversion Rate1",
          "type": "explicit"
        },
        {
          "name": "YTD NB Counts",
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
      "visualType": "waterfallChart",
      "dimensions": [
        "Commision)",
        "Metric"
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
      "name": "Underwriting Loss Ratio",
      "expression": "DIVIDE(SUM(Losses[Incurred]), SUM(Premiums[Earned]), 0)",
      "homeTable": "Fact_Loss",
      "formatString": "0.0%",
      "usedInPages": [
        "Page 1"
      ]
    },
    {
      "id": "dax_2",
      "name": "Submission Approval Rate",
      "expression": "DIVIDE([Approved Submissions], [Total Submissions], 0)",
      "homeTable": "Submissions",
      "formatString": "0.0%",
      "usedInPages": [
        "Page 1",
        "Page 2"
      ]
    },
    {
      "id": "dax_3",
      "name": "Average Risk Score",
      "expression": "AVERAGE(Risk[Score])",
      "homeTable": "Risk",
      "formatString": "0.0",
      "usedInPages": [
        "Page 1"
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
          "name": "DM Conversion Rate1",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "MTD Conversion Rate1",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Month Year.Variation.Date Hierarchy.Month",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Month Year.Variation.Date Hierarchy.Year",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Rolling Conversion Rate1",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "YTD Conversion Rate1",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "DM Conversion Rate1": 150,
          "MTD Conversion Rate1": 150,
          "Month Year.Variation.Date Hierarchy.Month": 150,
          "Month Year.Variation.Date Hierarchy.Year": 150,
          "Rolling Conversion Rate1": 150,
          "YTD Conversion Rate1": 150
        },
        {
          "DM Conversion Rate1": 300,
          "MTD Conversion Rate1": 300,
          "Month Year.Variation.Date Hierarchy.Month": 300,
          "Month Year.Variation.Date Hierarchy.Year": 300,
          "Rolling Conversion Rate1": 300,
          "YTD Conversion Rate1": 300
        },
        {
          "DM Conversion Rate1": 450,
          "MTD Conversion Rate1": 450,
          "Month Year.Variation.Date Hierarchy.Month": 450,
          "Month Year.Variation.Date Hierarchy.Year": 450,
          "Rolling Conversion Rate1": 450,
          "YTD Conversion Rate1": 450
        }
      ]
    },
    {
      "tableName": "CountNonNull(Sheet1",
      "displayName": "CountNonNull(Sheet1",
      "rowCount": 1250,
      "source": "Import (Direct Lake)",
      "relationships": [
        "1:* to Fact_Production"
      ],
      "columns": [
        {
          "name": "MTD NB Counts",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "MTD NB Counts": 150
        },
        {
          "MTD NB Counts": 300
        },
        {
          "MTD NB Counts": 450
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
          "name": "Conversion Rate Disengaged Agents",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "DM Conversion Rate Var%",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "DM NB Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "DM NB Counts Var%",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "DM Quote Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "DM Quote Counts Var%",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "MTD Conversion Rate",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "MTD NB Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "MTD Quote Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Rolling NB Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Rolling Quote Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "YTD NB Counts",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "YTD Quote Counts",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "Conversion Rate Disengaged Agents": 150,
          "DM Conversion Rate Var%": 150,
          "DM NB Counts": 150,
          "DM NB Counts Var%": 150,
          "DM Quote Counts": 150,
          "DM Quote Counts Var%": 150
        },
        {
          "Conversion Rate Disengaged Agents": 300,
          "DM Conversion Rate Var%": 300,
          "DM NB Counts": 300,
          "DM NB Counts Var%": 300,
          "DM Quote Counts": 300,
          "DM Quote Counts Var%": 300
        },
        {
          "Conversion Rate Disengaged Agents": 450,
          "DM Conversion Rate Var%": 450,
          "DM NB Counts": 450,
          "DM NB Counts Var%": 450,
          "DM Quote Counts": 450,
          "DM Quote Counts Var%": 450
        }
      ]
    },
    {
      "tableName": "Min(Sheet1",
      "displayName": "Min(Sheet1",
      "rowCount": 1250,
      "source": "Import (Direct Lake)",
      "relationships": [
        "1:* to Fact_Production"
      ],
      "columns": [
        {
          "name": "Blank Column 1",
          "type": "NUMERIC(14,2)"
        },
        {
          "name": "Blank Column 2",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "Blank Column 1": 150,
          "Blank Column 2": 150
        },
        {
          "Blank Column 1": 300,
          "Blank Column 2": 300
        },
        {
          "Blank Column 1": 450,
          "Blank Column 2": 450
        }
      ]
    },
    {
      "tableName": "Sum(Sheet2 (2)",
      "displayName": "Sum(Sheet2 (2)",
      "rowCount": 1250,
      "source": "Import (Direct Lake)",
      "relationships": [
        "1:* to Fact_Production"
      ],
      "columns": [
        {
          "name": "Commision",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "Commision": 150
        },
        {
          "Commision": 300
        },
        {
          "Commision": 450
        }
      ]
    },
    {
      "tableName": "Sheet2 (2)",
      "displayName": "Sheet2 (2)",
      "rowCount": 1250,
      "source": "Import (Direct Lake)",
      "relationships": [
        "1:* to Fact_Production"
      ],
      "columns": [
        {
          "name": "Metric",
          "type": "NUMERIC(14,2)"
        }
      ],
      "sampleRows": [
        {
          "Metric": 150
        },
        {
          "Metric": 300
        },
        {
          "Metric": 450
        }
      ]
    }
  ]
},
  "u6": {
  "summary": {
    "totalPages": 2,
    "totalVisuals": 8,
    "totalTables": 2,
    "totalDAXMeasures": 3
  },
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
      "name": "Quotation Latency (s)",
      "expression": "AVERAGE(Rating[Engine_Response_Ms]) / 1000",
      "homeTable": "Rating",
      "formatString": "0.00s",
      "usedInPages": [
        "Page 1"
      ]
    },
    {
      "id": "dax_2",
      "name": "Rating Factor Multiplier",
      "expression": "PRODUCT(RatingFactors[Factor_Weight])",
      "homeTable": "RatingFactors",
      "formatString": "0.000",
      "usedInPages": [
        "Page 1",
        "Page 2"
      ]
    },
    {
      "id": "dax_3",
      "name": "Active Submissions",
      "expression": "COUNTROWS(FILTER(Submissions, Submissions[Status] = \"In Review\"))",
      "homeTable": "Submissions",
      "formatString": "#,##0",
      "usedInPages": [
        "Page 1"
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
          "Daily Assigned Import Rate by CY": 150,
          "Import Assigned-Rate": 150,
          "Imported datetime adjusted": 150,
          "LOB": 150,
          "State": 150,
          "bind": 150
        },
        {
          "Daily Assigned Import Rate by CY": 300,
          "Import Assigned-Rate": 300,
          "Imported datetime adjusted": 300,
          "LOB": 300,
          "State": 300,
          "bind": 300
        },
        {
          "Daily Assigned Import Rate by CY": 450,
          "Import Assigned-Rate": 450,
          "Imported datetime adjusted": 450,
          "LOB": 450,
          "State": 450,
          "bind": 450
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
          "Allocated_IND": 150
        },
        {
          "Allocated_IND": 300
        },
        {
          "Allocated_IND": 450
        }
      ]
    }
  ]
}
};
