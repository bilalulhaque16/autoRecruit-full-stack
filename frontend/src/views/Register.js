import "@styles/react/libs/flatpickr/flatpickr.scss"
// ** Styles
import "@styles/react/pages/page-authentication.scss"

import * as Yup from "yup"

// ** Reactstrap Imports
import {
  Alert,
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap"
// ** React Imports
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import Flatpickr from "react-flatpickr"
// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"
import RadioButtonGroup from "./../components/RadioButtonGroup"
import { registerRequest } from "@src/store/common/register/actions"
import { useFormik } from "formik"
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, error, loading } = useSelector((state) => state.registerReducer)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default

  useEffect(() => {
    if (data) {
      navigate("/verify-email")
    }
  }, [data])

  const ConvertDateToISOString = (date) => {
    const d = new Date(date)
    return d.toISOString()
  }

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      date_of_birth: "",
      gender: "",
      contact_number: ""
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      // check password is at least 8 characters long and contains at least one number and one letter
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        // show error if password does not contain at least one number
        .matches(/\d/, "Password must contain at least one number")
        // show error if password does not contain at least one letter
        .matches(/[a-zA-Z]/, "Password must contain at least one letter"),

      // date of birth must be in the past and not today or future date and at least 18 years old
      date_of_birth: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth must be in the past")
        .test(
          "is-18",
          "You must be at least 18 years old",
          (value) =>
            value && value.getFullYear() < new Date().getFullYear() - 18
        )
        .typeError("Date of birth must be a valid date"),
      gender: Yup.string().required("Gender is required"),
      contact_number: Yup.string()
        .required("Contact number is required")
        .min(10, "Contact number must be at least 10 characters")
    }),
    onSubmit: (values) => {
      setIsSubmitting(true)

      values.date_of_birth = ConvertDateToISOString(values.date_of_birth)
      dispatch(registerRequest(values))
    }
  })

  const handleDateChange = (date, name) => {
    setFieldValue(name, date)
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
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
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
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
          <h2 className="brand-text text-primary ms-1">AutoRecruit Portal</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
            <Form
              className="auth-register-form mt-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
                setIsSubmitting(true)
              }}
            >
              <div className="mb-1">
                <Label className="form-label" for="full_name">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="john doe"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.full_name}
                />
                {isSubmitting && errors.full_name ? (
                  <div className="error-message text-danger ">
                    {errors.full_name}
                  </div>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {isSubmitting && errors.email ? (
                  <div className="error-message text-danger">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="password">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {isSubmitting && errors.password ? (
                  <div className="error-message text-danger">
                    {errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-1">
                <Label className="form-label" for="date_of_birth">
                  Birth Date
                </Label>
                <Flatpickr
                  value={values.date_of_birth}
                  id="date-time-picker"
                  placeholder="Select Date..."
                  className="form-control"
                  onChange={(date) => {
                    setFieldValue("date_of_birth", date)
                  }}
                  onBlur={handleBlur}
                />

                {isSubmitting && errors.date_of_birth ? (
                  <div className="error-message text-danger">
                    {errors.date_of_birth}
                  </div>
                ) : null}
              </div>

              <div className="mb-1">
                <Label className="form-label" for="contact_number">
                  Phone
                </Label>
                <Input
                  type="number"
                  id="contact_number"
                  name="contact_number"
                  placeholder="********"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact_number}
                />
                {isSubmitting && errors.contact_number ? (
                  <div className="error-message text-danger">
                    {errors.contact_number}
                  </div>
                ) : null}
              </div>

              <div className="mb-1">
                <Label className="form-label" htmlFor="gender">
                  Gender
                </Label>

                <RadioButtonGroup
                  name="gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" }
                  ]}
                  label="gender"
                  onChange={handleChange}
                  value={values.gender}
                  onBlur={handleBlur}
                />
              </div>
              {isSubmitting && errors.gender ? (
                <div className="error-message text-danger">{errors.gender}</div>
              ) : null}

              <Button type="submit" color="primary" block disabled={loading}>
                {loading ? <Spinner className="me-1" size="sm" /> : null}
                Sign up
              </Button>
            </Form>
            {error ? (
              <Alert color="danger">
                <div className="alert-body font-small-2 mt-2">
                  <p>
                    <small className="me-50">
                      <span className="fw-bold">{error}</span>
                    </small>
                  </p>
                </div>
              </Alert>
            ) : null}

            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>*/}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
