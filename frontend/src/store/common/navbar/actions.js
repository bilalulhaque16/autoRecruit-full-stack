import { NAVBAR_ACTION_TYPES } from "./types"

export const handleSearchQuery = (query) => ({
  type: NAVBAR_ACTION_TYPES.HANDLE_SEARCH_QUERY,
  payload: query
})

export const getBookmarksSuccess = (data, bookmarks) => ({
  type: NAVBAR_ACTION_TYPES.GET_BOOKMARKS_SUCCESS,
  payload: {
    data,
    bookmarks
  }
})

export const updateBookmarkedSuccess = (id) => ({
  type: NAVBAR_ACTION_TYPES.UPDATE_BOOKMARKED_SUCCESS,
  payload: id
})

export const getBookmarksFail = (error) => ({
  type: NAVBAR_ACTION_TYPES.GET_BOOKMARKS_FAIL,
  payload: error
})

export const updateBookmarkedFail = (error) => ({
  type: NAVBAR_ACTION_TYPES.UPDATE_BOOKMARKED_FAIL,
  payload: error
})

export const getBookmarksRequest = () => ({
  type: NAVBAR_ACTION_TYPES.GET_BOOKMARKS_REQUEST
})

export const updateBookmarkedRequest = (id) => ({
  type: NAVBAR_ACTION_TYPES.UPDATE_BOOKMARKED_REQUEST,
  payload: id
})
