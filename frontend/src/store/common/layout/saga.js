import { put, takeEvery, all } from "redux-saga/effects"

import { LAYOUT_ACTION_TYPES } from "./types"

import * as layoutActions from "./actions"

function* handleRTLAsync(action) {
  yield put(layoutActions.handleRTL(action.payload.isRTL))
  window.localStorage.setItem("direction", JSON.stringify(action.payload.isRTL))
}

function* handleSkinAsync(action) {
  yield put(layoutActions.handleSkin(action.payload.skin))
  window.localStorage.setItem("skin", JSON.stringify(action.payload.skin))
}

function* handleLayoutAsync(action) {
  yield put(layoutActions.handleLayout(action.payload.layoutActions))
}

function* handleLastLayoutAsync(action) {
  yield put(layoutActions.handleLastLayout(action.payload.lastLayout))
}

function* handleMenuHiddenAsync(action) {
  yield put(layoutActions.handleMenuHidden(action.payload.menuHidden))
}

function* handleNavbarTypeAsync(action) {
  yield put(layoutActions.handleNavbarType(action.payload.navbarType))
}

function* handleFooterTypeAsync(action) {
  yield put(layoutActions.handleFooterType(action.payload.footerType))
}

function* handleNavbarColorAsync(action) {
  yield put(layoutActions.handleNavbarColor(action.payload.navbarColor))
}

function* handleContentWidthAsync(action) {
  yield put(layoutActions.handleContentWidth(action.payload.contentWidth))
}

function* handleMenuCollapsedAsync(action) {
  yield put(layoutActions.handleMenuCollapsed(action.payload.menuCollapsed))
  window.localStorage.setItem(
    "menuCollapsed",
    JSON.stringify(action.payload.menuCollapsed)
  )
}

function* layoutSaga() {
  yield all([
    takeEvery(LAYOUT_ACTION_TYPES.HANDLE_RTL_ASYNC, handleRTLAsync),
    takeEvery(LAYOUT_ACTION_TYPES.HANDLE_SKIN_ASYNC, handleSkinAsync),
    takeEvery(LAYOUT_ACTION_TYPES.HANDLE_LAYOUT_ASYNC, handleLayoutAsync),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_LAST_LAYOUT_ASYNC,
      handleLastLayoutAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_MENU_HIDDEN_ASYNC,
      handleMenuHiddenAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_TYPE_ASYNC,
      handleNavbarTypeAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_FOOTER_TYPE_ASYNC,
      handleFooterTypeAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_NAVBAR_COLOR_ASYNC,
      handleNavbarColorAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_CONTENT_WIDTH_ASYNC,
      handleContentWidthAsync
    ),
    takeEvery(
      LAYOUT_ACTION_TYPES.HANDLE_MENU_COLLAPSED_ASYNC,
      handleMenuCollapsedAsync
    )
  ])
}

export default layoutSaga
