"use client";

import { useEffect, useState } from "react";
import { includes, isEmpty, isEqual } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import AuthManager from "@/src/utils/AuthManager";
import Helper from "@/src/utils/Helper";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import SvgIcon from "@/components/SvgIcon";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";

// Bottom nav items (main tabs)
const bottomNavItems = [
  {
    path: "/my-account",
    label: "Account",
    svgName: "account",
  },
  {
    path: "/help-center",
    label: "Tickets",
    svgName: "helpCenter",
    roles: [
      "system_admin",
      "master_agency",
      "agency",
      "super_admin",
      "technician",
    ],
  },
  {
    path: "/property",
    label: "Property",
    svgName: "building",
    roles: ["system_admin", "master_agency", "agency", "super_admin"],
  },
  {
    path: "/cleaning-task",
    label: "Cleaning",
    svgName: "cleaning",
    roles: ["system_admin", "super_admin", "master_agency", "cleaner"],
  },
  {
    path: "/more",
    label: "More",
    svgName: "more",
  },
];

// "More" menu items
const moreMenuItems = [
  {
    path: "https://tms.spacify.asia/privacy-policy",
    label: "Terms and Conditions",
    svgName: "term",
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
      case "system_admin":
        return Helper.isSystemAdmin(userRole);
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
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
    setIsMoreOpen(false);
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

  const isNavActive = (path) => {
    if (path === "/more") return isMoreOpen;
    return isEqual(pathname, path) || includes(pathname, path);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-surface">
      <LoadingOverlay loading={signOutLoading || userProfileDataLoading} />

      {error && (
        <div className="absolute right-4 top-4 z-50 rounded-xl border border-error-light bg-error-light px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-hidden p-4">{children}</div>
      </main>

      {/* More menu overlay */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* More menu sheet */}
      {isMoreOpen && (
        <div className="fixed inset-x-0 bottom-16 z-50 mx-auto w-full max-w-3xl px-4 pb-2">
          <div className="rounded-2xl border border-border bg-surface shadow-lg">
            <div className="p-3">
              {moreMenuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item)}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-secondary"
                >
                  <SvgIcon name={item.svgName} color="muted" size={20} />
                  <CustomText textClassName="text-sm font-medium text-black">
                    {item.label}
                  </CustomText>
                </button>
              ))}

              <div className="my-1 h-px bg-border" />

              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  onClickLogoutModal();
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-error transition-colors hover:bg-error/5"
              >
                <SvgIcon name="signUp" color="error" size={20} />
                <CustomText textClassName="text-sm font-medium text-error">
                  Log Out
                </CustomText>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="shrink-0 border-t border-border bg-surface">
        <div className="flex items-center justify-around py-1.5">
          {bottomNavItems.map((item) => {
            if (!checkUserRole(userRole, item.roles)) return null;

            const isActive = isNavActive(item.path);

            if (item.path === "/more") {
              return (
                <button
                  key={item.path}
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex cursor-pointer flex-col items-center gap-0.5 px-3 py-1"
                >
                  <SvgIcon
                    name={item.svgName}
                    color={isActive ? "active" : "muted"}
                    size={22}
                  />
                  <span
                    className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted"}`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item)}
                className="flex cursor-pointer flex-col items-center gap-0.5 px-3 py-1"
              >
                <SvgIcon
                  name={item.svgName}
                  color={isActive ? "active" : "muted"}
                  size={22}
                />
                <span
                  className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted"}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Modal */}
      <DesktopModal id="logout_modal">
        <div className="p-6">
          <CustomText textClassName="text-lg font-semibold text-black">
            Log Out
          </CustomText>
          <CustomText textClassName="text-sm text-muted mt-2 mb-6">
            Are you sure you want to log out of your account?
          </CustomText>

          <div className="flex gap-3">
            <CustomButton
              buttonClassName="btn-primary-outline flex-1 min-h-10 h-10"
              buttonText="Cancel"
              onClick={onClickCancelLogout}
              aria-label="Cancel logout"
            />
            <CustomButton
              buttonClassName="btn-primary flex-1 min-h-10 h-10"
              buttonText="Log Out"
              onClick={onClickLogout}
              aria-label="Confirm logout"
            />
          </div>
        </div>
      </DesktopModal>
    </div>
  );
}
