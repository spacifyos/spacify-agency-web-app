import CustomText from "@/components/CustomText";
import { isEmpty, map, size } from "lodash";
import MessageTimeLine from "@/components/HelpCenter/MessageTimeLine";
import CustomButton from "@/components/CustomButton";
import BookingInput from "@/components/Booking/BookingInput";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import SvgIcon from "@/components/SvgIcon";
import Helper from "@/src/utils/Helper";
import MediaUploadModal from "@/components/MediaUploadModal";

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
  showCommentImageSourceModal,
  setShowCommentImageSourceModal,
}) => {
  const hasMorePage = maintenanceTicketSelector.getHasMorePages(pagination);
  const lastPage = maintenanceTicketSelector.getLastPage(pagination);
  const currentPage = maintenanceTicketSelector.getCurrentPage(pagination);

  return (
    <div className="rounded-2xl border border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border p-4">
        <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
          Comments
        </CustomText>
      </div>

      {/* Comment list */}
      <div className="p-4">
        {getCommentLoading && isEmpty(data) ? (
          <div className="flex items-center justify-center py-6 text-primary">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : isEmpty(data) ? (
          <div className="py-6">
            <CustomEmptyBox emptyTitle="No comments yet" emptyDesc="" />
          </div>
        ) : (
          <div className="flex flex-col">
            {map(data, (item, index) => (
              <MessageTimeLine
                item={item}
                key={index}
                onClickSelectedCommentImage={onClickSelectedCommentImage}
              />
            ))}
          </div>
        )}

        {hasMorePage && lastPage > currentPage && !isEmpty(data) && (
          <div className="flex justify-center py-3">
            {getCommentLoading && !isEmpty(data) ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              <button
                onClick={() => onClickLoadMore(currentPage)}
                className="cursor-pointer text-xs font-medium text-primary hover:underline"
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>

      {/* Message input */}
      {!Helper.isTenant(userType) && (
        <div className="flex items-center gap-2 border-t border-border p-3">
          <button
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-surface-secondary"
            onClick={() => setShowCommentImageSourceModal(true)}
          >
            <SvgIcon name="image" color="disable" size={20} />
          </button>
          <div className="flex-1">
            <BookingInput
              bgColor="bg-surface-secondary border border-border"
              inputClassName="border-none text-sm"
              placeholder="Write a message..."
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
          </div>
          <CustomButton
            buttonClassName="btn-primary rounded-full px-4 py-1.5 h-auto min-h-0 shrink-0"
            textClassName="text-xs font-medium"
            buttonText="Send"
            onClick={onClickSendMessage}
            loading={postCommentLoading}
            disable={postCommentLoading}
          />
        </div>
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
        isOpen={showCommentImageSourceModal}
        onClose={() => setShowCommentImageSourceModal(false)}
        onSelectSource={handleCommentImageSourceSelect}
        title="Select Comment Image Source"
        type="image"
      />
    </div>
  );
};

export default CommentComponent;
