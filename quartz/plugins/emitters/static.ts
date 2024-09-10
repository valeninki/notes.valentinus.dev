import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import { glob } from "../../util/glob"
<<<<<<< HEAD
import { dirname } from "path"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  async *emit({ argv, cfg }) {
    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    const outputStaticPath = joinSegments(argv.output, "static")
    await fs.promises.mkdir(outputStaticPath, { recursive: true })
    for (const fp of fps) {
      const src = joinSegments(staticPath, fp) as FilePath
      const dest = joinSegments(outputStaticPath, fp) as FilePath
      await fs.promises.mkdir(dirname(dest), { recursive: true })
      await fs.promises.copyFile(src, dest)
      yield dest
    }
  },
  async *partialEmit() {},
=======
import DepGraph from "../../depgraph"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph({ argv, cfg }, _content, _resources) {
    const graph = new DepGraph<FilePath>()

    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    for (const fp of fps) {
      graph.addEdge(
        joinSegments("static", fp) as FilePath,
        joinSegments(argv.output, "static", fp) as FilePath,
      )
    }

    return graph
  },
  async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    await fs.promises.cp(staticPath, joinSegments(argv.output, "static"), {
      recursive: true,
      dereference: true,
    })
    return fps.map((fp) => joinSegments(argv.output, "static", fp)) as FilePath[]
  },
>>>>>>> 02f2423 (Initial commit)
})
