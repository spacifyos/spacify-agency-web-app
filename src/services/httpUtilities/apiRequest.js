import api from "@/src/services/httpUtilities/httpService";
import _, { isEmpty, get } from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";
import axios from "axios";
import moment from "moment";
import AuthManager from "@/src/utils/AuthManager";
import Router from "next/router";

const apiRequest = async (
  api,
  setLoading,
  successCallback = () => {},
  errorCallback = () => {},
  successMessage = "",
  ignoreSuccessMessage = false,
) => {
  try {
    setLoading(true);
    const res = await api;

    const status = get(res, ["status"], 0);
    const data = get(res, ["data", "data"], "");
    const pagination = get(res, ["data", "pagination"], "");
    const config = get(res, ["data", "config"], "");
    const code = get(res, ["data", "code"], 0);
    const message = get(res, ["data", "message"], "");

    if (status === 200 || code === 200 || code === 204) {
      setLoading(false);
      successCallback(isEmpty(data) ? config : data, pagination);

      if (!ignoreSuccessMessage) {
        Toast.success(isEmpty(message) ? successMessage : message);
      }
    }
  } catch (err) {
    setLoading(false);
    errorCallback(err);
    apiRequestErrorResponse(err, ignoreSuccessMessage);
  }
};

const signInRequest = async (
  postData,
  setLoading,
  successCallback,
  errorCallback,
) => {
  await apiRequest(
    api.signInAccount(postData),
    setLoading,
    successCallback,
    errorCallback,
  );
};

const signUpRequest = async (
  postData,
  setLoading,
  successCallback,
  errorCallback,
) => {
  await apiRequest(
    api.signUpAccount(postData),
    setLoading,
    successCallback,
    errorCallback,
  );
};

const postChangePasswordRequest = async (
  postData,
  setLoading,
  successCallback,
  failureCallback,
) => {
  await apiRequest(
    api.postChangePassword(postData),
    setLoading,
    successCallback,
    failureCallback,
  );
};

const postEditProfileRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(api.postEditProfile(postData), setLoading, successCallback);
};

const postBookingCreateRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postBookingCreate(postData),
    setLoading,
    successCallback,
  );
};

const postOtpRequest = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postOtpRequest(postData), setLoading, successCallback);
};

const postOtpVerify = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postOtpVerify(postData), setLoading, successCallback);
};

const postAuthVerify = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postAuthVerify(postData), setLoading, successCallback);
};

const postForgotPasswordRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postForgotPassword(postData),
    setLoading,
    successCallback,
  );
};

const getInvoicePaymentLinkRequest = async (
  code,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getInvoicePaymentLink(code),
    setLoading,
    successCallback,
  );
};

const postSyncMeterRequest = async (id, setLoading, successCallback) => {
  await apiRequest(api.postSyncMeter(id), setLoading, successCallback);
};

const postMeterTopUpRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMeterTopUp(id, postData),
    setLoading,
    successCallback,
  );
};

const getRootDataRequest = async (
  setLoading,
  successCallback,
  successMessage = "Success",
) => {
  await apiRequest(
    api.getRootData(),
    setLoading,
    successCallback,
    () => {},
    successMessage,
    true,
  );
};

const getAgreementPdf = async (id, setLoading, successCallback) => {
  await apiRequest(api.getAgreementPdf(id), setLoading, successCallback);
};

const getAgreementDownload = async (id, setLoading, successCallback) => {
  await apiRequest(
    api.getAgreementPdfDownload(id),
    setLoading,
    successCallback,
  );
};

const postAgreeAgreement = async (id, setLoading, successCallback) => {
  await apiRequest(api.postAgreeAgreement(id), setLoading, successCallback);
};

const postSignAgreement = async (id, postData, setLoading, successCallback) => {
  await apiRequest(
    api.postSignAgreement(id, postData),
    setLoading,
    successCallback,
  );
};

const patchUserPinNumber = async (
  postData,
  setLoading,
  successCallback,
  failureCallback,
) => {
  await apiRequest(
    api.patchUserPinNumber(postData),
    setLoading,
    successCallback,
    failureCallback,
  );
};

