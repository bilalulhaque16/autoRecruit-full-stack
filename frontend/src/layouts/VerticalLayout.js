// ** React Imports
import { Outlet } from "react-router-dom"

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout"

// ** Menu Items Array
import { getSideMenuItems } from "@src/utility/Utils"

import navigation from "@src/navigation/vertical"

const VerticalLayout = (props) => {
  return (
    <Layout
      menuData={
        getSideMenuItems()
      }
      {...props}
    >
      <Outlet />
    </Layout>
  )
}
export default VerticalLayout
