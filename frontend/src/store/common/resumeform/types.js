import { createActionTypes } from "@src/utility"

export const RESUME_FORM_ACTION_TYPES = createActionTypes("resumeform", [
  "GET_ALL_COUNTRIES_REQUEST",
  "GET_ALL_COUNTRIES_SUCCESS",
  "GET_ALL_COUNTRIES_FAIL",
  "GET_ALL_STATES_REQUEST",
  "GET_ALL_STATES_SUCCESS",
  "GET_ALL_STATES_FAIL",
  "GET_ALL_CITIES_REQUEST",
  "GET_ALL_CITIES_SUCCESS",
  "GET_ALL_CITIES_FAIL",
  "POST_RESUME_FORM_REQUEST",
  "POST_RESUME_FORM_SUCCESS",
  "POST_RESUME_FORM_FAIL",
  "CLEAR_RESUME_FORM",
  "FUTURE_NAVIGATION",
  "UPLOAD_RESUME_REQUEST",
  "UPLOAD_RESUME_SUCCESS",
  "UPLOAD_RESUME_FAIL",
  "REMOVE_RESUME_URL"
])