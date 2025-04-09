import { includes, isEmpty, isEqual, map, size } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import Constant from "@/src/utils/Constant";

const PropertySelectionComponent = ({
  propertyListing,
  onClickSelectProperty,
  selectedPropertyId,
  userRole,
}) => {
  return (
    <div
      className="hidden flex-col gap-4 lg:flex xl:flex overflow-y-scroll hide-scroll-bar"
      style={{ width: 220 }}
    >
      {map(propertyListing, (list, index) => {
        const imageUrl = listingSelector.getImageUrl(list);
        const name = listingSelector.getName(list);
        const propertyId = listingSelector.getId(list);
        const carParkOccupancyRate =
          listingSelector.getCarParkOccupancyRate(list);
        const totalCarPark = listingSelector.getTotalCarPark(list);
        const totalOccupiedCarPark =
          listingSelector.getTotalOccupiedCarPark(list);
        const totalVacantCarPark = listingSelector.getTotalVacantCarPark(list);
        const roomOccupancyRate = listingSelector.getRoomOccupancyRate(list);
        const totalRoom = listingSelector.getTotalRoom(list);
        const totalOccupiedRoom = listingSelector.getTotalOccupiedRoom(list);
        const totalVacantRoom = listingSelector.getTotalVacantRoom(list);
        const totalUnits = listingSelector.getUnitIds(list);

        const isSelectProperty = isEqual(propertyId, selectedPropertyId);

        return (
          <div
            key={index}
            className={`min-w-52 flex cursor-pointer flex-col items-center justify-center rounded-3xl bg-white p-4 ${isSelectProperty ? "border border-2 border-primary" : ""}`}
            onClick={() => onClickSelectProperty(propertyId)}
          >
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
              textClassName={`py-1 text-xs text-center ${isSelectProperty ? "text-primary font-bold" : "text-disable"}`}
            >
              {isEmpty(name) ? "-" : name}
            </CustomText>

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
        );
      })}
    </div>
  );
};

export default PropertySelectionComponent;
