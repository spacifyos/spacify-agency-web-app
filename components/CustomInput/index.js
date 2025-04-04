import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import { useRef } from "react";

const CustomInput = ({
  leftIcon = "",
  rightIcon = "",
  label,
  inputType,
  placeholder,
  className,
  required = false,
  labelClassName,
  autoFocus = false,
  value,
  onChange,
  onClickRightIcon,
  inputClassName,
  hideShadow = false,
  ...props
}) => {
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickRightIcon();
      inputRef.current.blur();
    }
  };

  return (
    <label
      className={`flex flex-col global-border-radius ${hideShadow ? "" : "global-box-shadow"} ${className}`}
    >
      <div className="flex">
        {required ? (
          <CustomText textClassName="text-error pr-1">*</CustomText>
        ) : (
          false
        )}
        {!_.isEmpty(label) ? (
          <CustomText textClassName={`${labelClassName}`}>{label}</CustomText>
        ) : (
          false
        )}
      </div>

      <div
        className={`input input-bordered flex items-center gap-2 default-input`}
      >
        {!_.isEmpty(leftIcon) ? leftIcon : false}
        <input
          ref={inputRef}
          type={inputType}
          className={`grow input-primary bg-white ${inputClassName}`}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          {...props}
        />
        {!_.isEmpty(rightIcon) ? (
          <CustomImage
            className="cursor-pointer"
            src={rightIcon}
            imageStyle={{ width: 20, height: 20 }}
            onClick={onClickRightIcon}
          />
        ) : (
          false
        )}
      </div>
    </label>
  );
};

export default CustomInput;
