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
    <div className="grid grid-cols-12 gap-1 pb-4">
      <div className="col-span-1 flex flex-col items-center justify-center">
        <CustomImage
          src={isAuthor ? Images.circleIconActive : Images.circleIconAqua}
          className="h-6 w-4"
        />
        <div className="mt-2.5 h-full w-0.5 bg-disable"></div>
      </div>

      <div className="col-span-11 flex w-full flex-col">
        <div className="flex flex-col items-start gap-1 pb-2">
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
                className="global-border-radius h-14 w-14 cursor-pointer overflow-hidden border"
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
