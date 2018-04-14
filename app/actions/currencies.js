import {
  SWAP_CURRENCY,
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION
} from "./types";

export const swapCurrency = () => {
  return { type: SWAP_CURRENCY };
};

export const changeCurrencyAmount = amount => {
  return {
    type: CHANGE_CURRENCY_AMOUNT,
    amount: parseFloat(amount)
  };
};

export const changeBaseCurrency = currency => {
  return {
    type: CHANGE_BASE_CURRENCY,
    currency
  };
};

export const changeQuoteCurrency = currency => {
  return {
    type: CHANGE_QUOTE_CURRENCY,
    currency
  };
};

export const getInitialConversion = () => {
  return {
    type: GET_INITIAL_CONVERSION
  };
};
