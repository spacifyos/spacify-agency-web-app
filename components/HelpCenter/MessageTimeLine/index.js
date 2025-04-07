import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEmpty, isEqual, map } from "lodash";

const MessageTimeLine = ({ item, onClickSelectedCommentImage }) => {
  const date = get(item, ["date"], "");
  const images = get(item, ["images"], []);
  const name = get(item, ["name"], "");
  const content = get(item, ["content"], "");
  const isAuthor = get(item, ["is_author"], false);

  return (
    <div className="grid grid-cols-12 gap-1 h-full pb-4">
      <div className="flex flex-col justify-center items-center col-span-1">
        <CustomImage
          src={isAuthor ? Images.circleIconActive : Images.circleIconAqua}
          className="w-4 h-6"
        />
        <div className="h-full bg-disable w-0.5 mt-2.5"></div>
      </div>

      <div className="flex-col flex w-full col-span-11">
        <div className="flex flex-col gap-1 items-start pb-2">
          {/*<CustomImage*/}
          {/*  // src={img}*/}
          {/*  imageStyle={{ width: 40, height: 40 }}*/}
          {/*  className="rounded-3xl"*/}
          {/*/>*/}
          <CustomText textClassName="xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
            {name}
          </CustomText>
          <CustomText textClassName="text-xs text-disable text-end">
            {date}
          </CustomText>
        </div>

        {isEmpty(images) ? (
          <CustomText textClassName="bg-primary-background py-2 px-4 global-border-radius border text-sm">
            {content}
          </CustomText>
        ) : (
          <div className="flex gap-2">
            {map(images, (image, index) => (
              <CustomImage
                key={index}
                onClick={() => onClickSelectedCommentImage(image)}
                className="w-14 h-14 border global-border-radius cursor-pointer overflow-hidden"
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
