import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as authSelector from "@/src/selectors/auth";
import { isEmpty } from "lodash";

const ProfileCard = ({ data }) => {
  const name = authSelector.getName(data);
  const email = authSelector.getEmail(data);
  const phoneNumber = authSelector.getPhoneNumber(data);

  return (
    <div className="profile-user-info-container col-span-3">
      <a
        href={"/user/edit-profile"}
        className="absolute right-3 top-3 cursor-pointer"
      >
        <CustomImage src={Images.editIcon} imageStyle={{ width: 23 }} />
      </a>

      <CustomImage
        src={Images.userIcon}
        imageStyle={{ width: 46 }}
        className="rounded-2xl"
      />

      <CustomText textClassName="text-lgfont-bold text-primary pb-2 text-center">
        {isEmpty(name) ? "-" : name}
      </CustomText>

      <CustomText textClassName="text-sm leading-3 line-clamp-1 text-center">
        {isEmpty(phoneNumber) ? "-" : phoneNumber}
      </CustomText>

      <CustomText textClassName="text-sm line-clamp-1 text-center">
        {isEmpty(email) ? "-" : email}
      </CustomText>
    </div>
  );
};

export default ProfileCard;
