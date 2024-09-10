import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

<<<<<<< HEAD
export default ((component: QuartzComponent) => {
  const Component = component
  const DesktopOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return <Component displayClass="desktop-only" {...props} />
  }

  DesktopOnly.displayName = component.displayName
  DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded
  DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  DesktopOnly.css = component?.css
  return DesktopOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
=======
export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    const DesktopOnly: QuartzComponent = (props: QuartzComponentProps) => {
      return <Component displayClass="desktop-only" {...props} />
    }

    DesktopOnly.displayName = component.displayName
    DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded
    DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded
    DesktopOnly.css = component?.css
    return DesktopOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
>>>>>>> 02f2423 (Initial commit)
