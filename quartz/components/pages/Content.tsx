<<<<<<< HEAD
<<<<<<< HEAD
import { ComponentChildren } from "preact"
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
=======
  const content = htmlToJsx(fileData.filePath!, tree)
>>>>>>> 02f2423 (Initial commit)
=======
  const content = htmlToJsx(fileData.filePath!, tree)
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>{content}</article>
}

export default (() => Content) satisfies QuartzComponentConstructor
