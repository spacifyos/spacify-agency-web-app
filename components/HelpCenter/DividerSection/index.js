import CustomText from "@/components/CustomText";

const DividerSection = ({
  className,
  hideLine = false,
  title,
  subtitle,
}) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      {hideLine ? (
        false
      ) : (
        <div className="flex flex-col pb-4">
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-2"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-3"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-3"></div>
          <div className="divider divider-horizontal divider-warning help-center-divider pb-1 h-2"></div>
        </div>
      )}
      <CustomText textClassName="second-section-title">{title}</CustomText>

      <CustomText textClassName="text-disable text-xs mb-6 text-center">
        {subtitle}
      </CustomText>
    </div>
  );
};

export default DividerSection;
