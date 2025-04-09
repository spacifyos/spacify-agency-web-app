"use client";

import { useEffect } from "react";
import { get, isEmpty } from "lodash";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = get(router, ["pathname"], "");

  const userProfileData = authSelector.getUserProfileData();
  const userProfileLoading = authSelector.getUserProfileLoading();

  const userType = authSelector.getType(userProfileData);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AuthManager.retrieveToken();
      const type = await AuthManager.retrieveType();

      if (!isEmpty(token) && !isEmpty(type) && isEmpty(userProfileData)) {
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="relative h-full w-full bg-primary-background">
      {children}
    </div>
  );
}
