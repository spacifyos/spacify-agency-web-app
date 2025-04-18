"use client";

import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

export default function Page({ error, reset }) {
  const router = useRouter();

  const onClickGoToBack = () => {
    router.replace("/");
  };

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center bg-primary-background px-10">
      <div className="flex gap-1">
        <CustomText
          textClassName="font-bold"
          styles={{ fontSize: 70, color: "#f9a533" }}
        >
          5
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
          0
        </CustomText>
      </div>

      <CustomText textClassName="text-lg text-center font-bold pb-2">
        Oops! Internet Server Error.
      </CustomText>

      <CustomText textClassName="text-center text-sm pb-6">
        User can try again later.
      </CustomText>

      <div className="flex gap-4">
        <CustomButton
          buttonText="Try Again"
          buttonClassName="btn-primary"
          onClick={reset}
        />
        <CustomButton
          buttonText="Go to home page"
          buttonClassName="btn-primary"
          onClick={onClickGoToBack}
        />
      </div>
    </div>
  );
}
