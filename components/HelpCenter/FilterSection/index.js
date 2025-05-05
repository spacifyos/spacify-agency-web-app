import CustomSelect from "@/components/CustomSelect";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
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
    <div className="">
      <div
        className={`grid grid-cols-11 gap-2 sm:grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11`}
      >
        <CustomSelect
          className="col-span-9 sm:col-span-9 md:col-span-4 lg:col-span-4 xl:col-span-4"
          placeholder={"Property"}
          optionList={propertyOption}
          onChange={onChangePropertyValue}
          value={propertyValue}
        />

        <CustomSelect
          className="col-span-3 hidden w-full sm:col-span-3 md:col-span-3 md:block lg:col-span-3 lg:block xl:col-span-3 xl:block"
          placeholder={"Block"}
          optionList={blockOption}
          onChange={onChangeBlockValue}
          value={blockValue}
        />

        <CustomSelect
          className="col-span-3 hidden w-full sm:col-span-3 md:col-span-3 md:block lg:col-span-3 lg:block xl:col-span-3 xl:block"
          placeholder={"Floor"}
          optionList={floorOptions}
          onChange={onChangeFloorValue}
          value={floorValue}
        />

        <div
          className="global-box-shadow global-border-radius col-span-2 flex cursor-pointer items-center justify-center bg-white sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <CustomImage src={Images.filterIconBlack} className="h-6 w-6" />
        </div>
      </div>

      {isOpenFilter ? (
        <div className="grid grid-cols-11 gap-2 pt-2">
          <CustomSelect
            className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-5"
            placeholder={"Unit"}
            optionList={unitOption}
            onChange={onChangeUnitValue}
            value={unitValue}
          />

          <CustomInput
            className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-5"
            placeholder={"Request Date"}
            onChange={onChangeRequestDateValue}
            value={requestDateValue}
            inputType="date"
          />

          <CustomButton
            buttonClassName="btn-primary xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2"
            buttonText="Reset"
            onClick={onClickReset}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilterSection;
