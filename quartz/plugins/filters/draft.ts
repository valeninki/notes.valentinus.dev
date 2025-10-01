import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
<<<<<<< HEAD
<<<<<<< HEAD
    const draftFlag: boolean =
      vfile.data?.frontmatter?.draft === true || vfile.data?.frontmatter?.draft === "true"
=======
    const draftFlag: boolean = vfile.data?.frontmatter?.draft || false
>>>>>>> 02f2423 (Initial commit)
=======
    const draftFlag: boolean = vfile.data?.frontmatter?.draft || false
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    return !draftFlag
  },
})
