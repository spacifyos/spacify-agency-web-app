import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import CustomLabelValue from "@/components/CustomLabelValue";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import StatusLabel from "@/components/StatusLabel";
import { isEmpty, map, get } from "lodash";
import Images from "@/src/utils/Image";

const RequestOverviewDetail = ({
  data,
  imageList,
  imageLoading,
  videoValue,
  videoLoading,
  onClickPopupImage,
  onClickPopupVideo,
}) => {
  const status = maintenanceTicketSelector.getStatusLabel(data);
  const priority = maintenanceTicketSelector.getPriorityLabel(data);
  const requestDate = maintenanceTicketSelector.getRequestDate(data);
  const availableDate = maintenanceTicketSelector.getAvailableDate(data);
  const requestNumber = maintenanceTicketSelector.getRequestNumber(data);
  const requestInfo = maintenanceTicketSelector.getRequestInfo(data);
  const address = maintenanceTicketSelector.getPropertyName(data);
  const requesterName = maintenanceTicketSelector.getRequesterName(data);
  const requestDetails = maintenanceTicketSelector.getRequestDetails(data);
  const isAllowedEntry = maintenanceTicketSelector.getIsAllowedEntry(data);

  return (
    <div className="rounded-3xl bg-white p-8">
      <div className="flex justify-between">
        <CustomLabelValue
          label="Request Number"
          value={requestNumber}
          highlight
        />
        <div>
          <CustomText textClassName={`text-disable text-xs font-normal pb-1`}>
            Status
          </CustomText>
          <StatusLabel status={status} />
        </div>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 0, marginBottom: 16 }}
      ></div>

      <div className="flex items-center justify-between">
        <CustomText textClassName="text-disable text-xs">
          Basic Information
        </CustomText>
        <StatusLabelOutline status={priority} />
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      <div className="flex justify-between">
        <CustomLabelValue label={"Requester"} value={requesterName} />
        <CustomLabelValue label={"Request Date"} value={requestDate} />
      </div>

      <CustomLabelValue label={"Property"} value={address} />

      <CustomLabelValue label={"Request Type"} value={requestInfo} />

      <CustomLabelValue label={"Request Details"} value={requestDetails} />

      {!isEmpty(imageList) ? (
        <div className="pb-4">
          <CustomText textClassName="text-disable text-xs pb-1">
            Photos
          </CustomText>
          <div className="flex items-start gap-2">
            {map(imageList, (list, index) => {
              const image = get(list, ["image"], "");

              return (
                <CustomImage
                  onClick={() => onClickPopupImage(index)}
                  key={index}
                  src={image}
                  className="global-border-radius h-28 w-28 cursor-pointer overflow-hidden border"
                />
              );
            })}
          </div>
        </div>
      ) : (
        false
      )}

      {!isEmpty(videoValue) ? (
        <div className="pb-4">
          <CustomText textClassName="text-disable text-xs pb-1">
            Video
          </CustomText>
          <div
            className={`global-border-radius relative flex h-28 w-28 items-center justify-center border`}
          >
            <CustomImage
              src={Images.playIcon}
              className="h-14 w-14 cursor-pointer"
              onClick={onClickPopupVideo}
            />
          </div>
        </div>
      ) : (
        false
      )}

      <CustomLabelValue
        label={"Authorized Entry When Requester Is Absent"}
        value={isAllowedEntry ? "Yes" : "No"}
      />

      <CustomLabelValue label={"Availability"} value={availableDate} />
    </div>
  );
};

export default RequestOverviewDetail;
