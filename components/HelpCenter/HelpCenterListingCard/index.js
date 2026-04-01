import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import StatusLabelOutline from "@/components/StatusLabelOutline";
import SvgIcon from "@/components/SvgIcon";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { isEqual, isEmpty } from "lodash";
import moment from "moment";

const HelpCenterListingCard = ({ data, onClickToRequestOverview }) => {
  const id = maintenanceTicketSelector.getId(data);
  const status = maintenanceTicketSelector.getStatus(data);
  const priority = maintenanceTicketSelector.getPriority(data);
  const date = maintenanceTicketSelector.getCreatedAt(data);
  const requestNumber = maintenanceTicketSelector.getRequestNumber(data);
  const requestInfo = maintenanceTicketSelector.getRequestInfo(data);
  const address = maintenanceTicketSelector.getPropertyUnitName(data);
  const roomName = maintenanceTicketSelector.getRoomName(data);
  const slaDate = maintenanceTicketSelector.getSlaDate(data);

  const now = moment();
  const slaMoment = slaDate ? moment(slaDate, "DD MMM YYYY HH:mm A") : null;
  const isOverdue = slaMoment && slaMoment.isBefore(now);
  const daysUntilSla = slaMoment ? slaMoment.diff(now, "days") : null;

  const getSlaLabel = () => {
    if (!slaMoment) return null;
    if (isOverdue) {
      const daysOver = Math.abs(daysUntilSla);
      return `Overdue ${daysOver}d`;
    }
    if (daysUntilSla === 0) return "Due today";
    if (daysUntilSla === 1) return "Due tomorrow";
    return `${daysUntilSla}d left`;
  };

  const slaLabel = getSlaLabel();

  return (
    <div
      className={`cursor-pointer rounded-2xl border bg-surface p-4 transition-colors hover:bg-surface-secondary ${
        isOverdue ? "border-error/30" : "border-border"
      }`}
      onClick={() => onClickToRequestOverview(id)}
    >
      {/* Top row: status + priority + SLA */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <StatusLabel status={status} />
          {isEqual(priority, "N/A") ? null : (
            <StatusLabelOutline status={priority} />
          )}
        </div>
        {slaLabel && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isOverdue
                ? "bg-error/10 text-error"
                : daysUntilSla <= 1
                  ? "bg-warning/10 text-warning"
                  : "bg-tertiary/10 text-tertiary"
            }`}
          >
            {slaLabel}
          </span>
        )}
      </div>

      {/* Request number + info */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex-1 pr-3">
          <CustomText textClassName="font-semibold text-sm text-black">
            {requestNumber}
          </CustomText>
          <CustomText textClassName="text-muted text-xs mt-0.5" lineClamp={1}>
            {requestInfo}
          </CustomText>
        </div>
        <SvgIcon name="right" color="disable" size={14} />
      </div>

      {/* Footer: location + date */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <SvgIcon name="building" color="active" size={14} />
          <CustomText textClassName="text-xs text-muted" lineClamp={1}>
            {address}
          </CustomText>
        </div>
        <CustomText textClassName="text-xs text-muted shrink-0 pl-2">
          {date}
        </CustomText>
      </div>
    </div>
  );
};

export default HelpCenterListingCard;
