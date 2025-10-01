<<<<<<< HEAD
<<<<<<< HEAD
import { FullSlug, resolveRelative } from "../util/path"
=======
import { pathToRoot, slugTag } from "../util/path"
>>>>>>> 02f2423 (Initial commit)
=======
import { pathToRoot, slugTag } from "../util/path"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const baseDir = pathToRoot(fileData.slug!)
>>>>>>> 02f2423 (Initial commit)
=======
  const baseDir = pathToRoot(fileData.slug!)
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  if (tags && tags.length > 0) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags.map((tag) => {
<<<<<<< HEAD
<<<<<<< HEAD
          const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
=======
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
>>>>>>> 02f2423 (Initial commit)
=======
          const linkDest = baseDir + `/tags/${slugTag(tag)}`
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag}
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  justify-self: end;
>>>>>>> 02f2423 (Initial commit)
=======
  justify-self: end;
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
