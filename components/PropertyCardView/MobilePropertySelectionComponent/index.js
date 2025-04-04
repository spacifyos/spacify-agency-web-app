import { includes, isEmpty, isEqual, map, size } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import Constant from "@/src/utils/Constant";

const MobilePropertySelectionComponent = ({
  propertyListing,
  onClickSelectProperty,
  selectedPropertyId,
  userRole,
}) => {
  return (
    <div className="relative col-span-12 lg:hidden xl:hidden">
      <div className="sticky top-4 flex flex-row gap-2 overflow-y-scroll sm:flex-row md:flex-row lg:h-screen lg:flex-col xl:h-screen xl:flex-col">
        {map(propertyListing, (list) => {
          const imageUrl = listingSelector.getImageUrl(list);
          const name = listingSelector.getName(list);
          const propertyId = listingSelector.getId(list);
          const carParkOccupancyRate =
            listingSelector.getCarParkOccupancyRate(list);
          const totalCarPark = listingSelector.getTotalCarPark(list);
          const totalOccupiedCarPark =
            listingSelector.getTotalOccupiedCarPark(list);
          const totalVacantCarPark =
            listingSelector.getTotalVacantCarPark(list);
          const roomOccupancyRate = listingSelector.getRoomOccupancyRate(list);
          const totalRoom = listingSelector.getTotalRoom(list);
          const totalOccupiedRoom = listingSelector.getTotalOccupiedRoom(list);
          const totalVacantRoom = listingSelector.getTotalVacantRoom(list);
          const totalUnits = listingSelector.getUnitIds(list);

          const isSelectProperty = isEqual(propertyId, selectedPropertyId);

          return (
            <div
              key={propertyId}
              className={`global-border-radius flex min-w-28 cursor-pointer items-center justify-between border bg-white p-3 ${isEqual(propertyId, selectedPropertyId) ? "border-2 border-primary" : "border"}`}
              onClick={() => onClickSelectProperty(propertyId)}
            >
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-center gap-2 pb-2 sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      maxWidth: 60,
                      maxHeight: 60,
                    }}
                  >
                    <CustomImage
                      className="global-border-radius overflow-hidden border"
                      imageStyle={{
                        width: 60,
                        height: 60,
                        maxWidth: 60,
                        maxHeight: 60,
                      }}
                      src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
                    />
                  </div>

                  <CustomText
                    textClassName={`text-xs xl:text-start lg:text-start md:text-center sm:text-center text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"} line-clamp-2`}
                  >
                    {isEmpty(name) ? "-" : name}
                  </CustomText>
                </div>

                {includes(userRole, Constant.MASTER_AGENCY_ROLE) ? (
                  <>
                    <div className="flex items-center gap-1 pb-1">
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-disable"}`}
                      >
                        Total Unit:
                      </CustomText>
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
                      >
                        {size(totalUnits)}
                      </CustomText>
                    </div>

                    <div className="hidden lg:block xl:block">
                      <div className="flex gap-1 pb-1">
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-disable"}`}
                        >{`R:`}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
                        >{`${totalOccupiedRoom}/${totalRoom} (${totalVacantRoom})`}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-disable"}`}
                        >{`- OR:`}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
                        >{`${roomOccupancyRate}%`}</CustomText>
                      </div>

                      <div className="flex gap-1">
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-disable"}`}
                        >{`CP:`}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
                        >{`${totalOccupiedCarPark}/${totalCarPark} (${totalVacantCarPark}) `}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-disable"}`}
                        >{`- OR:`}</CustomText>
                        <CustomText
                          textClassName={`text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
                        >{`${carParkOccupancyRate}%`}</CustomText>
                      </div>
                    </div>

                    <div className="w-full lg:hidden xl:hidden">
                      <CustomText textClassName="text-xs text-center">{`R: ${totalOccupiedRoom}/${totalRoom} (${totalVacantRoom})`}</CustomText>
                      <CustomText textClassName="text-xs text-center">{`OR: ${roomOccupancyRate}%`}</CustomText>
                      <CustomText textClassName="text-xs text-center">{`CP: ${totalOccupiedCarPark}/${totalCarPark} (${totalVacantCarPark})`}</CustomText>
                      <CustomText textClassName="text-xs text-center">{`OR: ${carParkOccupancyRate}%`}</CustomText>
                    </div>
                  </>
                ) : (
                  false
                )}
              </div>
              <div className="hidden lg:block xl:block">
                <CustomImage
                  className="w-2"
                  src={
                    isSelectProperty
                      ? Images.rightIconActive
                      : Images.rightIconDisable
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobilePropertySelectionComponent;
