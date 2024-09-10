import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
<<<<<<< HEAD
    const draftFlag: boolean =
      vfile.data?.frontmatter?.draft === true || vfile.data?.frontmatter?.draft === "true"
=======
    const draftFlag: boolean = vfile.data?.frontmatter?.draft || false
>>>>>>> 02f2423 (Initial commit)
    return !draftFlag
  },
})
