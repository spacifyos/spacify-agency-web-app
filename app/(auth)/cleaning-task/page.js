"use client";

import { get, isEmpty, isEqual, map, toLower } from "lodash";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";
import { useCallback, useState, useEffect } from "react";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/navigation";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import StatusLabel from "@/components/StatusLabel";
import FilterSection from "@/components/Cleaning/FilterSection";
import moment from "moment";
import CustomEmptyBox from "@/components/CustomEmptyBox";

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

const CleaningTaskPage = () => {
  const router = useRouter();
  const defaultStartDate = moment().format("YYYY-MM-DD");
  const defaultEndDate = moment().add(1, "day").format("YYYY-MM-DD");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [propertyOptions, setPropertyOptions] = useState({});
  const [propertyOptionsLoading, setPropertyOptionsLoading] = useState(false);

  const [schedulerData, setSchedulerData] = useState([]);
  const [schedulerLoading, setSchedulerLoading] = useState(false);
  const [postData, setPostData] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [propertyValue, setPropertyValue] = useState("");
  const [startDateValue, setStartDateValue] = useState(defaultStartDate);
  const [endDateValue, setEndDateValue] = useState(defaultEndDate);
  const [openCollapse, setOpenCollapse] = useState([]);

  useEffect(() => {
    fetchSchedulerData();
  }, [postData]);

  useEffect(() => {
    fetchPropertyOptionsV3();
  }, []);

  const fetchSchedulerData = async () => {
    await apiRequest.getSchedulerListingRequest(
      postData,
      setSchedulerLoading,
      (res) => setSchedulerData(res),
    );
  };

  const fetchPropertyOptionsV3 = async () => {
    await apiRequest.getPropertyOptionsV3Request(
      setPropertyOptionsLoading,
      (res) => setPropertyOptions(res),
    );
  };

  const onClickToDetail = (id) => {
    router.push(`/cleaning-task/${id}`);
  };

  const onChangePropertyValue = (e) => {
    setPostData({
      ...postData,
      ...{ property_id: e.target.value },
    });
    setPropertyValue(e.target.value);
  };

  const onChangeEndDateValue = (e) => {
    setPostData({
      ...postData,
      ...{
        endDate: e.target.value,
      },
    });
    setEndDateValue(e.target.value);
  };

  const onChangeStartDateValue = (e) => {
    setPostData({
      ...postData,
      ...{
        startDate: e.target.value,
      },
    });
    setStartDateValue(e.target.value);
  };

  const onClickReset = () => {
    setPostData({ startDate: defaultStartDate, endDate: defaultEndDate });
    setPropertyValue("");
    setStartDateValue(defaultStartDate);
    setEndDateValue(defaultEndDate);
  };

  return (
    <div className="relative h-full">
      <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-scroll">
        <FilterSection
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          propertyOption={propertyOptions}
          onChangePropertyValue={onChangePropertyValue}
          propertyValue={propertyValue}
          onClickReset={onClickReset}
          onChangeStartDateValue={onChangeStartDateValue}
          startDateValue={startDateValue}
          onChangeEndDateValue={onChangeEndDateValue}
          endDateValue={endDateValue}
        />

        {/*<div className="hide-scroll-bar flex items-center overflow-y-hidden overflow-x-scroll pb-4">*/}
        {/*  {map(btnLists, (list, index) => {*/}
        {/*    const value = get(list, ["value"], "");*/}
        {/*    const label = get(list, ["label"], "");*/}

        {/*    return (*/}
        {/*      <CustomButton*/}
        {/*        key={index}*/}
        {/*        buttonText={label}*/}
        {/*        buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-white"} mr-2`}*/}
        {/*        textClassName="text-xs"*/}
        {/*        onClick={() => setSelectedStatus(value)}*/}
        {/*      />*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</div>*/}

        <div className="flex h-full flex-col gap-6 pt-6">
          {isEmpty(schedulerData) ? (
            <div className="flex h-full items-center justify-center">
              <CustomEmptyBox />
            </div>
          ) : (
            map(schedulerData, (propertyGroups, date) => (
              <div key={date}>
                <CustomText textClassName="text-xs font-bold pb-2">
                  {date}
                </CustomText>
                {map(propertyGroups, (units, propertyName) => {
                  const collapseKey = date + "|" + propertyName;
                  const isOpen = openCollapse.includes(collapseKey);
                  return (
                    <div
                      key={collapseKey}
                      className={`collapse bg-white ${isOpen ? "collapse-open" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isOpen}
                        onChange={() => {
                          setOpenCollapse(
                            isOpen
                              ? openCollapse.filter(
                                  (key) => key !== collapseKey,
                                )
                              : [...openCollapse, collapseKey],
                          );
                        }}
                        style={{ display: "none" }}
                      />
                      <div
                        className="collapse-title cursor-pointer px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
                        onClick={() => {
                          setOpenCollapse(
                            isOpen
                              ? openCollapse.filter(
                                  (key) => key !== collapseKey,
                                )
                              : [...openCollapse, collapseKey],
                          );
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <CustomText textClassName="font-bold">
                            {propertyName}
                          </CustomText>
                          <CustomImage
                            src={
                              isOpen ? Images.upIconBlack : Images.downIconBlack
                            }
                            className="w-4"
                          />
                        </div>
                        <div className="flex items-end justify-start gap-4">
                          <CustomText textClassName="text-disable text-sm">
                            {date}
                          </CustomText>
                          <CustomText textClassName="text-xs">
                            <span className="text-base font-bold text-primary">
                              {units.length}
                            </span>{" "}
                            units
                          </CustomText>
                        </div>
                      </div>

                      <div
                        className="collapse-content bg-[#E9F1FE] px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
                        style={{ paddingBottom: 0 }}
                      >
                        {map(units, (unit, index) => {
                          const name = get(unit, "unit_name", "-");
                          const id = get(unit, "id", "-");
                          const statusLabel = get(
                            unit,
                            ["status", "label"],
                            "-",
                          );

                          return (
                            <div
                              key={id}
                              className={`${index === 0 ? "pt-4" : ""}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CustomText textClassName="text-sm">
                                    {name}
                                  </CustomText>
                                  <StatusLabel status={statusLabel} />
                                </div>

                                {isEqual(toLower(statusLabel), "pending") ? (
                                  <CustomButton
                                    buttonClassName="btn-primary btn-sm"
                                    buttonText={"Hantar Laporan"}
                                    onClick={() => onClickToDetail(id)}
                                  />
                                ) : (
                                  <CustomText
                                    textClassName="text-xs text-black font-bold cursor-pointer"
                                    onClick={() => onClickToDetail(id)}
                                  >
                                    Lihat
                                  </CustomText>
                                )}
                              </div>

                              <div className="divider-white divider"></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CleaningTaskPage;
