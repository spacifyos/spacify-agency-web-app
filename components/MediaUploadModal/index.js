import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";

const MediaUploadModal = ({
  isOpen,
  onClose,
  onSelectSource,
  title = "Select Source",
  type = "image",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-2xl bg-surface p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar (mobile) */}
        <div className="mb-4 flex justify-center sm:hidden">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <CustomText textClassName="text-base font-semibold text-black mb-5">
          {title}
        </CustomText>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface-secondary p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
            onClick={() => onSelectSource("camera")}
          >
            <SvgIcon name="camera" color="active" size={32} />
            <CustomText textClassName="text-sm font-medium text-black">
              Camera
            </CustomText>
          </button>

          <button
            className="flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface-secondary p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
            onClick={() => onSelectSource("gallery")}
          >
            <SvgIcon name="image" color="active" size={32} />
            <CustomText textClassName="text-sm font-medium text-black">
              Gallery
            </CustomText>
          </button>
        </div>

        <button
          className="mt-4 w-full cursor-pointer rounded-xl py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MediaUploadModal;
