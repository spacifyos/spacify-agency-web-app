"use client";

import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";
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
    <div className="relative flex h-screen flex-col items-center justify-center bg-surface">
      <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-8">
        <SvgIcon name="paymentSuccess" color="active" size={120} />
        <CustomText textClassName="font-semibold text-black pt-5 text-2xl">
          Terima Kasih!
        </CustomText>
        <div className="px-6 pb-6 pt-2">
          <CustomText textClassName="text-sm text-muted text-center">
            Laporan anda telah berjaya dihantar.
          </CustomText>
        </div>
        <CustomButton
          buttonClassName="btn-primary px-8"
          buttonText={"Lihat Laporan"}
          onClick={onClickGoMainPage}
        />
      </div>
    </div>
  );
};

export default UpdateSuccessful;
