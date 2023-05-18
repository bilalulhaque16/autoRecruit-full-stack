import { call, put, takeEvery, all } from "redux-saga/effects"
import axios from "axios"
import { NAVBAR_ACTION_TYPES } from "./types"

import * as navbarActions from "./actions"

function* getBookmarks() {
  try {
    const response = yield call(axios.get, "/api/bookmarks/data")
    yield put(
      navbarActions.getBookmarksSuccess(
        response.data.suggestions,
        response.data.bookmarks
      )
    )
  } catch (error) {
    yield put(navbarActions.getBookmarksFail(error))
  }
}

function* updateBookmarked(action) {
  try {
    yield call(axios.post, "/api/bookmarks/update", { id: action.payload })
    yield put(navbarActions.updateBookmarkedSuccess(action.payload))
  } catch (error) {
    yield put(navbarActions.updateBookmarkedFail(error))
  }
}

function* navbarSaga() {
  yield all([
    takeEvery(NAVBAR_ACTION_TYPES.GET_BOOKMARKS_REQUEST, getBookmarks),
    takeEvery(NAVBAR_ACTION_TYPES.UPDATE_BOOKMARKED_REQUEST, updateBookmarked)
  ])
}

export default navbarSaga
