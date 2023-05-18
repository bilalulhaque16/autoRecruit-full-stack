import "@styles/react/libs/flatpickr/flatpickr.scss"

import * as Yup from "yup"
import * as profileActions from "@src/store/common/seekerProfile/actions"

import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap"
import {
  formatDatetoISO,
  getSeekerProfileId,
  isNullObject
} from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Flatpickr from "react-flatpickr"
import Sidebar from "@components/sidebar"
import { selectThemeColors } from "@utils"
import { useFormik } from "formik"

const ExperienceForm = ({ open, toggleSidebar, formType, data }) => {
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

  const initialValues = {
    job_title: "",
    company_name: "",
    job_location_city: "",
    job_location_state: "",
    job_location_country: "",
    is_current_job: "",
    start_date: "",
    end_date: "",
    description: ""
  }

  const validationSchema = Yup.object().shape({
    job_title: Yup.string().required("profile_title is required"),
    company_name: Yup.string().required("company_name is required"),
    job_location_city: Yup.string().required("profile_title is required"),
    job_location_state: Yup.string().required("job_location_state is required"),
    job_location_country: Yup.string().required(),
    start_date: Yup.string().required("start_date is required"),
    end_date: Yup.string().required("end_date is required"),
    description: Yup.string().required("description is required")
  })

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setSubmit(false)
      values.start_date = formatDatetoISO(values.start_date)
      values.end_date = formatDatetoISO(values.end_date)

      if (formType === "edit" && values !== data) {
        dispatch(
          profileActions.patchExperienceRequest({
            params: data._id,
            body: values
          })
        )
      } else if (formType === "add") {
        values.seeker_profile_id = getSeekerProfileId()
        dispatch(profileActions.postExperienceRequest(values))
      }
    }
  })

  const handleDateChange = (date, name) => {
    setFieldValue(name, date[0])
  }

  useEffect(() => {
    if (formType === "edit" && !isNullObject(data)) {
      setFieldValue("job_title", data.job_title)
      setFieldValue("company_name", data.company_name)
      setFieldValue("start_date", data.start_date)
      setFieldValue("end_date", data.end_date)
      setFieldValue("description", data.description)
      setFieldValue("job_location_city", data.job_location_city)
      setFieldValue("job_location_state", data.job_location_state)
      setFieldValue("job_location_country", data.job_location_country)
      setFieldValue("is_current_job", data.is_current_job)
    } else {
      setFieldValue("job_title", "")
      setFieldValue("company_name", "")
      setFieldValue("job_location_city", "")
      setFieldValue("job_location_state", "")
      setFieldValue("job_location_country", "")
      setFieldValue("is_current_job", "")
      setFieldValue("start_date", "")
      setFieldValue("end_date", "")
      setFieldValue("description", "")
    }
  }, [data])

  return (
    <Sidebar
      width={500}
      size="lg"
      open={open}
      title={`${formType === "edit" ? "Edit" : "Add"} Experience`}
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
          <Label for="invoice-from" className="form-label">
            Title*
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
          {isSubmit && errors.job_title && <div>{errors.job_title}</div>}
        </div>
        <div className="mb-1">
          <Label for="invoice-subject" className="form-label">
            Company Name*
          </Label>
          <Input
            name="company_name"
            onChange={handleChange}
            value={values.company_name}
            onBlur={handleBlur}
            id="invoice-subject"
            placeholder=""
          />
          {isSubmit && errors.company_name && <div>{errors.company_name}</div>}
        </div>

        <div className="mb-1">
          <Label for="invoice-subject" className="form-label">
            City*
          </Label>
          <Input
            name="job_location_city"
            onChange={handleChange}
            value={values.job_location_city}
            onBlur={handleBlur}
            id="invoice-subject"
            placeholder=""
          />
          {isSubmit && errors.job_location_city && (
            <div>{errors.job_location_city}</div>
          )}
        </div>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="form-label">
              State*
            </Label>
            <Input
              type="text"
              name="job_location_state"
              onChange={handleChange}
              value={values.job_location_state}
              onBlur={handleBlur}
              id="form-label"
              placeholder=""
            />
            {isSubmit && errors.job_location_state && (
              <div>{errors.job_location_state}</div>
            )}
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="form-label">
              Country*
            </Label>
            <Input
              type="text"
              name="job_location_country"
              onChange={handleChange}
              value={values.job_location_country}
              onBlur={handleBlur}
              id="form-label"
              placeholder=""
            />
            {isSubmit && errors.job_location_country && (
              <div>{errors.job_location_country}</div>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="default-picker">
              Start Date*
            </Label>
            <Flatpickr
              type="data"
              className="form-control"
              value={values.start_date}
              onChange={(date) => {
                handleDateChange(date, `start_date`)
              }}
              id="default-picker"
            />
            {isSubmit && errors.start_date && <div>{errors.start_date}</div>}
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="lastNameMulti">
              End Date*
            </Label>
            <Flatpickr
              type="data"
              className="form-control"
              value={values.end_date}
              onChange={(date) => {
                handleDateChange(date, `end_date`)
              }}
              id="default-picker"
            />
            {isSubmit && errors.end_date && <div>{errors.end_date}</div>}
          </Col>
        </Row>
        <div className="mb-1">
          <div className="form-check form-check-inline">
            <Input
              className="form-check-input"
              type="checkbox"
              id="basic-cb-unchecked"
              name="is_current_job"
              onChange={handleChange}
              value={values.is_current_job}
              onBlur={handleBlur}
            />

            <Label for="basic-cb-unchecked" className="form-check-label">
              Currently Working
            </Label>
          </div>
        </div>

        <div className="mt-2">
          <Label for="invoice-message" className="form-label">
            description
          </Label>

          <Input
            name="description"
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
            type="textarea"
            cols="3"
            rows="3"
            id="invoice-message"
          />
          {isSubmit && errors.description && <div>{errors.description}</div>}
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

export default ExperienceForm
