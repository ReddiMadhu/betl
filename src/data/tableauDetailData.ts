/* ─────────────────────────────────────────────────────────
 * Tableau Detail Data — per-asset extracted workbook metadata
 * ───────────────────────────────────────────────────────── */

export interface WorksheetDetail {
  id: string;
  name: string;
  chartType: string;
  dimensions: string[];
  measures: { name: string; type: 'base_measure' | 'calculated' }[];
  axes: {
    rows: string;
    columns: string;
  };
}

export interface CalculatedFieldDetail {
  id: string;
  name: string;
  formula: string;
  role: 'measure' | 'dimension';
  datatype: 'real' | 'integer' | 'string' | 'boolean' | 'date' | 'datetime';
  usedInSheets: string[];
}

export interface TableDetail {
  tableName: string;
  displayName: string;
  rowCount: number;
  dataSource: string;
  columns: { name: string; type?: string }[];
  sampleRows: Record<string, unknown>[];
  hasColumnInformation?: boolean;
  schemaInfo?: string[];
  emptyStateMessage?: string;
}

export interface KpiDetail {
  id: string;
  name: string;
  evidence: string;
}

export interface TableauDetailData {
  summary: {
    totalDashboards: number;
    totalWorksheets: number;
    totalTables: number;
    totalCalculatedFields: number;
    totalKpis?: number;
  };
  kpis: KpiDetail[];
  worksheets: WorksheetDetail[];
  calculatedFields: CalculatedFieldDetail[];
  tables: TableDetail[];
}

export const CROSS_SELL_AND_INSURANCE_ANALYTICS_TABLES: TableDetail[] = [
  {
    tableName: "brokerage_202001231040",
    displayName: "brokerage_202001231040",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "client_name" },
      { name: "policy_number" },
      { name: "policy_status" },
      { name: "policy_start_date" },
      { name: "policy_end_date" },
      { name: "product_group" },
      { name: "Account Exe ID" },
      { name: "Exe Name" },
      { name: "branch_name" },
      { name: "solution_group" },
      { name: "income_class" },
      { name: "Amount" },
      { name: "income_due_date" },
      { name: "revenue_transaction_type" },
      { name: "renewal_status" },
      { name: "lapse_reason" },
      { name: "last_updated_date" }
    ],
    sampleRows: [
      {
        "client_name": "A",
        "policy_number": "2414 2022 4088 1000 000",
        "policy_status": "Active",
        "policy_start_date": "2018-04-19",
        "policy_end_date": "2019-04-18",
        "product_group": "Marine",
        "Account Exe ID": 1,
        "Exe Name": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Marine",
        "income_class": "Renewal",
        "Amount": 32186.72,
        "income_due_date": "2018-04-19",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": null,
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "Sanjay Trivedi",
        "policy_number": "2.4142e+18",
        "policy_status": "Active",
        "policy_start_date": "2019-05-01",
        "policy_end_date": "2020-04-30",
        "product_group": "Marine",
        "Account Exe ID": 2,
        "Exe Name": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "solution_group": "Marine",
        "income_class": "New",
        "Amount": 23590.71,
        "income_due_date": "2019-05-01",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": null,
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "Anita Sethi",
        "policy_number": "0655001825 01",
        "policy_status": "Inactive",
        "policy_start_date": "2018-09-13",
        "policy_end_date": "2019-09-12",
        "product_group": "Fire",
        "Account Exe ID": 1,
        "Exe Name": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "income_class": "Renewal",
        "Amount": 4611.96,
        "income_due_date": "2018-09-13",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": null,
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "Ashok Chatterjee",
        "policy_number": "12139156",
        "policy_status": "Active",
        "policy_start_date": "2019-09-13",
        "policy_end_date": "2020-09-12",
        "product_group": "Fire",
        "Account Exe ID": 1,
        "Exe Name": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "income_class": "Renewal",
        "Amount": 4975.41,
        "income_due_date": "2019-09-13",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Renewal",
        "lapse_reason": null,
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "Rani Agarwal",
        "policy_number": "2.20009e+09",
        "policy_status": "Active",
        "policy_start_date": "2018-11-06",
        "policy_end_date": "2019-11-05",
        "product_group": "Miscellaneous",
        "Account Exe ID": 1,
        "Exe Name": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Liability",
        "income_class": "Renewal",
        "Amount": 1198.88,
        "income_due_date": "2018-11-06",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": null,
        "last_updated_date": "2020-01-22"
      }
    ]
  },
  {
    tableName: "fees_202001231041",
    displayName: "fees_202001231041",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "client_name" },
      { name: "branch_name" },
      { name: "solution_group" },
      { name: "Account Exe ID" },
      { name: "Account Executive" },
      { name: "income_class" },
      { name: "Amount" },
      { name: "income_due_date" },
      { name: "revenue_transaction_type" }
    ],
    sampleRows: [
      {
        "client_name": "Sanjay Trivedi",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "Account Exe ID": 3,
        "Account Executive": "Nishant Sharma",
        "income_class": "Cross Sell",
        "Amount": 139240,
        "income_due_date": "2019-07-17",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "Anita Sethi",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "Account Exe ID": 3,
        "Account Executive": "Nishant Sharma",
        "income_class": "Cross Sell",
        "Amount": 139240,
        "income_due_date": "2019-01-21",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "Ashok Chatterjee",
        "branch_name": "Ahmedabad",
        "solution_group": "GL Client Network (GNB Inward)",
        "Account Exe ID": 1,
        "Account Executive": "Vinay",
        "income_class": "Renewal",
        "Amount": 2200,
        "income_due_date": "2019-12-20",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "Rani Agarwal",
        "branch_name": "Ahmedabad",
        "solution_group": "GL Client Network (GNB Inward)",
        "Account Exe ID": 1,
        "Account Executive": "Vinay",
        "income_class": "Renewal",
        "Amount": 4500,
        "income_due_date": "2019-01-25",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "Arjun Rao",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "Account Exe ID": 3,
        "Account Executive": "Nishant Sharma",
        "income_class": "Cross Sell",
        "Amount": 118000,
        "income_due_date": "2019-03-15",
        "revenue_transaction_type": "Fees"
      }
    ]
  },
  {
    tableName: "NN+EN+EE Indi bdgt -20012020",
    displayName: "NN+EN+EE Indi bdgt -20012020",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "Branch" },
      { name: "Account Exe ID" },
      { name: "Employee Name" },
      { name: "New Role2" },
      { name: "New Budget" },
      { name: "Cross sell bugdet" },
      { name: "Renewal Budget" }
    ],
    sampleRows: [
      {
        "Branch": "Ahmedabad",
        "Account Exe ID": 1,
        "Employee Name": "Vinay",
        "New Role2": "Hunter & Farmer",
        "New Budget": 12788092,
        "Cross sell bugdet": 250000,
        "Renewal Budget": 1500000
      },
      {
        "Branch": "Ahmedabad",
        "Account Exe ID": 2,
        "Employee Name": "Abhinav Shivam",
        "New Role2": "Servicer",
        "New Budget": 129902,
        "Cross sell bugdet": 129000,
        "Renewal Budget": 1289000
      },
      {
        "Branch": "Ahmedabad",
        "Account Exe ID": 3,
        "Employee Name": "Animesh Rawat",
        "New Role2": "Servicer",
        "New Budget": 1278023,
        "Cross sell bugdet": 12365300,
        "Renewal Budget": 12900
      },
      {
        "Branch": "Ahmedabad",
        "Account Exe ID": 4,
        "Employee Name": "Gilbert",
        "New Role2": "BH",
        "New Budget": 1000000,
        "Cross sell bugdet": 500000,
        "Renewal Budget": 1010000
      },
      {
        "Branch": "Ahmedabad",
        "Account Exe ID": 5,
        "Employee Name": "Juli",
        "New Role2": "Hunter & Farmer",
        "New Budget": 1250000,
        "Cross sell bugdet": 3500000,
        "Renewal Budget": 750000
      }
    ]
  },
  {
    tableName: "invoice_202001231041",
    displayName: "invoice_202001231041",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "invoice_number" },
      { name: "invoice_date" },
      { name: "revenue_transaction_type" },
      { name: "branch_name" },
      { name: "solution_group" },
      { name: "Account Exe ID" },
      { name: "Account Executive" },
      { name: "income_class" },
      { name: "Client Name" },
      { name: "policy_number" },
      { name: "Amount" },
      { name: "income_due_date" }
    ],
    sampleRows: [
      {
        "invoice_number": 1900001087,
        "invoice_date": "2019-04-11",
        "revenue_transaction_type": "Fees",
        "branch_name": "Ahmedabad",
        "solution_group": "Liability",
        "Account Exe ID": 10,
        "Account Executive": "Mark",
        "income_class": "New",
        "Client Name": "Sanjay Trivedi",
        "policy_number": null,
        "Amount": 84746,
        "income_due_date": "2019-04-10"
      },
      {
        "invoice_number": 1900001106,
        "invoice_date": "2019-05-17",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Exe ID": 4,
        "Account Executive": "Gilbert",
        "income_class": "Renewal",
        "Client Name": "Anita Sethi",
        "policy_number": "2.4142e+18",
        "Amount": 86724,
        "income_due_date": "2019-01-01"
      },
      {
        "invoice_number": 1900001110,
        "invoice_date": "2019-05-17",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Exe ID": 4,
        "Account Executive": "Gilbert",
        "income_class": "Renewal",
        "Client Name": "Ashok Chatterjee",
        "policy_number": "OG-19-2202-1018-00000060",
        "Amount": 148500,
        "income_due_date": "2019-03-01"
      },
      {
        "invoice_number": 1900001136,
        "invoice_date": "2019-05-30",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Exe ID": 1,
        "Account Executive": "Vinay",
        "income_class": "Cross Sell",
        "Client Name": "Rani Agarwal",
        "policy_number": "OG-19-2202-3383-00000010",
        "Amount": 12019,
        "income_due_date": "2019-01-01"
      },
      {
        "invoice_number": 1900001164,
        "invoice_date": "2019-06-11",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Exe ID": 4,
        "Account Executive": "Gilbert",
        "income_class": "Renewal",
        "Client Name": "Arjun Rao",
        "policy_number": "020P000098803000",
        "Amount": 12500,
        "income_due_date": "2019-02-26"
      }
    ]
  },
  {
    tableName: "meeting_list_202001231041",
    displayName: "meeting_list_202001231041",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "Account Exe ID" },
      { name: "Account Executive" },
      { name: "branch_name" },
      { name: "global_attendees" },
      { name: "meeting_date" }
    ],
    sampleRows: [
      {
        "Account Exe ID": 2,
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "Alex Johnson",
        "meeting_date": "2019-10-17"
      },
      {
        "Account Exe ID": 2,
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "Emily Thompson",
        "meeting_date": "2019-10-17"
      },
      {
        "Account Exe ID": 2,
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "Liam Smith",
        "meeting_date": "2019-12-24"
      },
      {
        "Account Exe ID": 2,
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "Ava Davis",
        "meeting_date": "2020-01-03"
      },
      {
        "Account Exe ID": 2,
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "Noah Wilson",
        "meeting_date": "2020-01-08"
      }
    ]
  },
  {
    tableName: "gcrm_opportunity_202001231041",
    displayName: "gcrm_opportunity_202001231041",
    rowCount: 5,
    dataSource: "federated.0gnnp1u032pgq11ajatw91fr25ge",
    hasColumnInformation: true,
    columns: [
      { name: "opportunity_name" },
      { name: "opportunity_id" },
      { name: "Account Exe Id" },
      { name: "Account Executive" },
      { name: "premium_amount" },
      { name: "revenue_amount" },
      { name: "closing_date" },
      { name: "stage" },
      { name: "branch" },
      { name: "specialty" },
      { name: "product_group" },
      { name: "product_sub_group" },
      { name: "risk_details" }
    ],
    sampleRows: [
      {
        "opportunity_name": "EL-Group Mediclaim",
        "opportunity_id": "OPP1900001042",
        "Account Exe Id": 3,
        "Account Executive": "Animesh Rawat",
        "premium_amount": 8000000,
        "revenue_amount": 400000,
        "closing_date": "2019-11-13",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Employee Benefits (EB)",
        "product_group": "Employee Benefits",
        "product_sub_group": "Mediclaim",
        "risk_details": "Group Medical"
      },
      {
        "opportunity_name": "AL GPA",
        "opportunity_id": "OPP1900001047",
        "Account Exe Id": 1,
        "Account Executive": "Vinay",
        "premium_amount": 200000,
        "revenue_amount": 30000,
        "closing_date": "2020-03-31",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Employee Benefits (EB)",
        "product_group": "Employee Benefits",
        "product_sub_group": "Mediclaim",
        "risk_details": "Group Personal Accident"
      },
      {
        "opportunity_name": "BL - Marine STOP",
        "opportunity_id": "OPP1900001048",
        "Account Exe Id": 1,
        "Account Executive": "Vinay",
        "premium_amount": 0,
        "revenue_amount": 100000,
        "closing_date": "2020-06-30",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Marine",
        "product_group": "Marine",
        "product_sub_group": "Marine Hull",
        "risk_details": "Charterers' Liability Policy"
      },
      {
        "opportunity_name": "II-Marine",
        "opportunity_id": "OPP1900001050",
        "Account Exe Id": 1,
        "Account Executive": "Vinay",
        "premium_amount": 0,
        "revenue_amount": 100000,
        "closing_date": "2020-03-31",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Marine",
        "product_group": "Marine",
        "product_sub_group": "Marine Hull",
        "risk_details": "Charterers' Liability Policy"
      },
      {
        "opportunity_name": "PIL-Credit Insurance",
        "opportunity_id": "OPP1900001051",
        "Account Exe Id": 1,
        "Account Executive": "Vinay",
        "premium_amount": 1200000,
        "revenue_amount": 100000,
        "closing_date": "2020-03-31",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Trade Credit & Political Risk",
        "product_group": "Miscellaneous",
        "product_sub_group": "Miscellaneous",
        "risk_details": "Trade Credit Insurance"
      }
    ]
  }
];


