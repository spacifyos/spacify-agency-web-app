import Images from "@/src/utils/Image";
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
            icon: Images.generalEnquiryIconWhite,
            iconActive: Images.generalEnquiryIconActive,
          },
        };
      case 2:
        return {
          ...option,
          ...{
            description: "Submit Maintenance Requests For Issue Resolution",
            icon: Images.maintenanceRequestIconWhite,
            iconActive: Images.maintenanceRequestIconActive,
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
        const icon = get(item, "icon", "");
        const iconActive = get(item, "iconActive", "");
        const subType = maintenanceTicketSelector.getRequestTypeSubType(item);

        return (
          <CategoryCard
            key={index}
            icon={icon}
            iconActive={iconActive}
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
