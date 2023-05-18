// ** React Imports
import { Fragment, useState } from "react"

// ** Third Party Components
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, ArrowRight, Plus, X } from "react-feather"

// ** Utils
import { selectThemeColors } from "@utils"

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback, Card, CardHeader, CardBody, CardText } from "reactstrap"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import Repeater from "@src/@core/components/repeater"

import { SlideDown } from 'react-slidedown'

const defaultValues = {
  lastName: "",
  firstName: ""
}

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      stepper.next()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }

  const countryOptions = [
    { value: "UK", label: "UK" },
    { value: "USA", label: "USA" },
    { value: "Spain", label: "Spain" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Australia", label: "Australia" }
  ]

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "French", label: "French" },
    { value: "Spanish", label: "Spanish" },
    { value: "Italian", label: "Italian" },
    { value: "Japanese", label: "Japanese" }
  ]

  const [count, setCount] = useState(1)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = (e) => {
    e.preventDefault()
    const slideDownWrapper = e.target.closest(".react-slidedown"),
      form = e.target.closest("form")
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    } else {
      form.remove()
    }
  }

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Skills</h5>
        <small>Enter Required Skills</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Row> */}
          <Card>
            <CardBody>
              <Repeater count={count}>
                {(i) => {
                  const Tag = i === 0 ? "div" : SlideDown
                  return (
                    <Tag key={i}>
                      {/* <Form> */}
                        <Row className="justify-content-between align-items-center">
                          <Col md={4} className="mb-md-0 mb-1">
                            <Label
                              className="form-label"
                              for={`animation-item-name-${i}`}
                            >
                              Item Name
                            </Label>
                            <Input
                              type="text"
                              id={`animation-item-name-${i}`}
                              placeholder="Vuexy Admin Template"
                            />
                          </Col>
                          <Col md={2} className="mb-md-0 mb-1">
                            <Label
                              className="form-label"
                              for={`animation-cost-${i}`}
                            >
                              Cost
                            </Label>
                            <Input
                              type="number"
                              id={`animation-cost-${i}`}
                              placeholder="32"
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              color="danger"
                              className="text-nowrap px-1"
                              onClick={deleteForm}
                              outline
                            >
                              <X size={14} className="me-50" />
                              <span>Delete</span>
                            </Button>
                          </Col>
                          <Col sm={12}>
                            <hr />
                          </Col>
                        </Row>
                      {/* </Form> */}
                    </Tag>
                  )
                }}
              </Repeater>
              <Button
                className="btn-icon"
                color="primary"
                onClick={increaseCount}
              >
                <Plus size={14} />
                <span className="align-middle ms-25">Add New</span>
              </Button>
            </CardBody>
          </Card>
        {/* </Row> */}
        <div className="d-flex justify-content-between">
          <Button
            type="button"
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

export default PersonalInfo
