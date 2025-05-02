import CustomText from "@/components/CustomText";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, isEmpty, isEqual, map, size, toString } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BookingTextArea from "@/components/BookingTextArea";
import CustomButton from "@/components/CustomButton";
import BookingSelect from "@/components/Booking/BookingSelect";
import Constant from "@/src/utils/Constant";
import MediaUploadModal from "@/components/MediaUploadModal";
import MediaInput from "@/components/MediaInput";

const TechnicianMaintenanceScheduleInformation = ({
  data,
  images,
  videos,
  onClickPopupImage,
  onClickPopupVideo,
  onClickRemoveGallery,
  setPostData,
  postData,
  uploadImageRef,
  uploadCameraImageRef,
  onChangeImage,
  uploadVideoRef,
  uploadCameraVideoRef,
  onChangeVideo,
  onClickUpdateTicket,
  onClickCheckIn,
  ticketUpdateLoading,
  handleImageSourceSelect,
  handleVideoSourceSelect,
  showImageSourceModal,
  setShowImageSourceModal,
  showVideoSourceModal,
  setShowVideoSourceModal,
}) => {
  const videoId = get(videos, ["id"], "");
  const loading = get(videos, ["loading"], false);
  const videoStatus = get(videos, ["status"], false);
  const url = get(videos, ["tempUrl"], "");
  const videoPath = get(videos, ["path"], "");
  const isUploadedVideo = isEmpty(videoPath) ? false : true;
  const status = maintenanceTicketSelector.getStatusValue(data);

  return (
    <div className="rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
      <div className="flex items-center justify-between">
        <CustomText textClassName="text-disable text-sm">
          Maintenance Schedule Information
        </CustomText>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      <BookingSelect
        title={"Status"}
        placeholder={"Select status"}
        lists={[
          { label: "New", value: Constant.TICKET_NEW },
          { label: "Pending", value: Constant.TICKET_PENDING },
          { label: "On Hold", value: Constant.TICKET_ON_HOLD },
          { label: "In Progress", value: Constant.TICKET_IN_PROGRESS },
          { label: "Cancelled", value: Constant.TICKET_CANCELLED },
          { label: "Closed", value: Constant.TICKET_CLOSED },
        ]}
        disabled={false}
        bgColor="bg-white border border-disable"
        className="pb-4"
        value={get(postData, ["status"], "")}
        onChange={(e) =>
          setPostData((prevState) => {
            return {
              ...prevState,
              ...{ status: e.target.value },
            };
          })
        }
      />

      {isEqual(status, toString(Constant.TICKET_CLOSED)) ? (
        <>
          <BookingTextArea
            bgColor="bg-white border border-disable"
            className="pb-4"
            title={"Remarks"}
            placeholder={"Enter your message"}
            value={get(postData, ["technician_external_remarks"], "")}
            onChange={(e) => {
              setPostData((prevState) => {
                return {
                  ...prevState,
                  ...{ technician_external_remarks: e.target.value },
                };
              });
            }}
          />

          <BookingTextArea
            bgColor="bg-white border border-disable"
            className="pb-4"
            title={"Internal Remarks"}
            placeholder={"Enter your message"}
            value={get(postData, ["technician_internal_remarks"], "")}
            onChange={(e) => {
              setPostData((prevState) => {
                return {
                  ...prevState,
                  ...{ technician_internal_remarks: e.target.value },
                };
              });
            }}
          />

          <div className="pb-4">
            <CustomText textClassName="text-xs pb-1">
              {"Upload Photo (max file size 5MB, up to 5 photo):"}
            </CustomText>
            <MediaInput
              type="image"
              value={images}
              loading={loading}
              status={videoStatus}
              onRemove={onClickRemoveGallery}
              onPopup={onClickPopupImage}
              onShowSourceModal={() => setShowImageSourceModal(true)}
              uploadRef={uploadImageRef}
              uploadCameraRef={uploadCameraImageRef}
              onChange={onChangeImage}
              maxCount={5}
              currentCount={size(images)}
              multiple={true}
            />
          </div>

          <div className="pb-4">
            <CustomText textClassName="text-xs pb-1">
              {"Upload Video (max file size: 50MB, up to 1 video):"}
            </CustomText>
            <MediaInput
              type="video"
              value={[videos].filter(Boolean)}
              loading={loading}
              status={videoStatus}
              onRemove={onClickRemoveGallery}
              onPopup={onClickPopupVideo}
              onShowSourceModal={() => setShowVideoSourceModal(true)}
              uploadRef={uploadVideoRef}
              uploadCameraRef={uploadCameraVideoRef}
              onChange={onChangeVideo}
              maxCount={1}
              currentCount={isEmpty(videos) ? 0 : 1}
              multiple={false}
            />
          </div>

          {/* Image Source Selection Modal */}
          <MediaUploadModal
            isOpen={showImageSourceModal}
            onClose={() => setShowImageSourceModal(false)}
            onSelectSource={handleImageSourceSelect}
            title="Select Image Source"
            type="image"
          />

          {/* Video Source Selection Modal */}
          <MediaUploadModal
            isOpen={showVideoSourceModal}
            onClose={() => setShowVideoSourceModal(false)}
            onSelectSource={handleVideoSourceSelect}
            title="Select Video Source"
            type="video"
          />
        </>
      ) : (
        false
      )}

      <div className="flex justify-center">
        <CustomButton
          buttonStyles={{ padding: "5px 30px" }}
          buttonClassName="btn-primary"
          buttonText={"Submit"}
          onClick={onClickUpdateTicket}
          loading={ticketUpdateLoading}
          disable={ticketUpdateLoading}
        />
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <CustomText textClassName="text-disable text-xs">
          Maintenance Schedule Information Will Be Updated Soon
        </CustomText>
      </div>
    </div>
  );
};

export default TechnicianMaintenanceScheduleInformation;
