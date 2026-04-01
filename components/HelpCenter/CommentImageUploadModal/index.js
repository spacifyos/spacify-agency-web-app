import { get, isEmpty, isEqual, map, size } from "lodash";
import Image from "next/image";
import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";
import CustomButton from "@/components/CustomButton";

const CommentImageUploadModal = ({
  open,
  imageList,
  selectedImage,
  onClickCloseModal,
  setSelectedCommentImage,
  onClickRemoveCommentImage,
  onClickUploadCommentImage,
}) => {
  const initImage = get(selectedImage, ["image"], "");
  const initBase64 = get(selectedImage, ["base64"], "");

  return open ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
      {/* Close button */}
      <button
        className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={onClickCloseModal}
      >
        <CustomText textClassName="text-lg text-white font-medium">
          X
        </CustomText>
      </button>

      {/* Main image */}
      <div className="relative flex h-3/5 w-11/12 max-w-lg overflow-hidden rounded-2xl bg-black">
        <Image
          loader={() => (isEmpty(initImage) ? initBase64 : initImage)}
          alt={isEmpty(initImage) ? initBase64 : initImage}
          src={isEmpty(initImage) ? initBase64 : initImage}
          style={{ objectFit: "contain" }}
          sizes="100vw"
          fill
        />

        {/* Thumbnail strip */}
        {size(imageList) >= 2 && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4">
            {map(imageList, (item, index) => {
              const image = get(item, ["image"], "");
              const base64 = get(item, ["base64"], "");
              const isSelected = isEqual(
                get(selectedImage, ["base64"], ""),
                base64,
              );

              return (
                <div
                  key={index}
                  className={`relative cursor-pointer overflow-hidden rounded-lg ${
                    isSelected
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ width: 64, height: 48 }}
                  onClick={() =>
                    isSelected
                      ? onClickRemoveCommentImage(item)
                      : setSelectedCommentImage(item)
                  }
                >
                  <Image
                    loader={() => (isEmpty(image) ? base64 : image)}
                    alt={isEmpty(image) ? base64 : image}
                    src={isEmpty(image) ? base64 : image}
                    fill
                    style={{ objectFit: "cover" }}
                  />

                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <SvgIcon name="delete" color="white" size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Send button */}
      <div className="mt-6">
        <CustomButton
          buttonClassName="btn-primary rounded-full px-8 py-2.5 h-auto min-h-0"
          textClassName="text-sm font-medium"
          buttonText="Send"
          onClick={onClickUploadCommentImage}
        />
      </div>
    </div>
  ) : null;
};

export default CommentImageUploadModal;
