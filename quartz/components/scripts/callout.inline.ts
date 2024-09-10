function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  outerBlock.classList.toggle("is-collapsed")
<<<<<<< HEAD
  const content = outerBlock.getElementsByClassName("callout-content")[0] as HTMLElement
  if (!content) return
  const collapsed = outerBlock.classList.contains("is-collapsed")
  content.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
=======
  const collapsed = outerBlock.classList.contains("is-collapsed")
  const height = collapsed ? this.scrollHeight : outerBlock.scrollHeight
  outerBlock.style.maxHeight = height + "px"

  // walk and adjust height of all parents
  let current = outerBlock
  let parent = outerBlock.parentElement
  while (parent) {
    if (!parent.classList.contains("callout")) {
      return
    }

    const collapsed = parent.classList.contains("is-collapsed")
    const height = collapsed ? parent.scrollHeight : parent.scrollHeight + current.scrollHeight
    parent.style.maxHeight = height + "px"

    current = parent
    parent = parent.parentElement
  }
>>>>>>> 02f2423 (Initial commit)
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
<<<<<<< HEAD
    const title = div.getElementsByClassName("callout-title")[0] as HTMLElement
    const content = div.getElementsByClassName("callout-content")[0] as HTMLElement
    if (!title || !content) continue

    title.addEventListener("click", toggleCallout)
    window.addCleanup(() => title.removeEventListener("click", toggleCallout))

    const collapsed = div.classList.contains("is-collapsed")
    content.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
=======
    const title = div.firstElementChild

    if (title) {
      title.addEventListener("click", toggleCallout)
      window.addCleanup(() => title.removeEventListener("click", toggleCallout))

      const collapsed = div.classList.contains("is-collapsed")
      const height = collapsed ? title.scrollHeight : div.scrollHeight
      div.style.maxHeight = height + "px"
    }
>>>>>>> 02f2423 (Initial commit)
  }
}

document.addEventListener("nav", setupCallout)
<<<<<<< HEAD
=======
window.addEventListener("resize", setupCallout)
>>>>>>> 02f2423 (Initial commit)
