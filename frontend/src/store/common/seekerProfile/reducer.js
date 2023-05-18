import { SEEKER_PROFILE_TYPES } from "./types"

const initialState = {
  loading: false,
  data: {},
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  visit_logs: [],
  questions: [],
  error: null,
  success: null,
  successforpatch: null,
  successforpost: null,
  response: null,
  responseforpatch: null,
  responseforpost: null,
  all_skills: []
}

export default function seekerProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SEEKER_PROFILE_TYPES.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case SEEKER_PROFILE_TYPES.GET_PROFILE_SUCCESS:
      const {
        personal_info,
        work_and_experience,
        seeker_questions,
        _id,
        user_account_id
      } = action.payload

      const {
        education_details,
        experience_details,
        profile_visit_logs,
        seeker_skill_sets,
        seeker_languages
      } = work_and_experience
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        response: action.payload,
        data: {
          personal_info,
          _id,
          user_account_id
        },
        educations: education_details,
        experiences: experience_details,
        skills: seeker_skill_sets,
        languages: seeker_languages,
        questions: seeker_questions,
        visit_logs: profile_visit_logs
      }
    case SEEKER_PROFILE_TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
        educations: null,
        experiences: null,
        skills: null,
        languages: null,
        questions: null,
        visit_logs: null,
        success: null,
        response: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpatch: null
      }
    case SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpatch: true,
        responseforpatch: action.payload
      }
    case SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpatch: null,
        responseforpatch: null
      }

    case SEEKER_PROFILE_TYPES.POST_EXPERIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.POST_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpost: true,
        responseforpost: action.payload
      }

    case SEEKER_PROFILE_TYPES.POST_EXPERIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpatch: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpatch: true,
        responseforpatch: action.payload
      }

    case SEEKER_PROFILE_TYPES.PATCH_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpatch: null,
        responseforpatch: null
      }

    case SEEKER_PROFILE_TYPES.POST_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.POST_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpost: true,
        responseforpost: action.payload
      }

    case SEEKER_PROFILE_TYPES.POST_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpost: null,
        responseforpost: null
      }
    case SEEKER_PROFILE_TYPES.CLEAR_RESPONSE:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        response: null,
        successforpatch: null,
        responseforpatch: null,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.GET_SKILLS_SUCCESS:
      return {
        ...state,
        error: null,
        all_skills: action.payload.docs.map((skill) => {
          return {
            value: skill._id,
            label: skill.skill_set_name
          }
        })
      }

    case SEEKER_PROFILE_TYPES.GET_SKILLS_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case SEEKER_PROFILE_TYPES.PATCH_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpatch: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpatch: true,
        responseforpatch: action.payload
      }

    case SEEKER_PROFILE_TYPES.PATCH_SKILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpatch: null,
        responseforpatch: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpatch: null
      }

    case SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpatch: true,
        responseforpatch: action.payload
      }

    case SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpatch: null,
        responseforpatch: null
      }

    // post skills
    case SEEKER_PROFILE_TYPES.POST_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.POST_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpost: true,
        responseforpost: action.payload
      }

    case SEEKER_PROFILE_TYPES.POST_SKILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.POST_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successforpost: null,
        responseforpost: null
      }

    case SEEKER_PROFILE_TYPES.POST_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successforpost: true,
        responseforpost: action.payload
      }

    case SEEKER_PROFILE_TYPES.POST_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successforpost: null,
        responseforpost: null
      }

    // delete skills
    case SEEKER_PROFILE_TYPES.DELETE_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case SEEKER_PROFILE_TYPES.DELETE_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case SEEKER_PROFILE_TYPES.DELETE_SKILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
