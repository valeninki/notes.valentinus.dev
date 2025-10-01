import esbuild from "esbuild"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { Processor, unified } from "unified"
import { Root as MDRoot } from "remark-parse/lib"
import { Root as HTMLRoot } from "hast"
<<<<<<< HEAD
<<<<<<< HEAD
import { MarkdownContent, ProcessedContent } from "../plugins/vfile"
=======
import { ProcessedContent } from "../plugins/vfile"
>>>>>>> 02f2423 (Initial commit)
=======
import { ProcessedContent } from "../plugins/vfile"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { PerfTimer } from "../util/perf"
import { read } from "to-vfile"
import { FilePath, QUARTZ, slugifyFilePath } from "../util/path"
import path from "path"
import workerpool, { Promise as WorkerPromise } from "workerpool"
import { QuartzLogger } from "../util/log"
import { trace } from "../util/trace"
<<<<<<< HEAD
<<<<<<< HEAD
import { BuildCtx, WorkerSerializableBuildCtx } from "../util/ctx"
import { styleText } from "util"

export type QuartzMdProcessor = Processor<MDRoot, MDRoot, MDRoot>
export type QuartzHtmlProcessor = Processor<undefined, MDRoot, HTMLRoot>

export function createMdProcessor(ctx: BuildCtx): QuartzMdProcessor {
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { BuildCtx } from "../util/ctx"

export type QuartzProcessor = Processor<MDRoot, MDRoot, HTMLRoot>
export function createProcessor(ctx: BuildCtx): QuartzProcessor {
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const transformers = ctx.cfg.plugins.transformers

  return (
    unified()
      // base Markdown -> MD AST
      .use(remarkParse)
      // MD AST -> MD AST transforms
      .use(
<<<<<<< HEAD
<<<<<<< HEAD
        transformers.flatMap((plugin) => plugin.markdownPlugins?.(ctx) ?? []),
      ) as unknown as QuartzMdProcessor
    //  ^ sadly the typing of `use` is not smart enough to infer the correct type from our plugin list
  )
}

export function createHtmlProcessor(ctx: BuildCtx): QuartzHtmlProcessor {
  const transformers = ctx.cfg.plugins.transformers
  return (
    unified()
      // MD AST -> HTML AST
      .use(remarkRehype, { allowDangerousHtml: true })
      // HTML AST -> HTML AST transforms
      .use(transformers.flatMap((plugin) => plugin.htmlPlugins?.(ctx) ?? []))
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
        transformers
          .filter((p) => p.markdownPlugins)
          .flatMap((plugin) => plugin.markdownPlugins!(ctx)),
      )
      // MD AST -> HTML AST
      .use(remarkRehype, { allowDangerousHtml: true })
      // HTML AST -> HTML AST transforms
      .use(transformers.filter((p) => p.htmlPlugins).flatMap((plugin) => plugin.htmlPlugins!(ctx)))
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  )
}

function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n)
  }
}

async function transpileWorkerScript() {
  // transpile worker script
  const cacheFile = "./.quartz-cache/transpiled-worker.mjs"
  const fp = "./quartz/worker.ts"
  return esbuild.build({
    entryPoints: [fp],
    outfile: path.join(QUARTZ, cacheFile),
    bundle: true,
    keepNames: true,
    platform: "node",
    format: "esm",
    packages: "external",
    sourcemap: true,
    sourcesContent: false,
    plugins: [
      {
        name: "css-and-scripts-as-text",
        setup(build) {
          build.onLoad({ filter: /\.scss$/ }, (_) => ({
            contents: "",
            loader: "text",
          }))
          build.onLoad({ filter: /\.inline\.(ts|js)$/ }, (_) => ({
            contents: "",
            loader: "text",
          }))
        },
      },
    ],
  })
}

