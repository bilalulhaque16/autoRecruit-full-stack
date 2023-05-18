import { useDispatch, useSelector } from "react-redux"

// ** Store Imports
import * as layoutActions from "@src/store/common/layout/actions"

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state) => state.layoutReducer)

  const setFooterType = (type) => {
    dispatch(layoutActions.handleFooterType(type))
  }

  return { setFooterType, footerType: store.footerType }
}
