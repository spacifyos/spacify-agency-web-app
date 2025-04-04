import { isEmpty } from "lodash";

const getLineClamp = (lineClamp) => {
  switch (lineClamp) {
    case 1:
      return "line-clamp-1";
    case 2:
      return "line-clamp-2";
    case 3:
      return "line-clamp-3";
    case 4:
      return "line-clamp-4";
    default:
      return 0;
  }
};

const CustomText = ({
  children,
  styles,
  textClassName = "",
  lineClamp,
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={`${textClassName} ${isEmpty(lineClamp) || lineClamp == 0 ? "" : getLineClamp(lineClamp)}`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
