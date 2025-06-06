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
  onClickReset,
  onChangeStartDateValue,
  startDateValue,
  onChangeEndDateValue,
  endDateValue,
}) => {
  return (
    <div className="">
      <div
        className={`grid grid-cols-11 items-end gap-2 sm:grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11`}
      >
        <CustomSelect
          label={"Property"}
          className="col-span-9 sm:col-span-9 md:col-span-4 lg:col-span-4 xl:col-span-4"
          placeholder={"Property"}
          optionList={propertyOption}
          onChange={onChangePropertyValue}
          value={propertyValue}
        />

        <CustomInput
          label={"Start Date"}
          className="col-span-3 hidden w-full sm:col-span-3 md:col-span-3 md:block lg:col-span-3 lg:block xl:col-span-3 xl:block"
          placeholder={"Start Date"}
          onChange={onChangeStartDateValue}
          value={startDateValue}
          inputType="date"
        />

        <CustomInput
          label={"End Date"}
          className="col-span-3 hidden w-full sm:col-span-3 md:col-span-3 md:block lg:col-span-3 lg:block xl:col-span-3 xl:block"
          placeholder={"End Date"}
          onChange={onChangeEndDateValue}
          value={endDateValue}
          inputType="date"
        />

        <div
          className="global-box-shadow global-border-radius col-span-2 flex h-12 cursor-pointer items-center justify-center bg-white sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
          onClick={() => setIsOpenFilter(!isOpenFilter)}
        >
          <CustomImage src={Images.filterIconBlack} className="h-6 w-6" />
        </div>
      </div>

      {isOpenFilter ? (
        <div className="grid grid-cols-11 gap-2 pt-2">
          <CustomInput
            className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-5"
            placeholder={"Start Date"}
            onChange={onChangeStartDateValue}
            value={startDateValue}
            inputType="date"
          />

          <CustomInput
            className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5 xl:col-span-5"
            placeholder={"End Date"}
            onChange={onChangeEndDateValue}
            value={endDateValue}
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
