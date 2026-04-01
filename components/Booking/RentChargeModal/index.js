import CustomText from "@/components/CustomText";
import DesktopModal from "@/components/DesktopModal";
import SvgIcon from "@/components/SvgIcon";

const RentChargeModal = ({ onClickCloseRentChargeModal }) => {
  return (
    <DesktopModal id="rent_charges_details">
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Rent Charges Details
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button
              className="btn btn-sm btn-circle btn-ghost right-2"
              onClick={onClickCloseRentChargeModal}
            >
              <SvgIcon name="close" color="black" size={16} />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <CustomText textClassName="text-sm text-justify">
          Rent Charges provide a premium, all-inclusive living experience for a
          modest monthly fee. Covering maintenance, utilities, insurance,
          appliance upkeep, and accidental event protection, these charges
          ensure a hassle-free and comfortable stay. Enjoy seamless convenience
          with essential services bundled into one simple payment, giving you
          peace of mind and exceptional value.
        </CustomText>
      </div>
    </DesktopModal>
  );
};

export default RentChargeModal;
