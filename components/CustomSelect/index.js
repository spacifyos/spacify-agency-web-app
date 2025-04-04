import { isEmpty, map, get } from "lodash";
import CustomText from "@/components/CustomText";

const CustomSelect = ({
  placeholder,
  optionList,
  label,
  className,
  onChange,
  styles,
  value,
  hideDefaultOption = false,
  selectClassName = "",
  selectStyles,
  hideShadow = false,
}) => {
  return (
    <label
      style={styles}
      className={`default-select form-control w-full ${hideShadow ? "" : "global-box-shadow"} ${className}`}
    >
      {!isEmpty(label) ? <CustomText>{label}</CustomText> : ""}
      <select
        aria-label={isEmpty(label) ? placeholder : label}
        className={`select-bordered select w-full text-sm ${selectClassName}`}
        style={selectStyles}
        onChange={onChange}
        value={value} // This controls the selected option
        required
      >
        {!hideDefaultOption && <option value=" ">{placeholder}</option>}

        {map(optionList, (item, index) => {
          const name = get(item, ["name"], "");
          const label = get(item, ["label"], "");
          const value = get(item, ["value"], "");

          return (
            <option key={index} value={value}>
              {isEmpty(name) ? label : name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
