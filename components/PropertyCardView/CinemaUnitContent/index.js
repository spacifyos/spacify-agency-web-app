import {
  capitalize,
  first,
  get,
  isEmpty,
  isEqual,
  map,
  toNumber,
} from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";

const CinemaUnitContent = ({ unitListing, onClickSelectRoomDetail }) => {
  return (
    <div className="h-full w-full">
      {isEmpty(unitListing) ? (
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-auto rounded-2xl border border-border bg-surface p-5">
          {map(unitListing, (list, index) => {
            const name = listingSelector.getName(list);
            const rooms = listingSelector.getRooms(list);
            const isOccupied = listingSelector.getIsOccupied(list);
            const unitStatus = listingSelector.getUnitStatus(list);
            const genderLabel = listingSelector.getGenderLabel(list);
            const genderValue = listingSelector.getGenderValue(list);
            const styleLabel = listingSelector.getStyleLabel(list);
            const unitStatusTypeLabel =
              listingSelector.getUnitStatusTypeLabel(list);

            const checkGenderColor = (gender) => {
              switch (gender) {
                case "male":
                  return "bg-male";
                case "female":
                  return "bg-female";
                case "mixed":
                  return "bg-mixed";
                default:
                  return "bg-disable";
              }
            };

            return isEmpty(rooms) ? (
              false
            ) : (
              <div key={index}>
                <div>
                  <div className="flex flex-wrap items-center gap-2 pb-3">
                    <CustomText
                      textClassName={`${checkGenderColor(genderValue)} text-white text-xs py-1 px-1.5 rounded-lg`}
                    >
                      {isEmpty(genderLabel)
                        ? "N/A"
                        : first(genderLabel.split(""))}
                    </CustomText>

                    <CustomText textClassName="text-base text-primary font-semibold">
                      {isEmpty(name) ? "-" : name}
                    </CustomText>

                    {isEmpty(styleLabel) ? (
                      false
                    ) : (
                      <CustomText textClassName="italic text-muted text-sm">
                        | {styleLabel}
                      </CustomText>
                    )}

                    <CustomText
                      textClassName={`${isEqual(unitStatus, "fully") ? "bg-error" : isEqual(unitStatus, "partial") ? "bg-warning" : "bg-active"} text-xs rounded-lg px-2 py-1 text-white`}
                    >
                      {capitalize(unitStatus)}
                    </CustomText>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {map(rooms, (room, idx) => {
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
                      const spaceStatusTypeValue =
                        listingSelector.getSpaceStatusTypeValue(room);

                      return (
                        <div
                          key={idx}
                          onClick={() => onClickSelectRoomDetail(room)}
                          style={{ maxWidth: 112 }}
                          className={`${spaceStatusTypeValue === 4 ? "bg-surface-secondary" : isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} flex cursor-pointer flex-col gap-1 overflow-hidden rounded-xl p-2.5 transition-all hover:opacity-80`}
                        >
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-0.5">
                              <SvgIcon
                                name={
                                  isEqual(spaceType, "R")
                                    ? "bed"
                                    : !isAvailableBook &&
                                        isEqual(status, "vacant")
                                      ? "carDisable"
                                      : isEqual(status, "vacant")
                                        ? "carAvailable"
                                        : "carOccupied"
                                }
                                color={
                                  isEqual(spaceType, "R")
                                    ? !isAvailableBook &&
                                      isEqual(status, "vacant")
                                      ? "disable"
                                      : "active"
                                    : !isAvailableBook &&
                                        isEqual(status, "vacant")
                                      ? "disable"
                                      : isEqual(status, "vacant")
                                        ? "available"
                                        : "error"
                                }
                                size={16}
                              />

                              <CustomText textClassName="text-muted">
                                |
                              </CustomText>

                              <CustomText
                                textClassName={`${spaceStatusTypeValue === 4 ? "text-muted" : "text-black"} text-xs font-semibold line-clamp-1`}
                              >
                                RM{isEmpty(rental) ? "0" : toNumber(rental)}
                              </CustomText>
                            </div>

                            <CustomText
                              textClassName={`${spaceStatusTypeValue === 4 ? "text-muted" : "text-primary"} text-xs font-semibold line-clamp-1`}
                            >
                              {isEmpty(name) ? "-" : name}
                            </CustomText>

                            {isEqual(spaceType, "C") ? (
                              false
                            ) : (
                              <div className="flex items-center justify-start gap-2">
                                <CustomText
                                  textClassName={`${spaceStatusTypeValue === 4 ? "bg-disable" : "bg-primary"} text-xs text-white px-1.5 py-0.5 rounded-lg`}
                                >
                                  {isEmpty(bedType) ? "-" : bedType}
                                </CustomText>

                                <CustomText
                                  textClassName={`${spaceStatusTypeValue === 4 ? "bg-disable" : "bg-secondary"} text-xs text-white px-1.5 py-0.5 rounded-lg`}
                                >
                                  {isEmpty(bathroom) ? "-" : bathroom}
                                </CustomText>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="my-4 border-t border-border"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CinemaUnitContent;
