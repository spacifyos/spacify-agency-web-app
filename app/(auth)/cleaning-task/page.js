"use client";

import { get, isEqual, map } from "lodash";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";
import { useState } from "react";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/navigation";

const btnLists = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Tugasan Hari Ini",
    value: Constant.TICKET_NEW,
  },
  {
    label: "Tugas Dijadualkan",
    value: Constant.TICKET_PENDING,
  },
];

export default function () {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("");

  const onClickToDetail = (id) => {
    router.push(`/cleaning-task/${id}`);
  };

  return (
    <div className="relative h-full">
      <div className="hide-scroll-bar flex items-center overflow-y-hidden overflow-x-scroll pb-4">
        {map(btnLists, (list, index) => {
          const value = get(list, ["value"], "");
          const label = get(list, ["label"], "");

          return (
            <CustomButton
              key={index}
              buttonText={label}
              buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-white"} mr-2`}
              textClassName="text-xs"
              onClick={() => setSelectedStatus(value)}
            />
          );
        })}
      </div>

      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
          <div className="flex items-center justify-between">
            <CustomText textClassName="font-bold">
              Click me to show/hide content
            </CustomText>
            <CustomImage src={Images.downIconBlack} className="w-4" />
          </div>
          <div className="flex items-end justify-start gap-4">
            <CustomText textClassName="text-disable text-sm">
              2025-04-25
            </CustomText>
            <CustomText textClassName="text-xs">
              <span className="text-base font-bold text-primary">1/5</span>{" "}
              units{" "}
              <span className="text-base font-bold text-primary">- 20%</span>
            </CustomText>
          </div>
        </div>
        <div className="collapse-content bg-[#E9F1FE] px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
          {map(Array(5), (item, index) => {
            return (
              <div key={index} className={`${index + 1 === 1 ? "pt-4" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CustomText textClassName="text-sm">A12-02-12</CustomText>
                    <CustomText textClassName="bg-active text-white text-xxs px-2 py-1 rounded">
                      Selesai
                    </CustomText>
                  </div>

                  <CustomButton
                    buttonClassName="btn-primary btn-sm"
                    buttonText="Hantar Laporan"
                    onClick={() => onClickToDetail(1)}
                  />
                </div>

                <div className="divider-white divider"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
