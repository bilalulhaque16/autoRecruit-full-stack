import { COMPANY_PROFILE_TYPES } from "./types"

const initialState = {
  Profile: {},
  error: null
}

export default function companyProfileReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        Profile: action.payload
      }

    case COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload
      }

    case COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_SUCCESS:
      return {
        ...state
      }

    case COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload
      }

    case COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        Profile: action.payload
      }

    case COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
