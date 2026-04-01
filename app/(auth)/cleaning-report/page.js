"use client";

import { get, isEmpty, isEqual, map, size } from "lodash";
import { useState } from "react";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";

const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dataArray = [
  { label: "Property", value: "99,999" },
  { label: "Unit", value: "99,999" },
  { label: "Total Created", value: "99,999" },
  { label: "Total Completed", value: "99,999 (100.00%)" },
  { label: "Total Pending", value: "0 (0.00%)" },
  { label: "Total Cancelled", value: "2 (0.62%)" },
  { label: "Cancelled by Platform", value: "2 (0.62%)" },
  { label: "Cancelled by Client", value: "2 (0.62%)" },
  { label: "Unit Charges Price (RM)", value: "99,999.99" },
  { label: "Unit Chargable (RM)", value: "99,999.00" },
];

const propertyArray = [
  {
    property: "Epic Residence",
    unit: "C-20-09",
    total_created: 9,
    total_completed: 9,
    total_pending: 0,
    total_cancelled: 2,
    cancelled_by_platform: 2,
    cancelled_by_client: 2,
    unit_charges_price_rm: 120.0,
    unit_chargable_rm: 120.0,
  },
  {
    property: "Epic Residence",
    unit: "C-20-09",
    total_created: 9,
    total_completed: 9,
    total_pending: 0,
    total_cancelled: 2,
    cancelled_by_platform: 2,
    cancelled_by_client: 2,
    unit_charges_price_rm: 120.0,
    unit_chargable_rm: 120.0,
  },
  {
    property: "Epic Residence",
    unit: "C-20-09",
    total_created: 9,
    total_completed: 9,
    total_pending: 0,
    total_cancelled: 2,
    cancelled_by_platform: 2,
    cancelled_by_client: 2,
    unit_charges_price_rm: 120.0,
    unit_chargable_rm: 120.0,
  },
  {
    property: "Epic Residence",
    unit: "C-20-09",
    total_created: 9,
    total_completed: 9,
    total_pending: 0,
    total_cancelled: 2,
    cancelled_by_platform: 2,
    cancelled_by_client: 2,
    unit_charges_price_rm: 120,
    unit_chargable_rm: 120,
  },
];

const btnLists = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Cleaning Schedule",
    value: Constant.TICKET_NEW,
  },
  {
    label: "Patrolling Schedule",
    value: Constant.TICKET_PENDING,
  },
];

const ProgressBar = ({ percent }) => (
  <div className="ml-2 h-2 w-[60px] overflow-hidden rounded bg-surface-secondary">
    <div
      className="h-full rounded bg-green-500"
      style={{ width: `${percent}%` }}
    />
  </div>
);

const StatusBadge = ({ status }) => {
  let color = "bg-gray-300",
    icon = "";
  if (status === "Pending") {
    color = "bg-yellow-200 text-yellow-800";
    icon = "";
  }
  if (status === "Cancel By Platform") {
    color = "bg-red-200 text-red-800";
    icon = "";
  }
  if (status === "Cancel By Client") {
    color = "bg-orange-200 text-orange-800";
    icon = "";
  }
  return (
    <span className={`ml-2 rounded-lg px-2 py-1 text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

const CleaningReportPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <div className="relative flex h-full flex-col gap-4">
      {/* Status filter tabs */}
      <div className="hide-scroll-bar flex items-center gap-2 overflow-y-hidden overflow-x-scroll">
        {map(btnLists, (list, index) => {
          const value = get(list, ["value"], "");
          const label = get(list, ["label"], "");

          return (
            <CustomButton
              key={index}
              buttonText={label}
              buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-primary-outline"}`}
              textClassName="text-xs"
              onClick={() => setSelectedStatus(value)}
            />
          );
        })}
      </div>

      {/* Month selector */}
      <div className="hide-scroll-bar flex gap-1 overflow-x-auto">
        {map(monthArray, function (month, index) {
          return (
            <button
              key={index}
              onClick={() => setSelectedMonth(index + 1)}
              className={`btn btn-sm h-9 min-w-[52px] cursor-pointer rounded-xl rounded-b-none text-xs font-semibold ${
                selectedMonth === index + 1
                  ? "btn-primary"
                  : "border-border bg-surface-secondary text-muted"
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                {dataArray.map((item, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-xs font-semibold text-black"
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Summary row */}
              <tr className="border-t border-border">
                {dataArray.map((item, idx) => (
                  <td key={idx} className="px-4 py-3">
                    <CustomText textClassName="text-xs text-muted">
                      {item.value}
                    </CustomText>
                  </td>
                ))}
              </tr>

              {/* Property rows */}
              {propertyArray.map((item, idx) => (
                <tr key={idx} className="border-t border-border">
                  {Object.entries(item).map(([key, value], cellIdx) => (
                    <td key={cellIdx} className="px-4 py-3">
                      <CustomText
                        textClassName={`text-xs ${key === "property" ? "text-primary font-semibold" : "text-black"}`}
                      >
                        {value}
                      </CustomText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CleaningReportPage;