export function createFileParser(ctx: BuildCtx, fps: FilePath[]) {
  const { argv, cfg } = ctx
<<<<<<< HEAD
<<<<<<< HEAD
  return async (processor: QuartzMdProcessor) => {
    const res: MarkdownContent[] = []
=======
  return async (processor: QuartzProcessor) => {
    const res: ProcessedContent[] = []
>>>>>>> 02f2423 (Initial commit)
=======
  return async (processor: QuartzProcessor) => {
    const res: ProcessedContent[] = []
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    for (const fp of fps) {
      try {
        const perf = new PerfTimer()
        const file = await read(fp)

        // strip leading and trailing whitespace
        file.value = file.value.toString().trim()

        // Text -> Text transforms
        for (const plugin of cfg.plugins.transformers.filter((p) => p.textTransform)) {
          file.value = plugin.textTransform!(ctx, file.value.toString())
        }

        // base data properties that plugins may use
        file.data.filePath = file.path as FilePath
        file.data.relativePath = path.posix.relative(argv.directory, file.path) as FilePath
        file.data.slug = slugifyFilePath(file.data.relativePath)

        const ast = processor.parse(file)
        const newAst = await processor.run(ast, file)
        res.push([newAst, file])

        if (argv.verbose) {
<<<<<<< HEAD
<<<<<<< HEAD
          console.log(`[markdown] ${fp} -> ${file.data.slug} (${perf.timeSince()})`)
        }
      } catch (err) {
        trace(`\nFailed to process markdown \`${fp}\``, err as Error)
      }
    }

    return res
  }
}

export function createMarkdownParser(ctx: BuildCtx, mdContent: MarkdownContent[]) {
  return async (processor: QuartzHtmlProcessor) => {
    const res: ProcessedContent[] = []
    for (const [ast, file] of mdContent) {
      try {
        const perf = new PerfTimer()

        const newAst = await processor.run(ast as MDRoot, file)
        res.push([newAst, file])

        if (ctx.argv.verbose) {
          console.log(`[html] ${file.data.slug} (${perf.timeSince()})`)
        }
      } catch (err) {
        trace(`\nFailed to process html \`${file.data.filePath}\``, err as Error)
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
          console.log(`[process] ${fp} -> ${file.data.slug} (${perf.timeSince()})`)
        }
      } catch (err) {
        trace(`\nFailed to process \`${fp}\``, err as Error)
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      }
    }

    return res
  }
}

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(Math.round(num), min), max)
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
export async function parseMarkdown(ctx: BuildCtx, fps: FilePath[]): Promise<ProcessedContent[]> {
  const { argv } = ctx
  const perf = new PerfTimer()
  const log = new QuartzLogger(argv.verbose)

  // rough heuristics: 128 gives enough time for v8 to JIT and optimize parsing code paths
  const CHUNK_SIZE = 128
  const concurrency = ctx.argv.concurrency ?? clamp(fps.length / CHUNK_SIZE, 1, 4)

  let res: ProcessedContent[] = []
  log.start(`Parsing input files using ${concurrency} threads`)
  if (concurrency === 1) {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const mdRes = await createFileParser(ctx, fps)(createMdProcessor(ctx))
      res = await createMarkdownParser(ctx, mdRes)(createHtmlProcessor(ctx))
=======
      const processor = createProcessor(ctx)
      const parse = createFileParser(ctx, fps)
      res = await parse(processor)
>>>>>>> 02f2423 (Initial commit)
=======
      const processor = createProcessor(ctx)
      const parse = createFileParser(ctx, fps)
      res = await parse(processor)
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    } catch (error) {
      log.end()
      throw error
    }
  } else {
    await transpileWorkerScript()
    const pool = workerpool.pool("./quartz/bootstrap-worker.mjs", {
      minWorkers: "max",
      maxWorkers: concurrency,
      workerType: "thread",
    })
<<<<<<< HEAD
<<<<<<< HEAD
    const errorHandler = (err: any) => {
      console.error(err)
      process.exit(1)
    }

    const serializableCtx: WorkerSerializableBuildCtx = {
      buildId: ctx.buildId,
      argv: ctx.argv,
      allSlugs: ctx.allSlugs,
      allFiles: ctx.allFiles,
      incremental: ctx.incremental,
    }

    const textToMarkdownPromises: WorkerPromise<MarkdownContent[]>[] = []
    let processedFiles = 0
    for (const chunk of chunks(fps, CHUNK_SIZE)) {
      textToMarkdownPromises.push(pool.exec("parseMarkdown", [serializableCtx, chunk]))
    }

    const mdResults: Array<MarkdownContent[]> = await Promise.all(
      textToMarkdownPromises.map(async (promise) => {
        const result = await promise
        processedFiles += result.length
        log.updateText(`text->markdown ${styleText("gray", `${processedFiles}/${fps.length}`)}`)
        return result
      }),
    ).catch(errorHandler)

    const markdownToHtmlPromises: WorkerPromise<ProcessedContent[]>[] = []
    processedFiles = 0
    for (const mdChunk of mdResults) {
      markdownToHtmlPromises.push(pool.exec("processHtml", [serializableCtx, mdChunk]))
    }
    const results: ProcessedContent[][] = await Promise.all(
      markdownToHtmlPromises.map(async (promise) => {
        const result = await promise
        processedFiles += result.length
        log.updateText(`markdown->html ${styleText("gray", `${processedFiles}/${fps.length}`)}`)
        return result
      }),
    ).catch(errorHandler)

=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

    const childPromises: WorkerPromise<ProcessedContent[]>[] = []
    for (const chunk of chunks(fps, CHUNK_SIZE)) {
      childPromises.push(pool.exec("parseFiles", [ctx.buildId, argv, chunk, ctx.allSlugs]))
    }

    const results: ProcessedContent[][] = await WorkerPromise.all(childPromises).catch((err) => {
      const errString = err.toString().slice("Error:".length)
      console.error(errString)
      process.exit(1)
    })
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    res = results.flat()
    await pool.terminate()
  }

  log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`)
  return res
}
