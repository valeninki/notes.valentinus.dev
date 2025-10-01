#!/usr/bin/env node
import workerpool from "workerpool"
const cacheFile = "./.quartz-cache/transpiled-worker.mjs"
<<<<<<< HEAD
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
=======
const { parseFiles } = await import(cacheFile)
workerpool.worker({
  parseFiles,
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
})
