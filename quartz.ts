import type { QuartzPluginData } from "@quartz-community/types"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.Explorer({
  filterFn: (node: { slugSegment?: string }) => node.slugSegment !== "topics" && node.slugSegment !== "tags",
})

ExternalPlugin.RecentNotes({
  filter: (f: QuartzPluginData & Record<string, unknown>) => f.slug !== "topics" && f.slug !== "index",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
