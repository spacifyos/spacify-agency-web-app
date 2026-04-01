import { includes, isEmpty, isEqual, map, size, toString } from "lodash";
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
    <div className="relative">
      <div className="hide-scroll-bar flex flex-row gap-3 overflow-x-auto pb-1">
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

          const isSelectProperty = isEqual(
            toString(propertyId),
            toString(selectedPropertyId),
          );

          return (
            <div
              key={propertyId}
              className={`flex min-w-[160px] cursor-pointer flex-col items-center rounded-2xl border bg-surface p-4 transition-all ${isSelectProperty ? "border-primary" : "border-border"}`}
              onClick={() => onClickSelectProperty(propertyId)}
            >
              <div className="flex flex-col items-center gap-2 pb-2">
                <div className="h-[56px] w-[56px] overflow-hidden rounded-xl">
                  <CustomImage
                    className="overflow-hidden rounded-xl"
                    imageStyle={{
                      width: 56,
                      height: 56,
                      maxWidth: 56,
                      maxHeight: 56,
                    }}
                    src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
                  />
                </div>

                <CustomText
                  textClassName={`text-xs text-center font-semibold line-clamp-1 ${isSelectProperty ? "text-primary" : "text-muted"}`}
                >
                  {isEmpty(name) ? "-" : name}
                </CustomText>
              </div>

              {includes(userRole, Constant.MASTER_AGENCY_ROLE) ? (
                <>
                  <div className="flex items-center gap-1 pb-1">
                    <CustomText
                      textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-muted"}`}
                    >
                      Total Unit:
                    </CustomText>
                    <CustomText
                      textClassName={`text-xs text-center font-semibold ${isSelectProperty ? "text-primary" : "text-muted"}`}
                    >
                      {size(totalUnits)}
                    </CustomText>
                  </div>

                  <div>
                    <div className="flex gap-1 pb-1">
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-muted"}`}
                      >{`R:`}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center font-semibold ${isSelectProperty ? "text-primary" : "text-muted"}`}
                      >{`${totalOccupiedRoom}/${totalRoom} (${totalVacantRoom})`}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-muted"}`}
                      >{`- OR:`}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center font-semibold ${isSelectProperty ? "text-primary" : "text-muted"}`}
                      >{`${roomOccupancyRate}%`}</CustomText>
                    </div>

                    <div className="flex gap-1">
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-muted"}`}
                      >{`CP:`}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center font-semibold ${isSelectProperty ? "text-primary" : "text-muted"}`}
                      >{`${totalOccupiedCarPark}/${totalCarPark} (${totalVacantCarPark}) `}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center ${isSelectProperty ? "text-black" : "text-muted"}`}
                      >{`- OR:`}</CustomText>
                      <CustomText
                        textClassName={`text-xs text-center font-semibold ${isSelectProperty ? "text-primary" : "text-muted"}`}
                      >{`${carParkOccupancyRate}%`}</CustomText>
                    </div>
                  </div>
                </>
              ) : (
                false
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobilePropertySelectionComponent;