const downloadFileRequest = async (url, headers, fileName) => {
  try {
    const response = await axios.get(url, {
      headers,
      responseType: "blob",
    });

    const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileUrl;
    fileLink.setAttribute(
      "download",
      `${isEmpty(fileName) ? moment().format("YYYYMMDDHHmmss") : fileName}.pdf`,
    );

    // specify the file name and extension
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};

const getOwnerPropertyList = async (setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerPropertyList(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerPropertyOverview = async (id, setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerPropertyOverview(id),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerTransaction = async (setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerTransaction(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getUChatUserRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getUserProfile(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postUpdateBankDetailRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postUpdateBankDetail(postData),
    setLoading,
    successCallback,
  );
};

const getWalletRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getWallet(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getWalletTransactionListingRequest = async (
  perPage,
  page,
  params,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getWalletTransactionListing(perPage, page, params),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getWalletTransactionDetailRequest = async (
  id,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getWalletTransactionDetail(id),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerReportListingRequest = async (
  params,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getOwnerReportListing(params),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerReportOverviewRequest = async (
  id,
  month,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getOwnerReportOverview(id, month),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postWalletWithdrawRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postWalletWithdraw(postData),
    setLoading,
    successCallback,
  );
};

const getRentTrackerRequest = async (id, year, setLoading, successCallback) => {
  await apiRequest(
    api.getRentTracker(id, year),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postPropertyListingCardViewRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postPropertyListingCardView(postData),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postUnitCardViewRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postUnitCardView(postData),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getPropertyOptionRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getPropertyOption(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postResetPasswordVerifyRequest = async (
  postData,
  setLoading,
  successCallback,
  errorCallback,
) => {
  await apiRequest(
    api.postResetPasswordVerify(postData),
    setLoading,
    successCallback,
    errorCallback,
    "",
    true,
  );
};

const postResetPasswordRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postResetPassword(postData),
    setLoading,
    successCallback,
  );
};

const getMaintenanceTicketOptionRequest = async (
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicketOption(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getMaintenanceTicketListingRequest = async (
  perPage,
  page,
  status,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicket(perPage, page, status),
    setLoading,
    successCallback,
  );
};

const getMaintenanceTicketDetailRequest = async (
  id,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getWalletTransactionDetail(id),
    setLoading,
    successCallback,
  );
};

const postMaintenanceTicketRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMaintenanceTicket(postData),
    setLoading,
    successCallback,
  );
};

const putMaintenanceTicketRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.putMaintenanceTicket(id, postData),
    setLoading,
    successCallback,
  );
};

const deleteGalleryRequest = async (id, setLoading, successCallback) => {
  await apiRequest(api.deleteGallery(id), setLoading, successCallback);
};

const postMaintenanceTicketCommentRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMaintenanceTicketComment(id, postData),
    setLoading,
    successCallback,
  );
};

const getMaintenanceTicketCommentRequest = async (
  id,
  perPage,
  page,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicketComment(id, perPage, page),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postMaintenanceTicketCheckInRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMaintenanceTicketCheckIn(id, postData),
    setLoading,
    successCallback,
  );
};

const postMaintenanceTicketCheckOutRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMaintenanceTicketCheckOut(id, postData),
    setLoading,
    successCallback,
  );
};

const getMeterUsageRequest = async (
  id,
  month,
  year,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMeterUsage(id, month, year),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getListingTagOptionRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getListingTagOption(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getUserProfileRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getUserProfile(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const signOutAccountRequest = async () => {
  await AuthManager.removeLoginType();

  AuthManager.removeToken().then(() => {
    Router.replace("/").then(() => Router.reload());
  });
};

const getMaintenanceListingTicketRequest = async (
  per_page,
  page,
  status,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicket(per_page, page, status),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getMaintenanceTicketOverviewRequest = async (
  id,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicketDetail(id),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

export default {
  signInRequest,
  signUpRequest,
  postChangePasswordRequest,
  postEditProfileRequest,
  postBookingCreateRequest,
  postOtpRequest,
  postOtpVerify,
  postAuthVerify,
  postForgotPasswordRequest,
  getInvoicePaymentLinkRequest,
  postSyncMeterRequest,
  postMeterTopUpRequest,
  getRootDataRequest,
  getAgreementPdf,
  getAgreementDownload,
  postAgreeAgreement,
  postSignAgreement,
  patchUserPinNumber,
  downloadFileRequest,
  getOwnerPropertyList,
  getOwnerPropertyOverview,
  getOwnerTransaction,
  getUChatUserRequest,
  postUpdateBankDetailRequest,
  getWalletRequest,
  getWalletTransactionListingRequest,
  getWalletTransactionDetailRequest,
  getOwnerReportListingRequest,
  getOwnerReportOverviewRequest,
  postWalletWithdrawRequest,
  getRentTrackerRequest,
  postPropertyListingCardViewRequest,
  postUnitCardViewRequest,
  getPropertyOptionRequest,
  postResetPasswordVerifyRequest,
  postResetPasswordRequest,
  getMaintenanceTicketOptionRequest,
  getMaintenanceTicketListingRequest,
  getMaintenanceTicketDetailRequest,
  postMaintenanceTicketRequest,
  putMaintenanceTicketRequest,
  deleteGalleryRequest,
  postMaintenanceTicketCommentRequest,
  getMaintenanceTicketCommentRequest,
  postMaintenanceTicketCheckInRequest,
  postMaintenanceTicketCheckOutRequest,
  getMeterUsageRequest,
  getListingTagOptionRequest,
  getUserProfileRequest,
  signOutAccountRequest,
  getMaintenanceTicketOverviewRequest,
};
