/**
 * Tableau -> Power BI Migration Dataset
 * Extracted directly from C:\Users\madhu\Desktop\tb-bi backend SQLite databases,
 * PBIP Semantic Model definitions, TMDL schemas, and Excel data sources.
 */

/* ── Interfaces ── */
export interface TbPbiWorksheet {
  name: string;
  title: string;
  chartType: string;
  pbiVisual: string;
  description: string;
  markType: string;
  rows: string[];
  cols: string[];
  dimensions: string[];
  measures: string[];
  filters: string[];
  datasource: string;
}

export interface TbPbiCalculatedField {
  name: string;
  caption: string;
  formula: string;
  role: 'measure' | 'dimension';
  datatype: string;
  workbook: string;
}

export interface TbPbiDataTable {
  displayName: string;
  rawName: string;
  rowCount: number;
  columnDetails: { name: string; dataType: string; sampleValues: string[] }[];
  sampleRows: Record<string, string | number>[];
}

export interface TbPbiRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: string;
  crossFiltering?: string;
}

export interface TbPbiDaxConversion {
  id: string;
  fieldName: string;
  sourceFormula: string;
  daxFormula: string;
  confidence: number;
  status: 'valid' | 'warning' | 'error';
  warnings: string[];
  category: string;
  pattern?: string;
  reasoning?: string;
}

export interface TbPbiValidationSlice {
  dimensions: Record<string, string>;
  tableau_value: number;
  source_value?: number;
  dax_value: number;
  delta: number;
  relative_error?: number;
  error_category?: string;
  passed: boolean;
}

export interface TbPbiValidationResult {
  conversionId: string;
  overallPassed: boolean;
  passRate: number;
  testSlices: TbPbiValidationSlice[];
  errorCategories: Record<string, number>;
}

export interface TbPbiCorrectionAttempt {
  conversionId: string;
  attemptNumber: number;
  originalDax: string;
  correctedDax: string;
  rootCause: string;
  explanation: string;
  status: string;
}

export interface TbPbiExportArtifact {
  id: string;
  fileName: string;
  type: 'pbip' | 'tmdl' | 'dax' | 'excel' | 'certificate' | 'bim' | 'data' | 'readme';
  description: string;
  size: string;
  mimeType: string;
  content?: string;
}

export const tbPbiSummary = {
  "totalDashboards": 1,
  "totalWorksheets": 20,
  "totalTables": 6,
  "totalRows": 1275,
  "totalColumns": 58,
  "totalCalculatedFields": 21,
  "totalRelationships": 5,
  "totalMeasures": 21,
  "averageConfidence": 98
};

