import { get, has, isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import { useRouter } from "next/navigation"; // Use this in a component

export const apiRequest = async ({
  api,
  setLoading,
  successCallback = () => {},
  errorCallback = () => {},
  successMessage = "Operation successful",
  ignoreSuccessMessage = false,
  router, // Add router as a parameter
}) => {
  try {
    setLoading(true);
    const res = await api;

    const status = get(res, ["status"], 0);
    const data = get(res, ["data", "data"], "");
    const pagination = get(res, ["data", "pagination"], "");
    const config = get(res, ["data", "config"], "");
    const code = get(res, ["data", "code"], 0);
    const message = get(res, ["data", "message"], "");

    const isSuccess = [200, 204].includes(status) || [200, 204].includes(code);

    if (isSuccess) {
      const resultData = isEmpty(data) ? config : data;
      setLoading(false);
      successCallback(resultData, pagination);

      if (!ignoreSuccessMessage) {
        Toast.success(isEmpty(message) ? successMessage : message);
      }
      return { status, data, pagination, config, code, message };
    }

    throw new Error("Unexpected status code");
  } catch (error) {
    setLoading(false);
    errorCallback(error);
    handleApiError(error, ignoreSuccessMessage, router); // Pass router to handleApiError
    throw error;
  }
};

const handleApiError = (err, ignoreToast = false, router) => {
  const response = get(err, ["response"], "");
  const statusCode = get(response, "status", null);
  const errorMessage = get(err, ["message"], "");

  const errorRoutes = {
    401: "/sign-in",
    403: "/403",
    404: "/404",
  };

  if (has(errorRoutes, statusCode)) {
    // router.replace(errorRoutes[statusCode]); // Use the passed router
    showErrorToast(`Error ${statusCode}: Access issue`, ignoreToast);
    return;
  }

  const apiMessage = get(response, ["data", "message"], "");
  const displayMessage = !isEmpty(apiMessage) ? apiMessage : errorMessage;

  if (!isEmpty(displayMessage) && !ignoreToast) {
    Toast.error(displayMessage);
  } else if (!ignoreToast) {
    showErrorToast(`Unknown ${statusCode || ""} Error`, ignoreToast);
  }
};

const showErrorToast = (message, ignoreToast) => {
  if (!ignoreToast) {
    Toast.error(message);
  }
};
