import * as Yup from "yup"
import * as profileActions from "@src/store/common/seekerProfile/actions"

import { Alert, Button, Form, Label, Spinner } from "reactstrap"
import {
  fieldExists,
  getSeekerProfileId,
  isNullObject
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Select from "react-select"
import Sidebar from "@components/sidebar"
import { selectThemeColors } from "@utils"
import { useFormik } from "formik"

const SkillForm = ({ open, toggleSidebar, formType, data }) => {
  const [isSubmit, setSubmit] = useState(false)

  const dispatch = useDispatch()

  const seekerProfile = useSelector((state) => state.seekerProfileReducer)

  const {
    all_skills,
    loading,
    error,
    successforpatch,
    successforpost,
    skills
  } = seekerProfile

  // useEffect(() => {
  //   if (successforpatch || successforpost) {
  //     // for rerendering
  //     dispatch(
  //       profileActions.getProfileRequest({
  //         params: getSeekerProfileId()
  //       })
  //     )
  //     dispatch(profileActions.clearResponse())
  //   }
  // }, [successforpatch, successforpost])

  const [skillOptions, setSkillOptions] = useState([])

  // add options 1 to 10 in skillOptions
  const addSkillOptions = () => {
    const options = []
    for (let i = 1; i <= 10; i++) {
      options.push({ value: i, label: i })
    }
    return options
  }

  const skillsLevelOptions = addSkillOptions()

  useEffect(() => {
    if (isNullObject(all_skills)) {
      dispatch(profileActions.getSkillsRequest())
    }
  }, [])

  useEffect(() => {
    if (!isNullObject(all_skills)) {
      setSkillOptions(all_skills)
    }
  }, [all_skills])

  const validationSchema = Yup.object().shape({
    skill_set_id: Yup.string().required("Skill is required"),
    skill_level: Yup.string().required("Skill Level is required")
  })

  const formik = useFormik({
    initialValues: {
      skill_set_id: "",
      skill_level: ""
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmit(false)

      if (formType === "edit" && values !== data) {
        // first check if skill id is changed from previous one
        // if yes then delete the previous one and add the new one
        // else just patch the skill level
        if (values.skill_set_id !== data.skill_set_id._id) {
          // delete the previous one
          dispatch(
            profileActions.deleteSkillsRequest({
              params: data._id
            })
          )
          // if skill is already added then don't add it again , just patch the skill level
          if (
            skills.find(
              (skill) => skill.skill_set_id._id === values.skill_set_id
            )
          ) {
            dispatch(
              profileActions.patchSkillsRequest({
                params: skills.find(
                  (skill) => skill.skill_set_id._id === values.skill_set_id
                )._id,
                body: {
                  skill_level: values.skill_level
                }
              })
            )
            return
          }
          // add the new one
          dispatch(profileActions.postSkillsRequest(values))
        } else {
          // patch the skill level
          dispatch(
            profileActions.patchSkillsRequest({
              params: data._id,
              body: {
                skill_level: values.skill_level
              }
            })
          )
        }
      } else if (formType === "add") {
        dispatch(profileActions.postSkillsRequest(values))
      }
    }
  })
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = formik

  useEffect(() => {
    if (formType === "edit" && !isNullObject(data)) {
      setFieldValue("skill_set_id", data.skill_set_id._id)
      setFieldValue("skill_level", data.skill_level)
    } else {
      setFieldValue("skill_set_id", "")
      setFieldValue("skill_level", "")
    }
  }, [data])

  return (
    <Sidebar
      width={500}
      size="lg"
      open={open}
      title={`${formType === "edit" ? "Edit" : "Add"} Skill`}
      headerClassName="mb-1"
      contentClassName="p-0"
      bodyClassName="pb-sm-0 pb-3"
      toggleSidebar={toggleSidebar}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmit(true)
          handleSubmit()
        }}
      >
        <div className="mb-1">
          <Label for="invoice-to" className="form-label">
            Skill*
          </Label>

          <Select
            name="skill_set_id"
            value={skillOptions.find(
              (obj) => obj.value === values.skill_set_id
            )}
            onChange={(e) => {
              setFieldValue("skill_set_id", e.value)
            }}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={skillOptions}
            isClearable={false}
            placeholder="Select Skill"
            bsSize="sm"
          />

          {isSubmit && errors.skill_set_id && <div>{errors.skill_set_id}</div>}
        </div>

        <div className="mb-1">
          <Label for="invoice-from" className="form-label">
            Skill Level*
          </Label>
          <Select
            name="skill_level"
            value={skillsLevelOptions.find(
              (obj) => obj.value === values.skill_level
            )}
            onChange={(e) => {
              setFieldValue("skill_level", e.value)
            }}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={skillsLevelOptions}
            isClearable={false}
            placeholder="Select Skill Level"
            bsSize="sm"
          />
          {isSubmit && errors.skill_level && <div>{errors.skill_level}</div>}
        </div>

        <div className="d-flex flex-wrap mt-2">
          <Button
            type="submit"
            className="me-1"
            color="primary"
            disabled={loading}
            // onClick={toggleSidebar}
          >
            {loading ? <Spinner className="me-1" size="sm" /> : null}
            {formType === "edit" ? "Update" : "Add"}
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </div>
      </Form>
      {loading ? (
        <Alert color="success">
          <div className="alert-body font-small-2 mt-2">
            <p>
              <small className="me-50">
                <span className="fw-bold">Updating...</span>
              </small>
            </p>
          </div>
        </Alert>
      ) : null}
      {error ? (
        <Alert color="danger">
          <div className="alert-body font-small-2 mt-2">
            <p>
              <small className="me-50">
                <span className="fw-bold">{error?.message}</span>
              </small>
            </p>
          </div>
        </Alert>
      ) : null}
    </Sidebar>
  )
}

export default SkillForm
