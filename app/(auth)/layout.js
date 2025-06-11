"use client";

import { useEffect, useState } from "react";
import { includes, isEmpty, isEqual } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import CustomImage from "@/components/CustomImage";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";

// Navigation item type definition
const navigationItems = [
  {
    path: "/my-account",
    label: "My Account",
    icon: {
      active: Images.accountIconActive,
      inactive: Images.accountIconDisable,
    },
    width: "w-4",
  },
  {
    path: "/help-center",
    label: "Help Center",
    icon: {
      active: Images.helpCenterIconActive,
      inactive: Images.helpCenterIconDisable,
    },
    width: "w-5",
    roles: ["master_agency", "agency", "super_admin", "technician"],
  },
  {
    path: "/property",
    label: "Property",
    icon: {
      active: Images.buildingIconActive,
      inactive: Images.buildingIconDisable,
    },
    width: "w-5",
    roles: ["master_agency", "agency", "super_admin"],
  },
  {
    path: "/cleaning-task",
    label: "Cleaning Task",
    icon: {
      active: Images.cleaningIcon2Active,
      inactive: Images.cleaningIcon2Disable,
    },
    width: "w-5",
    roles: ["super_admin", "master_agency", "cleaner"],
  },
  // {
  //   path: "/cleaning-report",
  //   label: "Cleaning Report",
  //   icon: {
  //     active: Images.cleaningIcon2Active,
  //     inactive: Images.cleaningIcon2Disable,
  //   },
  //   width: "w-5",
  //   roles: ["master_agency", "super_admin"],
  // },
  {
    path: "https://tms.spacify.asia/privacy-policy",
    label: "Terms and Conditions",
    icon: {
      inactive: Images.termIconDisable,
    },
    width: "w-5",
    isExternal: true,
  },
];

