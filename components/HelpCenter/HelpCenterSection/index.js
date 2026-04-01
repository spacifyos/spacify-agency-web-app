import { map, get, remove } from "lodash";
import CategoryCard from "@/components/HelpCenter/NewRequest/CategoryCard";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";

const HelpCenterSection = ({
  onClickChangeSection,
  selectSection,
  requestTypeOption,
}) => {
  const btnList = map(requestTypeOption, (option) => {
    const value = get(option, ["value"], "");

    switch (value) {
      case 1:
        return {
          ...option,
          ...{
            description: "Have A Question Or Want To Send Feedback",
            iconName: "generalEnquiry",
            iconColor: "white",
            iconActiveColor: "active",
          },
        };
      case 2:
        return {
          ...option,
          ...{
            description: "Submit Maintenance Requests For Issue Resolution",
            iconName: "maintenanceRequest",
            iconColor: "white",
            iconActiveColor: "active",
          },
        };
    }
  });

  const removeEnquiry = remove(btnList, (item) => item.value === 2);

  return (
    <div className="grid grid-cols-2">
      {map(removeEnquiry, (item, index) => {
        const label = get(item, "label", "");
        const description = get(item, "description", "");
        const value = get(item, "value", "");
        const iconName = get(item, "iconName", "");
        const iconColor = get(item, "iconColor", "");
        const iconActiveColor = get(item, "iconActiveColor", "");
        const subType = maintenanceTicketSelector.getRequestTypeSubType(item);

        return (
          <CategoryCard
            key={index}
            iconName={iconName}
            iconColor={iconColor}
            iconActiveColor={iconActiveColor}
            value={value}
            selectedValue={selectSection}
            btnDescription={description}
            btnText={label}
            subType={subType}
            onClickChangeSection={onClickChangeSection}
          />
        );
      })}
    </div>
  );
};

export default HelpCenterSection;
