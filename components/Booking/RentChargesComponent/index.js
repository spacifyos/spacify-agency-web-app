import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";
import Helper from "@/src/utils/Helper";
import _, { isEmpty, isEqual } from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const RentChargesComponent = ({
  openCharges,
  onClickOpenCharges,
  rentChargesAmount,
  rentChargesLists,
  title,
}) => {
  return (
    <div
      className={`collapse ${openCharges ? "collapse-open" : ""} pb-1`}
      style={{ borderRadius: 0 }}
    >
      <div
        className="collapse-title flex justify-between items-center cursor-pointer pb-1"
        style={{ padding: 0, minHeight: 20 }}
      >
        <div
          className="flex items-center justify-start flex-1 pr-2"
          onClick={isEmpty(rentChargesLists) ? () => {} : onClickOpenCharges}
        >
          <CustomText textClassName="font-bold pr-2 flex text-sm">{title}</CustomText>
          {isEmpty(rentChargesLists) ? (
            false
          ) : (
            <SvgIcon
              name={!openCharges ? "up" : "down"}
              color="black"
              size={13}
            />
          )}
        </div>

        <CustomText textClassName="text-sm">RM{rentChargesAmount}</CustomText>
      </div>

      <div className="collapse-content p-0">
        <div className="flex items-center pt-1">
          <SvgIcon
            name="info"
            color="active"
            size={16}
            onClick={() =>
              Helper.documentGetElementById("rent_charges_details").showModal()
            }
          />
          <CustomText
            styles={{ color: "#1E1E1E" }}
            textClassName="pl-2 font-light text-sm"
          >
            Inclusion of:
          </CustomText>
        </div>

        {_.map(rentChargesLists, (rentChargesList, index) => {
          const label = listingSelector.getLabel(rentChargesList);
          const value = listingSelector.getFeeAmount(rentChargesList);

          return (
            <ul className="pl-7" key={index}>
              <li className="flex justify-between">
                <CustomText
                  styles={{ color: "#1E1E1E" }}
                  textClassName="font-light text-sm"
                >
                  - {label}
                </CustomText>
                {isEqual(process.env.PRODUCTION, "DEVELOPMENT") ? (
                  <CustomText
                    styles={{ color: "#1E1E1E" }}
                    textClassName="font-light text-sm"
                  >
                    {`RM${value}`}
                  </CustomText>
                ) : (
                  false
                )}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default RentChargesComponent;
