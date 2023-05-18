import { useDispatch, useSelector } from "react-redux"

// ** Store Imports
import * as layoutActions from "@src/store/common/layout/actions"

export const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state) => state.layoutReducer)

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value) => {
    dispatch(layoutActions.handleNavbarColor(value))
  }

  return { navbarColor: store.navbarColor, setNavbarColor }
}
