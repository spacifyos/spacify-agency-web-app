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
    <div>
      <div
        className={`grid xl:grid-cols-11 lg:grid-cols-11 md:grid-cols-11 sm:grid-cols-11 grid-cols-11 gap-2 ${isOpenFilter ? "pb-2" : "pb-7"}`}
      >
        <CustomSelect
          className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-9 col-span-9"
          placeholder={"Property"}
          optionList={propertyOption}
          onChange={onChangePropertyValue}
          value={propertyValue}
        />

        <CustomSelect
          className="w-full xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-5 xl:block lg:block md:block hidden"
          placeholder={"Unit"}
          optionList={unitOption}
          onChange={onChangeUnitValue}
          value={unitValue}
        />

        <div
          className="bg-white xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2 flex justify-center items-center global-box-shadow global-border-radius cursor-pointer"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <CustomImage src={Images.filterIconBlack} className="h-6 w-6" />
        </div>
      </div>

      {isOpenFilter ? (
        <div className="grid xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-10 grid-cols-10 gap-2 pb-7">
          <CustomSelect
            className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-5 xl:hidden lg:hidden md:hidden"
            placeholder={"Unit"}
            optionList={unitOption}
            onChange={onChangeUnitValue}
            value={unitValue}
          />

          <CustomSelect
            className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-5 col-span-5"
            placeholder={"Bedroom"}
            optionList={bedroomOption}
            onChange={onChangeBedroomValue}
            value={bedroomValue}
          />

          <CustomSelect
            className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-4"
            placeholder={"Bathroom"}
            optionList={bathroomOption}
            onChange={onChangeBathroomValue}
            value={bathroomValue}
          />

          <CustomSelect
            className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-4"
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
