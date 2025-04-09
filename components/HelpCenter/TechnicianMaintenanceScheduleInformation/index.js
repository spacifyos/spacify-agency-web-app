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
  onChangeImage,
  uploadVideoRef,
  onChangeVideo,
  onClickUpdateTicket,
  onClickCheckIn,
  ticketUpdateLoading,
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
              {"Upload Photo (max file size 2MB, up to 5 photo):"}
            </CustomText>
            <div className="flex flex-row items-center gap-2 pb-3">
              {map(images, (list, index) => {
                const loading = get(list, ["loading"], false);
                const status = get(list, ["status"], false);
                const base64Image = get(list, ["base64"], "");
                const path = get(list, ["path"], "");
                const id = get(list, ["id"], "");

                const isUploadedImage = isEmpty(path) ? false : true;

                return (
                  <div
                    key={index}
                    className={`relative flex h-28 w-28 items-center justify-center overflow-hidden border ${isEmpty(path) ? "" : status ? "border-available" : "border-error"} global-border-radius cursor-pointer`}
                  >
                    <CustomImage
                      onClick={() => onClickPopupImage(index, "technician")}
                      src={
                        isEmpty(base64Image)
                          ? Images.imageNotFound
                          : base64Image
                      }
                      className={`${loading ? "opacity-50" : ""}`}
                    />
                    {loading ? (
                      <span className="loading loading-spinner loading-lg absolute text-primary"></span>
                    ) : (
                      <div
                        className="absolute right-1 top-1 cursor-pointer rounded-2xl bg-white"
                        onClick={() =>
                          onClickRemoveGallery(id, "image", isUploadedImage)
                        }
                      >
                        <CustomImage
                          src={Images.deleteIcon}
                          className="h-5 w-5"
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {size(images) >= 5 ? (
                false
              ) : (
                <div
                  className="global-border-radius flex h-28 w-28 cursor-pointer items-center justify-center bg-primary-background"
                  onClick={() =>
                    uploadImageRef && uploadImageRef.current.click()
                  }
                >
                  <CustomImage
                    src={Images.addIconBlack}
                    imageStyle={{ width: 20, height: 20 }}
                  />

                  <input
                    capture="environment"
                    accept="image/*"
                    type="file"
                    multiple
                    hidden
                    onChange={onChangeImage}
                    ref={uploadImageRef}
                  ></input>
                </div>
              )}
            </div>
          </div>

          <div className="pb-4">
            <CustomText textClassName="text-xs pb-1">
              {"Upload Video (max file size: 50MB, up to 1 video):"}
            </CustomText>
            <div className="flex flex-row items-center gap-2 pb-3">
              {isEmpty(videos) ? (
                false
              ) : (
                <div
                  className={`relative flex h-28 w-28 items-center justify-center border ${isEmpty(videoPath) ? "" : videoStatus ? "border-available" : "border-error"} global-border-radius`}
                >
                  {loading ? (
                    false
                  ) : (
                    <CustomImage
                      src={Images.playIcon}
                      className="h-14 w-14 cursor-pointer"
                      onClick={() => onClickPopupVideo("technician")}
                    />
                  )}

                  {loading ? (
                    <span className="loading loading-spinner loading-lg absolute text-primary"></span>
                  ) : (
                    <div
                      className="absolute right-1 top-1 z-10 cursor-pointer"
                      onClick={() =>
                        onClickRemoveGallery(videoId, "video", isUploadedVideo)
                      }
                    >
                      <CustomImage
                        src={Images.deleteIcon}
                        className="h-5 w-5"
                      />
                    </div>
                  )}
                </div>
              )}

              {isEmpty(videos) ? (
                <div
                  className="global-border-radius flex h-28 w-28 cursor-pointer items-center justify-center bg-primary-background"
                  onClick={() =>
                    uploadVideoRef && uploadVideoRef.current.click()
                  }
                >
                  <CustomImage
                    src={Images.addIconBlack}
                    imageStyle={{ width: 20, height: 20 }}
                  />

                  <input
                    capture="environment"
                    accept="video/mp4, video/quicktime"
                    type="file"
                    multiple
                    hidden
                    onChange={onChangeVideo}
                    ref={uploadVideoRef}
                  ></input>
                </div>
              ) : (
                false
              )}
            </div>
          </div>
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
