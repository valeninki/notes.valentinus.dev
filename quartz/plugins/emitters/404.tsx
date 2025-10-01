import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
<<<<<<< HEAD
<<<<<<< HEAD
import { FullSlug } from "../../util/path"
=======
import { FilePath, FullSlug } from "../../util/path"
>>>>>>> 02f2423 (Initial commit)
=======
import { FilePath, FullSlug } from "../../util/path"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { sharedPageComponents } from "../../../quartz.layout"
import { NotFound } from "../../components"
import { defaultProcessedContent } from "../vfile"
import { write } from "./helpers"
import { i18n } from "../../i18n"
<<<<<<< HEAD
<<<<<<< HEAD
=======
import DepGraph from "../../depgraph"
>>>>>>> 02f2423 (Initial commit)
=======
import DepGraph from "../../depgraph"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

export const NotFoundPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    pageBody: NotFound(),
    beforeBody: [],
    left: [],
    right: [],
  }

  const { head: Head, pageBody, footer: Footer } = opts
  const Body = BodyConstructor()

  return {
    name: "404Page",
    getQuartzComponents() {
      return [Head, Body, pageBody, Footer]
    },
<<<<<<< HEAD
<<<<<<< HEAD
    async *emit(ctx, _content, resources) {
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    async getDependencyGraph(_ctx, _content, _resources) {
      return new DepGraph<FilePath>()
    },
    async emit(ctx, _content, resources): Promise<FilePath[]> {
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      const cfg = ctx.cfg.configuration
      const slug = "404" as FullSlug

      const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
      const path = url.pathname as FullSlug
<<<<<<< HEAD
<<<<<<< HEAD
=======
      const externalResources = pageResources(path, resources)
>>>>>>> 02f2423 (Initial commit)
=======
      const externalResources = pageResources(path, resources)
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      const notFound = i18n(cfg.locale).pages.error.title
      const [tree, vfile] = defaultProcessedContent({
        slug,
        text: notFound,
        description: notFound,
        frontmatter: { title: notFound, tags: [] },
      })
<<<<<<< HEAD
<<<<<<< HEAD
      const externalResources = pageResources(path, resources)
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      const componentData: QuartzComponentProps = {
        ctx,
        fileData: vfile.data,
        externalResources,
        cfg,
        children: [],
        tree,
        allFiles: [],
      }

<<<<<<< HEAD
<<<<<<< HEAD
      yield write({
        ctx,
        content: renderPage(cfg, slug, componentData, opts, externalResources),
        slug,
        ext: ".html",
      })
    },
    async *partialEmit() {},
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      return [
        await write({
          ctx,
          content: renderPage(cfg, slug, componentData, opts, externalResources),
          slug,
          ext: ".html",
        }),
      ]
    },
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }
}
