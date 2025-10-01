import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList, SortFn } from "../PageList"
<<<<<<< HEAD
<<<<<<< HEAD
import { FullSlug, getAllSegmentPrefixes, resolveRelative, simplifySlug } from "../../util/path"
=======
import { FullSlug, getAllSegmentPrefixes, simplifySlug } from "../../util/path"
>>>>>>> 02f2423 (Initial commit)
=======
import { FullSlug, getAllSegmentPrefixes, simplifySlug } from "../../util/path"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
<<<<<<< HEAD
<<<<<<< HEAD
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

interface TagContentOptions {
  sort?: SortFn
  numPages: number
}

const defaultOptions: TagContentOptions = {
  numPages: 10,
}

export default ((opts?: Partial<TagContentOptions>) => {
  const options: TagContentOptions = { ...defaultOptions, ...opts }

  const TagContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const slug = fileData.slug

    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
    }

    const tag = simplifySlug(slug.slice("tags/".length) as FullSlug)
    const allPagesWithTag = (tag: string) =>
      allFiles.filter((file) =>
        (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
      )

<<<<<<< HEAD
<<<<<<< HEAD
    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    if (tag === "/") {
      const tags = [
        ...new Set(
          allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
        ),
      ].sort((a, b) => a.localeCompare(b))
      const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
      for (const tag of tags) {
        tagItemMap.set(tag, allPagesWithTag(tag))
      }
      return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div class="popover-hint">
          <article class={classes}>
=======
        <div class={classes}>
          <article>
>>>>>>> 02f2423 (Initial commit)
=======
        <div class={classes}>
          <article>
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
            <p>{content}</p>
          </article>
          <p>{i18n(cfg.locale).pages.tagContent.totalTags({ count: tags.length })}</p>
          <div>
            {tags.map((tag) => {
              const pages = tagItemMap.get(tag)!
              const listProps = {
                ...props,
                allFiles: pages,
              }

              const contentPage = allFiles.filter((file) => file.slug === `tags/${tag}`).at(0)

              const root = contentPage?.htmlAst
              const content =
                !root || root?.children.length === 0
                  ? contentPage?.description
                  : htmlToJsx(contentPage.filePath!, root)

<<<<<<< HEAD
<<<<<<< HEAD
              const tagListingPage = `/tags/${tag}` as FullSlug
              const href = resolveRelative(fileData.slug!, tagListingPage)

              return (
                <div>
                  <h2>
                    <a class="internal tag-link" href={href}>
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
              return (
                <div>
                  <h2>
                    <a class="internal tag-link" href={`../tags/${tag}`}>
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
                      {tag}
                    </a>
                  </h2>
                  {content && <p>{content}</p>}
                  <div class="page-listing">
                    <p>
                      {i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}
                      {pages.length > options.numPages && (
                        <>
                          {" "}
                          <span>
                            {i18n(cfg.locale).pages.tagContent.showingFirst({
                              count: options.numPages,
                            })}
                          </span>
                        </>
                      )}
                    </p>
<<<<<<< HEAD
<<<<<<< HEAD
                    <PageList limit={options.numPages} {...listProps} sort={options?.sort} />
=======
                    <PageList limit={options.numPages} {...listProps} sort={opts?.sort} />
>>>>>>> 02f2423 (Initial commit)
=======
                    <PageList limit={options.numPages} {...listProps} sort={opts?.sort} />
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      const pages = allPagesWithTag(tag)
      const listProps = {
        ...props,
        allFiles: pages,
      }

      return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div class="popover-hint">
          <article class={classes}>{content}</article>
          <div class="page-listing">
            <p>{i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}</p>
            <div>
              <PageList {...listProps} sort={options?.sort} />
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
        <div class={classes}>
          <article>{content}</article>
          <div class="page-listing">
            <p>{i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}</p>
            <div>
              <PageList {...listProps} />
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
            </div>
          </div>
        </div>
      )
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  TagContent.css = concatenateResources(style, PageList.css)
=======
  TagContent.css = style + PageList.css
>>>>>>> 02f2423 (Initial commit)
=======
  TagContent.css = style + PageList.css
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  return TagContent
}) satisfies QuartzComponentConstructor
