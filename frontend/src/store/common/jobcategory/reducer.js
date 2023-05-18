import { JOB_CATEGORY_TYPES } from "./types"

const initialState = {
  jobCategories: {},
  error: null,
  created: false,
  deleted: false,
  updated: false,
  successfullyCreated: false,
  successfullyDeleted: false,
  successfullyUpdated: false,
  reset: false
}

const jobCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_SUCCESS:
      return {
        ...state,
        jobCategories: action.payload
      }
    case JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        created: action.payload,
        successfullyCreated: true
      }
    case JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        updated: action.payload
      }

    case JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        deleted: action.payload
      }

    case JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default jobCategoryReducer
