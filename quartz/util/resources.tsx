import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"
<<<<<<< HEAD
<<<<<<< HEAD
import { QuartzPluginData } from "../plugins/vfile"
=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

<<<<<<< HEAD
<<<<<<< HEAD
export type CSSResource = {
  content: string
  inline?: boolean
  spaPreserve?: boolean
}

=======
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const scriptType = resource.moduleType ?? "application/javascript"
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.contentType === "external") {
    return (
      <script key={resource.src} src={resource.src} type={scriptType} spa-preserve={spaPreserve} />
    )
  } else {
    const content = resource.script
    return (
      <script
        key={randomUUID()}
        type={scriptType}
        spa-preserve={spaPreserve}
        dangerouslySetInnerHTML={{ __html: content }}
      ></script>
    )
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
export function CSSResourceToStyleElement(resource: CSSResource, preserve?: boolean): JSX.Element {
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.inline ?? false) {
    return <style>{resource.content}</style>
  } else {
    return (
      <link
        key={resource.content}
        href={resource.content}
        rel="stylesheet"
        type="text/css"
        spa-preserve={spaPreserve}
      />
    )
  }
}

export interface StaticResources {
  css: CSSResource[]
  js: JSResource[]
  additionalHead: (JSX.Element | ((pageData: QuartzPluginData) => JSX.Element))[]
}

export type StringResource = string | string[] | undefined
export function concatenateResources(...resources: StringResource[]): StringResource {
  return resources
    .filter((resource): resource is string | string[] => resource !== undefined)
    .flat()
=======
export interface StaticResources {
  css: string[]
  js: JSResource[]
>>>>>>> 02f2423 (Initial commit)
=======
export interface StaticResources {
  css: string[]
  js: JSResource[]
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
}
