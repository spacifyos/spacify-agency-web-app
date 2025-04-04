import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";

const UploadIcButton = ({
  onClickSelectImage,
  onChangeImage,
  buttonClassName,
  icon,
  buttonText,
  name,
  imageWidth = 20,
  imageHeight = 20,
  imageStyle,
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

      {!_.isEmpty(icon) ? (
        <CustomImage
          src={icon}
          width={imageWidth}
          height={imageHeight}
          imageStyle={imageStyle}
        />
      ) : (
        false
      )}
    </div>
  );
};

export default UploadIcButton;
