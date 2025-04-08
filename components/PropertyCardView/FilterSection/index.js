import CustomSelect from "@/components/CustomSelect";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
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
}) => {
  return (
    <div className="">
      <div
        className={`grid grid-cols-11 gap-2 sm:grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 ${isOpenFilter ? "pb-2" : "pb-7"}`}
      >
        <CustomSelect
          className="col-span-9 sm:col-span-9 md:col-span-5 lg:col-span-5 xl:col-span-5"
          placeholder={"Property"}
          optionList={propertyOption}
          onChange={onChangePropertyValue}
          value={propertyValue}
        />

        <CustomSelect
          className="col-span-5 hidden w-full sm:col-span-5 md:col-span-5 md:block lg:col-span-5 lg:block xl:col-span-5 xl:block"
          placeholder={"Unit"}
          optionList={unitOption}
          onChange={onChangeUnitValue}
          value={unitValue}
        />

        <div
          className="global-box-shadow global-border-radius col-span-2 flex cursor-pointer items-center justify-center bg-white sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <CustomImage src={Images.filterIconBlack} className="h-6 w-6" />
        </div>
      </div>

      {isOpenFilter ? (
        <div className="grid grid-cols-10 gap-2 pb-7 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10">
          <CustomSelect
            className="col-span-5 sm:col-span-5 md:col-span-5 md:hidden lg:col-span-5 lg:hidden xl:col-span-5 xl:hidden"
            placeholder={"Unit"}
            optionList={unitOption}
            onChange={onChangeUnitValue}
            value={unitValue}
          />

          <CustomSelect
            className="col-span-5 sm:col-span-5 md:col-span-3 lg:col-span-3 xl:col-span-3"
            placeholder={"Bedroom"}
            optionList={bedroomOption}
            onChange={onChangeBedroomValue}
            value={bedroomValue}
          />

          <CustomSelect
            className="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3"
            placeholder={"Bathroom"}
            optionList={bathroomOption}
            onChange={onChangeBathroomValue}
            value={bathroomValue}
          />

          <CustomSelect
            className="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3"
            placeholder={"Status"}
            optionList={[
              { label: "Available", value: true },
              { label: "Not Available", value: false },
            ]}
            onChange={onChangeStatusValue}
            value={statusValue}
          />

          <CustomButton
            buttonClassName="btn-primary xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2"
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
