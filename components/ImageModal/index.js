import CustomText from "@/components/CustomText";
import { Swiper, SwiperSlide } from "swiper/react";
import { get, head, isEmpty, map, size, isArray } from "lodash";
import Image from "next/image";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { Navigation } from "swiper/modules";

const ImageModal = ({
  data,
  selectedImage,
  onClickCloseImageModal,
  openImageModal,
}) => {
  const imageDataValidate = isEmpty(data) ? selectedImage : data;

  return openImageModal ? (
    <div
      className="fixed inset-0 z-10 flex h-full flex-1 flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {size(data) <= 1 ? (
        <div className="flex items-center justify-center overflow-hidden">
          <CustomImage
            src={
              isEmpty(imageDataValidate)
                ? isEmpty(selectedImage)
                  ? Images.imageNotFound
                  : selectedImage
                : isEmpty(get(head(imageDataValidate), ["image"], ""))
                  ? isArray(imageDataValidate)
                    ? head(imageDataValidate)
                    : imageDataValidate
                  : get(head(imageDataValidate), ["image"], "")
            }
            className="w-full"
          />
        </div>
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper image-modal-swiper"
          style={{ width: "100%", height: "100%" }}
          initialSlide={selectedImage}
        >
          {map(imageDataValidate, (item, index) => {
            const image = get(item, ["image"], "");
            const base64 = get(item, ["base64"], "");

            return (
              <SwiperSlide
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                >
                  <Image
                    loader={() =>
                      isEmpty(image) ? (isEmpty(base64) ? item : base64) : image
                    }
                    alt={
                      isEmpty(image) ? (isEmpty(base64) ? item : base64) : image
                    }
                    src={
                      isEmpty(image) ? (isEmpty(base64) ? item : base64) : image
                    }
                    style={{ objectFit: "contain" }}
                    sizes="100vw"
                    fill
                  />
                </div>

                <CustomText textClassName="text-white pt-2">{`${index + 1}/${size(data)}`}</CustomText>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div></div>

      <div
        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={onClickCloseImageModal}
      >
        <CustomText textClassName="text-lg text-white">X</CustomText>
      </div>
    </div>
  ) : (
    false
  );
};

export default ImageModal;
