import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { isEmpty } from "lodash";

const CustomButton = ({
  buttonClassName,
  buttonText,
  buttonStyles,
  loading,
  onClick,
  disable,
  textClassName,
  icon = "",
  imageStyle,
  imageWidth = 20,
  imageHeight = 20,
  reverse = false,
  loadingColor = "text-white",
}) => {
  return (
    <button
      className={`btn ${disable || loading ? "no-animation" : ""} ${reverse ? "flex-row-reverse" : "flex"} ${buttonClassName} cursor-pointer`}
      style={{ ...buttonStyles }}
      onClick={disable ? () => {} : onClick}
    >
      {loading ? (
        <span className={`loading loading-spinner ${loadingColor}`}></span>
      ) : !isEmpty(buttonText) ? (
        <p className={textClassName}>{buttonText}</p>
      ) : (
        false
      )}

      {!isEmpty(icon) ? (
        <CustomImage
          src={icon}
          imageStyle={{ width: imageWidth, height: imageHeight, ...imageStyle }}
        />
      ) : (
        false
      )}
    </button>
  );
};

export default CustomButton;
