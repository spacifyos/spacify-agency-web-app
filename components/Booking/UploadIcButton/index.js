import _ from "lodash";
import SvgIcon from "@/components/SvgIcon";
import CustomText from "@/components/CustomText";

const UploadIcButton = ({
  onClickSelectImage,
  onChangeImage,
  buttonClassName,
  iconName,
  iconColor,
  iconSize = 15,
  buttonText,
  name,
  textClassName,
}) => {
  return (
    <div className={`btn mt-1  ${buttonClassName}`} onClick={onClickSelectImage}>
      <input
        type="file"
        id={name}
        name={name}
        style={{ display: "none" }}
        onChange={onChangeImage}
        accept="image/*"
      />

      <CustomText textClassName={textClassName}>{buttonText}</CustomText>

      {!_.isEmpty(iconName) ? (
        <SvgIcon name={iconName} color={iconColor} size={iconSize} />
      ) : (
        false
      )}
    </div>
  );
};

export default UploadIcButton;
