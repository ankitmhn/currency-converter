import { CHANGE_PRIMARY_COLOR } from "./types";

export const changePrimaryColor = color => {
  return {
    type: CHANGE_PRIMARY_COLOR,
    color
  };
};
