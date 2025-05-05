import { get, isEmpty, isEqual, map, size } from "lodash";
import Image from "next/image";
import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
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
    <div className="fixed inset-0 z-10 flex h-screen flex-1 flex-col items-center justify-center gap-4 overflow-hidden bg-black">
      <div className="relative flex h-3/5 w-4/5 bg-white">
        <Image
          loader={() => (isEmpty(initImage) ? initBase64 : initImage)}
          alt={isEmpty(initImage) ? initBase64 : initImage}
          src={isEmpty(initImage) ? initBase64 : initImage}
          style={{ objectFit: "contain" }}
          sizes="100vw"
          fill
        />

        {size(imageList) >= 2 ? (
          <div className="flex flex-1 items-end justify-center gap-2">
            {map(imageList, (item, index) => {
              const image = get(item, ["image"], "");
              const base64 = get(item, ["base64"], "");

              return (
                <div
                  className="relative mb-4 cursor-pointer overflow-hidden"
                  style={{ width: 80, height: 60 }}
                  onClick={() => setSelectedCommentImage(item)}
                >
                  <Image
                    loader={() => (isEmpty(image) ? base64 : image)}
                    alt={isEmpty(image) ? base64 : image}
                    src={isEmpty(image) ? base64 : image}
                    fill
                  />

                  {isEqual(get(selectedImage, ["base64"], ""), base64) ? (
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center border border-2 border-error"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      onClick={() => onClickRemoveCommentImage(item)}
                    >
                      <CustomImage
                        src={Images.deleteIcon}
                        className="h-10 w-10"
                      />
                    </div>
                  ) : (
                    false
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          false
        )}
      </div>

      <div className="">
        <CustomButton
          buttonClassName="btn-primary min-w-28 min-h-10 h-10"
          buttonText="Send"
          onClick={onClickUploadCommentImage}
        />
      </div>

      <div
        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={onClickCloseModal}
      >
        <CustomText textClassName="text-lg text-white">X</CustomText>
      </div>
    </div>
  ) : (
    false
  );
};

export default CommentImageUploadModal;
