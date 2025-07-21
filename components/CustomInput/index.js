import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
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
    <label className={`global-border-radius flex flex-col ${className}`}>
      <div className="flex">
        {required ? (
          <CustomText textClassName="text-error pr-1">*</CustomText>
        ) : null}
        {!isEmpty(label) ? (
          <CustomText textClassName={`text-xxs pb-1 ${labelClassName}`}>
            {label}
          </CustomText>
        ) : null}
      </div>

      <div
        className={`default-input input-bordered input flex items-center gap-2 text-sm ${hideShadow ? "" : "global-box-shadow"}`}
      >
        {!isEmpty(leftIcon) ? leftIcon : false}
        <input
          ref={inputRef}
          type={inputType}
          className={`input-primary grow bg-white ${inputClassName}`}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          {...props}
        />
        {!isEmpty(rightIcon) ? (
          <CustomImage
            className="cursor-pointer"
            src={rightIcon}
            imageStyle={{ width: 20, height: 20 }}
            onClick={onClickRightIcon}
          />
        ) : null}
      </div>
    </label>
  );
};

export default CustomInput;
