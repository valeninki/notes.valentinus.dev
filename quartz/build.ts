import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import path from "path"
import { PerfTimer } from "./util/perf"
<<<<<<< HEAD
<<<<<<< HEAD
import { rm } from "fs/promises"
import { GlobbyFilterFunction, isGitIgnored } from "globby"
import { styleText } from "util"
=======
import { rimraf } from "rimraf"
import { GlobbyFilterFunction, isGitIgnored } from "globby"
import chalk from "chalk"
>>>>>>> 02f2423 (Initial commit)
=======
import { rimraf } from "rimraf"
import { GlobbyFilterFunction, isGitIgnored } from "globby"
import chalk from "chalk"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz.config"
<<<<<<< HEAD
<<<<<<< HEAD
import { FilePath, joinSegments, slugifyFilePath } from "./util/path"
=======
import { FilePath, FullSlug, joinSegments, slugifyFilePath } from "./util/path"
>>>>>>> 02f2423 (Initial commit)
=======
import { FilePath, FullSlug, joinSegments, slugifyFilePath } from "./util/path"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import chokidar from "chokidar"
import { ProcessedContent } from "./plugins/vfile"
import { Argv, BuildCtx } from "./util/ctx"
import { glob, toPosixPath } from "./util/glob"
import { trace } from "./util/trace"
import { options } from "./util/sourcemap"
import { Mutex } from "async-mutex"
<<<<<<< HEAD
<<<<<<< HEAD
import { getStaticResourcesFromPlugins } from "./plugins"
import { randomIdNonSecure } from "./util/random"
import { ChangeEvent } from "./plugins/types"
import { minimatch } from "minimatch"

type ContentMap = Map<
  FilePath,
  | {
      type: "markdown"
      content: ProcessedContent
    }
  | {
      type: "other"
    }
>
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import DepGraph from "./depgraph"
import { getStaticResourcesFromPlugins } from "./plugins"

type Dependencies = Record<string, DepGraph<FilePath> | null>
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

type BuildData = {
  ctx: BuildCtx
  ignored: GlobbyFilterFunction
  mut: Mutex
<<<<<<< HEAD
<<<<<<< HEAD
  contentMap: ContentMap
  changesSinceLastBuild: Record<FilePath, ChangeEvent["type"]>
  lastBuildMs: number
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  initialSlugs: FullSlug[]
  // TODO merge contentMap and trackedAssets
  contentMap: Map<FilePath, ProcessedContent>
  trackedAssets: Set<FilePath>
  toRebuild: Set<FilePath>
  toRemove: Set<FilePath>
  lastBuildMs: number
  dependencies: Dependencies
}

type FileEvent = "add" | "change" | "delete"

function newBuildId() {
  return new Date().toISOString()
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
}

async function buildQuartz(argv: Argv, mut: Mutex, clientRefresh: () => void) {
  const ctx: BuildCtx = {
<<<<<<< HEAD
<<<<<<< HEAD
    buildId: randomIdNonSecure(),
    argv,
    cfg,
    allSlugs: [],
    allFiles: [],
    incremental: false,
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    buildId: newBuildId(),
    argv,
    cfg,
    allSlugs: [],
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }

  const perf = new PerfTimer()
  const output = argv.output

  const pluginCount = Object.values(cfg.plugins).flat().length
  const pluginNames = (key: "transformers" | "filters" | "emitters") =>
    cfg.plugins[key].map((plugin) => plugin.name)
  if (argv.verbose) {
    console.log(`Loaded ${pluginCount} plugins`)
    console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`)
    console.log(`  Filters: ${pluginNames("filters").join(", ")}`)
    console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`)
  }

  const release = await mut.acquire()
  perf.addEvent("clean")
<<<<<<< HEAD
<<<<<<< HEAD
  await rm(output, { recursive: true, force: true })
=======
  await rimraf(path.join(output, "*"), { glob: true })
