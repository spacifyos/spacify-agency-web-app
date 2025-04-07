import { isEqual } from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const CategoryCard = ({
  selectedValue,
  value,
  icon,
  iconActive,
  onClickChangeSection,
  btnText,
  btnDescription,
  subType,
}) => {
  return (
    <div className="col-span-2 pb-4">
      <div className=" flex flex-col justify-center items-center">
        <div
          className={`${isEqual(selectedValue, value) ? "bg-primary" : "bg-primary-background"} p-3 mb-2 cursor-pointer`}
          style={{ borderRadius: 100 }}
          onClick={() => onClickChangeSection(value, subType)}
        >
          <CustomImage
            className="w-6"
            src={`${isEqual(selectedValue, value) ? icon : iconActive}`}
          />
        </div>

        <CustomText textClassName="font-bold text-xs">{btnText}</CustomText>
        <CustomText textClassName="text-disable text-xs text-center">
          {btnDescription}
        </CustomText>
      </div>
    </div>
  );
};

export default CategoryCard;
