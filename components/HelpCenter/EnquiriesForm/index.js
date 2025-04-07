import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { map, get, isEqual } from "lodash";
import CustomText from "@/components/CustomText";
import DividerSection from "@/components/HelpCenter/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";

const EnquiriesForm = ({
  selectNestedHelpCenterSection,
  onClickCheckFeedbackMatters,
  checkFeedbackMatters,
  setPostData,
  onClickSubmit,
}) => {
  const formList = [
    { name: "Suggestion", value: Constant.SUGGESTION },
    { name: "Review", value: Constant.REVIEW },
    { name: "Complaint", value: Constant.COMPLAINT },
  ];

  const renderFormTitle = (value) => {
    switch (value) {
      case Constant.ENQUIRY:
        return (
          <DividerSection
            title={"Describe Your Enquiry"}
            subtitle={"Tell Us How We Can Assist You"}
          />
        );
      case Constant.FEEDBACK:
        return (
          <DividerSection
            title={"Your Feedback Matters"}
            subtitle={"Share Your Thoughts With Us"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderFormTitle(selectNestedHelpCenterSection)}

      {Constant.FEEDBACK === selectNestedHelpCenterSection ? (
        <div className="flex items-center justify-center gap-4 pb-4">
          {map(formList, (item, index) => {
            const name = get(item, ["name"], "");
            const value = get(item, ["value"], "");

            return (
              <div className="flex gap-2 items-center" key={index}>
                <CustomImage
                  className="cursor-pointer"
                  src={
                    isEqual(checkFeedbackMatters, value)
                      ? Images.checkIconAqua
                      : Images.uncheckIconWhite
                  }
                  imageStyle={{ width: 20, height: 20 }}
                  onClick={() => onClickCheckFeedbackMatters(value)}
                />
                <CustomText textClassName="text-xs">{name}</CustomText>
              </div>
            );
          })}
        </div>
      ) : (
        false
      )}

      <BookingTextArea
        required
        title={"Describe The Issue"}
        bgColor="bg-white border border-disable border-solid"
        className="pb-2"
        placeholder="Enter your message"
        onChange={(e) => {
          setPostData((prevState) => {
            const { request_type } = prevState;

            return {
              ...prevState,
              ...{
                [`${request_type === 1 ? "description" : "issues_description"}`]:
                  e.target.value,
              },
            };
          });
        }}
      />

      <div className="grid grid-cols-2 gap-2">
        <CustomButton
          buttonClassName="btn-primary-outline"
          buttonText={"Cancel"}
        />

        <CustomButton
          buttonClassName="btn-primary"
          buttonText={"Submit"}
          onClick={onClickSubmit}
        />
      </div>
    </div>
  );
};

export default EnquiriesForm;
