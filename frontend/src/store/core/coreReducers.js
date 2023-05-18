import ProfileReducer from "../common/workExperience/reducer"
import authReducer from "./../common/auth/reducer"
import { combineReducers } from "redux"
import companyProfileReducer from "./../common/companyProfile/reducer"
import jobCategoryReducer from "./../common/jobcategory/reducer"
import jobsReducer from "./../common/jobs/reducer"
import layoutReducer from "../common/layout/reducers"
import loginReducer from "./../common/login/reducer"
import navbarReducer from "./../common/navbar/reducers"
import registerReducer from "../common/register/reducer"
import resumeFormReducer from "./../common/resumeform/reducer"
import seekerProfileReducer from "./../common/seekerProfile/reducer"

const coreReducer = combineReducers({
  loginReducer,
  layoutReducer,
  navbarReducer,
  registerReducer,
  authReducer,
  jobsReducer,
  resumeFormReducer,
  seekerProfileReducer,
  companyProfileReducer,
  jobCategoryReducer,
  ProfileReducer
})

export default coreReducer
