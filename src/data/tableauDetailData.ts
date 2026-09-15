/* ─────────────────────────────────────────────────────────
 * Tableau Detail Data — per-asset extracted workbook metadata
 * ───────────────────────────────────────────────────────── */

import {
  tbPbiSummary,
  tbPbiWorksheets,
  tbPbiCalculatedFields,
  tbPbiDataTables,
} from './tableauPowerBIData';

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
  datatype: 'real' | 'integer' | 'string' | 'boolean';
  usedInSheets: string[];
}

export interface TableDetail {
  tableName: string;
  displayName: string;
  rowCount: number;
  dataSource: string;
  columns: { name: string; type: string }[];
  sampleRows: Record<string, string | number>[];
}

export interface TableauDetailData {
  summary: {
    totalDashboards: number;
    totalWorksheets: number;
    totalTables: number;
    totalCalculatedFields: number;
  };
  worksheets: WorksheetDetail[];
  calculatedFields: CalculatedFieldDetail[];
  tables: TableDetail[];
}

/* ── Sales Insurance.twbx — detail derived from the real Tableau → Power BI
 * migration dataset (tableauPowerBIData.ts) so the workbook's worksheets,
 * calculated fields, and data tables drive the detail page. ── */
const SALES_INSURANCE_DETAIL: TableauDetailData = {
  summary: {
    totalDashboards: tbPbiSummary.totalDashboards,
    totalWorksheets: tbPbiSummary.totalWorksheets,
    totalTables: tbPbiSummary.totalTables,
    totalCalculatedFields: tbPbiSummary.totalCalculatedFields,
  },
  worksheets: tbPbiWorksheets.map((w) => ({
    id: w.name,
    name: w.title || w.name,
    chartType: w.chartType,
    dimensions: w.dimensions,
    measures: w.measures.map((m) => ({
      name: m,
      type: (tbPbiCalculatedFields.some((cf) => cf.caption === m || cf.name === m)
        ? 'calculated'
        : 'base_measure') as 'base_measure' | 'calculated',
    })),
    axes: {
      rows: w.rows.join(', ') || '—',
      columns: w.cols.join(', ') || '—',
    },
  })),
  calculatedFields: tbPbiCalculatedFields.map((cf) => ({
    id: cf.name,
    name: cf.caption,
    formula: cf.formula,
    role: cf.role,
    datatype: cf.datatype as CalculatedFieldDetail['datatype'],
    usedInSheets: tbPbiWorksheets
      .filter((w) => w.measures.includes(cf.caption) || w.dimensions.includes(cf.caption))
      .map((w) => w.title || w.name),
  })),
  tables: tbPbiDataTables.map((t) => ({
    tableName: t.rawName,
    displayName: t.displayName,
    rowCount: t.rowCount,
    dataSource: 'Insurance_Model',
    columns: t.columnDetails.map((c) => ({ name: c.name, type: c.dataType })),
    sampleRows: t.sampleRows,
  })),
};

