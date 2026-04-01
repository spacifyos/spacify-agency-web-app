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
    <div className="flex h-screen flex-1 flex-col items-center justify-center bg-surface-secondary px-6">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-baseline gap-1 pb-4">
          <CustomText textClassName="text-6xl font-bold text-primary">
            4
          </CustomText>
          <CustomText textClassName="text-6xl font-bold text-error">
            0
          </CustomText>
          <CustomText textClassName="text-6xl font-bold text-primary">
            3
          </CustomText>
        </div>

        <CustomText textClassName="text-lg text-center font-semibold text-black pb-2">
          Access Forbidden
        </CustomText>

        <CustomText textClassName="text-center text-sm text-muted pb-6">
          You don&apos;t have permission to access this page.
        </CustomText>

        <CustomButton
          buttonText="Go to sign in"
          buttonClassName="btn-primary w-full"
          onClick={onClickGoToBack}
        />
      </div>
    </div>
  );
}
