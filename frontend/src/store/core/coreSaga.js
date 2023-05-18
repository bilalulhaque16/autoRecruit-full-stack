import { all, fork } from "redux-saga/effects"

import AuthWatcherSaga from "./../common/auth/saga"
import CompanyProfileSaga from "./../common/companyProfile/saga"
import JobsWatcherSaga from "../common/jobs/saga"
import ProfileSaga from "../common/workExperience/saga"
import ResumeForWatcherSaga from "../common/resumeform/saga"
import jobCategorySaga from "../common/jobcategory/saga"
import layoutSaga from "../common/layout/saga"
import loginSaga from "../common/login/saga"
import navbarSaga from "../common/navbar/saga"
import registerSaga from "../common/register/saga"
import seekerProfileSaga from "./../common/seekerProfile/saga"

export default function* coreSaga() {
  yield all([
    fork(layoutSaga),
    fork(navbarSaga),
    fork(loginSaga),
    fork(registerSaga),
    fork(AuthWatcherSaga),
    fork(JobsWatcherSaga),
    fork(ResumeForWatcherSaga),
    fork(seekerProfileSaga),
    fork(jobCategorySaga),
    fork(ProfileSaga),
    fork(CompanyProfileSaga)
  ])
}
