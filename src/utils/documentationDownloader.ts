import JSZip from 'jszip';

export interface DownloadProgress {
  status: 'idle' | 'fetching' | 'zipping' | 'downloading' | 'completed' | 'error';
  progress: number;
  currentFile?: string;
  errorMessage?: string;
}

interface ManifestFile {
  path: string;
  url: string;
  size?: number;
}

interface Manifest {
  generatedAt: string;
  assessment: ManifestFile[];
  rationalization: ManifestFile[];
}

/**
 * Downloads the full documentation package as a structured ZIP archive.
 * Fetches all static files from `/documentation/assessment` or `/documentation/rationalization`,
 * bundles them in JSZip, and saves to the user's computer.
 */
export async function downloadDocumentationZip(
  type: 'assessment' | 'rationalization',
  onProgress?: (p: DownloadProgress) => void
): Promise<void> {
  try {
    onProgress?.({
      status: 'fetching',
      progress: 5,
      currentFile: 'Fetching documentation manifest...',
    });

    // 1. Fetch manifest.json to get all static file paths
    const manifestRes = await fetch('/documentation/manifest.json');
    if (!manifestRes.ok) {
      throw new Error(`Failed to load documentation manifest (${manifestRes.status})`);
    }

    const manifest: Manifest = await manifestRes.json();
    const files = type === 'assessment' ? manifest.assessment : manifest.rationalization;

    if (!files || files.length === 0) {
      throw new Error(`No documentation files found for ${type}`);
    }

    const zip = new JSZip();
    const totalFiles = files.length;
    let loadedFiles = 0;

    // 2. Fetch each static file and add to ZIP
    for (const file of files) {
      onProgress?.({
        status: 'fetching',
        progress: Math.round(10 + (loadedFiles / totalFiles) * 60),
        currentFile: file.path,
      });

      const res = await fetch(file.url);
      if (!res.ok) {
        console.warn(`Could not fetch ${file.url}, skipping...`);
        continue;
      }

      const blob = await res.blob();
      // Add to ZIP maintaining directory path
      zip.file(file.path, blob);
      loadedFiles++;
    }

    // 3. Compress ZIP
    onProgress?.({
      status: 'zipping',
      progress: 75,
      currentFile: 'Compressing files into ZIP archive...',
    });

    const zipBlob = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      },
      (metadata) => {
        onProgress?.({
          status: 'zipping',
          progress: Math.round(75 + (metadata.percent / 100) * 20),
          currentFile: `Compressing: ${Math.round(metadata.percent)}%`,
        });
      }
    );

    // 4. Trigger browser download
    onProgress?.({
      status: 'downloading',
      progress: 98,
      currentFile: 'Starting download...',
    });

    const fileName =
      type === 'assessment'
        ? 'BI_and_ETL_Assessment_Documentation.zip'
        : 'BI_and_ETL_Rationalization_Documentation.zip';

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
