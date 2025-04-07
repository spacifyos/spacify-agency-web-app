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
    <div className="bg-black h-full fixed inset-0 z-10 flex-1 h-screen overflow-hidden flex flex-col gap-4 justify-center items-center">
      <div className="bg-white w-4/5 h-4/5 relative flex">
        <Image
          loader={() => (isEmpty(initImage) ? initBase64 : initImage)}
          alt={isEmpty(initImage) ? initBase64 : initImage}
          src={isEmpty(initImage) ? initBase64 : initImage}
          style={{ objectFit: "contain" }}
          sizes="100vw"
          fill
        />

        {size(imageList) >= 2 ? (
          <div className="flex-1 flex justify-center items-end gap-2">
            {map(imageList, (item, index) => {
              const image = get(item, ["image"], "");
              const base64 = get(item, ["base64"], "");

              return (
                <div
                  className="mb-4 overflow-hidden cursor-pointer relative"
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
                      className="absolute z-10 inset-0 border border-error border-2 flex justify-center items-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      onClick={() => onClickRemoveCommentImage(item)}
                    >
                      <CustomImage
                        src={Images.deleteIcon}
                        className="w-10 h-10"
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
        className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-3xl cursor-pointer"
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
