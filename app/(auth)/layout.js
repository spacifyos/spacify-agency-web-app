"use client";

import { useEffect, useState } from "react";
import { includes, isEqual } from "lodash";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import CustomImage from "@/components/CustomImage";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePathname, useRouter } from "next/navigation";
import Images from "@/src/utils/Image";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

export default function RootLayout({ children }) {
  const router = useRouter();

  const pathname = usePathname(router);

  const userProfileData = authSelector.getUserProfileData();
  const userProfileLoading = authSelector.getUserProfileLoading();

  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();
    };

    checkAuthentication();
  }, []);

  const signOutAccountRequest = async () => {
    await apiRequest.signOutAccountRequest();
  };

  const onClickLogoutModal = () => {
    Helper.documentGetElementById("logout_modal").showModal();
  };

  const onClickLogout = async () => {
    onClickCancelLogout();
    setSignOutLoading(true);

    setTimeout(() => {
      setSignOutLoading(false);

      signOutAccountRequest();
    }, 2000);
  };

  const onClickCancelLogout = () => {
    Helper.documentGetElementById("logout_modal").close();
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-12">
        <div className="col-span-2">
          <div>
            <div className="flex items-center justify-center p-4">
              <CustomImage src={Images.logoHorizontalColor} className="w-36" />
            </div>

            <div
              onClick={() => router.push("/my-account")}
              className={`flex cursor-pointer items-center gap-2 p-6 ${isEqual(pathname, "/my-account") ? "border-l-4 border-primary bg-primary-background" : ""} `}
            >
              <CustomImage
                src={
                  isEqual(pathname, "/my-account")
                    ? Images.accountIconActive
                    : Images.accountIconDisable
                }
                className="w-4"
              />
              <CustomText
                textClassName={`${isEqual(pathname, "/my-account") ? "text-primary" : "text-disable"} font-light text-sm`}
              >
                My Account
              </CustomText>
            </div>

            <div
              onClick={() => router.push("/help-center")}
              className={`flex cursor-pointer items-center gap-2 p-6 ${isEqual(pathname, "/help-center") || includes(pathname, "/help-center") ? "border-l-4 border-primary bg-primary-background" : ""} `}
            >
              <CustomImage
                src={
                  isEqual(pathname, "/help-center") ||
                  includes(pathname, "/help-center")
                    ? Images.helpCenterIconActive
                    : Images.helpCenterIconDisable
                }
                className="w-5"
              />
              <CustomText
                textClassName={`${isEqual(pathname, "/help-center") || includes(pathname, "/help-center") ? "text-primary" : "text-disable"} font-light text-sm`}
              >
                Help Center
              </CustomText>
            </div>

            <div
              onClick={() => router.push("/property")}
              className={`flex cursor-pointer items-center gap-2 p-6 ${isEqual(pathname, "/property") ? "border-l-4 border-primary bg-primary-background" : ""} `}
            >
              <CustomImage
                src={
                  isEqual(pathname, "/property")
                    ? Images.buildingIconActive
                    : Images.buildingIconDisable
                }
                className="w-5"
              />
              <CustomText
                textClassName={`${isEqual(pathname, "/property") ? "text-primary" : "text-disable"} font-light text-sm`}
              >
                Property
              </CustomText>
            </div>

            <div
              className={`flex cursor-pointer items-center gap-2 p-6`}
              onClick={() =>
                window.open("https://tms.spacify.asia/privacy-policy", "blank")
              }
            >
              <CustomImage src={Images.termIconDisable} className="w-5" />
              <CustomText textClassName={`text-disable font-light text-sm`}>
                Terms and Conditions
              </CustomText>
            </div>

            <div
              className={`flex cursor-pointer items-center gap-2 p-6`}
              onClick={onClickLogoutModal}
            >
              <CustomImage src={Images.signUpIconDisable} className="w-5" />
              <CustomText textClassName={`text-disable font-light text-sm`}>
                Log Out
              </CustomText>
            </div>
          </div>
        </div>
        <div className="col-span-10 py-4 pr-4">
          <div className="h-full rounded-3xl bg-primary-background p-8">
            {children}
          </div>
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
    </div>
  );
}
