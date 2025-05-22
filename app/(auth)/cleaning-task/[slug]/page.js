"use client";

import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { map, size } from "lodash";

export default function () {
  return (
    <div className="hide-scroll-bar relative h-full overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
          <CustomText textClassName="font-bold text-primary pb-4">
            Maklumat Umum
          </CustomText>

          <CustomLabelValue label="Name" value="Siti" />
          <CustomLabelValue label="Hartanah" value="Siti" />
          <div className="flex items-center gap-4">
            <CustomLabelValue label="Unit Kediaman" value="Siti" />
            <CustomLabelValue label="Bilik" value="Siti" />
          </div>
          <CustomLabelValue label="Tarikh Pembersihan" value="Siti" />
          <div className="flex items-center gap-4">
            <CustomLabelValue label="Jenis Pembersihan" value="Siti" />
            <CustomLabelValue label="Zon Pembersihan" value="Siti" />
          </div>
          <CustomLabelValue label="Cara Masuk" value="Siti" />
          <CustomLabelValue
            label="Nota"
            value="Siti"
            styles={{ paddingBottom: 0 }}
          />
        </div>

        <div className="collapse bg-white">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
            <div className="flex items-center justify-between">
              <CustomText textClassName="font-bold text-primary">
                Senarai Semak Penjagaan
              </CustomText>
              <CustomImage src={Images.downIconBlack} className="w-4" />
            </div>
          </div>
          <div className="collapse-content px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-lg bg-primary-background px-4 py-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
                <CustomText textClassName="text-sm">Senarai Semak</CustomText>

                <div className="flex items-center justify-center gap-2">
                  <div className="divider-white divider divider-horizontal"></div>
                  <CustomText textClassName="text-xs w-12 text-center">
                    Baik
                  </CustomText>
                  <div className="divider-white divider divider-horizontal"></div>
                  <CustomText textClassName="text-xs w-12 text-center">
                    Tak Baik
                  </CustomText>
                </div>
              </div>

              {map(Array(5), (item, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-lg bg-primary-background px-4 py-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
                  >
                    <div className="flex items-center justify-between">
                      <CustomText textClassName="text-sm">
                        Senarai Semak
                      </CustomText>

                      <div className="flex items-center justify-center gap-2">
                        <div className="divider-white divider divider-horizontal"></div>

                        <div className="flex w-12 justify-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="checkbox-primary checkbox"
                          />
                        </div>

                        <div className="divider-white divider divider-horizontal"></div>

                        <div className="flex w-12 justify-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="checkbox-primary checkbox"
                          />
                        </div>
                      </div>
                    </div>

                    {index + 1 !== 2 ? null : (
                      <div>
                        <div className="divider-white divider"></div>

                        <div>
                          <CustomText textClassName="text-sm pb-2">
                            Gambar <span className="text-primary">*</span>{" "}
                            <span className="text-disable">
                              (3–5 gambar, maks 1MB setiap satu)
                            </span>
                          </CustomText>

                          <div className="flex flex-wrap items-center gap-4">
                            {map(Array(5), (item, index) => {
                              return (
                                <div key={index} className="overflow-hidden">
                                  <CustomImage
                                    src={Images.logo}
                                    className="h-20 w-20 rounded-2xl border"
                                  />
                                </div>
                              );
                            })}

                            {size(Array(5)) < 10 ? (
                              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white">
                                <CustomImage
                                  src={Images.addIconDisable}
                                  className="h-5 w-5 cursor-pointer"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
