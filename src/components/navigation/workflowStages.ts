import { Compass, GitMerge, ArrowRightLeft } from 'lucide-react';

export type ViewState =
  | 'home'
  | 'assessment'
  | 'results'
  | 'rationalization'
  | 'rationalization-results'
  | 'migration'
  | 'migration-loading'
  | 'migration-results';

export interface StageDefinition {
  id: 'discovery' | 'rationalization' | 'migration';
  stageNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: typeof Compass;
  views: ViewState[];
  defaultView: (visited: Set<ViewState>) => ViewState;
  subItems: {
    id: ViewState;
    label: string;
    description: string;
  }[];
}

export const WORKFLOW_STAGES: StageDefinition[] = [
  {
    id: 'discovery',
    stageNumber: 1,
    title: 'Discovery & Intelligence',
    shortTitle: 'Discovery & Intel',
    subtitle: 'Scan platforms & catalog',
    icon: Compass,
    views: ['assessment', 'results'],
    defaultView: (visited) => (visited.has('results') ? 'results' : 'assessment'),
    subItems: [
      { id: 'assessment', label: 'Discovery Scan', description: 'Live platform crawler' },
      { id: 'results', label: 'Catalog & Intelligence', description: '25 assets mapped' },
    ],
  },
  {
    id: 'rationalization',
    stageNumber: 2,
    title: 'Rationalization',
    shortTitle: 'Rationalization',
    subtitle: 'Analyze overlap & score',
    icon: GitMerge,
    views: ['rationalization', 'rationalization-results'],
    defaultView: (visited) => (visited.has('rationalization-results') ? 'rationalization-results' : 'rationalization'),
    subItems: [
      { id: 'rationalization', label: 'Analysis Engine', description: 'Rule evaluation' },
      { id: 'rationalization-results', label: 'Recommendations', description: 'Merge & decommission' },
    ],
  },
  {
    id: 'migration',
    stageNumber: 3,
    title: 'Migration',
    shortTitle: 'Migration',
    subtitle: 'Select waves & migrate',
    icon: ArrowRightLeft,
    views: ['migration', 'migration-loading', 'migration-results'],
    defaultView: (visited) => {
      if (visited.has('migration-results')) return 'migration-results';
      if (visited.has('migration-loading')) return 'migration-loading';
      return 'migration';
    },
    subItems: [
      { id: 'migration', label: 'Wave Selection', description: 'Choose target wave' },
      { id: 'migration-loading', label: 'Migration Execution', description: 'Active conversion' },
      { id: 'migration-results', label: 'Migration Results', description: 'Outcome verification' },
    ],
  },
];
