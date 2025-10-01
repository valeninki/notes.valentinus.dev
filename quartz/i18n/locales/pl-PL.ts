import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Bez nazwy",
    description: "Brak opisu",
  },
  components: {
    callout: {
      note: "Notatka",
      abstract: "Streszczenie",
      info: "informacja",
      todo: "Do zrobienia",
      tip: "Wskazówka",
      success: "Zrobione",
      question: "Pytanie",
      warning: "Ostrzeżenie",
      failure: "Usterka",
      danger: "Niebiezpieczeństwo",
      bug: "Błąd w kodzie",
      example: "Przykład",
      quote: "Cytat",
    },
    backlinks: {
      title: "Odnośniki zwrotne",
      noBacklinksFound: "Brak połączeń zwrotnych",
    },
    themeToggle: {
      lightMode: "Trzyb jasny",
      darkMode: "Tryb ciemny",
    },
<<<<<<< HEAD
<<<<<<< HEAD
    readerMode: {
      title: "Tryb czytania",
    },
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    explorer: {
      title: "Przeglądaj",
    },
    footer: {
      createdWith: "Stworzone z użyciem",
    },
    graph: {
      title: "Graf",
    },
    recentNotes: {
      title: "Najnowsze notatki",
      seeRemainingMore: ({ remaining }) => `Zobacz ${remaining} nastepnych →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Osadzone ${targetSlug}`,
      linkToOriginal: "Łącze do oryginału",
    },
    search: {
      title: "Szukaj",
<<<<<<< HEAD
<<<<<<< HEAD
      searchBarPlaceholder: "Wpisz frazę wyszukiwania",
=======
      searchBarPlaceholder: "Search for something",
>>>>>>> 02f2423 (Initial commit)
=======
      searchBarPlaceholder: "Search for something",
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    },
    tableOfContents: {
      title: "Spis treści",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min. czytania `,
    },
  },
  pages: {
    rss: {
      recentNotes: "Najnowsze notatki",
      lastFewNotes: ({ count }) => `Ostatnie ${count} notatek`,
    },
    error: {
      title: "Nie znaleziono",
      notFound: "Ta strona jest prywatna lub nie istnieje.",
      home: "Powrót do strony głównej",
    },
    folderContent: {
      folder: "Folder",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "W tym folderze jest 1 element." : `Elementów w folderze: ${count}.`,
    },
    tagContent: {
      tag: "Znacznik",
      tagIndex: "Spis znaczników",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "Oznaczony 1 element." : `Elementów z tym znacznikiem: ${count}.`,
      showingFirst: ({ count }) => `Pokazuje ${count} pierwszych znaczników.`,
      totalTags: ({ count }) => `Znalezionych wszystkich znaczników: ${count}.`,
    },
  },
} as const satisfies Translation
