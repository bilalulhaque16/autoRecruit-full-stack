import { JOBS_ACTION_TYPES } from "./types"

const initialState = {
  jobs: [],
  job: {},
  appliedJobs: {},
  appliedJob: {},
  apply: "",
  error: null,
  loading: false,
  loadingforSpecificJob: false,
  loadingforApply: false,
  loadingforJobPost: false,
  result: null
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_ACTION_TYPES.GET_ALL_JOBS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case JOBS_ACTION_TYPES.GET_ALL_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      }
    case JOBS_ACTION_TYPES.GET_ALL_JOBS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case JOBS_ACTION_TYPES.CLEAR_SPECIFIC_JOB:
      return {
        ...state,
        job: {}
      }

    case JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_REQUEST:
      return {
        ...state,
        loadingforSpecificJob: true
      }

    case JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_SUCCESS:
      return {
        ...state,
        job: action.payload,
        loadingforSpecificJob: false
      }
    case JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingforSpecificJob: false
      }

    case JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_SUCCESS:
      return {
        ...state,
        appliedJobs: action.payload,
        loading: false
      }
    case JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_REQUEST:
      return {
        ...state,
        loadingforSpecificJob: true
      }

    case JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_SUCCESS:
      return {
        ...state,
        appliedJob: action.payload,
        loadingforSpecificJob: false
      }

    case JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingforSpecificJob: false
      }

    case JOBS_ACTION_TYPES.APPLY_FOR_JOB_REQUEST:
      return {
        ...state,
        loadingforApply: true
      }

    case JOBS_ACTION_TYPES.APPLY_FOR_JOB_SUCCESS:
      return {
        ...state,
        apply: action.payload,
        loadingforApply: false
      }

    case JOBS_ACTION_TYPES.APPLY_FOR_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingforApply: false
      }

    case JOBS_ACTION_TYPES.RESET_APPLY_FOR_JOB:
      return {
        ...state,
        apply: action.payload,
        loadingforApply: false
      }

    case JOBS_ACTION_TYPES.CLEAR_SPECIFIC_APPLIED_JOB:
      return {
        ...state,
        appliedJob: {},
        loadingforSpecificJob: false,
        error: null
      }
    case JOBS_ACTION_TYPES.CREATE_JOB_REQUEST:
      return {
        ...state,
        loadingforJobPost: true,
        result: null
      }
    case JOBS_ACTION_TYPES.CREATE_JOB_SUCCESS:
      return {
        ...state,
        result: 1,
        loadingforJobPost: false
      }

    case JOBS_ACTION_TYPES.CREATE_JOB_FAIL:
      return {
        ...state,
        loadingforJobPost: false,
        result: 2
      }

    case JOBS_ACTION_TYPES.RESET_CREATE_JOB:
      return {
        ...state,
        loadingforJobPost: false,
        result: null
      }

    case JOBS_ACTION_TYPES.RESET_GET_ALL_JOBS:
      return {
        ...state,
        jobs: [],
        loading: false,
        error: null
      }

    default:
      return state
  }
}

export default jobsReducer
