import * as authSelector from "@/src/selectors/auth";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const DesktopProfileCard = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div
      className="xl:h-36 lg:h-36 md:h-36 sm:h-48 h-44 p-5 overflow-hidden global-box-shadow global-border-radius bg-white flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col items-center relative"
      style={{ minHeight: 140 }}
    >
      <a
        href={"/user/edit-profile"}
        className="absolute right-5 top-5 cursor-pointer"
      >
        <CustomImage src={Images.editIconDisable} className="w-5" />
      </a>

      <CustomImage
        src={Images.userIconActive}
        className="rounded-2xl xl:w-20 lg:w-20 md:w-20 sm:w-20 w-16"
      />

      <div className="overflow-hidden">
        <CustomText textClassName="text-sm font-bold text-primary pb-2 xl:text-left lg:text-left md:text-left sm:text-center text-center">
          {isEmpty(name) ? "-" : name}
        </CustomText>

        <CustomText textClassName="text-xs leading-3 line-clamp-1 xl:text-left lg:text-left md:text-left sm:text-center text-center">
          {isEmpty(phoneNumber) ? "-" : phoneNumber}
        </CustomText>

        <CustomText textClassName="text-xs line-clamp-1 xl:text-left lg:text-left md:text-left sm:text-center text-center">
          {isEmpty(email) ? "-" : email}
        </CustomText>
      </div>
    </div>
  );
};

export default DesktopProfileCard;
