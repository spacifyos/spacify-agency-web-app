import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import Images from "@/src/utils/Image";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { isEqual } from "lodash";

const HelpCenterListingCard = ({ data, onClickToRequestOverview }) => {
  const id = maintenanceTicketSelector.getId(data);
  const status = maintenanceTicketSelector.getStatus(data);
  const priority = maintenanceTicketSelector.getPriority(data);
  const date = maintenanceTicketSelector.getCreatedAt(data);
  const requestNumber = maintenanceTicketSelector.getRequestNumber(data);
  const requestInfo = maintenanceTicketSelector.getRequestInfo(data);
  const address = maintenanceTicketSelector.getPropertyUnitName(data);
  const roomName = maintenanceTicketSelector.getRoomName(data);

  return (
    <div
      className="relative cursor-pointer rounded-3xl bg-white p-4"
      onClick={() => onClickToRequestOverview(id)}
    >
      <div className="flex items-center gap-2 pb-2">
        <StatusLabel status={status} />

        {isEqual(priority, "N/A") ? (
          false
        ) : (
          <StatusLabelOutline status={priority} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="pr-2">
          <CustomText textClassName="font-bold text-sm">{date}</CustomText>

          <CustomText textClassName="font-bold text-primary">
            Request #: {requestNumber}
          </CustomText>

          <CustomText textClassName="text-disable text-xs" lineClamp={2}>
            {requestInfo}
          </CustomText>
        </div>

        <CustomImage src={Images.rightIconBlack} className="h-3 w-3" />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 10, marginBottom: 10 }}
      ></div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center">
          <CustomImage
            src={Images.buildingIconActive}
            className="min-w-4 mr-1 w-4"
          />
          <CustomText textClassName="text-sm">{address}</CustomText>
        </div>

        <div className="flex items-center">
          <CustomImage
            src={Images.spaceIconActive}
            className="min-w-4 mr-1 w-4"
          />
          <CustomText textClassName="text-sm">{roomName}</CustomText>
        </div>
      </div>

      {/*{_.isEqual(item.status, "In Progress") ? (*/}
      {/*  <div className="bg-error rounded-2xl h-3 w-3 absolute right-0 top-0"></div>*/}
      {/*) : (*/}
      {/*  false*/}
      {/*)}*/}
    </div>
  );
};

export default HelpCenterListingCard;