// Helper function to check user role
const checkUserRole = (userRole, requiredRoles) => {
  if (!requiredRoles || !userRole) return true;

  return requiredRoles.some((role) => {
    switch (role) {
      case "master_agency":
        return Helper.isMasterAgency(userRole);
      case "agency":
        return Helper.isAgency(userRole);
      case "super_admin":
        return Helper.isSuperAdmin(userRole);
      case "technician":
        return Helper.isTechnician(userRole);
      case "cleaner":
        return Helper.isCleaner(userRole);
      default:
        return false;
    }
  });
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userProfileData, setUserProfileData] = useState(null);
  const [userProfileDataLoading, setUserProfileDataLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState(null);

  const userRole = authSelector.getRolePermissionsRole(userProfileData);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      setUserProfileDataLoading(true);
      setError(null);
      await apiRequest.getUserProfileRequest(
        setUserProfileDataLoading,
        (res) => {
          setUserProfileData(res);
        },
      );
    } catch (err) {
      setError("Failed to fetch user profile");
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AuthManager.retrieveToken();
        const type = await AuthManager.retrieveType();

        if (isEmpty(token) || isEmpty(type)) {
          router.replace("/sign-in");
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        router.replace("/sign-in");
      }
    };

    checkAuthentication();
  }, [router]);

  const handleNavigation = (item) => {
    if (item.isExternal) {
      window.open(item.path, "_blank");
    } else {
      router.push(item.path);
    }
    setIsDrawerOpen(false);
  };

  const signOutAccountRequest = async () => {
    try {
      setSignOutLoading(true);
      await apiRequest.signOutAccountRequest(router);
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setSignOutLoading(false);
    }
  };

  const onClickLogoutModal = () => {
    Helper.documentGetElementById("logout_modal").showModal();
  };

  const onClickLogout = async () => {
    onClickCancelLogout();
    await signOutAccountRequest();
  };

  const onClickCancelLogout = () => {
    Helper.documentGetElementById("logout_modal").close();
  };

  const renderNavigationItem = (item) => {
    if (!checkUserRole(userRole, item.roles)) {
      return null;
    }

    const isActive = item.isExternal
      ? false
      : isEqual(pathname, item.path) || includes(pathname, item.path);
    const iconSrc = isActive ? item.icon.active : item.icon.inactive;

    return (
      <div
        key={item.path}
        onClick={() => handleNavigation(item)}
        className={`flex cursor-pointer items-center gap-2 p-6 ${
          isActive
            ? "rounded-none border-l-4 border-primary bg-primary-background"
            : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={item.label}
      >
        <CustomImage src={iconSrc} className={item.width} alt={item.label} />
        <CustomText
          textClassName={`${
            isActive ? "text-primary" : "text-disable"
          } font-light text-sm`}
        >
          {item.label}
        </CustomText>
      </div>
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <LoadingOverlay loading={signOutLoading || userProfileDataLoading} />

      {error && (
        <div className="absolute right-4 top-4 z-50 rounded-md bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="relative flex h-full flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 sm:hidden md:hidden lg:hidden xl:block">
          <div className="flex items-center justify-center p-4">
            <CustomImage
              src={Images.logoHorizontalColor}
              className="w-36"
              alt="Spacify Logo"
              onClick={() => router.push("/my-account")}
            />
          </div>
          {navigationItems.map(renderNavigationItem)}
          <div
            className="flex cursor-pointer items-center gap-2 p-6"
            onClick={onClickLogoutModal}
            role="button"
            tabIndex={0}
            aria-label="Logout"
          >
            <CustomImage
              src={Images.signUpIconDisable}
              className="w-5"
              alt="Logout"
            />
            <CustomText textClassName="text-disable font-light text-sm">
              Log Out
            </CustomText>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between pr-4 sm:flex md:flex lg:flex xl:hidden">
          <div className="flex items-center justify-center p-4">
            <CustomImage
              src={Images.logoHorizontalColor}
              className="w-24 sm:w-24 md:w-28 lg:w-32"
              alt="Spacify Logo"
            />
          </div>

          <div className="drawer" style={{ width: "unset" }}>
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={isDrawerOpen}
              onChange={(e) => setIsDrawerOpen(e.target.checked)}
            />

            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="cursor-pointer"
                aria-label="Open menu"
              >
                <CustomImage
                  src={Images.burgerMenuIconActive}
                  className="w-7"
                  alt="Menu"
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
                {navigationItems.map((item) => (
                  <li key={item.path}>{renderNavigationItem(item)}</li>
                ))}
                <li>
                  <div
                    className="flex cursor-pointer items-center gap-2 p-6"
                    onClick={onClickLogoutModal}
                    role="button"
                    tabIndex={0}
                    aria-label="Logout"
                  >
                    <CustomImage
                      src={Images.signUpIconDisable}
                      className="w-5"
                      alt="Logout"
                    />
                    <CustomText textClassName="text-disable font-light text-sm">
                      Log Out
                    </CustomText>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-full w-full overflow-hidden pb-0 pl-0 pr-0 pt-0 xl:pb-4 xl:pr-4 xl:pt-4">
          <div className="h-full overflow-hidden rounded-3xl bg-primary-background p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <DesktopModal id="logout_modal">
        <div className="p-6">
          <div className="flex flex-col">
            <CustomText textClassName="text-xl font-bold pb-2">
              Confirm Logout
            </CustomText>
            <CustomText textClassName="text-sm pb-2">
              Are you sure you want to logout?
            </CustomText>

            <div className="flex justify-end gap-4 pt-2">
              <CustomButton
                buttonClassName="btn-primary min-h-10 h-10 min-w-24 w-24"
                buttonText="Cancel"
                onClick={onClickCancelLogout}
                aria-label="Cancel logout"
              />

              <CustomButton
                buttonClassName="btn-primary-outline min-h-10 h-10 min-w-24 w-24"
                buttonText="Logout"
                onClick={onClickLogout}
                aria-label="Confirm logout"
              />
            </div>
          </div>
        </div>
      </DesktopModal>
    </div>
  );
}
