import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/file-uploader/file-uploader.scss"
import "@styles/base/pages/app-invoice.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "react-slidedown/lib/slidedown.css"

import * as Yup from "yup"
import * as resumeformActions from "@src/store/common/resumeform/actions"

import {
  ArrowLeft,
  ArrowRight,
  Check,
  DownloadCloud,
  FileText,
  Plus,
  X
} from "react-feather"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
  Table
} from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import { read, utils } from "xlsx"
import { useDispatch, useSelector } from "react-redux"

import ExtensionsHeader from "@components/extensions-header"
import Flatpickr from "react-flatpickr"
import Repeater from "@components/repeater"
import Select from "react-select"
import { SlideDown } from "react-slidedown"
import classNames from "classnames"
import { isNullObject } from "@src/utility/Utils"
import { selectThemeColors } from "@utils"
import toast from "react-hot-toast"
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik"

// ** Styles

const PersonalInformationForm = ({ stepper, type, setData }) => {
  const [isSubmit, setSubmit] = useState(false)

  const exceptThisSymbols = ["e", "E", "+", "-", "."]

  const initialValues = {
    resume_url: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    preferred_name: "",
    country: "",
    address: "",
    city: "",
    postal_code: "",
    email: "",
    phone_number: "",

    links: [
      {
        platform: "",
        url: ""
      }
    ]
  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues
  } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      resume_url: Yup.string().required("Please upload your resume"),
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      postal_code: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      phone_number: Yup.string().required("Required"),
      // .matches(/^[0-9]+$/, "Must be only digits")
      // .min(10, "Must be exactly 10 digits")
      // .max(10, "Must be exactly 10 digits"),
      // links: Yup.array().of(
      //   Yup.object().shape({
      //     platform: Yup.string().required("Required"),
      //     url: Yup.string().when("platform", {
      //       is: (platform) => platform && platform.length > 0,
      //       then: Yup.string().required("Required")
      //     })
      //   })
      // )
      links: Yup.array().of(
        Yup.object().shape({
          platform: Yup.string(),
          url: Yup.string().when("platform", {
            is: (platform) => platform && platform.length > 0,
            then: Yup.string()
          })
        })
      )
    }),
    onSubmit: (values) => {
      setData(values, "personal_info")
      stepper.next()
    }
  })

  const dispatch = useDispatch()

  const countries = useSelector((state) => state.resumeFormReducer.countries)

  // const resumeURL = useSelector((state) => state.resumeFormReducer.resumeUrl)

  // const resumeData = useSelector(({resumeFormReducer}) => resumeData)
  const resumeData = useSelector((state) => state.resumeFormReducer.resumeData)

  const loading = useSelector((state) => state.resumeFormReducer.loading)

  // useEffect(() => {
  //   if (!isNullObject(resumeURL)) {
  //     setFieldValue("resume_url", resumeURL)
  //   } else {
  //     setFieldValue("resume_url", "")
  //   }
  // }, [resumeURL])

  useEffect(() => {
    // setFieldValue('links.0.platform', {value: 'linkedin', label: 'LinkedIn'})
    // setFieldValue('links[0].platform', 'github')

    // setFieldValue('country', {value: 'Pakistan', label: 'Pakistan'})
    // setFieldValue('country', 'Northern Mariana Islands')
    if (!isNullObject(resumeData)) {
      const data = resumeData.categorizedData
      const personal_info = data.personal_info
      // if links are not present in resume then add empty links
      if (personal_info.links.length === 0) {
        personal_info.links = [
          {
            platform: "",
            url: ""
          }
        ]
      }

      setValues(personal_info)
      setFieldValue("resume_url", resumeData.url)
      // setFieldValue('country',  {
      //   value: personal_info.country,
      //   label: personal_info.country
      // })

      // console.log(">>>", personal_info.links)
      // for (let i = 0; i < personal_info.links.length; i++) {
      //   console.log(personal_info.links[i])
      //   setFieldValue(`links.${i}.platform`, personal_info.links[i].platform)
      //   setFieldValue(`links[${i}].url`, personal_info.links[i].url)
      // }
      // setFieldValue(`links.0.platform`, 'linkedin')
      // setFieldValue(`links.0.platform`, 'github')
    } else {
      console.log("No", resumeData)
    }
  }, [resumeData])

  // useEffect(() => {
  //   // to update the local state
  //   setFieldValue("country", "Pakistan")
  // }, [])

  useEffect(() => {
    if (isNullObject(countries)) {
      dispatch(resumeformActions.getAllCountriesRequest())
    }
  }, [dispatch])

  const [CountryOptions, setCountryOptions] = useState([])

  useEffect(() => {
    if (!isNullObject(countries)) {
      const options = countries.data.map((country) => {
        return {
          value: country.name,
          label: country.name
        }
      })

      options.sort((a, b) => {
        if (a.label < b.label) {
          return -1
        }
        if (a.label > b.label) {
          return 1
        }
        return 0
      })

      setCountryOptions(options)
    }
  }, [countries])

  // populate country names in select options

  // ** State
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "text/plain": [".txt"]
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error("You can only upload  PDF, DOC, DOCX, TXT files! ")
      } else {
        // dispatch(resumeformActions.removeResumeUrl())
        console.log("step 1", acceptedFiles)
        setFiles([...acceptedFiles.map((file) => Object.assign(file))])
      }
    }
  })

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      )
    } else {
      return <FileText size="28" />
    }
  }

  const handleRemoveFile = (file) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
    // dispatch(resumeformActions.removeResumeUrl())
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  // const handleDateChange = (date, name) => {
  //   setFieldValue(name, date[0])
  // }

  const deleteForm = (e, i, formName) => {
    const newValues = values[formName]
    newValues.splice(i, 1)
    setFieldValue(formName, newValues)
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
    // remove url from redux store
    // dispatch(resumeformActions.removeResumeUrl())
  }

  const [platformOptions, setPlatformOptions] = useState([])
  // Platform Options
  const platformOption = [
    {
      // value: "LinkedIn",
      value: "linkedin",
      label: "LinkedIn"
      // url: "https://www.linkedin.com/in/"
    },
    // for designers
    {
      // value: "Twitter",
      value: "twitter",
      label: "Twitter"
      // url: "https://twitter.com/"
    },
    // { value: "Behance",
    {
      value: "behance",
      label: "Behance"
      // url: "https://www.behance.net/"
    },
    // { value: "Dribbble",
    {
      value: "dribble",
      label: "Dribble"
      // url: "https://dribbble.com/"
    },
    // for developers
    {
      // value: "GitHub",
      value: "github",
      label: "GitHub"
      // url: "https://www.github.com/"
    },
    {
      value: "Other",
      label: "Other"
      // url: ""
    }
  ]

  // Cannot Select Same Platform Twice and show only non selected platforms
  useEffect(() => {
    if (values.links.length > 1) {
      const selectedPlatforms = values.links.map((link) => link.platform)
      const filteredOptions = platformOption.filter(
        (option) => !selectedPlatforms.includes(option.value)
      )
      setPlatformOptions(filteredOptions)
    } else {
      setPlatformOptions(platformOption)
    }

    // // auto fill the url field if platform is selected from dropdown list
    // if (values.links.length > 0 && values.links[0].platform) {
    //   values.links.map((link, index) => {
    //     if (link.platform) {
    //       const selectedPlatform = platformOption.find(
    //         (option) => option.value === link.platform
    //       )
    //       setFieldValue(`links.${index}.url`, selectedPlatform.url)
    //     }
    //   })
    // }
  }, [values.links])

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          color="success"
          className={classNames("btn-icon me-1", {
            outline: loading
          })}
          disabled
        >
          {loading ? (
            <Fragment>
              <Spinner size="sm" />
              <span className="align-middle ml-50"> Uploading...</span>
            </Fragment>
          ) : (
            <Fragment>
              <Check size={14} />
              <span className="align-middle ml-50"> Uploaded</span>
            </Fragment>
          )}
        </Button>
        <Button
          color="danger"
          outline
          className="btn-icon"
          onClick={() => handleRemoveAllFiles()}
        >
          <X size={14} /> Remove
        </Button>
      </div>
    </ListGroupItem>
  ))

  // const handleFileUpload = () => {
  //   dispatch(resumeformActions.uploadResumeRequest(files[0]))
  //   if (!isNullObject(resumeURL)) {
  //     toast.success("Resume uploaded successfully!")
  //   }
  // }

  useEffect(() => {
    if (isNullObject(resumeData) && files.length > 0) {
      dispatch(resumeformActions.uploadResumeRequest(files[0]))
    }
  }, [files])

  return (
    <Fragment>
      <Row style={{ justifyContent: "center" }}>
        <Col lg="10">
          <h4 style={{ textAlign: "center", paddingTop: "20px" }}>
            Personal Information
          </h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmit(true)
              handleSubmit()
            }}
          >
            <ExtensionsHeader title="" subTitle="" />

            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className="text-secondary">
                  Drop files here or click{" "}
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    browse
                  </a>{" "}
                  thorough your machine
                </p>
              </div>
            </div>
            {isSubmit && errors.resume_url && (
              <div className="text-danger">{errors.resume_url}</div>
            )}

            {files.length ? (
              <Fragment>
                <ListGroup className="my-2">{fileList}</ListGroup>
                {/* <div className="d-flex justify-content-end">
                  <Button
                    className="me-1"
                    color="danger"
                    outline
                    onClick={handleRemoveAllFiles}
                  >
                    Remove
                  </Button>
                  {isNullObject(resumeURL) ? (
                    <Button color="primary" onClick={handleFileUpload}>
                      Upload File
                    </Button>
                  ) : (
                    <Button color="success" disabled>
                      Uploaded
                    </Button>
                  )}
                  </div>*/}
              </Fragment>
            ) : null}

            <br></br>
            <div className="mb-1">
              <Label for="invoice-from" className="form-label">
                Country*
              </Label>
              <Select
                name="country"
                // defaultValue={CountryOptions[5]}
                // value={values.country}
                value={
                  CountryOptions.find(
                    (option) => option.value === values.country
                  ) || ""
                }
                onChange={(e) => {
                  setFieldValue("country", e.value)
                  // console.log("Dropwodn", e.value, e)
                }}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={CountryOptions}
                isClearable={false}
                placeholder="Select Country"
                bsSize="sm"
              />
              {errors.country && touched.country ? (
                <div className="text-danger">{errors.country}</div>
              ) : null}
            </div>
            <h4 style={{ textAlign: "center" }}>Legal Name</h4>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                First Name*
              </Label>
              <Input
                name="first_name"
                id="invoice-subject"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                bsSize="sm"
                placeholder="First Name"
              />
              {isSubmit && errors.first_name && touched.first_name ? (
                <div className="text-danger">{errors.first_name}</div>
              ) : null}
            </div>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                Middle Name
              </Label>
              <Input
                name="middle_name"
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="invoice-subject"
                placeholder="Middle Name"
                bsSize="sm"
              />
            </div>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                Last Name*
              </Label>
              <Input
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="invoice-subject"
                placeholder="Last Name"
                bsSize="sm"
              />
              {isSubmit && errors.last_name && touched.last_name ? (
                <div className="text-danger">{errors.last_name}</div>
              ) : null}
            </div>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                Preferred Name
              </Label>
              <Input
                id="invoice-subject"
                name="preferred_name"
                value={values.preferred_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Preferred Name"
                bsSize="sm"
              />
            </div>
            <hr></hr>
            <h4 style={{ textAlign: "center" }}>Address</h4>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                Address Line*
              </Label>
              <Input
                id="invoice-subject"
                placeholder="Address Line"
                bsSize="sm"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isSubmit && errors.address && touched.address ? (
                <div className="text-danger">{errors.address}</div>
              ) : null}
            </div>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  City*
                </Label>
                <Input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="nameMulti"
                  bsSize="sm"
                />
                {isSubmit && errors.city && touched.city ? (
                  <div className="text-danger">{errors.city}</div>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="last_nameMulti">
                  Postal Code*
                </Label>
                <Input
                  type="number"
                  name="postal_code"
                  value={values.postal_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bsSize="sm"
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                {isSubmit && errors.postal_code && touched.postal_code ? (
                  <div className="text-danger">{errors.postal_code}</div>
                ) : null}
              </Col>
            </Row>
            <hr></hr>
            <h4 style={{ textAlign: "center" }}>Email</h4>
            <div className="mb-1">
              <Label for="invoice-subject" className="form-label">
                Email Address
              </Label>
              <Input
                id="invoice-subject"
                bsSize="sm"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email Address"
              />
              {isSubmit && errors.email && touched.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-1">
              <Label className="form-label" for="last_nameMulti">
                Phone Number*
              </Label>
              <Input
                bsSize="sm"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                // type="number"
                type="text"
              />
              {isSubmit && errors.phone_number && touched.phone_number ? (
                <div className="text-danger">{errors.phone_number}</div>
              ) : null}
            </div>
            <hr></hr>

            <h4 style={{ textAlign: "center" }}>Social Network ( URLs )</h4>

            <CardBody className="invoice-padding invoice-product-details">
              <Repeater count={values.links.length}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <div className="d-flex justify-content-end  invoice-product-actions px-25">
                        {/* remove url and same platform */}

                        {values.links.length > 1 && (
                          <X
                            size={18}
                            className="cursor-pointer"
                            onClick={(e) => {
                              setPlatformOptions([
                                ...platformOptions,
                                // find in platformOptions
                                platformOption.find(
                                  (option) =>
                                    option.value === values.links[i].platform
                                )
                              ])
                              deleteForm(e, i, "links")
                            }}
                          />
                        )}
                      </div>
                      <Row>
                        <Col>
                          <Row>
                            <Col md="3" sm="12" className="mb-1 ">
                              <Label className="form-label" for="nameMulti">
                                Platform
                              </Label>
                              <Select
                                menuPlacement="top"
                                name={`links.${i}.platform`}
                                // name={`links[${i}].platform`}

                                // defaultValue={values.links[i].platform}
                                // onChange={(e) => {
                                //   setFieldValue(`links.${i}.platform`, e.value)
                                //   console.log(`links.${i}.platform`, e)
                                // }}

                                // value={values.links[i].platform}

                                value={platformOption.find(
                                  (option) =>
                                    option.value === values.links[i].platform ||
                                    ""
                                )}
                                onChange={(e) => {
                                  setFieldValue(`links[${i}].platform`, e.value)
                                }}
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                options={platformOptions}
                                onBlur={handleBlur}
                                isClearable={false}
                                placeholder="Select "
                                bsSize="sm"
                              />

                              {isSubmit &&
                                errors.links &&
                                errors.links[i] &&
                                errors.links[i].platform && (
                                  <div className="text-danger">
                                    {errors.links[i].platform}
                                  </div>
                                )}
                            </Col>
                            <Col md="9" sm="12" className="mb-1">
                              <Label
                                className="form-label"
                                for="last_nameMulti"
                              >
                                URL
                              </Label>
                              <Input
                                type="text"
                                name={`links[${i}].url`}
                                value={values.links[i].url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                bsSize="sm"
                              />
                              {isSubmit &&
                                errors.links &&
                                errors.links[i] &&
                                errors.links[i].url && (
                                  <div className="text-danger">
                                    {errors.links[i].url}
                                  </div>
                                )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Tag>
                  )
                }}
              </Repeater>

              <Row className="mt-1 ps-1">
                <Col sm="12" className="px-0">
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-add-new"
                    onClick={() => {
                      setFieldValue("links", [
                        ...values.links,
                        // { ...initialValues.links[i] }
                        { ...initialValues.links[0] }
                      ])
                    }}
                  >
                    <Plus size={14} className="me-25" />
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>

            <div className="d-flex justify-content-between mt-2 mb-2">
              <Button color="secondary" className="btn-prev" outline disabled>
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  Previous
                </span>
              </Button>
              <Button color="primary" className="btn-next" type="submit">
                <span className="align-middle d-sm-inline-block d-none">
                  Save and Continue
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  )
}
export default PersonalInformationForm
