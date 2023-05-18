import { createActionTypes } from "./../../../utility/index"

export const LAYOUT_ACTION_TYPES = createActionTypes("LAYOUT", [
  "HANDLE_RTL",
  "HANDLE_RTL_ASYNC",
  "HANDLE_SKIN",
  "HANDLE_SKIN_ASYNC",
  "HANDLE_LAYOUT",
  "HANDLE_LAYOUT_ASYNC",
  "HANDLE_LAST_LAYOUT",
  "HANDLE_LAST_LAYOUT_ASYNC",
  "HANDLE_MENU_HIDDEN",
  "HANDLE_MENU_HIDDEN_ASYNC",
  "HANDLE_NAVBAR_TYPE",
  "HANDLE_NAVBAR_TYPE_ASYNC",
  "HANDLE_FOOTER_TYPE",
  "HANDLE_FOOTER_TYPE_ASYNC",
  "HANDLE_NAVBAR_COLOR",
  "HANDLE_NAVBAR_COLOR_ASYNC",
  "HANDLE_CONTENT_WIDTH",
  "HANDLE_CONTENT_WIDTH_ASYNC",
  "HANDLE_MENU_COLLAPSED",
  "HANDLE_MENU_COLLAPSED_ASYNC"
])
