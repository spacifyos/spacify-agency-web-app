"use client";

import SvgIcon from "@/components/SvgIcon";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/navigation";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import { isEmpty, isEqual } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import CustomButton from "@/components/CustomButton";
import DesktopChangePasswordModal from "@/components/EditProfile/DesktopChangePasswordModal";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Account() {
  const router = useRouter();

  const [userProfileData, setUserProfileData] = useState([]);
  const [userProfileLoading, setUserProfileLoading] = useState(false);

  const name = authSelector.getName(userProfileData);
  const email = authSelector.getEmail(userProfileData);
  const phoneNumber = authSelector.getPhoneNumber(userProfileData);

  const [errorMessage, setErrorMessage] = useState([]);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [editProfileLoading, setEditProfileLoading] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [targetModalId, setTargetModalId] = useState("");

  useEffect(() => {
    if (!isEmpty(name)) {
      setNameValue(name);
    }
  }, [name]);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  const fetchUserprofileData = async () => {
    await apiRequest.getUserProfileRequest(setUserProfileLoading, (res) =>
      setUserProfileData(res),
    );
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickOpenChangePasswordModal = (id) => {
    const checkId = isEmpty(id) ? targetModalId : id;
    setTargetModalId(checkId);
    Helper.documentGetElementById(checkId).showModal();
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPasswordValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const onClickChangePassword = async () => {
    const newErrors = {};

    if (isEmpty(currentPasswordValue)) {
      newErrors["current_password"] = "Current password is required.";
    }
    if (isEmpty(passwordValue)) {
      newErrors["password"] = "Password is required.";
    }
    if (isEmpty(confirmPasswordValue)) {
      newErrors["confirm_password"] = "Confirm password is required.";
    }

    setErrorMessage(newErrors);

    if (isEmpty(newErrors)) {
      if (!isEqual(passwordValue, confirmPasswordValue)) {
        newErrors["password"] = "Password and Confirm Password do not match.";
        newErrors["confirm_password"] =
          "Password and Confirm Password do not match.";
        return;
      }

      closeChangePasswordModal();

      const postData = {
        current_password: currentPasswordValue,
        password: passwordValue,
        password_confirmation: confirmPasswordValue,
      };

      await apiRequest.postChangePasswordRequest(
        postData,
        setChangePasswordLoading,
        changePasswordSuccess,
        changePasswordFailure,
      );
    }
  };

  const changePasswordSuccess = () => {
    setCurrentPasswordValue("");
    setPasswordValue("");
    setConfirmPasswordValue("");
  };

  const changePasswordFailure = () => {
    setTimeout(() => {
      onClickOpenChangePasswordModal();
    }, 500);
  };

  const onClickCloseChangePasswordModal = () => {
    closeChangePasswordModal();
  };

  const closeChangePasswordModal = () => {
    setErrorMessage([]);
    Helper.documentGetElementById(targetModalId).close();
  };

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const onClickSubmit = async () => {
    if (isEmpty(nameValue)) {
      return Toast.error("Name is required.");
    }

    const postData = {
      name: nameValue,
    };

    await apiRequest.postEditProfileRequest(
      postData,
      setEditProfileLoading,
      editProfileSuccess,
    );
  };

  const editProfileSuccess = () => {
    fetchUserprofileData();
  };

  return (
    <div className="hide-scroll-bar flex h-full flex-col overflow-y-auto">
      <LoadingOverlay loading={userProfileLoading || editProfileLoading} />

      <div className="flex flex-col gap-6 rounded-2xl bg-white p-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 pb-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-background">
            <SvgIcon name="user" color="active" size={48} />
          </div>
          <CustomText textClassName="text-lg font-semibold text-black">
            {isEmpty(name) ? "..." : name}
          </CustomText>
          <CustomText textClassName="text-sm text-muted">
            {isEmpty(email) ? "-" : email}
          </CustomText>
        </div>

        {/* Profile Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              className="user-input input w-full bg-white px-4 py-3"
              placeholder="Name"
              value={nameValue}
              onChange={onChangeNameValue}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Email
            </label>
            <div className="rounded-xl bg-surface-secondary px-4 py-3 text-sm text-muted">
              {isEmpty(email) ? "-" : email}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-black">
              Phone Number
            </label>
            <div className="rounded-xl bg-surface-secondary px-4 py-3 text-sm text-muted">
              {isEmpty(phoneNumber) ? "-" : phoneNumber}
            </div>
            <p className="mt-1 text-xs text-primary">
              Use this phone number to login
            </p>
          </div>
        </div>

        {/* Change Password */}
        <div className="border-t border-border pt-4">
          <CustomButton
            buttonClassName="btn-primary-outline btn-sm w-full"
            buttonText="Change Password"
            onClick={() =>
              onClickOpenChangePasswordModal("desktop_change_password_modal")
            }
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-border pt-4">
          <CustomButton
            buttonClassName="btn-primary-outline flex-1"
            buttonText="Cancel"
            onClick={onClickGoBack}
          />
          <CustomButton
            loading={userProfileLoading}
            buttonClassName="btn-primary flex-1"
            buttonText="Save Changes"
            onClick={onClickSubmit}
          />
        </div>
      </div>

      <DesktopChangePasswordModal
        currentPasswordValue={currentPasswordValue}
        onChangeCurrentPassword={onChangeCurrentPassword}
        errorMessage={errorMessage}
        passwordValue={passwordValue}
        onChangePassword={onChangePassword}
        confirmPasswordValue={confirmPasswordValue}
        onChangeConfirmPassword={onChangeConfirmPassword}
        changePasswordLoading={changePasswordLoading}
        onClickCloseChangePasswordModal={onClickCloseChangePasswordModal}
        onClickChangePassword={onClickChangePassword}
      />
    </div>
  );
}
