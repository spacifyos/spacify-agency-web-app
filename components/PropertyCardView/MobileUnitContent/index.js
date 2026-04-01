import { capitalize, get, isEmpty, isEqual, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";

const MobileUnitContent = ({ unitListing, onClickShareBooking }) => {
  return (
    <div className="md:col-span-12 sm:col-span-12 col-span-12 xl:hidden lg:hidden md:block sm:block block relative">
      {isEmpty(unitListing) ? (
        <div className="bg-white global-border-radius border border-disable flex justify-center items-center h-screen">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sticky top-4 ">
          {map(unitListing, (list) => {
            const name = listingSelector.getName(list);
            const rooms = listingSelector.getRooms(list);
            const isOccupied = listingSelector.getIsOccupied(list);
            const unitStatus = listingSelector.getUnitStatus(list);

            return (
              <div className="bg-white collapse border global-border-radius">
                <input type="checkbox" />
                <div className="collapse-title">
                  <div className="flex items-center gap-2">
                    <CustomText textClassName="text-base">
                      {isEmpty(name) ? "-" : name}
                    </CustomText>

                    <CustomText
                      textClassName={`${isEqual(unitStatus, "fully") ? "bg-error" : isEqual(unitStatus, "partial") ? "bg-warning" : "bg-available"} text-xs global-border-radius px-2 py-1 text-white`}
                    >
                      {capitalize(unitStatus)}
                    </CustomText>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2">
                    {map(rooms, (room) => {
                      const bathroom = listingSelector.getAbbrBathroom(room);
                      const bedType = listingSelector.getAbbrBedType(room);
                      const bookingLink = listingSelector.getBookingLink(room);
                      const propertyOverview =
                        listingSelector.getPropertyOverviewLink(room);
                      const name = listingSelector.getName(room);
                      const isAvailableBook =
                        listingSelector.isAvailableBook(room);
                      const rental = listingSelector.getRental(room);
                      const spaceType = listingSelector.getAbbrSpaceType(room);
                      const status = listingSelector.getStatus(room);
                      const bookingSettingLink =
                        listingSelector.getBookingSettingLink(room);

                      return (
                        <a
                          target={
                            isAvailableBook && isEqual(status, "vacant")
                              ? "_blank"
                              : "_self"
                          }
                          href={
                            isAvailableBook && isEqual(status, "vacant")
                              ? propertyOverview
                              : "#"
                          }
                          className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} p-2 global-border-radius flex flex-col gap-1`}
                        >
                          <div className={`flex justify-between items-center`}>
                            <div className="flex items-center gap-1">
                              <CustomText
                                textClassName={`text-white text-xxs ${
                                  !isAvailableBook && isEqual(status, "vacant")
                                    ? "bg-disable"
                                    : isEqual(status, "vacant")
                                      ? "bg-available"
                                      : "bg-error"
                                } px-1 rounded`}
                              >
                                {!isAvailableBook && isEqual(status, "vacant")
                                  ? "N / A"
                                  : isEqual(status, "vacant")
                                    ? "V"
                                    : "O"}
                              </CustomText>

                              <CustomText textClassName="text-xxs bg-primary text-white px-1 rounded">
                                {isEmpty(spaceType) ? "-" : spaceType}
                              </CustomText>
                            </div>

                            <SvgIcon
                              name="share"
                              color={isEmpty(isAvailableBook) ? "active" : "disable"}
                              size={12}
                              onClick={(event) => {
                                if (isAvailableBook) {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  onClickShareBooking(bookingLink);
                                }
                              }}
                            />
                          </div>

                          <CustomText textClassName="text-xxs line-clamp-1">
                            {isEmpty(name) ? "-" : name}
                          </CustomText>

                          <div className="flex items-center justify-start gap-2">
                            <CustomText textClassName="text-xs bg-primary text-white px-2 rounded">
                              {isEmpty(bedType) ? "-" : bedType}
                            </CustomText>

                            {/*<CustomText>|</CustomText>*/}

                            <CustomText textClassName="text-xs bg-primary text-white px-2 rounded">
                              {isEmpty(bathroom) ? "-" : bathroom}
                            </CustomText>
                          </div>

                          <div
                            className="divider-line bg-black"
                            style={{ margin: "4px 0" }}
                          ></div>

                          <CustomText textClassName="text-xs">
                            RM{isEmpty(rental) ? "0" : rental}
                          </CustomText>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileUnitContent;
