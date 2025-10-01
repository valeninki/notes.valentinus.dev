<<<<<<< HEAD
<<<<<<< HEAD
import { Date, getDate } from "./Date"
=======
import { formatDate, getDate } from "./Date"
>>>>>>> 02f2423 (Initial commit)
=======
import { formatDate, getDate } from "./Date"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
<<<<<<< HEAD
<<<<<<< HEAD
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
=======
        segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
>>>>>>> 02f2423 (Initial commit)
=======
        segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
<<<<<<< HEAD
<<<<<<< HEAD
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
        segments.push(displayedTime)
      }

      const segmentsElements = segments.map((segment) => <span>{segment}</span>)

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segmentsElements}
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
