<<<<<<< HEAD
<<<<<<< HEAD
import { Root as HtmlRoot } from "hast"
import { Root as MdRoot } from "mdast"
import { Data, VFile } from "vfile"

export type QuartzPluginData = Data
export type MarkdownContent = [MdRoot, VFile]
export type ProcessedContent = [HtmlRoot, VFile]

export function defaultProcessedContent(vfileData: Partial<QuartzPluginData>): ProcessedContent {
  const root: HtmlRoot = { type: "root", children: [] }
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { Node, Parent } from "hast"
import { Data, VFile } from "vfile"

export type QuartzPluginData = Data
export type ProcessedContent = [Node, VFile]

export function defaultProcessedContent(vfileData: Partial<QuartzPluginData>): ProcessedContent {
  const root: Parent = { type: "root", children: [] }
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const vfile = new VFile("")
  vfile.data = vfileData
  return [root, vfile]
}
