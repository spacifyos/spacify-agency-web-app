import { get } from "lodash";

export const getBalance = (state) => get(state, ["balance"], "");
export const getTotalExpense = (state) => get(state, ["total_expense"], "");
export const getTotalIncome = (state) => get(state, ["total_income"], "");
export const getTotalWithdrawal = (state) =>
  get(state, ["total_withdrawal"], "");
export const getUpdatedAt = (state) => get(state, ["updated_at"], "");
export const getRemarks = (state) => get(state, ["remarks"], "");
export const getType = (state) => get(state, ["type"], "");
export const getTypeLabel = (state) => get(state, ["type", "label"], "");
export const getTypeValue = (state) => get(state, ["type", "value"], 0);
export const getTransactionNumber = (state) =>
  get(state, ["transaction_number"], "");
export const getAmountLabel = (state) => get(state, ["amount", "label"], "");
export const getAmountValue = (state) => get(state, ["amount", "amount"], "");
export const getAmountCurrency = (state) =>
  get(state, ["amount", "currency"], "");
export const getIsAdd = (state) => get(state, ["isAdd"], false);
export const getPaymentMethod = (state) => get(state, ["payment_method"], "");
export const getRequestStatus = (state) => get(state, ["request_status"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getInvoiceNumber = (state) => get(state, ["invoice"], "");
export const getTransferTo = (state) => get(state, ["transfer_to"], "");

export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