export const tbPbiDataTables: TbPbiDataTable[] = [
  {
    "displayName": "Brokage",
    "rawName": "Brokage",
    "rowCount": 961,
    "columnDetails": [
      {
        "name": "client_name",
        "dataType": "string",
        "sampleValues": [
          "A",
          "Amit",
          "B"
        ]
      },
      {
        "name": "policy_number",
        "dataType": "string",
        "sampleValues": [
          "2.4142027811737e+18",
          "12139156",
          "2200090892"
        ]
      },
      {
        "name": "policy_status",
        "dataType": "string",
        "sampleValues": [
          "Active",
          "Active",
          "Inactive"
        ]
      },
      {
        "name": "policy_start_date",
        "dataType": "datetime",
        "sampleValues": [
          "2018-04-19",
          "2019-05-01",
          "2018-09-13"
        ]
      },
      {
        "name": "policy_end_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-04-18",
          "2020-04-30",
          "2019-09-12"
        ]
      },
      {
        "name": "product_group",
        "dataType": "string",
        "sampleValues": [
          "Marine",
          "Marine",
          "Fire"
        ]
      },
      {
        "name": "Account Executive",
        "dataType": "string",
        "sampleValues": [
          "Vinay",
          "Abhinav Shivam",
          "Vinay"
        ]
      },
      {
        "name": "branch_name",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "solution_group",
        "dataType": "string",
        "sampleValues": [
          "Marine",
          "Marine",
          "Construction, Power & Infrastruc..."
        ]
      },
      {
        "name": "income_class",
        "dataType": "string",
        "sampleValues": [
          "Renewal",
          "New",
          "Renewal"
        ]
      },
      {
        "name": "Amount",
        "dataType": "double",
        "sampleValues": [
          "32186.72",
          "23590.71",
          "4611.96"
        ]
      },
      {
        "name": "income_due_date",
        "dataType": "datetime",
        "sampleValues": [
          "2018-04-19",
          "2019-05-01",
          "2018-09-13"
        ]
      },
      {
        "name": "revenue_transaction_type",
        "dataType": "string",
        "sampleValues": [
          "Brokerage",
          "Brokerage",
          "Brokerage"
        ]
      },
      {
        "name": "renewal_status",
        "dataType": "string",
        "sampleValues": [
          "Inception",
          "Inception",
          "Inception"
        ]
      },
      {
        "name": "lapse_reason",
        "dataType": "string",
        "sampleValues": []
      },
      {
        "name": "last_updated_date",
        "dataType": "datetime",
        "sampleValues": [
          "2020-01-22",
          "2020-01-22",
          "2020-01-22"
        ]
      }
    ],
    "sampleRows": [
      {
        "client_name": "A",
        "policy_number": "",
        "policy_status": "Active",
        "policy_start_date": "2018-04-19",
        "policy_end_date": "2019-04-18",
        "product_group": "Marine",
        "Account Executive": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Marine",
        "income_class": "Renewal",
        "Amount": "32186.72",
        "income_due_date": "2018-04-19",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": "",
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "Amit",
        "policy_number": "2.4142027811737e+18",
        "policy_status": "Active",
        "policy_start_date": "2019-05-01",
        "policy_end_date": "2020-04-30",
        "product_group": "Marine",
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "solution_group": "Marine",
        "income_class": "New",
        "Amount": "23590.71",
        "income_due_date": "2019-05-01",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": "",
        "last_updated_date": "2020-01-22"
      },
      {
        "client_name": "B",
        "policy_number": "",
        "policy_status": "Inactive",
        "policy_start_date": "2018-09-13",
        "policy_end_date": "2019-09-12",
        "product_group": "Fire",
        "Account Executive": "Vinay",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "income_class": "Renewal",
        "Amount": "4611.96",
        "income_due_date": "2018-09-13",
        "revenue_transaction_type": "Brokerage",
        "renewal_status": "Inception",
        "lapse_reason": "",
        "last_updated_date": "2020-01-22"
      }
    ]
  },
  {
    "displayName": "Fees",
    "rawName": "Fees",
    "rowCount": 9,
    "columnDetails": [
      {
        "name": "client_name",
        "dataType": "string",
        "sampleValues": [
          "A",
          "A",
          "B"
        ]
      },
      {
        "name": "branch_name",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "solution_group",
        "dataType": "string",
        "sampleValues": [
          "Construction, Power & Infrastruc...",
          "Construction, Power & Infrastruc...",
          "GL Client Network (GNB Inward)"
        ]
      },
      {
        "name": "Account Executive",
        "dataType": "string",
        "sampleValues": [
          "Nishant Sharma",
          "Nishant Sharma",
          "Divya Dhingra"
        ]
      },
      {
        "name": "income_class",
        "dataType": "string",
        "sampleValues": [
          "Cross Sell",
          "Cross Sell",
          "Renewal"
        ]
      },
      {
        "name": "Amount",
        "dataType": "integer",
        "sampleValues": [
          "139240",
          "139240",
          "2200"
        ]
      },
      {
        "name": "income_due_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-07-17",
          "2019-01-21",
          "2019-12-20"
        ]
      },
      {
        "name": "revenue_transaction_type",
        "dataType": "string",
        "sampleValues": [
          "Fees",
          "Fees",
          "Fees"
        ]
      }
    ],
    "sampleRows": [
      {
        "client_name": "A",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "Account Executive": "Nishant Sharma",
        "income_class": "Cross Sell",
        "Amount": "139240",
        "income_due_date": "2019-07-17",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "A",
        "branch_name": "Ahmedabad",
        "solution_group": "Construction, Power & Infrastructure",
        "Account Executive": "Nishant Sharma",
        "income_class": "Cross Sell",
        "Amount": "139240",
        "income_due_date": "2019-01-21",
        "revenue_transaction_type": "Fees"
      },
      {
        "client_name": "B",
        "branch_name": "Ahmedabad",
        "solution_group": "GL Client Network (GNB Inward)",
        "Account Executive": "Divya Dhingra",
        "income_class": "Renewal",
        "Amount": "2200",
        "income_due_date": "2019-12-20",
        "revenue_transaction_type": "Fees"
      }
    ]
  },
  {
    "displayName": "Individual Budget",
    "rawName": "Individual_Budget",
    "rowCount": 18,
    "columnDetails": [
      {
        "name": "Branch",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "Employee Name",
        "dataType": "string",
        "sampleValues": [
          "Anil Tailor",
          "Ankita Shah",
          "Divya Dhingra"
        ]
      },
      {
        "name": "New Role2",
        "dataType": "string",
        "sampleValues": [
          "Hunter & Farmer",
          "Servicer",
          "Servicer"
        ]
      },
      {
        "name": "New Budget",
        "dataType": "integer",
        "sampleValues": [
          "0",
          "0",
          "1000000"
        ]
      },
      {
        "name": "Cross sell bugdet",
        "dataType": "integer",
        "sampleValues": [
          "250000",
          "0",
          "500000"
        ]
      },
      {
        "name": "Renewal Budget",
        "dataType": "integer",
        "sampleValues": [
          "1500000",
          "0",
          "1010000"
        ]
      },
      {
        "name": "Target budget",
        "dataType": "integer",
        "sampleValues": [
          "1750000",
          "0",
          "0"
        ]
      }
    ],
    "sampleRows": [
      {
        "Branch": "Ahmedabad",
        "Employee Name": "Anil Tailor",
        "New Role2": "Hunter & Farmer",
        "New Budget": "0",
        "Cross sell bugdet": "250000",
        "Renewal Budget": "1500000",
        "Target budget": "1750000"
      },
      {
        "Branch": "Ahmedabad",
        "Employee Name": "Ankita Shah",
        "New Role2": "Servicer",
        "New Budget": "",
        "Cross sell bugdet": "",
        "Renewal Budget": "",
        "Target budget": "0"
      },
      {
        "Branch": "Ahmedabad",
        "Employee Name": "Divya Dhingra",
        "New Role2": "Servicer",
        "New Budget": "0",
        "Cross sell bugdet": "0",
        "Renewal Budget": "0",
        "Target budget": "0"
      }
    ]
  },
  {
    "displayName": "Invoice",
    "rawName": "Invoice",
    "rowCount": 204,
    "columnDetails": [
      {
        "name": "invoice_number",
        "dataType": "integer",
        "sampleValues": [
          "1900001087",
          "1900001106",
          "1900001110"
        ]
      },
      {
        "name": "invoice_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-04-11",
          "2019-05-17",
          "2019-05-17"
        ]
      },
      {
        "name": "revenue_transaction_type",
        "dataType": "string",
        "sampleValues": [
          "Fees",
          "Brokerage",
          "Brokerage"
        ]
      },
      {
        "name": "branch_name",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "solution_group",
        "dataType": "string",
        "sampleValues": [
          "Liability",
          "Global Client Network (GNB Inward)",
          "Global Client Network (GNB Inward)"
        ]
      },
      {
        "name": "Account Executive",
        "dataType": "string",
        "sampleValues": [
          "Neel Jain",
          "Divya Dhingra",
          "Divya Dhingra"
        ]
      },
      {
        "name": "income_class",
        "dataType": "string",
        "sampleValues": [
          "New",
          "Renewal",
          "Renewal"
        ]
      },
      {
        "name": "client_name",
        "dataType": "string",
        "sampleValues": [
          "I",
          "M",
          "S"
        ]
      },
      {
        "name": "policy_number",
        "dataType": "integer",
        "sampleValues": [
          "2414202092813599700",
          "OG-19-2202-1018-00000060",
          "OG-19-2202-3383-00000010"
        ]
      },
      {
        "name": "Amount",
        "dataType": "integer",
        "sampleValues": [
          "84746",
          "86724",
          "148500"
        ]
      },
      {
        "name": "income_due_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-04-10",
          "2019-01-01",
          "2019-03-01"
        ]
      }
    ],
    "sampleRows": [
      {
        "invoice_number": "1900001087",
        "invoice_date": "2019-04-11",
        "revenue_transaction_type": "Fees",
        "branch_name": "Ahmedabad",
        "solution_group": "Liability",
        "Account Executive": "Neel Jain",
        "income_class": "New",
        "client_name": "I",
        "policy_number": "",
        "Amount": "84746",
        "income_due_date": "2019-04-10"
      },
      {
        "invoice_number": "1900001106",
        "invoice_date": "2019-05-17",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Executive": "Divya Dhingra",
        "income_class": "Renewal",
        "client_name": "M",
        "policy_number": "2414202092813599700",
        "Amount": "86724",
        "income_due_date": "2019-01-01"
      },
      {
        "invoice_number": "1900001110",
        "invoice_date": "2019-05-17",
        "revenue_transaction_type": "Brokerage",
        "branch_name": "Ahmedabad",
        "solution_group": "Global Client Network (GNB Inward)",
        "Account Executive": "Divya Dhingra",
        "income_class": "Renewal",
        "client_name": "S",
        "policy_number": "OG-19-2202-1018-00000060",
        "Amount": "148500",
        "income_due_date": "2019-03-01"
      }
    ]
  },
  {
    "displayName": "Meeting",
    "rawName": "Meeting",
    "rowCount": 34,
    "columnDetails": [
      {
        "name": "Account Executive",
        "dataType": "string",
        "sampleValues": [
          "Abhinav Shivam",
          "Abhinav Shivam",
          "Abhinav Shivam"
        ]
      },
      {
        "name": "branch_name",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "global_attendees",
        "dataType": "string",
        "sampleValues": []
      },
      {
        "name": "meeting_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-10-17",
          "2019-10-17",
          "2019-12-24"
        ]
      }
    ],
    "sampleRows": [
      {
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "",
        "meeting_date": "2019-10-17"
      },
      {
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "",
        "meeting_date": "2019-10-17"
      },
      {
        "Account Executive": "Abhinav Shivam",
        "branch_name": "Ahmedabad",
        "global_attendees": "",
        "meeting_date": "2019-12-24"
      }
    ]
  },
  {
    "displayName": "opportunity",
    "rawName": "opportunity",
    "rowCount": 49,
    "columnDetails": [
      {
        "name": "opportunity_name",
        "dataType": "string",
        "sampleValues": [
          "EL-Group Mediclaim",
          "AL GPA",
          "BL - Marine STOP"
        ]
      },
      {
        "name": "opportunity_id",
        "dataType": "string",
        "sampleValues": [
          "OPP1900001042",
          "OPP1900001047",
          "OPP1900001048"
        ]
      },
      {
        "name": "Account Executive",
        "dataType": "string",
        "sampleValues": [
          "Animesh Rawat",
          "Shivani Sharma",
          "Shivani Sharma"
        ]
      },
      {
        "name": "premium_amount",
        "dataType": "integer",
        "sampleValues": [
          "8000000",
          "200000",
          "0"
        ]
      },
      {
        "name": "revenue_amount",
        "dataType": "integer",
        "sampleValues": [
          "400000",
          "30000",
          "100000"
        ]
      },
      {
        "name": "closing_date",
        "dataType": "datetime",
        "sampleValues": [
          "2019-11-13",
          "2020-03-31",
          "2020-06-30"
        ]
      },
      {
        "name": "stage",
        "dataType": "string",
        "sampleValues": [
          "Qualify Opportunity",
          "Qualify Opportunity",
          "Qualify Opportunity"
        ]
      },
      {
        "name": "branch",
        "dataType": "string",
        "sampleValues": [
          "Ahmedabad",
          "Ahmedabad",
          "Ahmedabad"
        ]
      },
      {
        "name": "specialty",
        "dataType": "string",
        "sampleValues": [
          "Employee Benefits (EB)",
          "Employee Benefits (EB)",
          "Marine"
        ]
      },
      {
        "name": "product_group",
        "dataType": "string",
        "sampleValues": [
          "Employee Benefits",
          "Employee Benefits",
          "Marine"
        ]
      },
      {
        "name": "product_sub_group",
        "dataType": "string",
        "sampleValues": [
          "Mediclaim",
          "Mediclaim",
          "Marine Hull"
        ]
      },
      {
        "name": "risk_details",
        "dataType": "string",
        "sampleValues": [
          "Group Medical",
          "Group Personal Accident",
          "Charterers' Liability Policy"
        ]
      }
    ],
    "sampleRows": [
      {
        "opportunity_name": "EL-Group Mediclaim",
        "opportunity_id": "OPP1900001042",
        "Account Executive": "Animesh Rawat",
        "premium_amount": "8000000",
        "revenue_amount": "400000",
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
        "Account Executive": "Shivani Sharma",
        "premium_amount": "200000",
        "revenue_amount": "30000",
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
        "Account Executive": "Shivani Sharma",
        "premium_amount": "0",
        "revenue_amount": "100000",
        "closing_date": "2020-06-30",
        "stage": "Qualify Opportunity",
        "branch": "Ahmedabad",
        "specialty": "Marine",
        "product_group": "Marine",
        "product_sub_group": "Marine Hull",
        "risk_details": "Charterers' Liability Policy"
      }
    ]
  }
];

