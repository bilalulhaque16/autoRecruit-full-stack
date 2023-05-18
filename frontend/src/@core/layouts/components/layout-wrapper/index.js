// ** React Imports
import { Fragment, useEffect, memo } from "react"

// ** Third Party Components
import classnames from "classnames"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"

// ** ThemeConfig
import themeConfig from "@configs/themeConfig"

// ** Store Imports
import * as layoutActions from "@src/store/common/layout/actions"

// ** Styles
import "animate.css/animate.css"

const LayoutWrapper = (props) => {
  // ** Props
  const { children, routeMeta } = props

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state)

  const navbarStore = store.navbarReducer
  const layoutStored = store.layoutReducer.layout
  const contentWidth = store.layoutReducer.contentWidth
  //** Vars
  const appLayoutCondition =
    (layoutStored.layout === "horizontal" && !routeMeta) ||
    (layoutStored.layout === "horizontal" && routeMeta && !routeMeta.appLayout)
  const Tag = appLayoutCondition ? "div" : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (
        routeMeta.contentWidth &&
        routeMeta.contentWidth === store.layoutReducer.contentWidth
      ) {
        dispatch(
          layoutActions.handleContentWidth(themeConfig.layout.contentWidth)
        )
      }
      if (
        routeMeta.menuCollapsed &&
        routeMeta.menuCollapsed === store.layoutReducer.menuCollapsed
      ) {
        dispatch(
          layoutActions.handleMenuCollapsed(!store.layoutReducer.menuCollapsed)
        )
      }
      if (
        routeMeta.menuHidden &&
        routeMeta.menuHidden === store.layoutReducer.menuHidden
      ) {
        dispatch(
          layoutActions.handleMenuHidden(!store.layoutReducer.menuHidden)
        )
      }
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(layoutActions.handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(layoutActions.handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(layoutActions.handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [routeMeta])

  return (
    <div
      className={classnames("app-content content overflow-hidden", {
        [routeMeta ? routeMeta.className : ""]:
          routeMeta && routeMeta.className,
        "show-overlay": navbarStore.query.length
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": routeMeta && !routeMeta.appLayout,
          "content-area-wrapper": routeMeta && routeMeta.appLayout,
          "container-xxl p-0": contentWidth === "boxed"
        })}
      >
        <Tag {...(appLayoutCondition ? { className: "content-body" } : {})}>
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default memo(LayoutWrapper)
