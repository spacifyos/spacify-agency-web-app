import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
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
            className="rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8"
            key={index}
          >
            <div className="flex items-center justify-between">
              <CustomText textClassName="text-disable text-sm">
                Technician {index + 1}
              </CustomText>

              {isAllowToCheckIn ? (
                !checkedIn ? (
                  <CustomButton
                    buttonClassName={`${checkInLoading ? "btn-primary" : "btn-primary-outline"} btn-xs min-h-8 max-h-8 min-w-20`}
                    buttonText="Check In"
                    onClick={onClickCheckIn}
                    loading={checkInLoading}
                    disable={checkInLoading}
                  />
                ) : !checkedOut ? (
                  <CustomButton
                    buttonClassName={`${checkOutLoading ? "btn-primary" : "btn-primary-outline"} btn-xs min-h-8 max-h-8 min-w-20`}
                    buttonText="Check Out"
                    onClick={onClickCheckOut}
                    disable={checkOutLoading}
                    loading={checkOutLoading}
                  />
                ) : (
                  false
                )
              ) : (
                false
              )}
            </div>

            <div
              className="divider-line"
              style={{ marginTop: 16, marginBottom: 16 }}
            ></div>

            <CustomLabelValue
              label={"Technician Name"}
              value={technicianName}
            />

            {checkedIn ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  {isEmpty(checkInTime) ? (
                    false
                  ) : (
                    <CustomLabelValue
                      label={"Check In Date & Time"}
                      value={checkInTime}
                    />
                  )}

                  {isEmpty(checkInLat) || isEmpty(checkInLng) ? (
                    false
                  ) : (
                    <div className={`pb-4`}>
                      <CustomText
                        textClassName={`text-disable text-xs font-normal pb-1`}
                      >
                        Check In Location
                      </CustomText>

                      <LocationMap lat={checkInLat} lng={checkInLng} />
                    </div>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  {isEmpty(checkOutTime) ? (
                    false
                  ) : (
                    <CustomLabelValue
                      label={"Check Out Date & Time"}
                      value={checkOutTime}
                    />
                  )}

                  {isEmpty(checkOutLat) || isEmpty(checkOutLng) ? (
                    false
                  ) : (
                    <div className={``}>
                      <CustomText
                        textClassName={`text-disable text-xs font-normal pb-1`}
                      >
                        Check Out Location
                      </CustomText>

                      <LocationMap lat={checkOutLat} lng={checkOutLng} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              false
            )}

            {/*<div className="flex justify-center">*/}
            {/*    <CustomButton*/}
            {/*        buttonStyles={{ padding: "5px 30px" }}*/}
            {/*        buttonClassName="btn-primary"*/}
            {/*        buttonText={"Submit"}*/}
            {/*        onClick={onClickUpdateTicket}*/}
            {/*    />*/}
            {/*</div>*/}
          </div>
        );
      });
};

export default TechnicianInFormationBoard;
