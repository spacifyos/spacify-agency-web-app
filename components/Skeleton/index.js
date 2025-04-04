import { random } from "lodash";

const Skeleton = ({
  height,
  width,
  minWidth = "100%",
  className,
  hideText = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full mr-2">
      <div
        className={`skeleton ${className}`}
        style={{
          height: height,
          width: width,
          minWidth: minWidth,
          backgroundColor: "#e4e5e9",
          backgroundImage:
            "linear-gradient(105deg,transparent 0%,transparent 40%, #FFF 50%,transparent 60%,transparent 100%)",
        }}
      ></div>
      {hideText ? (
        false
      ) : (
        <div className="flex items-center xl:h-10 lg:h-10 md:h-10 sm:h-10 h-8">
          <div
            className="skeleton"
            style={{
              height: 20,
              width: random(50, 80),
              backgroundColor: "#e4e5e9",
              backgroundImage:
                "linear-gradient(105deg,transparent 0%,transparent 40%, #FFF 50%,transparent 60%,transparent 100%)",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Skeleton;
