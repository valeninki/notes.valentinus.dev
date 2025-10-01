import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
<<<<<<< HEAD
<<<<<<< HEAD
import { Readable } from "stream"
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
<<<<<<< HEAD
<<<<<<< HEAD
  content: string | Buffer | Readable
=======
  content: string | Buffer
>>>>>>> 02f2423 (Initial commit)
=======
  content: string | Buffer
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
}

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
  const dir = path.dirname(pathToPage)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(pathToPage, content)
  return pathToPage
}
