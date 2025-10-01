import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

<<<<<<< HEAD
<<<<<<< HEAD
export default ((component: QuartzComponent) => {
  const Component = component
  const MobileOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return <Component displayClass="mobile-only" {...props} />
  }

  MobileOnly.displayName = component.displayName
  MobileOnly.afterDOMLoaded = component?.afterDOMLoaded
  MobileOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  MobileOnly.css = component?.css
  return MobileOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
=======
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    const MobileOnly: QuartzComponent = (props: QuartzComponentProps) => {
      return <Component displayClass="mobile-only" {...props} />
    }

    MobileOnly.displayName = component.displayName
    MobileOnly.afterDOMLoaded = component?.afterDOMLoaded
    MobileOnly.beforeDOMLoaded = component?.beforeDOMLoaded
    MobileOnly.css = component?.css
    return MobileOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
<<<<<<< HEAD
>>>>>>> 02f2423 (Initial commit)
=======
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
