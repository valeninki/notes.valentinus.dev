<<<<<<< HEAD
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { styleText } from "util"
import { FullSlug } from "../../util/path"
=======
import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import chalk from "chalk"
import DepGraph from "../../depgraph"
>>>>>>> 02f2423 (Initial commit)

export function extractDomainFromBaseUrl(baseUrl: string) {
  const url = new URL(`https://${baseUrl}`)
  return url.hostname
}

export const CNAME: QuartzEmitterPlugin = () => ({
  name: "CNAME",
<<<<<<< HEAD
  async emit(ctx) {
    if (!ctx.cfg.configuration.baseUrl) {
      console.warn(
        styleText("yellow", "CNAME emitter requires `baseUrl` to be set in your configuration"),
      )
      return []
    }
    const content = extractDomainFromBaseUrl(ctx.cfg.configuration.baseUrl)
    if (!content) {
      return []
    }

    const path = await write({
      ctx,
      content,
      slug: "CNAME" as FullSlug,
      ext: "",
    })
    return [path]
  },
  async *partialEmit() {},
=======
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph(_ctx, _content, _resources) {
    return new DepGraph<FilePath>()
  },
  async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
    if (!cfg.configuration.baseUrl) {
      console.warn(chalk.yellow("CNAME emitter requires `baseUrl` to be set in your configuration"))
      return []
    }
    const path = joinSegments(argv.output, "CNAME")
    const content = extractDomainFromBaseUrl(cfg.configuration.baseUrl)
    if (!content) {
      return []
    }
    fs.writeFileSync(path, content)
    return [path] as FilePath[]
  },
>>>>>>> 02f2423 (Initial commit)
})
