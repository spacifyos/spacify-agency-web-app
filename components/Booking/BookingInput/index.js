import CustomText from "@/components/CustomText";
import _, { isEmpty } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const BookingInput = ({
  className = "",
  placeholder,
  errorMessage,
  title,
  name,
  inputClassName,
  rightIcon = "",
  type = "text",
  onChange,
  disabled = false,
  bgColor = "bg-primary-background",
  required,
  ...props
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      {isEmpty(title) ? (
        false
      ) : (
        <div className="flex items-center" style={{ height: 19 }}>
          {required ? (
            <CustomText textClassName="error-message pr-1">*</CustomText>
          ) : (
            false
          )}
          <CustomText textClassName="input-title">{title}</CustomText>
        </div>
      )}

      <div className={`flex items-center gap-2 booking-input ${bgColor}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${bgColor} ${inputClassName}`}
          name={name}
          onChange={onChange}
          disabled={disabled}
          title={title}
          {...props}
        />
        {!_.isEmpty(rightIcon) ? (
          <CustomImage src={rightIcon} height={20} width={20} />
        ) : (
          false
        )}
      </div>
      {_.isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingInput;
