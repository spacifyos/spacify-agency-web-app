import Image from "next/image";
import Images from "@/src/utils/Image";

const CustomImage = ({
  className = "",
  src,
  imageStyle,
  onClick = () => {},
  props,
}) => {
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=100%&q=${quality || 75}`;
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        ...imageStyle,
      }}
      onClick={onClick}
    >
      <Image
        loader={imageLoader}
        // loading="lazy"
        // layout="responsive"
        alt={"image"}
        src={src}
        width={0}
        height={0}
        style={{ objectFit: "contain", width: "100%" }}
        // objectFit="cover"
        {...props}
      />
    </div>
  );
};

export default CustomImage;
