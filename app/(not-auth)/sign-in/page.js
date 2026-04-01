"use client";

import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
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
    const userType = authSelector.getUserType(res);

    AuthManager.setToken(authToken);
    AuthManager.setLoginType(userType);

    return router.replace(`/my-account`);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickToLogin();
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <CustomImage
            src={Images.logoHorizontalColor}
            className="w-36"
            alt="Spacify Logo"
          />
        </div>

        <CustomText textClassName="text-2xl font-bold text-black text-center mb-1">
          Welcome back
        </CustomText>
        <CustomText textClassName="text-sm text-muted text-center mb-8">
          Sign in to your agency account
        </CustomText>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={onChangeEmail}
              onKeyDown={handleKeyPress}
              placeholder="Enter your email"
              className="user-input input w-full bg-white px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              onKeyDown={handleKeyPress}
              placeholder="Enter your password"
              className="user-input input w-full bg-white px-4 py-3"
            />
          </div>

          <CustomButton
            buttonClassName="btn-primary mt-2 w-full py-3"
            buttonText="Sign In"
            onClick={onClickToLogin}
            loading={signInLoading}
            disable={signInLoading}
          />
        </div>

        <CustomText textClassName="text-xs text-muted text-center mt-8 leading-relaxed">
          By signing in, you agree to our terms and conditions and privacy
          policy.
        </CustomText>

        <CustomText textClassName="text-xs text-center text-muted mt-3">
          Protected by reCAPTCHA.{" "}
          <span className="text-primary underline">Privacy Policy</span> and{" "}
          <span className="text-primary underline">Terms of Service</span>
        </CustomText>
      </div>
    </div>
  );
}
