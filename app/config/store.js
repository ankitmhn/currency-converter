import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducers from "../reducers";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];
if (process.env.NODE_ENV === "development") {
  /* logger middleware should always be the LAST 
   * middleware for it to listen to all other middleware 
   * */
  middleWare.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleWare));

sagaMiddleWare.run(rootSaga);

export default store;
