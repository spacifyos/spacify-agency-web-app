import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { isEmpty, map } from "lodash";

const MediaInput = ({
  type = "image", // 'image' or 'video'
  value = [], // Now accepts an array of values
  loading = false,
  status = false,
  onRemove,
  onPopup,
  onShowSourceModal,
  uploadRef,
  uploadCameraRef,
  onChange,
  maxCount = 5,
  currentCount = 0,
  accept = type === "image" ? "image/*" : "video/mp4, video/quicktime",
  multiple = type === "image", // Enable multiple for images by default
}) => {
  return (
    <div className="flex flex-row items-center gap-2 pb-3">
      {map(value, (item, index) => {
        const isUploaded = !isEmpty(item?.path);
        const path = item?.path || "";
        const id = item?.id || "";
        const itemLoading = item?.loading || false;
        const itemStatus = item?.status || false;

        return (
          <div
            key={index}
            className={`relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden border ${
              isEmpty(path)
                ? ""
                : itemStatus
                  ? "border-available"
                  : "border-error"
            } global-border-radius`}
          >
            {itemLoading ? (
              false
            ) : (
              <CustomImage
                src={
                  type === "image"
                    ? item?.base64 || Images.imageNotFound
                    : Images.playIcon
                }
                className={type === "image" ? "" : "h-14 w-14 cursor-pointer"}
                onClick={() => onPopup && onPopup(index)}
              />
            )}

            {itemLoading ? (
              <span className="loading loading-spinner loading-lg absolute text-primary"></span>
            ) : (
              <div
                className="absolute right-1 top-1 z-10 cursor-pointer"
                onClick={() => onRemove && onRemove(id, type, isUploaded)}
              >
                <CustomImage src={Images.deleteIcon} className="h-5 w-5" />
              </div>
            )}
          </div>
        );
      })}

      {currentCount < maxCount ? (
        <div
          className="global-border-radius flex h-28 w-28 cursor-pointer items-center justify-center bg-primary-background"
          onClick={onShowSourceModal}
        >
          <CustomImage
            src={Images.addIconBlack}
            imageStyle={{ width: 20, height: 20 }}
          />
        </div>
      ) : (
        false
      )}

      <input
        accept={accept}
        type="file"
        multiple={multiple}
        hidden
        onChange={onChange}
        ref={uploadRef}
      />
      <input
        accept={accept}
        capture="environment"
        type="file"
        multiple={multiple}
        hidden
        onChange={onChange}
        ref={uploadCameraRef}
      />
    </div>
  );
};

export default MediaInput;