export const tbPbiRelationships: TbPbiRelationship[] = [
  {
    "fromTable": "Brokage",
    "fromColumn": "Account Executive",
    "toTable": "Fees",
    "toColumn": "Account Executive",
    "type": "Many-to-One (*:1)",
    "crossFiltering": "Single"
  },
  {
    "fromTable": "Brokage",
    "fromColumn": "branch_name",
    "toTable": "Individual Budget",
    "toColumn": "Branch",
    "type": "Many-to-One (*:1)",
    "crossFiltering": "Both"
  },
  {
    "fromTable": "Brokage",
    "fromColumn": "Account Executive",
    "toTable": "Invoice",
    "toColumn": "Account Executive",
    "type": "Many-to-One (*:1)",
    "crossFiltering": "Single"
  },
  {
    "fromTable": "Brokage",
    "fromColumn": "Account Executive",
    "toTable": "Meeting",
    "toColumn": "Account Executive",
    "type": "Many-to-One (*:1)",
    "crossFiltering": "Single"
  },
  {
    "fromTable": "Brokage",
    "fromColumn": "Account Executive",
    "toTable": "Opportunity",
    "toColumn": "Account Executive",
    "type": "Many-to-One (*:1)",
    "crossFiltering": "Single"
  }
];

export const tbPbiWorksheets: TbPbiWorksheet[] = [
  {
    "name": "New (2)",
    "title": "New Sales Placed Summary",
    "chartType": "KPI Card",
    "pbiVisual": "Card / Single Value",
    "description": "New Sales Placed Summary",
    "markType": "Automatic",
    "rows": [
      "[:Measure Names]"
    ],
    "cols": [
      "[Multiple Values]"
    ],
    "dimensions": [
      ":Measure Names",
      "Multiple Values"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      ":Measure Names"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "New sell Placed Achivement%",
    "title": "New sell Placed Achivement%",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "New Business Placed Target %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "Oppty-product distribution",
    "title": "Oppty-product distribution",
    "chartType": "Donut Chart",
    "pbiVisual": "Pie / Donut",
    "description": "Opportunity Breakdown by Product Group",
    "markType": "Pie",
    "rows": [
      "SUM([zero])",
      "SUM([zero])"
    ],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "zero"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "Reneal Placed Achivemt%",
    "title": "Renewal Placed Achivement%",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "Renewal Revenue Target %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "Renewal invoice placed Ach%",
    "title": "Renewal invoice placed Achivement%",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "Renewal Invoices Realized %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "Sheet 14",
    "title": "Open oppty-Top 4",
    "chartType": "Bar Chart",
    "pbiVisual": "Clustered Bar",
    "description": "Top 4 Open Opportunities by Revenue",
    "markType": "Automatic",
    "rows": [
      "SUM([Revenue Amount])"
    ],
    "cols": [
      "[Open oppty]",
      "[Opportunity Name]"
    ],
    "dimensions": [
      "Open oppty",
      "Opportunity Name"
    ],
    "measures": [
      "Revenue Amount"
    ],
    "filters": [
      "Opportunity Name"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "Target",
    "title": "Target",
    "chartType": "Matrix",
    "pbiVisual": "Matrix / Pivot",
    "description": "Budget vs Target Allocation Matrix",
    "markType": "Automatic",
    "rows": [
      "[:Measure Names]"
    ],
    "cols": [],
    "dimensions": [
      ":Measure Names"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      ":Measure Names"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "archive",
    "title": "archive",
    "chartType": "KPI Card",
    "pbiVisual": "Card",
    "description": "Total Archived Cross-Sell Revenue",
    "markType": "Automatic",
    "rows": [],
    "cols": [
      "SUM([cross sell archive])"
    ],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "cross sell archive"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "cross sell",
    "title": "Cross sell",
    "chartType": "Clustered Column",
    "pbiVisual": "Clustered Column",
    "description": "Cross-Sell Volume by Solution Group",
    "markType": "Automatic",
    "rows": [
      "[:Measure Names]"
    ],
    "cols": [
      "[Multiple Values]"
    ],
    "dimensions": [
      ":Measure Names",
      "Multiple Values"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      ":Measure Names"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "cross sell ach%",
    "title": "Cross-sell placed Achievement %",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "Cross-Sell Placement Achievement %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "cross sell invoice placed%",
    "title": "Cross Sell invoice placed achivement%",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "Cross-Sell Invoicing Realization %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "funnel",
    "title": "Stage funnel by Revenue",
    "chartType": "Funnel Chart",
    "pbiVisual": "Funnel",
    "description": "Sales Stage Pipeline Funnel",
    "markType": "Automatic",
    "rows": [
      "SUM([Revenue Amount])"
    ],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "invoice",
    "title": "invoice",
    "chartType": "Stacked Bar Chart",
    "pbiVisual": "Stacked Bar",
    "description": "Invoice Revenue by Income Class & Due Year",
    "markType": "Bar",
    "rows": [
      "[income class (Invoice)]"
    ],
    "cols": [
      "YEAR([income due date (Invoice)])",
      "SUM([Amount (Invoice)])"
    ],
    "dimensions": [
      "income class (Invoice",
      "income due date (Invoice"
    ],
    "measures": [
      "Amount (Invoice"
    ],
    "filters": [
      "Exclusions (income class (Invoice),YEAR(income due date (Invoice)))"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "new sell invoive Achivement%",
    "title": "New sell invoive Achivement%",
    "chartType": "Gauge Chart",
    "pbiVisual": "Gauge",
    "description": "New Sell Invoicing Achievement %",
    "markType": "Automatic",
    "rows": [],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "number if invoice",
    "title": "Number of invoice by Acc Executive",
    "chartType": "Column Chart",
    "pbiVisual": "Clustered Column",
    "description": "Invoice Volume by Account Executive",
    "markType": "Automatic",
    "rows": [
      "[Account Executive (Invoice)]"
    ],
    "cols": [
      "[COUNT(table)]"
    ],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "table",
      "Account Executive (Invoice"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "number of meeting",
    "title": "number of meeting",
    "chartType": "KPI Card",
    "pbiVisual": "Card",
    "description": "Total Meetings Executed",
    "markType": "Automatic",
    "rows": [
      "[Account Executive (Meeting)]"
    ],
    "cols": [
      "YEAR([Meeting Date])"
    ],
    "dimensions": [
      "Meeting Date"
    ],
    "measures": [
      "Account Executive (Meeting"
    ],
    "filters": [
      "Status = Active"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "number of meeting (2)",
    "title": "Number of meetings by Acc Executive",
    "chartType": "Horizontal Bar",
    "pbiVisual": "Clustered Bar",
    "description": "Meetings Logged per Account Executive",
    "markType": "Bar",
    "rows": [
      "[Account Executive (Meeting)]"
    ],
    "cols": [
      "YEAR([Meeting Date])",
      "COUNT([Account Executive (Meeting)])"
    ],
    "dimensions": [
      "Meeting Date"
    ],
    "measures": [
      "Account Executive (Meeting"
    ],
    "filters": [
      "Meeting Date"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "oppty revenue",
    "title": "Oppty Revenue",
    "chartType": "Treemap",
    "pbiVisual": "Treemap",
    "description": "Pipeline Opportunities by Size & Revenue",
    "markType": "Automatic",
    "rows": [
      "[Opportunity Name]"
    ],
    "cols": [
      "SUM([Revenue Amount])"
    ],
    "dimensions": [
      "Opportunity Name"
    ],
    "measures": [
      "Revenue Amount"
    ],
    "filters": [
      "Opportunity Id"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "renewal",
    "title": "Renewal",
    "chartType": "Line Chart",
    "pbiVisual": "Line & Clustered Column",
    "description": "Renewal Invoicing Trend & Volume",
    "markType": "Automatic",
    "rows": [
      "[:Measure Names]"
    ],
    "cols": [
      "[Multiple Values]"
    ],
    "dimensions": [
      ":Measure Names",
      "Multiple Values"
    ],
    "measures": [
      "Revenue Amount",
      "Target"
    ],
    "filters": [
      ":Measure Names"
    ],
    "datasource": "Insurance_Model"
  },
  {
    "name": "total oppty",
    "title": "Count of oppurtunities",
    "chartType": "KPI Card",
    "pbiVisual": "Card",
    "description": "Total Active Pipeline Opportunities",
    "markType": "Automatic",
    "rows": [
      "COUNT([Open oppty])",
      "COUNT([Opportunity Id])"
    ],
    "cols": [],
    "dimensions": [
      "Account Executive",
      "Branch"
    ],
    "measures": [
      "Open oppty",
      "Opportunity Id"
    ],
    "filters": [
      "Open oppty",
      "Opportunity Id"
    ],
    "datasource": "Insurance_Model"
  }
];

export const tbPbiDaxConversions: TbPbiDaxConversion[] = [
  {
    "id": "conv_01",
    "fieldName": "zero",
    "sourceFormula": "0",
    "daxFormula": "zero = 0",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Aggregation",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The Tableau formula is a constant literal, which maps directly to a constant value in DAX."
  },
  {
    "id": "conv_02",
    "fieldName": "cross sell placed achivement%",
    "sourceFormula": "(sum([ brokage cross sell ])/sum([Cross sell bugdet]))*100",
    "daxFormula": "cross sell placed achivement% = DIVIDE([brokage cross sell], SUM('Individual Budget'[Cross sell bugdet]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The numerator is an existing measure and the denominator is a base numeric column from the 'Individual Budget' table, combined using the DIVIDE function for safety."
  },
  {
    "id": "conv_03",
    "fieldName": "cross sell fees",
    "sourceFormula": "IF [income_class (Fees)]=\"cross sell\" then[Amount (Fees)] end",
    "daxFormula": "cross sell fees = CALCULATE(SUM('Fees'[Amount]), 'Fees'[income_class] = \"cross sell\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula uses a base numeric column with a conditional filter, which translates to a CALCULATE function wrapping a SUM aggregation filtered by the dimension column."
  },
  {
    "id": "conv_04",
    "fieldName": "brokage cross sell",
    "sourceFormula": "if [income_class]=\"cross sell\" then [Amount] end",
    "daxFormula": "brokage cross sell = CALCULATE(SUM('Brokage'[Amount]), 'Brokage'[income_class] = \"cross sell\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula uses a conditional filter on a base dimension column applied to the sum of a base numeric column, which maps to a CALCULATE pattern in DAX."
  },
  {
    "id": "conv_05",
    "fieldName": "invoice cross sell",
    "sourceFormula": "if [income_class (Invoice)]=\"cross sell\" then [Amount (Invoice)] end",
    "daxFormula": "invoice cross sell = CALCULATE(SUM('Invoice'[Amount]), 'Invoice'[income_class] = \"cross sell\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula filters a base numeric column based on a dimension value, which is converted to a CALCULATE function with a filter argument."
  },
  {
    "id": "conv_06",
    "fieldName": "invoice new",
    "sourceFormula": "IF [income_class (Invoice)]=\"new\" then [Amount (Invoice)] end",
    "daxFormula": "invoice new = CALCULATE(SUM('Invoice'[Amount]), 'Invoice'[income_class] = \"new\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The Tableau row-level IF condition on a base dimension column and base numeric column is converted to a CALCULATE function using the SUM of the amount filtered by the dimension value."
  },
  {
    "id": "conv_07",
    "fieldName": "Brokage new",
    "sourceFormula": "if [income_class]=\"new\" then [Amount] END",
    "daxFormula": "Brokage new = CALCULATE(SUM('Brokage'[Amount]), 'Brokage'[income_class] = \"new\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The Tableau IF statement on a base dimension column and base numeric column is converted to a CALCULATE function with the dimension filter applied to the SUM of the numeric column."
  },
  {
    "id": "conv_08",
    "fieldName": "new fees",
    "sourceFormula": "IF [income_class (Fees)]=\"new\" then [Amount (Fees)] end",
    "daxFormula": "new fees = CALCULATE(SUM('Fees'[Amount]), 'Fees'[income_class] = \"new\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula filters a base numeric column based on a dimension value, which is best implemented using CALCULATE with a filter argument."
  },
  {
    "id": "conv_09",
    "fieldName": "brokage renewal",
    "sourceFormula": "if [income_class]=\"renewal\" then [Amount] end",
    "daxFormula": "brokage renewal = CALCULATE(SUM('Brokage'[Amount]), 'Brokage'[income_class] = \"renewal\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula uses a conditional filter on a base dimension column applied to a base numeric column, which maps to the CALCULATE(SUM(...), filter) pattern."
  },
  {
    "id": "conv_10",
    "fieldName": "Invoice renewal",
    "sourceFormula": "if [income_class (Invoice)]=\"renewal\" then [Amount (Invoice)] END",
    "daxFormula": "Invoice renewal = CALCULATE(SUM('Invoice'[Amount]), 'Invoice'[income_class] = \"renewal\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula filters the base numeric column 'Amount' by the dimension 'income_class' using the CALCULATE pattern for conditional aggregation."
  },
  {
    "id": "conv_11",
    "fieldName": "renewal fees",
    "sourceFormula": "if [income_class (Fees)]=\"renewal\" then [Amount (Fees)] END",
    "daxFormula": "renewal fees = CALCULATE(SUM('Fees'[Amount]), 'Fees'[income_class] = \"renewal\")",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Filter Context",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The Tableau IF statement on a base dimension column and base numeric column is converted to a CALCULATE function using the SUM of the amount filtered by the income class."
  },
  {
    "id": "conv_12",
    "fieldName": "Open oppty",
    "sourceFormula": "IF [stage]=\"Propose solution\" or [stage]= \"Qualify opportunity\" then \"open\" end",
    "daxFormula": "Open oppty = IF(SELECTEDVALUE('Opportunity'[stage]) = \"Propose solution\" || SELECTEDVALUE('Opportunity'[stage]) = \"Qualify opportunity\", \"open\", BLANK())",
    "confidence": 95,
    "status": "valid",
    "warnings": [],
    "category": "Conditional Logic",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The Tableau formula is a row-level calculated column returning a string; in DAX, this is replicated using IF with SELECTEDVALUE to handle the row context for the dimension column."
  },
  {
    "id": "conv_13",
    "fieldName": "cross sell archive",
    "sourceFormula": "sum([ brokage cross sell ])+sum([cross sell fees])",
    "daxFormula": "cross sell archive = [brokage cross sell] + [cross sell fees]",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Compound Measure",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "Both components are identified as existing measures, so they are referenced directly without SUM or table prefixes."
  },
  {
    "id": "conv_14",
    "fieldName": "Cross sell invoice placed achivement%",
    "sourceFormula": "(sum([invoice cross sell])/sum([Cross sell bugdet]))*100",
    "daxFormula": "Cross sell invoice placed achivement% = DIVIDE([invoice cross sell], SUM('Individual Budget'[Cross sell bugdet]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The numerator is a pre-existing measure and the denominator is a base numeric column requiring a SUM aggregation, combined using the DIVIDE function for safety."
  },
  {
    "id": "conv_15",
    "fieldName": "new sell invoice Achivement %",
    "sourceFormula": "(sum([invoice new])/sum([New Budget]))*100",
    "daxFormula": "new sell invoice Achivement % = DIVIDE([invoice new], SUM('Individual Budget'[New Budget]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula uses the existing [invoice new] measure as the numerator and the base numeric column 'New Budget' from the 'Individual Budget' table as the denominator, applying the DIVIDE function for safety."
  },
  {
    "id": "conv_16",
    "fieldName": "New sell placed Achived%",
    "sourceFormula": "(sum([Brokage new])/sum([New Budget]))*100",
    "daxFormula": "New sell placed Achived% = DIVIDE([Brokage new], SUM('Individual Budget'[New Budget]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The numerator is an existing aggregated measure and the denominator is a base numeric column from the 'Individual Budget' table, combined using the DIVIDE function for safety."
  },
  {
    "id": "conv_17",
    "fieldName": "Achived new",
    "sourceFormula": "sum([new fees])+sum([Brokage new])",
    "daxFormula": "Achived new = [new fees] + [Brokage new]",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Compound Measure",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "Since both [new fees] and [Brokage new] are identified as existing measures, they are referenced directly without SUM or table prefixes."
  },
  {
    "id": "conv_18",
    "fieldName": "Renewal placed achivemet",
    "sourceFormula": "(sum([brokage renewal])/sum([Renewal Budget]))*100",
    "daxFormula": "Renewal placed achivemet = DIVIDE([brokage renewal], SUM('Individual Budget'[Renewal Budget]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula uses the existing [brokage renewal] measure for the numerator and the base numeric column [Renewal Budget] from the 'Individual Budget' table for the denominator, wrapped in DIVIDE for safety and multiplied by 100."
  },
  {
    "id": "conv_19",
    "fieldName": "invoice achived",
    "sourceFormula": "[brokage renewal]+[brokage renewal]",
    "daxFormula": "invoice achived = [brokage renewal] + [brokage renewal]",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Compound Measure",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The formula is a simple addition of two existing measures, which are referenced directly without table prefixes or aggregation functions as per the provided rules."
  },
  {
    "id": "conv_20",
    "fieldName": "Renewal invoice achivement%",
    "sourceFormula": "(sum([Invoice renewal])/sum([Renewal Budget]))*100",
    "daxFormula": "Renewal invoice achivement% = DIVIDE([Invoice renewal], SUM('Individual Budget'[Renewal Budget]), 0) * 100",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Ratio & Percentage",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "The numerator is an existing measure and the denominator is a base numeric column from the 'Individual Budget' table, combined using the DIVIDE function to handle potential division by zero."
  },
  {
    "id": "conv_21",
    "fieldName": "achived renewal",
    "sourceFormula": "sum([brokage renewal])+sum([renewal fees])",
    "daxFormula": "achived renewal = [brokage renewal] + [renewal fees]",
    "confidence": 100,
    "status": "valid",
    "warnings": [],
    "category": "Compound Measure",
    "pattern": "AST_OPTIMIZED_CALCULATION",
    "reasoning": "Both components are existing measures, so they are referenced directly without aggregation functions."
  }
];

export const tbPbiCalculatedFields: TbPbiCalculatedField[] = tbPbiDaxConversions.map(d => ({
  name: d.id,
  caption: d.fieldName,
  formula: d.sourceFormula,
  role: 'measure',
  datatype: 'real',
  workbook: 'Tableau Insurance.twbx',
}));

export const tbPbiValidationResults: TbPbiValidationResult[] = [
  {
    "conversionId": "conv_e6275b76",
    "overallPassed": true,
    "passRate": 1.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "Year": "2023"
        },
        "tableau_value": 1250.0,
        "source_value": 1250.0,
        "dax_value": 1250.0,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      },
      {
        "dimensions": {
          "Region": "South",
          "Year": "2023"
        },
        "tableau_value": 890.0,
        "source_value": 890.0,
        "dax_value": 890.0,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      },
      {
        "dimensions": {
          "Region": "West",
          "Year": "2024"
        },
        "tableau_value": 2100.0,
        "source_value": 2100.0,
        "dax_value": 2100.0,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      }
    ],
    "errorCategories": {
      "PERFECT_MATCH": 3
    }
  },
  {
    "conversionId": "conv_2963eaf8",
    "overallPassed": false,
    "passRate": 0.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "RiskLevel": "High"
        },
        "tableau_value": 1240.0,
        "source_value": 1240.0,
        "dax_value": 0.0,
        "delta": 1240.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "South",
          "RiskLevel": "High"
        },
        "tableau_value": 890.0,
        "source_value": 890.0,
        "dax_value": 0.0,
        "delta": 890.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "West",
          "RiskLevel": "High"
        },
        "tableau_value": 450.0,
        "source_value": 450.0,
        "dax_value": 0.0,
        "delta": 450.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      }
    ],
    "errorCategories": {
      "CONTEXT_SHIFT": 3
    }
  },
  {
    "conversionId": "conv_2963eaf8",
    "overallPassed": false,
    "passRate": 0.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "Year": "2023"
        },
        "tableau_value": 120.0,
        "source_value": 120.0,
        "dax_value": 450.0,
        "delta": 330.0,
        "relative_error": 2.75,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "South",
          "Year": "2023"
        },
        "tableau_value": 85.0,
        "source_value": 85.0,
        "dax_value": 310.0,
        "delta": 225.0,
        "relative_error": 2.647,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "West",
          "Year": "2023"
        },
        "tableau_value": 210.0,
        "source_value": 210.0,
        "dax_value": 780.0,
        "delta": 570.0,
        "relative_error": 2.714,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      }
    ],
    "errorCategories": {
      "CONTEXT_SHIFT": 3
    }
  },
  {
    "conversionId": "conv_2963eaf8",
    "overallPassed": false,
    "passRate": 0.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "Year": "2023"
        },
        "tableau_value": 120.0,
        "source_value": 120.0,
        "dax_value": 0.0,
        "delta": 120.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "South",
          "Year": "2023"
        },
        "tableau_value": 85.0,
        "source_value": 85.0,
        "dax_value": 0.0,
        "delta": 85.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "West",
          "Year": "2023"
        },
        "tableau_value": 210.0,
        "source_value": 210.0,
        "dax_value": 0.0,
        "delta": 210.0,
        "relative_error": 1.0,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      }
    ],
    "errorCategories": {
      "CONTEXT_SHIFT": 3
    }
  },
  {
    "conversionId": "conv_2963eaf8",
    "overallPassed": false,
    "passRate": 0.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "Year": "2023"
        },
        "tableau_value": 450.0,
        "source_value": 450.0,
        "dax_value": 1200.0,
        "delta": 750.0,
        "relative_error": 1.666,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "South",
          "Year": "2023"
        },
        "tableau_value": 320.0,
        "source_value": 320.0,
        "dax_value": 890.0,
        "delta": 570.0,
        "relative_error": 1.781,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      },
      {
        "dimensions": {
          "Region": "West",
          "Year": "2023"
        },
        "tableau_value": 110.0,
        "source_value": 110.0,
        "dax_value": 340.0,
        "delta": 230.0,
        "relative_error": 2.09,
        "passed": false,
        "error_category": "CONTEXT_SHIFT"
      }
    ],
    "errorCategories": {
      "CONTEXT_SHIFT": 3
    }
  },
  {
    "conversionId": "conv_644d7d0b",
    "overallPassed": true,
    "passRate": 1.0,
    "testSlices": [
      {
        "dimensions": {
          "Region": "North",
          "Year": "2023"
        },
        "tableau_value": 0.15,
        "source_value": 0.15,
        "dax_value": 0.15,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      },
      {
        "dimensions": {
          "Region": "South",
          "Year": "2023"
        },
        "tableau_value": 0.08,
        "source_value": 0.08,
        "dax_value": 0.08,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      },
      {
        "dimensions": {
          "Region": "West",
          "Year": "2023"
        },
        "tableau_value": 0.0,
        "source_value": 0.0,
        "dax_value": 0.0,
        "delta": 0.0,
        "relative_error": 0.0,
        "passed": true,
        "error_category": "PERFECT_MATCH"
      }
    ],
    "errorCategories": {
      "PERFECT_MATCH": 3
    }
  }
];

