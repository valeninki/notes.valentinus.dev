import { QuartzFilterPlugin } from "../types"

export const ExplicitPublish: QuartzFilterPlugin = () => ({
  name: "ExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
<<<<<<< HEAD
    return vfile.data?.frontmatter?.publish === true || vfile.data?.frontmatter?.publish === "true"
=======
    return vfile.data?.frontmatter?.publish ?? false
>>>>>>> 02f2423 (Initial commit)
  },
})
