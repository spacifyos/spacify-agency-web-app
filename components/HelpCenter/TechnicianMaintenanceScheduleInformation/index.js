import CustomText from "@/components/CustomText";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
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
  ticketTypeOptions,
  subTypeOptions,
}) => {
  const videoId = get(videos, ["id"], "");
  const loading = get(videos, ["loading"], false);
  const videoStatus = get(videos, ["status"], false);
  const url = get(videos, ["tempUrl"], "");
  const videoPath = get(videos, ["path"], "");
  const isUploadedVideo = isEmpty(videoPath) ? false : true;
  const status = maintenanceTicketSelector.getStatusValue(data);

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border p-4">
        <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
          Maintenance Schedule
        </CustomText>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <BookingSelect
          title={"Ticket Type"}
          placeholder={"Select type"}
          lists={ticketTypeOptions}
          disabled={false}
          bgColor="bg-surface border border-border"
          value={get(postData, ["request_type"], "")}
          onChange={(e) =>
            setPostData((prevState) => ({
              ...prevState,
              request_type: e.target.value,
              request_sub_type: "",
            }))
          }
        />

        <BookingSelect
          title={"Sub Type"}
          placeholder={"Select sub type"}
          lists={subTypeOptions}
          disabled={isEmpty(get(postData, ["request_type"], ""))}
          bgColor="bg-surface border border-border"
          value={get(postData, ["request_sub_type"], "")}
          onChange={(e) =>
            setPostData((prevState) => ({
              ...prevState,
              request_sub_type: e.target.value,
            }))
          }
        />

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
          bgColor="bg-surface border border-border"
          value={get(postData, ["status"], "")}
          onChange={(e) =>
            setPostData((prevState) => ({
              ...prevState,
              status: e.target.value,
            }))
          }
        />

        {isEqual(status, toString(Constant.TICKET_CLOSED)) && (
          <>
            <BookingTextArea
              bgColor="bg-surface border border-border"
              title={"Remarks"}
              placeholder={"Enter your message"}
              value={get(postData, ["technician_external_remarks"], "")}
              onChange={(e) =>
                setPostData((prevState) => ({
                  ...prevState,
                  technician_external_remarks: e.target.value,
                }))
              }
            />

            <BookingTextArea
              bgColor="bg-surface border border-border"
              title={"Internal Remarks"}
              placeholder={"Enter your message"}
              value={get(postData, ["technician_internal_remarks"], "")}
              onChange={(e) =>
                setPostData((prevState) => ({
                  ...prevState,
                  technician_internal_remarks: e.target.value,
                }))
              }
            />

            <div>
              <CustomText textClassName="text-xs font-medium text-black mb-2">
                Upload Photo (max 5MB, up to 5 photos)
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

            <div>
              <CustomText textClassName="text-xs font-medium text-black mb-2">
                Upload Video (max 50MB, up to 1 video)
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

            <MediaUploadModal
              isOpen={showImageSourceModal}
              onClose={() => setShowImageSourceModal(false)}
              onSelectSource={handleImageSourceSelect}
              title="Select Image Source"
              type="image"
            />

            <MediaUploadModal
              isOpen={showVideoSourceModal}
              onClose={() => setShowVideoSourceModal(false)}
              onSelectSource={handleVideoSourceSelect}
              title="Select Video Source"
              type="video"
            />
          </>
        )}

        <CustomButton
          buttonClassName="btn-primary w-full rounded-xl py-3"
          buttonText="Submit"
          onClick={onClickUpdateTicket}
          loading={ticketUpdateLoading}
          disable={ticketUpdateLoading}
        />

        <CustomText textClassName="text-xs text-muted text-center">
          Maintenance schedule information will be updated soon
        </CustomText>
      </div>
    </div>
  );
};

export default TechnicianMaintenanceScheduleInformation;
