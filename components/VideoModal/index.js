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
      className="fixed inset-0 z-10 flex h-full h-screen flex-1 flex-col items-center justify-center overflow-hidden"
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
          className="h-full w-full"
        />
      </div>

      <div
        className="absolute right-1 top-1 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded"
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
