"use client";

import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useParams, useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { get, isEmpty } from "lodash";

const UpdateSuccessful = ({}) => {
  const router = useRouter();
  const id = get(useParams(router), ["slug"], "");

  const onClickGoMainPage = () => {
    router.replace(`/cleaning-task/${id}`);
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-primary-background">
      <CustomImage
        src={Images.paymentSuccessIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />
      <CustomText textClassName="font-bold pt-4 text-2xl">
        Terima Kasih!
      </CustomText>
      <div className="px-10 pb-4 pt-4">
        <CustomText textClassName="text-sm text-center">
          Laporan anda telah berjaya dihantar.
        </CustomText>
      </div>
      <CustomButton
        buttonClassName="btn-primary"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"Lihat Laporan"}
        onClick={onClickGoMainPage}
      />
    </div>
  );
};

export default UpdateSuccessful;
