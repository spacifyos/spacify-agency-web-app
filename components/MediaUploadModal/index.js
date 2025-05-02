import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const MediaUploadModal = ({
  isOpen,
  onClose,
  onSelectSource,
  title = "Select Source",
  type = "image", // 'image' or 'video'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-primary-background px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <CustomText textClassName="text-sm font-semibold ">
            {title}
          </CustomText>

          <CustomImage
            onClick={onClose}
            src={Images.closeIconBlack}
            className="w-3 cursor-pointer"
          />
        </div>

        <div className="flex flex-row gap-3 pb-4">
          <div
            className="flex cursor-pointer flex-col items-center gap-1"
            onClick={() => onSelectSource("camera")}
          >
            <div className="rounded-3xl bg-white p-3">
              <CustomImage src={Images.cameraIconActive} className="w-8" />
            </div>

            <CustomText textClassName="text-xs">Camera</CustomText>
          </div>
          <div
            className="flex cursor-pointer flex-col items-center gap-1"
            onClick={() => onSelectSource("gallery")}
          >
            <div className="rounded-3xl bg-white p-3">
              <CustomImage src={Images.imageIconActive} className="w-8" />
            </div>
            <CustomText textClassName="text-xs">Gallery</CustomText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;
