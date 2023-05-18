import { useDispatch, useSelector } from "react-redux"

// ** Store Imports
import * as layoutActions from "@src/store/common/layout/actions"

export const useNavbarType = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state) => state.layoutReducer)

  const setNavbarType = (type) => {
    dispatch(layoutActions.handleNavbarType(type))
  }

  return { navbarType: store.navbarType, setNavbarType }
}
