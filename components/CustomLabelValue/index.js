import CustomText from "@/components/CustomText";

const CustomLabelValue = ({
  label,
  value,
  className = "",
  highlight = false,
  styles,
}) => {
  return (
    <div className={`pb-4 ${className}`} style={styles}>
      <CustomText textClassName={`text-disable text-xs font-normal pb-1`}>
        {label}
      </CustomText>
      <CustomText
        textClassName={`text-sm ${highlight ? "text-primary" : "text-black"} font-bold`}
      >
        {value}
      </CustomText>
    </div>
  );
};

export default CustomLabelValue;
