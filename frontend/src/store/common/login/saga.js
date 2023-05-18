import * as loginActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"

import { LOGIN_TYPES } from "./types"
import { login } from "@src/services/apis"

function* loginRequest(action) {
  try {
    const response = yield call(login, action.payload)
    if (response?.response?.data?.status === 409) {
      yield put(
        loginActions.loginFailure({
          status: 409,
          message: response.response.data.message
        })
      )
    } else if (response?.response?.data?.status === 401) {
      yield put(
        loginActions.loginFailure({
          status: 401,
          message: response.response.data.message
        })
      )
    } else if (response?.status === 200) {
      yield put(loginActions.loginSuccess(response.data.data))
    } else if (response?.status === 204) {
      yield put(
        loginActions.loginFailure({
          status: 204,
          message: "Invalid Credentials"
        })
      )
    } else if (response?.status === 500) {
      yield put(
        loginActions.loginFailure({
          status: 500,
          message: "Internal Server Error"
        })
      )
    } else if (response?.status === 404) {
      yield put(
        loginActions.loginFailure({
          status: 404,
          message: "Not Found"
        })
      )
    } else {
      yield put(
        loginActions.loginFailure({
          message: "Something went wrong"
        })
      )
    }
  } catch (err) {
    yield put(loginActions.loginFailure(err))
  }
}

function* loginSaga() {
  yield all([takeEvery(LOGIN_TYPES.REQUEST, loginRequest)])
}

export default loginSaga
