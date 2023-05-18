import "@styles/base/pages/authentication.scss"

import * as Yup from "yup"
import * as authActions from "@src/store/common/auth/actions"
import * as loginActions from "@src/store/common/login/actions"

import {
  Alert,
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Row,
  Spinner
} from "reactstrap"
import { Fragment, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fieldExists, isNullObject } from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import { isObjEmpty } from "./../utility/Utils"
import { toast } from "react-hot-toast"
import { useFormik } from "formik"
import { useSkin } from "@hooks/useSkin"

// ** React Imports

// ** Reactstrap Imports

// ** Styles

const VerifyEmail = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRefs = useRef([])

  const { data } = useSelector((state) => state.registerReducer)
  const { email } = useSelector((state) => state.loginReducer)

  const { loading, response, error } = useSelector((state) => state.authReducer)

  const getEmail = () => {
    if (fieldExists(data, "email")) {
      return data.email
    } else if (email) {
      return email
    } else {
      return null
    }
  }

  useEffect(() => {
    if (!getEmail()) {
      navigate("/register")
    }
  }, [data])

  useEffect(() => {
    if (
      !isNullObject(response) &&
      response.status === 200 &&
      typeof response.data !== "object"
    ) {
      toast.success(response.data)
      dispatch(authActions.clearVerifyEmail())
      navigate("/login")
    }
  }, [response])

  const illustration =
      skin === "dark"
        ? "verify-email-illustration-dark.svg"
        : "verify-email-illustration.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default

  const initialValues = {
    first: "",
    second: "",
    third: "",
    fourth: ""
  }

  const validationSchema = Yup.object().shape({
    first: Yup.string().required("Required"),
    second: Yup.string().required("Required"),
    third: Yup.string().required("Required"),
    fourth: Yup.string().required("Required")
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
      dispatch(
        authActions.verifyEmailRequest({
          email: getEmail() ? getEmail() : "",
          otp: `${values.first + values.second + values.third + values.fourth}`
        })
      )
      // dispatch(formData.add(values))
    }
  })

  const [isSubmit, setSubmit] = useState(false)

  const handleOtpChange = (event, index) => {
    const { value } = event.target

    // regex that contains all the symbols and symbols except backspace and numbers
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`a-zA-Z]/

    // if the key pressed is a symbol
    if (regex.test(value)) {
      event.preventDefault()
      return false
    }

    switch (index) {
      case 0:
        setFieldValue("first", value)

        break
      case 1:
        setFieldValue("second", value)

        break
      case 2:
        setFieldValue("third", value)

        break
      case 3:
        setFieldValue("fourth", value)

      default:
        break
    }

    if (!isNullObject(value)) {
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleOtpKeyUp = (event, index) => {
    const { key } = event

    // cannot type more than 1 character
    if (event.target.value.length > 1) {
      event.preventDefault()
    }

    if (key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <Fragment>
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
          <Link
            className="brand-logo"
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            <svg viewBox="0 0 139 95" version="1.1" height="28">
              <defs>
                <linearGradient
                  x1="100%"
                  y1="10.5120544%"
                  x2="50%"
                  y2="89.4879456%"
                  id="linearGradient-1"
                >
                  <stop stopColor="#000000" offset="0%"></stop>
                  <stop stopColor="#FFFFFF" offset="100%"></stop>
                </linearGradient>
                <linearGradient
                  x1="64.0437835%"
                  y1="46.3276743%"
                  x2="37.373316%"
                  y2="100%"
                  id="linearGradient-2"
                >
                  <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                  <stop stopColor="#FFFFFF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-400.000000, -178.000000)"
                >
                  <g id="Group" transform="translate(400.000000, 178.000000)">
                    <path
                      d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                      id="Path"
                      className="text-primary"
                      style={{ fill: "currentColor" }}
                    ></path>
                    <path
                      d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                      id="Path"
                      fill="url(#linearGradient-1)"
                      opacity="0.2"
                    ></path>
                    <polygon
                      id="Path-2"
                      fill="#000000"
                      opacity="0.049999997"
                      points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                    ></polygon>
                    <polygon
                      id="Path-2"
                      fill="#000000"
                      opacity="0.099999994"
                      points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                    ></polygon>
                    <polygon
                      id="Path-3"
                      fill="url(#linearGradient-2)"
                      opacity="0.099999994"
                      points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                    ></polygon>
                  </g>
                </g>
              </g>
            </svg>
            <h2 className="brand-text text-primary ms-1">
              AutoRecruit Portal
            </h2>
          </Link>
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={source} alt="Login Cover" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bolder mb-1">
                Verify your email ✉️
              </CardTitle>
              <CardText className="mb-2">
                We've sent verification code to your email address:{" "}
                <span className="fw-bolder">
                  {getEmail() ? getEmail() : " "}
                </span>{" "}
                Please enter the code to verify your email address.
              </CardText>
              <Form
                className="mt-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmit(true)
                  handleSubmit()
                }}
              >
                <h6>Type your 4 digit security code</h6>
                <div className="auth-input-wrapper d-flex align-items-center justify-content-center">
                  <Input
                    type="text"
                    name="first"
                    maxLength="1"
                    className="auth-input height-50 text-center numeral-mask mx-25 mb-1"
                    onBlur={handleBlur}
                    value={values.first}
                    onChange={(event) => handleOtpChange(event, 0)}
                    innerRef={(el) => (inputRefs.current[0] = el)}
                    onKeyUp={(event) => handleOtpKeyUp(event, 0)}
                    pattern="[0-9]*"

                    // onKeyDown={(e) =>
                    //   exceptThisSymbols.includes(e.key) &&
                    //   e.target.value.length > 1 &&
                    //   e.preventDefault()
                    // }
                  />

                  <Input
                    type="text"
                    name="second"
                    maxLength="1"
                    className="auth-input height-50 text-center numeral-mask mx-25 mb-1"
                    onBlur={handleBlur}
                    value={values.second}
                    onChange={(event) => handleOtpChange(event, 1)}
                    innerRef={(el) => (inputRefs.current[1] = el)}
                    onKeyUp={(event) => handleOtpKeyUp(event, 1)}
                    pattern="[0-9]*"
                    // onKeyDown={(e) =>
                    //   exceptThisSymbols.includes(e.key) &&
                    //   e.target.value.length > 1 &&
                    //   e.preventDefault()
                    // }
                  />
                  <Input
                    type="text"
                    name="third"
                    maxLength="1"
                    className="auth-input height-50 text-center numeral-mask mx-25 mb-1"
                    onBlur={handleBlur}
                    value={values.third}
                    onChange={(event) => handleOtpChange(event, 2)}
                    innerRef={(el) => (inputRefs.current[2] = el)}
                    onKeyUp={(event) => handleOtpKeyUp(event, 2)}
                    pattern="[0-9]*"
                    // onKeyDown={(e) =>
                    //   exceptThisSymbols.includes(e.key) &&
                    //   e.target.value.length > 1 &&
                    //   e.preventDefault()
                    // }
                  />
                  <Input
                    type="text"
                    name="fourth"
                    maxLength="1"
                    className="auth-input height-50 text-center numeral-mask mx-25 mb-1"
                    onBlur={handleBlur}
                    value={values.fourth}
                    onChange={(event) => handleOtpChange(event, 3)}
                    innerRef={(el) => (inputRefs.current[3] = el)}
                    onKeyUp={(event) => handleOtpKeyUp(event, 3)}
                    // onKeyDown={(e) =>
                    //   exceptThisSymbols.includes(e.key) &&
                    //   e.target.value.length > 1 &&
                    //   e.preventDefault()
                    // }
                  />
                </div>

                {isSubmit && !isObjEmpty(errors) ? (
                  <div className="error-message text-center  mb-2 text-danger">
                    Please enter the code
                  </div>
                ) : null}
                <Button type="submit" block color="primary" disabled={loading}>
                  {loading ? <Spinner className="me-1" size="sm" /> : null}
                  Verify Email
                </Button>
              </Form>
              {error ? (
                <Alert color="danger">
                  <div className="alert-body font-small-2 mt-2">
                    <p>
                      <small className="me-50">
                        <span className="fw-bold">{error.message}</span>
                      </small>
                    </p>
                  </div>
                </Alert>
              ) : null}
              <p className="text-center mt-2">
                <span>Didn’t get the code?</span>{" "}
                <a
                  className="fw-bolder text-primary"
                  onClick={(e) =>
                    dispatch(
                      authActions.resendOtpRequest({
                        email: getEmail() ? getEmail() : " "
                      })
                    )
                  }
                >
                  Resend
                </a>{" "}
              </p>
              <p className="text-center mt-2">
                <span>Go back to </span>{" "}
                <a
                  className="fw-bolder text-primary"
                  onClick={(e) => {
                    dispatch(authActions.clearResendOtp())
                    dispatch(authActions.clearVerifyEmail())
                    dispatch(loginActions.clearError())
                    navigate("/login")
                  }}
                >
                  Login
                </a>{" "}
              </p>

              {!isNullObject(response) &&
              response.status === 200 &&
              typeof response.data === "object" ? (
                <Alert color="success">
                  <div className="alert-body font-small-2 mt-2">
                    <p>
                      <small className="me-50">
                        <span className="fw-bold">{response.data.message}</span>
                      </small>
                    </p>
                  </div>
                </Alert>
              ) : null}
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default VerifyEmail
