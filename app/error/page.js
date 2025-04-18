import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

export default function ErrorPage() {
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
        Oops! Something went wrong!
      </CustomText>

      <CustomText textClassName="text-center text-sm pb-6">
        An unexpected error occurred
      </CustomText>

      <div className="flex gap-4">
        <Link href="/">
          <CustomButton
            buttonText="Go to home page"
            buttonClassName="btn-primary"
          />
        </Link>
      </div>
    </div>
  );
} 