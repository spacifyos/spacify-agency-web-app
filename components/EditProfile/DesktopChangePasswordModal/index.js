import DesktopModal from "@/components/DesktopModal";
import BookingInput from "@/components/Booking/BookingInput";
import { get } from "lodash";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const DesktopChangePasswordModal = ({
  currentPasswordValue,
  onChangeCurrentPassword,
  errorMessage,
  passwordValue,
  onChangePassword,
  confirmPasswordValue,
  onChangeConfirmPassword,
  changePasswordLoading,
  onClickCloseChangePasswordModal,
  onClickChangePassword,
}) => {
  return (
    <DesktopModal id="desktop_change_password_modal">
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Change Password
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.closeIconBlack}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <BookingInput
          required
          title="Current Password"
          placeholder={"Current Password"}
          bgColor="bg-white border border-disable"
          inputClassName="border-none"
          className="pb-3"
          value={currentPasswordValue}
          onChange={onChangeCurrentPassword}
          type="password"
          errorMessage={get(errorMessage, ["current_password"], "")}
        />

        <BookingInput
          required
          title={"Password"}
          placeholder={"Password"}
          bgColor="bg-white border border-disable"
          inputClassName="border-none"
          className="pb-3"
          value={passwordValue}
          onChange={onChangePassword}
          type="password"
          errorMessage={get(errorMessage, ["password"], "")}
        />

        <BookingInput
          required
          title={"Confirm Password"}
          placeholder={"Confirm Password"}
          bgColor="bg-white border border-disable"
          inputClassName="border-none"
          className="pb-3"
          value={confirmPasswordValue}
          onChange={onChangeConfirmPassword}
          type="password"
          errorMessage={get(errorMessage, ["confirm_password"], "")}
        />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <CustomButton
            buttonClassName={`${changePasswordLoading ? "btn-disable" : "btn-primary-outline"}`}
            buttonText={"Cancel"}
            disable={changePasswordLoading}
            onClick={() =>
              onClickCloseChangePasswordModal("desktop_change_password_modal")
            }
          />

          <CustomButton
            buttonClassName={`${changePasswordLoading ? "btn-disable" : "btn-primary"}`}
            buttonText={"Submit"}
            onClick={onClickChangePassword}
            loading={changePasswordLoading}
            disable={changePasswordLoading}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopChangePasswordModal;
