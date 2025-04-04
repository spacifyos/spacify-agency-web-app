import { get } from "lodash";

export const getInvoiceListingData = (state, paymentStatus) =>
  get(state, ["invoice", "invoiceListing", paymentStatus, "data"], null);
export const getInvoiceListingPagination = (state, paymentStatus) =>
  get(state, ["invoice", "invoiceListing", paymentStatus, "pagination"], null);
export const getInvoiceListingLoading = (state, paymentStatus) =>
  get(state, ["invoice", "invoiceListing", paymentStatus, "loading"], false);

export const getInvoiceSummaryData = (state) =>
  get(state, ["invoice", "invoiceSummary", "data"], null);
export const getInvoiceSummaryLoading = (state) =>
  get(state, ["invoice", "invoiceSummary", "loading"], false);

export const getInvoiceOverviewData = (state, id) =>
  get(state, ["invoice", "invoiceOverview", id, "data"], null);
export const getInvoiceOverviewLoading = (state) =>
  get(state, ["invoice", "invoiceOverview", "loading"], false);

export const getId = (state) => get(state, ["id"], "");
export const getItems = (state) => get(state, ["items"], []);
export const getInvoiceNumber = (state) => get(state, ["invoice_number"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getPaymentStatus = (state) => get(state, ["payment_status"], "");
export const getIsPaid = (state) => get(state, ["is_paid"], "");
export const getRentalFee = (state) => get(state, ["rental_fee"], "");
export const getInvoiceDate = (state) => get(state, ["invoice_date"], "");
export const getDueDate = (state) => get(state, ["invoice_due_date"], "");
export const getUpdatedAt = (state) => get(state, ["updated_at"], "");
export const getTotalPay = (state) => get(state, ["total_pay"], "");
export const getOverdue = (state) => get(state, ["overdue"], "");
export const getDueSoon = (state) => get(state, ["due_Soon"], "");
export const getBillTo = (state) => get(state, ["bill_to"], "");
export const getProperty = (state) => get(state, ["property"], "");
export const getTenancyCode = (state) => get(state, ["tenancy_code"], "");
export const getSchedule = (state) => get(state, ["schedule"], "");
export const getGrandtotal = (state) => get(state, ["grand_total"], "");
export const getTax = (state) => get(state, ["tax_amount"], "");
export const getTotalAmount = (state) => get(state, ["total_amount"], "");
export const getName = (state) => get(state, ["name"], "");
export const getTotalAmountText = (state) =>
  get(state, ["total_amount_text"], "");
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
export const getUrl = (state) => get(state, ["url"], "");
export const getPaidAt = (state) => get(state, ["paid_at"], "");
export const getDocument = (state) => get(state, ["document"], "");
export const getReceipt = (state) => get(state, ["receipt"], "");
