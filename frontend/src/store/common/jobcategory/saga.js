import { put, takeEvery, all, call } from "redux-saga/effects"

import { JOB_CATEGORY_TYPES } from "./types"

import * as jobCategoryActions from "./actions"

import {
  getAllJobCategories,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory
} from "@src/services/apis"

function* getAllJobCategoriesRequest(action) {
  try {
    const response = yield call(getAllJobCategories, action.payload)
    yield put(jobCategoryActions.getAllJobCategoriesSuccess(response.data))
  } catch (err) {
    yield put(jobCategoryActions.getAllJobCategoriesFailure(err))
  }
}

function* createJobCategoryRequest(action) {
  try {
    const response = yield call(createJobCategory, action.payload)
    yield put(jobCategoryActions.createJobCategorySuccess(response.data))
  } catch (err) {
    yield put(jobCategoryActions.createJobCategoryFailure(err))
  }
}

function* updateJobCategoryRequest(action) {
  try {
    const response = yield call(updateJobCategory, action.payload)
    yield put(jobCategoryActions.updateJobCategorySuccess(response.data))
  } catch (err) {
    yield put(jobCategoryActions.updateJobCategoryFailure(err))
  }
}

function* deleteJobCategoryRequest(action) {
  try {
    const response = yield call(deleteJobCategory, action.payload)
    yield put(jobCategoryActions.deleteJobCategorySuccess(response.data))
  } catch (err) {
    yield put(jobCategoryActions.deleteJobCategoryFailure(err))
  }
}

export default function* jobCategorySaga() {
  yield all([
    takeEvery(
      JOB_CATEGORY_TYPES.GET_ALL_JOB_CATEGORIES_REQUEST,
      getAllJobCategoriesRequest
    ),

    takeEvery(
      JOB_CATEGORY_TYPES.CREATE_JOB_CATEGORY_REQUEST,
      createJobCategoryRequest
    ),
    takeEvery(
      JOB_CATEGORY_TYPES.UPDATE_JOB_CATEGORY_REQUEST,
      updateJobCategoryRequest
    ),
    takeEvery(
      JOB_CATEGORY_TYPES.DELETE_JOB_CATEGORY_REQUEST,
      deleteJobCategoryRequest
    )
  ])
}
