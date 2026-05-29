import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/valeninki",
      LinkedIn: "https://www.linkedin.com/in/kerem-kurt-647696246/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Backlinks(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Graph({
      localGraph: {
        depth: 2,
        repelForce: 0.6,
        linkDistance: 50,
        fontSize: 0.7,
        focusOnHover: true,
      },
      globalGraph: {
        repelForce: 0.5,
        linkDistance: 40,
        fontSize: 0.7,
        focusOnHover: true,
        enableRadial: true,
      },
    }),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 5,
        showTags: false,
        filter: (f) =>
          f.slug !== "Topics" && !f.slug?.endsWith("/index") && f.slug !== "index",
      }),
    ),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 5,
        showTags: false,
        filter: (f) =>
          f.slug !== "Topics" && !f.slug?.endsWith("/index") && f.slug !== "index",
      }),
    ),
  ],
}
