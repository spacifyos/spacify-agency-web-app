import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import StatusLabel from "@/components/StatusLabel";
import SvgIcon from "@/components/SvgIcon";
import { isEmpty, map, get } from "lodash";
import moment from "moment";

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="py-2">
      <CustomText textClassName="text-xs text-muted mb-0.5">{label}</CustomText>
      <CustomText textClassName="text-sm text-black">{value}</CustomText>
    </div>
  );
};

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
  const slaDate = maintenanceTicketSelector.getSlaDate(data);

  const now = moment();
  const slaMoment = slaDate ? moment(slaDate, "DD MMM YYYY HH:mm A") : null;
  const isOverdue = slaMoment && slaMoment.isBefore(now);
  const daysUntilSla = slaMoment ? slaMoment.diff(now, "days") : null;

  const getSlaLabel = () => {
    if (!slaMoment) return null;
    if (isOverdue) return `Overdue ${Math.abs(daysUntilSla)}d`;
    if (daysUntilSla === 0) return "Due today";
    if (daysUntilSla === 1) return "Due tomorrow";
    return `${daysUntilSla}d left`;
  };

  const slaLabel = getSlaLabel();

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {/* Header: Request number + status + priority */}
      <div className="border-b border-border p-4">
        <div className="flex items-start justify-between">
          <div>
            <CustomText textClassName="text-base font-bold text-primary">
              {requestNumber}
            </CustomText>
            <CustomText textClassName="text-xs text-muted mt-0.5">
              {requestDate}
            </CustomText>
          </div>
          <div className="flex items-center gap-2">
            <StatusLabel status={status} />
            {priority && priority !== "N/A" && (
              <StatusLabelOutline status={priority} />
            )}
          </div>
        </div>

        {/* SLA badge */}
        {slaLabel && (
          <div className="mt-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                isOverdue
                  ? "bg-error/10 text-error"
                  : daysUntilSla <= 1
                    ? "bg-warning/10 text-warning"
                    : "bg-tertiary/10 text-tertiary"
              }`}
            >
              {slaLabel}
              {slaMoment && (
                <span className="ml-1.5 font-normal opacity-70">
                  {slaMoment.format("DD MMM YYYY")}
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Basic info */}
      <div className="p-4">
        <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Basic Information
        </CustomText>

        <div className="grid grid-cols-2 gap-x-4">
          <InfoRow label="Requester" value={requesterName} />
          <InfoRow label="Request Date" value={requestDate} />
        </div>

        <InfoRow label="Property" value={address} />
        <InfoRow label="Request Type" value={requestInfo} />

        {requestDetails && (
          <div className="py-2">
            <CustomText textClassName="text-xs text-muted mb-0.5">
              Request Details
            </CustomText>
            <CustomText textClassName="text-sm text-black whitespace-pre-wrap">
              {requestDetails}
            </CustomText>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4">
          <InfoRow
            label="Authorized Entry"
            value={isAllowedEntry ? "Yes" : "No"}
          />
          <InfoRow label="Availability" value={availableDate} />
        </div>
      </div>

      {/* Photos & Video */}
      {(!isEmpty(imageList) || !isEmpty(videoValue)) && (
        <div className="border-t border-border p-4">
          <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
            Attachments
          </CustomText>

          <div className="flex flex-wrap gap-2">
            {map(imageList, (list, index) => {
              const image = get(list, ["image"], "");
              return (
                <CustomImage
                  onClick={() => onClickPopupImage(index)}
                  key={index}
                  src={image}
                  className="h-20 w-20 cursor-pointer overflow-hidden rounded-xl border border-border object-cover"
                />
              );
            })}

            {!isEmpty(videoValue) && (
              <div
                className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface-secondary"
                onClick={onClickPopupVideo}
              >
                <SvgIcon name="play" color="active" size={32} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestOverviewDetail;
