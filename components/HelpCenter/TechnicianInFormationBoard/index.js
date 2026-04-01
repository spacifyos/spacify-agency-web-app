import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import LocationMap from "@/components/HelpCenter/LocationMap";

const TechnicianInFormationBoard = ({
  data,
  onClickCheckIn,
  onClickCheckOut,
  checkInLoading,
  checkOutLoading,
}) => {
  const technician = maintenanceTicketSelector.getTechnician(data);

  return isEmpty(technician)
    ? false
    : map(technician, (item, index) => {
        const technicianName =
          maintenanceTicketSelector.getTechnicianName(item);
        const checkInLat = maintenanceTicketSelector.getCheckInLatitude(item);
        const checkInLng = maintenanceTicketSelector.getCheckInLongitude(item);
        const checkInTime = maintenanceTicketSelector.getCheckInTime(item);

        const checkOutLat = maintenanceTicketSelector.getCheckOutLatitude(item);
        const checkOutLng =
          maintenanceTicketSelector.getCheckOutLongitude(item);
        const checkOutTime = maintenanceTicketSelector.getCheckOutTime(item);
        const checkedIn = maintenanceTicketSelector.getCheckedIn(item);
        const checkedOut = maintenanceTicketSelector.getCheckedOut(item);
        const isAllowToCheckIn =
          maintenanceTicketSelector.getIsAllowToCheckIn(item);

        return (
          <div
            className="rounded-2xl border border-border bg-surface"
            key={index}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
                  Technician {index + 1}
                </CustomText>
                <CustomText textClassName="text-sm font-semibold text-black mt-0.5">
                  {technicianName}
                </CustomText>
              </div>

              {isAllowToCheckIn ? (
                !checkedIn ? (
                  <CustomButton
                    buttonClassName="btn-primary rounded-full px-4 py-1.5 h-auto min-h-0"
                    textClassName="text-xs font-medium"
                    buttonText="Check In"
                    onClick={onClickCheckIn}
                    loading={checkInLoading}
                    disable={checkInLoading}
                  />
                ) : !checkedOut ? (
                  <CustomButton
                    buttonClassName="btn-primary-outline rounded-full px-4 py-1.5 h-auto min-h-0"
                    textClassName="text-xs font-medium"
                    buttonText="Check Out"
                    onClick={onClickCheckOut}
                    disable={checkOutLoading}
                    loading={checkOutLoading}
                  />
                ) : null
              ) : null}
            </div>

            {/* Check in/out details */}
            {checkedIn && (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  {!isEmpty(checkInTime) && (
                    <div className="mb-3">
                      <CustomText textClassName="text-xs text-muted mb-0.5">
                        Check In
                      </CustomText>
                      <CustomText textClassName="text-xs font-medium text-black">
                        {checkInTime}
                      </CustomText>
                    </div>
                  )}
                  {!isEmpty(checkInLat) && !isEmpty(checkInLng) && (
                    <div className="overflow-hidden rounded-xl">
                      <LocationMap lat={checkInLat} lng={checkInLng} />
                    </div>
                  )}
                </div>

                <div>
                  {!isEmpty(checkOutTime) && (
                    <div className="mb-3">
                      <CustomText textClassName="text-xs text-muted mb-0.5">
                        Check Out
                      </CustomText>
                      <CustomText textClassName="text-xs font-medium text-black">
                        {checkOutTime}
                      </CustomText>
                    </div>
                  )}
                  {!isEmpty(checkOutLat) && !isEmpty(checkOutLng) && (
                    <div className="overflow-hidden rounded-xl">
                      <LocationMap lat={checkOutLat} lng={checkOutLng} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      });
};

export default TechnicianInFormationBoard;
