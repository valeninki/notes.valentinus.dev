declare module "*.scss" {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
<<<<<<< HEAD
<<<<<<< HEAD
  prenav: CustomEvent<{}>
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
  readermodechange: CustomEvent<{ mode: "on" | "off" }>
}

type ContentIndex = Record<FullSlug, ContentDetails>
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  nav: CustomEvent<{ url: FullSlug }>
  themechange: CustomEvent<{ theme: "light" | "dark" }>
}

<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
declare const fetchData: Promise<ContentIndex>
