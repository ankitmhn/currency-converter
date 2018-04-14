// 1. Curreyncy swap
// 2. Change base currency
// 3. Upon initial app load
import { takeEvery, select, call, put } from "redux-saga/effects";

import {
  GET_INITIAL_CONVERSION,
  CHANGE_BASE_CURRENCY,
  SWAP_CURRENCY,
  CONVERSION_ERROR,
  CONVERSION_RESULT
} from "./../actions";

const getLatestRates = currency =>
  fetch(
    `http://data.fixer.io/api/latest?access_key=c6239cd2c0b329ea03cd0ecc32f4be12&base=${currency}`
  );

function* fetchLatestConverionRates(action) {
  try {
    let currency = action.currency;
    if (currency === undefined) {
      //if currency is not passed i.e. getinitial or swapcurrency action, take it from the redux store
      //wait for a response from the redux state and then assign it to currency
      currency = yield select(state => state.currencies.baseCurrency);
    }
    console.log("currency", currency);
    const response = yield call(getLatestRates, currency);
    const result = yield response.json();
    console.log(result);

    //update the redux store
    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    console.log("Saga error", e);
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConverionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConverionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConverionRates);
}
