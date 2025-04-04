import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import { isEmpty, isEqual, map } from "lodash";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomButton from "@/components/CustomButton";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import UploadIcButton from "@/components/Booking/UploadIcButton";
import Helper from "@/src/utils/Helper";
import ImageUploading from "@/components/Booking/ImageUploading";

const DesktopFormSection = ({
  errorMessage,
  idTypeOption,
  defaultOption,
  onChangeIdType,
  idType,
  raceOption,
  genderOption,
  phonePrefix,
  nationalityOption,
  occupationOption,
  countryOption,
  stateOption,
  otpValue,
  onChangeOtpValue,
  isResendEnabled,
  timeLeft,
  onClickGenerateOtp,
  otpRequestLoading,
  frontIcUploading,
  icFrontBase64,
  onChangeFrontICImage,
  backIcUploading,
  icBackBase64,
  onChangeBackICImage,
  isReadAgree,
  onClickReadAgree,
  emergencyContactNumber,
  onClickBooking,
  setReferralCodeValue,
  referralCodeValue,
  formRef,
}) => {
  return (
    <div className="xl:px-5 lg:px-5 md:px-5 sm:px-0 px-0 xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-4 col-span-4 overflow-hidden">
      <form ref={formRef}>
        <div className="grid grid-cols-6 gap-2">
          <CustomText textClassName="col-span-6 font-bold xl:text-lg lg:text-lg md:text-base sm:text-base text-base text-primary">
            Please Fill in The Form
          </CustomText>

          <CustomText textClassName="col-span-6 font-bold text-sm">
            Basic Information
          </CustomText>
          <BookingInput
            className="col-span-6"
            placeholder="Name"
            name="applicant_name"
            title="Name"
            errorMessage={errorMessage.applicant_name}
            required
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select ID type"
            title="ID Type"
            lists={isEmpty(idTypeOption) ? defaultOption : idTypeOption}
            name="applicant_id_type"
            errorMessage={errorMessage.applicant_id_type}
            onChange={onChangeIdType}
            required
          />

          <BookingInput
            className="col-span-4"
            type={"text"}
            placeholder={
              isEqual(idType, "nric")
                ? "XXXXXXXXXXXX"
                : isEqual(idType, "passport")
                  ? "AXXXXXXXX"
                  : "ID Number"
            }
            title={"ID Number"}
            name="applicant_id_value"
            errorMessage={errorMessage.applicant_id_value}
            maxLength={
              isEqual(idType, "nric")
                ? 12
                : isEqual(idType, "passport")
                  ? 14
                  : 20
            }
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Race"
            title="Race"
            name="applicant_race"
            lists={isEmpty(raceOption) ? defaultOption : raceOption}
            errorMessage={errorMessage.applicant_race}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Gender"
            title="Gender"
            lists={isEmpty(genderOption) ? defaultOption : genderOption}
            name="applicant_gender"
            errorMessage={errorMessage.applicant_gender}
            required
          />

          <BookingInput
            className="col-span-6"
            placeholder="Email"
            title="Email"
            name="applicant_email"
            errorMessage={errorMessage.applicant_email}
            required
          />

          <BookingSelect
            className="col-span-2"
            placeholder="Select Area Code"
            title="Area Code"
            lists={isEmpty(phonePrefix) ? defaultOption : phonePrefix}
            name="applicant_area_code"
            errorMessage={errorMessage.applicant_area_code}
            required
          />

          <BookingInput
            className="col-span-4"
            type="number"
            placeholder="Phone Number"
            title="Phone Number"
            name="applicant_phone_number"
            errorMessage={errorMessage.applicant_phone_number}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Nationality"
            title="Nationality"
            lists={
              isEmpty(nationalityOption) ? defaultOption : nationalityOption
            }
            name="applicant_nationality"
            errorMessage={errorMessage.applicant_nationality}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Occupation"
            title="Occupation"
            lists={isEmpty(occupationOption) ? defaultOption : occupationOption}
            name="occupation_type"
            errorMessage={errorMessage.occupation_type}
            required
          />

          <BookingInput
            className="col-span-6"
            placeholder="Company Name / College Name"
            title="Company Name / College Name"
            name="institution_name"
            errorMessage={errorMessage.institution_name}
            required
          />
        </div>

        <div className="pt-8 grid grid-cols-6 gap-2">
          <CustomText textClassName="col-span-6 font-bold text-sm">
            Address Information
          </CustomText>

          <BookingInput
            className="col-span-6"
            placeholder="Your Address"
            title="Your Address"
            name="line"
            errorMessage={errorMessage.line}
            required
          />

          <BookingInput
            className="col-span-3"
            placeholder="City"
            title="City"
            name="city"
            errorMessage={errorMessage.city}
            required
          />

          <BookingInput
            className="col-span-3"
            placeholder="Postcode"
            title="PostCode"
            name="postcode"
            errorMessage={errorMessage.postcode}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select Country"
            title="Country"
            lists={isEmpty(countryOption) ? defaultOption : countryOption}
            name="country_code"
            errorMessage={errorMessage.country_code}
            required
          />

          <BookingSelect
            className="col-span-3"
            placeholder="Select State"
            title="State"
            lists={isEmpty(stateOption) ? defaultOption : stateOption}
            name="state_code"
            errorMessage={errorMessage.state_code}
            required
          />
        </div>

        <div className="pt-8 grid grid-cols-6 gap-2">
          <CustomText textClassName="col-span-6 font-bold text-sm">
            Emergency Contact Information
          </CustomText>

          {map(emergencyContactNumber, (item, index) => {
            return (
              <div
                className="col-span-6 grid grid-cols-6 gap-2 pt-2"
                key={index}
              >
                {/*<CustomText textClassName="font-bold col-span-3">*/}
                {/*  {`Contact ${index + 1} ${index + 1 == 2 ? "(Optional)" : ""}`}*/}
                {/*</CustomText>*/}

                {/*{index === 0 && size(emergencyContactNumber) !== 1 ? (*/}
                {/*  <div*/}
                {/*    className="col-span-3 cursor-pointer flex justify-end"*/}
                {/*    onClick={() => onClickRemoveContact(index)}*/}
                {/*  >*/}
                {/*    <CustomText textClassName="text-error">Remove</CustomText>*/}
                {/*  </div>*/}
                {/*) : (*/}
                {/*  false*/}
                {/*)}*/}

                <BookingInput
                  className="col-span-6"
                  placeholder="your Name"
                  title="Your Name"
                  name={`emergency_contacts_name_${index + 1}`}
                  errorMessage={
                    errorMessage[`emergency_contacts_name_${index + 1}`]
                  }
                  required={index === 0}
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Enter Relationship"
                  title="Enter Relationship"
                  name={`emergency_contacts_relationship_${index + 1}`}
                  errorMessage={
                    errorMessage[`emergency_contacts_relationship_${index + 1}`]
                  }
                  required={index === 0}
                />

                <BookingSelect
                  className="col-span-2"
                  placeholder="Select Area Code"
                  title="Area Code"
                  lists={isEmpty(phonePrefix) ? defaultOption : phonePrefix}
                  name={`emergency_contacts_phone_prefix_${index + 1}`}
                  errorMessage={
                    errorMessage[`emergency_contacts_phone_prefix_${index + 1}`]
                  }
                  required={index === 0}
                />

                <BookingInput
                  className="col-span-4"
                  type="number"
                  placeholder="Phone Number"
                  title="Phone Number"
                  name={`emergency_contacts_phone_suffix_${index + 1}`}
                  errorMessage={
                    errorMessage[`emergency_contacts_phone_suffix_${index + 1}`]
                  }
                  required={index === 0}
                />

                <BookingInput
                  className="col-span-6"
                  placeholder="Your Email"
                  title="Your Email"
                  name={`emergency_contacts_email_${index + 1}`}
                  errorMessage={
                    errorMessage[`emergency_contacts_email_${index + 1}`]
                  }
                  required={index === 0}
                />
              </div>
            );
          })}
        </div>
      </form>

      <div className="pt-8 grid grid-cols-6 gap-2 flex items-end">
        <CustomText textClassName="col-span-6 font-bold text-sm">
          Verification
        </CustomText>

        <BookingInput
          className="col-span-4"
          value={otpValue}
          placeholder="000000"
          onChange={onChangeOtpValue}
          type="number"
          title="Code"
          name="otp"
          errorMessage={errorMessage.otp}
          required
        />

        <CustomButton
          buttonStyles={{ height: 40, minHeight: 40 }}
          buttonText={
            isResendEnabled ? "Send Code" : `Resend OTP in ${timeLeft} seconds`
          }
          buttonClassName={`${isResendEnabled ? "btn-primary-outline" : "btn-disable"} col-span-2 my-1`}
          onClick={onClickGenerateOtp}
          loading={otpRequestLoading}
          loadingColor={otpRequestLoading ? "text-primary" : "text-white"}
          disable={otpRequestLoading || !isResendEnabled}
        />
      </div>

      <div className="grid grid-cols-1 pb-3 pt-2">
        <BookingInput
          bgColor="bg-primary-background"
          className="col-span-1"
          placeholder="Referral Code"
          title="Referral Code (Optional)"
          onChange={(e) => setReferralCodeValue(e.target.value)}
          value={referralCodeValue}
        />
      </div>

      <div className="grid grid-cols-6 gap-2 pt-8">
        <CustomText textClassName="col-span-6 font-bold text-sm">
          Supporting Documents
        </CustomText>

        <div className="col-span-6 pl-1">
          <CustomText textClassName="font-light text-xs">
            1. Please make sure your IC or passport is clear and readable.
          </CustomText>
          <CustomText textClassName="font-light text-xs">
            2. Please avoid flash or glare.
          </CustomText>
        </div>

        <CustomText textClassName="col-span-6 font-light text-black text-sm">
          Example:
        </CustomText>

        <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 flex flex-col items-center">
          <div className="relative" style={{ width: "100%" }}>
            <ImageUploading loading={frontIcUploading} />

            <CustomImage
              src={
                isEmpty(icFrontBase64) ? Images.icFrontSample : icFrontBase64
              }
              imageStyle={{ width: "100%" }}
            />
          </div>

          <UploadIcButton
            name="front_image"
            icon={Images.uploadIconActive}
            buttonText="Front Image"
            imageStyle={{ width: 15 }}
            buttonClassName="btn-primary-outline flex-row-reverse mt-1 w-full"
            onChangeImage={onChangeFrontICImage}
            onClickSelectImage={() =>
              Helper.documentGetElementById("front_image").click()
            }
          />
        </div>

        <div className="xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 flex flex-col items-center">
          <div className="relative" style={{ width: "100%" }}>
            <ImageUploading loading={backIcUploading} />

            <CustomImage
              src={isEmpty(icBackBase64) ? Images.icBackSample : icBackBase64}
              imageStyle={{ width: "100%" }}
            />
          </div>

          <UploadIcButton
            name="back_image"
            icon={Images.uploadIconActive}
            imageStyle={{ width: 15 }}
            buttonText="Back Image"
            buttonClassName="btn-primary-outline flex-row-reverse mt-1 w-full"
            onChangeImage={onChangeBackICImage}
            onClickSelectImage={() =>
              Helper.documentGetElementById("back_image").click()
            }
          />
        </div>
      </div>

      <div className="flex items-start pt-6 pb-2">
        <div style={{ width: 20 }}>
          <CustomImage
            src={isReadAgree ? Images.checkIconAqua : Images.uncheckIconWhite}
            imageStyle={{ width: 20 }}
            onClick={onClickReadAgree}
            className="cursor-pointer"
          />
        </div>

        <CustomText textClassName="pl-3 font-bold text-black text-xs text-justify">
          I understand and agree to give Spacify and CTOS the consent to process
          my personal data as per PDPA Act.
        </CustomText>
      </div>

      <div
        style={{ height: 48 }}
        className="bg-primary p-2 px-4 my-4 flex justify-center items-center cursor-pointer global-border-radius"
        onClick={onClickBooking}
      >
        <CustomText textClassName="text-base font-bold text-white">
          Book Now
        </CustomText>
      </div>

      <div className="grid grid-cols-6">
        <CustomText textClassName="col-span-6 font-light text-xs text-center">
          This site is protected by reCAPTCHA and the Google{" "}
          <span style={{ textDecoration: "underline" }}>Privacy Policy</span>{" "}
          and{" "}
          <span style={{ textDecoration: "underline" }}>Terms of Service</span>{" "}
          apply.
        </CustomText>
      </div>
    </div>
  );
};

export default DesktopFormSection;
