import { get } from "lodash";

export const getMeterListingData = (state) =>
  get(state, ["meter", "meterListing", "data"], null);
export const getMeterListingPagination = (state) =>
  get(state, ["meter", "meterListing", "pagination"], null);
export const getMeterListingLoading = (state) =>
  get(state, ["meter", "meterListing", "loading"], false);

export const getMeterOverviewData = (state, id) =>
  get(state, ["meter", "meterOverview", id, "data"], null);
export const getMeterOverviewLoading = (state) =>
  get(state, ["meter", "meterOverview", "loading"], false);

export const getId = (state) => get(state, ["id"], "");
export const getName = (state) => get(state, ["name"], "");
export const getWifi = (state) => get(state, ["is_online"], "");
export const getPower = (state) => get(state, ["is_relay_connected"], "");
export const getBalanceUnit = (state) => get(state, ["remaining_unit"], "");
export const getBalanceCredit = (state) => get(state, ["remaining_amount"], "");
export const getSerialNumber = (state) => get(state, ["vendor_meter_id"], "");
export const getCreatedAt = (state) => get(state, ["created_at"], "");
export const getTotalUnit = (state) => get(state, ["total_unit"], "");
export const getUnitPrice = (state) => get(state, ["unit_price"], "0");
export const getLastConnectAt = (state) =>
  get(state, ["last_connected_at"], "");
export const getTotalUsage = (state) => get(state, ["total_usage"], "");
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
export const getPropertyName = (state) => get(state, ["property_name"], 1);
export const getUrl = (state) => get(state, ["url"], "");
export const getTenancy = (state) => get(state, ["tenancy"], []);
export const getIsShowBalanceInPrice = (state) =>
  get(state, ["is_show_balance_in_price"], "");
