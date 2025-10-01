import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/search.scss"
// @ts-ignore
import script from "./scripts/search.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

export interface SearchOptions {
  enablePreview: boolean
}

const defaultOptions: SearchOptions = {
  enablePreview: true,
}

export default ((userOpts?: Partial<SearchOptions>) => {
  const Search: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }
    const searchPlaceholder = i18n(cfg.locale).components.search.searchBarPlaceholder
    return (
      <div class={classNames(displayClass, "search")}>
<<<<<<< HEAD
<<<<<<< HEAD
        <button class="search-button">
=======
        <button class="search-button" id="search-button">
          <p>{i18n(cfg.locale).components.search.title}</p>
>>>>>>> 02f2423 (Initial commit)
=======
        <button class="search-button" id="search-button">
          <p>{i18n(cfg.locale).components.search.title}</p>
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
          <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
            <title>Search</title>
            <g class="search-path" fill="none">
              <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>
<<<<<<< HEAD
<<<<<<< HEAD
          <p>{i18n(cfg.locale).components.search.title}</p>
        </button>
        <div class="search-container">
          <div class="search-space">
            <input
              autocomplete="off"
              class="search-bar"
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
        </button>
        <div id="search-container">
          <div id="search-space">
            <input
              autocomplete="off"
              id="search-bar"
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
              name="search"
              type="text"
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
            />
<<<<<<< HEAD
<<<<<<< HEAD
            <div class="search-layout" data-preview={opts.enablePreview}></div>
=======
            <div id="search-layout" data-preview={opts.enablePreview}></div>
>>>>>>> 02f2423 (Initial commit)
=======
            <div id="search-layout" data-preview={opts.enablePreview}></div>
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
          </div>
        </div>
      </div>
    )
  }

  Search.afterDOMLoaded = script
  Search.css = style

  return Search
}) satisfies QuartzComponentConstructor
