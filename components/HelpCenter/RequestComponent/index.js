import DividerSection from "@/components/HelpCenter/DividerSection";
import BookingTextArea from "@/components/BookingTextArea";
import BookingSelect from "@/components/Booking/BookingSelect";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";
import Constant from "@/src/utils/Constant";
import { get, isEmpty, map, size } from "lodash";

const SpecificRequestComponent = ({
  selectNestedHelpCenterSection,
  setPostData,
  uploadVideoRef,
  uploadImageRef,
  onChangeImage,
  imageList,
  onClickRemoveImage,
  onChangeVideo,
  videoList,
  onClickRemoveVideo,
  onClickPopupImage,
  onClickPopupVideo,
}) => {
  const loading = get(videoList, ["loading"], false);
  const status = get(videoList, ["status"], false);
  const url = get(videoList, ["tempUrl"], "");
  const path = get(videoList, ["path"], "");

  return selectNestedHelpCenterSection ? (
    <div>
      <DividerSection
        title={"Please Specific The Request"}
        subtitle={"Choose to specific the issue."}
      />

      {/*<BookingSelect*/}
      {/*  bgColor="bg-white"*/}
      {/*  className="pb-2"*/}
      {/*  title={t("newRequest.selectIssue")}*/}
      {/*  placeholder={t("newRequest.selectIssue")}*/}
      {/*  lists={[{ name: t("newRequest.notWorking"), value: "not working" }]}*/}
      {/*/>*/}

      <BookingSelect
        required
        bgColor="bg-white border border-disable border-solid"
        className="pb-2"
        title={"Select Priority"}
        placeholder={"Select Priority"}
        disabled={false}
        lists={[
          { label: "Critical", value: Constant.CRITICAL },
          { label: "High", value: Constant.HIGH },
          { label: "Normal", value: Constant.NORMAL },
          { label: "Low", value: Constant.LOW },
        ]}
        onChange={(e) => {
          setPostData((prevState) => {
            return {
              ...prevState,
              priority: e.target.value,
            };
          });
        }}
      />

      <BookingTextArea
        required
        bgColor="bg-white border border-disable border-solid"
        className="pb-2"
        title={"Describe The Issue"}
        placeholder={"Enter your message"}
        onChange={(e) => {
          setPostData((prevState) => {
            const { request_type } = prevState;

            return {
              ...prevState,
              ...{
                [`${request_type === 1 ? "description" : "issues_description"}`]:
                  e.target.value,
              },
            };
          });
        }}
      />

      <CustomText textClassName="pb-2 text-xs">
        {"Upload Photo (max file size 2MB, up to 5 photo):"}
      </CustomText>

      <div className=" flex flex-row items-center gap-2 pb-3">
        {map(imageList, (list, index) => {
          const loading = get(list, ["loading"], false);
          const status = get(list, ["status"], false);
          const base64Image = get(list, ["base64"], "");
          const path = get(list, ["path"], "");

          return (
            <div
              key={index}
              onClick={() => onClickPopupImage(list)}
              className={`w-28 h-28 relative overflow-hidden flex justify-center items-center border ${status ? "border-available" : "border-error"} global-border-radius cursor-pointer`}
            >
              <CustomImage
                src={isEmpty(base64Image) ? Images.imageNotFound : base64Image}
                className={`${loading ? "opacity-50" : ""}`}
              />
              {loading ? (
                <span className="loading loading-spinner loading-lg text-primary absolute"></span>
              ) : (
                <div
                  className="absolute top-1 right-1 cursor-pointer bg-white rounded-2xl"
                  onClick={() => onClickRemoveImage(path)}
                >
                  <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {size(imageList) >= 5 ? (
          false
        ) : (
          <div
            className="bg-primary-background global-border-radius cursor-pointer flex items-center justify-center w-28 h-28"
            onClick={() => uploadImageRef && uploadImageRef.current.click()}
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

      <CustomText textClassName="pb-2 text-xs">
        {"Upload Video (max file size: 50MB, up to 1 video):"}
      </CustomText>

      <div className=" flex flex-row items-center gap-2 pb-3">
        {isEmpty(videoList) ? (
          false
        ) : (
          <div
            className={`w-28 h-28 relative flex justify-center items-center border ${status ? "border-available" : "border-error"} global-border-radius`}
          >
            {loading ? (
              false
            ) : (
              <CustomImage
                src={Images.playIcon}
                className="w-14 h-14 cursor-pointer"
                onClick={onClickPopupVideo}
              />
            )}

            {loading ? (
              <span className="loading loading-spinner loading-lg text-primary absolute"></span>
            ) : (
              <div
                className="absolute top-1 right-1 cursor-pointer z-10"
                onClick={() => onClickRemoveVideo(path)}
              >
                <CustomImage src={Images.deleteIcon} className="w-5 h-5" />
              </div>
            )}
          </div>
        )}

        {isEmpty(videoList) ? (
          <div
            className="bg-primary-background global-border-radius cursor-pointer flex items-center justify-center w-28 h-28"
            onClick={() => uploadVideoRef && uploadVideoRef.current.click()}
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
  ) : (
    false
  );
};

export default SpecificRequestComponent;
