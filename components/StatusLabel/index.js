import CustomText from "@/components/CustomText";
import { upperCase } from "lodash";

const StatusLabel = ({ status }) => {
  const statusColor = (status) => {
    const statusUpperCase = upperCase(status);

    switch (statusUpperCase) {
      case "PENDING":
      case "DUE SOON":
      case "AUTHORIZED":
      case "PENDING VERIFICATION":
      case "ON HOLD":
        return "bg-warning";

      case "IN PROGRESS":
      case "PENDING CONFIRMATION":
        return "bg-tertiary";

      case "COMPLETED":
      case "PAID":
      case "APPROVED":
      case "CLOSED":
        return "bg-available";

      case "CONFIRMED":
      case "NEW":
      case "UNPAID":
        return "bg-primary";

      case "CANCELLED":
      case "OVERDUE":
      case "REJECTED":
        return "bg-error";

      case "DRAFT":
        return "bg-disable";

      default:
        return "bg-warning";
    }
  };

  return (
    <div className="flex">
      <CustomText
        textClassName={`text-white text-center text-xs ${statusColor(status)} px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusLabel;
