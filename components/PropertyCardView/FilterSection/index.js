import CustomSelect from "@/components/CustomSelect";
import SvgIcon from "@/components/SvgIcon";
import CustomButton from "@/components/CustomButton";

const FilterSection = ({
  isOpenFilter,
  setIsOpenFilter,
  propertyOption,
  onChangePropertyValue,
  propertyValue,
  unitOption,
  onChangeUnitValue,
  unitValue,
  bedroomOption,
  onChangeBedroomValue,
  bedroomValue,
  bathroomOption,
  onChangeBathroomValue,
  bathroomValue,
  onChangeStatusValue,
  statusValue,
  onClickReset,
  onChangeGenderValue,
  genderValue,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            className="w-full"
            placeholder={"Property"}
            optionList={propertyOption}
            onChange={onChangePropertyValue}
            value={propertyValue}
          />
        </div>

        <div className="flex-1">
          <CustomSelect
            className="w-full"
            placeholder={"Unit"}
            optionList={unitOption}
            onChange={onChangeUnitValue}
            value={unitValue}
          />
        </div>

        <div className="flex-1">
          <CustomSelect
            className="w-full"
            placeholder={"Gender"}
            optionList={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Mixed", value: "mixed" },
            ]}
            onChange={onChangeGenderValue}
            value={genderValue}
          />
        </div>

        <div
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <SvgIcon name="filter" color="black" size={20} />
        </div>
      </div>

      {isOpenFilter ? (
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <CustomSelect
              className="w-full"
              placeholder={"Bedroom"}
              optionList={bedroomOption}
              onChange={onChangeBedroomValue}
              value={bedroomValue}
            />
          </div>

          <div className="flex-1">
            <CustomSelect
              className="w-full"
              placeholder={"Bathroom"}
              optionList={bathroomOption}
              onChange={onChangeBathroomValue}
              value={bathroomValue}
            />
          </div>

          <div className="flex-1">
            <CustomSelect
              className="w-full"
              placeholder={"Status"}
              optionList={[
                { label: "Available", value: true },
                { label: "Not Available", value: false },
              ]}
              onChange={onChangeStatusValue}
              value={statusValue}
            />
          </div>

          <CustomButton
            buttonClassName="btn-primary shrink-0"
            buttonText="Reset"
            onClick={onClickReset}
          />
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default FilterSection;
