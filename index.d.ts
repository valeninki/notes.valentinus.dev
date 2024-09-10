declare module "*.scss" {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
<<<<<<< HEAD
  prenav: CustomEvent<{}>
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
  readermodechange: CustomEvent<{ mode: "on" | "off" }>
}

type ContentIndex = Record<FullSlug, ContentDetails>
=======
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
}

>>>>>>> 02f2423 (Initial commit)
declare const fetchData: Promise<ContentIndex>
