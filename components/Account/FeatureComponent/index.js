import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const FeatureComponent = ({
  icon,
  title,
  pb,
  imageWidth = 30,
  imageHeight = 30,
  onClick,
  route,
  target = "_self",
}) => {
  return isEmpty(route) ? (
    <div
      className={`flex justify-between items-center cursor-pointer pb-${pb}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className="bg-white global-box-shadow global-border-radius p-2 mr-3 flex justify-center items-center"
          style={{ width: 46, height: 46 }}
        >
          <CustomImage
            src={icon}
            imageStyle={{ width: imageWidth, height: imageHeight }}
          />
        </div>
        <CustomText textClassName="xl:text-sm lg:text-sm md:text-xs text-xs">{title}</CustomText>
      </div>

      <CustomImage src={Images.rightIconBlack} className="w-2" />
    </div>
  ) : (
    <a
      target={target}
      href={route}
      className={`flex justify-between items-center cursor-pointer pb-${pb}`}
    >
      <div className="flex items-center pr-2">
        <div
          className="bg-white global-box-shadow global-border-radius p-2 mr-3 flex justify-center items-center"
          style={{ width: 46, height: 46 }}
        >
          <CustomImage
            src={icon}
            imageStyle={{ width: imageWidth, height: imageHeight }}
          />
        </div>
        <CustomText textClassName="xl:text-sm lg:text-sm md:text-xs text-xs">{title}</CustomText>
      </div>

      <CustomImage src={Images.rightIconBlack} className="w-2" />
    </a>
  );
};

export default FeatureComponent;
