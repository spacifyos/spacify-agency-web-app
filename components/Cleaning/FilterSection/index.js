import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";

const dateRangeOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const FilterSection = ({
  propertyOption,
  onChangePropertyValue,
  propertyValue,
  selectedDateRange,
  onChangeDateRange,
  onClickReset,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Date range pills */}
      <div className="flex items-center gap-2">
        {dateRangeOptions.map((option) => (
          <CustomButton
            key={option.value}
            buttonText={option.label}
            buttonClassName={`btn-sm flex-1 ${selectedDateRange === option.value ? "btn-primary" : "btn-white"}`}
            textClassName="text-xs"
            onClick={() => onChangeDateRange(option.value)}
          />
        ))}
      </div>

      {/* Property filter + Reset */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            placeholder={"Property"}
            optionList={propertyOption}
            onChange={onChangePropertyValue}
            value={propertyValue}
          />
        </div>
        <CustomButton
          buttonClassName="btn-primary-outline h-10 shrink-0 px-4"
          buttonText="Reset"
          textClassName="text-sm"
          onClick={onClickReset}
        />
      </div>
    </div>
  );
};

export default FilterSection;
