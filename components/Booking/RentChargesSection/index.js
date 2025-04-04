import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty, map } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Helper from "@/src/utils/Helper";
import RentChargesComponent from "@/components/Booking/RentChargesComponent";
import { useEffect, useState } from "react";

const RentChargesSection = ({
  openFirstMonthCharges,
  onClickOpenFirstMonthCharges,
  openLastMonthCharges,
  onClickOpenLastMonthCharges,
  moveInFees,
  title,
  onClickSelectPaymentAmount,
}) => {
  const firstMonthRentCharges =
    listingSelector.getFirstMonthRentCharges(moveInFees);
  const lastMonthRentCharges =
    listingSelector.getLastMonthRentCharges(moveInFees);
  const othersList = listingSelector.getOthers(moveInFees);
  const totalMoveInCostFull = listingSelector.getTotalCostFull(moveInFees);
  const totalMoveInCostPartial =
    listingSelector.getTotalCostPartial(moveInFees);
  const totalMoveInCostFirstMonth =
    listingSelector.getTotalCostFirstMonthRentCharges(moveInFees);
  const totalMoveInCostLastMonth =
    listingSelector.getTotalCostLastMonthRentCharges(moveInFees);

  return (
    <div
      className="col-span-6 flex flex-col bg-white p-4 global-box-shadow"
      style={{ borderRadius: 15 }}
    >
      <div className="flex items-center">
        <CustomImage src={Images.logo} imageStyle={{ width: 40 }} />

        <div className="flex flex-col pl-2">
          <CustomText textClassName="font-bold text-primary text-base">
            {isEmpty(title) ? "-" : title}
          </CustomText>
          <CustomText textClassName="font-light text-sm text-disable">
            Hosted by Spacify
          </CustomText>
        </div>
      </div>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9", margin: "15px 0" }}
      ></div>

      <CustomText textClassName="font-bold pb-1">Move In Cost</CustomText>
      <CustomText textClassName="text-xs font-light leading-4 text-disable">
        Please check the payment breakdown below. Should you have any inquiries,
        please contact the owner or agent before proceeding with your payment.
      </CustomText>

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>
      {isEmpty(firstMonthRentCharges) ? (
        false
      ) : (
        <RentChargesComponent
          title="First Month Rent Charges"
          onClickOpenCharges={onClickOpenFirstMonthCharges}
          openCharges={openFirstMonthCharges}
          rentChargesAmount={totalMoveInCostFirstMonth}
          rentChargesLists={firstMonthRentCharges}
        />
      )}

      {isEmpty(lastMonthRentCharges) ? (
        false
      ) : (
        <RentChargesComponent
          title="Last Month Rent Charges"
          onClickOpenCharges={onClickOpenLastMonthCharges}
          openCharges={openLastMonthCharges}
          rentChargesAmount={totalMoveInCostLastMonth}
          rentChargesLists={lastMonthRentCharges}
        />
      )}

      {isEmpty(othersList)
        ? false
        : map(othersList, (fessList, index) => {
            const label = listingSelector.getLabel(fessList);
            const value = listingSelector.getFeeAmount(fessList);

            return (
              <div
                className="flex justify-between items-center pb-1"
                key={index}
              >
                <CustomText textClassName="font-bold pr-2">{label}</CustomText>
                <CustomText>RM{value}</CustomText>
              </div>
            );
          })}

      <div
        className="divider-line"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>

      <div className="flex justify-between items-center">
        <CustomText textClassName="font-bold pr-2">
          Total Move-in Cost
        </CustomText>
        <CustomText textClassName="text-primary font-bold">
          RM{totalMoveInCostFull}
        </CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="false"
            onClick={onClickSelectPaymentAmount}
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Full</CustomText>
        </div>

        <CustomText>RM{totalMoveInCostFull}</CustomText>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            type="radio"
            name="is_pay_partial"
            value="true"
            onClick={onClickSelectPaymentAmount}
            className="radio booking-radio mr-2"
          />
          <CustomText>Pay in Partial</CustomText>
        </div>

        <CustomText>RM{totalMoveInCostPartial}</CustomText>
      </div>
    </div>
  );
};

export default RentChargesSection;
