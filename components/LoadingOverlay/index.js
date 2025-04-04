import { useEffect } from "react";
import Helper from "@/src/utils/Helper";

const LoadingOverlay = ({ loading = false }) => {
  const content = Helper.documentGetElementById("root-body");

  useEffect(() => {
    if (content) {
      content.style.overflow = loading ? "hidden" : "auto";
    }
  }, [loading]);

  return loading ? (
    <div
      className={
        "fixed top-0 left-0 flex justify-center items-center h-full w-full"
      }
      style={{ backgroundColor: "rgba(256,256,256,0.5)", zIndex: 9999 }}
    >
      <span className="loading loading-dots loading-lg text-neutral"></span>
    </div>
  ) : (
    false
  );
};

export default LoadingOverlay;
