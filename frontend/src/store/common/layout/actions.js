import { LAYOUT_ACTION_TYPES } from "./types"

export const handleRTL = (isRTL) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_RTL,
  payload: { isRTL }
})

export const handleRTLAsync = (isRTL) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_RTL_ASYNC,
    payload: { isRTL }
  }
}

export const handleSkin = (skin) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_SKIN,
    payload: { skin }
  }
}

export const handleSkinAsync = (skin) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_SKIN_ASYNC,
    payload: { skin }
  }
}

export const handleLayout = (layout) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_LAYOUT,
  payload: { layout }
})

export const handleLayoutAsync = (layout) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_LAYOUT_ASYNC,
    payload: { layout }
  }
}

export const handleLastLayout = (lastLayout) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_LAST_LAYOUT,
  payload: { lastLayout }
})

export const handleLastLayoutAsync = (lastLayout) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_LAST_LAYOUT_ASYNC,
    payload: { lastLayout }
  }
}

export const handleMenuHidden = (menuHidden) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_MENU_HIDDEN,
  payload: { menuHidden }
})

export const handleMenuHiddenAsync = (menuHidden) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_MENU_HIDDEN_ASYNC,
    payload: { menuHidden }
  }
}

export const handleNavbarType = (navbarType) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_TYPE,
  payload: { navbarType }
})

export const handleNavbarTypeAsync = (navbarType) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_TYPE_ASYNC,
    payload: { navbarType }
  }
}

export const handleFooterType = (footerType) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_FOOTER_TYPE,
  payload: { footerType }
})

export const handleFooterTypeAsync = (footerType) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_FOOTER_TYPE_ASYNC,
    payload: { footerType }
  }
}

export const handleNavbarColor = (navbarColor) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_COLOR,
  payload: { navbarColor }
})

export const handleNavbarColorAsync = (navbarColor) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_COLOR_ASYNC,
    payload: { navbarColor }
  }
}

export const handleContentWidth = (contentWidth) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_CONTENT_WIDTH,
  payload: { contentWidth }
})

export const handleContentWidthAsync = (contentWidth) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_CONTENT_WIDTH_ASYNC,
    payload: { contentWidth }
  }
}

export const handleMenuCollapsed = (menuCollapsed) => ({
  type: LAYOUT_ACTION_TYPES.HANDLE_MENU_COLLAPSED,
  payload: { menuCollapsed }
})

export const handleMenuCollapsedAsync = (menuCollapsed) => {
  return {
    type: LAYOUT_ACTION_TYPES.HANDLE_MENU_COLLAPSED_ASYNC,
    payload: { menuCollapsed }
  }
}
