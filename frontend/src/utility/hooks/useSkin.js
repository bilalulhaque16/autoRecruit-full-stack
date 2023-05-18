// ** React Imports
import { useEffect } from "react"

// ** Store Imports
import * as layoutActions from "@src/store/common/layout/actions"

import { useDispatch, useSelector } from "react-redux"

export const useSkin = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state) => state.layoutReducer)

  const setSkin = (type) => {
    dispatch(layoutActions.handleSkin(type))
  }

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body

    // ** Define classnames for skins

    const classNames = {
      dark: "dark-layout",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout"
    }

    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList)

    // ** If skin is not light add skin class
    if (store.skin !== "light") {
      element.classList.add(classNames[store.skin])
    }
  }, [store.skin])

  return { skin: store.skin, setSkin }
}
