"use client";

import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export default function () {
  return (
    <div className="relative h-full overflow-y-scroll hide-scroll-bar">
      <CustomText textClassName="font-bold">Cleaning Details</CustomText>
      <CustomText textClassName="text-black text-xs">
        Cleaning Scheduler / Cleaning Details
      </CustomText>

      <div className="grid grid-cols-5 gap-6 pt-4">
        <div className="col-span-1 rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
          <CustomText textClassName="pb-4 font-bold">
            General Information
          </CustomText>

          <CustomLabelValue label="Date" value="2025-05-21" />
          <CustomLabelValue
            label="Property/Unit"
            value="Epic Residence, C-20-09"
            highlight
          />
          <CustomLabelValue label="Remark" value="-" />
          <CustomLabelValue label="Toilet Water Paip Work Well" value="Yes" />
          <CustomLabelValue label="Any Defect" value="Yes" />
          <CustomLabelValue label="Peraturan Highlight" value="Yes" />
        </div>

        <div className="col-span-4 rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
          <CustomText textClassName="pb-4 font-bold">Photo Gallery</CustomText>
          <div className="flex flex-wrap gap-4">
            {map(Array(20), (item, index) => {
              return (
                <div key={index}>
                  <CustomText textClassName="text-disable text-xs">{get(item, "label", "Photo 1")}</CustomText>
                  <CustomImage src={Images.logo} className="h-52 w-28 border rounded-3xl" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
