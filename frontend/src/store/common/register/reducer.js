import { REGISTER_TYPES } from "./types"

const initialState = {
  data: null,
  error: null,
  loading: false
}

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_TYPES.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        data: null
      }
    case REGISTER_TYPES.SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      }
    case REGISTER_TYPES.FAILURE:
      return {
        ...state,
        error: action.payload,
        data: null,
        loading: false
      }

    default:
      return state
  }
}
