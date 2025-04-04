import FeatureComponent from "@/components/Account/FeatureComponent";
import Images from "@/src/utils/Image";
import { get, isEmpty, isEqual, size } from "lodash";
import SetPinNumberModal from "@/components/EditProfile/SetPinNumberModal";
import { useEffect, useState } from "react";
import * as authSelector from "@/src/selectors/auth";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import { useRouter } from "next/navigation";

const DesktopNavigationBar = ({ userData, onClickLogout }) => {
  const router = useRouter();
  const initialTime = 60;

  const [setPinNumberLoading, setSetPinNumberLoading] = useState(false);
  const [pinNumberValue, setPinNumberValue] = useState("");
  const [confirmPinNumberValue, setConfirmPinNumberValue] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isRequestOtp, setIsRequestOtp] = useState(false);

  const userType = authSelector.getType(userData);
  const userPhoneNumber = authSelector.getPhoneNumber(userData);
  const isTenant = isEqual(userType, "tenant");
  const isBackOffice = isEqual(userType, "back-office");
  const userRole = authSelector.getRolePermissionsRole(userData);

  useEffect(() => {
    if (timeLeft > 0 && !isResendEnabled) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setTimeLeft(60);
      setIsResendEnabled(true);
    }
  }, [timeLeft, isResendEnabled]);

  const onClickSetPinNumber = async () => {
    if (!isRequestOtp) {
      return Toast.error("You must request otp.");
    }

    const newErrors = {};

    if (isEmpty(pinNumberValue)) {
      newErrors["pin_number"] = "Password is required.";
    }

    if (isEmpty(confirmPinNumberValue)) {
      newErrors["confirm_pin_number"] = "Confirm password is required.";
    }

    if (isEmpty(otpValue)) {
      newErrors["otp"] = "Otp is required.";
    }

    setErrorMessage(newErrors);

    if (isEmpty(newErrors)) {
      if (!isEqual(pinNumberValue, confirmPinNumberValue)) {
        newErrors["pin_number"] =
          "Pin Number and Confirm Pin Number do not match.";
        newErrors["confirm_pin_number"] =
          "Pin Number and Confirm Pin Number do not match.";
        return;
      }

      onClickCloseSetPinNumberModal();

      const postData = {
        pin_number: pinNumberValue,
        pin_number_confirmation: confirmPinNumberValue,
        otp: otpValue,
        token: otpToken,
      };

      await apiRequest.patchUserPinNumber(
        postData,
        setSetPinNumberLoading,
        setPinNumberSuccessCallback,
        setPinNumberFailureCallback,
      );
    }
  };

  const setPinNumberSuccessCallback = () => {
    setPinNumberValue("");
    setConfirmPinNumberValue("");
    setOtpValue("");
    setIsRequestOtp(false);
  };

  const setPinNumberFailureCallback = () => {
    setTimeout(() => {
      onClickOpenSetPinNumberModal();
    }, 500);
  };

  const onChangePinNumber = (e) => {
    if (size(e.target.value) <= 6) {
      setPinNumberValue(e.target.value);
    }
  };

  const onChangeConfirmPinNumber = (e) => {
    if (size(e.target.value) <= 6) {
      setConfirmPinNumberValue(e.target.value);
    }
  };

  const onClickCloseSetPinNumberModal = () => {
    setErrorMessage([]);

    Helper.documentGetElementById("set_pin_number_desktop_modal").close();
  };

  const onClickOpenSetPinNumberModal = () => {
    Helper.documentGetElementById("set_pin_number_desktop_modal").showModal();
  };

  const onClickGenerateOtp = async () => {
    const postData = {
      case: "reset_pin_number",
      destination: userPhoneNumber,
      type: userType,
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );

    setIsRequestOtp(true);
  };

  const otpRequestSuccess = (res) => {
    setOtpToken(get(res, ["token"], ""));
    setIsResendEnabled(false);
  };

  const onChangeOtpValue = (e) => {
    if (size(e.target.value) <= 6) {
      setOtpValue(e.target.value);
    }
  };

  return (
    <div className="sticky top-4">
      {!isEmpty(userData) && !isBackOffice ? (
        <FeatureComponent
          title="My Property"
          icon={Images.homeIconActive}
          pb={3}
          onClick={() => {
            return router.push(isTenant ? "/user/my-property" : "/user/owner");
          }}
          imageWidth={18}
        />
      ) : (
        false
      )}

      <FeatureComponent
        title="My Account"
        icon={Images.accountIconActive}
        pb={3}
        onClick={() => {
          return router.push("/user/account");
        }}
        imageWidth={16}
      />

      {!isEmpty(userData) && (isTenant || isBackOffice) ? (
        <FeatureComponent
          title="Help Center"
          icon={Images.helpCenterIconActive}
          pb={3}
          onClick={() => {
            if (isTenant) {
              return router.push("/user/help-center");
            } else if (isBackOffice) {
              return router.push("/agency/help-center");
            }
          }}
          imageWidth={18}
        />
      ) : (
        false
      )}

      {/*{!isEmpty(userData) && isBackOffice ? (*/}
      {/*  <FeatureComponent*/}
      {/*    title="Help Center"*/}
      {/*    icon={Images.helpCenterIconActive}*/}
      {/*    pb={3}*/}
      {/*    onClick={() => {}}*/}
      {/*    imageWidth={25}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  false*/}
      {/*)}*/}

      {!isEmpty(userData) && !isBackOffice ? (
        <FeatureComponent
          title="My Invoice"
          icon={Images.invoiceIconActive}
          imageWidth={16}
          pb={3}
          onClick={() => {
            return router.push("/user/my-invoice");
          }}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) && !isBackOffice ? (
        <FeatureComponent
          title={"My E-Agreement"}
          icon={Images.agreementIconActive}
          imageWidth={16}
          pb={3}
          onClick={() => {
            return router.push("/user/e-agreement");
          }}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) && isTenant && !isBackOffice ? (
        <FeatureComponent
          title={"My Meter"}
          icon={Images.meterIconActive}
          imageWidth={14}
          pb={3}
          onClick={() => {
            return router.push("/user/my-meter");
          }}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) && !isTenant && !isBackOffice ? (
        <FeatureComponent
          title={"My Report"}
          icon={Images.reportIconActive}
          imageWidth={16}
          pb={3}
          onClick={() => {
            return router.push("/user/owner/my-report");
          }}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) && !isTenant && !isBackOffice ? (
        <FeatureComponent
          title={"RenoXpert"}
          icon={Images.renoExpertIconActive}
          imageWidth={16}
          pb={3}
          onClick={() => {
            return router.push("/user/reno-expert");
          }}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) && !isBackOffice ? (
        <FeatureComponent
          title="Set Pin Number"
          icon={Images.lockIconActive}
          imageWidth={16}
          pb={3}
          onClick={onClickOpenSetPinNumberModal}
        />
      ) : (
        false
      )}

      {!isEmpty(userData) &&
      isBackOffice &&
      (Helper.isMasterAgency(userRole) || Helper.isAgency(userRole)) ? (
        <FeatureComponent
          title="Property Listing"
          icon={Images.listIconActive}
          imageWidth={20}
          pb={3}
          onClick={() => {
            return router.push("/agency/card-listing");
          }}
        />
      ) : (
        false
      )}

      <div className="divider-line"></div>

      {!isEmpty(userData) && !isBackOffice ? (
        <FeatureComponent
          title="Chat"
          icon={Images.chatIconActive}
          imageWidth={18}
          pb={3}
          onClick={() => {
            return router.push(isTenant ? "/user/chat" : "/user/owner/chat");
          }}
        />
      ) : (
        false
      )}

      <FeatureComponent
        title="Terms & Conditions"
        icon={Images.termIconActive}
        imageWidth={18}
        pb={3}
        route={"https://tms.spacify.asia/privacy-policy"}
        target="_blank"
      />

      <div className="divider-line"></div>

      <FeatureComponent
        title="Logout"
        icon={Images.signUpIconActive}
        imageWidth={18}
        pb={3}
        onClick={onClickLogout}
      />

      <div className="divider-line"></div>

      <SetPinNumberModal
        id="set_pin_number_desktop_modal"
        pinNumberValue={pinNumberValue}
        confirmPinNumberValue={confirmPinNumberValue}
        onChangePinNumber={onChangePinNumber}
        onChangeConfirmPinNumber={onChangeConfirmPinNumber}
        errorMessage={errorMessage}
        setPinNumberLoading={setPinNumberLoading}
        onClickCloseSetPinNumberModal={onClickCloseSetPinNumberModal}
        onClickSetPinNumber={onClickSetPinNumber}
        onChangeOtpValue={onChangeOtpValue}
        otpValue={otpValue}
        onClickGenerateOtp={onClickGenerateOtp}
        timeLeft={timeLeft}
        isResendEnabled={isResendEnabled}
        otpRequestLoading={otpRequestLoading}
      />
    </div>
  );
};

export default DesktopNavigationBar;
