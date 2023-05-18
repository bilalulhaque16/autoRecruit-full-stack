import * as ResumeFormActions from "@src/store/common/resumeform/actions"

import { Col, Row } from "reactstrap"
import { FileText, Link, MapPin } from "react-feather"
import { Fragment, useEffect, useRef, useState } from "react"
import { createSeekerProfileId, formatDatetoISO } from "./../utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import EducationAndExperienceForm from "@src/components/steps/EducationAndExperienceForm"
import PersonalInformationForm from "@src/components/steps/PeronalInformationForm"
import QuestionsForm from "@src/components/steps/QuestionsForm"
import Swal from "sweetalert2"
import Wizard from "@src/@core/components/wizard"
import { isNullObject } from "@src/utility/Utils"
import { isObjEmpty } from "@utils"
import { useNavigate } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"

// redux

const MySwal = withReactContent(Swal)

const Information = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ResumeInfo = useSelector((state) => state.resumeFormReducer.ResumeInfo)

  const [personalinfo, setPersonalInfo] = useState({})
  const [work, setWork] = useState({})
  // future navigation
  const futureNavigation = useSelector(
    (state) => state.resumeFormReducer.futureNavigation
  )

  const [JobCategories, setJobCategories] = useState([])

  const profile = {
    personal_info: {},
    work_and_experience: {},
    seeker_questions: []
  }

  // function to create seeker_profile_id in local storage if not present

  useEffect(() => {
    if (!isNullObject(ResumeInfo)) {
      MySwal.fire({
        title: "Success",
        text: "Resume Form Uploaded Successfully",
        icon: "success",
        confirmButtonText: "Next",
        customClass: {
          confirmButton: "btn btn-primary"
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          // save seeker profile id in local storage
          localStorage.setItem("seeker_profile_id", ResumeInfo.data)

          // convert job categories array to with name and id
          // const job_categories = JobCategories.map((job) => {
          //   const job_id = s.find((j) => j.name === job.value)
          //   return { name: job.value, id: job_id.id }
          // })

          const job_categories = JobCategories.map((job) => {
            return { name: job.label, id: job.value }
          })

          console.log("job_categories", job_categories)

          localStorage.setItem("job_categories", JSON.stringify(job_categories))

          dispatch(ResumeFormActions.clearResumeForm())
          if (futureNavigation) {
            navigate(futureNavigation.futureNavigation)
          } else {
            navigate("/home")
          }
        }
        // clear resume form data
        //dispatch(ResumeFormActions.clearResumeForm())
      })
    }
  }, [ResumeInfo])

  const ConvertDateToISOString = (date) => {
    const d = new Date(date)
    return d.toISOString()
  }

  const setData = (data, steps) => {
    profile[steps] = data

    // if (!isObjEmpty(profile.personal_info)) {
    //   setPersonalInfo(profile.personal_info)
    // }

    // if (!isObjEmpty(profile.work_and_experience)) {
    //   setWork(profile.work_and_experience)
    // }

    if (steps === "personal_info" && !isNullObject(data)) {
      console.log("personal_info", data)
      setPersonalInfo(data)
    }

    if (steps === "work_and_experience" && !isNullObject(data)) {
      console.log("work_and_experience", data)
      setWork(data)
    }

    if (steps === "seeker_questions") {
      const exp = work.experience_details
      const edu = work.education_details
      const job_categories = work.job_categories

      console.log("profile", exp, edu, job_categories)
      // changes in experience
      exp.forEach((exp) => {
        exp.starting_date = ConvertDateToISOString(exp.starting_date)

        if (exp.is_current_job) {
          // remove completion date field
          // delete exp.completion_date
          //delete exp.completion_date
        } else {
          exp.completion_date = ConvertDateToISOString(exp.completion_date)
        }
      })

      console.log("exp pass")
      // changes in education
      edu.forEach((edu) => {
        edu.starting_date = ConvertDateToISOString(edu.starting_date)
        edu.completion_date = ConvertDateToISOString(edu.completion_date)

        // if percentage selected then remove cgpa field
        if (edu.is_percentage) {
          // add percentage field
          edu.percentage = edu.cgpa
          //  delete edu.cgpa
        } else {
          // do nothing
        }
      })
      console.log("edu pass")

      // changes in job categories
      setJobCategories(job_categories)

      const job_categories1 = job_categories.map((job) => {
        return job.value
      })

      console.log("cat pass")

      const body = {
        personal_info: personalinfo,
        work_and_experience: {
          experience_details: exp,
          education_details: edu,
          job_categories: job_categories1,
          seeker_skill_sets: work.seeker_skill_sets,
          seeker_languages: work.seeker_languages
        },
        seeker_questions: data
      }
      console.log("body", body)

      // dispatch action to store data in redux
      dispatch(ResumeFormActions.postResumeFormRequest(body))
    }
  }

  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: "account-details",
      title: "Personal Information",
      subtitle: "Enter Your Personal Information",
      icon: <FileText size={18} />,
      content: (
        <PersonalInformationForm
          stepper={stepper}
          type="wizard-modern"
          setData={setData}
        />
      )
    },
    {
      id: "step-address",
      title: "Education & Experience",
      subtitle: "Enter Your Education & Work Experience",
      icon: <MapPin size={18} />,
      content: (
        <EducationAndExperienceForm
          stepper={stepper}
          type="wizard-modern"
          setData={setData}
        />
      )
    },
    {
      id: "social-links",
      title: "Questions About You",
      subtitle: "Answer Each Question",
      icon: <Link size={18} />,
      content: (
        <QuestionsForm
          stepper={stepper}
          type="wizard-modern"
          setData={setData}
        />
      )
    }
  ]

  return (
    <Fragment>
      <Row className="my-2">
        <Col
          className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
          xs="12"
        >
          <div className="modern-horizontal-wizard">
            <Wizard
              type="modern-horizontal"
              ref={ref}
              steps={steps}
              options={{
                linear: false
              }}
              instance={(el) => setStepper(el)}
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Information