export const TABLEAU_DETAIL_DATA: Record<string, TableauDetailData> = {
  "c1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 75,
      "totalTables": 2,
      "totalCalculatedFields": 163
    },
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
        "name": "Retention Rate Target",
        "formula": "90",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Retention Rate | Selector",
          "Retention Rate_Aggregate",
          "Retention Rate_Detail"
        ]
      },
      {
        "id": "cf_2",
        "name": "Region Parameter",
        "formula": "\"Central\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)",
          "Days to Settle_Aggregate",
          "Days to Settle_Detail",
          "Loss Ratio vs PY"
        ]
      },
      {
        "id": "cf_3",
        "name": "Days to Settle Target",
        "formula": "20",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_4",
        "name": "Show Region Legend",
        "formula": "\"All\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_5",
        "name": "Show Detail",
        "formula": "\"Show Detail\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Show Detal Button"
        ]
      },
      {
        "id": "cf_6",
        "name": "Region or State Parameter",
        "formula": "\"National\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "State | Avg Claim Cost",
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_7",
        "name": "Top State",
        "formula": "1.",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_8",
        "name": "State Parameter",
        "formula": "\"California\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_9",
        "name": "Bin Size",
        "formula": "10000",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_10",
        "name": "Rank Number",
        "formula": "1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_11",
        "name": "Satisfaction Score Target",
        "formula": "7.0",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail",
          "Satisfaction Score | Selector",
          "Satisfaction Score_Aggregate"
        ]
      },
      {
        "id": "cf_12",
        "name": "Hit Target %  | Days to Settle",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Calculation_820218118232264734])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_13",
        "name": "% Total | Total Claim Cost | Region",
        "formula": "[Total Claim Amount]/[Total Claim Amount | Fixed | National (copy)_1734448843758759964]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_14",
        "name": "Avg Claim Cost (copy)",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_15",
        "name": "Avg Claim Cost | Region",
        "formula": "IF [Parameters].[Parameter 1] = 'All' then NULL\r ELSEIF [Parameters].[Parameter 1] != 'All' THEN\r [Calculation_600667632497045504]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)",
          "Rank | Avg Claim Cost | Region",
          "Rank | Avg Claim Cost | Tooltip",
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_16",
        "name": "Loss Ratio | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_17",
        "name": "Loss Ratio | Fixed | National or Region ",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Avg Claim Cost | Fixed (copy)_1018376503262674951]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503259725826]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_18",
        "name": "Loss Ratio | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_19",
        "name": "Days to Settle | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Days to Settle"
        ]
      },
      {
        "id": "cf_20",
        "name": "Retention Rate | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_21",
        "name": "Satisfaction Score | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_22",
        "name": "Avg Claim Cost | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_23",
        "name": "Days to Settle | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_24",
        "name": "Rank | Avg Claim Cost | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: [Calculation_600667632497045504]}), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Avg Claim Cost | Region",
          "Rank | Avg Claim Cost | Tooltip"
        ]
      },
      {
        "id": "cf_25",
        "name": "View | Aggregate",
        "formula": "[Parameters].[Parameter 4] = 'Show Aggregated'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_26",
        "name": "Avg Claim Cost | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Calculation_600667632573243414]\r WHEN 'Region' THEN AVG([Avg Claim Cost | State (copy)_1734448843613888516])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_27",
        "name": "33rd Percentile ",
        "formula": "{FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_28",
        "name": "Region Filter | Rank",
        "formula": "IF [Parameters].[Parameter 7] = [Incident State] THEN [Region] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_29",
        "name": "Median Income",
        "formula": "{FIXED [Calculation_1734448843739189263], YEAR([Calculation_600667632589156385]) : MEDIAN([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_30",
        "name": "Bin Size | Income",
        "formula": "INT([Income]/[Parameters].[Parameter 8])*[Parameters].[Parameter 8]-IIF([Income]<0,[Parameters].[Parameter 8],0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_31",
        "name": "Policy LOD",
        "formula": "{FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_32",
        "name": "Histogram Color",
        "formula": "IF [Calculation_1018376503335067685]=[Calculation_1018376503334752292] THEN\r \r     // This is the median bin.\r \r     \"Median\"\r \r ELSEIF [Calculation_1018376503335067685]<[Calculation_1018376503334752292] THEN\r \r     \"Lower\"\r \r ELSE\r \r     \"Higher\"\r \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_33",
        "name": "Bin Max",
        "formula": "[Calculation_1018376503335067685] + [Parameters].[Parameter 8] -1",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_34",
        "name": "Bin Description",
        "formula": "REGEXP_REPLACE(STR([Calculation_1018376503335067685]), \"\\d{1,3}(?=(\\d{3})+(?!\\d))\", \"$0,\") +\r \r \" - \" +\r \r REGEXP_REPLACE(STR([Calculation_1018376503335067685] + [Parameters].[Parameter 8]-1), \"\\d{1,3}(?=(\\d{3})+(?!\\d))\", \"$0,\")",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_35",
        "name": "Income | LOD",
        "formula": "{ FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_36",
        "name": "Region |  Tooltip Filter",
        "formula": "IF [Parameters].[Parameter 7] = [Incident State] THEN [Region] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Rank | Avg Claim Cost | Region",
          "Rank | Loss Ratio | Region"
        ]
      },
      {
        "id": "cf_37",
        "name": "State Highlight",
        "formula": "if [Incident State] = [Parameters].[Parameter 7] THEN TRUE End",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_38",
        "name": "Calculation6",
        "formula": "IF [Calculation_1734448843739189263] = TRUE then {FIXED [Year Filter (copy)_820218118186672137]: AVG(if [Parameters].[Parameter 7] = [Incident State]THEN [Calculation_600667632497045504]) END} END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_39",
        "name": "Disable Highlighting",
        "formula": "TRUE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)",
          "Car Use",
          "Coverage Area",
          "Days to Settle_Aggregate"
        ]
      },
      {
        "id": "cf_40",
        "name": "Gender | Text",
        "formula": "IF [Gender] = 'Female' THEN 'women' ELSE 'men' END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Gender"
        ]
      },
      {
        "id": "cf_41",
        "name": "TRUE",
        "formula": "TRUE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_42",
        "name": "FALSE",
        "formula": "FALSE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_43",
        "name": "Performance Level | Avg Claim Cost",
        "formula": "IF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.33)} THEN \"Top Perfomer\" \r ELSEIF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)} THEN \"Average\"  \r ELSEIF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Calculation_1734448843613532163],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Avg Claim Cost | Color"
        ]
      },
      {
        "id": "cf_44",
        "name": "Avg Claim Cost | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost | Color"
        ]
      },
      {
        "id": "cf_45",
        "name": "State Filter",
        "formula": "[Incident State] = [Parameters].[Parameter 7]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_46",
        "name": "Index",
        "formula": "INDEX()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_47",
        "name": "Total Claim Amount | Fixed | National",
        "formula": "{FIXED DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_48",
        "name": "% Total | Total Claim Cost",
        "formula": "[Total Claim Amount]/[Calculation_1734448843748536341]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_49",
        "name": "Lookup | State",
        "formula": "LOOKUP(MIN([Incident State]),0)",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_50",
        "name": "Calculation3",
        "formula": "[Calculation_1734448843753472025] = [Parameters].[Parameter 7]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_51",
        "name": "Distance from Target | Days to Settle",
        "formula": "[Retention Rate (copy)_820218118214512663] - [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_52",
        "name": "Days to Settle | Color",
        "formula": "AVG([Retention Rate (copy)_820218118214512663]) > [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_53",
        "name": "Last 10 Years ",
        "formula": "[Incident Date]>\r \r DATE(DATEADD('year', -10, [Calculation_600667632589156385]))",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_54",
        "name": "Loss Ratio - Revised",
        "formula": "[Loss Ratio]/1.5",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio",
          "KPI_% Change - Loss Ratio | State2",
          "KPI_Loss Rate_PY | State",
          "KPI_Loss Ratio_CY"
        ]
      },
      {
        "id": "cf_55",
        "name": "View | Detail",
        "formula": "[Parameters].[Parameter 4] = 'Show Detail'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_56",
        "name": "Calculation1",
        "formula": "{ FIXED [Incident Type]: [Calculation_1616792269630291972]}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_57",
        "name": "Calculation2",
        "formula": "{ FIXED : MAX(\r \r     { FIXED [Incident Type]: COUNTD([Policy Number])} )}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_58",
        "name": "Avg Claim Cost | CY",
        "formula": "IF ATTR(YEAR([Incident Date])) = ATTR(YEAR([Calculation_600667632589156385])) THEN ([Calculation_600667632497045504]) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_59",
        "name": "States Per Region",
        "formula": "({FIXED YEAR([Calculation_600667632589156385]), [Region]: COUNTD([Incident State])})",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Retention Rate_Detail",
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_60",
        "name": "Avg Claim Cost",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost | Color",
          "Avg Claim Cost_Region vs National (5)",
          "KPI_% Change - Avg Claim Cost",
          "KPI_% Change - Avg Claim Cost | State"
        ]
      },
      {
        "id": "cf_61",
        "name": "Last",
        "formula": "LAST()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)",
          "KPI_% Change - Avg Claim Cost",
          "KPI_% Change - Avg Claim Cost | State",
          "KPI_% Change - Days to Settle"
        ]
      },
      {
        "id": "cf_62",
        "name": "Year Filter",
        "formula": "DAY([Incident Date])<= DAY({MAX([Incident Date])})",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "KPI_% Change - Avg Claim Cost",
          "KPI_% Change - Avg Claim Cost | State",
          "KPI_% Change - Days to Settle"
        ]
      },
      {
        "id": "cf_63",
        "name": "Avg Claim Cost | Fixed",
        "formula": "IF [Parameters].[Parameter 1] != 'All' then AVG({FIXED YEAR([Incident Date]) : [Avg Claim Cost (copy)_600667632575893528]})\r ELSEIF [Parameters].[Parameter 1] = 'All' THEN\r [Calculation_600667632497045504]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_64",
        "name": "Region Filter",
        "formula": "[Region] = [Parameters].[Parameter 1] or [Parameters].[Parameter 1] = 'All'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)"
        ]
      },
      {
        "id": "cf_65",
        "name": "Max Date",
        "formula": "{MAX([Incident Date])}",
        "role": "dimension",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Avg Claim Cost_Region vs National (5)",
          "Car Use"
        ]
      },
      {
        "id": "cf_66",
        "name": "Loss Ratio | 2019",
        "formula": "{ FIXED YEAR([Incident Date]) = 2019, [Region]: AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Loss Ratio vs PY"
        ]
      },
      {
        "id": "cf_67",
        "name": "Color | Loss Ratio",
        "formula": "IF AVG([Calculation_1789899409903030281])< AVG([Calculation_600667632592433186]) THEN 'Under' ELSE 'Over' END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Loss Ratio vs PY"
        ]
      },
      {
        "id": "cf_68",
        "name": "PP | Loss Ratio",
        "formula": "AVG([Loss Ratio]) - AVG([Calculation_600667632592433186])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_69",
        "name": "Region Parameter | Selected",
        "formula": "Region = [Parameters].[Parameter 1]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Days to Settle_Detail",
          "Loss Ratio vs PY",
          "Retention Rate_Aggregate"
        ]
      },
      {
        "id": "cf_70",
        "name": "Region | First Letter",
        "formula": "LEFT([Region],1)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Region Circle"
        ]
      },
      {
        "id": "cf_71",
        "name": "Info Button",
        "formula": "'i'",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_72",
        "name": "% Change from National | Fixed",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Variance from National (copy)_680043587645292544]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)"
        ]
      },
      {
        "id": "cf_73",
        "name": "Max | % Change from National",
        "formula": "{FIXED : MAX([Calculation_680043587648282625])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)"
        ]
      },
      {
        "id": "cf_74",
        "name": "Distance From Target | Days to Settle | Text",
        "formula": "IF [Calculation_1789899409816530944] > [Parameters].[Parameter 2] THEN 'Over'\r ELSEIF [Calculation_1789899409816530944] <= [Parameters].[Parameter 2] THEN 'Under'\r ELSE 'At Target'\r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_75",
        "name": "Hit Target | Days to Settle Claim",
        "formula": "{INCLUDE [Incident State] : if [Calculation_1789899409828986882] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_76",
        "name": "Total States Per Region",
        "formula": "(COUNTD([Incident State]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Retention Rate_Detail",
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_77",
        "name": "Text",
        "formula": "STR(SUM([Calculation_820218118232264734])) + '/' + STR([Calculation_820218118236938272])",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Gender",
          "Retention Rate | Selector",
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_78",
        "name": "Zero",
        "formula": "0",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color",
          "KPI_Loss Ratio_CY",
          "KPI_Loss Ratio_PY",
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_79",
        "name": "Region or State",
        "formula": "[Parameters].[Parameter 5]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "State | Avg Claim Cost",
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_80",
        "name": "Region Selected",
        "formula": "if [Region] = [Parameters].[Parameter 1] then [Parameters].[Parameter 1] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_81",
        "name": "Title",
        "formula": "[Parameters].[Parameter 1]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_82",
        "name": "Show Selected",
        "formula": "[Parameters].[Parameter 1] != 'All'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_83",
        "name": "Region Year Sales",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_84",
        "name": "Max Sales",
        "formula": "{FIXED : MAX([Calculation_94857103933902848])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_85",
        "name": "Avg Claim Cost | National",
        "formula": "{FIXED YEAR([Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)"
        ]
      },
      {
        "id": "cf_86",
        "name": "Variance from National",
        "formula": "[Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_87",
        "name": "Retention Rate | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118205710352]) < [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          "Retention Rate_Aggregate",
          "Retention Rate_Detail"
        ]
      },
      {
        "id": "cf_88",
        "name": "Avg Cliam Cost  | Color",
        "formula": "[Calculation_600667632497045504] > SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_89",
        "name": "Loss Ratio | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_90",
        "name": "Satisfaction Score | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Score | Color"
        ]
      },
      {
        "id": "cf_91",
        "name": "Retention Rate Target | Count",
        "formula": "{FIXED [Incident State]: IF AVG([Retention Rate]) > [Parameters].[Days to Settle Target (copy)_1789899409836019715] THEN COUNTD([Incident State]) END}",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_92",
        "name": "Distance from Target | Retention Rate",
        "formula": "[Satisfaction Score (copy)_820218118205710352] - [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate_Aggregate",
          "Retention Rate_Detail"
        ]
      },
      {
        "id": "cf_93",
        "name": "Distance from Target | Satisfaction Score",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) - [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail",
          "Satisfaction Score_Aggregate"
        ]
      },
      {
        "id": "cf_94",
        "name": "% Hit Target",
        "formula": "IFNULL([% Target | Days to Settle Claim (copy 2)_820218118251860007], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_95",
        "name": "Hit Target % | Retention Rate",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Days to Settle Claim (copy)_820218118267039789])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate_Detail"
        ]
      },
      {
        "id": "cf_96",
        "name": "% Hit Target ",
        "formula": "IFNULL([Hit Target % | Days to Settle (copy)_820218118267330607], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_97",
        "name": "% Hit Target  ",
        "formula": "IFNULL([Hit Target % | Retention Rate (copy)_820218118267465776], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_98",
        "name": "Hit Target % | Satsifaction Score",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Retention Rate (copy)_820218118267174958])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Rate_Detail"
        ]
      },
      {
        "id": "cf_99",
        "name": "Hit Target | Retention Rate",
        "formula": "{INCLUDE [Incident State] : if [Days to Settle | Color (copy)_1789899409842442245] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_100",
        "name": "Hit Target | Satisfaction Score",
        "formula": "{INCLUDE [Incident State] : if [Retention Rate | Color (copy)_1789899409844973575] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_101",
        "name": "Last  5 Years",
        "formula": "[Incident Date]>\r \r DATE(DATEADD('year', -5, [Calculation_600667632589156385]))",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)",
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_102",
        "name": "Retention Rate | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_103",
        "name": "Satisfaction Score | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_104",
        "name": "Retention Rate | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264075784]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260164100]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_105",
        "name": "Retention Rate | State | Fixed ",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_106",
        "name": "Performance Level | Days to Settle",
        "formula": "IF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],.33)} THEN \"Top Performer\" \r ELSEIF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],.66)} THEN \"Average\" \r ELSEIF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_107",
        "name": "Performance Level | Loss Ratio",
        "formula": "IF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],.33)} THEN \"Top Performer\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],.66)} THEN \"Average\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_108",
        "name": "Performance Level | Satisfaction Score",
        "formula": "IF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],.33)} THEN \"Needs Attention\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],.66)} THEN \"Average\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],1)} THEN \"Top Performer\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Satisfaction Score | Color"
        ]
      },
      {
        "id": "cf_109",
        "name": "Performance Level | Retention Rate",
        "formula": "IF [Loss Ratio | State | Fixed (copy)_1734448843700830218] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],.33)} THEN \"Needs Attention\" \r ELSEIF [Loss Ratio | State | Fixed (copy)_1734448843700830218]<={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],.66)} THEN \"Average\" \r ELSEIF [Loss Ratio | State | Fixed (copy)_1734448843700830218] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],1)} THEN \"Top Performaer\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_110",
        "name": "Rank | Claim Filed",
        "formula": "RANK(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_111",
        "name": "Rank | Loss Ratio",
        "formula": "RANK(AVG([Calculation_1789899409903030281]),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Loss Ratio",
          "Rank | Loss Ratio | Region",
          "Rank | Loss Ratio | Tooltip",
          "Rank | Retention Rate | Tooltip"
        ]
      },
      {
        "id": "cf_112",
        "name": "Rank | Retention Rate",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118205710352]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Retention Rate",
          "Rank | Retention Rate | Region",
          "Rank | Retention Rate | Tooltip",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_113",
        "name": "Rank | Days to Settle Claim",
        "formula": "RANK(AVG([Retention Rate (copy)_820218118214512663]), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Days to Settle"
        ]
      },
      {
        "id": "cf_114",
        "name": "Rank | Avg Claim  Cost",
        "formula": "RANK([Calculation_600667632497045504], 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_115",
        "name": "Rank | Loss Ratio | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Calculation_1789899409903030281])}),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Loss Ratio | Region",
          "Rank | Loss Ratio | Tooltip"
        ]
      },
      {
        "id": "cf_116",
        "name": "Rank | Retention Rate | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118205710352])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Retention Rate | Region",
          "Rank | Retention Rate | Tooltip"
        ]
      },
      {
        "id": "cf_117",
        "name": "Rank | Satisfaction Score",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118194343946]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Satisfaction Score",
          "Rank | Satisfaction Score | Region",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_118",
        "name": "Rank | Satisfaction Score | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118194343946])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Satisfaction Score | Region",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_119",
        "name": "Rank | Days to Settle | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Retention Rate (copy)_820218118214512663])}), 'desc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Days to Settle | Tooltip"
        ]
      },
      {
        "id": "cf_120",
        "name": "Region Parameter | Selected (copy)",
        "formula": "IF [Calculation_678917684168884227] = [Calculation_1317302893320302615] THEN '\u25cf' ELSE '\u200e\u200e' END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_121",
        "name": "Days to Settle Claim",
        "formula": "IF [Days to Settle Claim] > 50  THEN [Days to Settle Claim]\r elseif [Region] = \"Central\" THEN [Days to Settle Claim] * .70\r elseif [Region] = \"East\" THEN [Days to Settle Claim] * .15\r \r elseif  [Region] = \"South\" THEN [Days to Settle Claim] * 1.05\r elseif [Region] = \"West\" THEN [Days to Settle Claim] * .475\r \r ELSE [Days to Settle Claim]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Days to Settle_Aggregate",
          "Days to Settle_Detail",
          "KPI_% Change - Days to Settle"
        ]
      },
      {
        "id": "cf_122",
        "name": "Satisfaction Score | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) <= [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          "Satisfaction Score_Aggregate"
        ]
      },
      {
        "id": "cf_123",
        "name": "Satisfaction Score | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264206857]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260344325]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_124",
        "name": "Satisfaction Score",
        "formula": "IF [Satisfaction Score] >10 THEN 10\r elseif [Satisfaction Score] IN (9, 8) AND [Region] = \"South\" THEN [Satisfaction Score] * .95\r elseif [Satisfaction Score] IN (9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r elseif [Satisfaction Score] IN (8,9) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.1\r elseif [Satisfaction Score] IN (9, 8) AND [Region] = \"West\" THEN [Satisfaction Score] * .73\r \r elseif [Satisfaction Score] IN (7, 6) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.3\r elseif [Satisfaction Score] IN (6, 7, 8, 9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r elseif [Satisfaction Score] IN (6, 5) AND [Region] = \"South\" THEN [Satisfaction Score] * 1.1\r elseif [Satisfaction Score] IN (7,6) AND [Region] = \"West\" THEN [Satisfaction Score] * .67\r \r elseif [Satisfaction Score] IN (0, 1, 2, 3, 4) AND [Region] = \"South\" THEN [Satisfaction Score] * 2.2\r elseif [Satisfaction Score] IN (5, 4, 3) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.75\r elseif [Satisfaction Score] IN (1, 2, 4) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.64\r elseif [Satisfaction Score] IN (3, 2, 1) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.18\r elseif [Satisfaction Score] IN (5, 4, 2) AND [Region] = \"West\" THEN [Satisfaction Score] * 1.1\r \r \r ELSE [Satisfaction Score]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score",
          "KPI_% Change - Satisfaction Score | State",
          "KPI_Retention Rate_CY",
          "KPI_Retention Rate_CY | State"
        ]
      },
      {
        "id": "cf_125",
        "name": "Retention Rate",
        "formula": "IF [Retention Rate] > 85  THEN [Retention Rate]\r elseif [Region] = \"Central\" THEN [Retention Rate] * 1.2\r elseif [Region] = \"East\" THEN [Retention Rate] * 1.02\r elseif  [Region] = \"South\" THEN [Retention Rate] * 1.1\r elseif [Region] = \"West\" THEN [Retention Rate] * .88\r \r ELSE [Retention Rate]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Days to Settle_Detail",
          "KPI_% Change - Retention Rate",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_126",
        "name": "Days to Settle | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Days to Settle"
        ]
      },
      {
        "id": "cf_127",
        "name": "Days to Settle | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Satisfaction Score | Fixed (copy)_226587396010934301]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260000259]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_128",
        "name": "Total Claim Amount (copy)",
        "formula": "[Total Claim Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Total Claims Amount"
        ]
      },
      {
        "id": "cf_129",
        "name": "Total Claim Amount | Fixed | Region",
        "formula": "{FIXED [Region],DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_130",
        "name": "% Change from National",
        "formula": "([Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906]))/SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost_Region vs National (5)"
        ]
      },
      {
        "id": "cf_131",
        "name": "Year Filter Max",
        "formula": "YEAR([Incident Date]) = YEAR([Calculation_600667632589156385])",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Days to Settle_Aggregate",
          "Loss Ratio vs PY",
          "Rank | Avg Claim Cost",
          "Rank | Day to Settle | Region"
        ]
      },
      {
        "id": "cf_132",
        "name": "One",
        "formula": "1",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Car Use",
          "Coverage Area",
          "Days to Settle_Aggregate",
          "Days to Settle_Detail"
        ]
      },
      {
        "id": "cf_133",
        "name": "Selected | Days to Settle",
        "formula": "[Parameters].[Parameter 4] = [Display As]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_134",
        "name": "Selected | Days to Settle (copy)",
        "formula": "[Parameters].[Parameter 4] = 'Detail'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_135",
        "name": "Selected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = TRUE then \"\u25b6 \" + STR([Display As]) END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Retention Rate | Selector"
        ]
      },
      {
        "id": "cf_136",
        "name": "Unselected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate | Selector"
        ]
      },
      {
        "id": "cf_137",
        "name": "Selected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = TRUE then \"\u25b6 \" + STR([Display As]) + \"%\" END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Retention Rate | Selector",
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_138",
        "name": "Selected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = TRUE then \"\u25b6 \" + STR([Display As]) END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_139",
        "name": "Selected | Retention Rate",
        "formula": "[Display As] = [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Retention Rate | Selector"
        ]
      },
      {
        "id": "cf_140",
        "name": "Selected | Satisfaction Score",
        "formula": "[Display As] = [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_141",
        "name": "Unselected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate | Selector",
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_142",
        "name": "Unselected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Score | Selector"
        ]
      },
      {
        "id": "cf_143",
        "name": "MIN(0.0)",
        "formula": "MIN(0.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Loss Ratio | Color",
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_144",
        "name": "AVG(1)",
        "formula": "AVG(1)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_145",
        "name": "0+(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
        "formula": "0+(ZN([Calculation_600667632497045504]) - LOOKUP(ZN([Calculation_600667632497045504]), -1)) / ABS(LOOKUP(ZN([Calculation_600667632497045504]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost",
          "KPI_% Change - Avg Claim Cost | State"
        ]
      },
      {
        "id": "cf_146",
        "name": "0-(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
        "formula": "0-(ZN([Calculation_600667632497045504]) - LOOKUP(ZN([Calculation_600667632497045504]), -1)) / ABS(LOOKUP(ZN([Calculation_600667632497045504]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost",
          "KPI_% Change - Avg Claim Cost | State"
        ]
      },
      {
        "id": "cf_147",
        "name": "(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to Set...",
        "formula": "(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle",
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_148",
        "name": "0+(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
        "formula": "0+(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle",
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_149",
        "name": "0-(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
        "formula": "0-(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle",
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_150",
        "name": "0+(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
        "formula": "0+(ZN(AVG([Calculation_1789899409903030281])) - LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1)) / ABS(LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio",
          "KPI_% Change - Loss Ratio | State2"
        ]
      },
      {
        "id": "cf_151",
        "name": "0-(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
        "formula": "0-(ZN(AVG([Calculation_1789899409903030281])) - LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1)) / ABS(LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio",
          "KPI_% Change - Loss Ratio | State2"
        ]
      },
      {
        "id": "cf_152",
        "name": "(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]))...",
        "formula": "(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_153",
        "name": "0-(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
        "formula": "0-(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_154",
        "name": "0+(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
        "formula": "0+(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_155",
        "name": "0+(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
        "formula": "0+(ZN(AVG([Satisfaction Score (copy)_820218118194343946])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score",
          "KPI_% Change - Satisfaction Score | State"
        ]
      },
      {
        "id": "cf_156",
        "name": "0-(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
        "formula": "0-(ZN(AVG([Satisfaction Score (copy)_820218118194343946])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score",
          "KPI_% Change - Satisfaction Score | State"
        ]
      },
      {
        "id": "cf_157",
        "name": "Central",
        "formula": "//Central \r MIN(1.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Region Selector"
        ]
      },
      {
        "id": "cf_158",
        "name": "East",
        "formula": "//East \r MIN(1.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Region Selector"
        ]
      },
      {
        "id": "cf_159",
        "name": "South",
        "formula": "//South \r MIN(1.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Region Selector"
        ]
      },
      {
        "id": "cf_160",
        "name": "West",
        "formula": "//West \r MIN(1.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Region Selector"
        ]
      },
      {
        "id": "cf_161",
        "name": "Show Aggregated",
        "formula": "//Show Aggregated\r  MIN(1.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Show Detal Button"
        ]
      },
      {
        "id": "cf_162",
        "name": "ZN(COUNT([Claim Filed]))",
        "formula": "ZN(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Total Claims"
        ]
      },
      {
        "id": "cf_163",
        "name": "ZN(SUM([Total Claim Amount]))",
        "formula": "ZN(SUM([Total Claim Amount]))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Total Claims Amount"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "bar",
        "displayName": "Bar$ (Sheet1 (Car Insurance Parameter Control))",
        "rowCount": 12000,
        "dataSource": "Sheet1 (Car Insurance Parameter Control)",
        "columns": [
          {
            "name": "Parameter Value",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Display As",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Display As1",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Zero",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Parameter Value1",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Days to Settle (copy)",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type1",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "Parameter Value": 1,
            "Display As": 1,
            "Type": "Days to Settle",
            "Display As1": 1,
            "Zero": 0,
            "Parameter Value1": 1,
            "Selected | Days to Settle (copy)": 1,
            "Type1": "Days to Settle"
          },
          {
            "Parameter Value": 2,
            "Display As": 2,
            "Type": "Loss Ratio",
            "Display As1": 2,
            "Zero": 0,
            "Parameter Value1": 2,
            "Selected | Days to Settle (copy)": 2,
            "Type1": "Loss Ratio"
          },
          {
            "Parameter Value": 3,
            "Display As": 3,
            "Type": "Retention Rate",
            "Display As1": 3,
            "Zero": 0,
            "Parameter Value1": 3,
            "Selected | Days to Settle (copy)": 3,
            "Type1": "Retention Rate"
          }
        ]
      },
      {
        "tableName": "numbers",
        "displayName": "Numbers$ (Numbers (Car Insurance Parameter Control))",
        "rowCount": 19400,
        "dataSource": "Numbers (Car Insurance Parameter Control)",
        "columns": [
          {
            "name": "Parameter Value",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Display As",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Unselected Text | Days to Settle",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected Text | Retention Rate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected Text | Satisfaction Score",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Retention Rate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Satisfaction Score",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Parameter Value": 1,
            "Display As": 1,
            "Type": "Days to Settle",
            "Unselected Text | Days to Settle": 24.5,
            "Selected Text | Retention Rate": "88%",
            "Selected Text | Satisfaction Score": 8.4,
            "Selected | Retention Rate": 1,
            "Selected | Satisfaction Score": 0
          },
          {
            "Parameter Value": 2,
            "Display As": 2,
            "Type": "Loss Ratio",
            "Unselected Text | Days to Settle": 18.2,
            "Selected Text | Retention Rate": "91%",
            "Selected Text | Satisfaction Score": 8.8,
            "Selected | Retention Rate": 0,
            "Selected | Satisfaction Score": 1
          },
          {
            "Parameter Value": 3,
            "Display As": 3,
            "Type": "Retention Rate",
            "Unselected Text | Days to Settle": 31.0,
            "Selected Text | Retention Rate": "85%",
            "Selected Text | Satisfaction Score": 7.9,
            "Selected | Retention Rate": 1,
            "Selected | Satisfaction Score": 1
          }
        ]
      }
    ]
  },
  "c2": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 48,
      "totalTables": 2,
      "totalCalculatedFields": 158
    },
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
        "name": "Retention Rate Target",
        "formula": "90",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_2",
        "name": "Region Parameter",
        "formula": "\"Central\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_3",
        "name": "Days to Settle Target",
        "formula": "20",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_4",
        "name": "Show Region Legend",
        "formula": "\"All\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_5",
        "name": "Show Detail",
        "formula": "\"Show Detail\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_6",
        "name": "Region or State Parameter",
        "formula": "\"National\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "State | Avg Claim Cost",
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_7",
        "name": "Top State",
        "formula": "1.",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_8",
        "name": "State Parameter",
        "formula": "\"California\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_9",
        "name": "Bin Size",
        "formula": "10000",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_10",
        "name": "Rank Number",
        "formula": "1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_11",
        "name": "Satisfaction Score Target",
        "formula": "7.0",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_12",
        "name": "Hit Target %  | Days to Settle",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Calculation_820218118232264734])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_13",
        "name": "% Total | Total Claim Cost | Region",
        "formula": "[Total Claim Amount]/[Total Claim Amount | Fixed | National (copy)_1734448843758759964]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_14",
        "name": "Avg Claim Cost (copy)",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_15",
        "name": "Avg Claim Cost | Region",
        "formula": "IF [Parameters].[Parameter 1] = 'All' then NULL\r ELSEIF [Parameters].[Parameter 1] != 'All' THEN\r [Calculation_600667632497045504]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Rank | Avg Claim Cost | Region",
          "Rank | Avg Claim Cost | Tooltip",
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_16",
        "name": "Loss Ratio | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_17",
        "name": "Loss Ratio | Fixed | National or Region ",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Avg Claim Cost | Fixed (copy)_1018376503262674951]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503259725826]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_18",
        "name": "Loss Ratio | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Loss Ratio"
        ]
      },
      {
        "id": "cf_19",
        "name": "Days to Settle | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Days to Settle"
        ]
      },
      {
        "id": "cf_20",
        "name": "Retention Rate | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_21",
        "name": "Satisfaction Score | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_22",
        "name": "Avg Claim Cost | Region | Fixed",
        "formula": "{FIXED [Region], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_23",
        "name": "Days to Settle | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_24",
        "name": "Rank | Avg Claim Cost | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: [Calculation_600667632497045504]}), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Avg Claim Cost | Region",
          "Rank | Avg Claim Cost | Tooltip"
        ]
      },
      {
        "id": "cf_25",
        "name": "View | Aggregate",
        "formula": "[Parameters].[Parameter 4] = 'Show Aggregated'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_26",
        "name": "Avg Claim Cost | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Calculation_600667632573243414]\r WHEN 'Region' THEN AVG([Avg Claim Cost | State (copy)_1734448843613888516])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_27",
        "name": "33rd Percentile ",
        "formula": "{FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_28",
        "name": "Region Filter | Rank",
        "formula": "IF [Parameters].[Parameter 7] = [Incident State] THEN [Region] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_29",
        "name": "Median Income",
        "formula": "{FIXED [Calculation_1734448843739189263], YEAR([Calculation_600667632589156385]) : MEDIAN([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_30",
        "name": "Bin Size | Income",
        "formula": "INT([Income]/[Parameters].[Parameter 8])*[Parameters].[Parameter 8]-IIF([Income]<0,[Parameters].[Parameter 8],0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_31",
        "name": "Policy LOD",
        "formula": "{FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_32",
        "name": "Histogram Color",
        "formula": "IF [Calculation_1018376503335067685]=[Calculation_1018376503334752292] THEN\r \r     // This is the median bin.\r \r     \"Median\"\r \r ELSEIF [Calculation_1018376503335067685]<[Calculation_1018376503334752292] THEN\r \r     \"Lower\"\r \r ELSE\r \r     \"Higher\"\r \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_33",
        "name": "Bin Max",
        "formula": "[Calculation_1018376503335067685] + [Parameters].[Parameter 8] -1",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_34",
        "name": "Bin Description",
        "formula": "REGEXP_REPLACE(STR([Calculation_1018376503335067685]), \"\\d{1,3}(?=(\\d{3})+(?!\\d))\", \"$0,\") +\r \r \" - \" +\r \r REGEXP_REPLACE(STR([Calculation_1018376503335067685] + [Parameters].[Parameter 8]-1), \"\\d{1,3}(?=(\\d{3})+(?!\\d))\", \"$0,\")",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Income Histogram"
        ]
      },
      {
        "id": "cf_35",
        "name": "Income | LOD",
        "formula": "{ FIXED [Policy Number]: SUM([Income])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_36",
        "name": "Region |  Tooltip Filter",
        "formula": "IF [Parameters].[Parameter 7] = [Incident State] THEN [Region] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Rank | Avg Claim Cost | Region",
          "Rank | Loss Ratio | Region"
        ]
      },
      {
        "id": "cf_37",
        "name": "State Highlight",
        "formula": "if [Incident State] = [Parameters].[Parameter 7] THEN TRUE End",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_38",
        "name": "Calculation6",
        "formula": "IF [Calculation_1734448843739189263] = TRUE then {FIXED [Year Filter (copy)_820218118186672137]: AVG(if [Parameters].[Parameter 7] = [Incident State]THEN [Calculation_600667632497045504]) END} END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_39",
        "name": "Disable Highlighting",
        "formula": "TRUE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Car Use",
          "Coverage Area",
          "Gender",
          "State | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_40",
        "name": "Gender | Text",
        "formula": "IF [Gender] = 'Female' THEN 'women' ELSE 'men' END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Gender"
        ]
      },
      {
        "id": "cf_41",
        "name": "TRUE",
        "formula": "TRUE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_42",
        "name": "FALSE",
        "formula": "FALSE",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_43",
        "name": "Performance Level | Avg Claim Cost",
        "formula": "IF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.33)} THEN \"Top Perfomer\" \r ELSEIF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Calculation_1734448843613532163],.66)} THEN \"Average\"  \r ELSEIF [Calculation_1734448843613532163] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Calculation_1734448843613532163],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Avg Claim Cost | Color"
        ]
      },
      {
        "id": "cf_44",
        "name": "Avg Claim Cost | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost | Color"
        ]
      },
      {
        "id": "cf_45",
        "name": "State Filter",
        "formula": "[Incident State] = [Parameters].[Parameter 7]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_46",
        "name": "Index",
        "formula": "INDEX()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_47",
        "name": "Total Claim Amount | Fixed | National",
        "formula": "{FIXED DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_48",
        "name": "% Total | Total Claim Cost",
        "formula": "[Total Claim Amount]/[Calculation_1734448843748536341]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_49",
        "name": "Lookup | State",
        "formula": "LOOKUP(MIN([Incident State]),0)",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_50",
        "name": "Calculation3",
        "formula": "[Calculation_1734448843753472025] = [Parameters].[Parameter 7]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_51",
        "name": "Distance from Target | Days to Settle",
        "formula": "[Retention Rate (copy)_820218118214512663] - [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_52",
        "name": "Days to Settle | Color",
        "formula": "AVG([Retention Rate (copy)_820218118214512663]) > [Parameters].[Parameter 2]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_53",
        "name": "Last 10 Years ",
        "formula": "[Incident Date]>\r \r DATE(DATEADD('year', -10, [Calculation_600667632589156385]))",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_54",
        "name": "Loss Ratio - Revised",
        "formula": "[Loss Ratio]/1.5",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio | State2",
          "KPI_Loss Rate_PY | State",
          "KPI_Loss Ratio_CY | State",
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_55",
        "name": "View | Detail",
        "formula": "[Parameters].[Parameter 4] = 'Show Detail'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_56",
        "name": "Calculation1",
        "formula": "{ FIXED [Incident Type]: [Calculation_1616792269630291972]}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_57",
        "name": "Calculation2",
        "formula": "{ FIXED : MAX(\r \r     { FIXED [Incident Type]: COUNTD([Policy Number])} )}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_58",
        "name": "Avg Claim Cost | CY",
        "formula": "IF ATTR(YEAR([Incident Date])) = ATTR(YEAR([Calculation_600667632589156385])) THEN ([Calculation_600667632497045504]) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_59",
        "name": "States Per Region",
        "formula": "({FIXED YEAR([Calculation_600667632589156385]), [Region]: COUNTD([Incident State])})",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_60",
        "name": "Avg Claim Cost",
        "formula": "SUM([Total Claim Amount])/COUNT([Claim Filed])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Avg Claim Cost | Color",
          "KPI_% Change - Avg Claim Cost | State",
          "KPI_Avg Claim Cost_CY | State",
          "KPI_Avg Claim Cost_PY | State"
        ]
      },
      {
        "id": "cf_61",
        "name": "Last",
        "formula": "LAST()",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost | State",
          "KPI_% Change - Days to Settle | State",
          "KPI_% Change - Loss Ratio | State2",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_62",
        "name": "Year Filter",
        "formula": "DAY([Incident Date])<= DAY({MAX([Incident Date])})",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost | State",
          "KPI_% Change - Days to Settle | State",
          "KPI_% Change - Loss Ratio | State2",
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_63",
        "name": "Avg Claim Cost | Fixed",
        "formula": "IF [Parameters].[Parameter 1] != 'All' then AVG({FIXED YEAR([Incident Date]) : [Avg Claim Cost (copy)_600667632575893528]})\r ELSEIF [Parameters].[Parameter 1] = 'All' THEN\r [Calculation_600667632497045504]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_64",
        "name": "Region Filter",
        "formula": "[Region] = [Parameters].[Parameter 1] or [Parameters].[Parameter 1] = 'All'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_65",
        "name": "Max Date",
        "formula": "{MAX([Incident Date])}",
        "role": "dimension",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_66",
        "name": "Loss Ratio | 2019",
        "formula": "{ FIXED YEAR([Incident Date]) = 2019, [Region]: AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_67",
        "name": "Color | Loss Ratio",
        "formula": "IF AVG([Calculation_1789899409903030281])< AVG([Calculation_600667632592433186]) THEN 'Under' ELSE 'Over' END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_68",
        "name": "PP | Loss Ratio",
        "formula": "AVG([Loss Ratio]) - AVG([Calculation_600667632592433186])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_69",
        "name": "Region Parameter | Selected",
        "formula": "Region = [Parameters].[Parameter 1]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_70",
        "name": "Region | First Letter",
        "formula": "LEFT([Region],1)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Region Circle"
        ]
      },
      {
        "id": "cf_71",
        "name": "Info Button",
        "formula": "'i'",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_72",
        "name": "% Change from National | Fixed",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Variance from National (copy)_680043587645292544]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_73",
        "name": "Max | % Change from National",
        "formula": "{FIXED : MAX([Calculation_680043587648282625])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_74",
        "name": "Distance From Target | Days to Settle | Text",
        "formula": "IF [Calculation_1789899409816530944] > [Parameters].[Parameter 2] THEN 'Over'\r ELSEIF [Calculation_1789899409816530944] <= [Parameters].[Parameter 2] THEN 'Under'\r ELSE 'At Target'\r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_75",
        "name": "Hit Target | Days to Settle Claim",
        "formula": "{INCLUDE [Incident State] : if [Calculation_1789899409828986882] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_76",
        "name": "Total States Per Region",
        "formula": "(COUNTD([Incident State]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_77",
        "name": "Text",
        "formula": "STR(SUM([Calculation_820218118232264734])) + '/' + STR([Calculation_820218118236938272])",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Gender"
        ]
      },
      {
        "id": "cf_78",
        "name": "Zero",
        "formula": "0",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color",
          "Loss Ratio | Color",
          "Satisfaction Score | Color",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_79",
        "name": "Region or State",
        "formula": "[Parameters].[Parameter 5]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "State | Avg Claim Cost",
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_80",
        "name": "Region Selected",
        "formula": "if [Region] = [Parameters].[Parameter 1] then [Parameters].[Parameter 1] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_81",
        "name": "Title",
        "formula": "[Parameters].[Parameter 1]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_82",
        "name": "Show Selected",
        "formula": "[Parameters].[Parameter 1] != 'All'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_83",
        "name": "Region Year Sales",
        "formula": "{FIXED [Region], DATETRUNC('year', [Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_84",
        "name": "Max Sales",
        "formula": "{FIXED : MAX([Calculation_94857103933902848])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_85",
        "name": "Avg Claim Cost | National",
        "formula": "{FIXED YEAR([Incident Date]) : [Calculation_600667632497045504]}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_86",
        "name": "Variance from National",
        "formula": "[Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_87",
        "name": "Retention Rate | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118205710352]) < [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_88",
        "name": "Avg Cliam Cost  | Color",
        "formula": "[Calculation_600667632497045504] > SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_89",
        "name": "Loss Ratio | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Calculation_1789899409903030281])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_90",
        "name": "Satisfaction Score | State | Fixed",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Satisfaction Score | Color"
        ]
      },
      {
        "id": "cf_91",
        "name": "Retention Rate Target | Count",
        "formula": "{FIXED [Incident State]: IF AVG([Retention Rate]) > [Parameters].[Days to Settle Target (copy)_1789899409836019715] THEN COUNTD([Incident State]) END}",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_92",
        "name": "Distance from Target | Retention Rate",
        "formula": "[Satisfaction Score (copy)_820218118205710352] - [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_93",
        "name": "Distance from Target | Satisfaction Score",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) - [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_94",
        "name": "% Hit Target",
        "formula": "IFNULL([% Target | Days to Settle Claim (copy 2)_820218118251860007], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_95",
        "name": "Hit Target % | Retention Rate",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Days to Settle Claim (copy)_820218118267039789])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_96",
        "name": "% Hit Target ",
        "formula": "IFNULL([Hit Target % | Days to Settle (copy)_820218118267330607], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_97",
        "name": "% Hit Target  ",
        "formula": "IFNULL([Hit Target % | Retention Rate (copy)_820218118267465776], 0 )",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_98",
        "name": "Hit Target % | Satsifaction Score",
        "formula": "{ EXCLUDE [Incident State]:  SUM([Hit Target | Retention Rate (copy)_820218118267174958])/([Calculation_820218118236938272])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_99",
        "name": "Hit Target | Retention Rate",
        "formula": "{INCLUDE [Incident State] : if [Days to Settle | Color (copy)_1789899409842442245] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_100",
        "name": "Hit Target | Satisfaction Score",
        "formula": "{INCLUDE [Incident State] : if [Retention Rate | Color (copy)_1789899409844973575] = FALSE then COUNTD([Incident State]) END}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_101",
        "name": "Last  5 Years",
        "formula": "[Incident Date]>\r \r DATE(DATEADD('year', -5, [Calculation_600667632589156385]))",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "State | Days to Settle",
          "State | Loss Ratio",
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_102",
        "name": "Retention Rate | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_103",
        "name": "Satisfaction Score | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Satisfaction Score (copy)_820218118194343946])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_104",
        "name": "Retention Rate | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264075784]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260164100]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Retention Rate"
        ]
      },
      {
        "id": "cf_105",
        "name": "Retention Rate | State | Fixed ",
        "formula": "{FIXED [Incident State], DATEPART('year', [Incident Date]) : AVG([Satisfaction Score (copy)_820218118205710352])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_106",
        "name": "Performance Level | Days to Settle",
        "formula": "IF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],.33)} THEN \"Top Performer\" \r ELSEIF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],.66)} THEN \"Average\" \r ELSEIF [Avg Claim Cost | State | Fixed (copy)_1734448843688558598] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Avg Claim Cost | State | Fixed (copy)_1734448843688558598],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_107",
        "name": "Performance Level | Loss Ratio",
        "formula": "IF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],.33)} THEN \"Top Performer\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],.66)} THEN \"Average\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843695808521] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843695808521],1)} THEN \"Needs Attention\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Loss Ratio | Color"
        ]
      },
      {
        "id": "cf_108",
        "name": "Performance Level | Satisfaction Score",
        "formula": "IF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],.33)} THEN \"Needs Attention\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],.66)} THEN \"Average\" \r ELSEIF [Days to Settle | State | Fixed (copy)_1734448843722973197] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Days to Settle | State | Fixed (copy)_1734448843722973197],1)} THEN \"Top Performer\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Satisfaction Score | Color"
        ]
      },
      {
        "id": "cf_109",
        "name": "Performance Level | Retention Rate",
        "formula": "IF [Loss Ratio | State | Fixed (copy)_1734448843700830218] <={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],.33)} THEN \"Needs Attention\" \r ELSEIF [Loss Ratio | State | Fixed (copy)_1734448843700830218]<={FIXED DATEPART('year', [Incident Date]) :PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],.66)} THEN \"Average\" \r ELSEIF [Loss Ratio | State | Fixed (copy)_1734448843700830218] <={FIXED DATEPART('year', [Incident Date]):PERCENTILE([Loss Ratio | State | Fixed (copy)_1734448843700830218],1)} THEN \"Top Performaer\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_110",
        "name": "Rank | Claim Filed",
        "formula": "RANK(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_111",
        "name": "Rank | Loss Ratio",
        "formula": "RANK(AVG([Calculation_1789899409903030281]),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Loss Ratio",
          "Rank | Loss Ratio | Region",
          "Rank | Loss Ratio | Tooltip",
          "Rank | Retention Rate | Tooltip"
        ]
      },
      {
        "id": "cf_112",
        "name": "Rank | Retention Rate",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118205710352]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Retention Rate",
          "Rank | Retention Rate | Region",
          "Rank | Retention Rate | Tooltip",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_113",
        "name": "Rank | Days to Settle Claim",
        "formula": "RANK(AVG([Retention Rate (copy)_820218118214512663]), 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Days to Settle"
        ]
      },
      {
        "id": "cf_114",
        "name": "Rank | Avg Claim  Cost",
        "formula": "RANK([Calculation_600667632497045504], 'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Avg Claim Cost"
        ]
      },
      {
        "id": "cf_115",
        "name": "Rank | Loss Ratio | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Calculation_1789899409903030281])}),'asc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Loss Ratio | Region",
          "Rank | Loss Ratio | Tooltip"
        ]
      },
      {
        "id": "cf_116",
        "name": "Rank | Retention Rate | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118205710352])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Retention Rate | Region",
          "Rank | Retention Rate | Tooltip"
        ]
      },
      {
        "id": "cf_117",
        "name": "Rank | Satisfaction Score",
        "formula": "RANK(AVG([Satisfaction Score (copy)_820218118194343946]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Satisfaction Score",
          "Rank | Satisfaction Score | Region",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_118",
        "name": "Rank | Satisfaction Score | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Satisfaction Score (copy)_820218118194343946])}))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Satisfaction Score | Region",
          "Rank | Satisifaction Score | Tooltip"
        ]
      },
      {
        "id": "cf_119",
        "name": "Rank | Days to Settle | Region",
        "formula": "RANK(AVG({ INCLUDE [Region]: AVG([Retention Rate (copy)_820218118214512663])}), 'desc')",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Rank | Day to Settle | Region",
          "Rank | Days to Settle | Tooltip"
        ]
      },
      {
        "id": "cf_120",
        "name": "Region Parameter | Selected (copy)",
        "formula": "IF [Calculation_678917684168884227] = [Calculation_1317302893320302615] THEN '\u25cf' ELSE '\u200e\u200e' END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_121",
        "name": "Days to Settle Claim",
        "formula": "IF [Days to Settle Claim] > 50  THEN [Days to Settle Claim]\r elseif [Region] = \"Central\" THEN [Days to Settle Claim] * .70\r elseif [Region] = \"East\" THEN [Days to Settle Claim] * .15\r \r elseif  [Region] = \"South\" THEN [Days to Settle Claim] * 1.05\r elseif [Region] = \"West\" THEN [Days to Settle Claim] * .475\r \r ELSE [Days to Settle Claim]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "KPI_% Change - Days to Settle | State",
          "KPI_Days to Settle_CY | State",
          "KPI_Days to Settle_PY | State"
        ]
      },
      {
        "id": "cf_122",
        "name": "Satisfaction Score | Color",
        "formula": "AVG([Satisfaction Score (copy)_820218118194343946]) <= [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "measure",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_123",
        "name": "Satisfaction Score | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Loss Ratio | Fixed (copy)_1018376503264206857]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260344325]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Satisfaction Score"
        ]
      },
      {
        "id": "cf_124",
        "name": "Satisfaction Score",
        "formula": "IF [Satisfaction Score] >10 THEN 10\r elseif [Satisfaction Score] IN (9, 8) AND [Region] = \"South\" THEN [Satisfaction Score] * .95\r elseif [Satisfaction Score] IN (9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r elseif [Satisfaction Score] IN (8,9) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.1\r elseif [Satisfaction Score] IN (9, 8) AND [Region] = \"West\" THEN [Satisfaction Score] * .73\r \r elseif [Satisfaction Score] IN (7, 6) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.3\r elseif [Satisfaction Score] IN (6, 7, 8, 9) AND [Region] = \"East\" THEN [Satisfaction Score] * .72\r elseif [Satisfaction Score] IN (6, 5) AND [Region] = \"South\" THEN [Satisfaction Score] * 1.1\r elseif [Satisfaction Score] IN (7,6) AND [Region] = \"West\" THEN [Satisfaction Score] * .67\r \r elseif [Satisfaction Score] IN (0, 1, 2, 3, 4) AND [Region] = \"South\" THEN [Satisfaction Score] * 2.2\r elseif [Satisfaction Score] IN (5, 4, 3) AND [Region] = \"Central\" THEN [Satisfaction Score] * 1.75\r elseif [Satisfaction Score] IN (1, 2, 4) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.64\r elseif [Satisfaction Score] IN (3, 2, 1) AND [Region] = \"East\" THEN [Satisfaction Score] * 1.18\r elseif [Satisfaction Score] IN (5, 4, 2) AND [Region] = \"West\" THEN [Satisfaction Score] * 1.1\r \r \r ELSE [Satisfaction Score]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score | State",
          "KPI_Retention Rate_CY | State",
          "KPI_Retention Rate_PY | State",
          "KPI_Satisfaction Score_CY | State (2)"
        ]
      },
      {
        "id": "cf_125",
        "name": "Retention Rate",
        "formula": "IF [Retention Rate] > 85  THEN [Retention Rate]\r elseif [Region] = \"Central\" THEN [Retention Rate] * 1.2\r elseif [Region] = \"East\" THEN [Retention Rate] * 1.02\r elseif  [Region] = \"South\" THEN [Retention Rate] * 1.1\r elseif [Region] = \"West\" THEN [Retention Rate] * .88\r \r ELSE [Retention Rate]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate | State",
          "KPI_Days to Settle_CY | State",
          "KPI_Days to Settle_PY | State",
          "KPI_Retention Rate_CY | State"
        ]
      },
      {
        "id": "cf_126",
        "name": "Days to Settle | Fixed",
        "formula": "{FIXED DATEPART('year', [Incident Date]): AVG([Retention Rate (copy)_820218118214512663])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "State | Days to Settle"
        ]
      },
      {
        "id": "cf_127",
        "name": "Days to Settle | Fixed | National or Region",
        "formula": "CASE [Parameters].[Parameter 5]\r WHEN 'National' THEN [Satisfaction Score | Fixed (copy)_226587396010934301]\r WHEN 'Region' THEN [Avg Claim Cost | Region | Fixed (copy)_1018376503260000259]\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_128",
        "name": "Total Claim Amount (copy)",
        "formula": "[Total Claim Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Total Claims Amount"
        ]
      },
      {
        "id": "cf_129",
        "name": "Total Claim Amount | Fixed | Region",
        "formula": "{FIXED [Region],DATEPART('year', [Incident Date]) : SUM([Total Claim Amount])}",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_130",
        "name": "% Change from National",
        "formula": "([Avg Claim Cost (copy)_600667632575893528] - SUM([Calculation_94857104032763906]))/SUM([Calculation_94857104032763906])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_131",
        "name": "Year Filter Max",
        "formula": "YEAR([Incident Date]) = YEAR([Calculation_600667632589156385])",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Rank | Avg Claim Cost",
          "Rank | Day to Settle | Region",
          "Rank | Days to Settle",
          "Rank | Loss Ratio"
        ]
      },
      {
        "id": "cf_132",
        "name": "One",
        "formula": "1",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Car Use",
          "Coverage Area",
          "Gender",
          "Income Histogram"
        ]
      },
      {
        "id": "cf_133",
        "name": "Selected | Days to Settle",
        "formula": "[Parameters].[Parameter 4] = [Display As]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_134",
        "name": "Selected | Days to Settle (copy)",
        "formula": "[Parameters].[Parameter 4] = 'Detail'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_135",
        "name": "Selected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = TRUE then \"\u25b6 \" + STR([Display As]) END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_136",
        "name": "Unselected Text | Days to Settle",
        "formula": "IF [Calculation_944067107659722753] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_137",
        "name": "Selected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = TRUE then \"\u25b6 \" + STR([Display As]) + \"%\" END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_138",
        "name": "Selected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = TRUE then \"\u25b6 \" + STR([Display As]) END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_139",
        "name": "Selected | Retention Rate",
        "formula": "[Display As] = [Parameters].[Days to Settle Target (copy)_1789899409836019715]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_140",
        "name": "Selected | Satisfaction Score",
        "formula": "[Display As] = [Parameters].[Retention Rate Target (copy)_1789899409843625990]",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_141",
        "name": "Unselected Text | Retention Rate",
        "formula": "IF [Selected | Days to Settle (copy)_944067107671080968] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_142",
        "name": "Unselected Text | Satisfaction Score",
        "formula": "IF [Selected | Retention Rate (copy)_944067107671183369] = FALSE then [Display As] END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color"
        ]
      },
      {
        "id": "cf_143",
        "name": "MIN(0.0)",
        "formula": "MIN(0.0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Loss Ratio | Color",
          "Retention Rate | Color"
        ]
      },
      {
        "id": "cf_144",
        "name": "AVG(1)",
        "formula": "AVG(1)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          " Days to Settle | Color",
          "Avg Claim Cost | Color",
          "Car Use",
          "Coverage Area"
        ]
      },
      {
        "id": "cf_145",
        "name": "0+(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
        "formula": "0+(ZN([Calculation_600667632497045504]) - LOOKUP(ZN([Calculation_600667632497045504]), -1)) / ABS(LOOKUP(ZN([Calculation_600667632497045504]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost | State"
        ]
      },
      {
        "id": "cf_146",
        "name": "0-(ZN([Avg Claim Cost]) - LOOKUP(ZN([Avg Claim Cost]), -1)) /...",
        "formula": "0-(ZN([Calculation_600667632497045504]) - LOOKUP(ZN([Calculation_600667632497045504]), -1)) / ABS(LOOKUP(ZN([Calculation_600667632497045504]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Avg Claim Cost | State"
        ]
      },
      {
        "id": "cf_147",
        "name": "(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to Set...",
        "formula": "(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_148",
        "name": "0+(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
        "formula": "0+(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_149",
        "name": "0-(ZN(AVG([Days to Settle Claim])) - LOOKUP(ZN(AVG([Days to S...",
        "formula": "0-(ZN(AVG([Retention Rate (copy)_820218118214512663])) - LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1)) / ABS(LOOKUP(ZN(AVG([Retention Rate (copy)_820218118214512663])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Days to Settle | State"
        ]
      },
      {
        "id": "cf_150",
        "name": "0+(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
        "formula": "0+(ZN(AVG([Calculation_1789899409903030281])) - LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1)) / ABS(LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio | State2"
        ]
      },
      {
        "id": "cf_151",
        "name": "0-(ZN(AVG([Loss Ratio - Revised])) - LOOKUP(ZN(AVG([Loss Rati...",
        "formula": "0-(ZN(AVG([Calculation_1789899409903030281])) - LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1)) / ABS(LOOKUP(ZN(AVG([Calculation_1789899409903030281])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Loss Ratio | State2"
        ]
      },
      {
        "id": "cf_152",
        "name": "(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]))...",
        "formula": "(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_153",
        "name": "0-(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
        "formula": "0-(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_154",
        "name": "0+(ZN(AVG([Retention Rate])) - LOOKUP(ZN(AVG([Retention Rate]...",
        "formula": "0+(ZN(AVG([Satisfaction Score (copy)_820218118205710352])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118205710352])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Retention Rate | State"
        ]
      },
      {
        "id": "cf_155",
        "name": "0+(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
        "formula": "0+(ZN(AVG([Satisfaction Score (copy)_820218118194343946])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score | State"
        ]
      },
      {
        "id": "cf_156",
        "name": "0-(ZN(AVG([Satisfaction Score])) - LOOKUP(ZN(AVG([Satisfactio...",
        "formula": "0-(ZN(AVG([Satisfaction Score (copy)_820218118194343946])) - LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1)) / ABS(LOOKUP(ZN(AVG([Satisfaction Score (copy)_820218118194343946])), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "KPI_% Change - Satisfaction Score | State"
        ]
      },
      {
        "id": "cf_157",
        "name": "ZN(COUNT([Claim Filed]))",
        "formula": "ZN(COUNT([Claim Filed]))",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Total Claims"
        ]
      },
      {
        "id": "cf_158",
        "name": "ZN(SUM([Total Claim Amount]))",
        "formula": "ZN(SUM([Total Claim Amount]))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Total Claims Amount"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "bar",
        "displayName": "Bar$ (Sheet1 (Car Insurance Parameter Control))",
        "rowCount": 12000,
        "dataSource": "Sheet1 (Car Insurance Parameter Control)",
        "columns": [
          {
            "name": "Parameter Value",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Display As",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Display As1",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Zero",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Parameter Value1",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Days to Settle (copy)",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type1",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "Parameter Value": 1,
            "Display As": 1,
            "Type": "Days to Settle",
            "Display As1": 1,
            "Zero": 0,
            "Parameter Value1": 1,
            "Selected | Days to Settle (copy)": 1,
            "Type1": "Days to Settle"
          },
          {
            "Parameter Value": 2,
            "Display As": 2,
            "Type": "Loss Ratio",
            "Display As1": 2,
            "Zero": 0,
            "Parameter Value1": 2,
            "Selected | Days to Settle (copy)": 2,
            "Type1": "Loss Ratio"
          },
          {
            "Parameter Value": 3,
            "Display As": 3,
            "Type": "Retention Rate",
            "Display As1": 3,
            "Zero": 0,
            "Parameter Value1": 3,
            "Selected | Days to Settle (copy)": 3,
            "Type1": "Retention Rate"
          }
        ]
      },
      {
        "tableName": "numbers",
        "displayName": "Numbers$ (Numbers (Car Insurance Parameter Control))",
        "rowCount": 19400,
        "dataSource": "Numbers (Car Insurance Parameter Control)",
        "columns": [
          {
            "name": "Parameter Value",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Display As",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Unselected Text | Days to Settle",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected Text | Retention Rate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected Text | Satisfaction Score",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Retention Rate",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Selected | Satisfaction Score",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Parameter Value": 1,
            "Display As": 1,
            "Type": "Days to Settle",
            "Unselected Text | Days to Settle": 24.5,
            "Selected Text | Retention Rate": "88%",
            "Selected Text | Satisfaction Score": 8.4,
            "Selected | Retention Rate": 1,
            "Selected | Satisfaction Score": 0
          },
          {
            "Parameter Value": 2,
            "Display As": 2,
            "Type": "Loss Ratio",
            "Unselected Text | Days to Settle": 18.2,
            "Selected Text | Retention Rate": "91%",
            "Selected Text | Satisfaction Score": 8.8,
            "Selected | Retention Rate": 0,
            "Selected | Satisfaction Score": 1
          },
          {
            "Parameter Value": 3,
            "Display As": 3,
            "Type": "Retention Rate",
            "Unselected Text | Days to Settle": 31.0,
            "Selected Text | Retention Rate": "85%",
            "Selected Text | Satisfaction Score": 7.9,
            "Selected | Retention Rate": 1,
            "Selected | Satisfaction Score": 1
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
      "totalCalculatedFields": 459
    },
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
        "id": "cf_1",
        "name": "KPI_AvgDaysOpenSince_Calculation",
        "formula": "\"Median of IF [Is Closed Flag]=\"\"N\"\" THEN TimeDifference([Open Date], Today) END\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_2",
        "name": "KPI_AvgDaysOpenSince_Description",
        "formula": "\"Average number of days since claims were opened (open claims only; expressed in days)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_3",
        "name": "KPI_NbClaims_Calculation",
        "formula": "\"Count Distinct of [Claim Number]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_4",
        "name": "KPI_NbReimbursedClaims_Calculation",
        "formula": "\"Count Distinct of IF [Is Reimbursed Flag]=\"\"Y\"\" THEN [Claim Number] END\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_5",
        "name": "KPI_NbAgents_Calculation",
        "formula": "\"Count Distinct of [Agent]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_6",
        "name": "KPI_NbClaims_Description",
        "formula": "\"Total number of claims that were created over the period\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_7",
        "name": "KPI_NbReimbursedClaims_Description",
        "formula": "\"Total number of claims that were reimbursed to customers over the period\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_8",
        "name": "KPI_NbAgents_Description",
        "formula": "\"Total number of agents that were working on claims over the period\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_9",
        "name": "KPI_NbOpenClaims_Calculation",
        "formula": "\"Count Distinct of IF [Is Closed Flag]=\"\"N\"\" THEN [Claim Number] END\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_10",
        "name": "KPI_NbOpenClaims_Description",
        "formula": "\"Total number of claims that are currently open\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_11",
        "name": "KPI_NbOpenClaimsPerAgent_Calculation",
        "formula": "\"\"\"Nb Open Claims\"\" Divided by \"\"Nb Agents\"\"\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_12",
        "name": "KPI_NbOpenClaimsPerAgent_Description",
        "formula": "\"Average number of claims opened over the period per working agent\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_13",
        "name": "KPI_AvgDaysToClose_Calculation",
        "formula": "\"Median of IF [Is Closed Flag]=\"\"Y\"\" THEN TimeDifference([Open Date], [Open Date]) END\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_14",
        "name": "KPI_AvgDaysToClose_Description",
        "formula": "\"Average time it takes to close a case. It determines the effectiveness in handling claims (expressed in days)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_15",
        "name": "KPI_TotalPaidAmt_Calculation",
        "formula": "\"Sum of [Claim Paid Amount]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_16",
        "name": "KPI_TotalPaidAmt_Description",
        "formula": "\"Total amount paid to the policy holders for their claims (expressed in currency)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_17",
        "name": "KPI_DeductibleAmount_Calculation",
        "formula": "\"Sum of [Deductible]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_18",
        "name": "KPI_DeductibleAmount_Description",
        "formula": "\"Total amount the insured is responsible for paying toward an insured loss (expressed in currency)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_19",
        "name": "KPI_TotalOutstandingDamages_Calculation",
        "formula": "\"Sum of IF [Is Closed Flag]=\"\"N\"\" THEN [Damages Amount]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_20",
        "name": "KPI_NbClosedClaims_Calculation",
        "formula": "\"Count Distinct of IF [Is Closed Flag]=\"\"Y\"\" THEN [Claim Number]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_21",
        "name": "KPI_ClaimsReimbursedPct_Calculation",
        "formula": "\"\"\"Nb Reimbursed Claims\"\" Divided by \"\"Nb Closed Claims\"\"\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_22",
        "name": "KPI_TotalDamagesAmount_Calculation",
        "formula": "\"Sum of [Damages Amount]\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_23",
        "name": "KPI_TotalOutstandingDamages_Description",
        "formula": "\"Total amount of damages for open claims (expressed in currency)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_24",
        "name": "KPI_NbClosedClaims_Description",
        "formula": "\"Total number of claims that were closed over the period\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_25",
        "name": "KPI_ClaimsReimbursedPct_Description",
        "formula": "\"Share of claims that were reimbursed on the total number of closed claims (expressed in %)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_26",
        "name": "KPI_TotalDamagesAmount_Description",
        "formula": "\"Total amount of damages as estimated in the claims (expressed in currency)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_27",
        "name": "Current Year",
        "formula": "2023",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Perf - Analysis Scope",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_28",
        "name": "Select KPI",
        "formula": "\"Nb Agents\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_29",
        "name": "Currency",
        "formula": "\"$\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Top  AGENT - Total Paid b",
          "Top AGENT - Total Paid a"
        ]
      },
      {
        "id": "cf_30",
        "name": "LinPackCalculationType",
        "formula": "\"KPI\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_31",
        "name": "Accelerator Log",
        "formula": "\"LinPack messages (view comment for details)\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_32",
        "name": "Select Dimension",
        "formula": "\"Agent\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_33",
        "name": "Select KPI 2",
        "formula": "\"Nb Claims\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_34",
        "name": "Organization Name",
        "formula": "\"Salesforce\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_35",
        "name": "LinPackPeriod",
        "formula": "\"month\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_36",
        "name": "Current Month",
        "formula": "7",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Perf - Analysis Scope",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_37",
        "name": "Performance Scope",
        "formula": "\"CYTD_vs_PYTD\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Perf - Analysis Scope",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_38",
        "name": "Select Dimension 2",
        "formula": "\"Agent Group\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_39",
        "name": "LinPackGeneratorID",
        "formula": "\"29b19a5d-5527-4b71-9cfa-295f04481f91\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_40",
        "name": "Accelerator Title",
        "formula": "\"Insurance Claims\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_41",
        "name": "Select Indicator 2",
        "formula": "\"Claims Reimbursed %\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_42",
        "name": "LinPackGeneratorDS",
        "formula": "\"federated.1oywxhs0yqa12112iftoe1d99io6?1\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_43",
        "name": "Select Indicator",
        "formula": "\"Average Days to Close\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_44",
        "name": "LinPack Generator",
        "formula": "\"DLL:2.21.7.0,TWB:23.2,LIB:(LPREF_Templates_INSURANCE.twb)_23_2,TOKEN:\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_45",
        "name": "Product (Filter)",
        "formula": "[Policy Type]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_46",
        "name": "Deductible Amount (bucket)",
        "formula": "CASE TRUE\r WHEN [LinPack_870107401384373637] <= 1000 THEN \"<1K\"\r WHEN [LinPack_870107401384373637] <= 5000 THEN \"1K-5K\"\r WHEN [LinPack_870107401384373637] <= 100000 THEN \"5K-10K\"\r WHEN [LinPack_870107401384373637] <= 1000000 THEN \">10K\"\r ELSE \"Others\"\r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_47",
        "name": "Month:Claim Close Date",
        "formula": "max(DATETRUNC('month', [Close Date]))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_48",
        "name": "Agent - initials",
        "formula": "Left([Agent],1)+ \". \" + SPLIT([Agent],\" \",2)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_49",
        "name": "Closed Claim Flag",
        "formula": "IF LEFT(UPPER([Claim Status]),1)=\"O\" THEN \"N\" ELSE \"Y\" END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_50",
        "name": "Filter: Performance Card (Claim Close Date)",
        "formula": "if [Months to Current Month (Close Date) (copy)_812055351973294080] <=0 and [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 then \"Y\" else \"N\" end",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b",
          "Top AGENT - Average Days to Close a"
        ]
      },
      {
        "id": "cf_51",
        "name": "Filter: Performance KPI (Claim Close Date)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN if [Months to Current Month (Close Date) (copy)_812055351973294080] = 0 or [Months to Current Month (Close Date) (copy)_812055351973294080]=-1 then \"Y\" else \"N\" end // leave -1 also for 'quarter' and 'year'\r WHEN \"CM_vs_PY\" THEN if [Months to Current Month (Close Date) (copy)_812055351973294080] = 0 or [Months to Current Month (Close Date) (copy)_812055351973294080]=-12 then \"Y\" else \"N\" end\r WHEN \"ACT_vs_TGT\" THEN if [LinPack_243893703856586323] = 0 then \"Y\" else \"N\" end\r WHEN \"CYTD_vs_PYTD\" THEN if (YEAR([Close Date])=[Parameters].[LinPack_061584200884467689] or YEAR([Close Date])=[Parameters].[LinPack_061584200884467689]-1) and MONTH([Close Date])<=[Parameters].[LinPack_361207028433950534] then \"Y\" else \"N\" end\r WHEN \"YTDACT_vs_YTDTGT\" THEN if YEAR([Close Date])=[Parameters].[LinPack_061584200884467689] and MONTH([Close Date])<=[Parameters].[LinPack_361207028433950534] then \"Y\" else \"N\" end\r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b",
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_52",
        "name": "Open Claims Duration (bucket)",
        "formula": "CASE TRUE\r WHEN [LinPack_800791597013927992] <30  THEN \"0-30 days\"\r WHEN [LinPack_800791597013927992] <90  THEN \"1-3 months\"\r WHEN [LinPack_800791597013927992] <180   THEN \"3-6 months\"\r WHEN [LinPack_800791597013927992] <=365  THEN \"6-12 months\"\r WHEN [LinPack_800791597013927992] >365  THEN \"1+ year\"\r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_53",
        "name": "Insurance Claims - Business Line Filter",
        "formula": "[Business Line]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_54",
        "name": "Total Paid (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 2] - [{%%KPI6.PERF__REFERENCE%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Total Paid b"
        ]
      },
      {
        "id": "cf_55",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1] - [{%%KPI6.PERF__REFERENCE%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_56",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 1] - [{%%KPI6.PERF__REFERENCE%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_57",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 3] - [{%%KPI6.PERF__REFERENCE%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_58",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 4] - [{%%KPI6.PERF__REFERENCE%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b"
        ]
      },
      {
        "id": "cf_59",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 1] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_60",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 3] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_61",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 2] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_62",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1 4] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_63",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (for trends)",
        "formula": "[{%%KPI6.PERF__KPI_FOR_TRENDS%%} 1] - [{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_64",
        "name": "Insurance Claims - Claim Reason Filter",
        "formula": "[Claim Reason]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_65",
        "name": "Insurance Claims - Agent Group Filter2",
        "formula": "[Agent Group]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_66",
        "name": "Insurance Claims -  Agent Group Filter",
        "formula": "[Agent Group]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_67",
        "name": "Days to Close",
        "formula": "DATEDIFF(\"day\",[Open Date],[Close Date])",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Top  AGENT - Average Days to Close b",
          "Top AGENT - Average Days to Close a"
        ]
      },
      {
        "id": "cf_68",
        "name": "Days to Close (bucket)",
        "formula": "IF \r         [Calculation_680325065948213248]<30 then \"0-30 days\"\r ELSEIF  [Calculation_680325065948213248]<90 then \"1-3 months\"\r ELSEIF  [Calculation_680325065948213248]<180 then \"3-6 months\"\r ELSEIF  [Calculation_680325065948213248]>=180 then \"> 6 months\"\r ELSE \"\"\r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_69",
        "name": "Insurance Claims - Agent Filter",
        "formula": "[Agent]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b"
        ]
      },
      {
        "id": "cf_70",
        "name": "Open Claims Duration (bucket) -Sort",
        "formula": "CASE TRUE\r WHEN [LinPack_800791597013927992] <30  THEN 30\r WHEN [LinPack_800791597013927992] <90  THEN 90\r WHEN [LinPack_800791597013927992] <180   THEN 180\r WHEN [LinPack_800791597013927992] <=365  THEN 365\r WHEN [LinPack_800791597013927992] >365  THEN 370\r END",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_71",
        "name": "Closed Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r \r ELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r \r ELSE    \r     NULL\r \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_72",
        "name": "Closed Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END)\r WHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_73",
        "name": "Closed Claims Perf. - Value vs Reference %",
        "formula": "[Closed Cases Perf. - Value vs Reference (copy)_148055884317970434] / ABS([Closed Cases Perf. - Reference (copy)_148055884317970433])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_74",
        "name": "Closed Claims Perf. - Value vs Reference",
        "formula": "[Closed Cases Perf. -  Value (copy)_148055884317970432] - [Closed Cases Perf. - Reference (copy)_148055884317970433]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_75",
        "name": "Closed Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Closed Cases Perf. - Value vs Reference (copy)_148055884317970434]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_76",
        "name": "Reimbursed Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r \r ELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r \r ELSE    \r     NULL\r \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_77",
        "name": "Reimbursed Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_257498309054353407] ELSE NULL END)\r WHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END) \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)\r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_78",
        "name": "Reimbursed Claims Perf. - Value vs Reference %",
        "formula": "[Closed Claims Perf. - Value vs Reference (copy)_1181069061760540674] / ABS([Closed Claims Perf. - Reference (copy)_1181069061760376833])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_79",
        "name": "Reimbursed Claims Perf. - Value vs Reference",
        "formula": "[Closed Claims Perf. -  Value (copy)_1181069061760233472] - [Closed Claims Perf. - Reference (copy)_1181069061760376833]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_80",
        "name": "Reimbursed Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Closed Claims Perf. - Value vs Reference (copy)_1181069061760540674]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_81",
        "name": "URL Drill-back to Source Application on Claim",
        "formula": "// This Accelerator is configured to allow you yo drill back to your Source Application to see the detail of each \"Claim\"\r // The Drill Back is activated when clicking on a Claim in the Accelerator \r //  using a URL with the following format: \r //              [URL Prefix] + [Claim] + [URL Suffix]\r //\r // For example when drilling back to an Opportunity on Salesforce Sales Cloud, \r // [URL Prefix] must be: \"https://<YOUR_SALESFORCE_ORG>.lightning.force.com/lightning/r/Opportunity/\" and [URL Sufix] must be \"/view\"\r \r \"https://tableauaccelerators.github.io/drill-back/?Claim=\"+[Claim Number]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_82",
        "name": "Days to Close (bucket) (sort)",
        "formula": "IF \r         [Calculation_680325065948213248]<30 then 30\r ELSEIF  [Calculation_680325065948213248]<90 then 90\r ELSEIF  [Calculation_680325065948213248]<180 then 180\r ELSEIF  [Calculation_680325065948213248]>=180 then 999\r ELSE 999999\r END",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_83",
        "name": "Is Current Period (Closed)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534]\r WHEN \"CM_vs_PY\" THEN YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534]\r WHEN \"ACT_vs_TGT\" THEN  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534]\r WHEN \"CYTD_vs_PYTD\" THEN YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534]\r WHEN \"YTDACT_vs_YTDTGT\" THEN YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534]\r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_84",
        "name": "Filter: Performance Trend (Claim Close Date)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN IF [Months to Current Month (Close Date) (copy)_812055351973294080] <= 0 AND [Months to Current Month (Close Date) (copy)_812055351973294080] >= -12 THEN \"Y\" ELSE \"N\" END\r WHEN \"CM_vs_PY\" THEN IF [Months to Current Month (Close Date) (copy)_812055351973294080] <= 12 AND [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 THEN \"Y\" ELSE \"N\" END\r WHEN \"ACT_vs_TGT\" THEN IF [Months to Current Month (Close Date) (copy)_812055351973294080] <= 12 AND [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 THEN \"Y\" ELSE \"N\" END\r WHEN \"CYTD_vs_PYTD\" THEN IF [Months to Current Month (Close Date) (copy)_812055351973294080] <= 12 AND [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 THEN \"Y\" ELSE \"N\" END\r WHEN \"YTDACT_vs_YTDTGT\" THEN IF [Months to Current Month (Close Date) (copy)_812055351973294080] <= 12 AND [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 THEN \"Y\" ELSE \"N\" END \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_85",
        "name": "Open Since (days)  MTD  (Previous Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_86",
        "name": "Total Outstanding Damages",
        "formula": "SUM([LinPack_430706389162391472])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_87",
        "name": "Nb Agents  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_619104337867439588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_619104337867439588] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_88",
        "name": "Claims Reimbursed % Growth from Previous Period %",
        "formula": "(ZN([LinPack_556620522555772176]) - LOOKUP(ZN([LinPack_556620522555772176]), -1)) / ABS(LOOKUP(ZN([LinPack_556620522555772176]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_89",
        "name": "Open Since (days) Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_065144740072760184] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_065144740072760184] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_092934152951912266] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_092934152951912266]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_90",
        "name": "Nb Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_176398453504719850] \r WHEN \"CM_vs_PY\" THEN [LinPack_914857115527485325] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_251159978153782009] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_91",
        "name": "Total Outstanding Damages Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_677625735102635363] \r WHEN \"CM_vs_PY\" THEN [LinPack_677625735102635363] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_677625735102635363] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_320355170985958371] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_320355170985958371]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_92",
        "name": "Nb Claims  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_713844344844987077] / ABS([LinPack_176398453504719850])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_93",
        "name": "Total Damages Perf. - Value vs Reference",
        "formula": "ZN([LinPack_205346886051088410]) - ZN([LinPack_704066197979510380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_94",
        "name": "Nb Claims  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_95",
        "name": "Open Since (days)  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_632701456957648124]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_96",
        "name": "Period: Name of Previous Month",
        "formula": "[LinPack_915686282814778735] + \"-\" + RIGHT(STR([LinPack_392564468777001906]),2)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Perf - Analysis Scope"
        ]
      },
      {
        "id": "cf_97",
        "name": "Total Paid Growth from Previous Period %",
        "formula": "(ZN([LinPack_540447997612119839]) - LOOKUP(ZN([LinPack_540447997612119839]), -1)) / ABS(LOOKUP(ZN([LinPack_540447997612119839]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_98",
        "name": "Open Since (days)  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_385242574458430310] / ABS([LinPack_001470713098156858])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_99",
        "name": "Open Since (days) Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_014352478133387888]) - ZN([LinPack_235087924751254055])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_100",
        "name": "Open Since (days)  YTD  (Current Year) (for trends)",
        "formula": "IF false THEN avg(0) END // This calculation cannot be computed for this aggregation rule. Please use the other available calculations",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_101",
        "name": "Nb Agents  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_338688795082735958]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_102",
        "name": "Indicator2 - Display Value",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r WHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r WHEN \"Claims Reimbursed %\" THEN FLOAT(100*[LinPack_556620522555772176]) \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r WHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r WHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_103",
        "name": "Period: Previous Year",
        "formula": "ATTR([Parameters].[LinPack_061584200884467689])-1",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_104",
        "name": "Indicator - Display Value",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r WHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r WHEN \"Claims Reimbursed %\" THEN FLOAT(100*[LinPack_556620522555772176]) \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r WHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r WHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_105",
        "name": "Total Damages  YTD  (Current Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_106",
        "name": "Open Since (days)  YTD  (Previous Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_107",
        "name": "Nb Agents Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_710552598472596108] \r WHEN \"CM_vs_PY\" THEN [LinPack_436064155486646203] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_338688795082735958] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_108",
        "name": "Placeholder (num)",
        "formula": "AVG(0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_109",
        "name": "KPI Perf. -  Value - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_403278865337907297]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_765567359479159633]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_765582981339525238]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_764754838389350874]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_205346886051088410]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_036910499603175887]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_110",
        "name": "Total Outstanding Damages  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_320355170985958371]) - ZN([LinPack_358766346315120233])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_111",
        "name": "Nb Reimbursed Claims",
        "formula": "COUNTD([LinPack_257498309054353407])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Top AGENT - Claims Reimbursed % - Minitrend"
        ]
      },
      {
        "id": "cf_112",
        "name": "Nb Agents Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_728822348053434317] / ABS([LinPack_824014239762034483])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_113",
        "name": "Nb Claims  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_251159978153782009]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_114",
        "name": "KPI2 - Display Value",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_115",
        "name": "Nb Agents  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_543884768821756499]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_116",
        "name": "KPI Perf. - Value vs Reference",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_972474889586236644]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_222785374296457216]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_801177066230448315]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_204677139479255874]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_058832752294337078]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_328790723137866341]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_117",
        "name": "Nb Open Claims per Agent",
        "formula": "ZN([LinPack_848127189655121018]) / ZN([LinPack_869728511659547472])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_118",
        "name": "Nb Open Claims Perf. - Value vs Reference %",
        "formula": "[LinPack_801177066230448315] / ABS([LinPack_210795920341545853])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_119",
        "name": "Nb Agents Growth from Previous Period %",
        "formula": "(ZN([LinPack_869728511659547472]) - LOOKUP(ZN([LinPack_869728511659547472]), -1)) / ABS(LOOKUP(ZN([LinPack_869728511659547472]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_120",
        "name": "Total Damages Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_960545609462729169] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_838236730248264561] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_121",
        "name": "KPI Growth from Previous Period %",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_165023047485460467]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_427328821852568048]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_218707621094189162]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_385678673706592736]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_396564432154635016]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_678534132907308170]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_122",
        "name": "KPI Perf. - Reference - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_118200554300232663]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_016560078095726380]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_210795920341545853]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_447391225742565893]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_704066197979510380]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_789491359913924715]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_123",
        "name": "Nb Claims  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_124",
        "name": "Total Damages Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_761139585457102483]) - ZN([LinPack_170055699683027488])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_125",
        "name": "Nb Agents Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_155496142408021215] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_155496142408021215] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_005346584963267270] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_005346584963267270]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_126",
        "name": "Period: Period Analyzed",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN [LinPack_860904326723893347] \r WHEN \"CM_vs_PY\"  THEN [LinPack_860904326723893347] \r WHEN \"ACT_vs_TGT\"  THEN [LinPack_860904326723893347] \r WHEN \"CYTD_vs_PYTD\"  THEN \"YTD \" + [LinPack_860904326723893347] \r WHEN \"YTDACT_vs_YTDTGT\"  THEN \"YTD \" + [LinPack_860904326723893347] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Perf - Analysis Scope"
        ]
      },
      {
        "id": "cf_127",
        "name": "Open Since (days) Perf. - Value vs Reference",
        "formula": "ZN([LinPack_764754838389350874]) - ZN([LinPack_447391225742565893])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_128",
        "name": "Total Damages Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_475169369809980978] \r WHEN \"CM_vs_PY\" THEN [LinPack_475169369809980978] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_475169369809980978] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_116093578182488830] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_116093578182488830]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_129",
        "name": "Nb Open Claims  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_370016001432172588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_370016001432172588] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_130",
        "name": "Nb Open Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_590535268113940387] \r WHEN \"CM_vs_PY\" THEN [LinPack_867010562689685340] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_739246589439599276] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_131",
        "name": "Nb Open Claims  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_978167939772781742]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_132",
        "name": "Total Outstanding Damages Perf. - Value vs Reference %",
        "formula": "[LinPack_328790723137866341] / ABS([LinPack_789491359913924715])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_133",
        "name": "Nb Open Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_848127189655121018]) - LOOKUP(ZN([LinPack_848127189655121018]), -1)) / ABS(LOOKUP(ZN([LinPack_848127189655121018]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_134",
        "name": "Nb Claims Perf. - Value vs Reference",
        "formula": "ZN([LinPack_765567359479159633]) - ZN([LinPack_016560078095726380])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_135",
        "name": "Average Days to Close",
        "formula": "MEDIAN([LinPack_545857431642676680])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Top  AGENT - Average Days to Close b",
          "Top AGENT - Average Days to Close a"
        ]
      },
      {
        "id": "cf_136",
        "name": "Total Outstanding Damages  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   RUNNING_SUM([LinPack_320355170985958371])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_137",
        "name": "Total Outstanding Damages Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_641964735680105704] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_483174544855354104] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_138",
        "name": "Open Since (days) Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_305286304993248656] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_947051232852126143] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_139",
        "name": "Period: Months to Current Month",
        "formula": "-1*(([Parameters].[LinPack_061584200884467689]- [LinPack_438609663205281304])*12+([Parameters].[LinPack_361207028433950534] - [LinPack_771697825390589731]))",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_140",
        "name": "Main Date: Year of Last Date",
        "formula": "{fixed: max(year( {fixed:max([Open Date])}))}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Perf - Analysis Scope",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_141",
        "name": "Nb Claims  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_142",
        "name": "Indicator 2",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r WHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r WHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_556620522555772176]) \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r WHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r WHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_143",
        "name": "_Nb Reimbursed Claims (Expression)",
        "formula": "IF UPPER([Is Reimbursed Flag])=\"Y\" THEN [Claim Number] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_144",
        "name": "Indicator2 - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r WHEN \"Average Days to Close\" THEN ATTR(\"\") \r WHEN \"Claims Reimbursed %\" THEN ATTR(\"\") \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r WHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\"\") \r WHEN \"Total Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Deductible\" THEN ATTR(\"$ \") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Paid\" THEN ATTR(\"$ \") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_145",
        "name": "Filter: Current vs Previous Period",
        "formula": "IF [LinPack_243893703856586323] <= 0 AND [LinPack_243893703856586323] >= -12 THEN \"Y\" ELSE \"N\" END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_146",
        "name": "Period: Period of Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN NULL \r WHEN \"CM_vs_PY\"  THEN STR([Parameters].[LinPack_061584200884467689]-1) \r WHEN \"ACT_vs_TGT\"  THEN \"Target \" + STR([Parameters].[LinPack_061584200884467689]) \r WHEN \"CYTD_vs_PYTD\"  THEN \"YTD \" + STR([Parameters].[LinPack_061584200884467689]-1) \r WHEN \"YTDACT_vs_YTDTGT\"  THEN \"YTD \" + STR([Parameters].[LinPack_061584200884467689]) + \" Target\" \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_147",
        "name": "Total Damages Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_058832752294337078]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_148",
        "name": "Nb Claims  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_149",
        "name": "Main Date: Month of Last Date",
        "formula": "{fixed: max(month( {fixed:max([Open Date])}))}",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Perf - Analysis Scope",
          "Top AGENT - Nb Closed Claims a"
        ]
      },
      {
        "id": "cf_150",
        "name": "Total Damages  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_890614344523899116] / ABS([LinPack_537734613855980355])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_151",
        "name": "Open Since (days)  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_118136351010791333]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_152",
        "name": "Total Outstanding Damages Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_475151873179235566]) - ZN([LinPack_231816817779693420])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_153",
        "name": "Indicator",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r WHEN \"Average Days to Close\" THEN FLOAT([LinPack_223342387335835670]) \r WHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_556620522555772176]) \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_381226536365906696]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_158874720158457487]) \r WHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_125708952705231201]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Deductible\" THEN FLOAT([LinPack_581734149578208266]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r WHEN \"Total Paid\" THEN FLOAT([LinPack_540447997612119839]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_154",
        "name": "KPI Perf. - Value vs Reference %",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_845130919327897462]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_597563655936039745]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_160763347585464581]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_370178118539928084]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_732647040571748879]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_213159920022918544]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_155",
        "name": "Total Outstanding Damages  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_989646304356824152] / ABS([LinPack_889807749084919034])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_156",
        "name": "Total Outstanding Damages  YTD  (Current Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_157",
        "name": "Open Since (days)",
        "formula": "MEDIAN([LinPack_800791597013927992])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_158",
        "name": "Open Since (days) Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_087540724708560515] / ABS([LinPack_235087924751254055])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_159",
        "name": "Total Outstanding Damages Perf. - Value vs Reference",
        "formula": "ZN([LinPack_036910499603175887]) - ZN([LinPack_789491359913924715])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_160",
        "name": "Nb Agents  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_161",
        "name": "Nb Agents  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_162",
        "name": "Main Date: Month Year (Display)",
        "formula": "[LinPack_730646459737788785] + \"-\" + [LinPack_781568977391712334]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_163",
        "name": "Indicator Growth from Previous Period %",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r WHEN \"Average Days to Close\" THEN FLOAT([LinPack_387131796153445582]) \r WHEN \"Claims Reimbursed %\" THEN FLOAT([LinPack_008124338648445781]) \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_165023047485460467]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_427328821852568048]) \r WHEN \"Nb Closed Claims\" THEN FLOAT([LinPack_955037859702288622]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_218707621094189162]) \r WHEN \"Nb Open Claims per Agent\" THEN FLOAT([LinPack_817300268673637113]) \r WHEN \"Nb Reimbursed Claims\" THEN FLOAT([LinPack_801947807295716980]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_385678673706592736]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_396564432154635016]) \r WHEN \"Total Deductible\" THEN FLOAT([LinPack_684364583909523365]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_678534132907308170]) \r WHEN \"Total Paid\" THEN FLOAT([LinPack_083804381171898417]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_164",
        "name": "Nb Agents  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_758662972911103964] / ABS([LinPack_436064155486646203])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_165",
        "name": "Nb Claims  MTD   (Current Month) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_282415587747719625]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_166",
        "name": "Total Outstanding Damages  YTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_167",
        "name": "KPI Perf. -  Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_181359899101592114]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_885520589467117095]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_542462541075525441]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_014352478133387888]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_761139585457102483]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_475151873179235566]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_168",
        "name": "_Nb Open Claims (Expression)",
        "formula": "IF UPPER([Is Closed Flag])=\"N\" THEN [Claim Number] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_169",
        "name": "Open Since (days) Perf. - Value vs Reference %",
        "formula": "[LinPack_204677139479255874] / ABS([LinPack_447391225742565893])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_170",
        "name": "Nb Open Claims Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_542462541075525441]) - ZN([LinPack_992140249399183826])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_171",
        "name": "Open Since (days)  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_691271207202978941] / ABS([LinPack_118136351010791333])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_172",
        "name": "Nb Closed Claims",
        "formula": "COUNTD([LinPack_398370742208982663])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_173",
        "name": "Total Outstanding Damages  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_437823831520020650] / ABS([LinPack_459156243435697482])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_174",
        "name": "Period: Month Number of Previous Month",
        "formula": "IF [Parameters].[LinPack_361207028433950534]=1 THEN \r 12 \r ELSE \r [Parameters].[LinPack_361207028433950534]-1 \r END",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_175",
        "name": "Open Since (days)  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_654200888375634660]) - ZN([LinPack_001470713098156858])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_176",
        "name": "Open Since (days) Growth from Previous Period %",
        "formula": "(ZN([LinPack_323554820047972012]) - LOOKUP(ZN([LinPack_323554820047972012]), -1)) / ABS(LOOKUP(ZN([LinPack_323554820047972012]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_177",
        "name": "Total Outstanding Damages Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_328790723137866341]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_178",
        "name": "Average Days to Close Growth from Previous Period %",
        "formula": "(ZN([LinPack_223342387335835670]) - LOOKUP(ZN([LinPack_223342387335835670]), -1)) / ABS(LOOKUP(ZN([LinPack_223342387335835670]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_179",
        "name": "Period: Year of Previous Month",
        "formula": "IF [Parameters].[LinPack_361207028433950534]=1 THEN \r [Parameters].[LinPack_061584200884467689]-1 \r ELSE \r [Parameters].[LinPack_061584200884467689] \r END",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Perf - Analysis Scope"
        ]
      },
      {
        "id": "cf_180",
        "name": "Total Damages Growth from Previous Period %",
        "formula": "(ZN([LinPack_842036301018049390]) - LOOKUP(ZN([LinPack_842036301018049390]), -1)) / ABS(LOOKUP(ZN([LinPack_842036301018049390]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_181",
        "name": "Nb Claims  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_705532015286423348]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_705532015286423348] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_182",
        "name": "_Nb Closed Claims (Expression)",
        "formula": "IF UPPER([Is Closed Flag])=\"Y\" THEN [Claim Number] END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_183",
        "name": "Nb Open Claims  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_978167939772781742]) - ZN([LinPack_739246589439599276])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_184",
        "name": "Nb Agents Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_338901930403833534] \r WHEN \"CM_vs_PY\" THEN [LinPack_338901930403833534] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_338901930403833534] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_543884768821756499] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_543884768821756499]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_185",
        "name": "Total Damages  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_960724093590930721] / ABS([LinPack_720860668034453646])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_186",
        "name": "Nb Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_454004648075345447]) - LOOKUP(ZN([LinPack_454004648075345447]), -1)) / ABS(LOOKUP(ZN([LinPack_454004648075345447]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_187",
        "name": "_Total Outstanding Damages (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"N\" THEN [Damages Amount] END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_188",
        "name": "Nb Agents  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_189",
        "name": "Total Outstanding Damages  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_677625735102635363]) - ZN([LinPack_459156243435697482])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_190",
        "name": "Main Date: Year",
        "formula": "YEAR([Open Date])",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)",
          "Perf - Analysis Scope",
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_191",
        "name": "Nb Agents  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_973900187545252897] / ABS([LinPack_338688795082735958])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_192",
        "name": "Open Since (days) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_557357344493219015] \r WHEN \"CM_vs_PY\" THEN [LinPack_001470713098156858] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_118136351010791333] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_193",
        "name": "Nb Claims",
        "formula": "COUNTD([LinPack_705532015286423348])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_194",
        "name": "Total Outstanding Damages  MTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_195",
        "name": "Total Damages  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_116093578182488830]) - ZN([LinPack_654484837335847802])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_196",
        "name": "_Total Damages (Expression)",
        "formula": "[Damages Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_197",
        "name": "Indicator Share of total",
        "formula": "IF ROUND( WINDOW_SUM([LinPack_313407032102133663] / TOTAL([LinPack_313407032102133663]) ),2) = 1 THEN [LinPack_313407032102133663] / TOTAL( [LinPack_313407032102133663] ) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_198",
        "name": "Indicator2 - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_751643439417515637] \r WHEN \"Average Days to Close\" THEN ATTR(\" d\") \r WHEN \"Claims Reimbursed %\" THEN ATTR(\"%\") \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r WHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\" d\") \r WHEN \"Total Damages\" THEN ATTR(\"\") \r WHEN \"Total Deductible\" THEN ATTR(\"\") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r WHEN \"Total Paid\" THEN ATTR(\"\") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_199",
        "name": "Total Outstanding Damages Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_863909562204035212] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_863909562204035212] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_231115654867644757] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_231115654867644757]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_200",
        "name": "Total Damages  MTD   (Current Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_201",
        "name": "Period: Analysis Scope Type",
        "formula": "[Parameters].[LinPack_371749732845320988]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_202",
        "name": "KPI Perf. - Value vs Reference - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN \"\" + IIF(SIGN([LinPack_972474889586236644]) = 1,\"+\",\"\") \r WHEN \"Nb Claims\" THEN \"\" + IIF(SIGN([LinPack_222785374296457216]) = 1,\"+\",\"\") \r WHEN \"Nb Open Claims\" THEN \"\" + IIF(SIGN([LinPack_801177066230448315]) = 1,\"+\",\"\") \r WHEN \"Open Since (days)\" THEN \"\" + IIF(SIGN([LinPack_204677139479255874]) = 1,\"+\",\"\") \r WHEN \"Total Damages\" THEN \"$ \" + IIF(SIGN([LinPack_058832752294337078]) = 1,\"+\",\"\") \r WHEN \"Total Outstanding Damages\" THEN \"$ \" + IIF(SIGN([LinPack_328790723137866341]) = 1,\"+\",\"\") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_203",
        "name": "Total Outstanding Damages Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_306810912159779820] / ABS([LinPack_231816817779693420])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_204",
        "name": "KPI Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_118200554300232663]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_016560078095726380]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_210795920341545853]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_447391225742565893]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_704066197979510380]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_789491359913924715]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_205",
        "name": "Total Outstanding Damages  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   RUNNING_SUM([LinPack_358766346315120233])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_206",
        "name": "KPI - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\" d\") \r WHEN \"Total Damages\" THEN ATTR(\"\") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_207",
        "name": "Total Damages Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_177142247715880190] / ABS([LinPack_170055699683027488])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_208",
        "name": "Period: Current Year",
        "formula": "ATTR([Parameters].[LinPack_061584200884467689])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_209",
        "name": "KPI Perf. -  Value (Share of total)",
        "formula": "IF ROUND( WINDOW_SUM([LinPack_821850866227780954] / TOTAL([LinPack_821850866227780954]) ),2) = 1 THEN [LinPack_821850866227780954] / TOTAL( [LinPack_821850866227780954] ) END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_210",
        "name": "Open Since (days)  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_654200888375634660]) - ZN([LinPack_557357344493219015])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_211",
        "name": "Nb Claims  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_282415587747719625]) - ZN([LinPack_251159978153782009])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_212",
        "name": "Nb Claims Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_885520589467117095]) - ZN([LinPack_983728631218598473])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_213",
        "name": "Nb Agents Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_972474889586236644]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_214",
        "name": "Nb Open Claims  MTD   (Current Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_215",
        "name": "Indicator - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r WHEN \"Average Days to Close\" THEN ATTR(\"\") \r WHEN \"Claims Reimbursed %\" THEN ATTR(\"\") \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r WHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\"\") \r WHEN \"Total Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Deductible\" THEN ATTR(\"$ \") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Paid\" THEN ATTR(\"$ \") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_216",
        "name": "Nb Claims  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_515073546357020193] / ABS([LinPack_251159978153782009])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_217",
        "name": "Nb Open Claims  MTD   (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r [LinPack_739246589439599276]\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_218",
        "name": "Total Damages  MTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_219",
        "name": "Total Paid",
        "formula": "SUM([LinPack_640031983728264934])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Total Paid b"
        ]
      },
      {
        "id": "cf_220",
        "name": "Nb Open Claims Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_213141054382385151] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_213141054382385151] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_596155655411923325] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_596155655411923325]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_221",
        "name": "Nb Agents  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_222",
        "name": "_Average Days to Close (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"Y\" THEN DATEDIFF(\"day\", [Open Date], [Close Date]) END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_223",
        "name": "KPI Perf. -  Value (for trends) - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_181359899101592114]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_885520589467117095]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_542462541075525441]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_014352478133387888]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_761139585457102483]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_475151873179235566]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_224",
        "name": "Nb Open Claims Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_375062032639825654] / ABS([LinPack_992140249399183826])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_225",
        "name": "Claims Reimbursed %",
        "formula": "ZN([LinPack_125708952705231201]) / ZN([LinPack_381226536365906696])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_226",
        "name": "Open Since (days)  MTD   (Previous Month)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_227",
        "name": "Nb Open Claims  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_400096043746779663] / ABS([LinPack_739246589439599276])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_228",
        "name": "Period: Name of Same Month Previous Year",
        "formula": "[LinPack_816039079638708388] + \"-\" + RIGHT(STR([Parameters].[LinPack_061584200884467689]-1),2)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_229",
        "name": "Nb Agents  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_338901930403833534]) - ZN([LinPack_710552598472596108])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_230",
        "name": "Nb Open Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_801177066230448315]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_231",
        "name": "KPI Perf. - Value vs Reference % (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_135684725998537727]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_670607465028379924]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_555865248114507279]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_326426750037527868]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_485183931620903147]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_476883502234909983]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_232",
        "name": "Total Deductible",
        "formula": "SUM([LinPack_870107401384373637])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_233",
        "name": "Indicator - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_953089457033817746] \r WHEN \"Average Days to Close\" THEN ATTR(\" d\") \r WHEN \"Claims Reimbursed %\" THEN ATTR(\"%\") \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Closed Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims per Agent\" THEN ATTR(\"\") \r WHEN \"Nb Reimbursed Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\" d\") \r WHEN \"Total Damages\" THEN ATTR(\"\") \r WHEN \"Total Deductible\" THEN ATTR(\"\") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r WHEN \"Total Paid\" THEN ATTR(\"\") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_234",
        "name": "Nb Open Claims  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_235",
        "name": "Nb Open Claims  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_526992866097063811]) - ZN([LinPack_590535268113940387])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_236",
        "name": "Nb Open Claims  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_370016001432172588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN [Open Date] END)} THEN [LinPack_370016001432172588] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_237",
        "name": "Nb Claims Perf. - Value vs Reference %",
        "formula": "[LinPack_222785374296457216] / ABS([LinPack_016560078095726380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_238",
        "name": "KPI Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_824014239762034483]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_983728631218598473]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_992140249399183826]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_235087924751254055]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_170055699683027488]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_231816817779693420]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_239",
        "name": "Nb Claims  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_058965364115069541]) - ZN([LinPack_914857115527485325])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_240",
        "name": "_Nb Agents (Expression)",
        "formula": "[Agent]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_241",
        "name": "KPI2 - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\"\") \r WHEN \"Total Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_242",
        "name": "Dimension",
        "formula": "CASE [Parameters].[LinPack_178350028745102603] \r WHEN \"Agent\" THEN [Agent] \r WHEN \"Agent Group\" THEN [Agent Group] \r WHEN \"Business Line\" THEN [Business Line] \r WHEN \"Claim Number\" THEN [Claim Number] \r WHEN \"Claim Status\" THEN [Claim Status] \r WHEN \"Is Closed Flag\" THEN [Is Closed Flag] \r WHEN \"Is Reimbursed Flag\" THEN [Is Reimbursed Flag] \r WHEN \"Policy Holder\" THEN [Policy Holder] \r WHEN \"Policy Number\" THEN [Policy Number] \r WHEN \"Policy Type\" THEN [Policy Type] \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Perf - Analysis Scope"
        ]
      },
      {
        "id": "cf_243",
        "name": "Open Since (days)  YTD  (Current Year)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_244",
        "name": "_Total Paid (Expression)",
        "formula": "[Claim Paid Amount]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_245",
        "name": "Total Outstanding Damages  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_358766346315120233]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_246",
        "name": "Open Since (days)  MTD   (Current Month)",
        "formula": "MEDIAN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_800791597013927992] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_247",
        "name": "Total Damages  YTD  (Previous Year)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_248",
        "name": "Nb Claims  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_615747030366139572] / ABS([LinPack_914857115527485325])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_249",
        "name": "Nb Claims Perf. - Value vs Reference % (for trends)",
        "formula": "[LinPack_516603971530074954] / ABS([LinPack_983728631218598473])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_250",
        "name": "Period: Analysis Scope",
        "formula": "[LinPack_186466638269714842] + \" vs \" + [LinPack_739610514840049358]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_251",
        "name": "Dimension 2",
        "formula": "CASE [Parameters].[LinPack_485067584180734517] \r WHEN \"Agent\" THEN [Agent] \r WHEN \"Agent Group\" THEN [Agent Group] \r WHEN \"Business Line\" THEN [Business Line] \r WHEN \"Claim Number\" THEN [Claim Number] \r WHEN \"Claim Status\" THEN [Claim Status] \r WHEN \"Is Closed Flag\" THEN [Is Closed Flag] \r WHEN \"Is Reimbursed Flag\" THEN [Is Reimbursed Flag] \r WHEN \"Policy Holder\" THEN [Policy Holder] \r WHEN \"Policy Number\" THEN [Policy Number] \r WHEN \"Policy Type\" THEN [Policy Type] \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_252",
        "name": "Total Outstanding Damages  MTD   (Current Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_253",
        "name": "Total Outstanding Damages Growth from Previous Period %",
        "formula": "(ZN([LinPack_004007761706285023]) - LOOKUP(ZN([LinPack_004007761706285023]), -1)) / ABS(LOOKUP(ZN([LinPack_004007761706285023]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_254",
        "name": "Total Damages  YTD  (Current Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   RUNNING_SUM([LinPack_116093578182488830])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_255",
        "name": "Open Since (days)  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_498695920020261833] / ABS([LinPack_557357344493219015])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_256",
        "name": "Total Deductible Growth from Previous Period %",
        "formula": "(ZN([LinPack_581734149578208266]) - LOOKUP(ZN([LinPack_581734149578208266]), -1)) / ABS(LOOKUP(ZN([LinPack_581734149578208266]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_257",
        "name": "Open Since (days)  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_632701456957648124]) - ZN([LinPack_118136351010791333])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_258",
        "name": "Open Since (days) Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_204677139479255874]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_259",
        "name": "Nb Open Claims  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_591766740604068048] / ABS([LinPack_590535268113940387])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_260",
        "name": "Total Damages Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_720860668034453646] \r WHEN \"CM_vs_PY\" THEN [LinPack_537734613855980355] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_654484837335847802] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_261",
        "name": "_Nb Claims (Expression)",
        "formula": "[Claim Number]",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_262",
        "name": "Nb Open Claims  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_526992866097063811]) - ZN([LinPack_867010562689685340])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_263",
        "name": "KPI Perf. - Value vs Reference - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_972474889586236644]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_222785374296457216]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_801177066230448315]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_204677139479255874]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_058832752294337078]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_328790723137866341]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_264",
        "name": "Nb Agents  MTD   (Previous Month)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_619104337867439588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_265",
        "name": "Nb Claims  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_058965364115069541]) - ZN([LinPack_176398453504719850])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_266",
        "name": "Total Damages  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_468938916837016163] / ABS([LinPack_654484837335847802])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_267",
        "name": "Total Damages  MTD   (Previous Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_470157109985822088] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_268",
        "name": "Nb Agents Perf. - Value vs Reference (for trends)",
        "formula": "ZN([LinPack_181359899101592114]) - ZN([LinPack_824014239762034483])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_269",
        "name": "Main Date: Month (Display)",
        "formula": "CASE MONTH([Open Date]) \r WHEN 1 THEN \"Jan\" \r WHEN 2 THEN \"Feb\" \r WHEN 3 THEN \"Mar\" \r WHEN 4 THEN \"Apr\" \r WHEN 5 THEN \"May\" \r WHEN 6 THEN \"Jun\" \r WHEN 7 THEN \"Jul\" \r WHEN 8 THEN \"Aug\" \r WHEN 9 THEN \"Sep\" \r WHEN 10 THEN \"Oct\" \r WHEN 11 THEN \"Nov\" \r WHEN 12 THEN \"Dec\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_270",
        "name": "Total Damages Perf. - Value vs Reference %",
        "formula": "[LinPack_058832752294337078] / ABS([LinPack_704066197979510380])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_271",
        "name": "KPI 2",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_272",
        "name": "Nb Open Claims  YTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_273",
        "name": "Period: Period of Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN [LinPack_080275071260555808] \r WHEN \"CM_vs_PY\"  THEN [LinPack_564331734146295087] \r WHEN \"ACT_vs_TGT\"  THEN \"Target \" + [LinPack_860904326723893347] \r WHEN \"CYTD_vs_PYTD\"  THEN \"YTD \" + [LinPack_564331734146295087] \r WHEN \"YTDACT_vs_YTDTGT\"  THEN \"YTD \" + [LinPack_860904326723893347] + \" Target\" \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_274",
        "name": "Total Damages  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_116093578182488830]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_275",
        "name": "Filter: Performance KPI",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN IF [LinPack_243893703856586323] = 0 OR [LinPack_243893703856586323] = -1 THEN \"Y\" ELSE \"N\" END \r WHEN \"CM_vs_PY\"  THEN IF [LinPack_243893703856586323] = 0 OR [LinPack_243893703856586323] = -12 THEN \"Y\" ELSE \"N\" END \r WHEN \"ACT_vs_TGT\"  THEN IF [LinPack_243893703856586323] = 0 THEN \"Y\" ELSE \"N\" END \r WHEN \"CYTD_vs_PYTD\"  THEN IF ([LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] OR [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1) AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN \"Y\" ELSE \"N\" END \r WHEN \"YTDACT_vs_YTDTGT\"  THEN IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN \"Y\" ELSE \"N\" END \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b",
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_276",
        "name": "Nb Agents  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_338901930403833534]) - ZN([LinPack_436064155486646203])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_277",
        "name": "Total Damages Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_743869017548789329] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_743869017548789329] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_679147460071335835] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_679147460071335835]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_278",
        "name": "Open Since (days) Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_654200888375634660] \r WHEN \"CM_vs_PY\" THEN [LinPack_654200888375634660] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_654200888375634660] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_632701456957648124] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_632701456957648124]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_279",
        "name": "Nb Claims Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_058965364115069541] \r WHEN \"CM_vs_PY\" THEN [LinPack_058965364115069541] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_058965364115069541] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_282415587747719625] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_282415587747719625]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_280",
        "name": "Nb Open Claims Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_526992866097063811] \r WHEN \"CM_vs_PY\" THEN [LinPack_526992866097063811] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_526992866097063811] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_978167939772781742] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_978167939772781742]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_281",
        "name": "Main Date: Month",
        "formula": "MONTH([Open Date])",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Perf - Analysis Scope",
          "Top AGENT - Nb Closed Claims a"
        ]
      },
      {
        "id": "cf_282",
        "name": "Main Date: Year (Display)",
        "formula": "STR([LinPack_438609663205281304])",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_283",
        "name": "Total Outstanding Damages Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [LinPack_889807749084919034] \r WHEN \"CM_vs_PY\" THEN [LinPack_459156243435697482] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_358766346315120233] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_284",
        "name": "_Open Since (days) (Expression)",
        "formula": "FLOAT(IF UPPER([Is Closed Flag])=\"N\" THEN DATEDIFF(\"day\", [Open Date], __MyToday) END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_285",
        "name": "Nb Open Claims Perf. - Value vs Reference",
        "formula": "ZN([LinPack_765582981339525238]) - ZN([LinPack_210795920341545853])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_286",
        "name": "Nb Reimbursed Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_125708952705231201]) - LOOKUP(ZN([LinPack_125708952705231201]), -1)) / ABS(LOOKUP(ZN([LinPack_125708952705231201]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_287",
        "name": "Filter: Performance Card",
        "formula": "IF [LinPack_243893703856586323] <= 0 AND [LinPack_243893703856586323] >= -24 THEN \"Y\" ELSE \"N\" END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b",
          "Top AGENT - Average Days to Close a"
        ]
      },
      {
        "id": "cf_288",
        "name": "KPI2 - Display Suffix",
        "formula": "CASE [Parameters].[LinPack_190386764494085450] \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\" d\") \r WHEN \"Total Damages\" THEN ATTR(\"\") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"\") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_289",
        "name": "Period: Month Name of Current Month",
        "formula": "CASE [Parameters].[LinPack_361207028433950534] \r WHEN 1 THEN \"Jan\" \r WHEN 2 THEN \"Feb\" \r WHEN 3 THEN \"Mar\" \r WHEN 4 THEN \"Apr\" \r WHEN 5 THEN \"May\" \r WHEN 6 THEN \"Jun\" \r WHEN 7 THEN \"Jul\" \r WHEN 8 THEN \"Aug\" \r WHEN 9 THEN \"Sep\" \r WHEN 10 THEN \"Oct\" \r WHEN 11 THEN \"Nov\" \r WHEN 12 THEN \"Dec\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_290",
        "name": "Nb Open Claims per Agent Growth from Previous Period %",
        "formula": "(ZN([LinPack_158874720158457487]) - LOOKUP(ZN([LinPack_158874720158457487]), -1)) / ABS(LOOKUP(ZN([LinPack_158874720158457487]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_291",
        "name": "KPI Perf. -  Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_403278865337907297]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_765567359479159633]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_765582981339525238]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_764754838389350874]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_205346886051088410]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_036910499603175887]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_292",
        "name": "Nb Agents Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_094840771503443127] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_850663871217333584] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_293",
        "name": "Total Damages  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   RUNNING_SUM([LinPack_654484837335847802])\r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_294",
        "name": "Total Damages",
        "formula": "SUM([LinPack_470157109985822088])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_295",
        "name": "Nb Agents Perf. - Value vs Reference %",
        "formula": "[LinPack_972474889586236644] / ABS([LinPack_118200554300232663])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_296",
        "name": "Nb Open Claims",
        "formula": "COUNTD([LinPack_370016001432172588])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_297",
        "name": "Nb Agents  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_619104337867439588]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_619104337867439588] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_298",
        "name": "Period: Name of Current Month",
        "formula": "[LinPack_816039079638708388] + \"-\" + RIGHT(STR([Parameters].[LinPack_061584200884467689]),2)",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_299",
        "name": "Period: Period Analyzed (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN NULL \r WHEN \"CM_vs_PY\"  THEN STR([Parameters].[LinPack_061584200884467689]) \r WHEN \"ACT_vs_TGT\"  THEN \"Actual \" + STR([Parameters].[LinPack_061584200884467689]) \r WHEN \"CYTD_vs_PYTD\"  THEN \"YTD \" + STR([Parameters].[LinPack_061584200884467689]) \r WHEN \"YTDACT_vs_YTDTGT\"  THEN \"YTD \" + STR([Parameters].[LinPack_061584200884467689]) + \" Actual\" \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_300",
        "name": "Total Outstanding Damages  MTD   (Current Month) (for trends)",
        "formula": "[LinPack_320355170985958371]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_301",
        "name": "Nb Open Claims  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_302",
        "name": "Filter: Performance Trend",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\"  THEN IF [LinPack_243893703856586323] <= 0 AND [LinPack_243893703856586323] >= -12 THEN \"Y\" ELSE \"N\" END \r WHEN \"CM_vs_PY\"  THEN IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] OR [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 THEN \"Y\" ELSE \"N\" END \r WHEN \"ACT_vs_TGT\"  THEN IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN \"Y\" ELSE \"N\" END \r WHEN \"CYTD_vs_PYTD\"  THEN IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] OR [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 THEN \"Y\" ELSE \"N\" END \r WHEN \"YTDACT_vs_YTDTGT\"  THEN IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] THEN \"Y\" ELSE \"N\" END \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_303",
        "name": "Nb Agents",
        "formula": "COUNTD([LinPack_619104337867439588])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_304",
        "name": "_Total Deductible (Expression)",
        "formula": "[Deductible]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_305",
        "name": "Nb Agents  MTD  (Current vs Previous Month) %",
        "formula": "[LinPack_565514730123707931] / ABS([LinPack_710552598472596108])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_306",
        "name": "Nb Claims  YTD  (Previous Year) (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r   WINDOW_SUM(COUNTD(IF [Open Date]={FIXED[LinPack_705532015286423348]:MIN(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] - 1 THEN [Open Date] END)} THEN [LinPack_705532015286423348] END),FIRST(),0)\r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_307",
        "name": "Nb Claims Perf. -  Value (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_357817221773541777] \r WHEN \"ACT_vs_TGT\" THEN  [LinPack_357817221773541777] \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_397719711956330000] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [LinPack_397719711956330000]  \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_308",
        "name": "Total Outstanding Damages  MTD   (Previous Month)",
        "formula": "SUM(IF [LinPack_438609663205281304] = [LinPack_392564468777001906] AND [LinPack_771697825390589731] = [LinPack_383655229264939448] THEN [LinPack_430706389162391472] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_309",
        "name": "Total Damages  MTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_475169369809980978]) - ZN([LinPack_537734613855980355])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_310",
        "name": "Nb Claims  MTD  (Previous Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689]-1 AND [LinPack_771697825390589731] = [Parameters].[LinPack_361207028433950534] THEN [LinPack_705532015286423348] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_311",
        "name": "Period: Month Name of Previous Month",
        "formula": "CASE [Parameters].[LinPack_361207028433950534] \r WHEN 2 THEN \"Jan\" \r WHEN 3 THEN \"Feb\" \r WHEN 4 THEN \"Mar\" \r WHEN 5 THEN \"Apr\" \r WHEN 6 THEN \"May\" \r WHEN 7 THEN \"Jun\" \r WHEN 8 THEN \"Jul\" \r WHEN 9 THEN \"Aug\" \r WHEN 10 THEN \"Sep\" \r WHEN 11 THEN \"Oct\" \r WHEN 12 THEN \"Nov\" \r WHEN 1 THEN \"Dec\" \r END",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_312",
        "name": "Total Outstanding Damages  YTD (Current vs Previous Year) %",
        "formula": "[LinPack_124194940398715583] / ABS([LinPack_358766346315120233])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_313",
        "name": "Nb Open Claims  MTD (Current vs Previous Year) %",
        "formula": "[LinPack_707685424655623023] / ABS([LinPack_867010562689685340])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_314",
        "name": "Open Since (days)  YTD  (Previous Year) (for trends)",
        "formula": "IF false THEN avg(0) END // This calculation cannot be computed for this aggregation rule. Please use the other available calculations",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_315",
        "name": "KPI - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_316",
        "name": "Nb Closed Claims Growth from Previous Period %",
        "formula": "(ZN([LinPack_381226536365906696]) - LOOKUP(ZN([LinPack_381226536365906696]), -1)) / ABS(LOOKUP(ZN([LinPack_381226536365906696]), -1))",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_317",
        "name": "KPI Perf. - Value vs Reference (shape)",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN [LinPack_526062377770921246] \r WHEN \"Nb Claims\" THEN [LinPack_967284480116357964] \r WHEN \"Nb Open Claims\" THEN [LinPack_570741872043075851] \r WHEN \"Open Since (days)\" THEN [LinPack_693251423532813720] \r WHEN \"Total Damages\" THEN [LinPack_274364374923686019] \r WHEN \"Total Outstanding Damages\" THEN [LinPack_386415188287178777] \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_318",
        "name": "Total Damages  MTD   (Previous Year) (for trends)",
        "formula": "[LinPack_654484837335847802]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_319",
        "name": "Total Damages  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_475169369809980978]) - ZN([LinPack_720860668034453646])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_320",
        "name": "Nb Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([LinPack_222785374296457216]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_321",
        "name": "Nb Agents Perf. - Value vs Reference",
        "formula": "ZN([LinPack_403278865337907297]) - ZN([LinPack_118200554300232663])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_322",
        "name": "Nb Agents  YTD (Current vs Previous Year)",
        "formula": "ZN([LinPack_543884768821756499]) - ZN([LinPack_338688795082735958])",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_323",
        "name": "Nb Open Claims  YTD  (Current Year)",
        "formula": "COUNTD(IF [LinPack_438609663205281304] = [Parameters].[LinPack_061584200884467689] AND [LinPack_771697825390589731] <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_370016001432172588] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_324",
        "name": "Nb Claims Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_147222799454383909] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_883734027091479420] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_325",
        "name": "KPI - Display Prefix",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN ATTR(\"\") \r WHEN \"Nb Claims\" THEN ATTR(\"\") \r WHEN \"Nb Open Claims\" THEN ATTR(\"\") \r WHEN \"Open Since (days)\" THEN ATTR(\"\") \r WHEN \"Total Damages\" THEN ATTR(\"$ \") \r WHEN \"Total Outstanding Damages\" THEN ATTR(\"$ \") \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_326",
        "name": "Total Outstanding Damages  MTD  (Current vs Previous Month)",
        "formula": "ZN([LinPack_677625735102635363]) - ZN([LinPack_889807749084919034])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_327",
        "name": "Nb Open Claims Perf. - Reference (for trends)",
        "formula": "IF ATTR([LinPack_771697825390589731]) <= [Parameters].[LinPack_361207028433950534] THEN \r CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL \r WHEN \"CM_vs_PY\" THEN [LinPack_529909349826542949] \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN [LinPack_205986699085815418] \r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_328",
        "name": "KPI Perf. - Reference (for trends) - Display Value",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_824014239762034483]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_983728631218598473]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_992140249399183826]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_235087924751254055]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_170055699683027488]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_231816817779693420]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_329",
        "name": "KPI",
        "formula": "CASE [Parameters].[LinPack_068528533641913184] \r WHEN \"Nb Agents\" THEN FLOAT([LinPack_869728511659547472]) \r WHEN \"Nb Claims\" THEN FLOAT([LinPack_454004648075345447]) \r WHEN \"Nb Open Claims\" THEN FLOAT([LinPack_848127189655121018]) \r WHEN \"Open Since (days)\" THEN FLOAT([LinPack_323554820047972012]) \r WHEN \"Total Damages\" THEN FLOAT([LinPack_842036301018049390]) \r WHEN \"Total Outstanding Damages\" THEN FLOAT([LinPack_004007761706285023]) \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b",
          "Top  AGENT - Nb Closed Claims b",
          "Top  AGENT - Total Paid b",
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_330",
        "name": "Months to Current Month (Claim Close Date)",
        "formula": "-1*(([Parameters].[LinPack_061584200884467689]- year([Close Date]))*12+([Parameters].[LinPack_361207028433950534]-Month([Close Date])))",
        "role": "dimension",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_331",
        "name": "Open Claims Duration Days (Display)",
        "formula": "STR([LinPack_323554820047972012])+ 'd '",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_332",
        "name": "Performance Scope Filter (Claim Close Date)",
        "formula": "if [Months to Current Month (Close Date) (copy)_812055351973294080] <=0 and [Months to Current Month (Close Date) (copy)_812055351973294080] >= -24 then \"Y\" else \"N\" end",
        "role": "dimension",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_333",
        "name": "Rejected Claims Perf. -  Value",
        "formula": "IF [Parameters].[LinPack_371749732845320988] =\"CM_vs_PM\" OR [Parameters].[LinPack_371749732845320988] =\"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN\r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r \r ELSEIF [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\"  OR [Parameters].[LinPack_371749732845320988] =\"YTDACT_vs_YTDTGT\" THEN \r     COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r \r ELSE    \r     NULL\r \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_334",
        "name": "Rejected Claims Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN COUNTD(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_470157109985822088] ELSE NULL END)\r WHEN \"CM_vs_PY\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END) \r WHEN \"ACT_vs_TGT\" THEN NULL \r WHEN \"CYTD_vs_PYTD\" THEN COUNTD(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_470157109985822088] ELSE NULL END)\r WHEN \"YTDACT_vs_YTDTGT\" THEN NULL \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_335",
        "name": "Rejected Claims Perf. - Value vs Reference %",
        "formula": "[Reimbursed Claims Perf. - Value vs Reference (copy)_1469580913310703618] / ABS([Reimbursed Claims Perf. - Reference (copy)_1469580913310560257])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_336",
        "name": "Rejected Claims Perf. - Value vs Reference",
        "formula": "[Reimbursed Claims Perf. -  Value (copy)_1469580913310445568] - [Reimbursed Claims Perf. - Reference (copy)_1469580913310560257]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_337",
        "name": "Rejected Claims Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Reimbursed Claims Perf. - Value vs Reference (copy)_1469580913310703618]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_338",
        "name": "Claim Closure Time Perf. -  Value",
        "formula": "IF      [Parameters].[LinPack_371749732845320988] = \"CM_vs_PM\" or [Parameters].[LinPack_371749732845320988] = \"CM_vs_PY\" OR [Parameters].[LinPack_371749732845320988] =\"ACT_vs_TGT\" THEN \r         AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r \r ELSEIF  [Parameters].[LinPack_371749732845320988] = \"CYTD_vs_PYTD\" OR [Parameters].[LinPack_371749732845320988] = \"YTDACT_vs_YTDTGT\" THEN\r         AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r \r ELSE    NULL \r \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_339",
        "name": "Claim Closure Time Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r \r WHEN \"CM_vs_PM\" THEN \r         AVG(IF YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END) \r \r WHEN \"CM_vs_PY\" THEN \r         AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END) \r \r WHEN \"ACT_vs_TGT\" THEN \r         NULL \r \r WHEN \"CYTD_vs_PYTD\" THEN \r         AVG(IF YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)\r \r WHEN \"YTDACT_vs_YTDTGT\" THEN \r         NULL \r \r WHEN \"NONE\"  THEN \r         NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_340",
        "name": "Claim Closure Time Perf. - Value vs Reference %",
        "formula": "[Resolution Time Perf. - Value vs Reference (copy)_148055884324622344] / ABS([Resolution Time Perf. - Reference (copy)_148055884324622343])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_341",
        "name": "Claim Closure Time Perf. - Value vs Reference",
        "formula": "[Resolution Time Perf. -  Value (copy)_148055884324622342] - [Resolution Time Perf. - Reference (copy)_148055884324622343]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_342",
        "name": "Claim Closure Time Perf. - Value vs Reference (shape)",
        "formula": "CASE sign([Resolution Time Perf. - Value vs Reference (copy)_148055884324622344]) \r WHEN 1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25a0\" \r     ELSE \"\u25b2\" \r     END \r WHEN 0 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \" \" \r     ELSE \"\u25ba\" \r     END \r WHEN -1 THEN \r     IF [Parameters].[LinPack_371749732845320988]= \"ACT_vs_TGT\" OR [Parameters].[LinPack_371749732845320988]= \"YTDACT_vs_YTDTGT\" THEN \"\u25cf\" \r     ELSE \"\u25bc\" \r     END \r ELSE \" \" \r END",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_343",
        "name": "As of Today - Insurance Claims",
        "formula": "__MyToday",
        "role": "dimension",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_344",
        "name": "__MyToday",
        "formula": "MAKEDATE(2023,07,31)+8/24",
        "role": "dimension",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_345",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_346",
        "name": "Total Paid (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Total Paid b"
        ]
      },
      {
        "id": "cf_347",
        "name": "Claims Reimbursed % (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top AGENT - Claims Reimbursed % - Value"
        ]
      },
      {
        "id": "cf_348",
        "name": "Average Days to Close (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Top  AGENT - Average Days to Close b"
        ]
      },
      {
        "id": "cf_349",
        "name": "Nb Closed Claims (Closed) Perf. - Value",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Top  AGENT - Nb Closed Claims b"
        ]
      },
      {
        "id": "cf_350",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]\r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 1]\r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 1]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_351",
        "name": "Total Paid (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]\r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 2]\r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 2] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 2]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_352",
        "name": "Claims Reimbursed % (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]\r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 3]\r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 3] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 3]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_353",
        "name": "Average Days to Close (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]\r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1 4]\r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 4] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1 4]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_354",
        "name": "Nb Closed Claims (Closed) Perf. - Value (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__CURRENT_YTD%%} 1]\r WHEN \"ACT_vs_TGT\" THEN  [{%%KPI6.YTD__CURRENT_YTD%%} 1]\r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__CURRENT_YTD_FOR_TRENDS%%} 1]  \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_355",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652597252] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_356",
        "name": "Total Paid (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980649070592] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_357",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652687365] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_358",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652777478] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_359",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference %",
        "formula": "[Calculation_2171860980652204033] / ABS([{%%KPI6.PERF__REFERENCE%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_360",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663463944] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_361",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663619594] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_362",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663529481] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_363",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663685131] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_364",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (for trends) %",
        "formula": "[Calculation_2171860980663762956] / ABS([{%%KPI6.PERF__REFERENCE_FOR_TRENDS%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_365",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652597252])\r When 1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25b2\"\r          end\r When 0 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25ba\"\r          end\r When -1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25bc\"\r          end\r Else \"-\"\r end",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_366",
        "name": "Total Paid (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980649070592])\r When 1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25b2\"\r          end\r When 0 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25ba\"\r          end\r When -1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25bc\"\r          end\r Else \"-\"\r end",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_367",
        "name": "Claims Reimbursed % (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652687365])\r When 1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25b2\"\r          end\r When 0 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25ba\"\r          end\r When -1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25bc\"\r          end\r Else \"-\"\r end",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_368",
        "name": "Average Days to Close (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652777478])\r When 1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25b2\"\r          end\r When 0 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25ba\"\r          end\r When -1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25bc\"\r          end\r Else \"-\"\r end",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_369",
        "name": "Nb Closed Claims (Closed) Perf. - Value vs Reference (shape)",
        "formula": "case sign([Calculation_2171860980652204033])\r When 1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25b2\"\r          end\r When 0 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u263b\" //[note pour DLL: \"TARGET-REACHED\" when ON or OFF, else if REVERSE \"TARGET-NOT-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25ba\"\r          end\r When -1 then\r          // TARGET MODE\r          If [Parameters].[LinPack_371749732845320988]=\"ACT_vs_TGT\" or [Parameters].[LinPack_371749732845320988]=\"YTDACT_vs_YTDTGT\" then \"\u25c6\" //[note pour DLL: \"TARGET-NOT-REACHED\" when ON or OFF, else if REVERSE \"TARGET-REACHED\"]  \r          // PERIOD COMPARISON\r          else \"\u25bc\"\r          end\r Else \"-\"\r end",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_370",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1] \r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_371",
        "name": "Total Paid (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2] \r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 2] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_372",
        "name": "Claims Reimbursed % (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3] \r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 3] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 3] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 3] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_373",
        "name": "Average Days to Close (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4] \r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1 4] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_374",
        "name": "Nb Closed Claims (Closed) Perf. - Reference",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1] \r WHEN \"CM_vs_PY\" THEN [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1] \r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.PERIOD__TARGET_CURRENT_PERIOD%%} 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_375",
        "name": "Nb Reimbursed Claims (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]\r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 1] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_376",
        "name": "Total Paid (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2]\r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 2] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 2] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_377",
        "name": "Claims Reimbursed % (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 3]\r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 3] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 3] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 3] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_378",
        "name": "Average Days to Close (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4]\r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1 4] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1 4] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_379",
        "name": "Nb Closed Claims (Closed) Perf. - Reference (for trends)",
        "formula": "CASE [Parameters].[LinPack_371749732845320988] \r WHEN \"CM_vs_PM\" THEN NULL\r WHEN \"CM_vs_PY\" THEN [{%%KPI6.YTD__PREVIOUS_YTD%%} 1]\r WHEN \"ACT_vs_TGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1] \r WHEN \"CYTD_vs_PYTD\" THEN [{%%KPI6.YTD__PREVIOUS_YTD_FOR_TRENDS%%} 1] \r WHEN \"YTDACT_vs_YTDTGT\" THEN [{%%KPI6.YTD__TARGET_CURRENT_YTD_FOR_TRENDS%%} 1] \r WHEN \"NONE\"  THEN NULL \r END",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_380",
        "name": "Nb Reimbursed Claims (Closed)  MTD   (Current Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_381",
        "name": "Total Paid (Closed)  MTD   (Current Month)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_382",
        "name": "Claims Reimbursed % (Closed)  MTD   (Current Month)",
        "formula": "ZN([{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1]) / ZN([{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_383",
        "name": "Average Days to Close (Closed)  MTD   (Current Month)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_384",
        "name": "Nb Closed Claims (Closed)  MTD   (Current Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_385",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_386",
        "name": "Total Paid (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_387",
        "name": "Claims Reimbursed % (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_388",
        "name": "Average Days to Close (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_389",
        "name": "Nb Closed Claims (Closed)  MTD  (Current vs Previous Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] - [{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_390",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_391",
        "name": "Total Paid (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 2] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_392",
        "name": "Claims Reimbursed % (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 3] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_393",
        "name": "Average Days to Close (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1 4] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_394",
        "name": "Nb Closed Claims (Closed)  MTD  (Current vs Previous Month) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD_vs_PREVIOUS_PERIOD%%} 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_395",
        "name": "Nb Reimbursed Claims (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_396",
        "name": "Total Paid (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_397",
        "name": "Claims Reimbursed % (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_398",
        "name": "Average Days to Close (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_399",
        "name": "Nb Closed Claims (Closed)  MTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] - [{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1]",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_400",
        "name": "Nb Reimbursed Claims (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_401",
        "name": "Total Paid (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 2] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_402",
        "name": "Claims Reimbursed % (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 3] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_403",
        "name": "Average Days to Close (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1 4] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_404",
        "name": "Nb Closed Claims (Closed)  MTD (Current vs Previous Year) %",
        "formula": "[{%%KPI6.PERIOD__CURRENT_YEAR_vs_PREVIOUS_YEAR%%} 1] / ABS([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_405",
        "name": "Nb Reimbursed Claims (Closed)  MTD   (Previous Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_406",
        "name": "Total Paid (Closed)  MTD   (Previous Month)",
        "formula": "SUM(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_407",
        "name": "Claims Reimbursed % (Closed)  MTD   (Previous Month)",
        "formula": "ZN([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1 1]) / ZN([{%%KPI6.PERIOD__PREVIOUS_PERIOD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_408",
        "name": "Average Days to Close (Closed)  MTD   (Previous Month)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_409",
        "name": "Nb Closed Claims (Closed)  MTD   (Previous Month)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [LinPack_392564468777001906] AND MONTH([Close Date]) = [LinPack_383655229264939448] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_410",
        "name": "Nb Reimbursed Claims (Closed)  MTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_411",
        "name": "Total Paid (Closed)  MTD  (Previous Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_412",
        "name": "Claims Reimbursed % (Closed)  MTD  (Previous Year)",
        "formula": "ZN([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1 1]) / ZN([{%%KPI6.PERIOD__PREVIOUS_YEAR%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_413",
        "name": "Average Days to Close (Closed)  MTD  (Previous Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_414",
        "name": "Nb Closed Claims (Closed)  MTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689]-1 AND MONTH([Close Date]) = [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_415",
        "name": "Nb Reimbursed Claims (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_416",
        "name": "Total Paid (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 2] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_417",
        "name": "Claims Reimbursed % (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 3] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_418",
        "name": "Average Days to Close (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1 4] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_419",
        "name": "Nb Closed Claims (Closed)  MTD Target (Current Month)",
        "formula": "[{%%KPI6.PERIOD__CURRENT_PERIOD%%} 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_420",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Current Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_421",
        "name": "Total Paid (Closed)  YTD  (Current Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_422",
        "name": "Claims Reimbursed % (Closed)  YTD  (Current Year)",
        "formula": "ZN([{%%KPI6.YTD__CURRENT_YTD%%} 1 1]) / ZN([{%%KPI6.YTD__CURRENT_YTD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_423",
        "name": "Average Days to Close (Closed)  YTD  (Current Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_424",
        "name": "Nb Closed Claims (Closed)  YTD  (Current Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_425",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_426",
        "name": "Total Paid (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_427",
        "name": "Claims Reimbursed % (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_428",
        "name": "Average Days to Close (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then WINDOW_MEDIAN([{%%KPI6.YTD__CURRENT_YTD%%} 1 4],-index(),0) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_429",
        "name": "Nb Closed Claims (Closed)  YTD  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_430",
        "name": "Nb Reimbursed Claims (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 1] - [{%%KPI6.PERF__REFERENCE%%} 1 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_431",
        "name": "Total Paid (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 2] - [{%%KPI6.PERF__REFERENCE%%} 1 2]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_432",
        "name": "Claims Reimbursed % (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 3] - [{%%KPI6.PERF__REFERENCE%%} 1 3]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_433",
        "name": "Average Days to Close (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1 4] - [{%%KPI6.PERF__REFERENCE%%} 1 4]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_434",
        "name": "Nb Closed Claims (Closed)  YTD (Current vs Previous Year)",
        "formula": "[{%%KPI6.PERF__KPI%%} 1] - [{%%KPI6.PERF__REFERENCE%%} 1]",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_435",
        "name": "Nb Reimbursed Claims (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652597252] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_436",
        "name": "Total Paid (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980649070592] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 2])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_437",
        "name": "Claims Reimbursed % (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652687365] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 3])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_438",
        "name": "Average Days to Close (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652777478] / ABS([{%%KPI6.PERF__REFERENCE%%} 1 4])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_439",
        "name": "Nb Closed Claims (Closed)  YTD (Current vs Previous Year) %",
        "formula": "[Calculation_2171860980652204033] / ABS([{%%KPI6.PERF__REFERENCE%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_440",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_257498309054353407] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_441",
        "name": "Total Paid (Closed)  YTD  (Previous Year)",
        "formula": "SUM(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_640031983728264934] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_442",
        "name": "Claims Reimbursed % (Closed)  YTD  (Previous Year)",
        "formula": "ZN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]) / ZN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_443",
        "name": "Average Days to Close (Closed)  YTD  (Previous Year)",
        "formula": "MEDIAN(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_545857431642676680] ELSE NULL END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_444",
        "name": "Nb Closed Claims (Closed)  YTD  (Previous Year)",
        "formula": "COUNTD(IF  YEAR([Close Date]) = [Parameters].[LinPack_061584200884467689] - 1 AND MONTH([Close Date]) <= [Parameters].[LinPack_361207028433950534] THEN [LinPack_398370742208982663] ELSE NULL END)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_445",
        "name": "Nb Reimbursed Claims (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_446",
        "name": "Total Paid (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_447",
        "name": "Claims Reimbursed % (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_448",
        "name": "Average Days to Close (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then WINDOW_MEDIAN([{%%KPI6.YTD__PREVIOUS_YTD%%} 1 4],-index(),0) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_449",
        "name": "Nb Closed Claims (Closed)  YTD  (Previous Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__PREVIOUS_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_450",
        "name": "Nb Reimbursed Claims (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_451",
        "name": "Total Paid (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 2] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_452",
        "name": "Claims Reimbursed % (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 3] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_453",
        "name": "Average Days to Close (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1 4] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_454",
        "name": "Nb Closed Claims (Closed)  YTD Target  (Current Year)",
        "formula": "[{%%KPI6.YTD__CURRENT_YTD%%} 1] * 0.98",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_455",
        "name": "Nb Reimbursed Claims (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_456",
        "name": "Total Paid (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 2]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_457",
        "name": "Claims Reimbursed % (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 1])/RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_458",
        "name": "Average Days to Close (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1 4]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      },
      {
        "id": "cf_459",
        "name": "Nb Closed Claims (Closed)  YTD Target  (Current Year) (for trends)",
        "formula": "IF attr(MONTH([Close Date]))<=[Parameters].[LinPack_361207028433950534] then RUNNING_SUM([{%%KPI6.YTD__TARGET_CURRENT_YTD%%} 1]) end",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Closed Claims by Agent  (by claim)"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "extract_table",
        "displayName": "Extract (Claims - Agent Performance.twbx)",
        "rowCount": 28500,
        "dataSource": "Hyper / Excel Extract",
        "columns": [
          {
            "name": "id",
            "type": "INTEGER"
          },
          {
            "name": "value",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "id": 101,
            "value": 4250.0
          },
          {
            "id": 102,
            "value": 1890.5
          },
          {
            "id": 103,
            "value": 3120.75
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
      "totalCalculatedFields": 7
    },
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
    "tables": [
      {
        "tableName": "brokerage_202001231040",
        "displayName": "brokerage_202001231040$ (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 12000,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
          }
        ]
      },
      {
        "tableName": "fees_202001231041",
        "displayName": "fees_202001231041$ (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 19400,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
          }
        ]
      },
      {
        "tableName": "'nn+en+ee indi bdgt -20012020 '",
        "displayName": "'NN+EN+EE Indi bdgt -20012020 $' (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 26800,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
          }
        ]
      },
      {
        "tableName": "invoice_202001231041",
        "displayName": "invoice_202001231041$ (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 34200,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
          }
        ]
      },
      {
        "tableName": "meeting_list_202001231041",
        "displayName": "meeting_list_202001231041$ (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 41600,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
          }
        ]
      },
      {
        "tableName": "gcrm_opportunity_202001231041",
        "displayName": "gcrm_opportunity_202001231041$ (brokerage_202001231040 (Multiple Connections))",
        "rowCount": 49000,
        "dataSource": "brokerage_202001231040 (Multiple Connections)",
        "columns": [
          {
            "name": "client_name",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_number",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_status",
            "type": "VARCHAR(100)"
          },
          {
            "name": "policy_start_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "policy_end_date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "product_group",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Account Exe ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Exe Name",
            "type": "VARCHAR(100)"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": "EXE-104",
            "Exe Name": "Sarah Jenkins"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": "EXE-108",
            "Exe Name": "Michael Chang"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Renewed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": "EXE-112",
            "Exe Name": "David Ross"
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
      "totalCalculatedFields": 6
    },
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
        "id": "cf_2",
        "name": "True",
        "formula": "True",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Age"
        ]
      },
      {
        "id": "cf_3",
        "name": "False",
        "formula": "False",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Age"
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
      "totalCalculatedFields": 6
    },
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
        "id": "cf_2",
        "name": "True",
        "formula": "True",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Age"
        ]
      },
      {
        "id": "cf_3",
        "name": "False",
        "formula": "False",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Age"
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
  "cu1": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 12,
      "totalTables": 1,
      "totalCalculatedFields": 15
    },
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
          "Aging Bins"
        ]
      },
      {
        "id": "cf_8",
        "name": "SLA Pct",
        "formula": "SUM(IF [SLA Status] = 'Within SLA' THEN 1.0 ELSE 0 END) / SUM(IF [SLA Status] = 'Within SLA' OR [SLA Status] = 'Outside SLA' THEN 1.0 ELSE 0 END)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_9",
        "name": "Is Open",
        "formula": "[Case Status] <> 'Closed'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_10",
        "name": "Is Internal Pending",
        "formula": "[Case Status] = 'Internal Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_11",
        "name": "Is External Pending",
        "formula": "[Case Status] = 'External Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_12",
        "name": "Is Others Pending",
        "formula": "[Case Status] = 'Others Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
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
      },
      {
        "id": "cf_15",
        "name": "MIN(0)",
        "formula": "MIN(0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "KPI - Received"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "beneficiary_cases#csv",
        "displayName": "beneficiary_cases#csv (beneficiary_cases)",
        "rowCount": 12000,
        "dataSource": "beneficiary_cases",
        "columns": [
          {
            "name": "Case ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Case Created Date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Business",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Master Work Category",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Master Work Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Work Category",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Work Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "SEC Market Ind",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Case ID": "CASE-77102",
            "Case Created Date": "2023-04-10",
            "Business": "Life & Annuity",
            "Master Work Category": "Claims",
            "Master Work Type": "Death Benefit",
            "Work Category": "Verification",
            "Work Type": "Document Review",
            "SEC Market Ind": "Y"
          },
          {
            "Case ID": "CASE-77103",
            "Case Created Date": "2023-04-12",
            "Business": "Retirement",
            "Master Work Category": "Servicing",
            "Master Work Type": "Beneficiary Change",
            "Work Category": "Processing",
            "Work Type": "Record Update",
            "SEC Market Ind": "N"
          },
          {
            "Case ID": "CASE-77104",
            "Case Created Date": "2023-04-15",
            "Business": "Life & Annuity",
            "Master Work Category": "Inquiry",
            "Master Work Type": "Policy Status",
            "Work Category": "Customer Service",
            "Work Type": "Inbound Call",
            "SEC Market Ind": "N"
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
      "totalCalculatedFields": 16
    },
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
        "id": "cf_9",
        "name": "Is Open",
        "formula": "[Case Status] <> 'Closed'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_10",
        "name": "Is Internal Pending",
        "formula": "[Case Status] = 'Internal Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_11",
        "name": "Is External Pending",
        "formula": "[Case Status] = 'External Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_12",
        "name": "Is Others Pending",
        "formula": "[Case Status] = 'Others Pending'",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Aging Bins"
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
      },
      {
        "id": "cf_15",
        "name": "Case Month",
        "formula": "DATETRUNC('month', [Case Created Date])",
        "role": "dimension",
        "datatype": "real",
        "usedInSheets": [
          "Aging Bins"
        ]
      },
      {
        "id": "cf_16",
        "name": "MIN(0)",
        "formula": "MIN(0)",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "KPI - Received"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "beneficiary_cases#csv",
        "displayName": "beneficiary_cases#csv (beneficiary_cases)",
        "rowCount": 12000,
        "dataSource": "beneficiary_cases",
        "columns": [
          {
            "name": "Case ID",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Case Created Date",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Business",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Master Work Category",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Master Work Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "Work Category",
            "type": "NUMERIC(14,2)"
          },
          {
            "name": "Work Type",
            "type": "VARCHAR(100)"
          },
          {
            "name": "SEC Market Ind",
            "type": "NUMERIC(14,2)"
          }
        ],
        "sampleRows": [
          {
            "Case ID": "CASE-77102",
            "Case Created Date": "2023-04-10",
            "Business": "Life & Annuity",
            "Master Work Category": "Claims",
            "Master Work Type": "Death Benefit",
            "Work Category": "Verification",
            "Work Type": "Document Review",
            "SEC Market Ind": "Y"
          },
          {
            "Case ID": "CASE-77103",
            "Case Created Date": "2023-04-12",
            "Business": "Retirement",
            "Master Work Category": "Servicing",
            "Master Work Type": "Beneficiary Change",
            "Work Category": "Processing",
            "Work Type": "Record Update",
            "SEC Market Ind": "N"
          },
          {
            "Case ID": "CASE-77104",
            "Case Created Date": "2023-04-15",
            "Business": "Life & Annuity",
            "Master Work Category": "Inquiry",
            "Master Work Type": "Policy Status",
            "Work Category": "Customer Service",
            "Work Type": "Inbound Call",
            "SEC Market Ind": "N"
          }
        ]
      }
    ]
  },
  "c4": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 8,
      "totalTables": 2,
      "totalCalculatedFields": 7
    },
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
        "id": "calc_1",
        "name": "Select District",
        "formula": "\"All\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "calc_2",
        "name": "Calculation1",
        "formula": "WINDOW_SUM([Calculation_551409483925925928], -2, 0)",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "calc_3",
        "name": "- Claim Cost",
        "formula": "- SUM([Claims Cost])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "calc_4",
        "name": "District Filter",
        "formula": "[District Name] = [Parameters].[Parameter 1] or [Parameters].[Parameter 1] = \"All\"",
        "role": "dimension",
        "datatype": "boolean",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "calc_5",
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
        "id": "calc_6",
        "name": "Select District",
        "formula": "\"All\"",
        "role": "measure",
        "datatype": "string",
        "usedInSheets": [
          "Benefit Nature Analysis"
        ]
      },
      {
        "id": "calc_7",
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
            "Claims Cost": 320.0,
            "Provider Name": "Pacific Health Clinic",
            "District Name": "District 3 - Coastal",
            "Diagnosis Name": "Hypertensive Heart Disease",
            "Date Paid": "2023-06-18",
            "Dep Type": "Spouse",
            "Ben Plan": 102,
            "Calculation1": 320.0
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
            "Claims Cost": 180.0,
            "Provider Name": "Metro Dental Group",
            "District Name": "District 1 - Metro",
            "Diagnosis Name": "Routine Dental Exam",
            "Date Paid": "2023-06-20",
            "Dep Type": "Child",
            "Ben Plan": 101,
            "Calculation1": 180.0
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
  "d7": {
    "summary": {
      "totalDashboards": 1,
      "totalWorksheets": 9,
      "totalTables": 1,
      "totalCalculatedFields": 7
    },
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
        "id": "calc_1",
        "name": "zero",
        "formula": "0",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_2",
        "name": "Achieved",
        "formula": "SUM([Amount (fees!202001231041)])+SUM([Amount])",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_3",
        "name": "Achieved_Cross_Sell",
        "formula": "SUM([Amount]) - 21547181",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_4",
        "name": "Achieved_Renewal",
        "formula": "SUM([Amount]) - 16755532",
        "role": "measure",
        "datatype": "real",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_5",
        "name": "Invoice_cross_sell",
        "formula": "SUM([Amount (invoice!202001231041)]) - 9412706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_6",
        "name": "Invoice_new",
        "formula": "SUM([Amount (invoice!202001231041)]) - 11692706",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "New"
        ]
      },
      {
        "id": "calc_7",
        "name": "Invoice_Renewal",
        "formula": "SUM([Amount (invoice!202001231041)]) - 4322211",
        "role": "measure",
        "datatype": "integer",
        "usedInSheets": [
          "New"
        ]
      }
    ],
    "tables": [
      {
        "tableName": "brokerage_202001231040_(multiple_connections)",
        "displayName": "brokerage_202001231040 (Multiple Connections)",
        "rowCount": 1850,
        "dataSource": "Tableau Extract (.hyper)",
        "columns": [
          {
            "name": "client_name",
            "type": "string"
          },
          {
            "name": "policy_number",
            "type": "string"
          },
          {
            "name": "policy_status",
            "type": "string"
          },
          {
            "name": "policy_start_date",
            "type": "date"
          },
          {
            "name": "policy_end_date",
            "type": "date"
          },
          {
            "name": "product_group",
            "type": "string"
          },
          {
            "name": "Account Exe ID",
            "type": "integer"
          },
          {
            "name": "Exe Name",
            "type": "string"
          },
          {
            "name": "branch_name",
            "type": "string"
          },
          {
            "name": "solution_group",
            "type": "string"
          },
          {
            "name": "income_class",
            "type": "string"
          },
          {
            "name": "Amount",
            "type": "real"
          },
          {
            "name": "income_due_date",
            "type": "date"
          },
          {
            "name": "revenue_transaction_type",
            "type": "string"
          },
          {
            "name": "renewal_status",
            "type": "string"
          },
          {
            "name": "lapse_reason",
            "type": "string"
          },
          {
            "name": "last_updated_date",
            "type": "date"
          },
          {
            "name": "client_name",
            "type": "string"
          },
          {
            "name": "branch_name",
            "type": "string"
          },
          {
            "name": "solution_group",
            "type": "string"
          }
        ],
        "sampleRows": [
          {
            "client_name": "Apex Logistics Corp",
            "policy_number": "POL-90214",
            "policy_status": "Active",
            "policy_start_date": "2023-01-15",
            "policy_end_date": "2024-01-14",
            "product_group": "Commercial Property",
            "Account Exe ID": 104,
            "Exe Name": "Sarah Jenkins",
            "branch_name": "Northeast Regional",
            "solution_group": "Commercial Lines",
            "income_class": "Brokerage Fee",
            "Amount": 14500.0,
            "income_due_date": "2023-02-01",
            "revenue_transaction_type": "Direct Bill",
            "renewal_status": "Renewed",
            "lapse_reason": "N/A",
            "last_updated_date": "2023-12-31"
          },
          {
            "client_name": "Beacon Retail Group",
            "policy_number": "POL-90388",
            "policy_status": "Active",
            "policy_start_date": "2023-03-01",
            "policy_end_date": "2024-02-28",
            "product_group": "General Liability",
            "Account Exe ID": 108,
            "Exe Name": "Michael Chang",
            "branch_name": "Midwest Central",
            "solution_group": "Commercial Lines",
            "income_class": "Commission",
            "Amount": 8900.5,
            "income_due_date": "2023-03-15",
            "revenue_transaction_type": "Agency Bill",
            "renewal_status": "Renewed",
            "lapse_reason": "N/A",
            "last_updated_date": "2023-12-31"
          },
          {
            "client_name": "Crestview Health Systems",
            "policy_number": "POL-88412",
            "policy_status": "Lapsed",
            "policy_start_date": "2022-11-01",
            "policy_end_date": "2023-10-31",
            "product_group": "Workers Comp",
            "Account Exe ID": 112,
            "Exe Name": "David Ross",
            "branch_name": "Southern District",
            "solution_group": "Specialty Risk",
            "income_class": "Brokerage Fee",
            "Amount": 22400.0,
            "income_due_date": "2022-11-15",
            "revenue_transaction_type": "Direct Bill",
            "renewal_status": "Non-Renewed",
            "lapse_reason": "Price Competition",
            "last_updated_date": "2023-11-05"
          }
        ]
      }
    ]
  },
  "d11": SALES_INSURANCE_DETAIL,
};