export const tbPbiCorrectionHistory: TbPbiCorrectionAttempt[] = [
  {
    "conversionId": "conv_2963eaf8",
    "attemptNumber": 1,
    "originalDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), 'chunk_1'[Integrated Risk Band] = \"HIGH\", 'chunk_1'[PolicyStatus] = \"A\")",
    "correctedDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), FILTER(ALL('chunk_1'), 'chunk_1'[Integrated Score] = \"HIGH\" && 'chunk_1'[PolicyStatus] = \"A\"))",
    "rootCause": "The original DAX failed because it attempted to filter the 'chunk_1' table using columns that do not exist in that table. The schema context explicitly states that 'Integrated Risk Band' is not a column in 'chunk_1', whereas 'Integrated Score' is. Furthermore, the filter context was likely failing due to the relationship between 'chunk_1' and 'markerchunk_1' not being correctly bridged or the filter columns being misidentified.",
    "explanation": "Corrected the column reference from the non-existent 'Integrated Risk Band' to 'Integrated Score' based on the provided schema. Used FILTER(ALL(...)) to ensure the measure correctly evaluates the count regardless of the current filter context on the 'chunk_1' table, ensuring the logic matches the ThoughtSpot unique_count_if behavior.",
    "status": "Healed"
  },
  {
    "conversionId": "conv_2963eaf8",
    "attemptNumber": 2,
    "originalDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), FILTER(ALL('chunk_1'), 'chunk_1'[Integrated Score] = \"HIGH\" && 'chunk_1'[PolicyStatus] = \"A\"))",
    "correctedDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), 'chunk_1'[Integrated Score] = \"HIGH\", 'chunk_1'[PolicyStatus] = \"A\")",
    "rootCause": "The use of ALL('chunk_1') in the FILTER function removes all filters from the 'chunk_1' table, including the current row context (Region, Year), causing the measure to return a grand total instead of the filtered subset. The original ThoughtSpot formula implicitly respects the current filter context.",
    "explanation": "Removed the ALL() function to allow the measure to respect the existing filter context (Region, Year). Simplified the CALCULATE syntax by passing the filter conditions directly as arguments, which is standard practice for simple equality filters in DAX.",
    "status": "Healed"
  },
  {
    "conversionId": "conv_2963eaf8",
    "attemptNumber": 3,
    "originalDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), 'chunk_1'[Integrated Score] = \"HIGH\", 'chunk_1'[PolicyStatus] = \"A\")",
    "correctedDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), FILTER(ALL('chunk_1'), 'chunk_1'[Integrated Score] = \"HIGH\" && 'chunk_1'[PolicyStatus] = \"A\"))",
    "rootCause": "The previous DAX failed because it attempted to filter the 'chunk_1' table using columns that do not exist or are misaligned with the 'markerchunk_1' table. Specifically, the filter 'Integrated Score' = 'HIGH' was applied to 'chunk_1', but the relationship between 'chunk_1' and 'markerchunk_1' (where PolicyNumber resides) was likely not propagating correctly due to filter context limitations. Additionally, the measure failed to account for the fact that 'PolicyNumber' is in 'markerchunk_1', requiring a cross-table filter context.",
    "explanation": "The formula was updated to use a FILTER(ALL(...)) pattern to ensure that the filter context from the visual does not prematurely restrict the calculation of the 'Integrated Score' and 'PolicyStatus' conditions. By using ALL('chunk_1'), we ensure the measure evaluates the conditions across the entire dataset before applying the distinct count of PolicyNumber from the marker table.",
    "status": "Healed"
  },
  {
    "conversionId": "conv_c3229867",
    "attemptNumber": 1,
    "originalDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), 'chunk_1'[Integrated Risk Band] = \"HIGH\", 'chunk_1'[PolicyStatus] = \"A\")",
    "correctedDax": "High Fraud Policies Count = CALCULATE(DISTINCTCOUNT('markerchunk_1'[PolicyNumber]), FILTER(ALL('chunk_1'), 'chunk_1'[RiskClass] = \"HIGH\" && 'chunk_1'[PolicyStatus] = \"A\"))",
    "rootCause": "The original DAX failed because it attempted to filter the 'chunk_1' table using columns that do not exist in that table ('Integrated Risk Band' is not in the schema context provided for 'chunk_1'). Furthermore, the filter context was likely failing due to a relationship mismatch between 'markerchunk_1' and 'chunk_1'. The filter conditions must be applied to columns that actually exist in the schema.",
    "explanation": "The filter was updated to use 'RiskClass' instead of the non-existent 'Integrated Risk Band' column. I used the FILTER(ALL(...)) pattern to ensure the measure correctly evaluates the count regardless of the current filter context on the 'chunk_1' table, while still respecting the relationship to 'markerchunk_1'.",
    "status": "Healed"
  }
];

