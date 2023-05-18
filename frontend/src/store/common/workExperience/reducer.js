import { PROFILE_TYPES } from "./types"

const initialState = {
  error: null,
  experience: null,
  education: null,
  skills: null,
  languages: null,
  languagesResponse: null,
  educationResponse: null
}

export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_TYPES.GET_PROFILE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_EDUCATION_SUCCESS:
      return {
        ...state,
        education: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_EDUCATION_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_SKILLS_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // get labguages
    case PROFILE_TYPES.GET_PROFILE_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload
      }

    case PROFILE_TYPES.GET_PROFILE_LANGUAGES_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // POST LANGUAGES
    case PROFILE_TYPES.POST_PROFILE_LANGUAGES_SUCCESS:
      return {
        ...state,
        languagesResponse: action.payload
      }

    case PROFILE_TYPES.POST_PROFILE_LANGUAGES_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // POST EDUCATION
    case PROFILE_TYPES.POST_PROFILE_EDUCATION_SUCCESS:
      return {
        ...state,
        education: action.payload
      }

    case PROFILE_TYPES.POST_PROFILE_EDUCATION_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    // POST EXPERIENCE
    case PROFILE_TYPES.POST_PROFILE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience: action.payload
      }

    case PROFILE_TYPES.POST_PROFILE_EXPERIENCE_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}
