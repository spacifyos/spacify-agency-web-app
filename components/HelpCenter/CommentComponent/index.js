import CustomText from "@/components/CustomText";
import { isEmpty, map, size } from "lodash";
import MessageTimeLine from "@/components/HelpCenter/MessageTimeLine";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";
import MediaUploadModal from "@/components/MediaUploadModal";
import { useRef, useState } from "react";

const CommentComponent = ({
  onClickSendMessage,
  setMessageValue,
  messageValue,
  data,
  pagination,
  postCommentLoading,
  getCommentLoading,
  onClickLoadMore,
  onChangeCommentImage,
  uploadCommentImageRef,
  uploadCameraCommentImageRef,
  onClickSelectedCommentImage,
  userType,
  handleCommentImageSourceSelect,
  showImageSourceModal,
  setShowImageSourceModal,
}) => {
  const hasMorePage = maintenanceTicketSelector.getHasMorePages(pagination);
  const lastPage = maintenanceTicketSelector.getLastPage(pagination);
  const currentPage = maintenanceTicketSelector.getCurrentPage(pagination);

  return (
    <div className="h-full rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
      <CustomText textClassName="text-disable text-sm">Comment</CustomText>
      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      {getCommentLoading && isEmpty(data) ? (
        <div className="flex items-center justify-center py-4 text-primary">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isEmpty(data) ? (
        <div className="py-10">
          <CustomEmptyBox emptyTitle="No comment found" emptyDesc="" />
        </div>
      ) : (
        map(data, (item, index) => {
          return (
            <MessageTimeLine
              item={item}
              key={index}
              onClickSelectedCommentImage={onClickSelectedCommentImage}
            />
          );
        })
      )}

      {hasMorePage && lastPage > currentPage && !isEmpty(data) ? (
        <div className="flex justify-center py-4">
          {getCommentLoading && !isEmpty(data) ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            <div
              onClick={() => onClickLoadMore(currentPage)}
              className="cursor-pointer"
            >
              <CustomText textClassName="text-disable xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
                Load more
              </CustomText>
            </div>
          )}
        </div>
      ) : (
        false
      )}

      {!Helper.isTenant(userType) ? (
        <div className="flex items-center justify-center gap-2 pt-2">
          <div
            className="flex cursor-pointer items-center justify-center"
            onClick={() => setShowImageSourceModal(true)}
          >
            <CustomImage src={Images.imageIconDisable} className="h-10 w-10" />
          </div>
          <BookingInput
            bgColor="bg-white border border-disable"
            inputClassName="border-none"
            placeholder="Message"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <CustomButton
            buttonStyles={{ height: 40, minHeight: 40, maxHeight: 40 }}
            buttonClassName="btn-primary max-w-20 w-20 min-h-10 h-10"
            buttonText="Send"
            onClick={onClickSendMessage}
            loading={postCommentLoading}
            disable={postCommentLoading}
          />
        </div>
      ) : (
        false
      )}

      <input
        accept="image/*"
        type="file"
        multiple
        hidden
        onChange={onChangeCommentImage}
        ref={uploadCommentImageRef}
      />

      <input
        capture="environment"
        accept="image/*"
        type="file"
        multiple
        hidden
        onChange={onChangeCommentImage}
        ref={uploadCameraCommentImageRef}
      />

      <MediaUploadModal
        isOpen={showImageSourceModal}
        onClose={() => setShowImageSourceModal(false)}
        onSelectSource={handleCommentImageSourceSelect}
        title="Select Image Source"
        type="image"
      />
    </div>
  );
};

export default CommentComponent;
