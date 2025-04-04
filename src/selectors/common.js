import { get } from "lodash";

export const getSelectOptionData = (state) =>
  get(state, ["common", "selectOption", "data"], null);
export const getSelectOptionDateLoading = (state) =>
  get(state, ["common", "selectOption", "loading"], false);

export const getCountry = (state) => get(state, ["country"], []);
export const getGender = (state) => get(state, ["gender"], []);
export const getIdType = (state) => get(state, ["id_type"], []);
export const getPhonePrefix = (state) => get(state, ["phone_prefix"], []);
export const getRace = (state) => get(state, ["race"], []);
export const getState = (state) => get(state, ["state"], []);
export const getNationality = (state) => get(state, ["nationality"], []);
export const getOccupation = (state) => get(state, ["occupation"], []);
export const getBankList = (state) => get(state, ["bank_list"], []);
