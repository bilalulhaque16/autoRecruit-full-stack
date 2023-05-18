import * as resumeformActions from "./actions"

import { all, call, put, takeEvery } from "redux-saga/effects"
import {
  createProfile,
  getAllCities,
  getAllCountries,
  getAllStates,
  uploadResume
} from "@src/services/apis"

import { RESUME_FORM_ACTION_TYPES } from "./types"
import { toast } from "react-hot-toast"

// const s = {
//   personalInfo: {
//     firstName: "BILAL",
//     middleName: "NO",
//     lastName: "HAQ",
//     preferredName: "bil",
//     country: "Austria",
//     addressLine: "kaispe addrs",
//     city: "khi",
//     postalCode: "75200",
//     email: "dsdis@fg.com",
//     phone: 3232903202,
//     phoneCode: 230
//   },
//   educationAndExperience: {
//     WorkExperience: [
//       {
//         jobTitle: "SFW",
//         company: "SYS",
//         location: "KAYBEES",
//         currentlyWorking: true,
//         startDate: "2023-02-14T19:00:00.000Z",
//         endDate: "2023-02-05T19:00:00.000Z",
//         description: "NO"
//       }
//     ],
//     Education: [
//       {
//         institute: "UIT",
//         degree: "BS",
//         fieldOfStudy: "CS",
//         CGPA: "4",
//         startDate: "2023-02-14T19:00:00.000Z",
//         endDate: "2023-02-02T19:00:00.000Z"
//       }
//     ],
//     Languages: [
//       {
//         language: "englisH",
//         areYouFluent: true,
//         speakingProficiency: "Beginner",
//         readingProficiency: "Intermediate"
//       }
//     ],
//     LinkedInURL: "https://www.google.com",
//     GitHubURL: "https://www.nogithub.com",
//     PortfolioURL: ""
//   },
//   questionsAboutYou: {
//     answer1: "yes",
//     answer2: "no",
//     answer3: "no",
//     answer4: "no",
//     answer5: "no",
//     ageRange: "35-44"
//   }
// }

const ApplicantFromCompanyPOV = {
  applicant: {
    name: "Hamza Bin Arif",
    jobTitle: "UI/UX Designer",
    experience: "2yr",
    address: {
      line: "House No 39, Sheet No 23, Model Colony, Karachi",
      city: "Karachi"
    },
    email: "ha842519@gmail.com",
    phoneNumber: "03363174018",
    workExperience: [
      {
        jobTitle: "UI/UX Designer",
        company: "KAISPE",
        startDate: "December, 2022 - Present"
      },
      {
        jobTitle: "UI/UX Designer",
        company: "Vectracom (pvt) ltd",
        startDate: "December, 2022 - Present"
      }
    ],
    education: [
      {
        schoolOrUniversity: "DHA SUFFA University",
        degree: "Bachelor of Computer Science",
        fieldOfStudy: "Computer Science"
      }
    ],
    Languages: [
      {
        language: "englisH",
        areYouFluent: true,
        speakingProficiency: "Beginner",
        readingProficiency: "Intermediate"
      }
    ],
    LinkedInURL: "https://www.google.com",
    GitHubURL: "https://www.nogithub.com"
  }
}

function* getAllCountriesRequest() {
  try {
    const response = yield call(getAllCountries)
    yield put(resumeformActions.getAllCountriesSuccess(response))
  } catch (error) {
    yield put(resumeformActions.getAllCountriesFailure(error))
  }
}

// get states of chosen country
function* getStatesRequest(action) {
  try {
    const response = yield call(getAllStates, action.payload)
    yield put(resumeformActions.getAllStatesSuccess(response))
  } catch (error) {
    yield put(resumeformActions.getAllStatesFailure(error))
  }
}

// get cities of chosen state
function* getCitiesRequest(action) {
  try {
    const response = yield call(getAllCities, action.payload)
    yield put(resumeformActions.getAllCitiesSuccess(response))
  } catch (error) {
    yield put(resumeformActions.getAllCitiesFailure(error))
  }
}

function* postResumeFormRequest(action) {
  try {
    const response = yield call(createProfile, action.payload)
    if (response?.response?.data?.status === 409) {
      yield put(
        resumeformActions.postResumeFormFailure({
          status: 409,
          message: response.response.data.message
        })
      )
    } else if (response?.response?.data?.status === 401) {
      yield put(
        resumeformActions.postResumeFormFailure({
          status: 401,
          message: response.response.data.message
        })
      )
    } else if (response?.status === 200 || response?.status === 201) {
      yield put(resumeformActions.postResumeFormSuccess(response.data.data))
    } else if (response?.status === 204) {
      yield put(
        resumeformActions.postResumeFormFailure({
          status: 204,
          message: "Invalid Credentials"
        })
      )
    } else if (response?.status === 500) {
      yield put(
        resumeformActions.postResumeFormFailure({
          status: 500,
          message: "Internal Server Error"
        })
      )
    } else if (response?.status === 404) {
      yield put(
        resumeformActions.postResumeFormFailure({
          status: 404,
          message: "Not Found"
        })
      )
    } else {
      yield put(
        resumeformActions.postResumeFormFailure({
          message: "Something went wrong"
        })
      )
    }
    //   yield put(resumeformActions.postResumeFormSuccess(response.data.data))
  } catch (error) {
    yield put(resumeformActions.postResumeFormFailure(error))
  }
}

function* uploadResumeRequest(action) {
  try {
    const response = yield call(uploadResume, action.payload)
    // yield put(resumeformActions.uploadResumeSuccess(response.data))
    yield put(resumeformActions.uploadResumeSuccess(response))
    toast.success("Resume Uploaded Successfully")
  } catch (error) {
    yield put(resumeformActions.uploadResumeFailure(error))
    toast.error("Resume Upload Failed")
  }
}

function* ResumeForWatcherSaga() {
  yield all([
    takeEvery(
      RESUME_FORM_ACTION_TYPES.GET_ALL_COUNTRIES_REQUEST,
      getAllCountriesRequest
    ),
    takeEvery(
      RESUME_FORM_ACTION_TYPES.GET_ALL_STATES_REQUEST,
      getStatesRequest
    ),
    takeEvery(
      RESUME_FORM_ACTION_TYPES.GET_ALL_CITIES_REQUEST,
      getCitiesRequest
    ),
    takeEvery(
      RESUME_FORM_ACTION_TYPES.POST_RESUME_FORM_REQUEST,
      postResumeFormRequest
    ),
    takeEvery(
      RESUME_FORM_ACTION_TYPES.UPLOAD_RESUME_REQUEST,
      uploadResumeRequest
    )
  ])
}

export default ResumeForWatcherSaga
