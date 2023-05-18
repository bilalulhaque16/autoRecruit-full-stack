import * as Yup from "yup"
import * as jobActions from "@src/store/common/jobs/actions"
import * as jobCategoryActions from "@src/store/common/jobcategory/actions"

import { Editor } from 'react-draft-wysiwyg'


import { Button, Card, CardBody, Col, Form, Input, Label, Row, Spinner } from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import { fieldExists, isNullObject, isObjEmpty } from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useFormik } from "formik"
import { EditorState, ContentState } from "draft-js"
import htmlToDraft from "html-to-draftjs"

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import BreadCrumbs from "@src/@core/components/breadcrumbs"
import WizardHorizontal from "./WizardHorizontal"

const JobPost = () => {
  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `

  const contentBlock = htmlToDraft(initialContent)
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorState = EditorState.createWithContent(contentState)


  const [isSubmit, setSubmit] = useState(false)
  const [content, setContent] = useState(editorState)
  const [jobCategoriesOptions, setJobCategoriesOptions] = useState([])


  const dispatch = useDispatch()

  const { result, loadingforJobPost } = useSelector(
    (state) => state.jobsReducer
  )

  const jobCategories = useSelector(
    (state) => state.jobCategoryReducer.jobCategories
  )

  const locationtype = [
    { value: "on-site", label: "onsite" },
    { value: "remote", label: "remote" }
  ]

  const jobStatusOptions = [
    { value: "active", label: "Active" },
    { value: "unactive", label: "Inactive" }
  ]

  const SkillNameOptions = [
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" }
  ]

  const skillLevelOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" }
  ]

  const jobShiftOptions = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" }
  ]

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "freelancer", label: "Freelancer" },
    { value: "intern", label: "Intern" },
    { value: "on-call", label: "On Call" },
    { value: "visiting", label: "Visiting" }
  ]

  // experience: { enum: ["0-1year", "1-3year", "<5year", "<10year"], },
  const experienceRequiredOptions = [
    // RANGES
    { value: "0-1year", label: "0-1 year" },
    { value: "1-3year", label: "1-3 year" },
    { value: "<5year", label: "+5 years" },
    { value: "<10year", label: "+10 years" }
  ]

  // const [isSubmit, setSubmit] = useState(false);
  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Title is required"),
    skillName: Yup.string().required("SKill Name is required"),
    skillLevel: Yup.string().required("Skill Level is required"),
    job_shift: Yup.string().required("Job Shift is required"),
    job_type: Yup.string().required("Job Type is required"),
    job_status: Yup.string().required("Job Status is required"),
    location: Yup.string().required("Location is required"),
    job_location_type: Yup.string().required("Location Type is required"),
    experience: Yup.string().required("Experience is required"),
    job_description: Yup.string().required("Description is required"),
    job_category_id: Yup.string().required("Job Category is required")
  })

  useEffect(() => {
    console.log("jobCategories", jobCategories)
    if (isObjEmpty(!isNullObject(jobCategories))) {
      dispatch(jobCategoryActions.getAllJobCategoriesRequest())
    }
  }, [dispatch])

  useEffect(() => {
    if (fieldExists(jobCategories, "docs") && jobCategories.docs.length > 0) {
      const a = jobCategories.docs.map((item, index) => {
        return {
          value: item._id,
          label: item.name
        }
      })
      setJobCategoriesOptions(a)
    }
  }, [jobCategories])

  const formik = useFormik({
    initialValues: {
      job_title: "",
      skillName: "",
      skillLevel: "",
      job_shift: "",
      job_type: "",
      location: "",
      job_location_type: "",
      experience: "",
      job_description: "",
      job_category_id: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("form data", JSON.stringify(values))
      dispatch(jobActions.createJobRequest(values))
      setSubmit(false)
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
    if (result !== null) {
      // for rerendering
      if (result === 1) {
        // clear form
        formik.resetForm()
      } else if (result === 2) {
        // clear form
        //   formik.resetForm()
      }
      dispatch(jobActions.resetCreateJob())
    }
  }, [result])

  return (
    <Fragment>
      <BreadCrumbs title='Create Job' data={[]} />
      <Row>
      <Col sm='12'>
          <WizardHorizontal />
        </Col>
      </Row>
      <Card
        // style={{
        //   paddingLeft: "200px",
        //   paddingRight: "200px",
        //   paddingTop: "50px",
        //   paddingBottom: "50px"
        // }}
      >
        <CardBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmit(true)
            handleSubmit()
          }}
        >
          <div className="mb-1">
            <Label for="invoice-from" className="form-label">
              Job Title*
            </Label>
            <Input
              type="text"
              name="job_title"
              onChange={handleChange}
              value={values.job_title}
              onBlur={handleBlur}
              id="invoice-from"
              placeholder=""
            />
            {isSubmit && errors.job_title && (
              <div className="text-danger">{errors.job_title}</div>
            )}
          </div>

          {/* <div className="mb-1">
            <Label for="invoice-to" className="form-label">
              Job Status*
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={jobStatusOptions}
              isClearable={false}
              name="job_status"
              value={
                jobStatusOptions.find(
                  (option) => option.value === values.job_status
                ) || ""
              }
              onChange={(e) => {
                setFieldValue("job_status", e.value)
              }}
            />
            {isSubmit && errors.job_status && (
              <div className="text-danger">{errors.job_status}</div>
            )}
          </div> */}

          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="default-picker">
                Skill Name
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={SkillNameOptions}
                isClearable={false}
                name="skillName"
                value={
                  SkillNameOptions.find(
                    (option) => option.value === values.skillName
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("skillName", e.value)
                }}
              />
              {isSubmit && errors.skillName && (
                <div className="text-danger">{errors.skillName}</div>
              )}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Skill Level
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={skillLevelOptions}
                isClearable={false}
                name="skillLevel"
                value={
                  skillLevelOptions.find(
                    (option) => option.value === values.skillLevel
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("skillLevel", e.value)
                }}
              />
              {isSubmit && errors.skillLevel && (
                <div className="text-danger">{errors.skillLevel}</div>
              )}
            </Col>
          </Row>

          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="default-picker">
                Job Shift*
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={jobShiftOptions}
                isClearable={false}
                name="job_shift"
                value={
                  jobShiftOptions.find(
                    (option) => option.value === values.job_shift
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("job_shift", e.value)
                }}
              />
              {isSubmit && errors.job_shift && (
                <div className="text-danger">{errors.job_shift}</div>
              )}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Job Type*
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={jobTypeOptions}
                isClearable={false}
                name="job_type"
                value={
                  jobTypeOptions.find(
                    (option) => option.value === values.job_type
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("job_type", e.value)
                }}
              />
              {isSubmit && errors.job_type && (
                <div className="text-danger">{errors.job_type}</div>
              )}
            </Col>
          </Row>

          <div className="mb-1">
            <Label for="invoice-subject" className="form-label">
              Location
            </Label>
            <Input
              name="location"
              onChange={handleChange}
              value={values.location}
              onBlur={handleBlur}
              id="invoice-subject"
              placeholder=""
            />
            {isSubmit && errors.location && (
              <div className="text-danger">{errors.location}</div>
            )}
          </div>

          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="default-picker">
                Job Location Type*
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={locationtype}
                isClearable={false}
                name="job_location_type"
                value={
                  locationtype.find(
                    (option) => option.value === values.job_location_type
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("job_location_type", e.value)
                }}
              />
              {isSubmit && errors.job_location_type && (
                <div className="text-danger">{errors.job_location_type}</div>
              )}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="lastNameMulti">
                Experience Required*
              </Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={experienceRequiredOptions}
                isClearable={false}
                name="experience"
                value={
                  experienceRequiredOptions.find(
                    (option) => option.value === values.experience
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("experience", e.value)
                }}
              />
              {isSubmit && errors.experience && (
                <div className="text-danger">{errors.experience}</div>
              )}
            </Col>
          </Row>
          <div className="mb-1">
            <Label for="invoice-to" className="form-label">
              Job Category*
            </Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={jobCategoriesOptions}
              isClearable={false}
              name="job_category_id"
              value={
                jobCategoriesOptions.find(
                  (option) => option.value === values.job_category_id
                ) || ""
              }
              onChange={(e) => {
                setFieldValue("job_category_id", e.value)
              }}
            />
            {isSubmit && errors.job_category_id && (
              <div className="text-danger">{errors.job_category_id}</div>
            )}
          </div>

          {/* <div className="mb-1">
                <Label for="invoice-to" className="form-label">
                  Location Type*
                </Label>

                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  options={locationtype}
                  isClearable={false}
                  name="job_location_type"
                  value={values.employType}
                  onChange={(e) => {
                    setFieldValue("job_location_type", e.value)
                  }}
                />
              </div> */}

          {/* <Col md="6" sm="12" className="mb-1">
                    <PickerRange />
                </Col> */}
          {/* <div className="form-check form-check-inline">
                <Label for="basic-cb-checked" className="form-check-label">
                  Currently Working
                </Label>
                <RadioButtonGroup
                  name="currentlyWorking"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" }
                  ]}
                  label="currentlyWorking"
                  onChange={handleChange}
                  value={values.currentlyWorking}
                />
              </div> */}

          <div className="mt-2">
            <Label for="invoice-message" className="form-label">
              Job Description
            </Label>
            <Editor editorState={content} onEditorStateChange={data => setContent(data)} />
            {/* <Input
              name="job_description"
              onChange={handleChange}
              value={values.job_description}
              onBlur={handleBlur}
              type="textarea"
              cols="3"
              rows="3"
              id="invoice-message"
            /> */}
            {isSubmit && errors.job_description && (
              <div className="text-danger">{errors.job_description}</div>
            )}
          </div>

          <div className="d-flex flex-wrap mt-2">
            <Button
              type="submit"
              className="me-1"
              color="primary"
              disabled={loadingforJobPost}
            >
              {loadingforJobPost ? (
                <Spinner className="me-1" size="sm" />
              ) : null}
              Submit
            </Button>
            <Button
              color="secondary"
              outline
              type="button"
              onClick={() => {
                formik.resetForm()
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default JobPost
