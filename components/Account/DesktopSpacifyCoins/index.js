import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const DesktopSpacifyCoins = ({ route, walletBalance }) => {
  return (
    <a
      // href={route}
      className="xl:h-36 lg:h-36 md:h-36 sm:h-48 h-44 p-5 global-box-shadow global-border-radius bg-white flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col items-center relative cursor-pointer"
    >
      {/*<div className="absolute right-1 top-3 cursor-pointer">*/}
      {/*  <CustomImage src={Images.moreIcon} imageStyle={{ width: 22 }} />*/}
      {/*</div>*/}

      <div className="profile-coin-icon-container">
        <CustomImage src={Images.logo} className="xl:w-20 lg:w-20 md:w-20 sm:w-16 w-12" />
      </div>

      <div className="flex flex-col xl:pl-4 lg:pl-4 md:pl-4 sm:pt-4 pt-4">
        <CustomText textClassName="text-disable text-sm xl:text-left lg:text-left md:text-left sm:text-center text-center">
          My Wallet
        </CustomText>

        <div className="flex items-center justify-center">
          {/*<CustomText textClassName="text-primary text-sm">*/}
          {/*  Coming Soon*/}
          {/*</CustomText>*/}
          <CustomText textClassName="text-primary text-sm font-bold xl:text-left lg:text-left md:text-left sm:text-center text-center">
            {/*{`RM ${isEmpty(walletBalance) ? "0" : walletBalance}`}*/}
            Coming Soon
          </CustomText>
          {/*<CustomImage src={Images.refreshIcon} height={20} width={20} />*/}
        </div>
      </div>
    </a>
  );
};

export default DesktopSpacifyCoins;
