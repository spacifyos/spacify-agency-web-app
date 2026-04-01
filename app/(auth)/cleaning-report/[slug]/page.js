"use client";

import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const CleaningReportDetailPage = () => {
  return (
    <div className="relative h-full overflow-y-scroll hide-scroll-bar">
      <div className="pb-4">
        <CustomText textClassName="font-semibold text-black text-lg">
          Cleaning Details
        </CustomText>
        <CustomText textClassName="text-muted text-xs pt-1">
          Cleaning Scheduler / Cleaning Details
        </CustomText>
      </div>

      <div className="flex flex-col gap-4">
        {/* General Information Card */}
        <div className="rounded-2xl border border-border bg-white p-5">
          <CustomText textClassName="pb-4 font-semibold text-black text-base">
            General Information
          </CustomText>

          <div className="flex flex-col gap-2">
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
        </div>

        {/* Photo Gallery Card */}
        <div className="rounded-2xl border border-border bg-white p-5">
          <CustomText textClassName="pb-4 font-semibold text-black text-base">
            Photo Gallery
          </CustomText>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {map(Array(20), (item, index) => {
              return (
                <div key={index} className="flex flex-col gap-1">
                  <CustomText textClassName="text-muted text-xs">
                    {get(item, "label", "Photo 1")}
                  </CustomText>
                  <CustomImage
                    src={Images.logo}
                    className="h-32 w-full rounded-xl border border-border object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningReportDetailPage;
