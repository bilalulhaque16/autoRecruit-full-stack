import * as seekerProfileActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"
import {
  deleteSkillset,
  getProfile,
  getSkills,
  postProfileEducation,
  postProfileExperience,
  postProfileLanguages,
  postProfileSkillsets,
  updateProfileEducation,
  updateProfileExperience,
  updateProfileLanguage,
  updateProfileSkillset
} from "@src/services/apis"

import { SEEKER_PROFILE_TYPES } from "./types"

function* getProfileRequest(action) {
  try {
    const response = yield call(getProfile, action.payload)
    yield put(seekerProfileActions.getProfileSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.getProfileFailure(err))
  }
}

function* getSkillsRequest() {
  try {
    const response = yield call(getSkills)
    yield put(seekerProfileActions.getSkillsSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.getSkillsFailure(err))
  }
}

function* postExperienceRequest(action) {
  try {
    const response = yield call(postProfileExperience, action.payload)
    if (response?.code === "ERR_NETWORK") {
      yield put(
        seekerProfileActions.postExperienceFailure({ message: "Network Error" })
      )
    } else if (response?.status === 200 || response.status === 201) {
      yield put(seekerProfileActions.postExperienceSuccess(response))
    } else {
      yield put(seekerProfileActions.postExperienceFailure(response))
    }
  } catch (err) {
    yield put(seekerProfileActions.postExperienceFailure(err))
  }
}

function* postLanguagesRequest(action) {
  try {
    const response = yield call(postProfileLanguages, action.payload)

    if (response?.code === "ERR_NETWORK") {
      yield put(
        seekerProfileActions.postLanguagesFailure({ message: "Network Error" })
      )
    } else if (response?.status === 200 || response.status === 201) {
      yield put(seekerProfileActions.postLanguagesSuccess(response))
    } else {
      yield put(seekerProfileActions.postLanguagesFailure(response))
    }
  } catch (err) {
    yield put(seekerProfileActions.postLanguagesFailure(err))
  }
}

function* postEducationRequest(action) {
  try {
    const response = yield call(postProfileEducation, action.payload)

    if (response?.code === "ERR_NETWORK") {
      yield put(
        seekerProfileActions.postEducationFailure({ message: "Network Error" })
      )
    } else if (response?.status === 200 || response.status === 201) {
      yield put(seekerProfileActions.postEducationSuccess(response))
    } else {
      yield put(seekerProfileActions.postEducationFailure(response))
    }
  } catch (err) {
    yield put(seekerProfileActions.postEducationFailure(err))
  }
}

function* postSkillsRequest(action) {
  try {
    const response = yield call(postProfileSkillsets, action.payload)
    if (response?.code === "ERR_NETWORK") {
      yield put(
        seekerProfileActions.postSkillsFailure({ message: "Network Error" })
      )
    } else if (response?.status === 200 || response.status === 201) {
      yield put(seekerProfileActions.postSkillsSuccess(response))
    } else {
      yield put(seekerProfileActions.postSkillsFailure(response))
    }
  } catch (err) {
    yield put(seekerProfileActions.postSkillsFailure(err))
  }
}

// delete skills
function* deleteSkillsRequest(action) {
  try {
    const response = yield call(deleteSkillset, action.payload)
    if (response?.code === "ERR_NETWORK") {
      yield put(
        seekerProfileActions.deleteSkillsFailure({ message: "Network Error" })
      )
    } else if (response?.status === 200 || response.status === 201) {
      yield put(seekerProfileActions.deleteSkillsSuccess(response))
    } else {
      yield put(seekerProfileActions.deleteSkillsFailure(response))
    }
  } catch (err) {
    yield put(seekerProfileActions.deleteSkillsFailure(err))
  }
}

function* updateExperienceRequest(action) {
  try {
    const response = yield call(updateProfileExperience, action.payload)
    yield put(seekerProfileActions.patchExperienceSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.patchExperienceFailure(err))
  }
}

function* updateEducationRequest(action) {
  try {
    const response = yield call(updateProfileEducation, action.payload)
    yield put(seekerProfileActions.patchEducationSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.patchEducationFailure(err))
  }
}

function* updateLanguageRequest(action) {
  try {
    const response = yield call(updateProfileLanguage, action.payload)
    yield put(seekerProfileActions.patchLanguagesSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.patchLanguagesFailure(err))
  }
}

function* updateSkillRequest(action) {
  try {
    const response = yield call(updateProfileSkillset, action.payload)
    yield put(seekerProfileActions.patchSkillsSuccess(response.data))
  } catch (err) {
    yield put(seekerProfileActions.patchSkillsFailure(err))
  }
}

function* seekerProfileSaga() {
  yield all([
    takeEvery(SEEKER_PROFILE_TYPES.GET_PROFILE_REQUEST, getProfileRequest),
    takeEvery(SEEKER_PROFILE_TYPES.GET_SKILLS_REQUEST, getSkillsRequest),
    takeEvery(
      SEEKER_PROFILE_TYPES.PATCH_EXPERIENCE_REQUEST,
      updateExperienceRequest
    ),
    takeEvery(
      SEEKER_PROFILE_TYPES.PATCH_EDUCATION_REQUEST,
      updateEducationRequest
    ),
    takeEvery(
      SEEKER_PROFILE_TYPES.PATCH_LANGUAGES_REQUEST,
      updateLanguageRequest
    ),
    takeEvery(SEEKER_PROFILE_TYPES.PATCH_SKILLS_REQUEST, updateSkillRequest),
    takeEvery(
      SEEKER_PROFILE_TYPES.POST_EXPERIENCE_REQUEST,
      postExperienceRequest
    ),
    takeEvery(
      SEEKER_PROFILE_TYPES.POST_LANGUAGES_REQUEST,
      postLanguagesRequest
    ),
    takeEvery(
      SEEKER_PROFILE_TYPES.POST_EDUCATION_REQUEST,
      postEducationRequest
    ),
    takeEvery(SEEKER_PROFILE_TYPES.POST_SKILLS_REQUEST, postSkillsRequest),
    takeEvery(SEEKER_PROFILE_TYPES.DELETE_SKILLS_REQUEST, deleteSkillsRequest)
  ])
}

export default seekerProfileSaga
