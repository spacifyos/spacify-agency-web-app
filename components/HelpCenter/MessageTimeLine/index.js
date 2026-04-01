import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEmpty, map } from "lodash";

const MessageTimeLine = ({ item, onClickSelectedCommentImage }) => {
  const date = get(item, ["date"], "");
  const images = get(item, ["images"], []);
  const name = get(item, ["name"], "");
  const content = get(item, ["content"], "");
  const isAuthor = get(item, ["is_author"], false);

  return (
    <div className={`flex gap-3 py-3 ${isAuthor ? "" : ""}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isAuthor
            ? "bg-primary/10 text-primary"
            : "bg-tertiary/10 text-tertiary"
        }`}
      >
        {name ? name.charAt(0).toUpperCase() : "?"}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <CustomText textClassName="text-sm font-semibold text-black">
            {name}
          </CustomText>
          <CustomText textClassName="text-xs text-muted shrink-0">
            {date}
          </CustomText>
        </div>

        {!isEmpty(content) && (
          <div
            className={`mt-1.5 rounded-2xl rounded-tl-sm px-3.5 py-2.5 ${
              isAuthor
                ? "bg-primary/5 border border-primary/10"
                : "bg-surface-secondary border border-border"
            }`}
          >
            <CustomText textClassName="text-sm text-black leading-relaxed">
              {content}
            </CustomText>
          </div>
        )}

        {!isEmpty(images) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {map(images, (image, index) => (
              <CustomImage
                key={index}
                onClick={() => onClickSelectedCommentImage(image)}
                className="h-16 w-16 cursor-pointer overflow-hidden rounded-xl border border-border object-cover transition-opacity hover:opacity-80"
                src={isEmpty(image) ? Images.imageNotFound : image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageTimeLine;