export const TABLEAU_DETAIL_DATA: Record<string, TableauDetailData> = {
  "c1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 75,
      "totalTables": 4,
      "totalCalculatedFields": 88,
      "totalKpis": 13
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Variance from National in Avg Claim Cost by Region",
        "evidence": "Avg Claim Cost_Region vs National (5)"
      },
      {
        "id": "kpi_2",
        "name": "Average Days to Settle Claims by Region",
        "evidence": "Days to Settle_Aggregate"
      },
      {
        "id": "kpi_3",
        "name": "Percentage of Claims Hitting Target Settlement Time by Region",
        "evidence": "Days to Settle_Detail"
      },
      {
        "id": "kpi_4",
        "name": "Loss Ratio by Region",
        "evidence": "Loss Ratio vs PY"
      },
      {
        "id": "kpi_5",
        "name": "Retention Rate by Region",
        "evidence": "Retention Rate_Aggregate"
      },
      {
        "id": "kpi_6",
        "name": "Retention Rate Target Achievement by Region",
        "evidence": "Retention Rate_Detail"
      },
      {
        "id": "kpi_7",
        "name": "Satisfaction Score by Region",
        "evidence": "Satisfaction Score_Aggregate"
      },
      {
        "id": "kpi_8",
        "name": "Satisfaction Score Target Achievement by Region",
        "evidence": "Satisfaction Rate_Detail"
      },
      {
        "id": "kpi_9",
        "name": "Year-over-Year Change in Avg Claim Cost",
        "evidence": "KPI_% Change - Avg Claim Cost"
      },
      {
        "id": "kpi_10",
        "name": "Year-over-Year Change in Days to Settle Claims",
        "evidence": "KPI_% Change - Days to Settle"
      },
      {
        "id": "kpi_11",
        "name": "Year-over-Year Change in Loss Ratio",
        "evidence": "KPI_% Change - Loss Ratio"
      },
      {
        "id": "kpi_12",
        "name": "Year-over-Year Change in Retention Rate",
        "evidence": "KPI_% Change - Retention Rate"
      },
      {
        "id": "kpi_13",
        "name": "Year-over-Year Change in Satisfaction Score",
        "evidence": "KPI_% Change - Satisfaction Score"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": " Days to Settle | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Days to Settle"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_2",
        "name": "Avg Claim Cost | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "Performance Level | Avg Claim Cost",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Avg Claim Cost_Region vs National (5)",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "Region Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Last  5 Years"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "% Change from National | Fixed",
            "type": "calculated"
          },
          {
            "name": "Max | % Change from National",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | National",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_948571040330",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_4",
        "name": "Car Use",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Car Use",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Car Use",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503328137250",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Car Use:nk] / [federat",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_10183765033"
        }
      },
      {
        "id": "ws_5",
        "name": "Coverage Area",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Coverage Zone",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Claim Filed",
            "type": "base_measure"
          },
          {
            "name": "Calculation_678917684282433564",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Coverage Zone:nk] / [f",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_67891768428"
        }
      },
      {
        "id": "ws_6",
        "name": "Days to Settle_Aggregate",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Target",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Days to Settle",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Color",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Retention Rate (copy)_82"
        }
      },
      {
        "id": "ws_7",
        "name": "Days to Settle_Detail",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Target",
            "type": "calculated"
          },
          {
            "name": "Hit Target %  | Days to Settle",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Days to Settle",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Color",
            "type": "calculated"
          },
          {
            "name": "Hit Target | Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Retention Rate (copy)_82"
        }
      },
      {
        "id": "ws_8",
        "name": "Gender",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "Gender | Text",
          "State Filter",
          "Max Date",
          "Gender",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Gender",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503328137250",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Gender:nk] / [federate",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_10183765033"
        }
      },
      {
        "id": "ws_9",
        "name": "Income Histogram",
        "chartType": "Bar Chart",
        "dimensions": [
          "Bin Max",
          "Bin Description",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Bin Size",
            "type": "calculated"
          },
          {
            "name": "Median Income",
            "type": "calculated"
          },
          {
            "name": "Bin Size | Income",
            "type": "calculated"
          },
          {
            "name": "Income",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503343845416",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[cnt:Claim Filed:qk]",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_10183765033"
        }
      },
      {
        "id": "ws_10",
        "name": "KPI_% Change - Avg Claim Cost",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "KPI_% Change - Avg Claim Cost | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_12",
        "name": "KPI_% Change - Days to Settle",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to Set...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_13",
        "name": "KPI_% Change - Days to Settle | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to Set...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_14",
        "name": "KPI_% Change - Loss Ratio",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_15",
        "name": "KPI_% Change - Loss Ratio | State2",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263",
          "Calculation_600667632502198275"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_16",
        "name": "KPI_% Change - Retention Rate",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]))...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_17",
        "name": "KPI_% Change - Retention Rate | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]))...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_18",
        "name": "KPI_% Change - Satisfaction Score",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_19",
        "name": "KPI_% Change - Satisfaction Score | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_20",
        "name": "KPI_Avg Claim Cost_CY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_21",
        "name": "KPI_Avg Claim Cost_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_22",
        "name": "KPI_Avg Claim Cost_PY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_23",
        "name": "KPI_Avg Claim Cost_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_24",
        "name": "KPI_Days to Settle_CY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_25",
        "name": "KPI_Days to Settle_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_26",
        "name": "KPI_Days to Settle_PY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_27",
        "name": "KPI_Days to Settle_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_28",
        "name": "KPI_Loss Rate_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_29",
        "name": "KPI_Loss Ratio_CY",
        "chartType": "Shape",
        "dimensions": [
          "Disable Highlighting",
          "Year Filter",
          "Zero",
          "Incident Date",
          "One",
          "Calculation_1243275013444358145"
        ],
        "measures": [
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_30",
        "name": "KPI_Loss Ratio_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263",
          "Calculation_600667632502198275"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_31",
        "name": "KPI_Loss Ratio_PY",
        "chartType": "Shape",
        "dimensions": [
          "Disable Highlighting",
          "Year Filter",
          "Zero",
          "Incident Date",
          "One",
          "Calculation_1243275013444358145"
        ],
        "measures": [
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_32",
        "name": "KPI_Retention Rate_CY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_33",
        "name": "KPI_Retention Rate_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_34",
        "name": "KPI_Retention Rate_PY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_35",
        "name": "KPI_Retention Rate_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_36",
        "name": "KPI_Satisfaction Score_CY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_37",
        "name": "KPI_Satisfaction Score_CY | State (2)",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_38",
        "name": "KPI_Satisfaction Score_PY | State (2)",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_39",
        "name": "KPI_Satisfaction_PY",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_40",
        "name": "Loss Ratio vs PY",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | 2019",
            "type": "calculated"
          },
          {
            "name": "Color | Loss Ratio",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Calculation_178989940990"
        }
      },
      {
        "id": "ws_41",
        "name": "Loss Ratio | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Loss Ratio"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_42",
        "name": "Rank | Avg Claim Cost",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim  Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_43",
        "name": "Rank | Avg Claim Cost | Region",
        "chartType": "Shape",
        "dimensions": [
          "Region |  Tooltip Filter",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation4",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_44",
        "name": "Rank | Avg Claim Cost | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation4:ok:2] / [f",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_45",
        "name": "Rank | Day to Settle | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle | Region",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region (copy)_226587395979366419",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_46",
        "name": "Rank | Days to Settle",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_47",
        "name": "Rank | Days to Settle | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle | Region",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Satisfaction Sco",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_48",
        "name": "Rank | Loss Ratio",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_49",
        "name": "Rank | Loss Ratio | Region",
        "chartType": "Shape",
        "dimensions": [
          "Region |  Tooltip Filter",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio | Region",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_50",
        "name": "Rank | Loss Ratio | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio | Region",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Avg Claim Cost |",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_51",
        "name": "Rank | Retention Rate",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_52",
        "name": "Rank | Retention Rate | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate | Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_53",
        "name": "Rank | Retention Rate | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate | Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Loss Ratio | Reg",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_54",
        "name": "Rank | Satisfaction Score",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_55",
        "name": "Rank | Satisfaction Score | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_56",
        "name": "Rank | Satisifaction Score | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Retention Rate |",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_57",
        "name": "Region Circle",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Region | First Letter",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263",
          "Calculation_678917684245893142"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_58",
        "name": "Region Selector",
        "chartType": "Bar Chart",
        "dimensions": [
          "Region Parameter] = 'Central'",
          "Region Parameter] = 'East'",
          "Region Parameter] = 'South'",
          "Region Parameter] = 'West'",
          "Zero",
          "One"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Central",
            "type": "calculated"
          },
          {
            "name": "East",
            "type": "calculated"
          },
          {
            "name": "South",
            "type": "calculated"
          },
          {
            "name": "West",
            "type": "calculated"
          },
          {
            "name": "Calculation_678917684185149455",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_67891768418"
        }
      },
      {
        "id": "ws_59",
        "name": "Retention Rate | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Performance Level | Retention Rate",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | State | Fixed ",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_60",
        "name": "Retention Rate | Selector",
        "chartType": "Text Table / Card",
        "dimensions": [
          "Zero",
          "One",
          "Selected Text | Retention Rate",
          "Selected | Retention Rate",
          "Type",
          "Calculation_820218118159917059"
        ],
        "measures": [
          {
            "name": "Retention Rate Target",
            "type": "calculated"
          },
          {
            "name": "Display As",
            "type": "base_measure"
          },
          {
            "name": "Parameter Value",
            "type": "base_measure"
          },
          {
            "name": "Unselected Text | Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Unselected Text | Days to Settle (copy)_944067107670990855",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0ln375r0r91wa31ftdab31x7csmv].[none:Display As:qk]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_61",
        "name": "Retention Rate_Aggregate",
        "chartType": "Automatic",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "Retention Rate Target",
            "type": "calculated"
          },
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Color",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (copy"
        }
      },
      {
        "id": "ws_62",
        "name": "Retention Rate_Detail",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "Retention Rate Target",
            "type": "calculated"
          },
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Total States Per Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Color",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Hit Target % | Retention Rate",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (copy"
        }
      },
      {
        "id": "ws_63",
        "name": "Satisfaction Rate_Detail",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score Target",
            "type": "calculated"
          },
          {
            "name": "Total States Per Region",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "% Hit Target  ",
            "type": "calculated"
          },
          {
            "name": "Hit Target % | Satsifaction Score",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (copy"
        }
      },
      {
        "id": "ws_64",
        "name": "Satisfaction Score | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Satisfaction Score"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_65",
        "name": "Satisfaction Score | Selector",
        "chartType": "Text Table / Card",
        "dimensions": [
          "Zero",
          "One",
          "Selected Text | Satisfaction Score",
          "Selected | Satisfaction Score",
          "Type",
          "Calculation_820218118159917059"
        ],
        "measures": [
          {
            "name": "Satisfaction Score Target",
            "type": "calculated"
          },
          {
            "name": "Display As",
            "type": "base_measure"
          },
          {
            "name": "Parameter Value",
            "type": "base_measure"
          },
          {
            "name": "Unselected Text | Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Unselected Text | Retention Rate (copy)_944067107671642123",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0ln375r0r91wa31ftdab31x7csmv].[none:Display As:qk]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_66",
        "name": "Satisfaction Score_Aggregate",
        "chartType": "Automatic",
        "dimensions": [
          "Disable Highlighting",
          "Max Date",
          "Region Parameter | Selected",
          "Incident Date",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score Target",
            "type": "calculated"
          },
          {
            "name": "Distance from Target | Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Color",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_6789176841",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (copy"
        }
      },
      {
        "id": "ws_67",
        "name": "Show Detal Button",
        "chartType": "Automatic",
        "dimensions": [
          "Disable Highlighting",
          "One",
          "Show Detail] = 'Show Detail'",
          "Show Detail] = 'Show Aggregated'",
          "Zero",
          "Calculation_820218118152896512"
        ],
        "measures": [
          {
            "name": "Show Detail",
            "type": "calculated"
          },
          {
            "name": "Show Aggregated",
            "type": "calculated"
          },
          {
            "name": "Show Detail",
            "type": "calculated"
          },
          {
            "name": "Calculation_944067107749097518",
            "type": "base_measure"
          },
          {
            "name": "Calculation_944067107749138479",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "([federated.09kxt2103oimsj13sqdtb1mxw430].[usr:Calculation_94406710774"
        }
      },
      {
        "id": "ws_68",
        "name": "State Name",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Claim Filed",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_69",
        "name": "State | Avg Claim Cost",
        "chartType": "Line Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost (copy)",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | Region | Fixed",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_60066763249",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_70",
        "name": "State | Days to Settle",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Last  5 Years",
          "Region"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Fixed",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Retention Rate (copy)_8",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_71",
        "name": "State | Loss Ratio",
        "chartType": "Line Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Last  5 Years"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Fixed | National or Region ",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Calculation_17898994099",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_72",
        "name": "State | Retention Rate",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Last  5 Years"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Fixed",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Fixed | National or Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (cop",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_73",
        "name": "State | Satisfaction Score",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Last 10 Years ",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Fixed | National or Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (cop",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_74",
        "name": "Total Claims",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "ZN(COUNT([Claim Filed]))",
            "type": "calculated"
          },
          {
            "name": "Calculation_1243275015045246979",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_75",
        "name": "Total Claims Amount",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Year Filter Max",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "ZN(SUM([Total Claim Amount]))",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount (copy)",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount (copy)_1090434107833618434",
            "type": "base_measure"
          },
          {
            "name": "Calculation_678917684270071834",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Hit Target %  | Days to Settle",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Calculation_820218118232264734])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_2",
        "name": "% Total | Total Claim Cost | Region",
        "formula": "[Total Claim Amount]/[Total Claim Amount | Fixed | National (copy)_1734448843758759964]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_3",
        "name": "Avg Claim Cost (copy)",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_4",
        "name": "Avg Claim Cost | Region",
        "formula": "IF [Parameters].[Parameter 1] = 'All' then NULL\r\nELSEIF [Parameters].[Parameter 1] != 'All' THEN\r\n[Calculation_600667632497045504]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_5",
        "name": "Loss Ratio | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_6",
        "name": "Loss Ratio | Fixed | National or Region ",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Avg Claim Cost | Fixed (copy)_1018376503262674951]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503259725826]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_7",
        "name": "Loss Ratio | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_8",
        "name": "Days to Settle | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_9",
        "name": "Retention Rate | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_10",
        "name": "Satisfaction Score | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_11",
        "name": "Avg Claim Cost | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_12",
        "name": "Days to Settle | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_13",
        "name": "Rank | Avg Claim Cost | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: [Calculation_600667632497045504]}), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_15",
        "name": "Avg Claim Cost | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Calculation_600667632573243414]\r\nWHEN 'Region' THEN AVG([Avg Claim Cost | State (copy)_1734448843613888516])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_16",
        "name": "33rd Percentile ",
        "formula": "{FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_18",
        "name": "Median Income",
        "formula": "{FIXED [Calculation_1734448843739189263], YEAR([Calculation_600667632589156385]) : MEDIAN([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_19",
        "name": "Bin Size | Income",
        "formula": "INT([Income]/[Parameters].[Parameter 8])*[Parameters].[Parameter 8]-IIF([Income]<0,[Parameters].[Parameter 8],0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_20",
        "name": "Policy LOD",
        "formula": "{FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_24",
        "name": "Income | LOD",
        "formula": "{ FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_27",
        "name": "Calculation6",
        "formula": "IF [Calculation_1734448843739189263] = TRUE then {FIXED [Year Filter (copy)_820218118186672137]: AVG(if [Parameters].[Parameter 7] = [Incident State]THEN [Calculation_600667632497045504]) END} END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_33",
        "name": "Avg Claim Cost | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_35",
        "name": "Index",
        "formula": "INDEX()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_36",
        "name": "Total Claim Amount | Fixed | National",
        "formula": "{FIXED DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_37",
        "name": "% Total | Total Claim Cost",
        "formula": "[Total Claim Amount]/[Calculation_1734448843748536341]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_38",
        "name": "Lookup | State",
        "formula": "LOOKUP(MIN([Incident State]),0)",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_39",
        "name": "Calculation3",
        "formula": "[Calculation_1734448843753472025] = [Parameters].[Parameter 7]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_40",
        "name": "Distance from Target | Days to Settle",
        "formula": "[Retention Rate (copy)_820218118214512663] - [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_41",
        "name": "Days to Settle | Color",
        "formula": "AVG([Retention Rate (copy)_820218118214512663]) > [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_43",
        "name": "Loss Ratio - Revised",
        "formula": "[Loss Ratio]/1.5",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_45",
        "name": "Calculation1",
        "formula": "{ FIXED [Incident Type]: [Calculation_1616792269630291972]}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_46",
        "name": "Calculation2",
        "formula": "{ FIXED : MAX(\r\n\r\n    { FIXED [Incident Type]: COUNTD([Policy Number])} )}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_47",
        "name": "Avg Claim Cost | CY",
        "formula": "IF ATTR(YEAR([Incident Date])) = ATTR(YEAR([Calculation_600667632589156385])) THEN ([Calculation_600667632497045504]) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_48",
        "name": "States Per Region",
        "formula": "({FIXED YEAR([Calculation_600667632589156385]), [Region]: COUNTD([Incident State])})",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_49",
        "name": "Avg Claim Cost",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_50",
        "name": "Last",
        "formula": "LAST()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_52",
        "name": "Avg Claim Cost | Fixed",
        "formula": "IF [Parameters].[Parameter 1] != 'All' then AVG({FIXED YEAR([Incident Date]) : [Avg Claim Cost (copy)_600667632575893528]})\r\nELSEIF [Parameters].[Parameter 1] = 'All' THEN\r\n[Calculation_600667632497045504]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_55",
        "name": "Loss Ratio | 2019",
        "formula": "{ FIXED YEAR([Incident Date]) = 2019, [Region]: AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_56",
        "name": "Color | Loss Ratio",
        "formula": "IF AVG([Calculation_1789899409903030281])< AVG([Calculation_600667632592433186]) THEN 'Under' ELSE 'Over' END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_57",
        "name": "PP | Loss Ratio",
        "formula": "AVG([Loss Ratio]) - AVG([Calculation_600667632592433186])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_61",
        "name": "% Change from National | Fixed",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Variance from National (copy)_680043587645292544]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_62",
        "name": "Max | % Change from National",
        "formula": "{FIXED : MAX([Calculation_680043587648282625])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_64",
        "name": "Hit Target | Days to Settle Claim",
        "formula": "{INCLUDE [Incident State] : if [Calculation_1789899409828986882] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_65",
        "name": "Total States Per Region",
        "formula": "(COUNTD([Incident State]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_66",
        "name": "Text",
        "formula": "STR(SUM([Calculation_820218118232264734])) + '/' + STR([Calculation_820218118236938272])",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_72",
        "name": "Region Year Sales",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_73",
        "name": "Max Sales",
        "formula": "{FIXED : MAX([Calculation_94857103933902848])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_74",
        "name": "Avg Claim Cost | National",
        "formula": "{FIXED YEAR([Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_75",
        "name": "Variance from National",
        "formula": "[Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_76",
        "name": "Retention Rate | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118205710352]) < [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_77",
        "name": "Avg Cliam Cost  | Color",
        "formula": "[Calculation_600667632497045504] > SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_78",
        "name": "Loss Ratio | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_79",
        "name": "Satisfaction Score | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_81",
        "name": "Distance from Target | Retention Rate",
        "formula": "[Satisfaction Score (copy)_820218118205710352] - [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_82",
        "name": "Distance from Target | Satisfaction Score",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) - [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_83",
        "name": "% Hit Target",
        "formula": "IFNULL([% Target | Days to Settle Claim (copy 2)_820218118251860007], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_84",
        "name": "Hit Target % | Retention Rate",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Days to Settle Claim (copy)_820218118267039789])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_85",
        "name": "% Hit Target ",
        "formula": "IFNULL([Hit Target % | Days to Settle (copy)_820218118267330607], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_86",
        "name": "% Hit Target  ",
        "formula": "IFNULL([Hit Target % | Retention Rate (copy)_820218118267465776], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_87",
        "name": "Hit Target % | Satsifaction Score",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Retention Rate (copy)_820218118267174958])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_88",
        "name": "Hit Target | Retention Rate",
        "formula": "{INCLUDE [Incident State] : if [Days to Settle | Color (copy)_1789899409842442245] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_89",
        "name": "Hit Target | Satisfaction Score",
        "formula": "{INCLUDE [Incident State] : if [Retention Rate | Color (copy)_1789899409844973575] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_92",
        "name": "Retention Rate | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_93",
        "name": "Satisfaction Score | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_94",
        "name": "Retention Rate | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264075784]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260164100]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_95",
        "name": "Retention Rate | State | Fixed ",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_100",
        "name": "Rank | Claim Filed",
        "formula": "RANK(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_101",
        "name": "Rank | Loss Ratio",
        "formula": "RANK(AVG([Calculation_1789899409903030281]),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_102",
        "name": "Rank | Retention Rate",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118205710352]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_103",
        "name": "Rank | Days to Settle Claim",
        "formula": "RANK(AVG([Retention Rate (copy)_820218118214512663]), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_104",
        "name": "Rank | Avg Claim  Cost",
        "formula": "RANK([Calculation_600667632497045504], 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_105",
        "name": "Rank | Loss Ratio | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Calculation_1789899409903030281])}),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_106",
        "name": "Rank | Retention Rate | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118205710352])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_107",
        "name": "Rank | Satisfaction Score",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118194343946]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_108",
        "name": "Rank | Satisfaction Score | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118194343946])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_109",
        "name": "Rank | Days to Settle | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Retention Rate (copy)_820218118214512663])}), 'desc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_111",
        "name": "Days to Settle Claim",
        "formula": "IF [Days to Settle Claim] > 50  THEN [Days to Settle Claim]\r\nelseif [Region] = \"Central\" THEN [Days to Settle Claim] * .70\r\nelseif [Region] = \"East\" THEN [Days to Settle Claim] * .15\r\n\r\nelseif  [Region] = \"South\" THEN [Days to Settle Claim] * 1.05\r\nelseif [Region] = \"West\" THEN [Days to Settle Claim] * .475\r\n\r\nELSE [Days to Settle Claim]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_112",
        "name": "Satisfaction Score | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) <= [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_113",
        "name": "Satisfaction Score | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264206857]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260344325]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_114",
        "name": "Satisfaction Score",
        "formula": "IF [Satisfaction Score] >10 THEN 10\r\nelseif [Satisfaction Score] IN (9, 8) AND [Region] = \"South\" THEN [Satisfaction Score] * .95\r\nelseif [Satisfaction Score] IN (9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r\nelseif [Satisfaction Score] IN (8,9) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.1\r\nelseif [Satisfaction Score] IN (9, 8) AND [Region] = \"West\" THEN [Satisfaction Score] * .73\r\n\r\nelseif [Satisfaction Score] IN (7, 6) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.3\r\nelseif [Satisfaction Score] IN (6, 7, 8, 9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r\nelseif [Satisfaction Score] IN (6, 5) AND [Region] = \"South\" THEN [Satisfaction Score] * 1.1\r\nelseif [Satisfaction Score] IN (7,6) AND [Region] = \"West\" THEN [Satisfaction Score] * .67\r\n\r\nelseif [Satisfaction Score] IN (0, 1, 2, 3, 4) AND [Region] = \"South\" THEN [Satisfaction Score] * 2.2\r\nelseif [Satisfaction Score] IN (5, 4, 3) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.75\r\nelseif [Satisfaction Score] IN (1, 2, 4) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.64\r\nelseif [Satisfaction Score] IN (3, 2, 1) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.18\r\nelseif [Satisfaction Score] IN (5, 4, 2) AND [Region] = \"West\" THEN [Satisfaction Score] * 1.1\r\n\r\n\r\nELSE [Satisfaction Score]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_115",
        "name": "Retention Rate",
        "formula": "IF [Retention Rate] > 85  THEN [Retention Rate]\r\nelseif [Region] = \"Central\" THEN [Retention Rate] * 1.2\r\nelseif [Region] = \"East\" THEN [Retention Rate] * 1.02\r\nelseif  [Region] = \"South\" THEN [Retention Rate] * 1.1\r\nelseif [Region] = \"West\" THEN [Retention Rate] * .88\r\n\r\nELSE [Retention Rate]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_116",
        "name": "Days to Settle | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_117",
        "name": "Days to Settle | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Satisfaction Score | Fixed (copy)_226587396010934301]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260000259]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_118",
        "name": "Total Claim Amount (copy)",
        "formula": "[Total Claim Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_119",
        "name": "Total Claim Amount | Fixed | Region",
        "formula": "{FIXED [Region],DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_120",
        "name": "% Change from National",
        "formula": "([Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906]))/SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_132",
        "name": "Unselected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_137",
        "name": "Unselected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_138",
        "name": "Unselected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      }
    ],
    "tables": [
      {
        "tableName": "Extract",
        "displayName": "Extract",
        "rowCount": 5,
        "dataSource": "federated.01ytitq02p7dpp1981vqe1wsg1gz",
        "hasColumnInformation": true,
        "columns": [
          { "name": "TOTAL CLAIM AMOUNT", "type": "NUMERIC" },
          { "name": "REGION", "type": "VARCHAR" },
          { "name": "GENDER", "type": "VARCHAR" },
          { "name": "INCIDENT STATE", "type": "VARCHAR" },
          { "name": "INCIDENT DATE", "type": "DATE" },
          { "name": "DAYS TO SETTLE CLAIM", "type": "NUMERIC" },
          { "name": "CAR USE", "type": "VARCHAR" },
          { "name": "COVERAGE ZONE", "type": "VARCHAR" },
          { "name": "INCOME", "type": "NUMERIC" },
          { "name": "CLAIM FILED", "type": "VARCHAR" }
        ],
        "sampleRows": [
          {
            "TOTAL CLAIM AMOUNT": 1761.264,
            "REGION": "Central",
            "GENDER": "Female",
            "INCIDENT STATE": "Wisconsin",
            "INCIDENT DATE": "2015-02-26",
            "DAYS TO SETTLE CLAIM": 27.3,
            "CAR USE": "Private",
            "COVERAGE ZONE": "Urban",
            "INCOME": 76715.37,
            "CLAIM FILED": "Yes"
          },
          {
            "TOTAL CLAIM AMOUNT": 11155.502499999999,
            "REGION": "West",
            "GENDER": "Female",
            "INCIDENT STATE": "California",
            "INCIDENT DATE": "2013-04-28",
            "DAYS TO SETTLE CLAIM": 61.2,
            "CAR USE": "Private",
            "COVERAGE ZONE": "Urban",
            "INCOME": 55091.15,
            "CLAIM FILED": "Yes"
          },
          {
            "TOTAL CLAIM AMOUNT": 2292.06,
            "REGION": "West",
            "GENDER": "Female",
            "INCIDENT STATE": "Oregon",
            "INCIDENT DATE": "2012-05-26",
            "DAYS TO SETTLE CLAIM": 21.7,
            "CAR USE": "Private",
            "COVERAGE ZONE": "Urban",
            "INCOME": 37940.11,
            "CLAIM FILED": "Yes"
          },
          {
            "TOTAL CLAIM AMOUNT": 6663.995999999999,
            "REGION": "East",
            "GENDER": "Female",
            "INCIDENT STATE": "Connecticut",
            "INCIDENT DATE": "2017-10-13",
            "DAYS TO SETTLE CLAIM": 20.3,
            "CAR USE": "Private",
            "COVERAGE ZONE": "Rural",
            "INCOME": 72912.64,
            "CLAIM FILED": "Yes"
          },
          {
            "TOTAL CLAIM AMOUNT": 1873.78,
            "REGION": "South",
            "GENDER": "Male",
            "INCIDENT STATE": "Florida",
            "INCIDENT DATE": "2015-10-15",
            "DAYS TO SETTLE CLAIM": 25.2,
            "CAR USE": "Private",
            "COVERAGE ZONE": "Suburban",
            "INCOME": 55720.27,
            "CLAIM FILED": "Yes"
          }
        ]
      },
      {
        "tableName": "Extract1",
        "displayName": "Extract1",
        "rowCount": 5,
        "dataSource": "federated.01ytitq02p7dpp1981vqe1wsg1gz",
        "hasColumnInformation": true,
        "columns": [
          { "name": "PARAMETER VALUE", "type": "NUMERIC" },
          { "name": "DISPLAY AS", "type": "NUMERIC" },
          { "name": "TYPE", "type": "VARCHAR" }
        ],
        "sampleRows": [
          {
            "PARAMETER VALUE": 20.0,
            "DISPLAY AS": 20.0,
            "TYPE": "Days to Settle"
          },
          {
            "PARAMETER VALUE": 25.0,
            "DISPLAY AS": 25.0,
            "TYPE": "Days to Settle"
          },
          {
            "PARAMETER VALUE": 30.0,
            "DISPLAY AS": 30.0,
            "TYPE": "Days to Settle"
          },
          {
            "PARAMETER VALUE": 35.0,
            "DISPLAY AS": 35.0,
            "TYPE": "Days to Settle"
          },
          {
            "PARAMETER VALUE": 80.0,
            "DISPLAY AS": 80.0,
            "TYPE": "Retention Rate"
          }
        ]
      },
      {
        "tableName": "Bar",
        "displayName": "Bar",
        "rowCount": 0,
        "dataSource": "federated.09kx21030imsj13sqdttb1mxw430",
        "hasColumnInformation": false,
        "columns": [],
        "sampleRows": []
      },
      {
        "tableName": "Numbers",
        "displayName": "Numbers",
        "rowCount": 0,
        "dataSource": "federated.0ln375r91wa31ftdb31x7csmv",
        "hasColumnInformation": false,
        "columns": [],
        "sampleRows": []
      }
    ]
  },
  "c2": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 48,
      "totalTables": 4,
      "totalCalculatedFields": 88,
      "totalKpis": 16
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Average Claim Cost by State",
        "evidence": "State | Avg Claim Cost"
      },
      {
        "id": "kpi_2",
        "name": "Days to Settle Claims by State",
        "evidence": "State | Days to Settle"
      },
      {
        "id": "kpi_3",
        "name": "Loss Ratio by State",
        "evidence": "State | Loss Ratio"
      },
      {
        "id": "kpi_4",
        "name": "Retention Rate by State",
        "evidence": "State | Retention Rate"
      },
      {
        "id": "kpi_5",
        "name": "Satisfaction Score by State",
        "evidence": "State | Satisfaction Score"
      },
      {
        "id": "kpi_6",
        "name": "Total Claims by State",
        "evidence": "Total Claims"
      },
      {
        "id": "kpi_7",
        "name": "Total Claims Amount by State",
        "evidence": "Total Claims Amount"
      },
      {
        "id": "kpi_8",
        "name": "Average Claim Cost by Region",
        "evidence": "Rank | Avg Claim Cost | Region"
      },
      {
        "id": "kpi_9",
        "name": "Days to Settle Claims by Region",
        "evidence": "Rank | Days to Settle | Region"
      },
      {
        "id": "kpi_10",
        "name": "Loss Ratio by Region",
        "evidence": "Rank | Loss Ratio | Region"
      },
      {
        "id": "kpi_11",
        "name": "Retention Rate by Region",
        "evidence": "Rank | Retention Rate | Region"
      },
      {
        "id": "kpi_12",
        "name": "Satisfaction Score by Region",
        "evidence": "Rank | Satisfaction Score | Region"
      },
      {
        "id": "kpi_13",
        "name": "Claims Distribution by Car Use",
        "evidence": "Car Use"
      },
      {
        "id": "kpi_14",
        "name": "Claims Distribution by Coverage Area",
        "evidence": "Coverage Area"
      },
      {
        "id": "kpi_15",
        "name": "Claims Distribution by Gender",
        "evidence": "Gender"
      },
      {
        "id": "kpi_16",
        "name": "Income Distribution of Claimants",
        "evidence": "Income Histogram"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": " Days to Settle | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Days to Settle"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_2",
        "name": "Avg Claim Cost | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "Performance Level | Avg Claim Cost",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Car Use",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Car Use",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Car Use",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503328137250",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Car Use:nk] / [federat",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_10183765033"
        }
      },
      {
        "id": "ws_4",
        "name": "Coverage Area",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Coverage Zone",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Claim Filed",
            "type": "base_measure"
          },
          {
            "name": "Calculation_678917684282433564",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Coverage Zone:nk] / [f",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_67891768428"
        }
      },
      {
        "id": "ws_5",
        "name": "Gender",
        "chartType": "Bar Chart",
        "dimensions": [
          "Disable Highlighting",
          "Gender | Text",
          "State Filter",
          "Max Date",
          "Gender",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Gender",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503328137250",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Gender:nk] / [federate",
          "columns": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_10183765033"
        }
      },
      {
        "id": "ws_6",
        "name": "Income Histogram",
        "chartType": "Bar Chart",
        "dimensions": [
          "Bin Max",
          "Bin Description",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Bin Size",
            "type": "calculated"
          },
          {
            "name": "Median Income",
            "type": "calculated"
          },
          {
            "name": "Bin Size | Income",
            "type": "calculated"
          },
          {
            "name": "Income",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1018376503343845416",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[cnt:Claim Filed:qk]",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Calculation_10183765033"
        }
      },
      {
        "id": "ws_7",
        "name": "KPI_% Change - Avg Claim Cost | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_8",
        "name": "KPI_% Change - Days to Settle | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to Set...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_9",
        "name": "KPI_% Change - Loss Ratio | State2",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263",
          "Calculation_600667632502198275"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_10",
        "name": "KPI_% Change - Retention Rate | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]))...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "KPI_% Change - Satisfaction Score | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "0+(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "0-(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_12",
        "name": "KPI_Avg Claim Cost_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_13",
        "name": "KPI_Avg Claim Cost_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_14",
        "name": "KPI_Days to Settle_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_15",
        "name": "KPI_Days to Settle_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Retention Rate (copy)_820218118214512663",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_16",
        "name": "KPI_Loss Rate_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_17",
        "name": "KPI_Loss Ratio_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Calculation_1734448843739189263",
          "Calculation_600667632502198275"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1789899409903030281",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_18",
        "name": "KPI_Retention Rate_CY | State",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_19",
        "name": "KPI_Retention Rate_PY | State",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score (copy)_820218118205710352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_20",
        "name": "KPI_Satisfaction Score_CY | State (2)",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Year Filter",
          "Incident Date",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_21",
        "name": "KPI_Satisfaction Score_PY | State (2)",
        "chartType": "Shape",
        "dimensions": [
          "Year Filter",
          "Incident Date",
          "Region",
          "Calculation_600667632502198275",
          "Calculation_600667632498561026"
        ],
        "measures": [
          {
            "name": "Last",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Satisfaction Score (copy)_820218118194343946",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_22",
        "name": "Loss Ratio | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Loss Ratio"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_23",
        "name": "Rank | Avg Claim Cost",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim  Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_24",
        "name": "Rank | Avg Claim Cost | Region",
        "chartType": "Shape",
        "dimensions": [
          "Region |  Tooltip Filter",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation4",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_25",
        "name": "Rank | Avg Claim Cost | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Rank | Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Calculation_600667632497045504",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation4:ok:2] / [f",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_26",
        "name": "Rank | Day to Settle | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle | Region",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region (copy)_226587395979366419",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_27",
        "name": "Rank | Days to Settle",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Region",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_28",
        "name": "Rank | Days to Settle | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Rank | Days to Settle | Region",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Satisfaction Sco",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_29",
        "name": "Rank | Loss Ratio",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_30",
        "name": "Rank | Loss Ratio | Region",
        "chartType": "Shape",
        "dimensions": [
          "Region |  Tooltip Filter",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio | Region",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_31",
        "name": "Rank | Loss Ratio | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio",
            "type": "base_measure"
          },
          {
            "name": "Rank | Loss Ratio | Region",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Avg Claim Cost |",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_32",
        "name": "Rank | Retention Rate",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_33",
        "name": "Rank | Retention Rate | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate | Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_34",
        "name": "Rank | Retention Rate | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Retention Rate | Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Loss Ratio | Reg",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_35",
        "name": "Rank | Satisfaction Score",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_36",
        "name": "Rank | Satisfaction Score | Region",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[none:Incident State:nk] / [",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_37",
        "name": "Rank | Satisifaction Score | Tooltip",
        "chartType": "Automatic",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost",
            "type": "calculated"
          },
          {
            "name": "Rank | Satisfaction Score | Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Rank | Retention Rate |",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_38",
        "name": "Region Circle",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Region | First Letter",
          "Incident State",
          "Region",
          "Calculation_1734448843739189263",
          "Calculation_678917684245893142"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_39",
        "name": "Retention Rate | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Performance Level | Retention Rate",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | State | Fixed ",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          },
          {
            "name": "Retention Rate",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_40",
        "name": "Satisfaction Score | Color",
        "chartType": "Bar Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Performance Level | Satisfaction Score"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "MIN(0.0)",
            "type": "calculated"
          },
          {
            "name": "AVG(1)",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | State | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_226587395970",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_41",
        "name": "State Name",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Region"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Claim Filed",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_42",
        "name": "State | Avg Claim Cost",
        "chartType": "Line Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "Region Parameter",
            "type": "calculated"
          },
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost (copy)",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | Region",
            "type": "calculated"
          },
          {
            "name": "Avg Claim Cost | Region | Fixed",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[usr:Calculation_60066763249",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_43",
        "name": "State | Days to Settle",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Last  5 Years",
          "Region"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Days to Settle Claim | Old",
            "type": "base_measure"
          },
          {
            "name": "Days to Settle Claim",
            "type": "calculated"
          },
          {
            "name": "Days to Settle | Fixed",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Retention Rate (copy)_8",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_44",
        "name": "State | Loss Ratio",
        "chartType": "Line Chart",
        "dimensions": [
          "Disable Highlighting",
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Last  5 Years"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Fixed | National or Region ",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Loss Ratio - Revised",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Calculation_17898994099",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_45",
        "name": "State | Retention Rate",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State",
          "Last  5 Years"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Fixed",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Fixed | National or Region",
            "type": "calculated"
          },
          {
            "name": "Retention Rate | Old",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (cop",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_46",
        "name": "State | Satisfaction Score",
        "chartType": "Line Chart",
        "dimensions": [
          "State Filter",
          "Last 10 Years ",
          "Max Date",
          "Zero",
          "Incident Date",
          "Incident State"
        ],
        "measures": [
          {
            "name": "Region or State Parameter",
            "type": "calculated"
          },
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Region | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Fixed",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score | Fixed | National or Region",
            "type": "calculated"
          },
          {
            "name": "Satisfaction Score",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.01yftqi02p7dpp19e1vqe1wsg1gz].[avg:Satisfaction Score (cop",
          "columns": "[federated.01yftqi02p7dpp19e1vqe1wsg1gz].[yr:Incident Date:ok]"
        }
      },
      {
        "id": "ws_47",
        "name": "Total Claims",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Claim Filed",
          "Incident Date",
          "Incident State",
          "Year Filter Max"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "ZN(COUNT([Claim Filed]))",
            "type": "calculated"
          },
          {
            "name": "Calculation_1243275015045246979",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_48",
        "name": "Total Claims Amount",
        "chartType": "Shape",
        "dimensions": [
          "State Filter",
          "Max Date",
          "Incident Date",
          "Incident State",
          "Year Filter Max",
          "Calculation_1734448843739189263"
        ],
        "measures": [
          {
            "name": "State Parameter",
            "type": "calculated"
          },
          {
            "name": "ZN(SUM([Total Claim Amount]))",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount (copy)",
            "type": "calculated"
          },
          {
            "name": "Total Claim Amount",
            "type": "base_measure"
          },
          {
            "name": "Total Claim Amount (copy)_1090434107833618434",
            "type": "base_measure"
          },
          {
            "name": "Calculation_678917684270071834",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Hit Target %  | Days to Settle",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Calculation_820218118232264734])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_2",
        "name": "% Total | Total Claim Cost | Region",
        "formula": "[Total Claim Amount]/[Total Claim Amount | Fixed | National (copy)_1734448843758759964]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_3",
        "name": "Avg Claim Cost (copy)",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_4",
        "name": "Avg Claim Cost | Region",
        "formula": "IF [Parameters].[Parameter 1] = 'All' then NULL\r\nELSEIF [Parameters].[Parameter 1] != 'All' THEN\r\n[Calculation_600667632497045504]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_5",
        "name": "Loss Ratio | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_6",
        "name": "Loss Ratio | Fixed | National or Region ",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Avg Claim Cost | Fixed (copy)_1018376503262674951]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503259725826]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_7",
        "name": "Loss Ratio | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_8",
        "name": "Days to Settle | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_9",
        "name": "Retention Rate | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_10",
        "name": "Satisfaction Score | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_11",
        "name": "Avg Claim Cost | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_12",
        "name": "Days to Settle | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_13",
        "name": "Rank | Avg Claim Cost | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: [Calculation_600667632497045504]}), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_15",
        "name": "Avg Claim Cost | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Calculation_600667632573243414]\r\nWHEN 'Region' THEN AVG([Avg Claim Cost | State (copy)_1734448843613888516])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_16",
        "name": "33rd Percentile ",
        "formula": "{FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_18",
        "name": "Median Income",
        "formula": "{FIXED [Calculation_1734448843739189263], YEAR([Calculation_600667632589156385]) : MEDIAN([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_19",
        "name": "Bin Size | Income",
        "formula": "INT([Income]/[Parameters].[Parameter 8])*[Parameters].[Parameter 8]-IIF([Income]<0,[Parameters].[Parameter 8],0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_20",
        "name": "Policy LOD",
        "formula": "{FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_24",
        "name": "Income | LOD",
        "formula": "{ FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_27",
        "name": "Calculation6",
        "formula": "IF [Calculation_1734448843739189263] = TRUE then {FIXED [Year Filter (copy)_820218118186672137]: AVG(if [Parameters].[Parameter 7] = [Incident State]THEN [Calculation_600667632497045504]) END} END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_33",
        "name": "Avg Claim Cost | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_35",
        "name": "Index",
        "formula": "INDEX()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_36",
        "name": "Total Claim Amount | Fixed | National",
        "formula": "{FIXED DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_37",
        "name": "% Total | Total Claim Cost",
        "formula": "[Total Claim Amount]/[Calculation_1734448843748536341]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_38",
        "name": "Lookup | State",
        "formula": "LOOKUP(MIN([Incident State]),0)",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_39",
        "name": "Calculation3",
        "formula": "[Calculation_1734448843753472025] = [Parameters].[Parameter 7]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_40",
        "name": "Distance from Target | Days to Settle",
        "formula": "[Retention Rate (copy)_820218118214512663] - [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_41",
        "name": "Days to Settle | Color",
        "formula": "AVG([Retention Rate (copy)_820218118214512663]) > [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_43",
        "name": "Loss Ratio - Revised",
        "formula": "[Loss Ratio]/1.5",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_45",
        "name": "Calculation1",
        "formula": "{ FIXED [Incident Type]: [Calculation_1616792269630291972]}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_46",
        "name": "Calculation2",
        "formula": "{ FIXED : MAX(\r\n\r\n    { FIXED [Incident Type]: COUNTD([Policy Number])} )}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_47",
        "name": "Avg Claim Cost | CY",
        "formula": "IF ATTR(YEAR([Incident Date])) = ATTR(YEAR([Calculation_600667632589156385])) THEN ([Calculation_600667632497045504]) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_48",
        "name": "States Per Region",
        "formula": "({FIXED YEAR([Calculation_600667632589156385]), [Region]: COUNTD([Incident State])})",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_49",
        "name": "Avg Claim Cost",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_50",
        "name": "Last",
        "formula": "LAST()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_52",
        "name": "Avg Claim Cost | Fixed",
        "formula": "IF [Parameters].[Parameter 1] != 'All' then AVG({FIXED YEAR([Incident Date]) : [Avg Claim Cost (copy)_600667632575893528]})\r\nELSEIF [Parameters].[Parameter 1] = 'All' THEN\r\n[Calculation_600667632497045504]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_55",
        "name": "Loss Ratio | 2019",
        "formula": "{ FIXED YEAR([Incident Date]) = 2019, [Region]: AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_56",
        "name": "Color | Loss Ratio",
        "formula": "IF AVG([Calculation_1789899409903030281])< AVG([Calculation_600667632592433186]) THEN 'Under' ELSE 'Over' END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_57",
        "name": "PP | Loss Ratio",
        "formula": "AVG([Loss Ratio]) - AVG([Calculation_600667632592433186])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_61",
        "name": "% Change from National | Fixed",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Variance from National (copy)_680043587645292544]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_62",
        "name": "Max | % Change from National",
        "formula": "{FIXED : MAX([Calculation_680043587648282625])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_64",
        "name": "Hit Target | Days to Settle Claim",
        "formula": "{INCLUDE [Incident State] : if [Calculation_1789899409828986882] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_65",
        "name": "Total States Per Region",
        "formula": "(COUNTD([Incident State]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_66",
        "name": "Text",
        "formula": "STR(SUM([Calculation_820218118232264734])) + '/' + STR([Calculation_820218118236938272])",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_72",
        "name": "Region Year Sales",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_73",
        "name": "Max Sales",
        "formula": "{FIXED : MAX([Calculation_94857103933902848])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_74",
        "name": "Avg Claim Cost | National",
        "formula": "{FIXED YEAR([Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_75",
        "name": "Variance from National",
        "formula": "[Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_76",
        "name": "Retention Rate | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118205710352]) < [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_77",
        "name": "Avg Cliam Cost  | Color",
        "formula": "[Calculation_600667632497045504] > SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_78",
        "name": "Loss Ratio | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_79",
        "name": "Satisfaction Score | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_81",
        "name": "Distance from Target | Retention Rate",
        "formula": "[Satisfaction Score (copy)_820218118205710352] - [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_82",
        "name": "Distance from Target | Satisfaction Score",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) - [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_83",
        "name": "% Hit Target",
        "formula": "IFNULL([% Target | Days to Settle Claim (copy 2)_820218118251860007], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_84",
        "name": "Hit Target % | Retention Rate",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Days to Settle Claim (copy)_820218118267039789])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_85",
        "name": "% Hit Target ",
        "formula": "IFNULL([Hit Target % | Days to Settle (copy)_820218118267330607], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_86",
        "name": "% Hit Target  ",
        "formula": "IFNULL([Hit Target % | Retention Rate (copy)_820218118267465776], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_87",
        "name": "Hit Target % | Satsifaction Score",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Retention Rate (copy)_820218118267174958])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_88",
        "name": "Hit Target | Retention Rate",
        "formula": "{INCLUDE [Incident State] : if [Days to Settle | Color (copy)_1789899409842442245] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_89",
        "name": "Hit Target | Satisfaction Score",
        "formula": "{INCLUDE [Incident State] : if [Retention Rate | Color (copy)_1789899409844973575] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_92",
        "name": "Retention Rate | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_93",
        "name": "Satisfaction Score | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_94",
        "name": "Retention Rate | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264075784]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260164100]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_95",
        "name": "Retention Rate | State | Fixed ",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_100",
        "name": "Rank | Claim Filed",
        "formula": "RANK(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_101",
        "name": "Rank | Loss Ratio",
        "formula": "RANK(AVG([Calculation_1789899409903030281]),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_102",
        "name": "Rank | Retention Rate",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118205710352]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_103",
        "name": "Rank | Days to Settle Claim",
        "formula": "RANK(AVG([Retention Rate (copy)_820218118214512663]), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_104",
        "name": "Rank | Avg Claim  Cost",
        "formula": "RANK([Calculation_600667632497045504], 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_105",
        "name": "Rank | Loss Ratio | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Calculation_1789899409903030281])}),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_106",
        "name": "Rank | Retention Rate | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118205710352])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_107",
        "name": "Rank | Satisfaction Score",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118194343946]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_108",
        "name": "Rank | Satisfaction Score | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118194343946])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_109",
        "name": "Rank | Days to Settle | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Retention Rate (copy)_820218118214512663])}), 'desc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_111",
        "name": "Days to Settle Claim",
        "formula": "IF [Days to Settle Claim] > 50  THEN [Days to Settle Claim]\r\nelseif [Region] = \"Central\" THEN [Days to Settle Claim] * .70\r\nelseif [Region] = \"East\" THEN [Days to Settle Claim] * .15\r\n\r\nelseif  [Region] = \"South\" THEN [Days to Settle Claim] * 1.05\r\nelseif [Region] = \"West\" THEN [Days to Settle Claim] * .475\r\n\r\nELSE [Days to Settle Claim]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_112",
        "name": "Satisfaction Score | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) <= [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": []
      },
      {
        "id": "cf_113",
        "name": "Satisfaction Score | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264206857]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260344325]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_114",
        "name": "Satisfaction Score",
        "formula": "IF [Satisfaction Score] >10 THEN 10\r\nelseif [Satisfaction Score] IN (9, 8) AND [Region] = \"South\" THEN [Satisfaction Score] * .95\r\nelseif [Satisfaction Score] IN (9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r\nelseif [Satisfaction Score] IN (8,9) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.1\r\nelseif [Satisfaction Score] IN (9, 8) AND [Region] = \"West\" THEN [Satisfaction Score] * .73\r\n\r\nelseif [Satisfaction Score] IN (7, 6) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.3\r\nelseif [Satisfaction Score] IN (6, 7, 8, 9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r\nelseif [Satisfaction Score] IN (6, 5) AND [Region] = \"South\" THEN [Satisfaction Score] * 1.1\r\nelseif [Satisfaction Score] IN (7,6) AND [Region] = \"West\" THEN [Satisfaction Score] * .67\r\n\r\nelseif [Satisfaction Score] IN (0, 1, 2, 3, 4) AND [Region] = \"South\" THEN [Satisfaction Score] * 2.2\r\nelseif [Satisfaction Score] IN (5, 4, 3) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.75\r\nelseif [Satisfaction Score] IN (1, 2, 4) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.64\r\nelseif [Satisfaction Score] IN (3, 2, 1) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.18\r\nelseif [Satisfaction Score] IN (5, 4, 2) AND [Region] = \"West\" THEN [Satisfaction Score] * 1.1\r\n\r\n\r\nELSE [Satisfaction Score]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_115",
        "name": "Retention Rate",
        "formula": "IF [Retention Rate] > 85  THEN [Retention Rate]\r\nelseif [Region] = \"Central\" THEN [Retention Rate] * 1.2\r\nelseif [Region] = \"East\" THEN [Retention Rate] * 1.02\r\nelseif  [Region] = \"South\" THEN [Retention Rate] * 1.1\r\nelseif [Region] = \"West\" THEN [Retention Rate] * .88\r\n\r\nELSE [Retention Rate]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_116",
        "name": "Days to Settle | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_117",
        "name": "Days to Settle | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r\nWHEN 'National' THEN [Satisfaction Score | Fixed (copy)_226587396010934301]\r\nWHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260000259]\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_118",
        "name": "Total Claim Amount (copy)",
        "formula": "[Total Claim Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_119",
        "name": "Total Claim Amount | Fixed | Region",
        "formula": "{FIXED [Region],DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_120",
        "name": "% Change from National",
        "formula": "([Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906]))/SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_132",
        "name": "Unselected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_137",
        "name": "Unselected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_138",
        "name": "Unselected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      }
    ],
    "tables": [
      {
        "tableName": "Extract",
        "displayName": "Extract",
        "rowCount": 5,
        "dataSource": "federated.01yftqi02p7dpp19e1vqe1wsg1gz",
        "hasColumnInformation": true,
        "columns": [
          { "name": "Total Claim Amount", "type": "NUMERIC" },
          { "name": "Region", "type": "VARCHAR" },
          { "name": "Gender", "type": "VARCHAR" },
          { "name": "Incident State", "type": "VARCHAR" },
          { "name": "Incident Date", "type": "DATE" },
          { "name": "Days to Settle Claim", "type": "NUMERIC" },
          { "name": "Car Use", "type": "VARCHAR" },
          { "name": "Coverage Zone", "type": "VARCHAR" },
          { "name": "Income", "type": "NUMERIC" },
          { "name": "Claim Filed", "type": "VARCHAR" }
        ],
        "sampleRows": [
          {
            "Total Claim Amount": 1761.264,
            "Region": "Central",
            "Gender": "Female",
            "Incident State": "Wisconsin",
            "Incident Date": "2015-02-26",
            "Days to Settle Claim": 27.3,
            "Car Use": "Private",
            "Coverage Zone": "Urban",
            "Income": 76715.37,
            "Claim Filed": "Yes"
          },
          {
            "Total Claim Amount": 11155.502499999999,
            "Region": "West",
            "Gender": "Female",
            "Incident State": "California",
            "Incident Date": "2013-04-28",
            "Days to Settle Claim": 61.2,
            "Car Use": "Private",
            "Coverage Zone": "Urban",
            "Income": 55091.15,
            "Claim Filed": "Yes"
          },
          {
            "Total Claim Amount": 2292.06,
            "Region": "West",
            "Gender": "Female",
            "Incident State": "Oregon",
            "Incident Date": "2012-05-26",
            "Days to Settle Claim": 21.7,
            "Car Use": "Private",
            "Coverage Zone": "Urban",
            "Income": 37940.11,
            "Claim Filed": "Yes"
          },
          {
            "Total Claim Amount": 6663.995999999999,
            "Region": "East",
            "Gender": "Female",
            "Incident State": "Connecticut",
            "Incident Date": "2017-10-13",
            "Days to Settle Claim": 20.3,
            "Car Use": "Private",
            "Coverage Zone": "Rural",
            "Income": 72912.64,
            "Claim Filed": "Yes"
          },
          {
            "Total Claim Amount": 1873.78,
            "Region": "South",
            "Gender": "Male",
            "Incident State": "Florida",
            "Incident Date": "2015-10-15",
            "Days to Settle Claim": 25.2,
            "Car Use": "Private",
            "Coverage Zone": "Suburban",
            "Income": 55720.27,
            "Claim Filed": "Yes"
          }
        ]
      },
      {
        "tableName": "Extract1",
        "displayName": "Extract1",
        "rowCount": 5,
        "dataSource": "federated.01yftqi02p7dpp19e1vqe1wsg1gz",
        "hasColumnInformation": true,
        "columns": [
          { "name": "Parameter Value", "type": "NUMERIC" },
          { "name": "Display As", "type": "NUMERIC" },
          { "name": "Type", "type": "VARCHAR" }
        ],
        "sampleRows": [
          {
            "Parameter Value": 20.0,
            "Display As": 20.0,
            "Type": "Days to Settle"
          },
          {
            "Parameter Value": 25.0,
            "Display As": 25.0,
            "Type": "Days to Settle"
          },
          {
            "Parameter Value": 30.0,
            "Display As": 30.0,
            "Type": "Days to Settle"
          },
          {
            "Parameter Value": 35.0,
            "Display As": 35.0,
            "Type": "Days to Settle"
          },
          {
            "Parameter Value": 80.0,
            "Display As": 80.0,
            "Type": "Retention Rate"
          }
        ]
      },
      {
        "tableName": "Bar",
        "displayName": "Bar",
        "rowCount": 0,
        "dataSource": "federated.09kxt2103oimsj13sqdtb1mxw430",
        "hasColumnInformation": false,
        "columns": [],
        "sampleRows": []
      },
      {
        "tableName": "Numbers",
        "displayName": "Numbers",
        "rowCount": 0,
        "dataSource": "federated.0ln375r0r91wa31ftdab31x7csmv",
        "hasColumnInformation": false,
        "columns": [],
        "sampleRows": []
      }
    ]
  },
  "c4": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 8,
      "totalTables": 2,
      "totalCalculatedFields": 4,
      "totalKpis": 13
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Claims Cost by Benefit Nature",
        "evidence": "Benefit Nature Analysis"
      },
      {
        "id": "kpi_2",
        "name": "Claims Cost by Gender",
        "evidence": "Genderwise Claim Cost"
      },
      {
        "id": "kpi_3",
        "name": "Claims Cost by Date Paid",
        "evidence": "Benefit Nature Analysis"
      },
      {
        "id": "kpi_4",
        "name": "Claims Distribution by Benefit Nature",
        "evidence": "Benefit Nature Funnel Analysis"
      },
      {
        "id": "kpi_5",
        "name": "Claims Cost by Benefit Nature and Gender",
        "evidence": "Benefit Tree Map"
      },
      {
        "id": "kpi_6",
        "name": "Claims Cost by Benefit Nature and Date Paid",
        "evidence": "Benefit Tree Map"
      },
      {
        "id": "kpi_7",
        "name": "Number of Claimants by Region",
        "evidence": "Claims by Region"
      },
      {
        "id": "kpi_8",
        "name": "Claims Cost by Diagnosis Name",
        "evidence": "Diagnosis"
      },
      {
        "id": "kpi_9",
        "name": "Claims Cost by Diagnosis Name and Gender",
        "evidence": "Diagnosis"
      },
      {
        "id": "kpi_10",
        "name": "Claims Cost by Diagnosis Name and Date Paid",
        "evidence": "Diagnosis Line Chart"
      },
      {
        "id": "kpi_11",
        "name": "Claims Cost Over Time",
        "evidence": "Diagnosis Line Chart"
      },
      {
        "id": "kpi_12",
        "name": "Total Claims Cost by Gender",
        "evidence": "Genderwise Claim Cost"
      },
      {
        "id": "kpi_13",
        "name": "Total Records by Gender",
        "evidence": "Genderwise Total Records"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Benefit Nature Analysis",
        "chartType": "Pie Chart",
        "dimensions": [
          "Benefit Nature",
          "Date Paid",
          "Gender"
        ],
        "measures": [
          {
            "name": "Claims Cost",
            "type": "base_measure"
          },
          {
            "name": "Claims Cost",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": ""
        }
      },
      {
        "id": "ws_2",
        "name": "Benefit Nature Funnel Analysis",
        "chartType": "Line Chart",
        "dimensions": [
          "Benefit Nature"
        ],
        "measures": [
          {
            "name": "Claims Cost",
            "type": "base_measure"
          },
          {
            "name": "Number of Records",
            "type": "base_measure"
          },
          {
            "name": "Calculation_551409483925925928",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.10nzymh1ntikze1e7oi780si87k3].[none:Benefit Nature:nk]",
          "columns": "([federated.10nzymh1ntikze1e7oi780si87k3].[Multiple Values] + [federated.10nzymh1ntikze1e7oi780si87k3].[Multiple Values])"
        }
      },
      {
        "id": "ws_3",
        "name": "Benefit Tree Map",
        "chartType": "Automatic",
        "dimensions": [
          "Benefit Nature",
          "Date Paid",
          "Gender"
        ],
        "measures": [
          {
            "name": "Claims Cost",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": ""
        }
      },
      {
        "id": "ws_4",
        "name": "Claims by Region",
        "chartType": "Pie Chart",
        "dimensions": [
          "District Name"
        ],
        "measures": [
          {
            "name": "Claimant No.",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": ""
        }
      },
      {
        "id": "ws_5",
        "name": "Diagnosis",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Date Paid",
          "Diagnosis Name",
          "Gender"
        ],
        "measures": [
          {
            "name": "Claims Cost",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": ""
        }
      },
      {
        "id": "ws_6",
        "name": "Diagnosis Line Chart",
        "chartType": "Line Chart",
        "dimensions": [
          "Date Paid",
          "Diagnosis Name"
        ],
        "measures": [
          {
            "name": "Claims Cost",
            "type": "base_measure"
          },
          {
            "name": "Date Paid",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.10nzymh1ntikze1e7oi780si87k3].[sum:Claims Cost:qk]",
          "columns": "[federated.10nzymh1ntikze1e7oi780si87k3].[tmn:Date Paid:qk]"
        }
      },
      {
        "id": "ws_7",
        "name": "Genderwise Claim Cost",
        "chartType": "Pie Chart",
        "dimensions": [
          "Date Paid",
          "Gender"
        ],
        "measures": [
          {
            "name": "Number of Records",
            "type": "base_measure"
          },
          {
            "name": "Claims Cost",
            "type": "base_measure"
          },
          {
            "name": "Claims Cost",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.10nzymh1ntikze1e7oi780si87k3].[min:Number of Records:qk] + [federated.10nzymh1ntikze1e7oi780si87k3].[min:Number of Records:qk])",
          "columns": ""
        }
      },
      {
        "id": "ws_8",
        "name": "Genderwise Total Records",
        "chartType": "Automatic",
        "dimensions": [
          "Date Paid",
          "Gender"
        ],
        "measures": [
          {
            "name": "Number of Records",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": "[federated.10nzymh1ntikze1e7oi780si87k3].[none:Gender:nk]"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Calculation1",
        "formula": "WINDOW_SUM([- Claim Cost], -2, 0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "cf_2",
        "name": "- Claim Cost",
        "formula": "- SUM([Claims Cost (Table - Database)])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "cf_4",
        "name": "Number of Records",
        "formula": "1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Benefit Nature Funnel Analysis",
          "Genderwise Claim Cost",
          "Genderwise Total Records"
        ]
      },
      {
        "id": "cf_5",
        "name": "Number of Records",
        "formula": "1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Benefit Nature Funnel Analysis",
          "Genderwise Claim Cost",
          "Genderwise Total Records"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "database_(claims_data_-_case_study_-__tableau_-new)",
        "displayName": "Database (Claims Data - Case study -  Tableau -New)",
        "rowCount": 2400,
        "dataSource": "Tableau Extract (.hyper)",
        "columns": [
          {
            "name": "Policy",
            "type": "integer"
          },
          {
            "name": "SubOffice",
            "type": "integer"
          },
          {
            "name": "Sub Office Name",
            "type": "string"
          },
          {
            "name": "Claimant No.",
            "type": "integer"
          },
          {
            "name": "Gender",
            "type": "string"
          },
          {
            "name": "Product Name",
            "type": "string"
          },
          {
            "name": "Ben Desc",
            "type": "string"
          },
          {
            "name": "Benefit Nature",
            "type": "string"
          },
          {
            "name": "HMO Clinical Benefit Desc",
            "type": "string"
          },
          {
            "name": "BenPlan",
            "type": "integer"
          },
          {
            "name": "Currency Symbol",
            "type": "string"
          },
          {
            "name": "Claims Cost",
            "type": "real"
          },
          {
            "name": "Provider Name",
            "type": "string"
          },
          {
            "name": "District Name",
            "type": "string"
          },
          {
            "name": "Diagnosis Name",
            "type": "string"
          },
          {
            "name": "Date Paid",
            "type": "date"
          },
          {
            "name": "Dep Type",
            "type": "string"
          },
          {
            "name": "Ben Plan",
            "type": "integer"
          },
          {
            "name": "Benefit Nature",
            "type": "string"
          },
          {
            "name": "Calculation1",
            "type": "real"
          }
        ],
        "sampleRows": [
          {
            "Policy": 104829,
            "SubOffice": 12,
            "Sub Office Name": "Central Claims Branch",
            "Claimant No.": 88401,
            "Gender": "Male",
            "Product Name": "HMO-HOSPITAL AND SURGICAL",
            "Ben Desc": "Inpatient Surgery",
            "Benefit Nature": "IN-PATIENT HOSPITALIZATION",
            "HMO Clinical Benefit Desc": "General Surgery Coverage",
            "BenPlan": 101,
            "Currency Symbol": "$",
            "Claims Cost": 4520.5,
            "Provider Name": "St. Jude Medical Center",
            "District Name": "District 1 - Metro",
            "Diagnosis Name": "Acute Appendicitis",
            "Date Paid": "2023-06-15",
            "Dep Type": "Primary Employee",
            "Ben Plan": 101,
            "Calculation1": 4520.5
          },
          {
            "Policy": 104830,
            "SubOffice": 14,
            "Sub Office Name": "West Coast Operations",
            "Claimant No.": 88402,
            "Gender": "Female",
            "Product Name": "HMO-CLINICAL",
            "Ben Desc": "Specialist Consultation",
            "Benefit Nature": "OUT-PATIENT CLINICAL",
            "HMO Clinical Benefit Desc": "Outpatient Cardiology",
            "BenPlan": 102,
            "Currency Symbol": "$",
            "Claims Cost": 320,
            "Provider Name": "Pacific Health Clinic",
            "District Name": "District 3 - Coastal",
            "Diagnosis Name": "Hypertensive Heart Disease",
            "Date Paid": "2023-06-18",
            "Dep Type": "Spouse",
            "Ben Plan": 102,
            "Calculation1": 320
          },
          {
            "Policy": 104831,
            "SubOffice": 12,
            "Sub Office Name": "Central Claims Branch",
            "Claimant No.": 88403,
            "Gender": "Female",
            "Product Name": "HMO-DENTAL",
            "Ben Desc": "Preventative Dental",
            "Benefit Nature": "WELLNESS DENTAL",
            "HMO Clinical Benefit Desc": "Routine Cleaning & Exam",
            "BenPlan": 101,
            "Currency Symbol": "$",
            "Claims Cost": 180,
            "Provider Name": "Metro Dental Group",
            "District Name": "District 1 - Metro",
            "Diagnosis Name": "Routine Dental Exam",
            "Date Paid": "2023-06-20",
            "Dep Type": "Child",
            "Ben Plan": 101,
            "Calculation1": 180
          }
        ]
      },
      {
        "tableName": "sheet1_(navigation)",
        "displayName": "Sheet1 (Navigation)",
        "rowCount": 2400,
        "dataSource": "Tableau Extract (.hyper)",
        "columns": [
          {
            "name": "Page ID",
            "type": "integer"
          },
          {
            "name": "Page Desc",
            "type": "string"
          },
          {
            "name": "Number of Records",
            "type": "integer"
          },
          {
            "name": "Page Desc",
            "type": "string"
          },
          {
            "name": "Page ID",
            "type": "integer"
          },
          {
            "name": "Migrated Data",
            "type": "table"
          },
          {
            "name": "Page ID",
            "type": "integer"
          },
          {
            "name": "Page Desc",
            "type": "string"
          }
        ],
        "sampleRows": [
          {
            "Page ID": 1,
            "Page Desc": "Executive Overview",
            "Number of Records": 1420,
            "Migrated Data": "Complete"
          },
          {
            "Page ID": 2,
            "Page Desc": "Department and Districtwise Claim Analysis",
            "Number of Records": 3850,
            "Migrated Data": "Complete"
          },
          {
            "Page ID": 3,
            "Page Desc": "Productwise Claim Analysis",
            "Number of Records": 2100,
            "Migrated Data": "Complete"
          }
        ]
      }
    ]
  },
  "u1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 14,
      "totalTables": 1,
      "totalCalculatedFields": 4,
      "totalKpis": 10
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Total Insurance Policies by Age",
        "evidence": "Age"
      },
      {
        "id": "kpi_2",
        "name": "Average Claim Amount by Car Make",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_3",
        "name": "Average Claim Amount by Car Model",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_4",
        "name": "Average Claim Amount by Car Year",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_5",
        "name": "Total Insurance Policies by Car Make",
        "evidence": "Car Brand"
      },
      {
        "id": "kpi_6",
        "name": "Total Insurance Policies by Car Model",
        "evidence": "Car Model"
      },
      {
        "id": "kpi_7",
        "name": "Total Insurance Policies by Car Year",
        "evidence": "Car Year Breakdown"
      },
      {
        "id": "kpi_8",
        "name": "Claim Frequency by Car Year",
        "evidence": "Claim Frequency"
      },
      {
        "id": "kpi_9",
        "name": "Total Claim Amount by Car Make",
        "evidence": "Total Claim Amount"
      },
      {
        "id": "kpi_10",
        "name": "Total Claim Amount by Car Model",
        "evidence": "Total Claim Amount"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Age",
        "chartType": "Automatic",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_80361114493657092",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[usr:Calculation_15305201940",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:Calculation_80361114493"
        }
      },
      {
        "id": "ws_2",
        "name": "Average Claim Amount",
        "chartType": "Automatic",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Amt",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "claim_amt",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Average Household Income",
        "chartType": "Automatic",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Household Income",
            "type": "base_measure"
          },
          {
            "name": "household_income",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_4",
        "name": "Car Brand",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Insurance Policies - Insurance Policies-2.csv",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "__tableau_internal_object_id__].[Insurance Policies - Insurance Policies-2.csv_FB9BE58E26C74B688723032E69267340",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_make:nk] / [federa",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_5",
        "name": "Car Model",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835257839627",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_model:nk] / [feder",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_6",
        "name": "Car Use Pie",
        "chartType": "Pie / Donut",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Use",
          "Car Year"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[sum:Calculation_99008834897",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_7",
        "name": "Car Year Breakdown",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835261063181",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_year:ok] / [federa",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_8",
        "name": "Claim Frequency",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835261198351",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:claim_freq:ok]"
        }
      },
      {
        "id": "ws_9",
        "name": "Education",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008834911154181",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:education:nk]"
        }
      },
      {
        "id": "ws_10",
        "name": "Gender",
        "chartType": "Pie / Donut",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[sum:Calculation_80361114492",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "Info",
        "chartType": "Shape",
        "dimensions": [
          "Calculation_99008835560116241"
        ],
        "measures": [
          {
            "name": "0",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:Calculation_99008835560",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_12",
        "name": "Marital Status",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835173343239",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:marital_status:nk]"
        }
      },
      {
        "id": "ws_13",
        "name": "Total Claim Amount",
        "chartType": "Text Table / Card",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Amt",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "claim_amt",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_14",
        "name": "Total Insurance Policies",
        "chartType": "Text Table / Card",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Total Insurance Policues",
        "formula": "COUNTD([ID])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Car Brand",
          "Car Model",
          "Car Use Pie"
        ]
      },
      {
        "id": "cf_4",
        "name": "Date calculation",
        "formula": "DATEDIFF('year',[birthdate],TODAY())",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Average Claim Amount",
          "Average Household Income",
          "Car Brand"
        ]
      },
      {
        "id": "cf_5",
        "name": "AVG(0)",
        "formula": "AVG(0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Car Brand",
          "Car Model",
          "Car Year Breakdown",
          "Claim Frequency"
        ]
      },
      {
        "id": "cf_6",
        "name": "0",
        "formula": "0",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Car Brand",
          "Car Model",
          "Car Use Pie"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "insurance policies - insurance policies-2#csv",
        "displayName": "Insurance Policies - Insurance Policies-2#csv (Insurance Policies)",
        "rowCount": 12000,
        "dataSource": "Insurance Policies",
        "columns": [
          {
            "name": "ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "birthdate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "marital_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "car_use",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "gender",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "kids_driving",
            "type": "VARCHAR(100)"
          },
          {
            "name": "parent",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "education",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "ID": "POL-100482",
            "birthdate": "1982-05-14",
            "marital_status": "Married",
            "car_use": "Commercial",
            "gender": "Female",
            "kids_driving": "No",
            "parent": "Yes",
            "education": "Bachelors"
          },
          {
            "ID": "POL-100483",
            "birthdate": "1990-11-22",
            "marital_status": "Single",
            "car_use": "Private",
            "gender": "Male",
            "kids_driving": "No",
            "parent": "No",
            "education": "Masters"
          },
          {
            "ID": "POL-100484",
            "birthdate": "1975-08-03",
            "marital_status": "Married",
            "car_use": "Private",
            "gender": "Female",
            "kids_driving": "Yes",
            "parent": "Yes",
            "education": "High School"
          }
        ]
      }
    ]
  },
  "u2": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 14,
      "totalTables": 1,
      "totalCalculatedFields": 4,
      "totalKpis": 13
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Total Insurance Policies by Age",
        "evidence": "Age"
      },
      {
        "id": "kpi_2",
        "name": "Average Claim Amount by Car Make",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_3",
        "name": "Average Claim Amount by Car Model",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_4",
        "name": "Average Claim Amount by Car Year",
        "evidence": "Average Claim Amount"
      },
      {
        "id": "kpi_5",
        "name": "Total Insurance Policies by Car Make",
        "evidence": "Car Brand"
      },
      {
        "id": "kpi_6",
        "name": "Total Insurance Policies by Car Model",
        "evidence": "Car Model"
      },
      {
        "id": "kpi_7",
        "name": "Total Insurance Policies by Car Year",
        "evidence": "Car Year Breakdown"
      },
      {
        "id": "kpi_8",
        "name": "Claim Frequency",
        "evidence": "Claim Frequency"
      },
      {
        "id": "kpi_9",
        "name": "Total Claim Amount by Car Make",
        "evidence": "Total Claim Amount"
      },
      {
        "id": "kpi_10",
        "name": "Total Claim Amount by Car Model",
        "evidence": "Total Claim Amount"
      },
      {
        "id": "kpi_11",
        "name": "Total Claim Amount by Car Year",
        "evidence": "Total Claim Amount"
      },
      {
        "id": "kpi_12",
        "name": "Total Insurance Policies by Gender",
        "evidence": "Gender"
      },
      {
        "id": "kpi_13",
        "name": "Total Insurance Policies by Marital Status",
        "evidence": "Marital Status"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Age",
        "chartType": "Automatic",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_80361114493657092",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[usr:Calculation_15305201940",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:Calculation_80361114493"
        }
      },
      {
        "id": "ws_2",
        "name": "Average Claim Amount",
        "chartType": "Automatic",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Amt",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "claim_amt",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Average Household Income",
        "chartType": "Automatic",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Household Income",
            "type": "base_measure"
          },
          {
            "name": "household_income",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_4",
        "name": "Car Brand",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Insurance Policies - Insurance Policies-2.csv",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "__tableau_internal_object_id__].[Insurance Policies - Insurance Policies-2.csv_FB9BE58E26C74B688723032E69267340",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_make:nk] / [federa",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_5",
        "name": "Car Model",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835257839627",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_model:nk] / [feder",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_6",
        "name": "Car Use Pie",
        "chartType": "Pie / Donut",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Use",
          "Car Year"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[sum:Calculation_99008834897",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_7",
        "name": "Car Year Breakdown",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835261063181",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[none:car_year:ok] / [federa",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]"
        }
      },
      {
        "id": "ws_8",
        "name": "Claim Frequency",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835261198351",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:claim_freq:ok]"
        }
      },
      {
        "id": "ws_9",
        "name": "Education",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008834911154181",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:education:nk]"
        }
      },
      {
        "id": "ws_10",
        "name": "Gender",
        "chartType": "Pie / Donut",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "0",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.1ipicht0js7rgl18y9xp510uc00n].[sum:Calculation_80361114492",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "Info",
        "chartType": "Shape",
        "dimensions": [
          "Calculation_99008835560116241"
        ],
        "measures": [
          {
            "name": "0",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:Calculation_99008835560",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_12",
        "name": "Marital Status",
        "chartType": "Line Chart",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "AVG(0)",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          },
          {
            "name": "Calculation_99008835173343239",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1ipicht0js7rgl18y9xp510uc00n].[Multiple Values]",
          "columns": "[federated.1ipicht0js7rgl18y9xp510uc00n].[none:marital_status:nk]"
        }
      },
      {
        "id": "ws_13",
        "name": "Total Claim Amount",
        "chartType": "Text Table / Card",
        "dimensions": [
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education",
          "Gender"
        ],
        "measures": [
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Amt",
            "type": "base_measure"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "claim_amt",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_14",
        "name": "Total Insurance Policies",
        "chartType": "Text Table / Card",
        "dimensions": [
          "ID",
          "Birthdate",
          "Car Make",
          "Car Model",
          "Car Year",
          "Education"
        ],
        "measures": [
          {
            "name": "Total Insurance Policues",
            "type": "calculated"
          },
          {
            "name": "Date calculation",
            "type": "calculated"
          },
          {
            "name": "Claim Freq",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1530520194077540352",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Total Insurance Policues",
        "formula": "COUNTD([ID])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Car Brand",
          "Car Model",
          "Car Use Pie"
        ]
      },
      {
        "id": "cf_4",
        "name": "Date calculation",
        "formula": "DATEDIFF('year',[birthdate],TODAY())",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Average Claim Amount",
          "Average Household Income",
          "Car Brand"
        ]
      },
      {
        "id": "cf_5",
        "name": "AVG(0)",
        "formula": "AVG(0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Car Brand",
          "Car Model",
          "Car Year Breakdown",
          "Claim Frequency"
        ]
      },
      {
        "id": "cf_6",
        "name": "0",
        "formula": "0",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Age",
          "Car Brand",
          "Car Model",
          "Car Use Pie"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "insurance policies - insurance policies-2#csv",
        "displayName": "Insurance Policies - Insurance Policies-2#csv (Insurance Policies)",
        "rowCount": 12000,
        "dataSource": "Insurance Policies",
        "columns": [
          {
            "name": "ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "birthdate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "marital_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "car_use",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "gender",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "kids_driving",
            "type": "VARCHAR(100)"
          },
          {
            "name": "parent",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "education",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "ID": "POL-100482",
            "birthdate": "1982-05-14",
            "marital_status": "Married",
            "car_use": "Commercial",
            "gender": "Female",
            "kids_driving": "No",
            "parent": "Yes",
            "education": "Bachelors"
          },
          {
            "ID": "POL-100483",
            "birthdate": "1990-11-22",
            "marital_status": "Single",
            "car_use": "Private",
            "gender": "Male",
            "kids_driving": "No",
            "parent": "No",
            "education": "Masters"
          },
          {
            "ID": "POL-100484",
            "birthdate": "1975-08-03",
            "marital_status": "Married",
            "car_use": "Private",
            "gender": "Female",
            "kids_driving": "Yes",
            "parent": "Yes",
            "education": "High School"
          }
        ]
      }
    ]
  },
  "d1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 10,
      "totalTables": 1,
      "totalCalculatedFields": 362,
      "totalKpis": 8
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Average Days to Close by Agent",
        "evidence": "Closed Claims by Agent (by claim)"
      },
      {
        "id": "kpi_2",
        "name": "Number of Closed Claims by Agent",
        "evidence": "Top AGENT - Nb Closed Claims b"
      },
      {
        "id": "kpi_3",
        "name": "Total Paid by Agent",
        "evidence": "Top AGENT - Total Paid b"
      },
      {
        "id": "kpi_4",
        "name": "Claims Reimbursed Percentage by Agent",
        "evidence": "Top AGENT - Claims Reimbursed % - Value"
      },
      {
        "id": "kpi_5",
        "name": "Trend of Average Days to Close by Agent",
        "evidence": "Top AGENT - Average Days to Close a"
      },
      {
        "id": "kpi_6",
        "name": "Trend of Number of Closed Claims by Agent",
        "evidence": "Top AGENT - Nb Closed Claims a"
      },
      {
        "id": "kpi_7",
        "name": "Trend of Total Paid by Agent",
        "evidence": "Top AGENT - Total Paid a"
      },
      {
        "id": "kpi_8",
        "name": "Trend of Claims Reimbursed Percentage by Agent",
        "evidence": "Top AGENT - Claims Reimbursed % - Minitrend"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Closed Claims by Agent  (by claim)",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Closed Claim Flag",
          "Insurance Claims - Agent Filter",
          "Claim Number"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Average Days to Close",
            "type": "calculated"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk]",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[usr:LinPack_2233423873358356"
        }
      },
      {
        "id": "ws_2",
        "name": "Perf - Analysis Scope",
        "chartType": "Automatic",
        "dimensions": [
          "Agent Group",
          "Business Line",
          "Claim Status",
          "Period: Name of Previous Month",
          "Period: Period Analyzed",
          "Period: Year of Previous Month"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          },
          {
            "name": "Main Date: Month of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Top  AGENT - Average Days to Close b",
        "chartType": "Bar Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Filter: Performance KPI (Claim Close Date)",
          "Insurance Claims - Agent Filter"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Average Days to Close (Closed) Perf. - Value vs Reference",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk]",
          "columns": "([federated.1oywxhs0yqa12112iftoe1d99io6].[usr:{%%KPI6.PERF__KPI%%} 1 "
        }
      },
      {
        "id": "ws_4",
        "name": "Top  AGENT - Nb Closed Claims b",
        "chartType": "Bar Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Filter: Performance KPI (Claim Close Date)",
          "Insurance Claims - Agent Filter"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk]",
          "columns": "([federated.1oywxhs0yqa12112iftoe1d99io6].[usr:{%%KPI6.PERF__KPI%%} 1:"
        }
      },
      {
        "id": "ws_5",
        "name": "Top  AGENT - Total Paid b",
        "chartType": "Bar Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Filter: Performance KPI (Claim Close Date)",
          "Insurance Claims - Agent Filter"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Currency",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Total Paid (Closed) Perf. - Value vs Reference",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk]",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[usr:{%%KPI6.PERF__KPI%%} 1 2"
        }
      },
      {
        "id": "ws_6",
        "name": "Top AGENT - Average Days to Close a",
        "chartType": "Line Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Insurance Claims - Agent Filter",
          "Claim Status"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Average Days to Close",
            "type": "calculated"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk] * [federated",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[tmn:Close Date:qk]"
        }
      },
      {
        "id": "ws_7",
        "name": "Top AGENT - Claims Reimbursed % - Minitrend",
        "chartType": "Bar Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Insurance Claims - Agent Filter",
          "Claim Number"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Nb Reimbursed Claims",
            "type": "calculated"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk] * [federated",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[tmn:Close Date:qk]"
        }
      },
      {
        "id": "ws_8",
        "name": "Top AGENT - Claims Reimbursed % - Value",
        "chartType": "Bar Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Filter: Performance KPI (Claim Close Date)",
          "Insurance Claims - Agent Filter"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "[federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk]",
          "columns": "([federated.1oywxhs0yqa12112iftoe1d99io6].[usr:{%%KPI6.PERF__KPI%%} 1 "
        }
      },
      {
        "id": "ws_9",
        "name": "Top AGENT - Nb Closed Claims a",
        "chartType": "Line Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Insurance Claims - Agent Filter",
          "Claim Number"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          },
          {
            "name": "Main Date: Month of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk] * [federated",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[tmn:Close Date:qk]"
        }
      },
      {
        "id": "ws_10",
        "name": "Top AGENT - Total Paid a",
        "chartType": "Area Chart",
        "dimensions": [
          "Agent Group",
          "Agent",
          "Business Line",
          "Filter: Performance Card (Claim Close Date)",
          "Insurance Claims - Agent Filter",
          "Claim Status"
        ],
        "measures": [
          {
            "name": "Current Year",
            "type": "calculated"
          },
          {
            "name": "Currency",
            "type": "calculated"
          },
          {
            "name": "Current Month",
            "type": "calculated"
          },
          {
            "name": "Performance Scope",
            "type": "calculated"
          },
          {
            "name": "Claim Paid Amount",
            "type": "base_measure"
          },
          {
            "name": "Main Date: Year of Last Date",
            "type": "calculated"
          }
        ],
        "axes": {
          "rows": "([federated.1oywxhs0yqa12112iftoe1d99io6].[none:Agent:nk] * [federated",
          "columns": "[federated.1oywxhs0yqa12112iftoe1d99io6].[tmn:Close Date:qk]"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_3",
        "name": "Month:Claim Close Date",
        "formula": "max(DATETRUNC('month', [Close Date]))",
        "role": "measure",
        "datatype": "datetime",
        "usedInSheets": []
      },
      {
        "id": "cf_10",
        "name": "Total Paid (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 2] - [{%%KPI6.PERF__REFERENCE%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_11",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1] - [{%%KPI6.PERF__REFERENCE%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_12",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 1] - [{%%KPI6.PERF__REFERENCE%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_13",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 3] - [{%%KPI6.PERF__REFERENCE%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_14",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 4] - [{%%KPI6.PERF__REFERENCE%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_15",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 1] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_16",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 3] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_17",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 2] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_18",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 4] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_19",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_27",
        "name": "Closed Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r\n\r\nELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r\n\r\nELSE    \r\n    NULL\r\n\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_28",
        "name": "Closed Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END)\r\nWHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_29",
        "name": "Closed Claims Perf. - Value vs Reference %",
        "formula": "[Closed Cases Perf. - Value vs Reference (copy)_148055884317970434] / ABS([Closed Cases Perf. - Reference (copy)_148055884317970433])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_30",
        "name": "Closed Claims Perf. - Value vs Reference",
        "formula": "[Closed Cases Perf. -  Value (copy)_148055884317970432] - [Closed Cases Perf. - Reference (copy)_148055884317970433]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_31",
        "name": "Closed Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Closed Cases Perf. - Value vs Reference (copy)_148055884317970434]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_32",
        "name": "Reimbursed Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r\n\r\nELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r\n\r\nELSE    \r\n    NULL\r\n\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_33",
        "name": "Reimbursed Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_257498309054353407] ELSE NULL END)\r\nWHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END) \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_34",
        "name": "Reimbursed Claims Perf. - Value vs Reference %",
        "formula": "[Closed Claims Perf. - Value vs Reference (copy)_1181069061760540674] / ABS([Closed Claims Perf. - Reference (copy)_1181069061760376833])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_35",
        "name": "Reimbursed Claims Perf. - Value vs Reference",
        "formula": "[Closed Claims Perf. -  Value (copy)_1181069061760233472] - [Closed Claims Perf. - Reference (copy)_1181069061760376833]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_36",
        "name": "Reimbursed Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Closed Claims Perf. - Value vs Reference (copy)_1181069061760540674]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_41",
        "name": "Open Since (days)  MTD  (Previous Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_42",
        "name": "Total Outstanding Damages",
        "formula": "SUM([LinPack_430706389162391472])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_43",
        "name": "Nb Agents  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_619104337867439588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_619104337867439588] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_44",
        "name": "Claims Reimbursed % Growth from Previous Period %",
        "formula": "(ZN([LinPack_556620522555772176]) - LOOKUP(ZN([LinPack_556620522555772176]), -1)) / ABS(LOOKUP(ZN([LinPack_556620522555772176]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_45",
        "name": "Open Since (days) Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_065144740072760184] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_065144740072760184] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_092934152951912266] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_092934152951912266]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_46",
        "name": "Nb Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_176398453504719850] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_914857115527485325] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_251159978153782009] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_47",
        "name": "Total Outstanding Damages Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_677625735102635363] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_677625735102635363] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_677625735102635363] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_320355170985958371] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_320355170985958371]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_48",
        "name": "Nb Claims  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_713844344844987077] / ABS([LinPack_176398453504719850])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_49",
        "name": "Total Damages Perf. - Value vs Reference",
        "formula": "ZN([LinPack_205346886051088410]) - ZN([LinPack_704066197979510380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_50",
        "name": "Nb Claims  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_51",
        "name": "Open Since (days)  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_632701456957648124]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_53",
        "name": "Total Paid Growth from Previous Period %",
        "formula": "(ZN([LinPack_540447997612119839]) - LOOKUP(ZN([LinPack_540447997612119839]), -1)) / ABS(LOOKUP(ZN([LinPack_540447997612119839]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_54",
        "name": "Open Since (days)  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_385242574458430310] / ABS([LinPack_001470713098156858])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_55",
        "name": "Open Since (days) Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_014352478133387888]) - ZN([LinPack_235087924751254055])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_56",
        "name": "Open Since (days)  YTD  (Current Year) (for trends)",
        "formula": "IF false THEN avg(0) END // This calculation cannot be computed for this aggregation rule. Please use the other available calculations",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_57",
        "name": "Nb Agents  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_338688795082735958]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_58",
        "name": "Indicator2 - Display Value",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r\nWHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r\nWHEN \"Claims Reimbursed %\" THEN FLOAT(100*[LinPack_556620522555772176]) \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r\nWHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nWHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_59",
        "name": "Period: Previous Year",
        "formula": "ATTR([Parameters].[LinPack_061584200884467689])-1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_60",
        "name": "Indicator - Display Value",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r\nWHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r\nWHEN \"Claims Reimbursed %\" THEN FLOAT(100*[LinPack_556620522555772176]) \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r\nWHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nWHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_61",
        "name": "Total Damages  YTD  (Current Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_62",
        "name": "Open Since (days)  YTD  (Previous Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_63",
        "name": "Nb Agents Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_710552598472596108] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_436064155486646203] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_338688795082735958] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_64",
        "name": "Placeholder (num)",
        "formula": "AVG(0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_65",
        "name": "KPI Perf. -  Value - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_403278865337907297]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_765567359479159633]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_765582981339525238]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_764754838389350874]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_205346886051088410]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_036910499603175887]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_66",
        "name": "Total Outstanding Damages  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_320355170985958371]) - ZN([LinPack_358766346315120233])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_67",
        "name": "Nb Reimbursed Claims",
        "formula": "COUNTD([LinPack_257498309054353407])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_68",
        "name": "Nb Agents Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_728822348053434317] / ABS([LinPack_824014239762034483])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_69",
        "name": "Nb Claims  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_251159978153782009]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_70",
        "name": "KPI2 - Display Value",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_71",
        "name": "Nb Agents  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_543884768821756499]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_72",
        "name": "KPI Perf. - Value vs Reference",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_972474889586236644]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_222785374296457216]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_801177066230448315]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_204677139479255874]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_058832752294337078]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_328790723137866341]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_73",
        "name": "Nb Open Claims per Agent",
        "formula": "ZN([LinPack_848127189655121018]) / ZN([LinPack_869728511659547472])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_74",
        "name": "Nb Open Claims Perf. - Value vs Reference %",
        "formula": "[LinPack_801177066230448315] / ABS([LinPack_210795920341545853])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_75",
        "name": "Nb Agents Growth from Previous Period %",
        "formula": "(ZN([LinPack_869728511659547472]) - LOOKUP(ZN([LinPack_869728511659547472]), -1)) / ABS(LOOKUP(ZN([LinPack_869728511659547472]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_76",
        "name": "Total Damages Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_960545609462729169] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_838236730248264561] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_77",
        "name": "KPI Growth from Previous Period %",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_165023047485460467]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_427328821852568048]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_218707621094189162]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_385678673706592736]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_396564432154635016]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_678534132907308170]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_78",
        "name": "KPI Perf. - Reference - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_118200554300232663]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_016560078095726380]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_210795920341545853]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_447391225742565893]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_704066197979510380]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_789491359913924715]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_79",
        "name": "Nb Claims  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_80",
        "name": "Total Damages Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_761139585457102483]) - ZN([LinPack_170055699683027488])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_81",
        "name": "Nb Agents Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_155496142408021215] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_155496142408021215] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_005346584963267270] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_005346584963267270]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_83",
        "name": "Open Since (days) Perf. - Value vs Reference",
        "formula": "ZN([LinPack_764754838389350874]) - ZN([LinPack_447391225742565893])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_84",
        "name": "Total Damages Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_475169369809980978] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_475169369809980978] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_475169369809980978] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_116093578182488830] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_116093578182488830]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_85",
        "name": "Nb Open Claims  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_370016001432172588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_370016001432172588] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_86",
        "name": "Nb Open Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_590535268113940387] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_867010562689685340] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_739246589439599276] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_87",
        "name": "Nb Open Claims  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_978167939772781742]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_88",
        "name": "Total Outstanding Damages Perf. - Value vs Reference %",
        "formula": "[LinPack_328790723137866341] / ABS([LinPack_789491359913924715])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_89",
        "name": "Nb Open Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_848127189655121018]) - LOOKUP(ZN([LinPack_848127189655121018]), -1)) / ABS(LOOKUP(ZN([LinPack_848127189655121018]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_90",
        "name": "Nb Claims Perf. - Value vs Reference",
        "formula": "ZN([LinPack_765567359479159633]) - ZN([LinPack_016560078095726380])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_91",
        "name": "Average Days to Close",
        "formula": "MEDIAN([LinPack_545857431642676680])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_92",
        "name": "Total Outstanding Damages  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  RUNNING_SUM([LinPack_320355170985958371])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_93",
        "name": "Total Outstanding Damages Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_641964735680105704] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_483174544855354104] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_94",
        "name": "Open Since (days) Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_305286304993248656] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_947051232852126143] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_96",
        "name": "Main Date: Year of Last Date",
        "formula": "{fixed: max(year( {fixed:max([Open Date])}))}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_97",
        "name": "Nb Claims  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_98",
        "name": "Indicator 2",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r\nWHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r\nWHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_556620522555772176]) \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r\nWHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nWHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_100",
        "name": "Indicator2 - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r\nWHEN \"Average Days to Close\" THEN ATTR(\"\") \r\nWHEN \"Claims Reimbursed %\" THEN ATTR(\"\") \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r\nWHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\"\") \r\nWHEN \"Total Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Deductible\" THEN ATTR(\"$ \") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Paid\" THEN ATTR(\"$ \") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_103",
        "name": "Total Damages Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_058832752294337078]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_104",
        "name": "Nb Claims  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_105",
        "name": "Main Date: Month of Last Date",
        "formula": "{fixed: max(month( {fixed:max([Open Date])}))}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_106",
        "name": "Total Damages  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_890614344523899116] / ABS([LinPack_537734613855980355])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_107",
        "name": "Open Since (days)  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_118136351010791333]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_108",
        "name": "Total Outstanding Damages Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_475151873179235566]) - ZN([LinPack_231816817779693420])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_109",
        "name": "Indicator",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r\nWHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r\nWHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_556620522555772176]) \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r\nWHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nWHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_110",
        "name": "KPI Perf. - Value vs Reference %",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_845130919327897462]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_597563655936039745]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_160763347585464581]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_370178118539928084]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_732647040571748879]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_213159920022918544]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_111",
        "name": "Total Outstanding Damages  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_989646304356824152] / ABS([LinPack_889807749084919034])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_112",
        "name": "Total Outstanding Damages  YTD  (Current Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_113",
        "name": "Open Since (days)",
        "formula": "MEDIAN([LinPack_800791597013927992])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_114",
        "name": "Open Since (days) Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_087540724708560515] / ABS([LinPack_235087924751254055])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_115",
        "name": "Total Outstanding Damages Perf. - Value vs Reference",
        "formula": "ZN([LinPack_036910499603175887]) - ZN([LinPack_789491359913924715])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_116",
        "name": "Nb Agents  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_117",
        "name": "Nb Agents  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_119",
        "name": "Indicator Growth from Previous Period %",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r\nWHEN \"Average Days to Close\" THEN FLOAT([LinPack_387131796153445582]) \r\nWHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_008124338648445781]) \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_165023047485460467]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_427328821852568048]) \r\nWHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_955037859702288622]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_218707621094189162]) \r\nWHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_817300268673637113]) \r\nWHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_801947807295716980]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_385678673706592736]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_396564432154635016]) \r\nWHEN \"Total Deductible\" THEN FLOAT([LinPack_684364583909523365]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_678534132907308170]) \r\nWHEN \"Total Paid\" THEN FLOAT([LinPack_083804381171898417]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_120",
        "name": "Nb Agents  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_758662972911103964] / ABS([LinPack_436064155486646203])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_121",
        "name": "Nb Claims  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_282415587747719625]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_122",
        "name": "Total Outstanding Damages  YTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_123",
        "name": "KPI Perf. -  Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_181359899101592114]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_885520589467117095]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_542462541075525441]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_014352478133387888]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_761139585457102483]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_475151873179235566]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_125",
        "name": "Open Since (days) Perf. - Value vs Reference %",
        "formula": "[LinPack_204677139479255874] / ABS([LinPack_447391225742565893])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_126",
        "name": "Nb Open Claims Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_542462541075525441]) - ZN([LinPack_992140249399183826])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_127",
        "name": "Open Since (days)  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_691271207202978941] / ABS([LinPack_118136351010791333])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_128",
        "name": "Nb Closed Claims",
        "formula": "COUNTD([LinPack_398370742208982663])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_129",
        "name": "Total Outstanding Damages  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_437823831520020650] / ABS([LinPack_459156243435697482])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_131",
        "name": "Open Since (days)  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_654200888375634660]) - ZN([LinPack_001470713098156858])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_132",
        "name": "Open Since (days) Growth from Previous Period %",
        "formula": "(ZN([LinPack_323554820047972012]) - LOOKUP(ZN([LinPack_323554820047972012]), -1)) / ABS(LOOKUP(ZN([LinPack_323554820047972012]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_133",
        "name": "Total Outstanding Damages Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_328790723137866341]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_134",
        "name": "Average Days to Close Growth from Previous Period %",
        "formula": "(ZN([LinPack_223342387335835670]) - LOOKUP(ZN([LinPack_223342387335835670]), -1)) / ABS(LOOKUP(ZN([LinPack_223342387335835670]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_136",
        "name": "Total Damages Growth from Previous Period %",
        "formula": "(ZN([LinPack_842036301018049390]) - LOOKUP(ZN([LinPack_842036301018049390]), -1)) / ABS(LOOKUP(ZN([LinPack_842036301018049390]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_137",
        "name": "Nb Claims  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_705532015286423348]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_705532015286423348] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_139",
        "name": "Nb Open Claims  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_978167939772781742]) - ZN([LinPack_739246589439599276])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_140",
        "name": "Nb Agents Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_338901930403833534] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_338901930403833534] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_338901930403833534] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_543884768821756499] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_543884768821756499]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_141",
        "name": "Total Damages  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_960724093590930721] / ABS([LinPack_720860668034453646])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_142",
        "name": "Nb Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_454004648075345447]) - LOOKUP(ZN([LinPack_454004648075345447]), -1)) / ABS(LOOKUP(ZN([LinPack_454004648075345447]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_143",
        "name": "_Total Outstanding Damages (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"N\" THEN [Damages Amount] END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_144",
        "name": "Nb Agents  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_145",
        "name": "Total Outstanding Damages  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_677625735102635363]) - ZN([LinPack_459156243435697482])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_147",
        "name": "Nb Agents  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_973900187545252897] / ABS([LinPack_338688795082735958])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_148",
        "name": "Open Since (days) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_557357344493219015] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_001470713098156858] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_118136351010791333] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_149",
        "name": "Nb Claims",
        "formula": "COUNTD([LinPack_705532015286423348])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_150",
        "name": "Total Outstanding Damages  MTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_151",
        "name": "Total Damages  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_116093578182488830]) - ZN([LinPack_654484837335847802])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_152",
        "name": "_Total Damages (Expression)",
        "formula": "[Damages Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_153",
        "name": "Indicator Share of total",
        "formula": "IF ROUND( WINDOW_SUM([LinPack_313407032102133663] / TOTAL([LinPack_313407032102133663]) ),2) = 1 THEN [LinPack_313407032102133663] / TOTAL( [LinPack_313407032102133663] ) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_154",
        "name": "Indicator2 - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r\nWHEN \"Average Days to Close\" THEN ATTR(\" d\") \r\nWHEN \"Claims Reimbursed %\" THEN ATTR(\"%\") \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r\nWHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\" d\") \r\nWHEN \"Total Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Deductible\" THEN ATTR(\"\") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Paid\" THEN ATTR(\"\") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_155",
        "name": "Total Outstanding Damages Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_863909562204035212] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_863909562204035212] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_231115654867644757] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_231115654867644757]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_156",
        "name": "Total Damages  MTD   (Current Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_158",
        "name": "KPI Perf. - Value vs Reference - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN \"\" + IIF(SIGN([LinPack_972474889586236644]) = 1,\"+\",\"\") \r\nWHEN \"Nb Claims\" THEN \"\" + IIF(SIGN([LinPack_222785374296457216]) = 1,\"+\",\"\") \r\nWHEN \"Nb Open Claims\" THEN \"\" + IIF(SIGN([LinPack_801177066230448315]) = 1,\"+\",\"\") \r\nWHEN \"Open Since (days)\" THEN \"\" + IIF(SIGN([LinPack_204677139479255874]) = 1,\"+\",\"\") \r\nWHEN \"Total Damages\" THEN \"$ \" + IIF(SIGN([LinPack_058832752294337078]) = 1,\"+\",\"\") \r\nWHEN \"Total Outstanding Damages\" THEN \"$ \" + IIF(SIGN([LinPack_328790723137866341]) = 1,\"+\",\"\") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_159",
        "name": "Total Outstanding Damages Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_306810912159779820] / ABS([LinPack_231816817779693420])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_160",
        "name": "KPI Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_118200554300232663]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_016560078095726380]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_210795920341545853]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_447391225742565893]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_704066197979510380]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_789491359913924715]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_161",
        "name": "Total Outstanding Damages  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  RUNNING_SUM([LinPack_358766346315120233])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_162",
        "name": "KPI - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\" d\") \r\nWHEN \"Total Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_163",
        "name": "Total Damages Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_177142247715880190] / ABS([LinPack_170055699683027488])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_164",
        "name": "Period: Current Year",
        "formula": "ATTR([Parameters].[LinPack_061584200884467689])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_165",
        "name": "KPI Perf. -  Value (Share of total)",
        "formula": "IF ROUND( WINDOW_SUM([LinPack_821850866227780954] / TOTAL([LinPack_821850866227780954]) ),2) = 1 THEN [LinPack_821850866227780954] / TOTAL( [LinPack_821850866227780954] ) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_166",
        "name": "Open Since (days)  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_654200888375634660]) - ZN([LinPack_557357344493219015])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_167",
        "name": "Nb Claims  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_282415587747719625]) - ZN([LinPack_251159978153782009])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_168",
        "name": "Nb Claims Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_885520589467117095]) - ZN([LinPack_983728631218598473])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_169",
        "name": "Nb Agents Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_972474889586236644]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_170",
        "name": "Nb Open Claims  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_171",
        "name": "Indicator - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r\nWHEN \"Average Days to Close\" THEN ATTR(\"\") \r\nWHEN \"Claims Reimbursed %\" THEN ATTR(\"\") \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r\nWHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\"\") \r\nWHEN \"Total Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Deductible\" THEN ATTR(\"$ \") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Paid\" THEN ATTR(\"$ \") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_172",
        "name": "Nb Claims  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_515073546357020193] / ABS([LinPack_251159978153782009])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_173",
        "name": "Nb Open Claims  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n[LinPack_739246589439599276]\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_174",
        "name": "Total Damages  MTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_175",
        "name": "Total Paid",
        "formula": "SUM([LinPack_640031983728264934])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_176",
        "name": "Nb Open Claims Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_213141054382385151] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_213141054382385151] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_596155655411923325] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_596155655411923325]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_177",
        "name": "Nb Agents  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_178",
        "name": "_Average Days to Close (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"Y\" THEN DATEDIFF(\"day\", [Open Date], [Close Date]) END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_179",
        "name": "KPI Perf. -  Value (for trends) - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_181359899101592114]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_885520589467117095]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_542462541075525441]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_014352478133387888]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_761139585457102483]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_475151873179235566]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_180",
        "name": "Nb Open Claims Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_375062032639825654] / ABS([LinPack_992140249399183826])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_181",
        "name": "Claims Reimbursed %",
        "formula": "ZN([LinPack_125708952705231201]) / ZN([LinPack_381226536365906696])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_182",
        "name": "Open Since (days)  MTD   (Previous Month)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_183",
        "name": "Nb Open Claims  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_400096043746779663] / ABS([LinPack_739246589439599276])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_185",
        "name": "Nb Agents  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_338901930403833534]) - ZN([LinPack_710552598472596108])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_186",
        "name": "Nb Open Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_801177066230448315]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_187",
        "name": "KPI Perf. - Value vs Reference % (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_135684725998537727]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_670607465028379924]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_555865248114507279]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_326426750037527868]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_485183931620903147]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_476883502234909983]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_188",
        "name": "Total Deductible",
        "formula": "SUM([LinPack_870107401384373637])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_189",
        "name": "Indicator - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r\nWHEN \"Average Days to Close\" THEN ATTR(\" d\") \r\nWHEN \"Claims Reimbursed %\" THEN ATTR(\"%\") \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r\nWHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\" d\") \r\nWHEN \"Total Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Deductible\" THEN ATTR(\"\") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Paid\" THEN ATTR(\"\") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_190",
        "name": "Nb Open Claims  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_191",
        "name": "Nb Open Claims  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_526992866097063811]) - ZN([LinPack_590535268113940387])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_192",
        "name": "Nb Open Claims  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_370016001432172588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_370016001432172588] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_193",
        "name": "Nb Claims Perf. - Value vs Reference %",
        "formula": "[LinPack_222785374296457216] / ABS([LinPack_016560078095726380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_194",
        "name": "KPI Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_824014239762034483]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_983728631218598473]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_992140249399183826]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_235087924751254055]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_170055699683027488]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_231816817779693420]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_195",
        "name": "Nb Claims  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_058965364115069541]) - ZN([LinPack_914857115527485325])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_197",
        "name": "KPI2 - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\"\") \r\nWHEN \"Total Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_199",
        "name": "Open Since (days)  YTD  (Current Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_200",
        "name": "_Total Paid (Expression)",
        "formula": "[Claim Paid Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_201",
        "name": "Total Outstanding Damages  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_358766346315120233]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_202",
        "name": "Open Since (days)  MTD   (Current Month)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_203",
        "name": "Total Damages  YTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_204",
        "name": "Nb Claims  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_615747030366139572] / ABS([LinPack_914857115527485325])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_205",
        "name": "Nb Claims Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_516603971530074954] / ABS([LinPack_983728631218598473])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_208",
        "name": "Total Outstanding Damages  MTD   (Current Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_209",
        "name": "Total Outstanding Damages Growth from Previous Period %",
        "formula": "(ZN([LinPack_004007761706285023]) - LOOKUP(ZN([LinPack_004007761706285023]), -1)) / ABS(LOOKUP(ZN([LinPack_004007761706285023]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_210",
        "name": "Total Damages  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  RUNNING_SUM([LinPack_116093578182488830])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_211",
        "name": "Open Since (days)  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_498695920020261833] / ABS([LinPack_557357344493219015])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_212",
        "name": "Total Deductible Growth from Previous Period %",
        "formula": "(ZN([LinPack_581734149578208266]) - LOOKUP(ZN([LinPack_581734149578208266]), -1)) / ABS(LOOKUP(ZN([LinPack_581734149578208266]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_213",
        "name": "Open Since (days)  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_632701456957648124]) - ZN([LinPack_118136351010791333])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_214",
        "name": "Open Since (days) Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_204677139479255874]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_215",
        "name": "Nb Open Claims  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_591766740604068048] / ABS([LinPack_590535268113940387])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_216",
        "name": "Total Damages Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_720860668034453646] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_537734613855980355] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_654484837335847802] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_218",
        "name": "Nb Open Claims  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_526992866097063811]) - ZN([LinPack_867010562689685340])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_219",
        "name": "KPI Perf. - Value vs Reference - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_972474889586236644]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_222785374296457216]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_801177066230448315]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_204677139479255874]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_058832752294337078]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_328790723137866341]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_220",
        "name": "Nb Agents  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_221",
        "name": "Nb Claims  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_058965364115069541]) - ZN([LinPack_176398453504719850])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_222",
        "name": "Total Damages  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_468938916837016163] / ABS([LinPack_654484837335847802])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_223",
        "name": "Total Damages  MTD   (Previous Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_224",
        "name": "Nb Agents Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_181359899101592114]) - ZN([LinPack_824014239762034483])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_226",
        "name": "Total Damages Perf. - Value vs Reference %",
        "formula": "[LinPack_058832752294337078] / ABS([LinPack_704066197979510380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_227",
        "name": "KPI 2",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_228",
        "name": "Nb Open Claims  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_230",
        "name": "Total Damages  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_116093578182488830]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_232",
        "name": "Nb Agents  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_338901930403833534]) - ZN([LinPack_436064155486646203])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_233",
        "name": "Total Damages Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_743869017548789329] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_743869017548789329] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_679147460071335835] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_679147460071335835]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_234",
        "name": "Open Since (days) Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_654200888375634660] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_654200888375634660] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_654200888375634660] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_632701456957648124] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_632701456957648124]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_235",
        "name": "Nb Claims Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_058965364115069541] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_058965364115069541] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_058965364115069541] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_282415587747719625] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_282415587747719625]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_236",
        "name": "Nb Open Claims Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_526992866097063811] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_526992866097063811] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_526992866097063811] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_978167939772781742] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_978167939772781742]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_239",
        "name": "Total Outstanding Damages Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [LinPack_889807749084919034] \r\nWHEN \"CM_vs_PY\" THEN [LinPack_459156243435697482] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_358766346315120233] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_240",
        "name": "_Open Since (days) (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"N\" THEN DATEDIFF(\"day\", [Open Date], __MyToday) END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_241",
        "name": "Nb Open Claims Perf. - Value vs Reference",
        "formula": "ZN([LinPack_765582981339525238]) - ZN([LinPack_210795920341545853])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_242",
        "name": "Nb Reimbursed Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_125708952705231201]) - LOOKUP(ZN([LinPack_125708952705231201]), -1)) / ABS(LOOKUP(ZN([LinPack_125708952705231201]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_244",
        "name": "KPI2 - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\" d\") \r\nWHEN \"Total Damages\" THEN ATTR(\"\") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_246",
        "name": "Nb Open Claims per Agent Growth from Previous Period %",
        "formula": "(ZN([LinPack_158874720158457487]) - LOOKUP(ZN([LinPack_158874720158457487]), -1)) / ABS(LOOKUP(ZN([LinPack_158874720158457487]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_247",
        "name": "KPI Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_403278865337907297]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_765567359479159633]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_765582981339525238]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_764754838389350874]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_205346886051088410]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_036910499603175887]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_248",
        "name": "Nb Agents Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_094840771503443127] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_850663871217333584] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_249",
        "name": "Total Damages  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  RUNNING_SUM([LinPack_654484837335847802])\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_250",
        "name": "Total Damages",
        "formula": "SUM([LinPack_470157109985822088])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_251",
        "name": "Nb Agents Perf. - Value vs Reference %",
        "formula": "[LinPack_972474889586236644] / ABS([LinPack_118200554300232663])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_252",
        "name": "Nb Open Claims",
        "formula": "COUNTD([LinPack_370016001432172588])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_253",
        "name": "Nb Agents  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_619104337867439588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_619104337867439588] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_256",
        "name": "Total Outstanding Damages  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_320355170985958371]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_257",
        "name": "Nb Open Claims  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_259",
        "name": "Nb Agents",
        "formula": "COUNTD([LinPack_619104337867439588])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_260",
        "name": "_Total Deductible (Expression)",
        "formula": "[Deductible]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_261",
        "name": "Nb Agents  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_565514730123707931] / ABS([LinPack_710552598472596108])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_262",
        "name": "Nb Claims  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\n  WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_705532015286423348]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_705532015286423348] END),FIRST(),0)\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_263",
        "name": "Nb Claims Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_357817221773541777] \r\nWHEN \"ACT_vs_TGT\" THEN  [LinPack_357817221773541777] \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_397719711956330000] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_397719711956330000]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_264",
        "name": "Total Outstanding Damages  MTD   (Previous Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_265",
        "name": "Total Damages  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_475169369809980978]) - ZN([LinPack_537734613855980355])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_266",
        "name": "Nb Claims  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_268",
        "name": "Total Outstanding Damages  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_124194940398715583] / ABS([LinPack_358766346315120233])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_269",
        "name": "Nb Open Claims  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_707685424655623023] / ABS([LinPack_867010562689685340])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_270",
        "name": "Open Since (days)  YTD  (Previous Year) (for trends)",
        "formula": "IF false THEN avg(0) END // This calculation cannot be computed for this aggregation rule. Please use the other available calculations",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_271",
        "name": "KPI - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_272",
        "name": "Nb Closed Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_381226536365906696]) - LOOKUP(ZN([LinPack_381226536365906696]), -1)) / ABS(LOOKUP(ZN([LinPack_381226536365906696]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_273",
        "name": "KPI Perf. - Value vs Reference (shape)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN [LinPack_526062377770921246] \r\nWHEN \"Nb Claims\" THEN [LinPack_967284480116357964] \r\nWHEN \"Nb Open Claims\" THEN [LinPack_570741872043075851] \r\nWHEN \"Open Since (days)\" THEN [LinPack_693251423532813720] \r\nWHEN \"Total Damages\" THEN [LinPack_274364374923686019] \r\nWHEN \"Total Outstanding Damages\" THEN [LinPack_386415188287178777] \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_274",
        "name": "Total Damages  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_654484837335847802]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_275",
        "name": "Total Damages  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_475169369809980978]) - ZN([LinPack_720860668034453646])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_276",
        "name": "Nb Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_222785374296457216]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_277",
        "name": "Nb Agents Perf. - Value vs Reference",
        "formula": "ZN([LinPack_403278865337907297]) - ZN([LinPack_118200554300232663])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_278",
        "name": "Nb Agents  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_543884768821756499]) - ZN([LinPack_338688795082735958])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_279",
        "name": "Nb Open Claims  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_280",
        "name": "Nb Claims Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_147222799454383909] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_883734027091479420] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_281",
        "name": "KPI - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN ATTR(\"\") \r\nWHEN \"Nb Claims\" THEN ATTR(\"\") \r\nWHEN \"Nb Open Claims\" THEN ATTR(\"\") \r\nWHEN \"Open Since (days)\" THEN ATTR(\"\") \r\nWHEN \"Total Damages\" THEN ATTR(\"$ \") \r\nWHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_282",
        "name": "Total Outstanding Damages  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_677625735102635363]) - ZN([LinPack_889807749084919034])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_283",
        "name": "Nb Open Claims Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r\nCASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL \r\nWHEN \"CM_vs_PY\" THEN [LinPack_529909349826542949] \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN [LinPack_205986699085815418] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_284",
        "name": "KPI Perf. - Reference (for trends) - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_824014239762034483]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_983728631218598473]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_992140249399183826]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_235087924751254055]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_170055699683027488]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_231816817779693420]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_285",
        "name": "KPI",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r\nWHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r\nWHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r\nWHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r\nWHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r\nWHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r\nWHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_287",
        "name": "Open Claims Duration Days (Display)",
        "formula": "STR([LinPack_323554820047972012])+ 'd '",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_289",
        "name": "Rejected Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r\n\r\nELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r\n    COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r\n\r\nELSE    \r\n    NULL\r\n\r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_290",
        "name": "Rejected Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_470157109985822088] ELSE NULL END)\r\nWHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END) \r\nWHEN \"ACT_vs_TGT\" THEN NULL \r\nWHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r\nWHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_291",
        "name": "Rejected Claims Perf. - Value vs Reference %",
        "formula": "[Reimbursed Claims Perf. - Value vs Reference (copy)_1469580913310703618] / ABS([Reimbursed Claims Perf. - Reference (copy)_1469580913310560257])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_292",
        "name": "Rejected Claims Perf. - Value vs Reference",
        "formula": "[Reimbursed Claims Perf. -  Value (copy)_1469580913310445568] - [Reimbursed Claims Perf. - Reference (copy)_1469580913310560257]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_293",
        "name": "Rejected Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Reimbursed Claims Perf. - Value vs Reference (copy)_1469580913310703618]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_294",
        "name": "Claim Closure Time Perf. -  Value",
        "formula": "IF      [Parameters].[LinPack_371749732845320988] = \"CM_vs_PM\" or [Parameters].[LinPack_371749732845320988] = \"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN \r\n        AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r\n\r\nELSEIF  [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\" OR [Parameters].[LinPack_371749732845320988] = \"YTDACT_vs_YTDTGT\" THEN\r\n        AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r\n\r\nELSE    NULL \r\n\r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_295",
        "name": "Claim Closure Time Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\n\r\nWHEN \"CM_vs_PM\" THEN \r\n        AVG(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END) \r\n\r\nWHEN \"CM_vs_PY\" THEN \r\n        AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r\n\r\nWHEN \"ACT_vs_TGT\" THEN \r\n        NULL \r\n\r\nWHEN \"CYTD_vs_PYTD\" THEN \r\n        AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r\n\r\nWHEN \"YTDACT_vs_YTDTGT\" THEN \r\n        NULL \r\n\r\nWHEN \"NONE\"  THEN \r\n        NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_296",
        "name": "Claim Closure Time Perf. - Value vs Reference %",
        "formula": "[Resolution Time Perf. - Value vs Reference (copy)_148055884324622344] / ABS([Resolution Time Perf. - Reference (copy)_148055884324622343])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_297",
        "name": "Claim Closure Time Perf. - Value vs Reference",
        "formula": "[Resolution Time Perf. -  Value (copy)_148055884324622342] - [Resolution Time Perf. - Reference (copy)_148055884324622343]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_298",
        "name": "Claim Closure Time Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Resolution Time Perf. - Value vs Reference (copy)_148055884324622344]) \r\nWHEN 1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r\n    ELSE \"\u25b2\" \r\n    END \r\nWHEN 0 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r\n    ELSE \"\u25ba\" \r\n    END \r\nWHEN -1 THEN \r\n    IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r\n    ELSE \"\u25bc\" \r\n    END \r\nELSE \" \" \r\nEND",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_301",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_302",
        "name": "Total Paid (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_303",
        "name": "Claims Reimbursed % (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_304",
        "name": "Average Days to Close (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_305",
        "name": "Nb Closed Claims (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_306",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]\r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]\r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 1]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_307",
        "name": "Total Paid (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]\r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]\r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 2] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 2]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_308",
        "name": "Claims Reimbursed % (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]\r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]\r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 3] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 3]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_309",
        "name": "Average Days to Close (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]\r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]\r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 4] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 4]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_310",
        "name": "Nb Closed Claims (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1]\r\nWHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1]\r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1]  \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_311",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652597252] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_312",
        "name": "Total Paid (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980649070592] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_313",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652687365] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_314",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652777478] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_315",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652204033] / ABS([{%%KPI6.PERF__REFERENCE%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_316",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663463944] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_317",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663619594] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_318",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663529481] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_319",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663685131] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_320",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663762956] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_321",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652597252])\r\nWhen 1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25b2\"\r\n         end\r\nWhen 0 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25ba\"\r\n         end\r\nWhen -1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25bc\"\r\n         end\r\nElse \"-\"\r\nend",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_322",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980649070592])\r\nWhen 1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25b2\"\r\n         end\r\nWhen 0 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25ba\"\r\n         end\r\nWhen -1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25bc\"\r\n         end\r\nElse \"-\"\r\nend",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_323",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652687365])\r\nWhen 1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25b2\"\r\n         end\r\nWhen 0 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25ba\"\r\n         end\r\nWhen -1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25bc\"\r\n         end\r\nElse \"-\"\r\nend",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_324",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652777478])\r\nWhen 1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25b2\"\r\n         end\r\nWhen 0 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25ba\"\r\n         end\r\nWhen -1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25bc\"\r\n         end\r\nElse \"-\"\r\nend",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_325",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652204033])\r\nWhen 1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25b2\"\r\n         end\r\nWhen 0 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25ba\"\r\n         end\r\nWhen -1 then\r\n         // TARGET MODE\r\n         If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r\n         // PERIOD COMPARISON\r\n         else \"\u25bc\"\r\n         end\r\nElse \"-\"\r\nend",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": []
      },
      {
        "id": "cf_326",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1] \r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_327",
        "name": "Total Paid (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2] \r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 2] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_328",
        "name": "Claims Reimbursed % (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3] \r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 3] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 3] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 3] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_329",
        "name": "Average Days to Close (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4] \r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 4] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_330",
        "name": "Nb Closed Claims (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1] \r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1] \r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_331",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]\r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 1] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_332",
        "name": "Total Paid (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2]\r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 2] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 2] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_333",
        "name": "Claims Reimbursed % (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 3]\r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 3] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 3] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 3] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_334",
        "name": "Average Days to Close (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4]\r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 4] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 4] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_335",
        "name": "Nb Closed Claims (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r\nWHEN \"CM_vs_PM\" THEN NULL\r\nWHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1]\r\nWHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1] \r\nWHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1] \r\nWHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1] \r\nWHEN \"NONE\"  THEN NULL \r\nEND",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_336",
        "name": "Nb Reimbursed Claims (Closed)  MTD   (Current Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_337",
        "name": "Total Paid (Closed)  MTD   (Current Month)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_338",
        "name": "Claims Reimbursed % (Closed)  MTD   (Current Month)",
        "formula": "ZN([{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1]) / ZN([{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_339",
        "name": "Average Days to Close (Closed)  MTD   (Current Month)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_340",
        "name": "Nb Closed Claims (Closed)  MTD   (Current Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_341",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_342",
        "name": "Total Paid (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_343",
        "name": "Claims Reimbursed % (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_344",
        "name": "Average Days to Close (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_345",
        "name": "Nb Closed Claims (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_346",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_347",
        "name": "Total Paid (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 2] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_348",
        "name": "Claims Reimbursed % (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 3] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_349",
        "name": "Average Days to Close (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 4] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_350",
        "name": "Nb Closed Claims (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_351",
        "name": "Nb Reimbursed Claims (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_352",
        "name": "Total Paid (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_353",
        "name": "Claims Reimbursed % (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_354",
        "name": "Average Days to Close (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_355",
        "name": "Nb Closed Claims (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_356",
        "name": "Nb Reimbursed Claims (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_357",
        "name": "Total Paid (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 2] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_358",
        "name": "Claims Reimbursed % (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 3] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_359",
        "name": "Average Days to Close (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 4] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_360",
        "name": "Nb Closed Claims (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_361",
        "name": "Nb Reimbursed Claims (Closed)  MTD   (Previous Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_362",
        "name": "Total Paid (Closed)  MTD   (Previous Month)",
        "formula": "SUM(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_363",
        "name": "Claims Reimbursed % (Closed)  MTD   (Previous Month)",
        "formula": "ZN([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1]) / ZN([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_364",
        "name": "Average Days to Close (Closed)  MTD   (Previous Month)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_365",
        "name": "Nb Closed Claims (Closed)  MTD   (Previous Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_366",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_367",
        "name": "Total Paid (Closed)  MTD  (Previous Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_368",
        "name": "Claims Reimbursed % (Closed)  MTD  (Previous Year)",
        "formula": "ZN([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1]) / ZN([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_369",
        "name": "Average Days to Close (Closed)  MTD  (Previous Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_370",
        "name": "Nb Closed Claims (Closed)  MTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_371",
        "name": "Nb Reimbursed Claims (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_372",
        "name": "Total Paid (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_373",
        "name": "Claims Reimbursed % (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_374",
        "name": "Average Days to Close (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_375",
        "name": "Nb Closed Claims (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_376",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Current Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_377",
        "name": "Total Paid (Closed)  YTD  (Current Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_378",
        "name": "Claims Reimbursed % (Closed)  YTD  (Current Year)",
        "formula": "ZN([{%%KPI6.YTD__CURRENT_YTD%%} 1 1]) / ZN([{%%KPI6.YTD__CURRENT_YTD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_379",
        "name": "Average Days to Close (Closed)  YTD  (Current Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_380",
        "name": "Nb Closed Claims (Closed)  YTD  (Current Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_381",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_382",
        "name": "Total Paid (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_383",
        "name": "Claims Reimbursed % (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_384",
        "name": "Average Days to Close (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then WINDOW_MEDIAN([{%%KPI6.YTD__CURRENT_YTD%%} 1 4],-index(),0) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_385",
        "name": "Nb Closed Claims (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_386",
        "name": "Nb Reimbursed Claims (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 1] - [{%%KPI6.PERF__REFERENCE%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_387",
        "name": "Total Paid (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 2] - [{%%KPI6.PERF__REFERENCE%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_388",
        "name": "Claims Reimbursed % (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 3] - [{%%KPI6.PERF__REFERENCE%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_389",
        "name": "Average Days to Close (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 4] - [{%%KPI6.PERF__REFERENCE%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_390",
        "name": "Nb Closed Claims (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1] - [{%%KPI6.PERF__REFERENCE%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_391",
        "name": "Nb Reimbursed Claims (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652597252] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_392",
        "name": "Total Paid (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980649070592] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_393",
        "name": "Claims Reimbursed % (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652687365] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_394",
        "name": "Average Days to Close (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652777478] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_395",
        "name": "Nb Closed Claims (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652204033] / ABS([{%%KPI6.PERF__REFERENCE%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_396",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_397",
        "name": "Total Paid (Closed)  YTD  (Previous Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_398",
        "name": "Claims Reimbursed % (Closed)  YTD  (Previous Year)",
        "formula": "ZN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]) / ZN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_399",
        "name": "Average Days to Close (Closed)  YTD  (Previous Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_400",
        "name": "Nb Closed Claims (Closed)  YTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_401",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_402",
        "name": "Total Paid (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_403",
        "name": "Claims Reimbursed % (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_404",
        "name": "Average Days to Close (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then WINDOW_MEDIAN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4],-index(),0) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_405",
        "name": "Nb Closed Claims (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": []
      },
      {
        "id": "cf_406",
        "name": "Nb Reimbursed Claims (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_407",
        "name": "Total Paid (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 2] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_408",
        "name": "Claims Reimbursed % (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 3] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_409",
        "name": "Average Days to Close (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 4] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_410",
        "name": "Nb Closed Claims (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_411",
        "name": "Nb Reimbursed Claims (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_412",
        "name": "Total Paid (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_413",
        "name": "Claims Reimbursed % (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_414",
        "name": "Average Days to Close (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      },
      {
        "id": "cf_415",
        "name": "Nb Closed Claims (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": []
      }
    ],
    "tables": [
      {
        "tableName": "Extract",
        "displayName": "Extract",
        "rowCount": 5,
        "dataSource": "federated.1oywxhs0yqa12112iftoe1d99io6",
        "hasColumnInformation": true,
        "columns": [
          { "name": "Open Date", "type": "DATETIME" },
          { "name": "Close Date", "type": "DATETIME" },
          { "name": "Event Date", "type": "DATETIME" },
          { "name": "Is Reimbursed Flag", "type": "VARCHAR" },
          { "name": "Is Closed Flag", "type": "VARCHAR" },
          { "name": "Claim Number", "type": "VARCHAR" },
          { "name": "Claim Status", "type": "VARCHAR" },
          { "name": "Claim Reason", "type": "VARCHAR" },
          { "name": "Policy Number", "type": "VARCHAR" },
          { "name": "Policy Holder", "type": "VARCHAR" },
          { "name": "Policy Type", "type": "VARCHAR" },
          { "name": "Business Line", "type": "VARCHAR" },
          { "name": "Agent", "type": "VARCHAR" },
          { "name": "Agent Group", "type": "VARCHAR" },
          { "name": "Damages Amount", "type": "NUMERIC" },
          { "name": "Claim Paid Amount", "type": "NUMERIC" },
          { "name": "Deductible", "type": "NUMERIC" },
          { "name": "Claim Process Status", "type": "VARCHAR" },
          { "name": "Annualized Premium Amount", "type": "NUMERIC" }
        ],
        "sampleRows": [
          {
            "Open Date": "2023-01-19 00:00:00",
            "Close Date": "2023-03-02 00:00:00",
            "Event Date": "2022-12-31 00:00:00",
            "Is Reimbursed Flag": "Y",
            "Is Closed Flag": "Y",
            "Claim Number": "8443344403",
            "Claim Status": "Reimbursed",
            "Claim Reason": "Lightning",
            "Policy Number": "00004043763635874",
            "Policy Holder": "4043723235874",
            "Policy Type": "Residential",
            "Business Line": "Property",
            "Agent": "Tina Trevino",
            "Agent Group": "Back Office",
            "Damages Amount": 4887.0,
            "Claim Paid Amount": 4674.0,
            "Deductible": 276.9745732285,
            "Claim Process Status": "Closed",
            "Annualized Premium Amount": 596.9436683762965
          },
          {
            "Open Date": "2023-02-18 00:00:00",
            "Close Date": "2023-03-05 00:00:00",
            "Event Date": "2022-12-31 00:00:00",
            "Is Reimbursed Flag": "Y",
            "Is Closed Flag": "Y",
            "Claim Number": "8773703300",
            "Claim Status": "Reimbursed",
            "Claim Reason": "Lightning",
            "Policy Number": "00000003074604030",
            "Policy Holder": "3074204030",
            "Policy Type": "Residential",
            "Business Line": "Property",
            "Agent": "Tina Trevino",
            "Agent Group": "Back Office",
            "Damages Amount": 10057.0,
            "Claim Paid Amount": 9838.0,
            "Deductible": 276.9745732285,
            "Claim Process Status": "Closed",
            "Annualized Premium Amount": 6967.136245134898
          },
          {
            "Open Date": "2023-01-25 00:00:00",
            "Close Date": "2023-03-08 00:00:00",
            "Event Date": "2022-12-31 00:00:00",
            "Is Reimbursed Flag": "Y",
            "Is Closed Flag": "Y",
            "Claim Number": "8470234754",
            "Claim Status": "Reimbursed",
            "Claim Reason": "Lightning",
            "Policy Number": "00047533370655874",
            "Policy Holder": "47533370255874",
            "Policy Type": "Residential",
            "Business Line": "Property",
            "Agent": "Tina Trevino",
            "Agent Group": "Back Office",
            "Damages Amount": 10701.0,
            "Claim Paid Amount": 10477.0,
            "Deductible": 276.9745732285,
            "Claim Process Status": "Closed",
            "Annualized Premium Amount": 1837.121071186669
          },
          {
            "Open Date": "2023-01-11 00:00:00",
            "Close Date": "2023-03-10 00:00:00",
            "Event Date": "2022-12-31 00:00:00",
            "Is Reimbursed Flag": "Y",
            "Is Closed Flag": "Y",
            "Claim Number": "8320734030",
            "Claim Status": "Reimbursed",
            "Claim Reason": "Lightning",
            "Policy Number": "00000004437384676",
            "Policy Holder": "4437384272",
            "Policy Type": "Residential",
            "Business Line": "Property",
            "Agent": "Tina Trevino",
            "Agent Group": "Back Office",
            "Damages Amount": 455.0,
            "Claim Paid Amount": 244.0,
            "Deductible": 276.9745732285,
            "Claim Process Status": "Closed",
            "Annualized Premium Amount": 1026.931667307502
          },
          {
            "Open Date": "2023-02-19 00:00:00",
            "Close Date": "2023-03-10 00:00:00",
            "Event Date": "2022-12-31 00:00:00",
            "Is Reimbursed Flag": "Y",
            "Is Closed Flag": "Y",
            "Claim Number": "8724242720",
            "Claim Status": "Reimbursed",
            "Claim Reason": "Lightning",
            "Policy Number": "00000004435557403",
            "Policy Holder": "4435557403",
            "Policy Type": "Residential",
            "Business Line": "Property",
            "Agent": "Tina Trevino",
            "Agent Group": "Back Office",
            "Damages Amount": 10687.0,
            "Claim Paid Amount": 10454.0,
            "Deductible": 276.9745732285,
            "Claim Process Status": "Closed",
            "Annualized Premium Amount": 964.5179360387715
          }
        ]
      }
    ]
  },
  "d2": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 9,
      "totalTables": 6,
      "totalCalculatedFields": 7,
      "totalKpis": 9
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Cross Sell Performance",
        "evidence": "Cross Sell"
      },
      {
        "id": "kpi_2",
        "name": "Cross Sell Performance by Employee",
        "evidence": "Cross sell by employee"
      },
      {
        "id": "kpi_3",
        "name": "Number of Invoices by Account Executive",
        "evidence": "No of invoice by Accnt Exec"
      },
      {
        "id": "kpi_4",
        "name": "Number of Meetings by Account Executive",
        "evidence": "No of meeting by Accnt Exec"
      },
      {
        "id": "kpi_5",
        "name": "Top 4 Open Opportunities by Revenue",
        "evidence": "Open Oppty-Top 4"
      },
      {
        "id": "kpi_6",
        "name": "Revenue Distribution by Top 4 Opportunities",
        "evidence": "Oppty by Revenue - Top 4"
      },
      {
        "id": "kpi_7",
        "name": "Revenue Distribution by Product",
        "evidence": "Oppty by product"
      },
      {
        "id": "kpi_8",
        "name": "Renewal Performance",
        "evidence": "Renewal"
      },
      {
        "id": "kpi_9",
        "name": "Revenue by Sales Stage",
        "evidence": "Stage by revenue"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Cross Sell",
        "chartType": "Bar Chart",
        "dimensions": [
          "Category"
        ],
        "measures": [
          {
            "name": "Amount (invoice!202001231041)",
            "type": "base_measure"
          },
          {
            "name": "Amount",
            "type": "base_measure"
          },
          {
            "name": "Achieved_Cross_Sell",
            "type": "calculated"
          },
          {
            "name": "Invoice_cross_sell",
            "type": "calculated"
          },
          {
            "name": "Cross sell bugdet",
            "type": "base_measure"
          },
          {
            "name": "Calculation_531987722592747521",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[:Measure Names]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[Multiple Values]"
        }
      },
      {
        "id": "ws_2",
        "name": "Cross sell by employee",
        "chartType": "Automatic",
        "dimensions": [
          "Employee Name"
        ],
        "measures": [
          {
            "name": "Cross sell bugdet",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Employee Name:nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:Cross sell bugdet:qk]"
        }
      },
      {
        "id": "ws_3",
        "name": "No of invoice by Accnt Exec",
        "chartType": "Automatic",
        "dimensions": [
          "Account Executive (invoice!202001231041)",
          "Invoice Number"
        ],
        "measures": [
          {
            "name": "invoice_number",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Account Executive (invo",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[cnt:invoice_number:qk]"
        }
      },
      {
        "id": "ws_4",
        "name": "No of meeting by Accnt Exec",
        "chartType": "Automatic",
        "dimensions": [
          "Account Executive (meeting!list!202001231041)",
          "Meeting Date"
        ],
        "measures": [
          {
            "name": "meeting_list_202001231041",
            "type": "base_measure"
          },
          {
            "name": "__tableau_internal_object_id__].[meeting!list!202001231041_8DEA75082D9B4E319F02AD26040B6DD1",
            "type": "base_measure"
          },
          {
            "name": "meeting_date",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Account Executive (meet",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[__tableau_internal_object_id"
        }
      },
      {
        "id": "ws_5",
        "name": "Open Oppty-Top 4",
        "chartType": "Bar Chart",
        "dimensions": [
          "Opportunity Name",
          "opportunity_name"
        ],
        "measures": [
          {
            "name": "Revenue Amount",
            "type": "base_measure"
          },
          {
            "name": "revenue_amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:revenue_amount:qk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:opportunity_name:nk]"
        }
      },
      {
        "id": "ws_6",
        "name": "Oppty by Revenue - Top 4",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Opportunity Name",
          "opportunity_name"
        ],
        "measures": [
          {
            "name": "Revenue Amount",
            "type": "base_measure"
          },
          {
            "name": "revenue_amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_7",
        "name": "Oppty by product",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Opportunity Name",
          "Product Group (Gcrm!Opportunity!202001231041)",
          "product_group (gcrm!opportunity!202001231041)"
        ],
        "measures": [
          {
            "name": "zero",
            "type": "calculated"
          },
          {
            "name": "opportunity_name",
            "type": "base_measure"
          },
          {
            "name": "product_group (gcrm!opportunity!202001231041)",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1027383682329116673",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:Calculation_10273836823",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_8",
        "name": "Renewal",
        "chartType": "Automatic",
        "dimensions": [
          "Category"
        ],
        "measures": [
          {
            "name": "Amount (invoice!202001231041)",
            "type": "base_measure"
          },
          {
            "name": "Amount",
            "type": "base_measure"
          },
          {
            "name": "Achieved_Renewal",
            "type": "calculated"
          },
          {
            "name": "Invoice_Renewal",
            "type": "calculated"
          },
          {
            "name": "Renewal Budget",
            "type": "base_measure"
          },
          {
            "name": "Calculation_531987722592980994",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[:Measure Names]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[Multiple Values]"
        }
      },
      {
        "id": "ws_9",
        "name": "Stage by revenue",
        "chartType": "Automatic",
        "dimensions": [
          "Stage",
          "stage"
        ],
        "measures": [
          {
            "name": "stage",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:stage:nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[cnt:stage:qk]"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "zero",
        "formula": "0",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Oppty by product"
        ]
      },
      {
        "id": "cf_2",
        "name": "Achieved",
        "formula": "SUM([Amount (fees!202001231041)])+SUM([Amount])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Cross Sell",
          "Renewal"
        ]
      },
      {
        "id": "cf_3",
        "name": "Achieved_Cross_Sell",
        "formula": "SUM([Amount]) - 21547181",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_4",
        "name": "Achieved_Renewal",
        "formula": "SUM([Amount]) - 16755532",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Renewal"
        ]
      },
      {
        "id": "cf_5",
        "name": "Invoice_cross_sell",
        "formula": "SUM([Amount (invoice!202001231041)]) - 9412706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_6",
        "name": "Invoice_new",
        "formula": "SUM([Amount (invoice!202001231041)]) - 11692706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_7",
        "name": "Invoice_Renewal",
        "formula": "SUM([Amount (invoice!202001231041)]) - 4322211",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Renewal"
        ]
      }
    ],
    "tables": CROSS_SELL_AND_INSURANCE_ANALYTICS_TABLES
  },
  "d7": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 9,
      "totalTables": 6,
      "totalCalculatedFields": 7,
      "totalKpis": 7
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Number of Invoices by Account Executive",
        "evidence": "No of invoice by Accnt Exec"
      },
      {
        "id": "kpi_2",
        "name": "Number of Meetings by Account Executive",
        "evidence": "No of meeting by Accnt Exec"
      },
      {
        "id": "kpi_3",
        "name": "Revenue Amount by Opportunity Name (Top 4)",
        "evidence": "Open Oppty-Top 4"
      },
      {
        "id": "kpi_4",
        "name": "Revenue Distribution by Opportunity Name (Top 4)",
        "evidence": "Oppty by Revenue - Top 4"
      },
      {
        "id": "kpi_5",
        "name": "Revenue Distribution by Product",
        "evidence": "Oppty by product"
      },
      {
        "id": "kpi_6",
        "name": "Revenue Amount by Sales Stage",
        "evidence": "Stage by revenue"
      },
      {
        "id": "kpi_7",
        "name": "Budget Allocation by Employee",
        "evidence": "budget"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "New",
        "chartType": "Automatic",
        "dimensions": [
          "Category",
          "Segment"
        ],
        "measures": [
          {
            "name": "Amount",
            "type": "base_measure"
          },
          {
            "name": "New Budget",
            "type": "base_measure"
          },
          {
            "name": "Calculation_531987722593701892",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[:Measure Names]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[Multiple Values]"
        }
      },
      {
        "id": "ws_2",
        "name": "No of invoice by Accnt Exec",
        "chartType": "Automatic",
        "dimensions": [
          "Account Executive (invoice!202001231041)"
        ],
        "measures": [
          {
            "name": "invoice_number",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Account Executive (invoice!202001231041):nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[cnt:invoice_number:qk]"
        }
      },
      {
        "id": "ws_3",
        "name": "No of meeting by Accnt Exec",
        "chartType": "Automatic",
        "dimensions": [
          "Account Executive (meeting!list!202001231041)"
        ],
        "measures": [
          {
            "name": "__tableau_internal_object_id__].[meeting!list!202001231041_8DEA75082D9B4E319F02AD26040B6DD1",
            "type": "base_measure"
          },
          {
            "name": "meeting_date",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Account Executive (meeting!list!202001231041):nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[__tableau_internal_object_id__].[cnt:meeting!list!202001231041_8DEA75082D9B4E319F02AD26040B6DD1:qk]"
        }
      },
      {
        "id": "ws_4",
        "name": "Open Oppty-Top 4",
        "chartType": "Bar Chart",
        "dimensions": [
          "opportunity_name"
        ],
        "measures": [
          {
            "name": "revenue_amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:revenue_amount:qk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:opportunity_name:nk]"
        }
      },
      {
        "id": "ws_5",
        "name": "Oppty by Revenue - Top 4",
        "chartType": "Pie Chart",
        "dimensions": [
          "opportunity_name"
        ],
        "measures": [
          {
            "name": "revenue_amount",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "",
          "columns": ""
        }
      },
      {
        "id": "ws_6",
        "name": "Oppty by product",
        "chartType": "Pie Chart",
        "dimensions": [
          "product_group (gcrm!opportunity!202001231041)"
        ],
        "measures": [
          {
            "name": "opportunity_name",
            "type": "base_measure"
          },
          {
            "name": "product_group (gcrm!opportunity!202001231041)",
            "type": "base_measure"
          },
          {
            "name": "Calculation_1027383682329116673",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:Calculation_1027383682329116673:qk] + [federated.0gnnp1u032pgq11ajatw91fr25ge].[sum:Calculation_1027383682329116673:qk])",
          "columns": ""
        }
      },
      {
        "id": "ws_7",
        "name": "Renewal",
        "chartType": "Automatic",
        "dimensions": [
          "Category",
          "Segment"
        ],
        "measures": [
          {
            "name": "Renewal Budget",
            "type": "base_measure"
          },
          {
            "name": "Calculation_531987722592980994",
            "type": "base_measure"
          },
          {
            "name": "Calculation_531987722593865733",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[:Measure Names]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[Multiple Values]"
        }
      },
      {
        "id": "ws_8",
        "name": "Stage by revenue",
        "chartType": "Automatic",
        "dimensions": [
          "stage"
        ],
        "measures": [
          {
            "name": "stage",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:stage:nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[cnt:stage:qk]"
        }
      },
      {
        "id": "ws_9",
        "name": "budget",
        "chartType": "Automatic",
        "dimensions": [
          "Employee Name"
        ],
        "measures": [
          {
            "name": "New Budget",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[none:Employee Name:nk]",
          "columns": "[federated.0gnnp1u032pgq11ajatw91fr25ge].[cnt:New Budget:qk]"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "zero",
        "formula": "0",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Oppty by product"
        ]
      },
      {
        "id": "cf_2",
        "name": "Achieved",
        "formula": "SUM([Amount (fees!202001231041)])+SUM([Amount])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Cross Sell",
          "Renewal"
        ]
      },
      {
        "id": "cf_3",
        "name": "Achieved_Cross_Sell",
        "formula": "SUM([Amount]) - 21547181",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_4",
        "name": "Achieved_Renewal",
        "formula": "SUM([Amount]) - 16755532",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Renewal"
        ]
      },
      {
        "id": "cf_5",
        "name": "Invoice_cross_sell",
        "formula": "SUM([Amount (invoice!202001231041)]) - 9412706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_6",
        "name": "Invoice_new",
        "formula": "SUM([Amount (invoice!202001231041)]) - 11692706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Cross Sell"
        ]
      },
      {
        "id": "cf_7",
        "name": "Invoice_Renewal",
        "formula": "SUM([Amount (invoice!202001231041)]) - 4322211",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Renewal"
        ]
      }
    ],
    "tables": CROSS_SELL_AND_INSURANCE_ANALYTICS_TABLES
  },
  "cu1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 12,
      "totalTables": 1,
      "totalCalculatedFields": 10,
      "totalKpis": 11
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Total Cases by Aging Bin",
        "evidence": "Aging Bins"
      },
      {
        "id": "kpi_2",
        "name": "Average IGO Aging by Work Category",
        "evidence": "Bubble - Work Category"
      },
      {
        "id": "kpi_3",
        "name": "Total Cases by Work Category",
        "evidence": "Bubble - Work Category"
      },
      {
        "id": "kpi_4",
        "name": "Average IGO Aging by Work Type",
        "evidence": "Bubble - Work Type"
      },
      {
        "id": "kpi_5",
        "name": "Total Cases by Work Type",
        "evidence": "Bubble - Work Type"
      },
      {
        "id": "kpi_6",
        "name": "Average IGO Aging by SLA Status",
        "evidence": "KPI - External Pending"
      },
      {
        "id": "kpi_7",
        "name": "Total Cases by SLA Status",
        "evidence": "KPI - Internal Pending"
      },
      {
        "id": "kpi_8",
        "name": "Average Processed Days",
        "evidence": "KPI - Processed"
      },
      {
        "id": "kpi_9",
        "name": "Average IGO Aging by Master Work Category",
        "evidence": "Master Category Aging"
      },
      {
        "id": "kpi_10",
        "name": "SLA Compliance Rate",
        "evidence": "SLA Bubbles"
      },
      {
        "id": "kpi_11",
        "name": "Total Cases by SLA Compliance",
        "evidence": "SLA Bubbles"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Aging Bins",
        "chartType": "Automatic",
        "dimensions": [
          "Aging Bin",
          "Case ID"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Aging Bin:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[ctd:Case ID:qk]"
        }
      },
      {
        "id": "ws_2",
        "name": "Bubble - Work Category",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "Work Category"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_3",
        "name": "Bubble - Work Type",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "Work Type"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Work Type:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617603"
        }
      },
      {
        "id": "ws_4",
        "name": "KPI - External Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_5",
        "name": "KPI - Internal Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_6",
        "name": "KPI - On-Hand (Total)",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_7",
        "name": "KPI - Open",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_8",
        "name": "KPI - Others Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_9",
        "name": "KPI - Processed",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg Processed Days",
            "type": "calculated"
          },
          {
            "name": "Processed Days",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176239618",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_10",
        "name": "KPI - Received",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "Median IGO Aging",
            "type": "calculated"
          },
          {
            "name": "MIN(0)",
            "type": "calculated"
          },
          {
            "name": "MIN(0)",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_13675208216",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "Master Category Aging",
        "chartType": "Bar Chart",
        "dimensions": [
          "Master Work Category"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Master Work Category:nk",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617603"
        }
      },
      {
        "id": "ws_12",
        "name": "SLA Bubbles",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:SLA Status:nk]",
          "columns": "Columns / Measure Values"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Avg IGO Aging",
        "formula": "AVG([IGO Aging])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Bubble - Work Category",
          "Bubble - Work Type",
          "KPI - External Pending",
          "KPI - Internal Pending"
        ]
      },
      {
        "id": "cf_2",
        "name": "Median IGO Aging",
        "formula": "PERCENTILE([IGO Aging], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI - Received"
        ]
      },
      {
        "id": "cf_3",
        "name": "Avg Processed Days",
        "formula": "AVG([Processed Days])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI - Processed"
        ]
      },
      {
        "id": "cf_4",
        "name": "Median Processed Days",
        "formula": "PERCENTILE([Processed Days], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_5",
        "name": "Cases",
        "formula": "COUNTD([Case ID])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_6",
        "name": "Within SLA Count",
        "formula": "SUM(IF [SLA Status] = 'Within SLA' THEN 1 ELSE 0 END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_7",
        "name": "Outside SLA Count",
        "formula": "SUM(IF [SLA Status] = 'Outside SLA' THEN 1 ELSE 0 END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Pareto - Outside SLA by Work Category"
        ]
      },
      {
        "id": "cf_8",
        "name": "SLA Pct",
        "formula": "SUM(IF [SLA Status] = 'Within SLA' THEN 1.0 ELSE 0 END) / SUM(IF [SLA Status] = 'Within SLA' OR [SLA Status] = 'Outside SLA' THEN 1.0 ELSE 0 END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Monthly Trend - Cases and SLA",
          "Performance Bubble - Work Category"
        ]
      },
      {
        "id": "cf_13",
        "name": "Avg OnHand Days",
        "formula": "AVG([OnHand Days])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_14",
        "name": "Median OnHand Days",
        "formula": "PERCENTILE([OnHand Days], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      }
    ],
    "tables": [
      {
        tableName: "beneficiary_cases.csv",
        displayName: "beneficiary_cases.csv",
        rowCount: 5,
        dataSource: "federated.065oqrq01f7c6g1cde3270f6fu6h",
        hasColumnInformation: true,
        columns: [
          { name: "Case ID" },
          { name: "Case Created Date" },
          { name: "Business" },
          { name: "Master Work Category" },
          { name: "Master Work Type" },
          { name: "Work Category" },
          { name: "Work Type" },
          { name: "SEC Market Ind" },
          { name: "Case Status" },
          { name: "Team" },
          { name: "Processor" },
          { name: "Reopen Case" },
          { name: "NIGO IGO" },
          { name: "IGO Aging" },
          { name: "Processed Days" },
          { name: "OnHand Days" },
          { name: "SLA Threshold" },
          { name: "SLA Status" },
          { name: "Aging Bin" }
        ],
        sampleRows: [
          {
            "Case ID": "BS-000001",
            "Case Created Date": "2023-06-23",
            "Business": "Beneficiary Services",
            "Master Work Category": "RET-PRT-Claims",
            "Master Work Type": "IRA Claim",
            "Work Category": "DPC",
            "Work Type": "Death No Payment",
            "SEC Market Ind": "Hybrid",
            "Case Status": "Closed",
            "Team": "Team Bravo",
            "Processor": "Rahul Mehta",
            "Reopen Case": "No",
            "NIGO IGO": "IGO",
            "IGO Aging": 0,
            "Processed Days": 2,
            "OnHand Days": 0,
            "SLA Threshold": 5,
            "SLA Status": "Within SLA",
            "Aging Bin": "0-9 days"
          },
          {
            "Case ID": "BS-000002",
            "Case Created Date": "2023-06-27",
            "Business": "Beneficiary Services",
            "Master Work Category": "RET-PRT-LifeClaims",
            "Master Work Type": "Survivor Benefit",
            "Work Category": "Financial Control",
            "Work Type": "Death Claim Advanced",
            "SEC Market Ind": "Domestic",
            "Case Status": "Closed",
            "Team": "Team Charlie",
            "Processor": "Sunita Kapoor",
            "Reopen Case": "No",
            "NIGO IGO": "IGO",
            "IGO Aging": 1,
            "Processed Days": 0,
            "OnHand Days": 0,
            "SLA Threshold": 6,
            "SLA Status": "Within SLA",
            "Aging Bin": "0-9 days"
          },
          {
            "Case ID": "BS-000003",
            "Case Created Date": "2023-04-10",
            "Business": "Beneficiary Services",
            "Master Work Category": "ANN",
            "Master Work Type": "Indexed Annuity",
            "Work Category": "Benefit Payments",
            "Work Type": "Death No Payment",
            "SEC Market Ind": "Domestic",
            "Case Status": "Closed",
            "Team": "Team Alpha",
            "Processor": "Neha Luthra",
            "Reopen Case": "No",
            "NIGO IGO": "IGO",
            "IGO Aging": 17,
            "Processed Days": 17,
            "OnHand Days": 0,
            "SLA Threshold": 17,
            "SLA Status": "Within SLA",
            "Aging Bin": "10-19 days"
          },
          {
            "Case ID": "BS-000004",
            "Case Created Date": "2023-07-30",
            "Business": "Beneficiary Services",
            "Master Work Category": "ANN",
            "Master Work Type": "Fixed Annuity",
            "Work Category": "Death Claims",
            "Work Type": "Death Claim-Reissue CK",
            "SEC Market Ind": "Domestic",
            "Case Status": "External Pending",
            "Team": "Team Delta",
            "Processor": "Nikhil Rajput",
            "Reopen Case": "No",
            "NIGO IGO": "IGO",
            "IGO Aging": 1,
            "Processed Days": 0,
            "OnHand Days": 1,
            "SLA Threshold": 17,
            "SLA Status": "Within SLA",
            "Aging Bin": "0-9 days"
          },
          {
            "Case ID": "BS-000005",
            "Case Created Date": "2023-07-03",
            "Business": "Beneficiary Services",
            "Master Work Category": "RET-PRT-LifeClaims",
            "Master Work Type": "Lump-Sum Claim",
            "Work Category": "Benefit Payments",
            "Work Type": "Death Claims",
            "SEC Market Ind": "International",
            "Case Status": "Closed",
            "Team": "Team Bravo",
            "Processor": "Vikas Gupta",
            "Reopen Case": "No",
            "NIGO IGO": "IGO",
            "IGO Aging": 3,
            "Processed Days": 5,
            "OnHand Days": 0,
            "SLA Threshold": 6,
            "SLA Status": "UnAvbl",
            "Aging Bin": "0-9 days"
          }
        ]
      }
    ]
  },
  "cu2": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 18,
      "totalTables": 1,
      "totalCalculatedFields": 10,
      "totalKpis": 8
    },
    "kpis": [
      {
        "id": "kpi_1",
        "name": "Case Count by Aging Bin",
        "evidence": "Backlog Aging by Status"
      },
      {
        "id": "kpi_2",
        "name": "Case Count by Team and Case Status",
        "evidence": "Heatmap - Team by Case Status"
      },
      {
        "id": "kpi_3",
        "name": "Monthly Case Count",
        "evidence": "Monthly Trend - Cases and SLA"
      },
      {
        "id": "kpi_4",
        "name": "SLA Compliance Percentage by Month",
        "evidence": "Monthly Trend - Cases and SLA"
      },
      {
        "id": "kpi_5",
        "name": "Outside SLA Case Count by Work Category",
        "evidence": "Pareto - Outside SLA by Work Category"
      },
      {
        "id": "kpi_6",
        "name": "SLA Compliance Percentage by Work Category",
        "evidence": "Performance Bubble - Work Category"
      },
      {
        "id": "kpi_7",
        "name": "Average IGO Aging by Work Category",
        "evidence": "Performance Bubble - Work Category"
      },
      {
        "id": "kpi_8",
        "name": "Case Count by Master Work Category",
        "evidence": "SLA Mix by Master Category"
      }
    ],
    "worksheets": [
      {
        "id": "ws_1",
        "name": "Aging Bins",
        "chartType": "Automatic",
        "dimensions": [
          "Aging Bin",
          "Case ID"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Aging Bin:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[ctd:Case ID:qk]"
        }
      },
      {
        "id": "ws_2",
        "name": "Backlog Aging by Status",
        "chartType": "Bar Chart",
        "dimensions": [
          "Aging Bin",
          "Case ID",
          "Case Status"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Aging Bin:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[ctd:Case ID:qk]"
        }
      },
      {
        "id": "ws_3",
        "name": "Bubble - Work Category",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "Work Category"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_4",
        "name": "Bubble - Work Type",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "Work Type"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Work Type:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617603"
        }
      },
      {
        "id": "ws_5",
        "name": "Heatmap - Team by Case Status",
        "chartType": "Square",
        "dimensions": [
          "Case ID",
          "Case Status",
          "Team"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Team:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Case Status:nk]"
        }
      },
      {
        "id": "ws_6",
        "name": "KPI - External Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_7",
        "name": "KPI - Internal Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_8",
        "name": "KPI - On-Hand (Total)",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_9",
        "name": "KPI - Open",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_10",
        "name": "KPI - Others Pending",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "Case Status",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_11",
        "name": "KPI - Processed",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg Processed Days",
            "type": "calculated"
          },
          {
            "name": "Processed Days",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176239618",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "Rows Dimension",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_12",
        "name": "KPI - Received",
        "chartType": "Pie / Donut",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "Median IGO Aging",
            "type": "calculated"
          },
          {
            "name": "MIN(0)",
            "type": "calculated"
          },
          {
            "name": "MIN(0)",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_13675208216",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_13",
        "name": "Master Category Aging",
        "chartType": "Bar Chart",
        "dimensions": [
          "Master Work Category"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Master Work Category:nk",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617603"
        }
      },
      {
        "id": "ws_14",
        "name": "Monthly Trend - Cases and SLA",
        "chartType": "Line Chart",
        "dimensions": [
          "Case Created Date",
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "SLA Pct",
            "type": "calculated"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176702471",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "([federated.065oqrq01f7c6g1cde3270f6fu6h].[ctd:Case ID:qk] + [federate",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[mn:Case Created Date:ok]"
        }
      },
      {
        "id": "ws_15",
        "name": "Pareto - Outside SLA by Work Category",
        "chartType": "Bar Chart",
        "dimensions": [
          "SLA Status",
          "Work Category"
        ],
        "measures": [
          {
            "name": "Outside SLA Count",
            "type": "calculated"
          },
          {
            "name": "Calculation_0746846176612358",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Work Category:nk]",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617661"
        }
      },
      {
        "id": "ws_16",
        "name": "Performance Bubble - Work Category",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "SLA Status",
          "Work Category"
        ],
        "measures": [
          {
            "name": "Avg IGO Aging",
            "type": "calculated"
          },
          {
            "name": "SLA Pct",
            "type": "calculated"
          },
          {
            "name": "IGO Aging",
            "type": "base_measure"
          },
          {
            "name": "Case ID",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176034816",
            "type": "base_measure"
          },
          {
            "name": "Calculation_0746846176702471",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617670",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[usr:Calculation_074684617603"
        }
      },
      {
        "id": "ws_17",
        "name": "SLA Bubbles",
        "chartType": "Scatter / Bubble",
        "dimensions": [
          "Case ID",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:SLA Status:nk]",
          "columns": "Columns / Measure Values"
        }
      },
      {
        "id": "ws_18",
        "name": "SLA Mix by Master Category",
        "chartType": "Bar Chart",
        "dimensions": [
          "Case ID",
          "Master Work Category",
          "SLA Status"
        ],
        "measures": [
          {
            "name": "Case ID",
            "type": "base_measure"
          }
        ],
        "axes": {
          "rows": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[none:Master Work Category:nk",
          "columns": "[federated.065oqrq01f7c6g1cde3270f6fu6h].[ctd:Case ID:qk]"
        }
      }
    ],
    "calculatedFields": [
      {
        "id": "cf_1",
        "name": "Avg IGO Aging",
        "formula": "AVG([IGO Aging])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Bubble - Work Category",
          "Bubble - Work Type",
          "KPI - External Pending",
          "KPI - Internal Pending"
        ]
      },
      {
        "id": "cf_2",
        "name": "Median IGO Aging",
        "formula": "PERCENTILE([IGO Aging], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI - Received"
        ]
      },
      {
        "id": "cf_3",
        "name": "Avg Processed Days",
        "formula": "AVG([Processed Days])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI - Processed"
        ]
      },
      {
        "id": "cf_4",
        "name": "Median Processed Days",
        "formula": "PERCENTILE([Processed Days], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_5",
        "name": "Cases",
        "formula": "COUNTD([Case ID])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_6",
        "name": "Within SLA Count",
        "formula": "SUM(IF [SLA Status] = 'Within SLA' THEN 1 ELSE 0 END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_7",
        "name": "Outside SLA Count",
        "formula": "SUM(IF [SLA Status] = 'Outside SLA' THEN 1 ELSE 0 END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Pareto - Outside SLA by Work Category"
        ]
      },
      {
        "id": "cf_8",
        "name": "SLA Pct",
        "formula": "SUM(IF [SLA Status] = 'Within SLA' THEN 1.0 ELSE 0 END) / SUM(IF [SLA Status] = 'Within SLA' OR [SLA Status] = 'Outside SLA' THEN 1.0 ELSE 0 END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Monthly Trend - Cases and SLA",
          "Performance Bubble - Work Category"
        ]
      },
      {
        "id": "cf_13",
        "name": "Avg OnHand Days",
        "formula": "AVG([OnHand Days])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_14",
        "name": "Median OnHand Days",
        "formula": "PERCENTILE([OnHand Days], 0.5)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      }
    ],
    "tables": [
      {
        tableName: "beneficiary_cases.csv",
        displayName: "beneficiary_cases.csv",
        rowCount: 0,
        dataSource: "federated.065oqrq01f7c6g1cde3270f6fu6h",
        hasColumnInformation: false,
        schemaInfo: ["Nigo Igo", "SLA Status"],
        emptyStateMessage: "Column Schema · no data preview available (.twb without extract)",
        columns: [],
        sampleRows: []
      }
    ]
  }
};
