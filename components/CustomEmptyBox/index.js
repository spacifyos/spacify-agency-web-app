import SvgIcon from "@/components/SvgIcon";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({
  textColor = "#545454",
  emptyTitle = "No data found",
  emptyDesc = "No data available now try again later.",
}) => {
  return (
    <div className={"flex flex-col items-center justify-center px-4"}>
      <div className={"pb-2"}>
        <SvgIcon
          name="questionMark"
          color={textColor === "#FFFFFF" ? "white" : "disable"}
          size={48}
          strokeWidth={1}
        />
      </div>
      <CustomText
        textClassName={`text-sm font-semibold pb-1`}
        styles={{ color: textColor }}
      >
        {emptyTitle}
      </CustomText>
      <CustomText
        textClassName={`text-xs`}
        styles={{ color: textColor }}
      >
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
