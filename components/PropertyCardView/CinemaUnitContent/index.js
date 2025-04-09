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
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useState } from "react";

const CinemaUnitContent = ({
  unitListing,
  onClickSelectRoomDetail,
  zoomIn,
}) => {
  return (
    <div className="hide-scroll-bar h-full w-full overflow-y-scroll">
      {isEmpty(unitListing) ? (
        <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="flex flex-col rounded-3xl bg-white p-6">
          {map(unitListing, (list, index) => {
            const name = listingSelector.getName(list);
            const rooms = listingSelector.getRooms(list);
            const isOccupied = listingSelector.getIsOccupied(list);
            const unitStatus = listingSelector.getUnitStatus(list);
            const genderLabel = listingSelector.getGenderLabel(list);
            const styleLabel = listingSelector.getStyleLabel(list);
            const unitStatusTypeLabel =
              listingSelector.getUnitStatusTypeLabel(list);

            const checkGenderColor = (gender) => {
              switch (gender) {
                case "Male":
                  return "bg-male";
                case "Female":
                  return "bg-female";
                case "Mixed":
                  return "bg-mixed";
                default:
                  return "bg-disable";
              }
            };

            return (
              <div key={index}>
                <div className="" style={{ zoom: 1 }}>
                  <div className="flex items-center gap-2 pb-4">
                    <CustomText
                      textClassName={`${checkGenderColor(genderLabel)} text-white text-xs py-1 px-1.5 rounded`}
                    >
                      {first(genderLabel.split(""))}
                    </CustomText>

                    <CustomText textClassName="text-base text-primary font-bold">
                      {isEmpty(name) ? "-" : name}
                    </CustomText>

                    {isEmpty(styleLabel) ? (
                      false
                    ) : (
                      <CustomText textClassName="italic">
                        | {styleLabel}
                      </CustomText>
                    )}

                    <CustomText
                      textClassName={`${isEqual(unitStatus, "fully") ? "bg-error" : isEqual(unitStatus, "partial") ? "bg-warning" : "bg-active"} text-xs rounded px-2 py-1 text-white`}
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

                      return (
                        <div
                          key={idx}
                          onClick={() => onClickSelectRoomDetail(room)}
                          style={{ maxWidth: 112 }}
                          className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} global-border-radius flex cursor-pointer flex-col gap-1 overflow-hidden p-2`}
                        >
                          <div className={`flex flex-col items-start gap-1`}>
                            <div className="flex items-center gap-0.5">
                              {/*<CustomText*/}
                              {/*  textClassName={`text-white text-xxs ${*/}
                              {/*    !isAvailableBook && isEqual(status, "vacant")*/}
                              {/*      ? "bg-disable"*/}
                              {/*      : isEqual(status, "vacant")*/}
                              {/*        ? "bg-available"*/}
                              {/*        : "bg-error"*/}
                              {/*  } px-1 rounded`}*/}
                              {/*>*/}
                              {/*  {!isAvailableBook && isEqual(status, "vacant")*/}
                              {/*    ? "N"*/}
                              {/*    : isEqual(status, "vacant")*/}
                              {/*      ? "V"*/}
                              {/*      : "O"}*/}
                              {/*</CustomText>*/}

                              <CustomImage
                                src={
                                  isEqual(spaceType, "R")
                                    ? !isAvailableBook &&
                                      isEqual(status, "vacant")
                                      ? Images.bedIconDisable
                                      : Images.bedIconActive
                                    : !isAvailableBook &&
                                        isEqual(status, "vacant")
                                      ? Images.carDisableIcon
                                      : isEqual(status, "vacant")
                                        ? Images.carAvailableIcon
                                        : Images.carOccupiedIcon
                                }
                                className="h-4 w-4"
                              />

                              <CustomText textClassName="text-disable">
                                |
                              </CustomText>

                              <CustomText textClassName="text-xs font-bold line-clamp-1">
                                RM{!isEmpty(rental) ? "0" : toNumber(rental)}
                              </CustomText>
                            </div>

                            <CustomText textClassName="text-xs font-bold text-primary line-clamp-1">
                              {isEmpty(name) ? "-" : name}
                            </CustomText>

                            {isEqual(spaceType, "C") ? (
                              false
                            ) : (
                              <div className="flex items-center justify-start gap-3">
                                <CustomText textClassName="text-xs bg-primary text-white px-1.5 py-0.5 rounded">
                                  {isEmpty(bedType) ? "-" : bedType}
                                </CustomText>

                                <CustomText textClassName="text-xs bg-secondary text-white px-1.5 py-0.5 rounded">
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

                <div className="divider-line"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CinemaUnitContent;
