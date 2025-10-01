import { QuartzConfig } from "../cfg"
<<<<<<< HEAD
<<<<<<< HEAD
import { QuartzPluginData } from "../plugins/vfile"
import { FileTrieNode } from "./fileTrie"
import { FilePath, FullSlug } from "./path"
=======
import { FullSlug } from "./path"
>>>>>>> 02f2423 (Initial commit)
=======
import { FullSlug } from "./path"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

export interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
<<<<<<< HEAD
<<<<<<< HEAD
  watch: boolean
=======
  fastRebuild: boolean
>>>>>>> 02f2423 (Initial commit)
=======
  fastRebuild: boolean
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  port: number
  wsPort: number
  remoteDevHost?: string
  concurrency?: number
}

<<<<<<< HEAD
<<<<<<< HEAD
export type BuildTimeTrieData = QuartzPluginData & {
  slug: string
  title: string
  filePath: string
}

=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
export interface BuildCtx {
  buildId: string
  argv: Argv
  cfg: QuartzConfig
  allSlugs: FullSlug[]
<<<<<<< HEAD
<<<<<<< HEAD
  allFiles: FilePath[]
  trie?: FileTrieNode<BuildTimeTrieData>
  incremental: boolean
}

export function trieFromAllFiles(allFiles: QuartzPluginData[]): FileTrieNode<BuildTimeTrieData> {
  const trie = new FileTrieNode<BuildTimeTrieData>([])
  allFiles.forEach((file) => {
    if (file.frontmatter) {
      trie.add({
        ...file,
        slug: file.slug!,
        title: file.frontmatter.title,
        filePath: file.filePath!,
      })
    }
  })

  return trie
}

export type WorkerSerializableBuildCtx = Omit<BuildCtx, "cfg" | "trie">
=======
}
>>>>>>> 02f2423 (Initial commit)
=======
}
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
