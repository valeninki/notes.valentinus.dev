#!/usr/bin/env node
import workerpool from "workerpool"
const cacheFile = "./.quartz-cache/transpiled-worker.mjs"
<<<<<<< HEAD
const { parseMarkdown, processHtml } = await import(cacheFile)
workerpool.worker({
  parseMarkdown,
  processHtml,
=======
const { parseFiles } = await import(cacheFile)
workerpool.worker({
  parseFiles,
>>>>>>> 02f2423 (Initial commit)
})
