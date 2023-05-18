// ** ThemeConfig Import

import { LAYOUT_ACTION_TYPES } from "./types"
import themeConfig from "@configs/themeConfig"

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem("menuCollapsed")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

const initialDirection = () => {
  const item = window.localStorage.getItem("direction")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL
}

const initialSkin = () => {
  const item = window.localStorage.getItem("skin")
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin
}

const initialState = {
  skin: initialSkin(),
  isRTL: initialDirection(),
  layout: themeConfig.layout.type,
  lastLayout: themeConfig.layout.type,
  menuCollapsed: initialMenuCollapsed(),
  footerType: themeConfig.layout.footer.type,
  navbarType: themeConfig.layout.navbar.type,
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  navbarColor: themeConfig.layout.navbar.backgroundColor
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_ACTION_TYPES.HANDLE_RTL:
      return { ...state, isRTL: action.payload.isRTL }
    case LAYOUT_ACTION_TYPES.HANDLE_SKIN:
      return { ...state, skin: action.payload.skin }
    case LAYOUT_ACTION_TYPES.HANDLE_LAYOUT:
      return { ...state, layout: action.payload.layout }
    case LAYOUT_ACTION_TYPES.HANDLE_LAST_LAYOUT:
      return { ...state, lastLayout: action.payload.lastLayout }
    case LAYOUT_ACTION_TYPES.HANDLE_MENU_HIDDEN:
      return { ...state, menuHidden: action.payload.menuHidden }
    case LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_TYPE:
      return { ...state, navbarType: action.payload.navbarType }
    case LAYOUT_ACTION_TYPES.HANDLE_FOOTER_TYPE:
      return { ...state, footerType: action.payload.footerType }
    case LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_COLOR:
      return { ...state, navbarColor: action.payload.navbarColor }
    case LAYOUT_ACTION_TYPES.HANDLE_CONTENT_WIDTH:
      return { ...state, contentWidth: action.payload.contentWidth }

    case LAYOUT_ACTION_TYPES.HANDLE_MENU_COLLAPSED:
      return { ...state, menuCollapsed: action.payload.menuCollapsed }
    default:
      return state
  }
}

export default layoutReducer
