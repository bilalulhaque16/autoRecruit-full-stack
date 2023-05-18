import "@styles/react/libs/file-uploader/file-uploader.scss"
import "@styles/react/libs/react-select/_react-select.scss"

import * as Yup from "yup"

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ArrowLeft } from "react-feather"
import Select from "react-select"
import { isNullObject } from "@src/utility/Utils"
import { selectThemeColors } from "@utils"
import { useFormik } from "formik"

const QuestionsForm = ({ stepper, setData }) => {
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.resumeFormReducer)

  const initialValues = {
    // initialValues for answers radio buttons
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: ""
  }

  const seeker_questions = [
    {
      quest:
        "Would you like to receive mobile text message updates from ( Company ) regarding the recruiting process? *"
    },
    {
      quest: "Are you willing to relocate your job? *"
    },
    {
      quest:
        "Do you have a direct family member who currently works for ( Company )? *"
    },
    {
      quest: "Have you previously worked for company as a Employee? *"
    },
    {
      quest:
        "Can you verify your authorization to work in the ( Country ) if hired for this position? *"
    }
  ]

  const validationSchema = Yup.object().shape({
    // validation for answers radio buttons
    answer1: Yup.string().required("Required"),
    answer2: Yup.string().required("Required"),
    answer3: Yup.string().required("Required"),
    answer4: Yup.string().required("Required"),
    answer5: Yup.string().required("Required")
  })

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      seeker_questions.map((question, index) => {
        question.ans = values[`answer${index + 1}`]
      })
      setData(seeker_questions, "seeker_questions")
      //  alert("submitted")
    }
  })

  const [isSubmit, setSubmit] = useState(false)

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ]

  return (
    <Fragment>
      <Row style={{ justifyContent: "center" }}>
        <Col lg="10" style={{ paddingTop: "30px" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmit(true)
              handleSubmit()
            }}
          >
            <h4 style={{ textAlign: "center" }}>Application Questions</h4>
            <br></br>

            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                {seeker_questions[0].quest}
              </Label>
              <Row>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[0].value}
                      checked={values.answer1 === "yes"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Yes
                    </Label>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[1].value}
                      checked={values.answer1 === "no"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      No
                    </Label>
                  </div>
                </Col>
                {isSubmit && errors.answer1 && (
                  <div className="text-danger">{errors.answer1}</div>
                )}
              </Row>
            </div>
            <br></br>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                {seeker_questions[1].quest}
              </Label>
              <Row>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[0].value}
                      checked={values.answer2 === "yes"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Yes
                    </Label>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[1].value}
                      checked={values.answer2 === "no"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      No
                    </Label>
                  </div>
                </Col>
                {isSubmit && errors.answer2 && (
                  <div className="text-danger">{errors.answer2}</div>
                )}
              </Row>
            </div>
            <br></br>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                {seeker_questions[2].quest}
              </Label>
              <Row>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[0].value}
                      checked={values.answer3 === "yes"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Yes
                    </Label>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[1].value}
                      checked={values.answer3 === "no"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      No
                    </Label>
                  </div>
                </Col>
                {isSubmit && errors.answer3 && (
                  <div className="text-danger">{errors.answer3}</div>
                )}
              </Row>
            </div>
            <br></br>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                {seeker_questions[3].quest}
              </Label>
              <Row>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer4"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[0].value}
                      checked={values.answer4 === "yes"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Yes
                    </Label>
                  </div>
                </Col>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer4"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[1].value}
                      checked={values.answer4 === "no"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      No
                    </Label>
                  </div>
                </Col>
                {isSubmit && errors.answer4 && (
                  <div className="text-danger">{errors.answer4}</div>
                )}
              </Row>
            </div>
            <br></br>

            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                {seeker_questions[4].quest}
              </Label>

              <Row>
                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[0].value}
                      checked={values.answer5 === "yes"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Yes
                    </Label>
                  </div>
                </Col>

                <Col lg="4">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="answer5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={options[1].value}
                      checked={values.answer5 === "no"}
                    />
                    <Label className="form-check-label" for="ex1-active">
                      No
                    </Label>
                  </div>
                </Col>
                {isSubmit && errors.answer5 && (
                  <div className="text-danger">{errors.answer5}</div>
                )}
              </Row>
            </div>

            <br></br>
            <div className="d-flex justify-content-between mt-2 mb-2">
              <Button
                color="primary"
                className="btn-prev"
                onClick={() => stepper.previous()}
              >
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  Previous
                </span>
              </Button>
              <Button
                color="success"
                className="btn-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spinner className="me-1" size="sm" /> : null}
                Submit
              </Button>
            </div>
          </Form>
          {!isNullObject(error) ? (
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
          {loading ? (
            <Alert color="success">
              <div className="alert-body font-small-2 mt-2">
                <p>
                  <small className="me-50">
                    <span className="fw-bold">
                      Please wait while we process your request...
                    </span>
                  </small>
                </p>
              </div>
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  )
}
export default QuestionsForm
