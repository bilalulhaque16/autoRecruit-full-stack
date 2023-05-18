import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Progress,
  Row
} from "reactstrap"
// ** React Imports
import { Fragment, useRef, useState } from "react"

import Chart from "react-apexcharts"
import { HelpCircle } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader"
import VerticalNavMenuItems from "./VerticalNavMenuItems"
// ** Third Party Components
import classnames from "classnames"
import { getUserRole } from "@src/utility/Utils"

const Sidebar = (props) => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props

  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block")
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block")
      }
    }
  }

  const options = {
      chart: {
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: ["#51e5a8"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "77%"
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "50%"
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: "#5e5873",
              fontFamily: "Montserrat",
              fontSize: "2.86rem",
              fontWeight: "600"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      grid: {
        padding: {
          bottom: 30
        }
      }
    },
    series = [25]

  return (
    <Fragment>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark"
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <ul className="navigation navigation-main">
                <VerticalNavMenuItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
              </ul>
              {
                // if rolw is admin then dont show this
                getUserRole() !== "admin" && (
                  <ul className="navigation navigation-main">
                    {/* <Card className=" m-2 py-3 px-1">
                  <h5 className="pb-1">Complete your Profile</h5>
                  <Progress striped className="progress-bar-success" value={40}>
                    40
                  </Progress>
                </Card>
           */}

                    <Card style={{ height: "220px" }}>
                      <CardBody className="p-0">
                        <Chart
                          options={options}
                          series={series}
                          type="radialBar"
                          height={150}
                        />
                      </CardBody>
                      <Button
                        color="primary"
                        style={{
                          width: "80%",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "25px",
                          marginBottom: "20px"
                        }}
                        disabled
                      >
                        <span className="align-middle ml-0">
                          Profile Completeness
                        </span>
                      </Button>
                    </Card>
                  </ul>
                )
              }
              {/*
                // if rolw is admin then dont show this
                getUserRole() !== "admin" && (
                  <ul>
                    <Card className=" m-1 py-0 px-0">
                      <CardBody>
                        <CardTitle tag="h4">Applied Jobs</CardTitle>
                        <CardText>Job Count : 23</CardText>
                      </CardBody>
                    </Card>
                  </ul>
                )
                */}
            </PerfectScrollbar>

            {/* <ul>
          <Card>
            <CardBody>
              <CardTitle tag="h4">Applied Jobs</CardTitle>
              <CardText>Job Count : 23</CardText>
              <Button color="primary" outline>
                Open
              </Button>
            </CardBody>
          </Card>
          </ul> */}
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
