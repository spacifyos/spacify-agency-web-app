import CustomText from "@/components/CustomText";
import { map, get, isEmpty } from "lodash";
import SvgIcon from "@/components/SvgIcon";

const BookingSelect = ({
  className,
  placeholder,
  errorMessage,
  title,
  lists,
  name,
  rightIcon,
  required,
  bgColor = "bg-primary-background",
  disabled = true,
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

      <div
        className={`${bgColor} booking-select-container flex justify-between h-10`}
      >
        <select className="booking-select" name={name} title={title} {...props}>
          <option disabled={disabled ? true : false} value="">
            {placeholder}
          </option>
          {map(lists, (list) => {
            const label = get(list, ["label"], "");
            const value = get(list, ["value"], "");

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>

        <SvgIcon name="down" color="black" size={10} />
      </div>
      {isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingSelect;
