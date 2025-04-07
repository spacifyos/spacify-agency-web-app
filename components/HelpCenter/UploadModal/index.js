import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomModal from "@/components/CustomModal";

const UploadModal = ({
  changeUploadModalTitle,
  onClickOpenCamera,
  onClickSelectFile,
}) => {
  return (
    <CustomModal id="help_center_upload_modal">
      <CustomText textClassName="font-bold mb-5">
        {changeUploadModalTitle ? "Upload Photo" : "Upload Video"}
      </CustomText>

      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <CustomImage
            className="bg-white p-2 cursor-pointer mb-2"
            src={Images.cameraIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickOpenCamera}
          />
          <CustomText textClassName="font-bold text-sm">Camera</CustomText>
        </div>

        <div className="flex flex-col items-center">
          <CustomImage
            className="bg-white p-2 cursor-pointer mb-2"
            src={Images.albumIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickSelectFile}
          />
          <CustomText textClassName="font-bold text-sm">Album</CustomText>
        </div>

        <div className="flex flex-col items-center">
          <CustomImage
            className="bg-white p-2 cursor-pointer mb-2"
            src={Images.primaryTermAndConditionIcon}
            imageStyle={{ borderRadius: 100, width: 60, height: 60 }}
            onClick={onClickSelectFile}
          />
          <CustomText textClassName="font-bold text-sm">Document</CustomText>
        </div>
      </div>
    </CustomModal>
  );
};

export default UploadModal;
