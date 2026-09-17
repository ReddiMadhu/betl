import {
  generateAssessmentZip,
  generateRationalizationZip,
  getDiscoveredBiAssets,
  getCanonicalEtlAssets,
} from './documentationGenerator';
import type { DocGenerationProgress } from './documentationGenerator';
import { recommendations } from '../data/rationalizationData';

export type DownloadProgress = DocGenerationProgress;

/**
 * Generates and downloads the full documentation package as a structured ZIP archive in-memory.
 * Uses the live, authoritative application data models directly, ensuring genuine Markdown specifications
 * and accurate Excel workbooks without network fetch failures or HTML fallback corruption.
 */
export async function downloadDocumentationZip(
  type: 'assessment' | 'rationalization',
  onProgress?: (p: DownloadProgress) => void,
  subType?: 'bi' | 'etl'
): Promise<void> {
  try {
    onProgress?.({
      status: 'zipping',
      progress: 5,
      currentFile: `Initializing ${type} documentation generator...`,
    });

    let zipBlob: Blob;
    if (type === 'assessment') {
      zipBlob = await generateAssessmentZip(onProgress, subType);
    } else {
      zipBlob = await generateRationalizationZip(onProgress, subType);
    }

    // Trigger browser download
    onProgress?.({
      status: 'downloading',
      progress: 98,
      currentFile: 'Starting download...',
    });

    const subLabel = subType ? `_${subType.toUpperCase()}` : '';
    const typeLabel = type === 'assessment' ? 'Assessment' : 'Rationalization';
    const fileName = `${typeLabel}${subLabel}_Documentation.zip`;

    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onProgress?.({
      status: 'completed',
      progress: 100,
      currentFile: 'Download complete!',
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error during download';
    console.error('Download documentation failed:', error);
    onProgress?.({
      status: 'error',
      progress: 0,
      errorMessage: msg,
    });
    throw error;
  }
}

/**
 * Returns document counts directly derived from the live application data models.
 */
export async function getDocumentCounts(): Promise<{
  biAssessmentCount: number;
  etlAssessmentCount: number;
  sourceToTargetCount: number;
  biRationalizationCount: number;
  etlRationalizationCount: number;
}> {
  const biAssessmentCount = getDiscoveredBiAssets().length; // 23
  const etlAssessmentCount = getCanonicalEtlAssets().length; // 8
  const sourceToTargetCount = etlAssessmentCount; // 8

  const biRationalizationCount = recommendations.filter((r) => r.category.includes('bi')).length; // 21
  const etlRationalizationCount = recommendations.filter((r) => r.category.includes('etl')).length; // 8

  return {
    biAssessmentCount,
    etlAssessmentCount,
    sourceToTargetCount,
    biRationalizationCount,
    etlRationalizationCount,
  };
}

