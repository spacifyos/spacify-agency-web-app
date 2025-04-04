import Toast from "@/src/utils/Toast";
import { get, isEmpty } from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import Router from "next/navigation";
import AuthManager from "@/src/utils/AuthManager";

function* httpErrorHelpers(error, action, ignoreToast = false, errorData) {
  if (error.response) {
    yield call(
        handleApiResponseError,
        error.response,
        action,
        ignoreToast,
        errorData,
    );

    return;
  }

  const status = get(error, "response.status", null);

  if (!isEmpty(error.message)) {
    !ignoreToast ? Toast.error(error.message) : false;

    yield put(action(!isEmpty(errorData) ? errorData : error.message), status);
  } else {
    const unknownErrorMsg = `Unknown ${status} Error`;

    Toast.error(unknownErrorMsg);
    yield put(action(unknownErrorMsg, status));
  }
}

function* handleApiResponseError(response, action, ignoreToast, errorData) {
  const statusCode = get(response, "status", null);

  if (statusCode === 401) {
    AuthManager.removeLoginType();
    AuthManager.removeToken().then(() => Router.replace("/"));
  }

  if (statusCode === 403) {
    Router.replace("/403");
  }

  if (statusCode === 404) {
    Router.replace("/404");
  }

  const messages = get(response, "data", null);

  if (!isEmpty(messages.message)) {
    !ignoreToast ? Toast.error(messages.message) : false;

    yield put(action(!isEmpty(errorData) ? errorData : messages, statusCode));
  } else {
    const unknownErrorMsg = `Unknown ${statusCode} Error`;

    !ignoreToast ? Toast.error(unknownErrorMsg) : false;

    yield put(action(unknownErrorMsg, statusCode));
  }
}

export default httpErrorHelpers;
