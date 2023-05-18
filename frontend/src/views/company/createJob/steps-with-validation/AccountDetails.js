// ** React Imports
import { Fragment } from "react"

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils"

// ** Third Party Components
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "react-feather"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap"
import Select from "react-select"



const defaultValues = {
  title: "",
  jobType: "",
  jobShift: "",
  jobLocationType: "",
  jobCategory: ""
}

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    // title: yup.string().required(),
    // jobType: yup.string().email().required(),
    // jobShift: yup.string().required(),
    // jobCategory: yup.string().required(),
    // jobLocationType: yup
    //   .string()
    //   .required()
    //   .oneOf([yup.ref(`password`), null], "Passwords must match")
  })

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Job Basic Info</h5>
        <small className="text-muted">Enter basic information about Job</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="title">
              Title
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please Enter Title"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="jobType">
              Job Type*
            </Label>
            <Controller
              id="jobType"
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  invalid={errors.jobType && true}
                  {...field}
                />
              )}
            />
              {/* {JSON.stringify(errors.jobType.message)} */}
            {errors.jobType && <FormFeedback>{errors.jobType.message}</FormFeedback>}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="job_type">
              Job Shift*
            </Label>
            <Select
              theme={selectThemeColors}
              id="job_type"
              className="react-select"
              classNamePrefix="select"
              // options={jobTypeOptions}
              isClearable={false}
              name="job_type"
              // value={
              //   jobTypeOptions.find(
              //     (option) => option.value === values.job_type
              //   ) || ""
              // }
              // onChange={(e) => {
              //   setFieldValue("job_type", e.value)
              // }}
            />
            {errors.job_type && <FormFeedback>{errors.job_type}</FormFeedback>}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="job_type">
            Job Category*
            </Label>
            <Select
              theme={selectThemeColors}
              id="job_type"
              className="react-select"
              classNamePrefix="select"
              // options={jobTypeOptions}
              isClearable={false}
              name="job_type"
              // value={
              //   jobTypeOptions.find(
              //     (option) => option.value === values.job_type
              //   ) || ""
              // }
              // onChange={(e) => {
              //   setFieldValue("job_type", e.value)
              // }}
            />
            {errors.job_type && <FormFeedback>{errors.job_type}</FormFeedback>}
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="job_type">
            Job Location Type*
            </Label>
            <Select
              theme={selectThemeColors}
              id="job_type"
              className="react-select"
              classNamePrefix="select"
              // options={jobTypeOptions}
              isClearable={false}
              name="job_type"
              // value={
              //   jobTypeOptions.find(
              //     (option) => option.value === values.job_type
              //   ) || ""
              // }
              // onChange={(e) => {
              //   setFieldValue("job_type", e.value)
              // }}
            />
            {errors.job_type && <FormFeedback>{errors.job_type}</FormFeedback>}
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="job_type">
              Job Shift*
            </Label>
            <Select
              theme={selectThemeColors}
              id="job_type"
              className="react-select"
              classNamePrefix="select"
              // options={jobTypeOptions}
              isClearable={false}
              name="job_type"
              // value={
              //   jobTypeOptions.find(
              //     (option) => option.value === values.job_type
              //   ) || ""
              // }
              // onChange={(e) => {
              //   setFieldValue("job_type", e.value)
              // }}
            />
            {errors.job_type && <FormFeedback>{errors.job_type}</FormFeedback>}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="job_type">
              Skills*
            </Label>
            <Select
              isMulti={true}
              theme={selectThemeColors}
              id="job_type"
              className="react-select"
              classNamePrefix="select"
              // options={jobTypeOptions}
              isClearable={false}
              name="job_type"
              // value={
              //   jobTypeOptions.find(
              //     (option) => option.value === values.job_type
              //   ) || ""
              // }
              // onChange={(e) => {
              //   setFieldValue("job_type", e.value)
              // }}
            />
            {errors.job_type && <FormFeedback>{errors.job_type}</FormFeedback>}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
