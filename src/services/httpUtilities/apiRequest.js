import api from "@/src/services/httpUtilities/httpService";
import { isEmpty, get } from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";
import axios from "axios";
import moment from "moment";
import AuthManager from "@/src/utils/AuthManager";

/**
 * Generic API request handler with standardized response processing
 * @param {Promise} apiCall - The API call to execute
 * @param {Function} setLoading - Loading state setter function
 * @param {Function} [successCallback=() => {}] - Success callback function
 * @param {Function} [errorCallback=() => {}] - Error callback function
 * @param {string} [successMessage=""] - Success message to display
 * @param {boolean} [ignoreSuccessMessage=false] - Whether to ignore success message
 * @returns {Promise<void>}
 */
const apiRequest = async (
  apiCall,
  setLoading,
  successCallback = () => {},
  errorCallback = () => {},
  successMessage = "",
  ignoreSuccessMessage = false,
) => {
  if (!apiCall || typeof apiCall.then !== "function") {
    throw new Error("Invalid API call provided");
  }

  try {
    setLoading(true);
    const response = await apiCall;

    const status = get(response, "status", 0);
    const data = get(response, "data.data", null);
    const pagination = get(response, "data.pagination", null);
    const config = get(response, "data.config", null);
    const code = get(response, "data.code", 0);
    const message = get(response, "data.message", "");

    if (status === 200 || code === 200 || code === 204) {
      setLoading(false);
      const responseData = isEmpty(data) ? config : data;
      successCallback(responseData, pagination);

      if (!ignoreSuccessMessage && (message || successMessage)) {
        Toast.success(message || successMessage);
      }
    } else {
      throw new Error(`Unexpected response status: ${status}`);
    }
  } catch (error) {
    setLoading(false);
    errorCallback(error);
    apiRequestErrorResponse(error, ignoreSuccessMessage);
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

/**
 * Handles file download with proper error handling and file naming
 * @param {string} url - The URL to download from
 * @param {Object} headers - Request headers
 * @param {string} [fileName] - Optional custom file name
 * @returns {Promise<void>}
 */
const downloadFileRequest = async (url, headers, fileName) => {
  if (!url) {
    throw new Error("Download URL is required");
  }

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

    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
    window.URL.revokeObjectURL(fileUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
    Toast.error("Failed to download file. Please try again.");
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
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getMaintenanceTicket(perPage, page, postData),
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
  try {
    await AuthManager.removeLoginType();
    await AuthManager.removeToken();
    router.replace("/sign-in");
  } catch (error) {
    console.error("Error during sign out:", error);
    Toast.error("Failed to sign out. Please try again.");
  }
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

const getPropertyOptionsRequest = async (setLoading, successCallback) => {
  await apiRequest(api.getPropertyOptionV2(), setLoading, successCallback);
};

const getSchedulerListingRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getSchedulerListing(postData),
    setLoading,
    successCallback,
  );
};

const getSchedulerDetailRequest = async (id, setLoading, successCallback) => {
  await apiRequest(api.getSchedulerDetail(id), setLoading, successCallback);
};

const patchSchedulerDetailRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.patchSchedulerDetail(id, postData),
    setLoading,
    successCallback,
  );
};

const patchSchedulerDetailStatusRequest = async (
  id,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.patchSchedulerDetailStatus(id),
    setLoading,
    successCallback,
  );
};

const getPropertyOptionsV3Request = async (setLoading, successCallback) => {
  await apiRequest(api.getPropertyOptionV3(), setLoading, successCallback);
};

const getRoomOptionsRequest = async (unitId, setLoading, successCallback) => {
  await apiRequest(api.getRoomOption(unitId), setLoading, successCallback);
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
  getPropertyOptionsRequest,
  getSchedulerListingRequest,
  getSchedulerDetailRequest,
  patchSchedulerDetailRequest,
  patchSchedulerDetailStatusRequest,
  getPropertyOptionsV3Request,
  getRoomOptionsRequest,
};
