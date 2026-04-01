import CustomText from "@/components/CustomText";
import { isEqual, isEmpty } from "lodash";
import SvgIcon from "@/components/SvgIcon";

const BookingDateInput = ({
  className = "",
  placeholder,
  errorMessage,
  title,
  name,
  inputClassName,
  onChange,
  disabled = false,
  bgColor = "bg-primary-background",
  required,
  type = "date",
  inputStyle,
  ...props
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <div className="flex items-center">
        {required ? (
          <CustomText textClassName="error-message pr-1">*</CustomText>
        ) : (
          false
        )}
        <CustomText textClassName="input-title">{title}</CustomText>
      </div>

      <div
        className={`flex items-center gap-2 booking-input relative border border-disable border-solid ${bgColor}`}
        style={inputStyle}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={`${bgColor} ${inputClassName} resize-input-icon`}
          name={name}
          onChange={onChange}
          disabled={disabled}
          title={title}
          {...props}
        />

        {isEqual(type, "date") ? (
          <SvgIcon
            name="calendar"
            color="black"
            size={isEqual(type, "month") ? 30 : 20}
          />
        ) : (
          <SvgIcon
            name="clock"
            color="black"
            size={isEqual(type, "month") ? 30 : 20}
          />
        )}
      </div>
      {isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingDateInput;
