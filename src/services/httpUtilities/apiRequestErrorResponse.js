import _ from "lodash";
import Toast from "@/src/utils/Toast";
import Router from "next/router";
import AuthManager from "@/src/utils/AuthManager";

export const apiRequestErrorResponse = (err, ignoreToast = false) => {
  const response = _.get(err, ["response"], "");
  const message = _.get(err, ["message"], "");
  const statusCode = _.get(response, "status", null);

  // if (statusCode === 401) {
  //   AuthManager.removeLoginType();
  //   AuthManager.removeToken().then(() => Router.replace("/sign-in"));
  //   return;
  // }

  if (statusCode === 403) {
    Router.replace("/403");
    unknowErrorMsgFunction(statusCode);
    return;
  }

  if (statusCode === 404) {
    Router.replace("/404");
    unknowErrorMsgFunction(statusCode);
    return;
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
