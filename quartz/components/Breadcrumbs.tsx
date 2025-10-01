import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
<<<<<<< HEAD
<<<<<<< HEAD
import { FullSlug, SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { trieFromAllFiles } from "../util/ctx"
=======
import { FullSlug, SimpleSlug, joinSegments, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
>>>>>>> 02f2423 (Initial commit)
=======
import { FullSlug, SimpleSlug, joinSegments, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
   * Whether to display breadcrumbs on root `index.md`
   */
  hideOnRoot: boolean
  /**
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  hideOnRoot: true,
>>>>>>> 02f2423 (Initial commit)
=======
  hideOnRoot: true,
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  // Merge options with defaults
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }

  // computed index of folder name to its associated file data
  let folderIndex: Map<string, QuartzPluginData> | undefined

<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
<<<<<<< HEAD
<<<<<<< HEAD
    ctx,
  }: QuartzComponentProps) => {
    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const slugParts = fileData.slug!.split("/")
    const pathNodes = trie.ancestryChain(slugParts)

    if (!pathNodes) {
      return null
    }

    const crumbs: CrumbData[] = pathNodes.map((node, idx) => {
      const crumb = formatCrumb(node.displayName, fileData.slug!, simplifySlug(node.slug))
      if (idx === 0) {
        crumb.displayName = options.rootName
      }

      // For last node (current page), set empty path
      if (idx === pathNodes.length - 1) {
        crumb.path = ""
      }

      return crumb
    })

    if (!options.showCurrentPage) {
      crumbs.pop()
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }: QuartzComponentProps) => {
    // Hide crumbs on root if enabled
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    // Format entry for root element
    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    if (!folderIndex && options.resolveFrontmatterTitle) {
      folderIndex = new Map()
      // construct the index for the first time
      for (const file of allFiles) {
        const folderParts = file.slug?.split("/")
        if (folderParts?.at(-1) === "index") {
          folderIndex.set(folderParts.slice(0, -1).join("/"), file)
        }
      }
    }

    // Split slug into hierarchy/parts
    const slugParts = fileData.slug?.split("/")
    if (slugParts) {
      // is tag breadcrumb?
      const isTagPath = slugParts[0] === "tags"

      // full path until current part
      let currentPath = ""

      for (let i = 0; i < slugParts.length - 1; i++) {
        let curPathSegment = slugParts[i]

        // Try to resolve frontmatter folder title
        const currentFile = folderIndex?.get(slugParts.slice(0, i + 1).join("/"))
        if (currentFile) {
          const title = currentFile.frontmatter!.title
          if (title !== "index") {
            curPathSegment = title
          }
        }

        // Add current slug to full path
        currentPath = joinSegments(currentPath, slugParts[i])
        const includeTrailingSlash = !isTagPath || i < 1

        // Format and add current crumb
        const crumb = formatCrumb(
          curPathSegment,
          fileData.slug!,
          (currentPath + (includeTrailingSlash ? "/" : "")) as SimpleSlug,
        )
        crumbs.push(crumb)
      }

      // Add current file to crumb (can directly use frontmatter title)
      if (options.showCurrentPage && slugParts.at(-1) !== "index") {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: "",
        })
      }
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
