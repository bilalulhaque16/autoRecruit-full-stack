// ** Third Party Components
import { Moon, Sun } from "react-feather"
// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap"

// ** Custom Components
import Avatar from "@components/avatar"
import IntlDropdown from "./IntlDropdown"
// ** Dropdowns Imports
import NavbarSearch from "./NavbarSearch"
import NotificationDropdown from "./NotificationDropdown"
// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />
    }
  }
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style">
          <ThemeToggler />
        </NavLink>
      </NavItem>
      {/*<NavbarSearch />*/}
      {/*  <NotificationDropdown />*/}
      <UserDropdown />
    </ul>
  )
}

export default NavbarUser
