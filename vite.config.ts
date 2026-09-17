import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface SttmFileInfo {
  relPath: string
  url: string
  filename: string
  size: number
  lastModified: string
}

function scanManualSttmFiles(): SttmFileInfo[] {
  const publicAssessmentDir = path.resolve(__dirname, 'public', 'documentation', 'assessment')
  const etlBaseDir = path.join(publicAssessmentDir, 'ETL')
  const manualFiles: SttmFileInfo[] = []

  if (!fs.existsSync(etlBaseDir)) return manualFiles

  function scan(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        scan(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.xlsx')) {
        // Exclude standard generated _Assessment.xlsx unless explicitly named with STTM
        const isGeneratedAssessment = entry.name.endsWith('_Assessment.xlsx') && !/sttm/i.test(entry.name)
        if (!isGeneratedAssessment) {
          const relPath = path.relative(publicAssessmentDir, fullPath).replace(/\\/g, '/')
          const stat = fs.statSync(fullPath)
          manualFiles.push({
            relPath, // e.g. "ETL/Claims/Alteryx/Workflow_01/Workflow_01_STTM.xlsx"
            url: `/documentation/assessment/${relPath}`,
            filename: entry.name,
            size: stat.size,
            lastModified: stat.mtime.toISOString(),
          })
        }
      }
    }
  }

  scan(etlBaseDir)
  return manualFiles
}

function updateSttmManifestFiles() {
  try {
    const publicDocDir = path.resolve(__dirname, 'public', 'documentation')
    if (!fs.existsSync(publicDocDir)) {
      fs.mkdirSync(publicDocDir, { recursive: true })
    }

    const files = scanManualSttmFiles()
    const sttmManifestPath = path.join(publicDocDir, 'sttm-manifest.json')
    fs.writeFileSync(
      sttmManifestPath,
      JSON.stringify({ generatedAt: new Date().toISOString(), count: files.length, files }, null, 2),
      'utf-8'
    )

    // Also update main manifest if it exists
    const manifestPath = path.join(publicDocDir, 'manifest.json')
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
        manifest.manualSttmFiles = files
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8')
      } catch {
        // ignore parse error
      }
    }
  } catch (err) {
    console.warn('[sttm-discovery] Error updating STTM manifest:', err)
  }
}

function sttmDiscoveryPlugin(): Plugin {
  return {
    name: 'sttm-discovery-plugin',
    buildStart() {
      updateSttmManifestFiles()
    },
    configureServer(server) {
      // Initialize on dev server start
      updateSttmManifestFiles()

      // Watch for changes under public/documentation/assessment/ETL
      const etlWatchPath = path.resolve(__dirname, 'public', 'documentation', 'assessment', 'ETL')
      if (fs.existsSync(etlWatchPath)) {
        server.watcher.add(etlWatchPath)
      }

      server.watcher.on('all', (_event, changedPath) => {
        if (changedPath.includes('documentation') && changedPath.includes('ETL') && changedPath.endsWith('.xlsx')) {
          updateSttmManifestFiles()
        }
      })

      // Live dev API endpoint
      server.middlewares.use('/api/sttm-manifest', (_req, res) => {
        const files = scanManualSttmFiles()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ generatedAt: new Date().toISOString(), count: files.length, files }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), sttmDiscoveryPlugin()],
})
