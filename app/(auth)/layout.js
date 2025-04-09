"use client";

import { useEffect, useState } from "react";
import { includes, isEmpty, isEqual } from "lodash";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import CustomImage from "@/components/CustomImage";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { usePathname, useRouter } from "next/navigation";
import Images from "@/src/utils/Image";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(router);

  const [userProfileData, setUserProfileData] = useState([]);
  const [userProfileDataLoading, setUserProfileDataLoading] = useState(false);

  const [signOutLoading, setSignOutLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const userRole = authSelector.getRolePermissionsRole(userProfileData);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    await apiRequest.getUserProfileRequest(setUserProfileDataLoading, (res) =>
      setUserProfileData(res),
    );
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (isEmpty(token) || isEmpty(type)) {
        router.replace("/sign-in");
      }
    };

    checkAuthentication();
  }, []);

  const signOutAccountRequest = async () => {
    await apiRequest.signOutAccountRequest(router);
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
    <div className="relative h-full w-full overflow-hidden bg-white">
      <LoadingOverlay loading={signOutLoading} />

      <div className="relative flex h-full flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row">
        <div className="hidden w-64 sm:hidden md:hidden lg:hidden xl:block">
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

          {Helper.isMasterAgency(userRole) ||
          Helper.isAgency(userRole) ||
          Helper.isSuperAdmin(userRole) ? (
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
          ) : (
            false
          )}

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

        <div className="flex w-full items-center justify-between pr-4 sm:flex md:flex lg:flex xl:hidden">
          <div className="flex items-center justify-center p-4">
            <CustomImage
              src={Images.logoHorizontalColor}
              className="w-24 sm:w-24 md:w-28 lg:w-32"
            />
          </div>

          <div className="drawer" style={{ width: "unset" }}>
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />

            <div className="drawer-content">
              <label htmlFor="my-drawer" className="cursor-pointer">
                <CustomImage
                  src={Images.burgerMenuIconActive}
                  className="w-7"
                />
              </label>
            </div>
            <div className="drawer-side z-10 max-h-screen">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu min-h-full w-80 bg-base-200 bg-white p-0 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <div
                    onClick={() => {
                      router.push("/my-account");
                      setIsChecked(false);
                    }}
                    style={{ borderRadius: 0 }}
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
                </li>
                <li>
                  <div
                    onClick={() => {
                      router.push("/help-center");
                      setIsChecked(false);
                    }}
                    style={{ borderRadius: 0 }}
                    className={`flex cursor-pointer items-center gap-2 p-6 ${isEqual(pathname, "/help-center") || includes(pathname, "/help-center") ? "border-l-4 border-primary bg-primary-background" : ""}`}
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
                </li>
                {Helper.isMasterAgency(userRole) ||
                Helper.isAgency(userRole) ||
                Helper.isSuperAdmin(userRole) ? (
                  <li>
                    <div
                      onClick={() => {
                        router.push("/property");
                        setIsChecked(false);
                      }}
                      style={{ borderRadius: 0 }}
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
                  </li>
                ) : (
                  false
                )}
                <li>
                  <div
                    className={`flex cursor-pointer items-center gap-2 p-6`}
                    onClick={() =>
                      window.open(
                        "https://tms.spacify.asia/privacy-policy",
                        "blank",
                      )
                    }
                  >
                    <CustomImage src={Images.termIconDisable} className="w-5" />
                    <CustomText
                      textClassName={`text-disable font-light text-sm`}
                    >
                      Terms and Conditions
                    </CustomText>
                  </div>
                </li>
                <li>
                  <div
                    className={`flex cursor-pointer items-center gap-2 p-6`}
                    onClick={onClickLogoutModal}
                  >
                    <CustomImage
                      src={Images.signUpIconDisable}
                      className="w-5"
                    />
                    <CustomText
                      textClassName={`text-disable font-light text-sm`}
                    >
                      Log Out
                    </CustomText>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-full w-full overflow-hidden pb-0 pl-0 pr-0 pt-0 xl:pb-4 xl:pr-4 xl:pt-4">
          <div className="h-full overflow-hidden rounded-3xl bg-primary-background p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
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
