import { map, get } from "lodash";
import DividerSection from "@/components/HelpCenter/DividerSection";
import CategoryCard from "@/components/HelpCenter/NewRequest/CategoryCard";

const NestedRequestComponents = ({
  onClickSelectNestedHelpCenterSection,
  selectNestedHelpCenterSection,
  subType,
}) => {
  return (
    <div className="grid grid-cols-4">
      <DividerSection
        className="col-span-4"
        title={"What Is This Enquiry About?"}
        subtitle={"Choose the category to specify the enquiry."}
      />
      {map(subType, (type, index) => {
        const label = get(type, "label", "");
        const description = get(type, "description", "");
        const value = get(type, "value", "");
        const icon = get(type, "icon", "");
        const iconActive = get(type, "iconActive", "");

        return (
          <CategoryCard
            key={index}
            icon={icon}
            iconActive={iconActive}
            value={value}
            selectedValue={selectNestedHelpCenterSection}
            btnDescription={description}
            btnText={label}
            onClickChangeSection={onClickSelectNestedHelpCenterSection}
          />
        );
      })}
    </div>
  );
};

export default NestedRequestComponents;
