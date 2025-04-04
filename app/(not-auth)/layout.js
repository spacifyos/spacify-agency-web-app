"use client";

import { useEffect, useState } from "react";
import { get, includes, isEmpty, isEqual } from "lodash";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import Constant from "@/src/utils/Constant";
import { deleteCookie } from "cookies-next";
import CustomImage from "@/components/CustomImage";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useRouter } from "next/navigation";
import Image from "@/src/utils/Image";

export default function RootLayout({
  children,
  hideNav = false,
  rightSecondButtonIcon,
  onClickRightSecondButton,
  onClickRightButton,
  rightButtonIcon,
  rightContent,
  isFiltered,
  loading,
  pageBreadcrumbs,
  isMinHeight = true,
  backgroundColor = "bg-primary-background",
}) {
  const router = useRouter();

  const pathname = get(router, ["pathname"], "");

  // const getUserProfileRequest = () =>
  //   dispatch(authAction.getUserProfileRequest());
  const userProfileData = authSelector.getUserProfileData();
  const userProfileLoading = authSelector.getUserProfileLoading();

  const [selectedUserType, setSelectedUserType] = useState("");
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const userType = authSelector.getType(userProfileData);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type) && isEmpty(userProfileData)) {
        fetchUserprofileData();
      }
    };

    checkAuthentication();
  }, []);

  const signOutAccountRequest = () => {};

  const fetchUserprofileData = () => {};

  const onClickSignIn = () => {
    Helper.documentGetElementById("sign_in_modal").showModal();
  };

  const onClickSignUp = () => {
    Helper.documentGetElementById("sign_up_modal").showModal();
  };

  const onClickMyProperty = () => {
    if (isEqual(userType, "tenant")) {
      return router.replace("/user/my-property");
    } else {
      return router.replace("/user/owner");
    }
  };

  const onClickMyAccount = () => {
    return router.push("/user/account");
  };

  const onClickChat = () => {
    if (isEqual(userType, "tenant")) {
      return router.replace("/user/chat");
    } else {
      return router.replace("/user/owner/chat");
    }
  };

  const onClickExplore = () => {
    router.push("/");
  };

  const onClickLogoutModal = () => {
    Helper.documentGetElementById("logout_modal").showModal();
  };

  const onClickLogout = () => {
    onClickCancelLogout();
    setSignOutLoading(true);

    setTimeout(() => {
      setSignOutLoading(false);

      if (isEqual(userType, "tenant")) {
        deleteCookie(Constant.TENANT_UCHAT_COOKIES);
      } else {
        deleteCookie(Constant.OWNER_UCHAT_COOKIES);
      }

      signOutAccountRequest();
    }, 2000);
  };

  const onClickCancelLogout = () => {
    Helper.documentGetElementById("logout_modal").close();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <div className="bg-white" style={{ borderBottom: "3px #f5f8fd solid" }}>
        <div className="container mx-auto flex items-center justify-between py-2 sm:justify-between md:justify-between lg:justify-between xl:justify-between">
          <CustomImage
            src={Image.logoHorizontalColor}
            onClick={onClickExplore}
            className="w-32 cursor-pointer sm:w-36 md:w-36 lg:w-36 xl:w-40"
          />

          {isEmpty(userProfileData) ? (
            <div className="flex gap-3">
              <CustomButton
                icon={loading ? "" : Image.signUpIconActive}
                buttonText={`Sign In`}
                buttonClassName="btn-white w-36 min-h-10 h-10 xl:flex lg:flex md:hidden sm:hidden hidden"
                textClassName="text-sm"
                reverse
                loadingColor="text-primary"
                loading={loading}
                onClick={onClickSignIn}
              />

              <CustomButton
                icon={loading ? "" : Image.signUpIconActive}
                buttonText={`Sign In`}
                buttonClassName="btn-white min-h-10 h-10 xl:hidden lg:hidden"
                textClassName="text-sm"
                reverse
                loadingColor="text-primary"
                loading={loading}
                onClick={onClickSignIn}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <CustomButton
                icon={Image.accountIconFillActive}
                imageStyle={{ width: 13 }}
                textClassName="text-xs"
                buttonText={`Hi, ${"name"}`}
                buttonClassName={`btn-white min-w-40 xl:flex lg:flex md:hidden sm:hidden hidden`}
                reverse
                loading={loading}
                onClick={onClickMyAccount}
              />

              <CustomButton
                icon={Image.accountIconFillActive}
                imageStyle={{ width: 13 }}
                textClassName="text-xs"
                // buttonText={`Hi, ${name}`}
                buttonClassName={`btn-white xl:hidden lg:hidden w-16`}
                reverse
                loading={loading}
                onClick={onClickMyAccount}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`${backgroundColor} flex flex-1 flex-col`}>
        <div
          className={`relative flex h-full flex-1 flex-col ${isMinHeight ? "min-h-screen" : ""}`}
        >
          {isEmpty(pageBreadcrumbs) ? (
            false
          ) : (
            <div className="container mx-auto pb-6 pt-2 sm:pb-6 sm:pt-4 md:pb-6 md:pt-4 lg:pb-6 lg:pt-4 xl:pb-6 xl:pt-4">
              {pageBreadcrumbs}
            </div>
          )}
          {children}

          {loading ? (
            <div
              className={
                "absolute top-0 flex h-full w-full items-center justify-center"
              }
              style={{
                backgroundColor: "rgba(256,256,256,0.5)",
                zIndex: 9999,
              }}
            >
              <span className="loading loading-dots loading-md text-primary sm:loading-md md:loading-md lg:loading-lg xl:loading-lg"></span>
            </div>
          ) : (
            false
          )}
        </div>
      </div>

      <DesktopModal id="logout_modal">
        <div className="p-6">
          <div className="flex flex-col">
            <CustomText textClassName="text-xl font-bold pb-2">
              Confirm Logout
            </CustomText>
            <CustomText textClassName="text-sm pb-2">
              Are you sure want to logout?
            </CustomText>

            <div className="flex justify-end gap-4 pt-2">
              <CustomButton
                buttonClassName={`btn-primary min-h-10 h-10 min-w-24 w-24`}
                buttonText="Cancel"
                onClick={onClickCancelLogout}
              />

              <CustomButton
                buttonClassName={`btn-primary-outline min-h-10 h-10 min-w-24 w-24`}
                buttonText="Logout"
                onClick={onClickLogout}
              />
            </div>
          </div>
        </div>
      </DesktopModal>

      <LoadingOverlay loading={signOutLoading} />
    </div>
  );
}
