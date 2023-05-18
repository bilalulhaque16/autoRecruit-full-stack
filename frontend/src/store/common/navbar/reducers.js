import { NAVBAR_ACTION_TYPES } from "./types"

const initialState = {
  query: "",
  bookmarks: [],
  suggestions: []
}

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVBAR_ACTION_TYPES.HANDLE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case NAVBAR_ACTION_TYPES.GET_BOOKMARKS_SUCCESS:
      return {
        ...state,
        suggestions: action.payload.data,
        bookmarks: action.payload.bookmarks
      }
    case NAVBAR_ACTION_TYPES.UPDATE_BOOKMARKED_SUCCESS:
      let objectToUpdate
      // ** find & update object
      state.suggestions.find((item) => {
        if (item.id === action.payload) {
          item.isBookmarked = !item.isBookmarked
          objectToUpdate = item
        }
      })

      // ** Get index to add or remove bookmark from array
      const bookmarkIndex = state.bookmarks.findIndex(
        (x) => x.id === action.payload
      )

      if (bookmarkIndex === -1) {
        state.bookmarks.push(objectToUpdate)
      } else {
        state.bookmarks.splice(bookmarkIndex, 1)
      }
      return {
        ...state
      }
    default:
      return state
  }
}

export default navbarReducer
