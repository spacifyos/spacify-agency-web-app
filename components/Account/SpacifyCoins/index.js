import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const SpacifyCoins = ({ t, route, walletBalance }) => {
  return (
    <a
      // href={route}
      className="profile-coin-container col-span-2 cursor-pointer"
    >
      {/*<div className="absolute right-1 top-3 cursor-pointer">*/}
      {/*  <CustomImage src={Images.moreIcon} imageStyle={{ width: 22 }} />*/}
      {/*</div>*/}

      <div className="profile-coin-icon-container">
        <CustomImage src={Images.logo} imageStyle={{ width: 30 }} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <CustomText textClassName="text-disable text-sm">
          My Wallet
        </CustomText>

        <div className="flex items-center justify-center">
          {/*<CustomText textClassName="text-primary text-sm">*/}
          {/*  Coming Soon*/}
          {/*</CustomText>*/}
          <CustomText textClassName="text-primary text-lg font-bold text-center ">
            {/*{`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}*/}
            Coming Soon
          </CustomText>
          {/*<CustomImage src={Images.refreshIcon} height={20} width={20} />*/}
        </div>
      </div>
    </a>
  );
};

export default SpacifyCoins;
