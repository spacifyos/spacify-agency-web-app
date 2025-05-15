"use client";

import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

export default function Forbidden() {
  const router = useRouter();

  const onClickGoToBack = () => {
    router.replace("/sign-in");
  };

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center bg-primary-background px-10">
      <div className="flex gap-1">
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#f9a533" }}
        >
          4
        </CustomText>
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#f05a22" }}
        >
          0
        </CustomText>
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#d71440" }}
        >
          3
        </CustomText>
      </div>

      <CustomText textClassName="text-lg text-center font-bold pb-2">
        Access Forbidden
      </CustomText>

      <CustomText textClassName="text-center text-sm pb-6">
        You don&apos;t have permission to access this page.
      </CustomText>

      <CustomButton
        buttonText="Go to sign in"
        buttonClassName="btn-primary"
        onClick={onClickGoToBack}
      />
    </div>
  );
}
