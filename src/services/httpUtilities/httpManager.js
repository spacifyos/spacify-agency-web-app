import axios from "axios";
import _ from "lodash";
import AuthManager from "@/src/utils/AuthManager";
export const AUTH_TOKEN_HEADER = "x-auth-token";
export const AUTH_AGENT_TOKEN_HEADER = "x-account-token";

/**
 * Axios Api Instance Configuration
 * @type {AxiosInstance}
 */
function createInstance() {
  const instance = axios.create({
    baseURL: process.env.API_DOMAIN,
    timeout: 30000 /** HttpTimeout:30sec **/,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(async (config) => {
    return AuthManager.retrieveToken().then((value) => {
      config.headers["Authorization"] = value ? `Bearer ${value}` : null;
      return config;
    });
  });

  instance.interceptors.response.use(
    (config) => config,
    (error) => {
      if (
        error.code === "ECONNABORTED" ||
        _.get(error, ["response", "status"], "") === 408
      ) {
        // Toast.error(I18n.t("general.errorMsg.networkTimeoutError"));
      }
      return Promise.reject(error);
    },
  );
  return instance;
}

const apiInstance = createInstance();

export default apiInstance;
