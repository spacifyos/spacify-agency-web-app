import _ from "lodash";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";

export const apiRequestErrorResponse = async (err, ignoreToast = false) => {
  const response = _.get(err, ["response"], "");
  const message = _.get(err, ["message"], "");
  const statusCode = _.get(response, "status", null);

  if (statusCode === 401) {
    await AuthManager.removeLoginType();
    await AuthManager.removeToken().then(
      () => (window.location.href = "/sign-in"),
    );
    return;
  }

  if (statusCode === 403) {
    // await AuthManager.removeToken();
    // await AuthManager.retrieveType();
    window.location.href = "/forbidden";
    unknowErrorMsgFunction(statusCode);
    return;
  }

  if (statusCode === 404) {
    window.location.href = "/404";
    unknowErrorMsgFunction(statusCode);
    return;
  }

  if (statusCode >= 500) {
    throw new Error(message || "Internal Server Error");
  }

  if (!_.isEmpty(response)) {
    const messages = _.get(response, ["data", "message"], "");

    if (!_.isEmpty(messages)) {
      !ignoreToast ? Toast.error(messages) : false;
    } else {
      unknowErrorMsgFunction(statusCode);
    }

    return;
  }

  if (!_.isEmpty(message)) {
    !ignoreToast ? Toast.error(message) : false;
  } else {
    unknowErrorMsgFunction(statusCode);
  }
};

const unknowErrorMsgFunction = (statusCode) => {
  const unknownErrorMsg = `Unknown ${statusCode} Error`;
  Toast.error(unknownErrorMsg);
};
