"use client";

import { get, isEqual, map } from "lodash";
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
  const defaultDate = moment().format("YYYY-MM-DD");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [schedulerData, setSchedulerData] = useState([]);
  const [schedulerDataPagination, setSchedulerDataPagination] = useState(null);
  const [schedulerLoading, setSchedulerLoading] = useState(false);
  const [postData, setPostData] = useState({
    startDate: "2025-05-30",
    endDate: "2025-06-01",
  });

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [propertyValue, setPropertyValue] = useState("");
  const [startDateValue, setStartDateValue] = useState(defaultDate);
  const [endDateValue, setEndDateValue] = useState(defaultDate);
  const [openCollapse, setOpenCollapse] = useState([]);

  useEffect(() => {
    fetchSchedulerData();
  }, []);

  const fetchSchedulerData = async () => {
    await apiRequest.getSchedulerListingRequest(
      postData,
      setSchedulerLoading,
      (res, pagination) => {
        setSchedulerData(res);
        setSchedulerDataPagination(pagination);
      },
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
    setPostData({ startDate: "2025-05-30", endDate: "2025-06-01" });
    setPropertyValue("");
    setStartDateValue(defaultDate);
    setEndDateValue(defaultDate);
  };

  return (
    <div className="relative h-full">
      <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-scroll">
        <FilterSection
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          propertyOption={[]}
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

        <div className="flex flex-col gap-6 pt-6">
          {map(schedulerData, (propertyGroups, date) => (
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
                            ? openCollapse.filter((key) => key !== collapseKey)
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
                            ? openCollapse.filter((key) => key !== collapseKey)
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
                        const statusLabel = get(unit, ["status", "label"], "-");

                        return (
                          <div
                            key={id}
                            className={`${index === 0 ? "pt-4" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <CustomText textClassName="text-sm">
                                  {name}
                                </CustomText>
                                <StatusLabel status={statusLabel} />
                              </div>

                              <CustomButton
                                buttonClassName="btn-primary btn-sm"
                                buttonText="Hantar Laporan"
                                onClick={() => onClickToDetail(id)}
                              />
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
          ))}
        </div>
      </div>
    </div>
  );
}
