import api from "@/src/services/httpUtilities/httpService";
import _, { isEmpty, get } from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";
import axios from "axios";
import moment from "moment";
import AuthManager from "@/src/utils/AuthManager";

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

const signOutAccountRequest = async (router) => {
  await AuthManager.removeLoginType();

  AuthManager.removeToken().then(() => {
    router.replace("/sign-in");
  });
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
  postOtpRequest,
  postOtpVerify,
  postAuthVerify,
  postForgotPasswordRequest,
  getRootDataRequest,
  patchUserPinNumber,
  downloadFileRequest,
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
  getListingTagOptionRequest,
  getUserProfileRequest,
  signOutAccountRequest,
  getMaintenanceTicketOverviewRequest,
};
