import * as profileActions from "./actions"

import { all, call, put, take, takeEvery } from "redux-saga/effects"
import {
  getProfileEducation,
  getProfileExperience,
  getProfileLanguages,
  getProfileSkillsets,
  postProfileEducation,
  postProfileExperience,
  postProfileLanguages
} from "@src/services/apis"

import { PROFILE_TYPES } from "./types"

function* getProfileExperienceRequest(action) {
  try {
    const response = yield call(getProfileExperience, action.payload)
    yield put(profileActions.getProfileExperienceSuccess(response))
  } catch (err) {
    yield put(profileActions.getProfileExperienceFailure(err))
  }
}

function* getProfileEducationRequest(action) {
  try {
    const response = yield call(getProfileEducation, action.payload)
    yield put(profileActions.getProfileEducationSuccess(response))
  } catch (err) {
    yield put(profileActions.getProfileEducationFailure(err))
  }
}

function* getProfileSkillRequest(action) {
  try {
    const response = yield call(getProfileSkillsets, action.payload)
    yield put(profileActions.getProfileSkillsSuccess(response))
  } catch (err) {
    yield put(profileActions.getProfileSkillsFailure(err))
  }
}

function* getProfileLanguagesRequest(action) {
  try {
    const response = yield call(getProfileLanguages, action.payload)
    yield put(profileActions.getProfileLanguagesSuccess(response))
  } catch (err) {
    yield put(profileActions.getProfileLanguagesFailure(err))
  }
}

function* postProfileLanguagesRequest(action) {
  try {
    const response = yield call(postProfileLanguages, action.payload)
    yield put(profileActions.postProfileLanguagesSuccess(response))
  } catch (err) {
    yield put(profileActions.postProfileLanguagesFailure(err))
  }
}

function* postProfileEducationRequest(action) {
  try {
    const response = yield call(postProfileEducation, action.payload)
    yield put(profileActions.postProfileEducationSuccess(response))
  } catch (err) {
    yield put(profileActions.postProfileEducationFailure(err))
  }
}

function* postProfileExperienceRequest(action) {
  try {
    const response = yield call(postProfileExperience, action.payload)
    yield put(profileActions.postProfileExperienceSuccess(response))
  } catch (err) {
    yield put(profileActions.postProfileExperienceFailure(err))
  }
}

function* ProfileSaga() {
  yield all([
    takeEvery(
      PROFILE_TYPES.GET_PROFILE_EXPERIENCE_REQUEST,
      getProfileExperienceRequest
    ),
    takeEvery(
      PROFILE_TYPES.GET_PROFILE_EDUCATION_REQUEST,
      getProfileEducationRequest
    ),
    takeEvery(PROFILE_TYPES.GET_PROFILE_SKILLS_REQUEST, getProfileSkillRequest),
    takeEvery(
      PROFILE_TYPES.GET_PROFILE_LANGUAGES_REQUEST,
      getProfileLanguagesRequest
    ),
    takeEvery(
      PROFILE_TYPES.POST_PROFILE_LANGUAGES_REQUEST,
      postProfileLanguagesRequest
    ),
    takeEvery(
      PROFILE_TYPES.POST_PROFILE_EDUCATION_REQUEST,
      postProfileEducationRequest
    ),
    takeEvery(
      PROFILE_TYPES.POST_PROFILE_EXPERIENCE_REQUEST,
      postProfileExperienceRequest
    )
  ])
}

export default ProfileSaga
