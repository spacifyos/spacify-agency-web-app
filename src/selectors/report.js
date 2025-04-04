import { get } from "lodash";

export const getPropertyOption = (state) =>
  get(state, ["property_select_options"], []);
export const getUnitOption = (state) => get(state, ["units"], []);
export const getStatement = (state) => get(state, ["statement"], []);
export const getDescription = (state) => get(state, ["description"], "");
export const getPeriod = (state) => get(state, ["period"], "");
export const getPropertyUnitName = (state) =>
  get(state, ["property_unit_name"], "");
export const getExpense = (state) => get(state, ["expense"], []);
export const getOutstanding = (state) => get(state, ["outstanding"], []);
export const getId = (state) => get(state, ["id"], "");
export const getUnitId = (state) => get(state, ["unit_id"], "");
export const getIncome = (state) => get(state, ["income"], "");
export const getMonth = (state) => get(state, ["month"], "");
export const getPdf = (state) => get(state, ["pdf"], "");
export const getProperty = (state) => get(state, ["property"], "");
export const getUnit = (state) => get(state, ["unit"], "");
export const getTotalExpense = (state) => get(state, ["total_expense"], "");
export const getTotalIncome = (state) => get(state, ["total_income"], "");
export const getGrandTotal = (state) => get(state, ["grand_total"], "");
export const getLabel = (state) => get(state, ["label"], "");
export const getItems = (state) => get(state, ["items"], "");
export const getTitle = (state) => get(state, ["title"], "");
export const getAmount = (state) => get(state, ["amount"], "");
export const getCarryForwardDeductionAmount = (state) =>
    get(state, ["carry_forward_deduction", "amount"], "");
export const getCarryForwardDeductionIsAmountNegative = (state) =>
    get(state, ["carry_forward_deduction", "is_amount_negative"], false);
export const getCurrentMonthPayoutAmount = (state) =>
  get(state, ["current_month_payout", "amount"], "");
export const getCurrentMonthPayoutIsAmountNegative = (state) =>
  get(state, ["current_month_payout", "is_amount_negative"], false);
export const getTotalNetPayoutAmount = (state) =>
  get(state, ["total_net_payout", "amount"], "");
export const getTotalNetPayoutIsAmountNegative = (state) =>
  get(state, ["total_net_payout", "is_amount_negative"], false);
export const getTotalOutstandingAmount = (state) =>
  get(state, ["total_outstanding", "amount"], "");
export const getTotalOutstandingIsAmountNegative = (state) =>
  get(state, ["total_outstanding", "is_amount_negative"], false);
export const getCurrentMonthPNLAmount = (state) =>
  get(state, ["current_month_p_n_l", "amount"], "");
export const getCurrentMonthPNLIsAmountNegative = (state) =>
  get(state, ["current_month_p_n_l", "is_amount_negative"], false);
