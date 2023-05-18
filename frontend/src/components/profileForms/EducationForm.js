import "@styles/react/libs/flatpickr/flatpickr.scss"

import * as Yup from "yup"
import * as profileActions from "@src/store/common/seekerProfile/actions"

import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import {
  formatDatetoISO,
  getSeekerProfileId,
  isNullObject
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import Flatpickr from "react-flatpickr"
import Sidebar from "@components/sidebar"
import { useFormik } from "formik"

const EducationForm = ({ open, toggleSidebar, formType, data }) => {
  const [isSubmit, setSubmit] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, successforpatch, successforpost } = useSelector(
    (state) => state.seekerProfileReducer
  )

  const initialValues = {
    certificate_degree_name: "",
    institute_university_name: "",
    starting_date: "",
    completion_date: "",
    field_of_study: "",
    cgpa: 0,
    percentage: 0,
    ispercentage: false
  }

  const validationSchema = Yup.object().shape({
    institute_university_name: Yup.string().required(
      "institute_university_name is required"
    ),
    certificate_degree_name: Yup.string().required(
      "certificate_degree_name is required"
    ),
    field_of_study: Yup.string().required("field_of_study is required"),
    cgpa: Yup.string().required("CGPA is required"),
    starting_date: Yup.string().required("starting_date is required"),
    completion_date: Yup.string().required("completion_date is required")
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setSubmit(false)

      const body = {
        certificate_degree_name: values.certificate_degree_name,
        institute_university_name: values.institute_university_name,
        starting_date: formatDatetoISO(values.starting_date),
        completion_date: formatDatetoISO(values.completion_date),
        field_of_study: values.field_of_study
      }

      if (values.ispercentage) {
        body.percentage = values.cgpa
      } else {
        body.cgpa = values.cgpa
      }

      if (formType === "edit" && values !== data) {
        dispatch(
          profileActions.patchEducationRequest({
            params: data._id,
            body
          })
        )
      } else if (formType === "add") {
        dispatch(profileActions.postEducationRequest(body))
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
      setFieldValue("certificate_degree_name", data.certificate_degree_name)
      setFieldValue("institute_university_name", data.institute_university_name)
      setFieldValue("starting_date", data.starting_date)
      setFieldValue("completion_date", data.completion_date)
      setFieldValue("field_of_study", data.field_of_study)

      if (data.percentage) {
        setFieldValue("ispercentage", true)
        setFieldValue("cgpa", data.percentage)
      }

      if (data.cgpa) {
        setFieldValue("ispercentage", false)
        setFieldValue("cgpa", data.cgpa)
      }

      // setFieldValue("currentlyStudying", data.currentlyStudying)
    } else {
      setFieldValue("certificate_degree_name", "")
      setFieldValue("institute_university_name", "")
      setFieldValue("starting_date", "")
      setFieldValue("completion_date", "")
      setFieldValue("percentage", "")
      setFieldValue("cgpa", "")
      setFieldValue("field_of_study", "")
      // setFieldValue("currentlyStudying", "")
    }
  }, [data])

  const handleDateChange = (date, name) => {
    setFieldValue(name, date[0])
  }

  return (
    <Sidebar
      width={500}
      size="lg"
      open={open}
      title="Add Education"
      headerClassName="mb-1"
      contentClassName="p-0"
      bodyClassName="pb-sm-0 pb-3"
      toggleSidebar={toggleSidebar}
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
          setSubmit(true)
        }}
      >
        <div className="mb-1">
          <Label for="invoice-from" className="form-label">
            Institute*
          </Label>
          <Input
            type="text"
            name="institute_university_name"
            onChange={handleChange}
            value={values.institute_university_name}
            onBlur={handleBlur}
            id="invoice-from"
          />
          {isSubmit && errors.institute_university_name && (
            <div>{errors.institute_university_name_university_name}</div>
          )}
        </div>
        <div className="mb-1">
          <Label for="invoice-from" className="form-label">
            certificate_degree_name*
          </Label>
          <Input
            type="text"
            name="certificate_degree_name"
            onChange={handleChange}
            value={values.certificate_degree_name}
            onBlur={handleBlur}
            id="invoice-from"
          />
          {isSubmit && errors.certificate_degree_name && (
            <div>{errors.certificate_degree_name}</div>
          )}
        </div>
        <div className="mb-1">
          <Label for="invoice-from" className="form-label">
            Field Of Study*
          </Label>
          <Input
            type="text"
            name="field_of_study"
            onChange={handleChange}
            value={values.field_of_study}
            onBlur={handleBlur}
            id="invoice-from"
          />
          {isSubmit && errors.field_of_study && (
            <div>{errors.field_of_study}</div>
          )}
        </div>

        <div className="mb-1">
          <Label for="invoice-subject" className="form-label">
            CGPA / Percentage
          </Label>
          <Input
            type="number"
            name="cgpa"
            onChange={handleChange}
            value={values.cgpa}
            onBlur={handleBlur}
            id="invoice-subject"
            placeholder="2.99"
          />
          {isSubmit && errors.cgpa && <div>{errors.cgpa}</div>}
        </div>

        <div className="mb-1">
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="checkbox"
              id="basic-cb-unchecked"
              name="ispercentage"
              onChange={handleChange}
              value={values.ispercentage}
              onBlur={handleBlur}
            />
            <Label for="basic-cb-unchecked" className="form-check-label">
              Is Percentage
            </Label>
          </div>
        </div>

        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              start
            </Label>
            <Flatpickr
              id="date-time-picker"
              onBlur={handleBlur}
              className="form-control"
              value={values.starting_date}
              onChange={(date) => {
                handleDateChange(date, "starting_date")
              }}
            />
            {isSubmit && errors.starting_date && (
              <div>{errors.starting_date}</div>
            )}
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="lastNameMulti">
              End
            </Label>
            <Flatpickr
              id="date-time-picker"
              onBlur={handleBlur}
              className="form-control"
              value={values.completion_date}
              onChange={(date) => {
                handleDateChange(date, "completion_date")
              }}
            />
            {isSubmit && errors.completion_date && (
              <div>{errors.completion_date}</div>
            )}
          </Col>
        </Row>

        {/*    <div className="mb-1">
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="checkbox"
              id="basic-cb-unchecked"
              name="currentlyStudying"
              onChange={handleChange}
              value={values.currentlyStudying}
              onBlur={handleBlur}
            />

            <Label for="basic-cb-unchecked" className="form-check-label">
              Currently Studying
            </Label>
          </div>
            </div>*/}

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

export default EducationForm
