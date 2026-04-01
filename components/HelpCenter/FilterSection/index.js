import CustomSelect from "@/components/CustomSelect";
import SvgIcon from "@/components/SvgIcon";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const FilterSection = ({
  isOpenFilter,
  setIsOpenFilter,
  propertyOption,
  onChangePropertyValue,
  propertyValue,
  unitOption,
  onChangeUnitValue,
  unitValue,
  onClickReset,
  blockOption,
  onChangeBlockValue,
  blockValue,
  onChangeFloorValue,
  floorValue,
  floorOptions,
  onChangeRequestDateValue,
  requestDateValue,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            placeholder={"Property"}
            optionList={propertyOption}
            onChange={onChangePropertyValue}
            value={propertyValue}
          />
        </div>

        <div className="hidden flex-1 md:block">
          <CustomSelect
            placeholder={"Block"}
            optionList={blockOption}
            onChange={onChangeBlockValue}
            value={blockValue}
          />
        </div>

        <div className="hidden flex-1 md:block">
          <CustomSelect
            placeholder={"Floor"}
            optionList={floorOptions}
            onChange={onChangeFloorValue}
            value={floorValue}
          />
        </div>

        <button
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:bg-surface-secondary"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <SvgIcon name="filter" color="black" size={20} />
        </button>
      </div>

      {isOpenFilter ? (
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <CustomSelect
              placeholder={"Unit"}
              optionList={unitOption}
              onChange={onChangeUnitValue}
              value={unitValue}
            />
          </div>

          <div className="flex-1">
            <CustomInput
              placeholder={"Request Date"}
              onChange={onChangeRequestDateValue}
              value={requestDateValue}
              inputType="date"
            />
          </div>

          <CustomButton
            buttonClassName="btn-primary-outline h-10 shrink-0 px-4"
            buttonText="Reset"
            textClassName="text-sm"
            onClick={onClickReset}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilterSection;
