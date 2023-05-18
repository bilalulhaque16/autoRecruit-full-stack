import * as Yup from "yup"
import * as companyProfileActions from "@src/store/common/companyProfile/actions"

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  Col,
  Form,
  Input,
  Row
} from "reactstrap"
import {
  FirstLetterCapitalize,
  fieldExists,
  formatDateToShow,
  isNullObject,
  isObjEmpty
} from "@src/utility/Utils"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import coverImg from "@src/assets/images/portrait/small/state.jpg"
import img from "@src/assets/images/portrait/small/no_img.jpg"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"

const CompanyProfile = () => {
  const { t } = useTranslation()
  const [edit, setEdit] = useState(true)
  const [isSubmit, setSubmit] = useState(false)
  const dispatch = useDispatch()

  const companyProfile = useSelector(
    (state) => state.companyProfileReducer.Profile
  )

  const validationSchema = Yup.object().shape({
    profile_description: Yup.string().required(
      "profile_description is required"
    ),
    establishment_date: Yup.string().required("establishment_date is required"),
    location: Yup.string().required("location is required"),
    phone_number: Yup.string().required("phone_number is required"),
    company_website_url: Yup.string().required(
      "company_website_url is required"
    )
  })

  const formik = useFormik({
    initialValues: {
      profile_description: "",
      establishment_date: "",
      location: "",
      phone_number: "",
      company_website_url: ""
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(companyProfileActions.getCompanyProfileRequest)

      dispatch(
        companyProfileActions.updateCompanyProfileRequest({
          params: "63c8dcba1e1396226c6a16d9",
          body: {
            company_name: values.company_name,
            company_website_url: values.company_website_url,
            establishment_date: values.establishment_date
              ? formatDateToShow(values.establishment_date)
              : null,
            profile_description: values.profile_description
          }
        })
      )
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
    if (isNullObject(companyProfile)) {
      dispatch(
        companyProfileActions.getCompanyProfileRequest({
          params: "63c8dcba1e1396226c6a16d9"
        })
      )
    }
  }, [dispatch])

  useEffect(() => {
    console.log(" softkaispe:", companyProfile)
    if (!isNullObject(companyProfile)) {
      setFieldValue("profile_description", companyProfile.profile_description)
      setFieldValue("establishment_date", companyProfile.establishment_date)
      setFieldValue("location", companyProfile.location)
      setFieldValue("phone_number", companyProfile.phone_number)
      setFieldValue("company_website_url", companyProfile.company_website_url)
    }
  }, [companyProfile])

  return (
    <Fragment>
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <Card className="profile-header mb-2">
              <CardImg
                src={coverImg}
                alt="User Profile Image"
                top
                style={{ height: "200px" }}
              />
              <div className="position-relative">
                <div className="profile-img-container d-flex align-items-center">
                  <div
                    className="profile-img"
                    style={{ position: "absolute", left: "60px" }}
                  >
                    <img
                      className="rounded img-fluid rounded"
                      src={img}
                      alt="Card image"
                      style={{ height: "80px", width: "80px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="profile-header-nav ps-5 p-2 pt-4">
                {fieldExists(companyProfile, "company_name") ? (
                  <h5>{FirstLetterCapitalize(companyProfile.company_name)}</h5>
                ) : null}
                <CardText>
                  {fieldExists(companyProfile, "company_type")
                    ? companyProfile.company_type
                    : ""}
                </CardText>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Card style={{ padding: "30px" }}>
        {edit ? (
          <Row>
            <Col lg="10" md="10" sm="10"></Col>
            <Col lg="2" md="2" sm="2">
              {/* <Button color="primary" outline onClick={() => setEdit(false)}>
                Edit
        </Button>*/}
            </Col>
          </Row>
        ) : (
          <p></p>
        )}

        {edit ? (
          <CardBody className="pt-0">
            <h4 style={{ fontWeight: "bold" }}> {t("About Us")}</h4>
            <CardText>
              {fieldExists(companyProfile, "profile_description")
                ? companyProfile.profile_description
                : ""}
            </CardText>
            <hr></hr>
            <h4 style={{ fontWeight: "bold" }}> {t("Establishment date")}</h4>
            <CardText>
              {fieldExists(companyProfile, "establishment_date")
                ? formatDateToShow(companyProfile.establishment_date)
                : ""}
            </CardText>
            <hr></hr>
            <h4 style={{ fontWeight: "bold" }}>{t("Location")}</h4>
            <CardText>
              {fieldExists(companyProfile, "location")
                ? companyProfile.location
                : ""}
            </CardText>
            <hr></hr>
            <h4 style={{ fontWeight: "bold" }}>{t("Phone Number")}</h4>
            <CardText>
              {fieldExists(companyProfile, "phone_number")
                ? companyProfile.phone_number
                : ""}
            </CardText>
            <hr></hr>
            <h4 style={{ fontWeight: "bold" }}>{t("Website Url")}</h4>
            <CardText>
              {fieldExists(companyProfile, "company_website_url")
                ? companyProfile.company_website_url
                : ""}
            </CardText>
            <hr></hr>
          </CardBody>
        ) : (
          <CardBody className="pt-0">
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmit(true)
                handleSubmit()
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>{t("About Us")}</h4>
              <Input
                type="textarea"
                name="profile_description"
                rows="3"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ resize: "none" }}
                multiple
                value={values.profile_description}
              />
              {isSubmit && errors.profile_description && (
                <div>{errors.profile_description}</div>
              )}
              <hr></hr>
              <h4 style={{ fontWeight: "bold" }}>{t("Establishment date")}</h4>
              <Input
                type="text"
                name="establishment_date"
                // maxlength="30"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.establishment_date}
              />
              {isSubmit && errors.establishment_date && (
                <div>{errors.establishment_date}</div>
              )}
              <hr></hr>
              <h4 style={{ fontWeight: "bold" }}>{t("Location")}</h4>
              <Input
                type="text"
                name="location"
                // maxlength="30"
                // defaultValue={"Karachi"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
              />
              {isSubmit && errors.location && <div>{errors.location}</div>}
              <hr></hr>
              <h4 style={{ fontWeight: "bold" }}>{t("Phone Number")} </h4>
              <Input
                type="text"
                name="phone_number"
                // maxlength="30"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone_number}
              />
              {isSubmit && errors.phone_number && (
                <div>{errors.phone_number}</div>
              )}
              <hr></hr>
              <h4 style={{ fontWeight: "bold" }}>{t("Website Url")}</h4>
              <Input
                type="text"
                name="company_website_url"
                // maxlength="30"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company_website_url}
              />
              {isSubmit && errors.company_website_url && (
                <div>{errors.company_website_url}</div>
              )}
              <hr></hr>
              <Row>
                <Col lg="8" md="6" sm="5"></Col>
                <Col lg="2" md="3" sm="3">
                  <Button
                    type="submit"
                    color="primary"
                    // outline
                    className="center"
                    style={{ width: "100%" }}
                  >
                    {t("Save")}
                  </Button>
                </Col>
                <Col lg="2" md="3" sm="3">
                  <Button
                    color="primary"
                    outline
                    className="center"
                    style={{ width: "100%" }}
                  >
                    {t("Cancel")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        )}
      </Card>
    </Fragment>
  )
}

export default CompanyProfile