export const tbPbiExportArtifacts: TbPbiExportArtifact[] = [
  {
    "id": "art-pbip",
    "fileName": "Tableau_Insurance_Migration.pbip",
    "type": "pbip",
    "description": "Microsoft Power BI Project definition (.pbip) with semantic model and report metadata",
    "size": "384 KB",
    "mimeType": "application/json"
  },
  {
    "id": "art-tmdl",
    "fileName": "model.tmdl",
    "type": "tmdl",
    "description": "Tabular Model Definition Language (TMDL) file with full table schemas and relationships",
    "size": "417 B",
    "mimeType": "text/plain"
  },
  {
    "id": "art-dax",
    "fileName": "Tableau_Insurance_DAX_Measures.dax",
    "type": "dax",
    "description": "Ready-to-deploy DAX measure expressions with proper lineageTags and formatStrings",
    "size": "12 KB",
    "mimeType": "text/plain"
  },
  {
    "id": "art-data",
    "fileName": "Insurance_Data_Dictionary.xlsx",
    "type": "excel",
    "description": "Schema definitions and column statistics across Brokage, Fees, Budget, Invoice, Meeting, Oppty",
    "size": "114 KB",
    "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  {
    "id": "art-cert",
    "fileName": "Migration_Verification_Certificate.json",
    "type": "certificate",
    "description": "Semantic parity verification audit with 100% column binding and AST validation sign-off",
    "size": "28 KB",
    "mimeType": "application/json"
  }
];

export const tbPbiTmdlModel: string = "model Model\n\tculture: en-US\n\tdefaultPowerBIDataSourceVersion: powerBI_V3\n\tsourceQueryCulture: en-US\n\tdataAccessOptions\n\t\tlegacyRedirects\n\t\treturnErrorValuesAsNull\n\nannotation __PBI_TimeIntelligenceEnabled = 1\n\nannotation PBI_ProTooling = [\"DevMode\"]\n\n\nref table Meeting\n\nref table Fees\n\nref table 'Individual Budget'\n\nref table Invoice\n\nref table opportunity\n\nref table Brokage\n\nref table MeasuresTable\n";
