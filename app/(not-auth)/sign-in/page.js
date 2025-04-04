"use client";

import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import { useRouter } from "next/navigation";

export default function AgencySignIn() {
  const router = useRouter();

  const [signInLoading, setSignInLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickToLogin = async () => {
    if (isEmpty(email)) {
      Toast.error("Email is required.");
      return;
    }

    if (isEmpty(password)) {
      Toast.error("Password is required.");
      return;
    }

    const postData = {
      type: "back-office",
      email: email,
      password: password,
    };

    await apiRequest.signInRequest(postData, setSignInLoading, signInSuccess);
  };

  const signInSuccess = (res) => {
    const authToken = authSelector.getToken(res);
    const isUserVerify = authSelector.getUserVerify(res);
    const userPhoneNumber = authSelector.getUserPhoneNumber(res);
    const userType = authSelector.getUserType(res);

    AuthManager.setToken(authToken);
    AuthManager.setLoginType(userType);

    return router.replace(`/listing`);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container mx-auto flex max-w-screen-md flex-1 flex-col items-start justify-start pt-10 sm:pt-10 md:pt-20 lg:pt-20 xl:pt-20">
      <CustomText textClassName="text-primary font-bold text-center w-full xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl text-xl xl:pb-10 lg:pb-10 md:pb-10 sm:pb-5 pb-5">
        Agency Sign In
      </CustomText>

      <div className="w-full">
        <div className="global-box-shadow global-border-radius bg-white p-4 sm:p-6 md:p-6 lg:p-8 xl:p-8">
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder={"Email"}
            className="input input-bordered user-input mb-4 w-full bg-white"
          />

          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder={"Password"}
            className="input input-bordered user-input mb-4 w-full bg-white"
          />

          <div className="flex justify-center">
            <CustomButton
              buttonClassName="btn-primary w-2/4 mb-2"
              buttonText={"Sign In"}
              onClick={onClickToLogin}
            />
          </div>

          <CustomText textClassName="text-xs my-5 text-center">
            By using our services, you are deemed unconditionally agree, consent
            and be bound by our terms and conditions and privacy policy.
          </CustomText>

          <CustomText textClassName="text-xs text-center text-disable">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </CustomText>
        </div>
      </div>
    </div>
  );
}
