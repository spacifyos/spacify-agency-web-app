import CustomText from "@/components/CustomText";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLabelValue from "@/components/CustomLabelValue";
import BookingSelect from "@/components/Booking/BookingSelect";
const GeneralInformationSection = ({ tenancyOption, setPostData }) => {
  return (
    <div>
      <CustomText textClassName="second-section-title text-primary pb-2">
        General Information
      </CustomText>

      <CustomLabelValue label={"Requester"} value="Joan Lim" />

      <BookingSelect
        required
        title={"Tenancy"}
        placeholder={"Select tenancy"}
        lists={tenancyOption}
        disabled={false}
        bgColor="bg-white border border-disable border-solid"
        className="pb-2"
        onChange={(e) =>
          setPostData((prevState) => {
            return {
              ...prevState,
              ...JSON.parse(e.target.value),
            };
          })
        }
      />
    </div>
  );
};

export default GeneralInformationSection;