>>>>>>> 02f2423 (Initial commit)
=======
  await rimraf(path.join(output, "*"), { glob: true })
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`)

  perf.addEvent("glob")
  const allFiles = await glob("**/*.*", argv.directory, cfg.configuration.ignorePatterns)
<<<<<<< HEAD
<<<<<<< HEAD
  const markdownPaths = allFiles.filter((fp) => fp.endsWith(".md")).sort()
  console.log(
    `Found ${markdownPaths.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = markdownPaths.map((fp) => joinSegments(argv.directory, fp) as FilePath)
  ctx.allFiles = allFiles
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const fps = allFiles.filter((fp) => fp.endsWith(".md")).sort()
  console.log(
    `Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`,
  )

  const filePaths = fps.map((fp) => joinSegments(argv.directory, fp) as FilePath)
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  ctx.allSlugs = allFiles.map((fp) => slugifyFilePath(fp as FilePath))

  const parsedFiles = await parseMarkdown(ctx, filePaths)
  const filteredContent = filterContent(ctx, parsedFiles)

<<<<<<< HEAD
<<<<<<< HEAD
  await emitContent(ctx, filteredContent)
  console.log(
    styleText("green", `Done processing ${markdownPaths.length} files in ${perf.timeSince()}`),
  )
  release()

  if (argv.watch) {
    ctx.incremental = true
    return startWatching(ctx, mut, parsedFiles, clientRefresh)
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const dependencies: Record<string, DepGraph<FilePath> | null> = {}

  // Only build dependency graphs if we're doing a fast rebuild
  if (argv.fastRebuild) {
    const staticResources = getStaticResourcesFromPlugins(ctx)
    for (const emitter of cfg.plugins.emitters) {
      dependencies[emitter.name] =
        (await emitter.getDependencyGraph?.(ctx, filteredContent, staticResources)) ?? null
    }
  }

  await emitContent(ctx, filteredContent)
  console.log(chalk.green(`Done processing ${fps.length} files in ${perf.timeSince()}`))
  release()

  if (argv.serve) {
    return startServing(ctx, mut, parsedFiles, clientRefresh, dependencies)
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }
}

// setup watcher for rebuilds
<<<<<<< HEAD
<<<<<<< HEAD
async function startWatching(
=======
async function startServing(
>>>>>>> 02f2423 (Initial commit)
=======
async function startServing(
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  ctx: BuildCtx,
  mut: Mutex,
  initialContent: ProcessedContent[],
  clientRefresh: () => void,
<<<<<<< HEAD
<<<<<<< HEAD
) {
  const { argv, allFiles } = ctx

  const contentMap: ContentMap = new Map()
  for (const filePath of allFiles) {
    contentMap.set(filePath, {
      type: "other",
    })
  }

  for (const content of initialContent) {
    const [_tree, vfile] = content
    contentMap.set(vfile.data.relativePath!, {
      type: "markdown",
      content,
    })
  }

  const gitIgnoredMatcher = await isGitIgnored()
  const buildData: BuildData = {
    ctx,
    mut,
    contentMap,
    ignored: (fp) => {
      const pathStr = toPosixPath(fp.toString())
      if (pathStr.startsWith(".git/")) return true
      if (gitIgnoredMatcher(pathStr)) return true
      for (const pattern of cfg.configuration.ignorePatterns) {
        if (minimatch(pathStr, pattern)) {
          return true
        }
      }

      return false
    },

    changesSinceLastBuild: {},
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  dependencies: Dependencies, // emitter name: dep graph
) {
  const { argv } = ctx

  // cache file parse results
  const contentMap = new Map<FilePath, ProcessedContent>()
  for (const content of initialContent) {
    const [_tree, vfile] = content
    contentMap.set(vfile.data.filePath!, content)
  }

  const buildData: BuildData = {
    ctx,
    mut,
    dependencies,
    contentMap,
    ignored: await isGitIgnored(),
    initialSlugs: ctx.allSlugs,
    toRebuild: new Set<FilePath>(),
    toRemove: new Set<FilePath>(),
    trackedAssets: new Set<FilePath>(),
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    lastBuildMs: 0,
  }

  const watcher = chokidar.watch(".", {
    persistent: true,
    cwd: argv.directory,
    ignoreInitial: true,
  })

<<<<<<< HEAD
<<<<<<< HEAD
  const changes: ChangeEvent[] = []
  watcher
    .on("add", (fp) => {
      fp = toPosixPath(fp)
      if (buildData.ignored(fp)) return
      changes.push({ path: fp as FilePath, type: "add" })
      void rebuild(changes, clientRefresh, buildData)
    })
    .on("change", (fp) => {
      fp = toPosixPath(fp)
      if (buildData.ignored(fp)) return
      changes.push({ path: fp as FilePath, type: "change" })
      void rebuild(changes, clientRefresh, buildData)
    })
    .on("unlink", (fp) => {
      fp = toPosixPath(fp)
      if (buildData.ignored(fp)) return
      changes.push({ path: fp as FilePath, type: "delete" })
      void rebuild(changes, clientRefresh, buildData)
    })
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const buildFromEntry = argv.fastRebuild ? partialRebuildFromEntrypoint : rebuildFromEntrypoint
  watcher
    .on("add", (fp) => buildFromEntry(fp, "add", clientRefresh, buildData))
    .on("change", (fp) => buildFromEntry(fp, "change", clientRefresh, buildData))
    .on("unlink", (fp) => buildFromEntry(fp, "delete", clientRefresh, buildData))
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

  return async () => {
    await watcher.close()
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
async function rebuild(changes: ChangeEvent[], clientRefresh: () => void, buildData: BuildData) {
  const { ctx, contentMap, mut, changesSinceLastBuild } = buildData
  const { argv, cfg } = ctx

  const buildId = randomIdNonSecure()
  ctx.buildId = buildId
  buildData.lastBuildMs = new Date().getTime()
  const numChangesInBuild = changes.length
  const release = await mut.acquire()

  // if there's another build after us, release and let them do it
  if (ctx.buildId !== buildId) {
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
async function partialRebuildFromEntrypoint(
  filepath: string,
  action: FileEvent,
  clientRefresh: () => void,
  buildData: BuildData, // note: this function mutates buildData
) {
  const { ctx, ignored, dependencies, contentMap, mut, toRemove } = buildData
  const { argv, cfg } = ctx

  // don't do anything for gitignored files
  if (ignored(filepath)) {
    return
  }

  const buildStart = new Date().getTime()
  buildData.lastBuildMs = buildStart
  const release = await mut.acquire()
  if (buildData.lastBuildMs > buildStart) {
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    release()
    return
  }

  const perf = new PerfTimer()
<<<<<<< HEAD
<<<<<<< HEAD
  perf.addEvent("rebuild")
  console.log(styleText("yellow", "Detected change, rebuilding..."))

  // update changesSinceLastBuild
  for (const change of changes) {
    changesSinceLastBuild[change.path] = change.type
  }

  const staticResources = getStaticResourcesFromPlugins(ctx)
  const pathsToParse: FilePath[] = []
  for (const [fp, type] of Object.entries(changesSinceLastBuild)) {
    if (type === "delete" || path.extname(fp) !== ".md") continue
    const fullPath = joinSegments(argv.directory, toPosixPath(fp)) as FilePath
    pathsToParse.push(fullPath)
  }

  const parsed = await parseMarkdown(ctx, pathsToParse)
  for (const content of parsed) {
    contentMap.set(content[1].data.relativePath!, {
      type: "markdown",
      content,
    })
  }

  // update state using changesSinceLastBuild
  // we do this weird play of add => compute change events => remove
  // so that partialEmitters can do appropriate cleanup based on the content of deleted files
  for (const [file, change] of Object.entries(changesSinceLastBuild)) {
    if (change === "delete") {
      // universal delete case
      contentMap.delete(file as FilePath)
    }

    // manually track non-markdown files as processed files only
    // contains markdown files
    if (change === "add" && path.extname(file) !== ".md") {
      contentMap.set(file as FilePath, {
        type: "other",
      })
    }
  }

  const changeEvents: ChangeEvent[] = Object.entries(changesSinceLastBuild).map(([fp, type]) => {
    const path = fp as FilePath
    const processedContent = contentMap.get(path)
    if (processedContent?.type === "markdown") {
      const [_tree, file] = processedContent.content
      return {
        type,
        path,
        file,
      }
    }

    return {
      type,
      path,
    }
  })

  // update allFiles and then allSlugs with the consistent view of content map
  ctx.allFiles = Array.from(contentMap.keys())
  ctx.allSlugs = ctx.allFiles.map((fp) => slugifyFilePath(fp as FilePath))
  let processedFiles = filterContent(
    ctx,
    Array.from(contentMap.values())
      .filter((file) => file.type === "markdown")
      .map((file) => file.content),
  )

  let emittedFiles = 0
  for (const emitter of cfg.plugins.emitters) {
    // Try to use partialEmit if available, otherwise assume the output is static
    const emitFn = emitter.partialEmit ?? emitter.emit
    const emitted = await emitFn(ctx, processedFiles, staticResources, changeEvents)
    if (emitted === null) {
      continue
    }

    if (Symbol.asyncIterator in emitted) {
      // Async generator case
      for await (const file of emitted) {
        emittedFiles++
        if (ctx.argv.verbose) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
    } else {
      // Array case
      emittedFiles += emitted.length
      if (ctx.argv.verbose) {
        for (const file of emitted) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  console.log(chalk.yellow("Detected change, rebuilding..."))
  ctx.buildId = newBuildId()

  // UPDATE DEP GRAPH
  const fp = joinSegments(argv.directory, toPosixPath(filepath)) as FilePath

  const staticResources = getStaticResourcesFromPlugins(ctx)
  let processedFiles: ProcessedContent[] = []

  switch (action) {
    case "add":
      // add to cache when new file is added
      processedFiles = await parseMarkdown(ctx, [fp])
      processedFiles.forEach(([tree, vfile]) => contentMap.set(vfile.data.filePath!, [tree, vfile]))

      // update the dep graph by asking all emitters whether they depend on this file
      for (const emitter of cfg.plugins.emitters) {
        const emitterGraph =
          (await emitter.getDependencyGraph?.(ctx, processedFiles, staticResources)) ?? null

        if (emitterGraph) {
          const existingGraph = dependencies[emitter.name]
          if (existingGraph !== null) {
            existingGraph.mergeGraph(emitterGraph)
          } else {
            // might be the first time we're adding a mardown file
            dependencies[emitter.name] = emitterGraph
          }
        }
      }
      break
    case "change":
      // invalidate cache when file is changed
      processedFiles = await parseMarkdown(ctx, [fp])
      processedFiles.forEach(([tree, vfile]) => contentMap.set(vfile.data.filePath!, [tree, vfile]))

      // only content files can have added/removed dependencies because of transclusions
      if (path.extname(fp) === ".md") {
        for (const emitter of cfg.plugins.emitters) {
          // get new dependencies from all emitters for this file
          const emitterGraph =
            (await emitter.getDependencyGraph?.(ctx, processedFiles, staticResources)) ?? null

          // only update the graph if the emitter plugin uses the changed file
          // eg. Assets plugin ignores md files, so we skip updating the graph
          if (emitterGraph?.hasNode(fp)) {
            // merge the new dependencies into the dep graph
            dependencies[emitter.name]?.updateIncomingEdgesForNode(emitterGraph, fp)
          }
        }
      }
      break
    case "delete":
      toRemove.add(fp)
      break
  }

  if (argv.verbose) {
    console.log(`Updated dependency graphs in ${perf.timeSince()}`)
  }

  // EMIT
  perf.addEvent("rebuild")
  let emittedFiles = 0

  for (const emitter of cfg.plugins.emitters) {
    const depGraph = dependencies[emitter.name]

    // emitter hasn't defined a dependency graph. call it with all processed files
    if (depGraph === null) {
      if (argv.verbose) {
        console.log(
          `Emitter ${emitter.name} doesn't define a dependency graph. Calling it with all files...`,
        )
      }

      const files = [...contentMap.values()].filter(
        ([_node, vfile]) => !toRemove.has(vfile.data.filePath!),
      )

      const emittedFps = await emitter.emit(ctx, files, staticResources)

      if (ctx.argv.verbose) {
        for (const file of emittedFps) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }

      emittedFiles += emittedFps.length
      continue
    }

    // only call the emitter if it uses this file
    if (depGraph.hasNode(fp)) {
      // re-emit using all files that are needed for the downstream of this file
      // eg. for ContentIndex, the dep graph could be:
      // a.md --> contentIndex.json
      // b.md ------^
      //
      // if a.md changes, we need to re-emit contentIndex.json,
      // and supply [a.md, b.md] to the emitter
      const upstreams = [...depGraph.getLeafNodeAncestors(fp)] as FilePath[]

      const upstreamContent = upstreams
        // filter out non-markdown files
        .filter((file) => contentMap.has(file))
        // if file was deleted, don't give it to the emitter
        .filter((file) => !toRemove.has(file))
        .map((file) => contentMap.get(file)!)

      const emittedFps = await emitter.emit(ctx, upstreamContent, staticResources)

      if (ctx.argv.verbose) {
        for (const file of emittedFps) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }

      emittedFiles += emittedFps.length
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    }
  }

  console.log(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince("rebuild")}`)
<<<<<<< HEAD
<<<<<<< HEAD
  console.log(styleText("green", `Done rebuilding in ${perf.timeSince()}`))
  changes.splice(0, numChangesInBuild)
  clientRefresh()
  release()
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

  // CLEANUP
  const destinationsToDelete = new Set<FilePath>()
  for (const file of toRemove) {
    // remove from cache
    contentMap.delete(file)
    Object.values(dependencies).forEach((depGraph) => {
      // remove the node from dependency graphs
      depGraph?.removeNode(file)
      // remove any orphan nodes. eg if a.md is deleted, a.html is orphaned and should be removed
      const orphanNodes = depGraph?.removeOrphanNodes()
      orphanNodes?.forEach((node) => {
        // only delete files that are in the output directory
        if (node.startsWith(argv.output)) {
          destinationsToDelete.add(node)
        }
      })
    })
  }
  await rimraf([...destinationsToDelete])

  console.log(chalk.green(`Done rebuilding in ${perf.timeSince()}`))

  toRemove.clear()
  release()
  clientRefresh()
}

async function rebuildFromEntrypoint(
  fp: string,
  action: FileEvent,
  clientRefresh: () => void,
  buildData: BuildData, // note: this function mutates buildData
) {
  const { ctx, ignored, mut, initialSlugs, contentMap, toRebuild, toRemove, trackedAssets } =
    buildData

  const { argv } = ctx

  // don't do anything for gitignored files
  if (ignored(fp)) {
    return
  }

  // dont bother rebuilding for non-content files, just track and refresh
  fp = toPosixPath(fp)
  const filePath = joinSegments(argv.directory, fp) as FilePath
  if (path.extname(fp) !== ".md") {
    if (action === "add" || action === "change") {
      trackedAssets.add(filePath)
    } else if (action === "delete") {
      trackedAssets.delete(filePath)
    }
    clientRefresh()
    return
  }

  if (action === "add" || action === "change") {
    toRebuild.add(filePath)
  } else if (action === "delete") {
    toRemove.add(filePath)
  }

  const buildStart = new Date().getTime()
  buildData.lastBuildMs = buildStart
  const release = await mut.acquire()

  // there's another build after us, release and let them do it
  if (buildData.lastBuildMs > buildStart) {
    release()
    return
  }

  const perf = new PerfTimer()
  console.log(chalk.yellow("Detected change, rebuilding..."))
  ctx.buildId = newBuildId()

  try {
    const filesToRebuild = [...toRebuild].filter((fp) => !toRemove.has(fp))
    const parsedContent = await parseMarkdown(ctx, filesToRebuild)
    for (const content of parsedContent) {
      const [_tree, vfile] = content
      contentMap.set(vfile.data.filePath!, content)
    }

    for (const fp of toRemove) {
      contentMap.delete(fp)
    }

    const parsedFiles = [...contentMap.values()]
    const filteredContent = filterContent(ctx, parsedFiles)

    // re-update slugs
    const trackedSlugs = [...new Set([...contentMap.keys(), ...toRebuild, ...trackedAssets])]
      .filter((fp) => !toRemove.has(fp))
      .map((fp) => slugifyFilePath(path.posix.relative(argv.directory, fp) as FilePath))

    ctx.allSlugs = [...new Set([...initialSlugs, ...trackedSlugs])]

    // TODO: we can probably traverse the link graph to figure out what's safe to delete here
    // instead of just deleting everything
    await rimraf(path.join(argv.output, ".*"), { glob: true })
    await emitContent(ctx, filteredContent)
    console.log(chalk.green(`Done rebuilding in ${perf.timeSince()}`))
  } catch (err) {
    console.log(chalk.yellow(`Rebuild failed. Waiting on a change to fix the error...`))
    if (argv.verbose) {
      console.log(chalk.red(err))
    }
  }

  release()
  clientRefresh()
  toRebuild.clear()
  toRemove.clear()
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
}

export default async (argv: Argv, mut: Mutex, clientRefresh: () => void) => {
  try {
    return await buildQuartz(argv, mut, clientRefresh)
  } catch (err) {
    trace("\nExiting Quartz due to a fatal error", err as Error)
  }
}
