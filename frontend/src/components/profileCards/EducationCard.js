import { CardBody, Col, Button, Card, CardText } from "reactstrap"

import { Fragment, useState, useEffect } from "react"

import EducationForm from "../profileForms/EducationForm"
import { isNullObject, formatDateToShow } from "@src/utility/Utils"

import { useSelector, useDispatch } from "react-redux"

import * as seekerProfileActions from "@src/store/common/seekerProfile/actions"

const EducationCard = ({ data }) => {
  const dispatch = useDispatch()
  const { success } = useSelector((state) => state.seekerProfileReducer)
  const [sendSidebarOpen, setSendSidebarOpen] = useState({
    open: false,
    data: {},
    formType: ""
  })

  useEffect(() => {
    if (success) {
      setSendSidebarOpen({
        open: false,
        data: {},
        formType: ""
      })
      dispatch(seekerProfileActions.clearResponse())
    }
  }, [success])

  const toggleSendSidebar = () =>
    setSendSidebarOpen({
      open: !sendSidebarOpen.open,
      data: {},
      formType: ""
    })

  return (
    <Fragment>
      <Card>
        <CardBody className="pt-2">
          {!isNullObject(data)
            ? data.map((item, index) => {
                return (
                  <div className="pt-2" key={index}>
                    <Col>
                      <Button.Ripple
                        outline
                        color="primary"
                        className="align-center"
                        style={{
                          float: "right",
                          position: "relative",
                          top: "5px",
                          left: "-20px"
                        }}
                        size="sm"
                        onClick={() => {
                          setSendSidebarOpen({
                            open: true,
                            data: item,
                            formType: "edit"
                          })
                        }}
                      >
                        Edit
                      </Button.Ripple>
                    </Col>

                    <h4>{item.certificate_degree_name}</h4>
                    <h5>{` Institute : ${item.institute_university_name}`}</h5>
                    <CardText>{`Field : ${item.field_of_study}`}</CardText>
                    {item.cgpa ? (
                      <CardText>{`CGPA : ${item.cgpa}`}</CardText>
                    ) : item.percentage ? (
                      <CardText>{`Percentage : ${item.percentage}`}</CardText>
                    ) : null}
                    <CardText>{`Start Date : ${formatDateToShow(
                      item.starting_date
                    )} - End Date ${formatDateToShow(
                      item.completion_date
                    )}`}</CardText>
                    <hr></hr>
                  </div>
                )
              })
            : null}

          <div className="demo-inline-spacing">
            <Button
              color="primary"
              onClick={() => {
                setSendSidebarOpen({
                  open: true,
                  data: {},
                  formType: "add"
                })
              }}
            >
              Add
            </Button>
          </div>
        </CardBody>
      </Card>
      <EducationForm
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen.open}
        formType={sendSidebarOpen.formType}
        data={sendSidebarOpen.data}
      />
    </Fragment>
  )
}
export default EducationCard
