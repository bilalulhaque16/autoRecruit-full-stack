import { RESUME_FORM_ACTION_TYPES } from "./types"

const initialState = {
  countries: null,
  states: null,
  cities: null,
  error: null,
  ResumeInfo: {},
  // resumeUrl: null,
  futureNavigation: null,
  loading: false,
  resumeData: {}
}

const resumeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload
      }
    case RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_SUCCESS:
      return {
        ...state,
        states: action.payload
      }
    case RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload
      }
    case RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_REQUEST:
      return {
        ...state,
        loading: true
      }

    case RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_SUCCESS:
      return {
        ...state,
        ResumeInfo: action.payload,
        loading: false
      }
    case RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_REQUEST:
      return {
        ...state,
        loading: true
      }

    case RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_SUCCESS:
      return {
        ...state,
        resumeData:action.payload, 
        loading: false
      }
    case RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case RESUME_FORM_ACTION_TYPES.REMOVE_RESUME_URL:
      return {
        ...state,
        resumeUrl: null
      }

    case RESUME_FORM_ACTION_TYPES.CLEAR_RESUME_FORM:
      return {
        ...state,
        ResumeInfo: {},
        resumeUrl: null
      }

    case RESUME_FORM_ACTION_TYPES.FUTURE_NAVIGATION:
      return {
        ...state,
        futureNavigation: action.payload
      }

    default:
      return state
  }
}

export default resumeFormReducer
