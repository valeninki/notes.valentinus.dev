import { QuartzFilterPlugin } from "../types"

export const ExplicitPublish: QuartzFilterPlugin = () => ({
  name: "ExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
<<<<<<< HEAD
<<<<<<< HEAD
    return vfile.data?.frontmatter?.publish === true || vfile.data?.frontmatter?.publish === "true"
=======
    return vfile.data?.frontmatter?.publish ?? false
>>>>>>> 02f2423 (Initial commit)
=======
    return vfile.data?.frontmatter?.publish ?? false
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  },
})
