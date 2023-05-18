import { CardBody, Col, Button, Card, CardText } from "reactstrap"

import { Fragment, useState, useEffect } from "react"

import { isNullObject } from "@src/utility/Utils"
import LanguageForm from "../profileForms/LanguageForm"
import { useSelector, useDispatch } from "react-redux"

import * as seekerProfileActions from "@src/store/common/seekerProfile/actions"

const LanguageCard = ({ data }) => {
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
        <CardBody className="pt-1">
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

                    <h5 style={{ fontWeight: "bolder" }}>{item.language}</h5>
                    <CardText>
                      {`Speaking Proficiency : ${item.speaking_proficiency}`}
                    </CardText>

                    <CardText>
                      {`Reading Proficiency : ${item.reading_proficiency}`}
                    </CardText>
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
      <LanguageForm
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen.open}
        formType={sendSidebarOpen.formType}
        data={sendSidebarOpen.data}
      />
    </Fragment>
  )
}
export default LanguageCard
