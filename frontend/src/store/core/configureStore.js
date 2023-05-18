import createSagaMiddleware from "redux-saga"
import { createStore, applyMiddleware, compose } from "redux"
import coreSaga from "./coreSaga"
import coreReducer from "./coreReducers"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  coreReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(coreSaga)

export default store
