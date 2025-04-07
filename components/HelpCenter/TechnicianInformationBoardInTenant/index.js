import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
import LocationMap from "@/components/HelpCenter/LocationMap";

const TechnicianInformationBoardInTenant = ({ data }) => {
  const technician = maintenanceTicketSelector.getTechnician(data);

  return isEmpty(technician) ? (
    false
  ) : (
    <div className="global-border-radius global-box-shadow bg-white p-4">
      <CustomText textClassName="text-disable text-sm">
        Technician Information Board
      </CustomText>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      {map(technician, (item, index) => {
        const technicianName =
          maintenanceTicketSelector.getTechnicianName(item);

        return (
          <div key={index}>
            <CustomLabelValue
              label={`Technician ${index + 1}`}
              value={technicianName}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TechnicianInformationBoardInTenant;
