import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/file-uploader/file-uploader.scss"

import * as Actions from "@src/store/common/seekerProfile/actions"
import * as Yup from "yup"
import * as jobCategoryActions from "@src/store/common/jobcategory/actions"
import * as resumeformActions from "@src/store/common/resumeform/actions"

import { ArrowLeft, ArrowRight, Plus, X } from "react-feather"
import { Button, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import { Fragment, useEffect, useState } from "react"
import { fieldExists, isNullObject, isObjEmpty } from "@src/utility/Utils"
import { useDispatch, useSelector } from "react-redux"

import Flatpickr from "react-flatpickr"
import Repeater from "@components/repeater"
import Select from "react-select"
import { SlideDown } from "react-slidedown"
import makeAnimated from "react-select/animated"
import { selectThemeColors } from "@utils"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { set } from "react-hook-form"

const EducationAndExperienceForm = ({ stepper, type, setData }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()

  const exceptThisSymbols = ["e", "E", "+", "-"]

  const seekerProfile = useSelector((state) => state.seekerProfileReducer)

  const countries = useSelector((state) => state.resumeFormReducer.countries)

  // const states = useSelector((state) => state.resumeFormReducer.states)

  // const cities = useSelector((state) => state.resumeFormReducer.cities)

  const jobCategories = useSelector(
    (state) => state.jobCategoryReducer.jobCategories
  )
  console.log("jobCategories", jobCategories)

  const { all_skills } = seekerProfile

  const [isSubmit, setSubmit] = useState(false)

  const [skillOptions, setSkillsOptions] = useState([])

  const [CountryOptions, setCountryOptions] = useState([])

  const [disabledEndDate, setDisabledEndDate] = useState(false)

  // const [StateOptions, setStateOptions] = useState([])

  // const [CityOptions, setCityOptions] = useState([])

  const [jobCategoriesOptions, setJobCategoriesOptions] = useState([])

  const initialValues = {
    experience_details: [
      {
        job_title: "",
        company_name: "",
        job_location_city: "",
        job_location_state: "",
        job_location_country: "",
        is_current_job: false,
        starting_date: "",
        completion_date: "",
        description: ""
      }
    ],
    education_details: [
      {
        institute_university_name: "",
        certificate_degree_name: "",
        field_of_study: "",
        cgpa: "",
        is_percentage: false,
        starting_date: "",
        completion_date: ""
      }
    ],
    job_categories: [],
    seeker_skill_sets: [
      {
        skill_level: "",
        skill_set_id: ""
      }
    ],
    seeker_languages: [
      {
        language: "",
        fluent: false,
        speaking_proficiency: "",
        reading_proficiency: ""
      }
    ]
  }

  const validationSchema = Yup.object().shape({
    experience_details: Yup.array().of(
      Yup.object().shape({
        job_title: Yup.string().required("Job title is required"),
        company_name: Yup.string().required("Company name is required"),
        // job_location_city: Yup.string().required("City is required"),
        // job_location_state: Yup.string().required("State is required"),
        // job_location_country: Yup.string().required("Country is required"),
        is_current_job: Yup.boolean().required(
          "Currently working status is required"
        ),
        starting_date: Yup.date()
          .required("Starting Date is required")
          .max(new Date(), "Starting Date must be in the past"),
        completion_date: Yup.date().when("is_current_job", {
          is: false,
          then: Yup.date()
            .required("Completion Date is required")
            .max(new Date(), "Completion Date must be in the past")
        }),
        description: Yup.string()
      })
    ),
    education_details: Yup.array().of(
      Yup.object().shape({
        institute_university_name: Yup.string().required(
          "Institute name is required"
        ),
        certificate_degree_name: Yup.string().required("Degree is required"),
        field_of_study: Yup.string().required("Field of study is required"),
        cgpa: Yup.string().required("CGPA is required"),
        starting_date: Yup.date()
          .required("Starting Date is required")
          .max(new Date(), "Starting Date must be in the past"),

        completion_date: Yup.date()
          .required("Starting Date is required")
          .max(new Date(), "Starting Date must be in the past")
      })
    ),
    // at least one job category is required
    job_categories: Yup.array()
      .of(Yup.object().shape({ label: Yup.string(), value: Yup.string() }))
      .min(1, "At least one job category is required"),

    seeker_skill_sets: Yup.array().of(
      Yup.object().shape({
        skill_level: Yup.string().required("Skill level is required"),
        skill_set_id: Yup.string().required("Skill is required")
      })
    ),
    seeker_languages: Yup.array().of(
      Yup.object().shape({
        language: Yup.string().required("Language is required"),
        fluent: Yup.boolean().required("Fluent status is required"),
        speaking_proficiency: Yup.string().required(
          "Speaking proficiency is required"
        ),
        reading_proficiency: Yup.string().required(
          "Reading proficiency is required"
        )
      })
    )
  })

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
    validationSchema,
    onSubmit: (values) => {
      setData(values, "work_and_experience")
      stepper.next()
    }
  })

  // add options 1 to 10 in skillOptions
  const addSkillOptions = () => {
    const options = []
    for (let i = 1; i <= 10; i++) {
      options.push({ value: i, label: i })
    }
    return options
  }

  const skillsLevelOptions = addSkillOptions()

  //when country is selected from dropdown , dispatch action to get states of that country
  const handleCountryChange = (value) => {
    if (value) {
      dispatch(
        resumeformActions.getAllStatesRequest({
          country: value
        })
      )
    }
  }

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

  const resumeData = useSelector((state) => state.resumeFormReducer.resumeData)
  useEffect(() => {
    console.log("detailssss", resumeData)
    const data = resumeData.categorizedData

    if (!isNullObject(resumeData)) {
      const work_and_experience = data.work_and_experience

      // setValues({
      //   resume_url: personal_info.resume_url,
      //   first_name: personal_info.first_name,
      //   middle_name: personal_info.middle_name,
      //   last_name: personal_info.last_name,
      //   preffered_name: personal_info.preffered_name,
      //   country: personal_info.country,
      //   address: personal_info.address,
      //   city: personal_info.city,
      //   postal_code: personal_info.postal_code,
      //   email: data.personal_info.email,
      //   phone_number: personal_info.phone_number,
      //   // links: [
      //   //   {
      //   //     platform: "",
      //   //     url: ""
      //   //   }
      //   // ]
      //   links: personal_info.links
      // })

      setValues({
        experience_details: work_and_experience.experience_details,
        education_details: work_and_experience.education_details,
        job_categories: [],
        seeker_skill_sets: [
          {
            skill_level: "",
            skill_set_id: ""
          }
        ],
        seeker_languages: [
          {
            language: "",
            fluent: false,
            speaking_proficiency: "",
            reading_proficiency: ""
          }
        ]
      })
      console.log("work_and_experience", work_and_experience)
      // setFieldValue("country", "Pakistan")

    } else {
      // setFieldValue("resume_data", "")
      console.log("No", data)
    }
  }, [resumeData])
  // useEffect(() => {
  //   if (!isNullObject(states)) {
  //     const options = states.data.states.map((state) => {
  //       return {
  //         value: state.name,
  //         label: state.name
  //       }
  //     })

  //     options.sort((a, b) => {
  //       if (a.label < b.label) {
  //         return -1
  //       }
  //       if (a.label > b.label) {
  //         return 1
  //       }
  //       return 0
  //     })

  //     setStateOptions(options)
  //   }
  // }, [states])

  // useEffect(() => {
  //   if (!isNullObject(cities)) {
  //     const options = cities.data.map((city) => {
  //       return {
  //         value: city,
  //         label: city
  //       }
  //     })

  //     options.sort((a, b) => {
  //       if (a.label < b.label) {
  //         return -1
  //       }
  //       if (a.label > b.label) {
  //         return 1
  //       }
  //       return 0
  //     })

  //     setCityOptions(options)
  //   }
  // }, [cities])

  useEffect(() => {
    if (isNullObject(all_skills)) {
      dispatch(Actions.getSkillsRequest())
    } else {
      setSkillsOptions(all_skills)
    }
  }, [all_skills])

  // Cannot Select Same skills Twice and show only non selected skills
  useEffect(() => {
    if (values.seeker_skill_sets.length > 1) {
      const selectedskills = values.seeker_skill_sets.map(
        (skill) => skill.skill_set_id
      )

      const filteredOptions = all_skills.filter(
        (option) => !selectedskills.includes(option.value)
      )

      setSkillsOptions(filteredOptions)
    } else {
      setSkillsOptions(all_skills)
    }
  }, [values.seeker_skill_sets])

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

  // const handleStateChange = (value, index) => {
  //   if (value) {
  //     dispatch(
  //       resumeformActions.getAllCitiesRequest({
  //         country: values.experience_details[index].job_location_country,
  //         state: value
  //       })
  //     )
  //   }
  // }

  const deleteForm = (e, i, formName) => {
    e.preventDefault()
    // e.target.closest(".repeater-wrapper").remove()
    const formArray = values[formName]
    formArray.splice(i, 1)
    setFieldValue(formName, formArray)
  }

  const optionsProficiency = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "expert" }
  ]

  return (
    <Fragment>
      <Row style={{ justifyContent: "center" }}>
        <Col lg="10" style={{ paddingTop: "30px" }}>
          <Form
            onSubmit={(e) => {
              console.log("values", values)
              e.preventDefault()
              setSubmit(true)
              handleSubmit()
            }}
          >
            <h4 style={{ textAlign: "center" }}>Work Experience</h4>

            <CardBody className="invoice-padding invoice-product-details">
              <Repeater count={values.experience_details.length}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <Row>
                        <Col
                          className="d-flex product-details-border position-relative pe-0"
                          sm="12"
                        >
                          <Row className="w-100 pe-lg-0 pe-1 py-2">
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Job Title*
                              </Label>
                              <Input
                                value={values.experience_details[i].job_title}
                                name={`experience_details.${i}.job_title`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="invoice-subject"
                                placeholder=""
                                bsSize="sm"
                              />
                              {isSubmit &&
                                errors.experience_details &&
                                errors.experience_details[i] &&
                                errors.experience_details[i].job_title && (
                                  <div className="text-danger">
                                    {errors.experience_details[i].job_title}
                                  </div>
                                )}
                            </div>
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Company*
                              </Label>
                              <Input
                                value={
                                  values.experience_details[i].company_name
                                }
                                id="invoice-subject"
                                bsSize="sm"
                                name={`experience_details.${i}.company_name`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                              />
                              {isSubmit &&
                                errors.experience_details &&
                                errors.experience_details[i] &&
                                errors.experience_details[i].company_name && (
                                  <div className="text-danger">
                                    {errors.experience_details[i].company_name}
                                  </div>
                                )}
                            </div>
                            {/* <div className="mb-1">
                              <Label for="invoice-from" className="form-label">
                                Country*
                              </Label>
                              <Select
                                name={`experience_details.${i}.job_location_country`}
                                defaultValue={
                                  values.experience_details[i]
                                    .job_location_country
                                }
                                onChange={(e) => {
                                  setFieldValue(
                                    `experience_details.${i}.job_location_country`,
                                    e.value
                                  )
                                  handleCountryChange(e.value)
                                }}
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                options={CountryOptions}
                                isClearable={false}
                                placeholder="Select Country"
                                bsSize="sm"
                              />
                              {isSubmit &&
                                errors.experience_details &&
                                errors.experience_details[i] &&
                                errors.experience_details[i]
                                  .job_location_country && (
                                  <div className="text-danger">
                                    {
                                      errors.experience_details[i]
                                        .job_location_country
                                    }
                                  </div>
                                )}
                            </div> */}
                            {/* <Row>
                              <Col md="6" sm="12" className="mb-1">
                                <Label className="form-label" for="nameMulti">
                                  State*
                                </Label>
                                <Input
                                  value={
                                    values.experience_details[i]
                                      .job_location_state
                                  }
                                  id="invoice-subject"
                                  bsSize="sm"
                                  name={`experience_details.${i}.job_location_state`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder=""
                                /> */}

                                {/*<Select
                                  name={`experience_details.${i}.job_location_state`}
                                  defaultValue={
                                    values.experience_details[i]
                                      .job_location_state
                                  }
                                  onChange={(e) => {
                                    setFieldValue(
                                      `experience_details.${i}.job_location_state`,
                                      e.value
                                    )
                                    handleStateChange(e.value, i)
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={StateOptions}
                                  isClearable={false}
                                  placeholder="Select State"
                                  bsSize="sm"
                                /> */}
                                {/* {isSubmit &&
                                  errors.experience_details &&
                                  errors.experience_details[i] &&
                                  errors.experience_details[i]
                                    .job_location_state && (
                                    <div className="text-danger">
                                      {
                                        errors.experience_details[i]
                                          .job_location_state
                                      }
                                    </div>
                                  )}
                              </Col>
                              <Col md="6" sm="12" className="mb-1">
                                <Label
                                  className="form-label"
                                  for="last_nameMulti"
                                >
                                  City*
                                </Label>

                                <Input
                                  value={
                                    values.experience_details[i]
                                      .job_location_city
                                  }
                                  id="invoice-subject"
                                  bsSize="sm"
                                  name={`experience_details.${i}.job_location_city`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder=""
                                /> */}

                                {/*                                <Select
                                  name={`experience_details.${i}.job_location_city`}
                                  defaultValue={
                                    values.experience_details[i]
                                      .job_location_city
                                  }
                                  onChange={(e) => {
                                    setFieldValue(
                                      `experience_details.${i}.job_location_city`,
                                      e.value
                                    )
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={CityOptions}
                                  isClearable={false}
                                  placeholder="Select City"
                                  bsSize="sm"
                                />*/}
                                {/* {isSubmit &&
                                  errors.experience_details &&
                                  errors.experience_details[i] &&
                                  errors.experience_details[i]
                                    .job_location_city && (
                                    <div className="text-danger">
                                      {
                                        errors.experience_details[i]
                                          .job_location_city
                                      }
                                    </div>
                                  )}
                              </Col>
                            </Row> */}

                            <div className="mb-1">
                              <div className="form-check form-check-inline">
                                <Input
                                  checked={
                                    values.experience_details[i].is_current_job
                                  }
                                  value={disabledEndDate}
                                  type="checkbox"
                                  id="basic-cb-unchecked"
                                  className="form-check-input"
                                  name={`experience_details.${i}.is_current_job`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />

                                <Label
                                  for="basic-cb-unchecked"
                                  className="form-check-label"
                                >
                                  Currently Working
                                </Label>
                                {isSubmit &&
                                  errors.experience_details &&
                                  errors.experience_details[i] &&
                                  errors.experience_details[i]
                                    .is_current_job && (
                                    <div className="text-danger">
                                      {
                                        errors.experience_details[i]
                                          .is_current_job
                                      }
                                    </div>
                                  )}
                              </div>
                            </div>

                            <Row>
                              <Col md="6" sm="12" className="mb-1 ps-3">
                                <Label className="form-label" for="nameMulti">
                                  Start Date*
                                </Label>
                                  <Flatpickr
                                  value={
                                    values.experience_details[i].starting_date
                                  }
                                  id="date-time-picker"
                                  placeholder="Start Date"
                                  className="form-control"
                                  onChange={(date) => {
                                    setFieldValue(
                                      `experience_details.${i}.starting_date`,
                                      date
                                    )
                                  }}
                                  options={{
                                    altInput: true,
                                    altFormat: 'F Y',
                                    dateFormat: 'Y-m-d'
                                  }}
                                  onBlur={handleBlur}
                                />

                                {isSubmit &&
                                  errors.experience_details &&
                                  errors.experience_details[i] &&
                                  errors.experience_details[i]
                                    .starting_date && (
                                    <div className="text-danger">
                                      {
                                        errors.experience_details[i]
                                          .starting_date
                                      }
                                    </div>
                                  )}
                              </Col>
                              <Col md="6" sm="12" className="mb-1">
                                <Label className="form-label" for="nameMulti">
                                  End Date*
                                </Label>

                                <Flatpickr
                                  value={
                                    values.experience_details[i].completion_date
                                  }
                                  id="date-time-picker"
                                  placeholder="End Date"
                                  className="form-control"
                                  
                                  onChange={(date) => {
                                    setFieldValue(
                                      `experience_details.${i}.completion_date`,
                                      date
                                    )
                                  }}
                                  options={{
                                    altInput: true,
                                    altFormat: 'F Y',
                                    dateFormat: 'Y-m-d'
                                  }}
                                  onBlur={handleBlur}
                                 
                                />
                                {isSubmit &&
                                  errors.experience_details &&
                                  errors.experience_details[i] &&
                                  errors.experience_details[i]
                                    .completion_date && (
                                    <div className="text-danger">
                                      {
                                        errors.experience_details[i]
                                          .completion_date
                                      }
                                    </div>
                                  )}
                              </Col>
                            </Row>

                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Description
                              </Label>
                              <Input
                                value={values.experience_details[i].description}
                                type="textarea"
                                id="invoice-subject"
                                placeholder="Describe your job responsibilites and achievements"
                                bsSize="sm"
                                name={`experience_details.${i}.description`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {isSubmit &&
                                errors.experience_details &&
                                errors.experience_details[i] &&
                                errors.experience_details[i].description && (
                                  <div className="text-danger">
                                    {errors.experience_details[i].description}
                                  </div>
                                )}
                            </div>
                          </Row>
                          <div className="d-flex justify-content-center  invoice-product-actions px-25">
                            {values.experience_details.length > 1 && (
                              <X
                                size={18}
                                className="cursor-pointer"
                                onClick={(e) =>
                                  deleteForm(e, i, "experience_details")
                                }
                              />
                            )}
                          </div>
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
                      // setCount(count + 1)
                      setFieldValue("experience_details", [
                        ...values.experience_details,
                        { ...initialValues.experience_details[0] }
                      ])
                    }}
                  >
                    <Plus size={14} className="me-25" />
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>

            <br></br>
            <hr></hr>

            <h4 style={{ textAlign: "center" }}>Education</h4>

            <CardBody className="invoice-padding invoice-product-details">
              <Repeater count={values.education_details.length}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <Row>
                        <Col
                          className="d-flex product-details-border position-relative pe-0"
                          sm="12"
                        >
                          <Row className="w-100 pe-lg-0 pe-1 py-2">
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                School or University*
                              </Label>
                              <Input
                                value={
                                  values.education_details[i]
                                    .institute_university_name
                                }
                                id="invoice-subject"
                                bsSize="sm"
                                name={`education_details.${i}.institute_university_name`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                              />
                              {isSubmit &&
                                errors.education_details &&
                                errors.education_details[i] &&
                                errors.education_details[i]
                                  .institute_university_name && (
                                  <div className="text-danger">
                                    {
                                      errors.education_details[i]
                                        .institute_university_name
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Degree*
                              </Label>
                              <Input
                                value={
                                  values.education_details[i]
                                    .certificate_degree_name
                                }
                                id="invoice-subject"
                                bsSize="sm"
                                name={`education_details.${i}.certificate_degree_name`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                              />
                              {isSubmit &&
                                errors.education_details &&
                                errors.education_details[i] &&
                                errors.education_details[i]
                                  .certificate_degree_name && (
                                  <div className="text-danger">
                                    {
                                      errors.education_details[i]
                                        .certificate_degree_name
                                    }
                                  </div>
                                )}
                            </div>
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Field of Study*
                              </Label>
                              <Input
                                value={
                                  values.education_details[i].field_of_study
                                }
                                id="invoice-subject"
                                bsSize="sm"
                                name={`education_details.${i}.field_of_study`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                              />
                              {isSubmit &&
                                errors.education_details &&
                                errors.education_details[i] &&
                                errors.education_details[i].field_of_study && (
                                  <div className="text-danger">
                                    {errors.education_details[i].field_of_study}
                                  </div>
                                )}
                            </div>
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                CGPA / Percentage
                              </Label>
                              <Input
                                type="number"
                                value={values.education_details[i].cgpa}
                                id="invoice-subject"
                                bsSize="sm"
                                name={`education_details.${i}.cgpa`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                                onKeyDown={(e) =>
                                  exceptThisSymbols.includes(e.key) &&
                                  e.preventDefault()
                                }
                              />
                              {isSubmit &&
                                errors.education_details &&
                                errors.education_details[i] &&
                                errors.education_details[i].cgpa && (
                                  <div className="text-danger">
                                    {errors.education_details[i].cgpa}
                                  </div>
                                )}
                            </div>
                            <div className="mb-1">
                              <div className="form-check form-check-inline">
                                <Input
                                  checked={
                                    values.education_details[i].is_percentage
                                  }
                                  type="checkbox"
                                  id="basic-cb-unchecked"
                                  className="form-check-input"
                                  name={`education_details.${i}.is_percentage`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />

                                <Label
                                  for="basic-cb-unchecked"
                                  className="form-check-label"
                                >
                                  is Percentage
                                </Label>
                                {isSubmit &&
                                  errors.education_details &&
                                  errors.education_details[i] &&
                                  errors.education_details[i].is_percentage && (
                                    <div className="text-danger">
                                      {
                                        errors.education_details[i]
                                          .is_percentage
                                      }
                                    </div>
                                  )}
                              </div>
                            </div>
                            <Row>
                              <Col md="6" sm="12" className="mb-1 ps-3">
                                <Label className="form-label" for="nameMulti">
                                  Start Date*
                                </Label>

                                <Flatpickr
                                  value={
                                    values.education_details[i].starting_date
                                  }
                                  id="date-time-picker"
                                  placeholder="Start Date"
                                  className="form-control"
                                  onChange={(date) => {
                                    setFieldValue(
                                      `education_details.${i}.starting_date`,
                                      date
                                    )
                                  }}
                                  onBlur={handleBlur}
                                />
                                {isSubmit &&
                                  errors.education_details &&
                                  errors.education_details[i] &&
                                  errors.education_details[i].starting_date && (
                                    <div className="text-danger">
                                      {
                                        errors.education_details[i]
                                          .starting_date
                                      }
                                    </div>
                                  )}
                              </Col>
                              <Col md="6" sm="12" className="mb-1">
                                <Label className="form-label" for="nameMulti">
                                  End Date*
                                </Label>

                                <Flatpickr
                                  value={
                                    values.education_details[i].completion_date
                                  }
                                  id="date-time-picker"
                                  placeholder="End Date"
                                  className="form-control"
                                  onChange={(date) => {
                                    setFieldValue(
                                      `education_details.${i}.completion_date`,
                                      date
                                    )
                                  }}
                                  onBlur={handleBlur}
                                />
                                {isSubmit &&
                                  errors.education_details &&
                                  errors.education_details[i] &&
                                  errors.education_details[i]
                                    .completion_date && (
                                    <div className="text-danger">
                                      {
                                        errors.education_details[i]
                                          .completion_date
                                      }
                                    </div>
                                  )}
                              </Col>
                            </Row>
                          </Row>
                          <div className="d-flex justify-content-center  invoice-product-actions px-25">
                            {values.education_details.length > 1 && (
                              <X
                                size={18}
                                className="cursor-pointer"
                                onClick={(e) =>
                                  deleteForm(e, i, "education_details")
                                }
                              />
                            )}
                          </div>
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
                      // setCount1(count1 + 1)
                      setFieldValue("education_details", [
                        ...values.education_details,
                        { ...initialValues.education_details[0] }
                      ])
                    }}
                  >
                    <Plus size={14} className="me-25" />
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>

            <br></br>
            <hr></hr>
            <h4 style={{ textAlign: "center" }}>Interested Job Categories</h4>
            <Row>
              <Col className="mb-1">
                <Label for="invoice-to" className="form-label">
                  Job Category*
                </Label>
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={jobCategoriesOptions}
                  isClearable={false}
                  components={animatedComponents}
                  closeMenuOnSelect={true}
                  isMulti
                  name="job_categories"
                  value={values.job_categories}
                  onChange={(value) => {
                    setFieldValue("job_categories", value)
                  }}
                  onBlur={handleBlur}
                />
                {isSubmit && errors.job_categories && (
                  <div className="text-danger">{errors.job_categories}</div>
                )}
              </Col>
            </Row>

            <br></br>
            <hr></hr>
            <h4 style={{ textAlign: "center" }}>Skills</h4>

            <CardBody className="invoice-padding invoice-product-details">
              <Repeater count={values.seeker_skill_sets.length}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <Row>
                        <Col
                          className="d-flex product-details-border position-relative pe-0"
                          sm="12"
                        >
                          <Row className="w-100 pe-lg-0 pe-1 py-2">
                            <Row>
                              <Col md="6" sm="12" className="mb-1">
                                <Label for="invoice-to" className="form-label">
                                  Skill Name*
                                </Label>
                                <Select
                                  name={`seeker_skill_sets.${i}.skill_set_id`}
                                  defaultValue={
                                    values.seeker_skill_sets[i].skill_set_id
                                  }
                                  onChange={(e) => {
                                    setFieldValue(
                                      `seeker_skill_sets.${i}.skill_set_id`,
                                      e.value
                                    )
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={skillOptions}
                                  handleBlur={handleBlur}
                                  isClearable={false}
                                  placeholder="Select Skill"
                                  bsSize="sm"
                                />
                                {isSubmit &&
                                  errors.seeker_skill_sets &&
                                  errors.seeker_skill_sets[i] &&
                                  errors.seeker_skill_sets[i].skill_set_id && (
                                    <div className="text-danger">
                                      {errors.seeker_skill_sets[i].skill_set_id}
                                    </div>
                                  )}
                              </Col>
                              <Col md="6" sm="12" className="mb-1">
                                <Label for="invoice-to" className="form-label">
                                  Skill Level*
                                </Label>
                                <Select
                                  name={`seeker_skill_sets.${i}.skill_level`}
                                  defaultValue={skillsLevelOptions.find(
                                    (obj) =>
                                      obj.value ===
                                      values.seeker_skill_sets[i].skill_level
                                  )}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `seeker_skill_sets.${i}.skill_level`,
                                      e.value
                                    )
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={skillsLevelOptions}
                                  isClearable={false}
                                  placeholder="Select Skill Level"
                                  bsSize="sm"
                                />
                                {isSubmit &&
                                  errors.seeker_skill_sets &&
                                  errors.seeker_skill_sets[i] &&
                                  errors.seeker_skill_sets[i].skill_level && (
                                    <div className="text-danger">
                                      {errors.seeker_skill_sets[i].skill_level}
                                    </div>
                                  )}
                              </Col>
                            </Row>
                          </Row>

                          <div className="d-flex justify-content-center  invoice-product-actions px-25">
                            {values.seeker_skill_sets.length > 1 && (
                              <X
                                size={18}
                                className="cursor-pointer"
                                onClick={(e) => {
                                  setSkillsOptions([
                                    ...skillOptions,
                                    all_skills.find(
                                      (option) =>
                                        option.value ===
                                        values.seeker_skill_sets[i].skill_set_id
                                    )
                                  ])
                                  deleteForm(e, i, "seeker_skill_sets")
                                }}
                              />
                            )}
                          </div>
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
                    disabled={
                      values.seeker_skill_sets.length === all_skills?.length
                    }
                    onClick={() => {
                      //for skill
                      setFieldValue("seeker_skill_sets", [
                        ...values.seeker_skill_sets,
                        { ...initialValues.seeker_skill_sets[0] }
                      ])
                    }}
                  >
                    <Plus size={14} className="me-25" />
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <br></br>

            <br></br>
            <hr></hr>
            <h4 style={{ textAlign: "center" }}>Languages</h4>

            <CardBody className="invoice-padding invoice-product-details">
              <Repeater count={values.seeker_languages.length}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i} className="repeater-wrapper">
                      <Row>
                        <Col
                          className="d-flex product-details-border position-relative pe-0"
                          sm="12"
                        >
                          <Row className="w-100 pe-lg-0 pe-1 py-2">
                            <div className="mb-1">
                              <Label
                                for="invoice-subject"
                                className="form-label"
                              >
                                Language*
                              </Label>
                              <Input
                                value={values.seeker_languages[i].language}
                                name={`seeker_languages.${i}.language`}
                                id="invoice-subject"
                                bsSize="sm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder=""
                              />
                              {isSubmit &&
                                errors.seeker_languages &&
                                errors.seeker_languages[i] &&
                                errors.seeker_languages[i].language && (
                                  <div className="text-danger">
                                    {errors.seeker_languages[i].language}
                                  </div>
                                )}
                            </div>

                            <div className="mb-1">
                              <div className="form-check form-check-inline">
                                <Input
                                  checked={values.seeker_languages[i].fluent}
                                  name={`seeker_languages.${i}.fluent`}
                                  type="checkbox"
                                  id="basic-cb-unchecked"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="form-check-input"
                                />
                                <Label
                                  for="basic-cb-unchecked"
                                  className="form-check-label"
                                >
                                  I am fluent in this language
                                </Label>
                                {isSubmit &&
                                  errors.seeker_languages &&
                                  errors.seeker_languages[i] &&
                                  errors.seeker_languages[i].fluent && (
                                    <div className="text-danger">
                                      {errors.seeker_languages[i].fluent}
                                    </div>
                                  )}
                              </div>
                            </div>

                            <Row>
                              <Col md="6" sm="12" className="mb-1">
                                <Label for="invoice-to" className="form-label">
                                  Reading Proficiency*
                                </Label>
                                <Select
                                  value={optionsProficiency.find(
                                    (obj) =>
                                      obj.value ===
                                      values.seeker_languages[i]
                                        .reading_proficiency
                                  )}
                                  name={`seeker_languages.${i}.reading_proficiency`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `seeker_languages.${i}.reading_proficiency`,
                                      e.value
                                    )
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={optionsProficiency}
                                  isClearable={false}
                                  placeholder="Select Reading Proficiency"
                                  bsSize="sm"
                                />
                                {isSubmit &&
                                  errors.seeker_languages &&
                                  errors.seeker_languages[i] &&
                                  errors.seeker_languages[i]
                                    .reading_proficiency && (
                                    <div className="text-danger">
                                      {
                                        errors.seeker_languages[i]
                                          .reading_proficiency
                                      }
                                    </div>
                                  )}
                              </Col>
                              <Col md="6" sm="12" className="mb-1">
                                <Label for="invoice-to" className="form-label">
                                  Speaking Proficiency*
                                </Label>
                                <Select
                                  value={optionsProficiency.find(
                                    (obj) =>
                                      obj.value ===
                                      values.seeker_languages[i]
                                        .speaking_proficiency
                                  )}
                                  name={`seeker_languages.${i}.speaking_proficiency`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `seeker_languages.${i}.speaking_proficiency`,
                                      e.value
                                    )
                                  }}
                                  theme={selectThemeColors}
                                  className="react-select"
                                  classNamePrefix="select"
                                  options={optionsProficiency}
                                  isClearable={false}
                                  placeholder="Select Speaking Proficiency"
                                  bsSize="sm"
                                />
                                {isSubmit &&
                                  errors.seeker_languages &&
                                  errors.seeker_languages[i] &&
                                  errors.seeker_languages[i]
                                    .speaking_proficiency && (
                                    <div className="text-danger">
                                      {
                                        errors.seeker_languages[i]
                                          .speaking_proficiency
                                      }
                                    </div>
                                  )}
                              </Col>
                            </Row>
                          </Row>
                          <div className="d-flex justify-content-center  invoice-product-actions px-25">
                            {values.seeker_languages.length > 1 && (
                              <X
                                size={18}
                                className="cursor-pointer"
                                onClick={(e) =>
                                  deleteForm(e, i, "seeker_languages")
                                }
                              />
                            )}
                          </div>
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
                      setFieldValue("seeker_languages", [
                        ...values.seeker_languages,
                        { ...initialValues.seeker_languages[0] }
                      ])
                    }}
                  >
                    <Plus size={14} className="me-25" />
                    <span className="align-middle">Add Item</span>
                  </Button>
                </Col>
              </Row>
            </CardBody>
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
export default EducationAndExperienceForm
