import * as CompanyProfileActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"
import { companyProfile, updateProfile } from "@src/services/apis"

import { COMPANY_PROFILE_TYPES } from "./types"

function* getCompanyProfileRequest(action) {
  try {
    const response = yield call(companyProfile, action.payload)
    // console.log("response.data", response.data)
    console.log("huzaifa", response)
    yield put(CompanyProfileActions.getCompanyProfileSuccess(response.data))
  } catch (err) {
    yield put(CompanyProfileActions.getCompanyProfileFailure(err))
  }
}

function* postCompanyProfileRequest(action) {
  try {
    yield put(CompanyProfileActions.postCompanyProfileSuccess(response.data))
  } catch (err) {
    yield put(CompanyProfileActions.postCompanyProfileFailure(err))
  }
}

function* updateCompanyProfileRequest(action) {
  try {
    const response = yield call(updateProfile, action.payload)
    //  console.log("huzaifa", response)
    console.log("update Huzaifa", response.data)
    yield put(CompanyProfileActions.updateCompanyProfileSuccess(response.data))
  } catch (err) {
    yield put(CompanyProfileActions.updateCompanyProfileFailure(err))
  }
}

function* CompanyProfileSaga() {
  yield all([
    takeEvery(
      COMPANY_PROFILE_TYPES.GET_COMPANY_PROFILE_REQUEST,
      getCompanyProfileRequest
    ),

    takeEvery(
      COMPANY_PROFILE_TYPES.POST_COMPANY_PROFILE_REQUEST,
      postCompanyProfileRequest
    ),
    takeEvery(
      COMPANY_PROFILE_TYPES.UPDATE_COMPANY_PROFILE_REQUEST,
      updateCompanyProfileRequest
    )
  ])
}

export default CompanyProfileSaga
