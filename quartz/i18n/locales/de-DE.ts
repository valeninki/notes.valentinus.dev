import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Unbenannt",
    description: "Keine Beschreibung angegeben",
  },
  components: {
    callout: {
      note: "Hinweis",
      abstract: "Zusammenfassung",
      info: "Info",
      todo: "Zu erledigen",
      tip: "Tipp",
      success: "Erfolg",
      question: "Frage",
      warning: "Warnung",
<<<<<<< HEAD
<<<<<<< HEAD
      failure: "Fehlgeschlagen",
=======
      failure: "Misserfolg",
>>>>>>> 02f2423 (Initial commit)
=======
      failure: "Misserfolg",
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      danger: "Gefahr",
      bug: "Fehler",
      example: "Beispiel",
      quote: "Zitat",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "Keine Backlinks gefunden",
    },
    themeToggle: {
<<<<<<< HEAD
<<<<<<< HEAD
      lightMode: "Heller Modus",
      darkMode: "Dunkler Modus",
    },
    readerMode: {
      title: "Lesemodus",
=======
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
>>>>>>> 02f2423 (Initial commit)
=======
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    },
    explorer: {
      title: "Explorer",
    },
    footer: {
      createdWith: "Erstellt mit",
    },
    graph: {
      title: "Graphansicht",
    },
    recentNotes: {
      title: "Zuletzt bearbeitete Seiten",
      seeRemainingMore: ({ remaining }) => `${remaining} weitere ansehen →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transklusion von ${targetSlug}`,
      linkToOriginal: "Link zum Original",
    },
    search: {
      title: "Suche",
      searchBarPlaceholder: "Suche nach etwas",
    },
    tableOfContents: {
      title: "Inhaltsverzeichnis",
    },
    contentMeta: {
<<<<<<< HEAD
<<<<<<< HEAD
      readingTime: ({ minutes }) => `${minutes} Min. Lesezeit`,
=======
      readingTime: ({ minutes }) => `${minutes} min read`,
>>>>>>> 02f2423 (Initial commit)
=======
      readingTime: ({ minutes }) => `${minutes} min read`,
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    },
  },
  pages: {
    rss: {
      recentNotes: "Zuletzt bearbeitete Seiten",
      lastFewNotes: ({ count }) => `Letzte ${count} Seiten`,
    },
    error: {
      title: "Nicht gefunden",
      notFound: "Diese Seite ist entweder nicht öffentlich oder existiert nicht.",
<<<<<<< HEAD
<<<<<<< HEAD
      home: "Zur Startseite",
=======
      home: "Return to Homepage",
>>>>>>> 02f2423 (Initial commit)
=======
      home: "Return to Homepage",
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    },
    folderContent: {
      folder: "Ordner",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 Datei in diesem Ordner." : `${count} Dateien in diesem Ordner.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag-Übersicht",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 Datei mit diesem Tag." : `${count} Dateien mit diesem Tag.`,
      showingFirst: ({ count }) => `Die ersten ${count} Tags werden angezeigt.`,
      totalTags: ({ count }) => `${count} Tags insgesamt.`,
    },
  },
} as const satisfies Translation
