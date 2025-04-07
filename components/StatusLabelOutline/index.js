import CustomText from "@/components/CustomText";
import Constant from "@/src/utils/Constant";
import _ from "lodash";

const StatusBorder = ({ status }) => {
  const statusBorderColor = (status) => {
    const statusUpperCase = _.upperCase(status);

    switch (statusUpperCase) {
      case "HIGH":
        return "border-warning text-warning";
      case "CRITICAL":
        return "border-primary text-primary";
      case "NORMAL":
        return "border-available text-available";
      case "LOW":
        return "border-tertiary text-tertiary";

      default:
        return "border-warning text-warning";
    }
  };

  return (
    <div className="flex">
      <CustomText
        textClassName={`font-bold text-xs ${statusBorderColor(status)} border px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusBorder;
