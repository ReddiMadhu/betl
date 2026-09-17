/**
 * Utility functions for viewing and downloading End-to-End Lineage SVGs.
 *
 * Solves the Azure Storage Account deployment issue:
 * When static websites are deployed to Azure Blob Storage, SVG files are often served with
 * 'application/octet-stream' instead of 'image/svg+xml', causing browsers to download or show blank pages.
 * By embedding the SVG content directly into client-generated Blob URLs (or in-app modals),
 * the browser renders the SVG directly with zero dependency on cloud server headers.
 */

export function downloadSvgFile(svgContent: string, filename = 'End_To_End_Lineage.svg') {
  const cleanFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = cleanFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function openSvgInNewTab(svgContent: string, title = 'End-to-End Lineage DAG') {
  const safeTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const downloadName = title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.svg';

  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} — Lineage Viewer</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2338bdf8'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>">
  <style>
    :root {
      --bg: #070b14;
      --card-bg: #0d1326;
      --border: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0284c7;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: auto;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: rgba(13, 19, 38, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--accent);
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 4px 8px;
      border-radius: 6px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border);
      background: #131d36;
      color: var(--text);
      transition: all 0.15s ease;
    }
    button:hover {
      background: #1e2c4f;
      border-color: #334155;
    }
    button.primary {
      background: var(--accent);
      color: #04101e;
      border-color: var(--accent);
    }
    button.primary:hover {
      background: var(--accent-hover);
      color: #ffffff;
    }
    .canvas-container {
      flex: 1;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: auto;
    }
    .svg-wrapper {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
      transform-origin: top left;
      transition: transform 0.15s ease-out;
      width: fit-content;
      max-width: none;
    }
    .svg-wrapper svg {
      display: block;
      width: 100%;
      min-width: 1300px;
      height: auto;
    }
    .zoom-indicator {
      font-size: 12px;
      color: var(--text-muted);
      min-width: 48px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-left">
      <span class="badge">Lineage DAG</span>
      <h1 class="title">${safeTitle}</h1>
    </div>
    <div class="actions">
      <button onclick="zoomOut()" title="Zoom Out (Alt + -)">-</button>
      <span class="zoom-indicator" id="zoomLevel">100%</span>
      <button onclick="zoomIn()" title="Zoom In (Alt + +)">+</button>
      <button onclick="resetZoom()" title="Reset Zoom">Reset</button>
      <button onclick="fitWidth()" title="Fit to Screen Width">Fit Width</button>
      <button class="primary" onclick="downloadFile()" title="Download SVG">Download SVG</button>
    </div>
  </header>

  <main class="canvas-container" id="container">
    <div class="svg-wrapper" id="svgWrapper">
      ${svgContent}
    </div>
  </main>

  <script>
    let currentZoom = 1;
    const wrapper = document.getElementById('svgWrapper');
    const zoomText = document.getElementById('zoomLevel');

    function updateZoom() {
      wrapper.style.transform = 'scale(' + currentZoom + ')';
      zoomText.textContent = Math.round(currentZoom * 100) + '%';
    }

    function zoomIn() {
      currentZoom = Math.min(2.5, currentZoom + 0.15);
      updateZoom();
    }

    function zoomOut() {
      currentZoom = Math.max(0.4, currentZoom - 0.15);
      updateZoom();
    }

    function resetZoom() {
      currentZoom = 1;
      updateZoom();
    }

    function fitWidth() {
      const container = document.getElementById('container');
      const svg = wrapper.querySelector('svg');
      if (container && svg) {
        const availableWidth = container.clientWidth - 48;
        const svgWidth = svg.viewBox ? svg.viewBox.baseVal.width : svg.clientWidth || 1600;
        if (svgWidth > 0) {
          currentZoom = Math.max(0.3, Math.min(1.5, availableWidth / svgWidth));
          updateZoom();
        }
      }
    }

    function downloadFile() {
      const svg = wrapper.querySelector('svg');
      const serializer = new XMLSerializer();
      const str = serializer.serializeToString(svg);
      const blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '${downloadName}';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
    });
  </script>
</body>
</html>`;

  const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const openedWindow = window.open(url, '_blank');

  // Fallback in case popup blocker intercepts
  if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
    // Navigate or create direct anchor click
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Revoke URL after a comfortable delay so the new tab finishes loading
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
