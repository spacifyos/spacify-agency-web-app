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
  <div
    style={{
      background: "#eee",
      borderRadius: 4,
      width: 60,
      height: 8,
      marginLeft: 8,
    }}
  >
    <div
      style={{
        width: `${percent}%`,
        background: "#4caf50",
        height: "100%",
        borderRadius: 4,
      }}
    />
  </div>
);

const StatusBadge = ({ status }) => {
  let color = "bg-gray-300",
    icon = "";
  if (status === "Pending") {
    color = "bg-yellow-200 text-yellow-800";
    icon = "⏳";
  }
  if (status === "Cancel By Platform") {
    color = "bg-red-200 text-red-800";
    icon = "❌";
  }
  if (status === "Cancel By Client") {
    color = "bg-orange-200 text-orange-800";
    icon = "🚫";
  }
  return (
    <span className={`rounded px-2 py-1 text-xs font-semibold ${color} ml-2`}>
      {icon} {status}
    </span>
  );
};

export default function () {
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState("");

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

      <div className="sticky top-0 z-10 flex gap-1">
        {map(monthArray, function (month, index) {
          return (
            <button
              key={index}
              onClick={() => setSelectedMonth(index + 1)}
              style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
              className={`btn h-10 w-20 cursor-pointer ${selectedMonth === index + 1 ? "btn-primary" : "btn-disable"} text-xs font-bold`}
            >
              {month}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead></thead>
          <tbody className="">
            <tr className="bg-white">
              {dataArray.map((item, idx) => (
                <th key={idx}>
                  <CustomText textClassName={`font-bold text-xs`}>
                    {item.label}
                  </CustomText>
                </th>
              ))}
            </tr>
            <tr className="bg-white">
              {dataArray.map((item, idx) => (
                <td key={idx}>{item.value}</td>
              ))}
            </tr>
            {propertyArray.map((item, idx) => (
              <tr
                key={idx}
                className="mb-4 bg-white"
                style={{ marginBottom: 100 }}
              >
                <td className="font-semibold text-red-600">{item.property}</td>
                <td>{item.unit}</td>
                <td>{item.total_created}</td>
                <td>{item.total_completed}</td>
                <td>{item.total_pending}</td>
                <td>{item.total_cancelled}</td>
                <td>{item.cancelled_by_platform}</td>
                <td>{item.cancelled_by_client}</td>
                <td>{item.unit_charges_price_rm}</td>
                <td>{item.unit_chargable_rm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
