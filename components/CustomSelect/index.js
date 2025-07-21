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
      className={`default-select form-control w-full ${className}`}
    >
      {!isEmpty(label) ? (
        <CustomText textClassName="text-xxs pb-1">{label}</CustomText>
      ) : (
        ""
      )}
      <select
        aria-label={isEmpty(label) ? placeholder : label}
        className={`select-bordered select w-full text-sm ${selectClassName} ${hideShadow ? "" : "global-box-shadow"}`}
        style={selectStyles}
        onChange={onChange}
        value={value}
        required
      >
        {!hideDefaultOption && <option value=" ">{placeholder}</option>}

        {map(optionList, (item, index) => {
          const name = get(item, ["name"], "");
          const label = get(item, ["label"], "");
          const value = get(item, ["value"], "");
          const id = get(item, ["id"], "");
          const number = get(item, ["number"], "");

          return (
            <option key={index} value={isEmpty(value) ? id : value}>
              {isEmpty(number) ? (isEmpty(name) ? label : name) : number}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
