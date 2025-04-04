import BookingInput from "@/components/Booking/BookingInput";
import _ from "lodash";
import CustomButton from "@/components/CustomButton";
import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const SetPinNumberModal = ({
  pinNumberValue,
  confirmPinNumberValue,
  onChangePinNumber,
  onChangeConfirmPinNumber,
  errorMessage,
  setPinNumberLoading,
  onClickCloseSetPinNumberModal,
  onClickSetPinNumber,
  onChangeOtpValue,
  otpValue,
  onClickGenerateOtp,
  timeLeft,
  isResendEnabled,
  otpRequestLoading,
  id,
}) => {
  return (
    <DesktopModal id={id} disableClose>
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Set Pin Number
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                src={Images.closeIconBlack}
                imageStyle={{ width: 18, height: 18 }}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <BookingInput
          required
          title="Pin Number"
          placeholder="Pin Number"
          bgColor="bg-white border border-disable"
          className="pb-3"
          inputClassName="border-none"
          value={pinNumberValue}
          onChange={onChangePinNumber}
          type="password"
          errorMessage={_.get(errorMessage, ["pin_number"], "")}
        />

        <BookingInput
          required
          title="Confirm Pin Number"
          placeholder={"Confirm Pin Number"}
          bgColor="bg-white border border-disable"
          className="pb-3"
          inputClassName="border-none"
          value={confirmPinNumberValue}
          onChange={onChangeConfirmPinNumber}
          type="password"
          errorMessage={_.get(errorMessage, ["confirm_pin_number"], "")}
        />

        <div className="grid grid-cols-2 flex items-end gap-4">
          <BookingInput
            required
            title="Otp Number"
            placeholder={"Otp Number"}
            bgColor="bg-white border border-disable"
            className="pb-3"
            inputClassName="border-none"
            value={otpValue}
            onChange={onChangeOtpValue}
            type="number"
            errorMessage={_.get(errorMessage, ["otp"], "")}
          />

          <CustomButton
            buttonText={
              isResendEnabled
                ? "Request Otp"
                : `Resend OTP in ${timeLeft} seconds`
            }
            textClassName="text-xs"
            buttonClassName={`${isResendEnabled ? "btn-primary" : "btn-warning"} mb-4`}
            onClick={onClickGenerateOtp}
            loading={otpRequestLoading}
            disable={otpRequestLoading || !isResendEnabled}
            buttonStyles={{ minHeight: 40, height: 40 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <CustomButton
            buttonClassName={`${setPinNumberLoading ? "btn-disable" : "btn-primary-outline"}`}
            buttonText="Cancel"
            disable={setPinNumberLoading}
            onClick={onClickCloseSetPinNumberModal}
          />

          <CustomButton
            buttonClassName={`${setPinNumberLoading ? "btn-disable" : "btn-primary"}`}
            buttonText="Submit"
            onClick={onClickSetPinNumber}
            loading={setPinNumberLoading}
            disable={setPinNumberLoading}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default SetPinNumberModal;
