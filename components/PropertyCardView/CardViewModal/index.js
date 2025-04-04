import DesktopModal from "@/components/DesktopModal";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { get, isEmpty, isEqual } from "lodash";
import * as listingSelector from "@/src/selectors/listing";

const CardViewModal = ({ data, onClickShareBooking }) => {
  const bathroom = get(data, ["bathroom"], "");
  const bedType = listingSelector.getBedType(data);
  const bookingLink = listingSelector.getBookingLink(data);
  const propertyOverview = listingSelector.getPropertyOverviewLink(data);
  const name = listingSelector.getName(data);
  const isAvailableBook = listingSelector.isAvailableBook(data);
  const rental = listingSelector.getRental(data);
  const spaceType = listingSelector.getSpaceType(data);
  const status = listingSelector.getStatus(data);
  const bookingSettingLink = listingSelector.getBookingSettingLink(data);

  return (
    <DesktopModal id="card_view_modal">
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            {name}
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.closeIconBlack}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <a
          target={"_blank"}
          href={
            isAvailableBook && isEqual(status, "vacant")
              ? propertyOverview
              : bookingSettingLink
          }
          className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} p-4 global-border-radius flex flex-col gap-2 min-w-64 relative`}
        >
          <div className={`flex justify-between items-center`}>
            <CustomText
              textClassName={`text-white text-xxs ${
                !isAvailableBook && isEqual(status, "vacant")
                  ? "bg-disable"
                  : isEqual(status, "vacant")
                    ? "bg-available"
                    : "bg-error"
              } py-1 px-2 global-border-radius`}
            >
              {!isAvailableBook && isEqual(status, "vacant")
                ? "N / A"
                : isEqual(status, "vacant")
                  ? "Vacant"
                  : "Occupied"}
            </CustomText>

            <CustomImage
              src={
                isAvailableBook
                  ? Images.shareIconActive
                  : Images.shareIconDisable
              }
              className={`w-4 ${isAvailableBook ? "cursor-pointer" : ""}`}
              onClick={(event) => {
                if (isAvailableBook) {
                  event.stopPropagation();
                  event.preventDefault();
                  onClickShareBooking(bookingLink);
                }
              }}
            />
          </div>

          <CustomText textClassName="text-xs">
            {isEmpty(name) ? "-" : name}
          </CustomText>

          <div className="flex items-center gap-2">
            <CustomImage src={Images.bathroomIconActive} className="w-4" />
            <CustomText textClassName="text-xs">
              {isEmpty(bathroom) ? "-" : bathroom}
            </CustomText>
          </div>

          <div className="flex items-center gap-2">
            <CustomImage src={Images.bedIconActive} className="w-4" />
            <CustomText textClassName="text-xs">
              {isEmpty(bedType) ? "-" : bedType}
            </CustomText>
          </div>

          <div className="flex items-center gap-2">
            <CustomImage src={Images.spaceIconActive} className="w-4" />
            <CustomText textClassName="text-xs">
              {isEmpty(spaceType) ? "-" : spaceType}
            </CustomText>
          </div>

          <div
            className="divider-line bg-black"
            style={{ margin: "8px 0" }}
          ></div>

          <CustomText textClassName="text-sm">
            RM{isEmpty(rental) ? "0" : rental}/month
          </CustomText>
        </a>
      </div>
    </DesktopModal>
  );
};

export default CardViewModal;
