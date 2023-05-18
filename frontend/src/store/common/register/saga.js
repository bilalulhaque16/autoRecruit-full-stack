import * as registerActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"

import { REGISTER_TYPES } from "./types"
import { register } from "@src/services/apis"

function* registerRequest(action) {
  try {
    const response = yield call(register, action.payload)
    if (response?.response?.data?.status === 409) {
      yield put(registerActions.registerFailure(response.response.data.message))
    } else if (response?.response?.data?.status === 401) {
      yield put(registerActions.registerFailure(response.response.data.message))
    } else if (response?.status === 200) {
      yield put(registerActions.registerSuccess(response.data))
      //yield put(loginActions.loginSuccess(response.data.data))
    } else if (response?.status === 204) {
      yield put(registerActions.registerFailure("Invalid Credentials"))
    } else if (response?.status === 500) {
      yield put(registerActions.registerFailure("Server Error"))
    } else if (response?.status === 404) {
      yield put(registerActions.registerFailure("Not Found"))
    } else {
      yield put(registerActions.registerFailure("Something went wrong"))
    }
  } catch (err) {
    yield put(registerActions.registerFailure(err))
  }
}

function* registerSaga() {
  yield all([takeEvery(REGISTER_TYPES.REQUEST, registerRequest)])
}

export default registerSaga
