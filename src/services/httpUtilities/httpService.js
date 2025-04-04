import apiInstance, {
  AUTH_TOKEN_HEADER,
  AUTH_AGENT_TOKEN_HEADER,
} from "./httpManager";
import { includes, isEmpty, isEqual, size } from "lodash";
import moment from "moment/moment";
import Constant from "@/src/utils/Constant";

/**
 * To update language in api header
 * @param locale
 */
const setHeaderLanguage = (locale) => {
  apiInstance.defaults.headers["Accept-Language"] = locale;
};

/**
 * To get common data
 */
const getRootData = () => apiInstance.get(`/root`);

const getSelectOption = () => apiInstance.get(`/select-options`);

const signInAccount = (data) => apiInstance.post("/auth/login", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const postOtpRequest = (data) => apiInstance.post("/otp", data);

const postOtpVerify = (data) => apiInstance.post("/otp/verify", data);

const postAuthVerify = (data) => apiInstance.post("/auth/verify", data);

const postForgotPassword = (postData) =>
  apiInstance.post(`/auth/forgot-password`, postData);

const getUserProfile = () => apiInstance.get("/user-profile");

const patchUserPinNumber = (postData) =>
  apiInstance.patch("/user-profile/pin-number", postData);

const postChangePassword = (postData) =>
  apiInstance.patch("/user-profile/password", postData);

const postUpdateBankDetail = (postData) =>
  apiInstance.patch("/user-profile/bank-details", postData);

const postEditProfile = (postData) =>
  apiInstance.patch("/user-profile", postData);

const getListing = () => apiInstance.get("/listing");

const getListingBanner = () => apiInstance.get("/listing/banner");

const getListingTagOption = () => apiInstance.post("/listing/tag-options");

const getListingProperty = (postData, page, perPage) =>
  apiInstance.post(
    `/listing/property-listings?per_page=${perPage}&page=${page}`,
    postData,
  );

const getListingPropertyDetail = (id) =>
  apiInstance.get(`/listing/property-details/${id}`);

const getListingCancellation = () => apiInstance.get(`/listing/cancellation`);

const getBookingOverview = (id) => apiInstance.get(`/booking/${id}`);

const postBookingCreate = (postData) =>
  apiInstance.post(`/booking/create`, postData);

const getGalleryLinkRequest = () => apiInstance.get("/gallery");

const getTenancyListing = () => apiInstance.get("/tenancy");

const getTenancyOverview = (id) => apiInstance.get(`/tenancy/${id}`);

const getInvoiceSummary = () => apiInstance.get("/invoice/summary");

const getInvoiceListing = (paymentStatus, perPage, page, filterParams = {}) => {
  const status = includes(paymentStatus, "All")
    ? ""
    : includes(paymentStatus, "Unpaid")
      ? "&payment_status[]=1&payment_status[]=2"
      : "&payment_status[]=3";

  const { invoiceNumber, dateFrom, dateTo } = filterParams;

  return apiInstance.get(
    `/invoice?per_page=${perPage}${status}&page=${page}&invoice_number=${isEmpty(invoiceNumber) ? "" : invoiceNumber}&date_from=${isEmpty(dateFrom) ? "" : dateFrom}&date_to=${isEmpty(dateTo) ? "" : dateTo}`,
  );
};

const getInvoiceOverview = (id) => apiInstance.get(`/invoice/${id}`);

const getInvoicePaymentLink = (code) =>
  apiInstance.get(`/invoice/${code}/make-payment`);

const getMeterListing = (per_page, page) =>
  apiInstance.get(`/meter?per_page=${per_page}&page=${page}`);

const getMeterOverview = (id) => apiInstance.get(`/meter/${id}`);

const postSyncMeter = (id) => apiInstance.post(`/meter/${id}/sync-meter`);

const postMeterTopUp = (id, postData) =>
  apiInstance.post(`/meter/${id}/top-up`, postData);

const getAgreementListing = (status, perPage, page) => {
  return apiInstance.get(
    `/agreement?per_page=${perPage}&status=${status}&page=${page}`,
  );
};

const getAgreementOverview = (id) => apiInstance.get(`/agreement/${id}`);

const getAgreementPdf = (id) => apiInstance.get(`/agreement/${id}/pdf`);

const getAgreementPdfDownload = (id) =>
  apiInstance.get(`/agreement/${id}/download`);

const postAgreeAgreement = (id) => apiInstance.post(`/agreement/${id}/agree`);

const postSignAgreement = (id, postData) =>
  apiInstance.post(`/agreement/${id}/sign`, postData);

const getOwnerPropertyList = () => apiInstance.get(`/owner`);

const getOwnerPropertyOverview = (id) =>
  apiInstance.get(`/owner/property/${id}`);

const getOwnerTransaction = () => apiInstance.get(`/owner/transaction`);

const getWallet = () => apiInstance.get(`/wallet`);

const getWalletTransactionListing = (perPage = 20, page = 1, params) => {
  const { type, requestStatus } = params;

  const formatType = (status) => {
    switch (status) {
      case "All":
        return "&type=";
      case "Income":
        return `&type[]=${Constant.WALLET_RENTAL_INCOME}&type[]=${Constant.WALLET_MANUAL_PAID_INVOICE_REVERT_PAYMENT}`;
      case "Expense":
        return `&type[]=${Constant.WALLET_EXPENSE}&type[]=${Constant.WALLET_INVOICE_PAYMENT}`;
      case "Withdraw":
        return `&type[]=${Constant.WALLET_WITHDRAWAL}`;
      case "Refund":
        return `&type[]=${Constant.WALLET_WITHDRAWAL_REFUND}&type[]=${Constant.WALLET_REVERT_INVOICE_PAYMENT}`;
      default:
        return "&type=";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "All":
        return "&request_status=";
      case "Pending":
        return `&request_status[]=${Constant.WALLET_WITHDRAW_PENDING}`;
      case "Confirmed":
        return `&request_status[]=${Constant.WALLET_WITHDRAW_CONFIRM}`;
      case "Approved":
        return `&request_status[]=${Constant.WALLET_WITHDRAW_APPROVED}`;
      case "Cancelled":
        return `&request_status[]=${Constant.WALLET_WITHDRAW_CANCELLED}`;
      default:
        return "&request_status=";
    }
  };

  return apiInstance.get(
    `/wallet/transactions?per_page=${perPage}&page=${page}${formatType(type)}${formatStatus(requestStatus)}`,
  );
};

const getWalletTransactionDetail = (id) => apiInstance.get(`/wallet/${id}`);

const getOwnerReportListing = (params) => {
  const { property_id, unit_id, month } = params;

  const formatDate = isEmpty(month)
    ? moment().startOf("month")
    : moment(month).startOf("month");

  const targetMonth = moment(formatDate, "DD-MM-YYYY").format("M");
  const targetYear = moment(formatDate).year();

  return apiInstance.get(
    `/owner/p-and-l?property_id=${isEmpty(property_id) ? "" : property_id}&unit_id=${isEmpty(unit_id) ? "" : unit_id}&month=${targetMonth}&year=${targetYear}`,
  );
};

const getOwnerReportOverview = (id, month) => {
  const monthFormatted = isEmpty(month)
    ? moment().subtract(1, "months")
    : month;

  const targetMonth = moment(monthFormatted, "DD-MM-YYYY").format("M");
  const targetYear = moment(monthFormatted, "DD-MM-YYYY").year();

  return apiInstance.get(
    `/owner/p-and-l/${id}?month=${targetMonth}&year=${targetYear}`,
  );
};

const postWalletWithdraw = (postData) =>
  apiInstance.post(`/wallet/request-withdrawal`, postData);

const getRentTracker = (id, year) =>
  apiInstance.get(`/owner/rent-tracker/${id}?year=${year}`);

const postPropertyListingCardView = (postData) =>
  apiInstance.post(`/property/card-view`, postData);

const postUnitCardView = (postData) =>
  apiInstance.post(`/unit/card-view`, postData);

const getPropertyOption = () => apiInstance.get(`/property/get-property-unit-options`);

const postResetPasswordVerify = (postData) =>
  apiInstance.post(`/reset-password/verify`, postData);

const postResetPassword = (postData) =>
  apiInstance.post(`/reset-password`, postData);

const getMaintenanceTicket = (per_page, page, status) =>
  apiInstance.get(
    `/maintenance-ticket?per_page=${per_page}&page=${page}&status=${status}`,
  );

const getMaintenanceTicketOption = () =>
  apiInstance.get(`/maintenance-ticket/create`);

const getMaintenanceTicketDetail = (id) =>
  apiInstance.get(`/maintenance-ticket/${id}`);

const postMaintenanceTicket = (postData) =>
  apiInstance.post(`/maintenance-ticket/store`, postData);

const putMaintenanceTicket = (id, postData) =>
  apiInstance.put(`/maintenance-ticket/technician/${id}`, postData);

const deleteGallery = (id) => apiInstance.post(`/gallery/${id}/delete`);

const getMaintenanceTicketComment = (id, per_page, page) =>
  apiInstance.get(
    `/maintenance-ticket/comment/${id}?per_page=${per_page}&page=${page}`,
  );

const postMaintenanceTicketComment = (id, postData) =>
  apiInstance.post(`/maintenance-ticket/comment/store/${id}`, postData);

const postMaintenanceTicketCheckIn = (id, postData) =>
  apiInstance.post(`/maintenance-ticket/check-in/${id}`, postData);

const postMaintenanceTicketCheckOut = (id, postData) =>
  apiInstance.post(`/maintenance-ticket/check-out/${id}`, postData);

export default {
  signUpAccount,
  setHeaderLanguage,
  getRootData,
  getSelectOption,
  getUserProfile,
  postChangePassword,
  postEditProfile,
  signInAccount,
  getListing,
  getListingBanner,
  getListingTagOption,
  getListingProperty,
  getListingPropertyDetail,
  getListingCancellation,
  getBookingOverview,
  postBookingCreate,
  getGalleryLinkRequest,
  postOtpRequest,
  postOtpVerify,
  postAuthVerify,
  postForgotPassword,
  getTenancyListing,
  getTenancyOverview,
  getInvoiceSummary,
  getInvoiceListing,
  getInvoiceOverview,
  getInvoicePaymentLink,
  getMeterListing,
  getMeterOverview,
  postSyncMeter,
  postMeterTopUp,
  getAgreementListing,
  getAgreementOverview,
  getAgreementPdf,
  getAgreementPdfDownload,
  postAgreeAgreement,
  postSignAgreement,
  patchUserPinNumber,
  getOwnerPropertyList,
  getOwnerPropertyOverview,
  getOwnerTransaction,
  postUpdateBankDetail,
  getWallet,
  getWalletTransactionListing,
  getWalletTransactionDetail,
  getOwnerReportListing,
  getOwnerReportOverview,
  postWalletWithdraw,
  getRentTracker,
  postPropertyListingCardView,
  postUnitCardView,
  getPropertyOption,
  postResetPasswordVerify,
  postResetPassword,
  getMaintenanceTicket,
  getMaintenanceTicketOption,
  getMaintenanceTicketDetail,
  postMaintenanceTicket,
  putMaintenanceTicket,
  deleteGallery,
  getMaintenanceTicketComment,
  postMaintenanceTicketComment,
  postMaintenanceTicketCheckIn,
  postMaintenanceTicketCheckOut,
};
