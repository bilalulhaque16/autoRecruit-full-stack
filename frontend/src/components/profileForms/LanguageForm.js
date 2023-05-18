import * as Yup from "yup"
import * as profileActions from "@src/store/common/seekerProfile/actions"

import { Alert, Button, Form, Input, Label, Spinner } from "reactstrap"
import { getSeekerProfileId, isNullObject } from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Select from "react-select"
import Sidebar from "@components/sidebar"
import { selectThemeColors } from "@utils"
import { use } from "i18next"
import { useFormik } from "formik"

const SkillForm = ({ open, toggleSidebar, formType, data }) => {
  const [isSubmit, setSubmit] = useState(false)

  const { loading, error, successforpatch, successforpost } = useSelector(
    (state) => state.seekerProfileReducer
  )

  const dispatch = useDispatch()

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

  const Options = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" }
  ]

  const validationSchema = Yup.object().shape({
    language: Yup.string().required("language is required"),
    reading_proficiency: Yup.string().required(
      "reading_proficiency is required"
    ),
    speaking_proficiency: Yup.string().required(
      "speaking_proficiency is required"
    )
  })

  const formik = useFormik({
    initialValues: {
      language: "",
      reading_proficiency: "",
      fluent: "",
      speaking_proficiency: ""
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmit(false)

      if (formType === "edit" && values !== data) {
        dispatch(
          profileActions.patchLanguagesRequest({
            params: data._id,
            body: values
          })
        )
      } else if (formType === "add") {
        values.seeker_profile_id = getSeekerProfileId()
        dispatch(profileActions.postLanguagesRequest(values))
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
      setFieldValue("language", data.language)
      setFieldValue("reading_proficiency", data.reading_proficiency)
      setFieldValue("speaking_proficiency", data.speaking_proficiency)
      setFieldValue("fluent", data.fluent)
    } else {
      setFieldValue("language", "")
      setFieldValue("reading_proficiency", "")
      setFieldValue("speaking_proficiency", "")
      setFieldValue("fluent", "")
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
            Langauge*
          </Label>
          <Input
            type="text"
            name="language"
            onChange={handleChange}
            value={values.language}
            onBlur={handleBlur}
            id="invoice-from"
            placeholder=""
          />
          {isSubmit && errors.language && <div>{errors.language}</div>}
        </div>

        <div className="mb-1">
          <Label for="invoice-to" className="form-label">
            Speaking Proficiency*
          </Label>

          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            placeholder="Select language"
            options={Options}
            isClearable={false}
            name="speaking_proficiency"
            value={Options.find(
              (option) => option.value === values.speaking_proficiency
            )}
            onChange={(e) => {
              setFieldValue("speaking_proficiency", e.value)
            }}
          />
          {isSubmit && errors.speaking_proficiency && (
            <div>{errors.speaking_proficiency}</div>
          )}
        </div>

        <div className="mb-1">
          <Label for="invoice-to" className="form-label">
            Reading Proficiency*
          </Label>

          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={Options}
            isClearable={false}
            name="reading_proficiency"
            value={Options.find(
              (option) => option.value === values.reading_proficiency
            )}
            onChange={(e) => {
              setFieldValue("reading_proficiency", e.value)
            }}
          />
          {isSubmit && errors.reading_proficiency && (
            <div>{errors.reading_proficiency}</div>
          )}
        </div>

        <div className="mb-1">
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="checkbox"
              id="basic-cb-unchecked"
              name="fluent"
              onChange={handleChange}
              value={values.fluent}
              onBlur={handleBlur}
            />

            <Label for="basic-cb-unchecked" className="form-check-label">
              Fluent
            </Label>
          </div>
        </div>
        <div className="d-flex flex-wrap mt-2">
          <Button
            type="submit"
            className="me-1"
            color="primary"
            disabled={loading}
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
