import { Root as HTMLRoot } from "hast"
import { toString } from "hast-util-to-string"
import { QuartzTransformerPlugin } from "../types"
import { escapeHTML } from "../../util/escape"

export interface Options {
  descriptionLength: number
<<<<<<< HEAD
<<<<<<< HEAD
  maxDescriptionLength: number
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  replaceExternalLinks: boolean
}

const defaultOptions: Options = {
  descriptionLength: 150,
<<<<<<< HEAD
<<<<<<< HEAD
  maxDescriptionLength: 300,
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  replaceExternalLinks: true,
}

const urlRegex = new RegExp(
  /(https?:\/\/)?(?<domain>([\da-z\.-]+)\.([a-z\.]{2,6})(:\d+)?)(?<path>[\/\w\.-]*)(\?[\/\w\.=&;-]*)?/,
  "g",
)

export const Description: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Description",
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot, file) => {
            let frontMatterDescription = file.data.frontmatter?.description
            let text = escapeHTML(toString(tree))

            if (opts.replaceExternalLinks) {
              frontMatterDescription = frontMatterDescription?.replace(
                urlRegex,
                "$<domain>" + "$<path>",
              )
              text = text.replace(urlRegex, "$<domain>" + "$<path>")
            }

<<<<<<< HEAD
<<<<<<< HEAD
            if (frontMatterDescription) {
              file.data.description = frontMatterDescription
              file.data.text = text
              return
            }

            // otherwise, use the text content
            const desc = text
            const sentences = desc.replace(/\s+/g, " ").split(/\.\s/)
            let finalDesc = ""
            let sentenceIdx = 0

            // Add full sentences until we exceed the guideline length
            while (sentenceIdx < sentences.length) {
              const sentence = sentences[sentenceIdx]
              if (!sentence) break

              const currentSentence = sentence.endsWith(".") ? sentence : sentence + "."
              const nextLength = finalDesc.length + currentSentence.length + (finalDesc ? 1 : 0)

              // Add the sentence if we're under the guideline length
              // or if this is the first sentence (always include at least one)
              if (nextLength <= opts.descriptionLength || sentenceIdx === 0) {
                finalDesc += (finalDesc ? " " : "") + currentSentence
                sentenceIdx++
              } else {
                break
              }
            }

            // truncate to max length if necessary
            file.data.description =
              finalDesc.length > opts.maxDescriptionLength
                ? finalDesc.slice(0, opts.maxDescriptionLength) + "..."
                : finalDesc
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
            const desc = frontMatterDescription ?? text
            const sentences = desc.replace(/\s+/g, " ").split(/\.\s/)
            const finalDesc: string[] = []
            const len = opts.descriptionLength
            let sentenceIdx = 0
            let currentDescriptionLength = 0

            if (sentences[0] !== undefined && sentences[0].length >= len) {
              const firstSentence = sentences[0].split(" ")
              while (currentDescriptionLength < len) {
                const sentence = firstSentence[sentenceIdx]
                if (!sentence) break
                finalDesc.push(sentence)
                currentDescriptionLength += sentence.length
                sentenceIdx++
              }
              finalDesc.push("...")
            } else {
              while (currentDescriptionLength < len) {
                const sentence = sentences[sentenceIdx]
                if (!sentence) break
                const currentSentence = sentence.endsWith(".") ? sentence : sentence + "."
                finalDesc.push(currentSentence)
                currentDescriptionLength += currentSentence.length
                sentenceIdx++
              }
            }

            file.data.description = finalDesc.join(" ")
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
            file.data.text = text
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    description: string
    text: string
  }
}
