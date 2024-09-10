import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
<<<<<<< HEAD
 * Quartz 4 Configuration
=======
 * Quartz 4.0 Configuration
>>>>>>> 02f2423 (Initial commit)
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
<<<<<<< HEAD
<<<<<<< HEAD
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
=======
    pageTitle: "🪴 Quartz 4.0",
>>>>>>> 02f2423 (Initial commit)
=======
    pageTitle: "Kerem's Notes",
>>>>>>> a5382d1 (First run)
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "notes.valentinus.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
<<<<<<< HEAD
    defaultDateType: "modified",
=======
    defaultDateType: "created",
>>>>>>> 02f2423 (Initial commit)
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#121212",
          lightgray: "#2c2c2c",
          gray: "#d6b460",
          darkgray: "#9b7n28",
          dark: "#e7d3a2",
          secondary: "#d4b158",
          tertiary: "#d4b25a",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
<<<<<<< HEAD
        priority: ["frontmatter", "git", "filesystem"],
=======
        priority: ["frontmatter", "filesystem"],
>>>>>>> 02f2423 (Initial commit)
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
<<<<<<< HEAD
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
=======
      Plugin.NotFoundPage(),
>>>>>>> 02f2423 (Initial commit)
    ],
  },
}

export default config
