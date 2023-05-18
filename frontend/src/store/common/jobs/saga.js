import * as jobActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"
import {
  applyForJob,
  getAllJobs,
  getAppliedJobs,
  getSpecificAppliedJob,
  getSpecificJob,
  postJob,
  saveJobAsDraft
} from "@src/services/apis"

import { JOBS_ACTION_TYPES } from "./types"
import { toast } from "react-hot-toast"

function* getAllJobsRequest(action) {
  try {
    const response = yield call(getAllJobs, action.payload)

    yield put(jobActions.getAllJobsSuccess(response.data))
  } catch (err) {
    yield put(jobActions.getAllJobsFailure(err))
  }
}

function* getSpecificJobRequest(action) {
  try {
    const response = yield call(getSpecificJob, action.payload)
    yield put(jobActions.getSpecificJobSuccess(response.data))
  } catch (err) {
    yield put(jobActions.getSpecificJobFailure(err))
  }
}

function* applyForJobRequest(action) {
  try {
    const response = yield call(applyForJob, action.payload)
    if (response.status === 200) {
      // youve applied for the job
      yield put(jobActions.applyForJobSuccess(response.data))
    } else if (response.status === 201) {
      // youve saved the job as draft
      yield put(jobActions.applyForJobSuccess(response.message))
    }
  } catch (err) {
    yield put(jobActions.applyForJobFailure(err))
  }
}

function* allAppliedJobsRequest(action) {
  try {
    const response = yield call(getAppliedJobs, action.payload)
    yield put(jobActions.getAllAppliedJobsSuccess(response.data))
  } catch (err) {
    yield put(jobActions.getAllAppliedJobsFailure(err))
  }
}

function* getSpecificAppliedJobRequest(action) {
  try {
    const response = yield call(getSpecificAppliedJob, action.payload)
    yield put(jobActions.getSpecificAppliedJobSuccess(response.data))
  } catch (err) {
    yield put(jobActions.getSpecificAppliedJobFailure(err))
  }
}

function* postJobRequest(action) {
  try {
    const response = yield call(postJob, action.payload)
    if (response?.status === 201) {
      yield put(jobActions.createJobSuccess(response.data))
      toast.success("Job posted successfully")
    } else {
      yield put(jobActions.createJobFailure(response.data))
      toast.error("Job posting failed")
    }
  } catch (err) {
    yield put(jobActions.createJobFailure(err))
  }
}

function* JobsWatcherSaga() {
  yield all([
    takeEvery(JOBS_ACTION_TYPES.GET_ALL_JOBS_REQUEST, getAllJobsRequest),
    takeEvery(
      JOBS_ACTION_TYPES.GET_SPECIFIC_JOB_REQUEST,
      getSpecificJobRequest
    ),
    takeEvery(JOBS_ACTION_TYPES.APPLY_FOR_JOB_REQUEST, applyForJobRequest),
    takeEvery(
      JOBS_ACTION_TYPES.GET_ALL_APPLIED_JOBS_REQUEST,
      allAppliedJobsRequest
    ),
    takeEvery(
      JOBS_ACTION_TYPES.GET_SPECIFIC_APPLIED_JOB_REQUEST,
      getSpecificAppliedJobRequest
    ),
    takeEvery(JOBS_ACTION_TYPES.CREATE_JOB_REQUEST, postJobRequest)
  ])
}

export default JobsWatcherSaga
