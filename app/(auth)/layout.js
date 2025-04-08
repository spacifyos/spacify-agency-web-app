"use client";

import { useEffect, useState } from "react";
import { includes, isEqual } from "lodash";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import CustomImage from "@/components/CustomImage";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { usePathname, useRouter } from "next/navigation";
import Images from "@/src/utils/Image";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(router);

  const [signOutLoading, setSignOutLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();
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
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="relative grid h-screen grid-cols-12">
        <div className="col-span-2 hidden sm:hidden md:hidden lg:hidden xl:block">
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

        <div className="col-span-12 flex items-center justify-between pr-4 sm:flex md:flex lg:flex xl:hidden">
          <div className="flex items-center justify-center p-4">
            <CustomImage src={Images.logoHorizontalColor} className="w-36" />
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
                  className="w-10"
                />
              </label>
            </div>
            <div className="drawer-side z-10 max-h-screen">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu min-h-full w-80 bg-base-200 bg-white p-4 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <div
                    onClick={() => {
                      router.push("/my-account");
                      setIsChecked(false);
                    }}
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
                </li>
                <li>
                  {" "}
                  <div
                    onClick={() => {
                      router.push("/property");
                      setIsChecked(false);
                    }}
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

        <div className="col-span-12 overflow-hidden pb-4 pl-4 pr-4 pt-0 sm:col-span-12 sm:pb-4 sm:pl-4 sm:pt-0 md:col-span-12 md:pb-4 md:pl-4 md:pt-0 lg:col-span-12 lg:pb-4 lg:pl-4 lg:pt-0 xl:col-span-10 xl:pb-4 xl:pl-0 xl:pt-4">
          <div className="h-full overflow-hidden rounded-3xl bg-primary-background p-8">
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
