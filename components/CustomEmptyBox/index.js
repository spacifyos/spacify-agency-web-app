import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { includes } from "lodash";

const CustomEmptyBox = ({
  textColor = "#545454",
  emptyImage = Images.questionMarkIconDisable,
  emptyTitle = "No data found",
  emptyDesc = "No data available now try again later.",
}) => {
  return (
    <div className={"flex justify-center items-center flex-col px-4"}>
      <div className={"pb-2"}>
        <CustomImage
          src={
            includes(textColor, "FFFFFF")
              ? Images.questionMarkIconWhite
              : emptyImage
          }
          className="xl:w-18 lg:w-18 md:w-18 sm:w-14 w-12"
        />
      </div>
      <CustomText
        textClassName={`xl:text-base lg:text-base md:text-base sm:text-sm text-xs font-semibold pb-1`}
        styles={{ color: textColor }}
      >
        {emptyTitle}
      </CustomText>
      <CustomText
        textClassName={`xl:text-sm lg:text-sm md:text-sm sm:text-sm text-xxs`}
        styles={{ color: textColor }}
      >
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
