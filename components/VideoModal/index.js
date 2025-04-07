import CustomText from "@/components/CustomText";
import { get, isEmpty, replace } from "lodash";

const VideoModal = ({
  selectedVideo,
  onClickCloseVideoModal,
  openVideoModal,
}) => {
  const video = replace(get(selectedVideo, ["video"], ""), "quicktime", "mp4");
  const tempUrl = replace(
    get(selectedVideo, ["tempUrl"], ""),
    "quicktime",
    "mp4",
  );

  return openVideoModal ? (
    <div
      className="h-full fixed inset-0 z-10 flex-1 h-screen overflow-hidden flex flex-col justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <video
          src={isEmpty(video) ? tempUrl : video}
          controls
          className="w-full h-full"
        />
      </div>

      <div
        className="absolute top-1 right-1 z-10 w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={onClickCloseVideoModal}
      >
        <CustomText textClassName="text-lg text-white">X</CustomText>
      </div>
    </div>
  ) : (
    false
  );
};

export default VideoModal;
