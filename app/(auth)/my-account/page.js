"use client";

import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { useRouter } from "next/navigation";
import * as authSelector from "@/src/selectors/auth";
import { useEffect, useState } from "react";
import { isEmpty, get, size, isEqual } from "lodash";
import SetPinNumberModal from "@/components/EditProfile/SetPinNumberModal";
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
  const initialTime = 60;

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

  const onClickCopy = () => {
    navigator.clipboard.writeText(referralText);

    Toast.success("Copied link to clipboard.");

    setIsCopy(true);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-8">
      <LoadingOverlay loading={userProfileLoading || editProfileLoading} />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <CustomImage
            src={Images.userIconActive}
            className="my-2 w-20 sm:w-28 md:w-32 lg:w-36 xl:w-32"
          />
        </div>

        <BookingInput
          bgColor="bg-white border border-disable"
          inputClassName="border-none"
          title={"Name"}
          placeholder={"Name"}
          className="pb-3"
          value={nameValue}
          onChange={onChangeNameValue}
        />

        <CustomLabelValue
          label={"Email"}
          value={isEmpty(email) ? "-" : email}
          className="pb-4"
        />

        <div>
          <CustomLabelValue
            label={"Phone Number"}
            value={isEmpty(phoneNumber) ? "-" : phoneNumber}
            styles={{ paddingBottom: 0 }}
          />

          <CustomText textClassName="text-primary text-xs pb-4">
            Use this phone number to login system
          </CustomText>
        </div>

        <div>
          <CustomText textClassName="text-xs pb-2">Change Password</CustomText>

          <CustomButton
            buttonClassName="btn-primary-outline btn-sm mb-4 w-60"
            buttonStyles={{ paddingRight: 30, paddingLeft: 30, height: 40 }}
            buttonText="Change Password"
            onClick={() =>
              onClickOpenChangePasswordModal("desktop_change_password_modal")
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 pt-10">
        <CustomButton
          buttonClassName="btn-primary-outline"
          buttonText={"Cancel"}
          onClick={onClickGoBack}
        />

        <CustomButton
          loading={userProfileLoading}
          buttonClassName="btn-primary"
          buttonText={"Submit"}
          onClick={onClickSubmit}
        />
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
