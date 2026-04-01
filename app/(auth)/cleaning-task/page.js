"use client";

import { get, isEmpty, isEqual, map, toLower } from "lodash";
import CustomButton from "@/components/CustomButton";
import { useState, useEffect, useMemo } from "react";
import CustomText from "@/components/CustomText";
import SvgIcon from "@/components/SvgIcon";
import { useRouter } from "next/navigation";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import StatusLabel from "@/components/StatusLabel";
import FilterSection from "@/components/Cleaning/FilterSection";
import moment from "moment";
import CustomEmptyBox from "@/components/CustomEmptyBox";

const statusFilters = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

const getDateRange = (rangeKey) => {
  switch (rangeKey) {
    case "today":
      return {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      };
    case "week":
      return {
        startDate: moment().startOf("isoWeek").format("YYYY-MM-DD"),
        endDate: moment().endOf("isoWeek").add(1, "day").format("YYYY-MM-DD"),
      };
    case "month":
      return {
        startDate: moment().startOf("month").format("YYYY-MM-DD"),
        endDate: moment().endOf("month").add(1, "day").format("YYYY-MM-DD"),
      };
    default:
      return {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      };
  }
};

const CleaningTaskPage = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("today");

  const [propertyOptions, setPropertyOptions] = useState({});
  const [propertyOptionsLoading, setPropertyOptionsLoading] = useState(false);

  const [schedulerData, setSchedulerData] = useState([]);
  const [schedulerLoading, setSchedulerLoading] = useState(false);
  const [postData, setPostData] = useState(getDateRange("today"));

  const [propertyValue, setPropertyValue] = useState("");
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

  // Filter data by status
  const filteredData = useMemo(() => {
    if (isEmpty(schedulerData) || !selectedStatus) return schedulerData;

    const result = {};
    map(schedulerData, (propertyGroups, date) => {
      const filteredPropertyGroups = {};
      map(propertyGroups, (units, propertyName) => {
        const filteredUnits = units.filter((unit) => {
          const statusLabel = toLower(get(unit, ["status", "label"], ""));
          return isEqual(statusLabel, toLower(selectedStatus));
        });
        if (filteredUnits.length > 0) {
          filteredPropertyGroups[propertyName] = filteredUnits;
        }
      });
      if (!isEmpty(filteredPropertyGroups)) {
        result[date] = filteredPropertyGroups;
      }
    });
    return result;
  }, [schedulerData, selectedStatus]);

  const onClickToDetail = (id) => {
    router.push(`/cleaning-task/${id}`);
  };

  const onChangePropertyValue = (e) => {
    setPostData({
      ...postData,
      property_id: e.target.value,
    });
    setPropertyValue(e.target.value);
  };

  const onChangeDateRange = (rangeKey) => {
    setSelectedDateRange(rangeKey);
    const range = getDateRange(rangeKey);
    setPostData({
      ...postData,
      ...range,
    });
  };

  const onClickReset = () => {
    setSelectedDateRange("today");
    setSelectedStatus("");
    setPropertyValue("");
    setPostData(getDateRange("today"));
  };

  return (
    <div className="relative h-full">
      <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-scroll">
        {/* Filter Section */}
        <FilterSection
          propertyOption={propertyOptions}
          onChangePropertyValue={onChangePropertyValue}
          propertyValue={propertyValue}
          selectedDateRange={selectedDateRange}
          onChangeDateRange={onChangeDateRange}
          onClickReset={onClickReset}
        />

        {/* Status filter pills */}
        <div className="hide-scroll-bar flex items-center gap-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <CustomButton
              key={filter.value}
              buttonText={filter.label}
              buttonClassName={`btn-sm whitespace-nowrap ${isEqual(selectedStatus, filter.value) ? "btn-primary" : "btn-white"}`}
              textClassName="text-xs"
              onClick={() => setSelectedStatus(filter.value)}
            />
          ))}
        </div>

        {/* Task listing */}
        <div className="flex h-full flex-col gap-4 pt-2">
          {schedulerLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
          ) : isEmpty(filteredData) ? (
            <div className="flex h-full items-center justify-center">
              <CustomEmptyBox />
            </div>
          ) : (
            map(filteredData, (propertyGroups, date) => (
              <div key={date} className="flex flex-col gap-3">
                {/* Date header */}
                <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
                  {date}
                </CustomText>

                {map(propertyGroups, (units, propertyName) => {
                  const collapseKey = date + "|" + propertyName;
                  const isOpen = openCollapse.includes(collapseKey);

                  return (
                    <div
                      key={collapseKey}
                      className="overflow-hidden rounded-2xl border border-border bg-white"
                    >
                      {/* Collapse header */}
                      <button
                        className="flex w-full cursor-pointer items-center justify-between p-4"
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
                        <div className="text-left">
                          <CustomText textClassName="font-semibold text-black">
                            {propertyName}
                          </CustomText>
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex items-center gap-1.5">
                              <SvgIcon
                                name="calendar"
                                color="muted"
                                size={14}
                              />
                              <CustomText textClassName="text-muted text-xs">
                                {date}
                              </CustomText>
                            </div>
                            <CustomText textClassName="text-xs text-muted">
                              <span className="font-semibold text-primary">
                                {units.length}
                              </span>{" "}
                              units
                            </CustomText>
                          </div>
                        </div>
                        <SvgIcon
                          name={isOpen ? "up" : "down"}
                          color="muted"
                          size={16}
                        />
                      </button>

                      {/* Collapse content */}
                      {isOpen && (
                        <div className="border-t border-border bg-surface-secondary px-4 pb-2 pt-1">
                          {map(units, (unit, index) => {
                            const name = get(unit, "unit_name", "-");
                            const id = get(unit, "id", "-");
                            const statusLabel = get(
                              unit,
                              ["status", "label"],
                              "-",
                            );

                            return (
                              <div key={id}>
                                <div
                                  className="flex cursor-pointer items-center justify-between py-3"
                                  onClick={() => onClickToDetail(id)}
                                >
                                  {/* Name and Status */}
                                  <div className="flex items-center gap-2">
                                    <CustomText textClassName="text-sm font-medium text-black">
                                      {name}
                                    </CustomText>
                                    <StatusLabel status={statusLabel} />
                                  </div>

                                  {/* Action */}
                                  <div className="shrink-0">
                                    {isEqual(
                                      toLower(statusLabel),
                                      "pending",
                                    ) ? (
                                      <CustomButton
                                        buttonClassName="btn-primary btn-sm"
                                        buttonText="Hantar Laporan"
                                        textClassName="text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onClickToDetail(id);
                                        }}
                                      />
                                    ) : (
                                      <SvgIcon
                                        name="right"
                                        color="muted"
                                        size={18}
                                      />
                                    )}
                                  </div>
                                </div>

                                {index < units.length - 1 && (
                                  <div className="border-b border-border"></div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
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
