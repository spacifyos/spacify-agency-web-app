import { capitalize, first, get, isEmpty, isEqual, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { getUnitStatus } from "@/src/selectors/listing";

const DesktopUnitContent = ({ unitListing, onClickShareBooking }) => {
  return (
    <div className="relative hidden flex-col gap-4 rounded-3xl bg-white p-6 sm:hidden md:hidden lg:col-span-9 lg:flex xl:col-span-10 xl:flex">
      {isEmpty(unitListing) ? (
        <div className="flex h-screen items-center justify-center rounded-3xl">
          <CustomEmptyBox />
        </div>
      ) : (
        <div className="sticky top-4 flex flex-col gap-4">
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
              <div className="relative overflow-hidden" key={index}>
                <div className="sticky">
                  <div className="flex items-center gap-2">
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

                  <div className="hide-scroll-bar flex gap-4 overflow-x-scroll pt-4">
                    {map(rooms, (room, index) => {
                      const bathroom = listingSelector.getAbbrBathroom(room);
                      const bedType = listingSelector.getAbbrBedType(room);
                      const bookingLink = listingSelector.getBookingLink(room);
                      const propertyOverview =
                        listingSelector.getPropertyOverviewLink(room);
                      const name = listingSelector.getName(room);
                      const isAvailableBook =
                        listingSelector.isAvailableBook(room);
                      const rental = listingSelector.getRental(room);
                      const spaceType = listingSelector.getSpaceType(room);
                      const status = listingSelector.getStatus(room);

                      return (
                        <a
                          key={index}
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
                          className={`${isEqual(status, "vacant") ? "bg-available-light" : isEqual(status, "occupied") ? "bg-error-light" : "bg-disable-background"} global-border-radius min-w-64 max-w-64 flex flex-col gap-2 p-4`}
                        >
                          <div className={`flex items-center justify-between`}>
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

                          <div className="flex items-center gap-2">
                            <div className="w-5">
                              <CustomImage
                                src={Images.bedIconActive}
                                className="w-5"
                              />
                            </div>
                            <CustomText textClassName="text-xs" lineClamp={1}>
                              {isEmpty(name) ? "-" : name}
                            </CustomText>
                          </div>

                          <div className="flex items-center justify-start gap-2">
                            <CustomText textClassName="text-sm bg-primary text-white px-2 rounded">
                              {isEmpty(bedType) ? "-" : bedType}
                            </CustomText>

                            <CustomText textClassName="text-sm bg-primary text-white px-2 rounded">
                              {isEmpty(bathroom) ? "-" : bathroom}
                            </CustomText>
                          </div>

                          {/*<div className="flex items-center gap-2">*/}
                          {/*  <CustomImage*/}
                          {/*    src={Images.bathroomIconActive}*/}
                          {/*    className="w-4"*/}
                          {/*  />*/}
                          {/*  <CustomText textClassName="text-xs">*/}
                          {/*    {isEmpty(bathroom) ? "-" : bathroom}*/}
                          {/*  </CustomText>*/}
                          {/*</div>*/}

                          {/*<div className="flex items-center gap-2">*/}
                          {/*  <CustomImage*/}
                          {/*    src={Images.bedIconActive}*/}
                          {/*    className="w-4"*/}
                          {/*  />*/}
                          {/*  <CustomText textClassName="text-xs">*/}
                          {/*    {isEmpty(bedType) ? "-" : bedType}*/}
                          {/*  </CustomText>*/}
                          {/*</div>*/}

                          {/*<div className="flex items-center gap-2">*/}
                          {/*  <CustomImage*/}
                          {/*    src={Images.spaceIconActive}*/}
                          {/*    className="w-4"*/}
                          {/*  />*/}
                          {/*  <CustomText textClassName="text-xs">*/}
                          {/*    {isEmpty(spaceType) ? "-" : spaceType}*/}
                          {/*  </CustomText>*/}
                          {/*</div>*/}

                          <div
                            className="divider-line bg-black"
                            style={{ margin: "8px 0" }}
                          ></div>

                          <div className="flex items-end gap-1">
                            <CustomText textClassName="text-base">
                              RM{isEmpty(rental) ? "0" : rental}
                            </CustomText>
                            <CustomText textClassName="text-xxs text-disable pb-0.5">
                              /month
                            </CustomText>
                          </div>
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

export default DesktopUnitContent;
