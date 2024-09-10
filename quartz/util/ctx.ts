import { QuartzConfig } from "../cfg"
<<<<<<< HEAD
import { QuartzPluginData } from "../plugins/vfile"
import { FileTrieNode } from "./fileTrie"
import { FilePath, FullSlug } from "./path"
=======
import { FullSlug } from "./path"
>>>>>>> 02f2423 (Initial commit)

export interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
<<<<<<< HEAD
  watch: boolean
=======
  fastRebuild: boolean
>>>>>>> 02f2423 (Initial commit)
  port: number
  wsPort: number
  remoteDevHost?: string
  concurrency?: number
}

<<<<<<< HEAD
export type BuildTimeTrieData = QuartzPluginData & {
  slug: string
  title: string
  filePath: string
}

=======
>>>>>>> 02f2423 (Initial commit)
export interface BuildCtx {
  buildId: string
  argv: Argv
  cfg: QuartzConfig
  allSlugs: FullSlug[]
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
