import DividerSection from "@/components/HelpCenter/DividerSection";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import moment from "moment";
import BookingDateInput from "@/components/Booking/BookingDateInput";
import { isEqual } from "lodash";
import CustomText from "@/components/CustomText";

const AuthorizationComponent = ({ onClickToRequestOverview, setPostData }) => {
  return (
    <div>
      <div className={`flex flex-col justify-center items-center`}>
        <div className="flex flex-col pb-4">
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-2"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-3"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-3"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-2"></div>
        </div>
        <CustomText textClassName="second-section-title mb-2">
          Authorization & Availability
        </CustomText>

        <div className="global-border-radius bg-primary-background global-box-shadow p-4 mb-4">
            <CustomText textClassName="text-xs text-justify">
                Upon submitting this request, I grant consent for the maintenance team
                to enter my room if required to carry out necessary repairs or
                inspections. I understand that entry will be conducted professionally
                and only for the purpose of resolving the reported issue.
            </CustomText>
        </div>
      </div>

      {/*<BookingSelect*/}
      {/*  disabled={false}*/}
      {/*  title={"Can Our Technician Enter When You're Not There?"}*/}
      {/*  placeholder="Select Yes Or No"*/}
      {/*  lists={[*/}
      {/*    { label: "Yes", value: "true" },*/}
      {/*    { label: "No", value: "false" },*/}
      {/*  ]}*/}
      {/*  className="pb-2"*/}
      {/*  bgColor="bg-white border border-disable border-solid"*/}
      {/*  onChange={(e) => {*/}
      {/*    setPostData((prevState) => {*/}
      {/*      return {*/}
      {/*        ...prevState,*/}
      {/*        is_allowed_entry: isEqual(e.target.value, "true") ? true : false,*/}
      {/*      };*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<BookingDateInput*/}
      {/*  title="Date"*/}
      {/*  className="pb-2 bg-white"*/}
      {/*  bgColor="bg-white"*/}
      {/*  onChange={(e) => {*/}
      {/*    setPostData((prevState) => {*/}
      {/*      return {*/}
      {/*        ...prevState,*/}
      {/*        available_date: moment(e.target.value).format("YYYY-MM-DD"),*/}
      {/*      };*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<div className="flex gap-2 pb-2">*/}
      {/*  <BookingDateInput*/}
      {/*    title="Start Time"*/}
      {/*    type="time"*/}
      {/*    bgColor="bg-white"*/}
      {/*    onChange={(e) => {*/}
      {/*      setPostData((prevState) => {*/}
      {/*        return {*/}
      {/*          ...prevState,*/}
      {/*          available_start_time: e.target.value,*/}
      {/*        };*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <BookingDateInput*/}
      {/*    title="End Time"*/}
      {/*    type="time"*/}
      {/*    bgColor="bg-white"*/}
      {/*    onChange={(e) => {*/}
      {/*      setPostData((prevState) => {*/}
      {/*        return {*/}
      {/*          ...prevState,*/}
      {/*          available_end_time: e.target.value,*/}
      {/*        };*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}

      <div className="flex justify-center items-center pt-2">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="btn-primary"
          buttonText={"Create A Request"}
          onClick={onClickToRequestOverview}
        />
      </div>
    </div>
  );
};

export default AuthorizationComponent;
