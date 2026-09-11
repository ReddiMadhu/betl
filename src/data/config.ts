import thoughtspotLogo from '../assets/logos/thoughtspot.svg';
import powerbiLogo from '../assets/logos/powerbi.svg';
import tableauLogo from '../assets/logos/tableau.svg';
import microstrategyLogo from '../assets/logos/microstrategy.svg';
import alteryxLogo from '../assets/logos/alteryx.svg';
import pythonLogo from '../assets/logos/python.svg';

export type TechnologyStatus = 'connected' | 'available' | 'selected';
export type TechnologyCategory = 'BI' | 'ETL';

export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  logo: string;
  status: TechnologyStatus;
}

export const technologies: Technology[] = [
  {
    id: 'thoughtspot',
    name: 'ThoughtSpot',
    category: 'BI',
    logo: thoughtspotLogo,
    status: 'connected',
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'BI',
    logo: powerbiLogo,
    status: 'connected',
  },
  {
    id: 'tableau',
    name: 'Tableau',
    category: 'BI',
    logo: tableauLogo,
    status: 'connected',
  },
  {
    id: 'microstrategy',
    name: 'MicroStrategy',
    category: 'BI',
    logo: microstrategyLogo,
    status: 'connected',
  },
  {
    id: 'alteryx',
    name: 'Alteryx',
    category: 'ETL',
    logo: alteryxLogo,
    status: 'connected',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'ETL',
    logo: pythonLogo,
    status: 'available',
  },
];

export type AgentStatus = 'ready' | 'active' | 'complete';

export interface Agent {
  step: number;
  id: string;
  name: string;
  label: string;
  description: string;
  status: AgentStatus;
}

export const agents: Agent[] = [
  {
    step: 1,
    id: 'discovery',
    name: 'Discovery & Intelligence',
    label: 'DISCOVER',
    description:
      'Discover and understand existing BI/ETL assets, metadata, dependencies, usage patterns, and relationships.',
    status: 'active',
  },
  {
    step: 2,
    id: 'rationalization',
    name: 'Rationalization',
    label: 'RATIONALIZE',
    description:
      'Analyze discovered assets, identify redundancy, and recommend what to retain, consolidate, redesign, or retire.',
    status: 'ready',
  },
  {
    step: 3,
    id: 'migration',
    name: 'Migration',
    label: 'MIGRATE',
    description:
      'Plan modernization paths, transformation requirements, dependency mapping, and target platform selection.',
    status: 'ready',
  },
];

export interface IngestionStat {
  id: string;
  name: string;
  logo?: string;
  count: number;
  suffix: string;
}

export const ingestionStats: IngestionStat[] = [
  {
    id: 'powerbi',
    name: 'Power BI',
    logo: powerbiLogo,
    count: 10,
    suffix: 'dashboards ingested',
  },
  {
    id: 'microstrategy',
    name: 'MicroStrategy',
    logo: microstrategyLogo,
    count: 5,
    suffix: 'assets ingested',
  },
  {
    id: 'tableau',
    name: 'Tableau',
    logo: tableauLogo,
    count: 2,
    suffix: 'assets ingested',
  },
];

export const totalAssets = 25;
