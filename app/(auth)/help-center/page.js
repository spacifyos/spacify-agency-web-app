"use client";

import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { map, get, isEqual, isEmpty, filter, toInteger, first } from "lodash";
import { useEffect, useState, useMemo } from "react";
import moment from "moment";
import HelpCenterListingCard from "@/components/HelpCenter/HelpCenterListingCard";
import Constant from "@/src/utils/Constant";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import FilterSection from "@/components/HelpCenter/FilterSection";

const PRIORITY_CONFIG = {
  "4": { label: "Critical", color: "bg-error/10 text-error border-error/20" },
  "3": {
    label: "High",
    color: "bg-warning/10 text-warning border-warning/20",
  },
  "2": {
    label: "Normal",
    color: "bg-tertiary/10 text-tertiary border-tertiary/20",
  },
  "1": {
    label: "Low",
    color: "bg-available/10 text-available border-available/20",
  },
};

const PRIORITY_ORDER = ["4", "3", "2", "1"];

export default function HelpCenter() {
  const router = useRouter();

  const [filterParams, setFilterParams] = useState({ status: Constant.TICKET_NEW });
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(Constant.TICKET_NEW);
  const [propertyValue, setPropertyValue] = useState("");
  const [blockValue, setBlockValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [requestDateValue, setRequestDateValue] = useState("");

  const [collapsedGroups, setCollapsedGroups] = useState({
    "4": false, // Critical open by default
    "3": true,
    "2": true,
    "1": true,
  });

  const toggleGroup = (pv) => {
    setCollapsedGroups((prev) => ({ ...prev, [pv]: !prev[pv] }));
  };

  const [maintenanceTicketListingData, setMaintenanceTicketListingData] =
    useState([]);
  const [
    maintenanceTicketListingDataLoading,
    setMaintenanceTicketListingDataLoading,
  ] = useState(false);
  const [
    maintenanceTicketListingDataPagination,
    setMaintenanceTicketListingDataPagination,
  ] = useState(null);

  const [unitOptions, setUnitOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [propertyOption, setPropertyOption] = useState([]);
  const [propertyOptionLoading, setPropertyOptionLoading] = useState(false);

  const hasMorePage = maintenanceTicketSelector.getHasMorePages(
    maintenanceTicketListingDataPagination,
  );
  const lastPage = maintenanceTicketSelector.getLastPage(
    maintenanceTicketListingDataPagination,
  );
  const currentPage = maintenanceTicketSelector.getCurrentPage(
    maintenanceTicketListingDataPagination,
  );

  const btnLists = [
    { label: "New", value: Constant.TICKET_NEW },
    { label: "Pending", value: Constant.TICKET_PENDING },
    { label: "On Hold", value: Constant.TICKET_ON_HOLD },
    { label: "In Progress", value: Constant.TICKET_IN_PROGRESS },
    { label: "Closed", value: Constant.TICKET_CLOSED },
    { label: "Cancelled", value: Constant.TICKET_CANCELLED },
  ];

  useEffect(() => {
    fetchPropertyOptionV2();
  }, []);

  useEffect(() => {
    if (!isEmpty(propertyValue)) {
      const filterProperty = filter(
        propertyOption,
        (property) => toInteger(propertyValue) === get(property, "id", 0),
      );
      const currentBlockOption = get(first(filterProperty), "block", []);
      setBlockOptions(currentBlockOption);

      if (!isEmpty(blockValue)) {
        const filterBlock = filter(currentBlockOption, (block) =>
          isEqual(get(block, "value", ""), blockValue),
        );
        const currentFloorOption = get(first(filterBlock), "floor", []);
        setFloorOptions(currentFloorOption);

        if (!isEmpty(floorValue)) {
          const filterFloor = filter(currentFloorOption, (floor) =>
            isEqual(get(floor, "value", ""), floorValue),
          );
          const currentUnitOption = get(first(filterFloor), "units", []);
          setUnitOptions(currentUnitOption);
        }
      }
    }
  }, [filterParams]);

  const fetchPropertyOptionV2 = async () => {
    await apiRequest.getPropertyOptionsRequest(
      setPropertyOptionLoading,
      (res) => setPropertyOption(res),
    );
  };

  useEffect(() => {
    fetchMaintenanceTicket();
  }, [filterParams]);

  const fetchMaintenanceTicket = async (
    perPage = 20,
    page = 1,
    postData = filterParams,
  ) => {
    await apiRequest.getMaintenanceTicketListingRequest(
      perPage,
      page,
      postData,
      setMaintenanceTicketListingDataLoading,
      (res, pagination) => {
        setMaintenanceTicketListingData(res);
        setMaintenanceTicketListingDataPagination(pagination);
      },
    );
  };

  const parseSlaDate = (dateStr) => {
    if (!dateStr) return null;
    return moment(dateStr, "DD MMM YYYY HH:mm A");
  };

  // Count "New" tickets by priority
  const prioritySummary = useMemo(() => {
    const newTickets = filter(
      maintenanceTicketListingData,
      (t) => get(t, "status_value", "") === "1",
    );

    const counts = { "4": 0, "3": 0, "2": 0, "1": 0 };
    newTickets.forEach((t) => {
      const pv = get(t, "priority_value", "");
      if (counts[pv] !== undefined) counts[pv]++;
    });

    return { counts, total: newTickets.length };
  }, [maintenanceTicketListingData]);

  // Sort & group tickets
  const sortedTicketData = useMemo(() => {
    if (isEmpty(maintenanceTicketListingData)) return [];
    const now = moment();

    return [...maintenanceTicketListingData].sort((a, b) => {
      const aIsNew = get(a, "status_value", "") === "1" ? 0 : 1;
      const bIsNew = get(b, "status_value", "") === "1" ? 0 : 1;
      if (aIsNew !== bIsNew) return aIsNew - bIsNew;

      const priorityOrder = { "4": 0, "3": 1, "2": 2, "1": 3 };
      const aPriority = priorityOrder[get(a, "priority_value", "1")] ?? 99;
      const bPriority = priorityOrder[get(b, "priority_value", "1")] ?? 99;
      if (aPriority !== bPriority) return aPriority - bPriority;

      const aSla = parseSlaDate(get(a, "sla_date", null));
      const bSla = parseSlaDate(get(b, "sla_date", null));

      const aOverdue = aSla && aSla.isBefore(now) ? 0 : 1;
      const bOverdue = bSla && bSla.isBefore(now) ? 0 : 1;
      if (aOverdue !== bOverdue) return aOverdue - bOverdue;

      if (aSla && bSla) return aSla.valueOf() - bSla.valueOf();
      if (aSla) return -1;
      if (bSla) return 1;

      return 0;
    });
  }, [maintenanceTicketListingData]);

  // Group sorted tickets by priority for "New" status view
  const groupedByPriority = useMemo(() => {
    const groups = {};
    sortedTicketData.forEach((ticket) => {
      const pv = get(ticket, "priority_value", "0");
      if (!groups[pv]) groups[pv] = [];
      groups[pv].push(ticket);
    });
    return groups;
  }, [sortedTicketData]);

  const onClickToRequestOverview = (id) => {
    router.push(`/help-center/${id}`);
  };

  const onClickLoadMore = () => {
    fetchMaintenanceTicket(20, currentPage + 1, selectedStatus);
  };

  const onChangePropertyValue = (e) => {
    setFilterParams({ ...filterParams, property_id: e.target.value });
    setPropertyValue(e.target.value);
  };

  const onChangeUnitValue = (e) => {
    setFilterParams({ ...filterParams, unit_id: e.target.value });
    setUnitValue(e.target.value);
  };

  const onChangeBlockValue = (e) => {
    setFilterParams({ ...filterParams, block_number: e.target.value });
    setBlockValue(e.target.value);
  };

  const onchangeFloorValue = (e) => {
    setFilterParams({ ...filterParams, floor: e.target.value });
    setFloorValue(e.target.value);
  };

  const onChangeRequestDateValue = (e) => {
    setFilterParams({
      ...filterParams,
      requester_at_start: e.target.value,
      requester_at_end: e.target.value,
    });
    setRequestDateValue(e.target.value);
  };

  const onChangeStatusValue = (value) => {
    setFilterParams({ ...filterParams, status: value });
    setSelectedStatus(value);
  };

  const onClickReset = () => {
    setFilterParams({ status: Constant.TICKET_NEW });
    setPropertyValue("");
    setBlockValue("");
    setFloorValue("");
    setRequestDateValue("");
    setSelectedStatus(Constant.TICKET_NEW);
  };

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden">
      <LoadingOverlay loading={maintenanceTicketListingDataLoading} />

      <FilterSection
        isOpenFilter={isOpenFilter}
        setIsOpenFilter={setIsOpenFilter}
        propertyOption={propertyOption}
        onChangePropertyValue={onChangePropertyValue}
        propertyValue={propertyValue}
        unitOption={unitOptions}
        onChangeUnitValue={onChangeUnitValue}
        unitValue={unitValue}
        onClickReset={onClickReset}
        blockOption={blockOptions}
        onChangeBlockValue={onChangeBlockValue}
        blockValue={blockValue}
        onChangeFloorValue={onchangeFloorValue}
        floorValue={floorValue}
        floorOptions={floorOptions}
        onChangeRequestDateValue={onChangeRequestDateValue}
        requestDateValue={requestDateValue}
      />

      {/* Status filter pills + Create button */}
      <div className="flex items-center justify-between gap-3">
        <div className="hide-scroll-bar flex items-center gap-2 overflow-y-hidden overflow-x-scroll py-1">
          {map(btnLists, (list, index) => {
            const value = get(list, ["value"], "");
            const label = get(list, ["label"], "");
            const isActive = isEqual(selectedStatus, value);

            return (
              <button
                key={index}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-muted hover:bg-surface-secondary"
                }`}
                onClick={() => onChangeStatusValue(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <CustomButton
          buttonText="Create Ticket"
          buttonClassName="btn-primary shrink-0 rounded-full px-4 py-1.5 h-auto min-h-0"
          textClassName="text-xs font-medium"
          onClick={() => router.push("/help-center/create")}
        />
      </div>

      {/* Priority Summary Cards — only for "New" tickets */}
      {prioritySummary.total > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {PRIORITY_ORDER.map((pv) => {
            const config = PRIORITY_CONFIG[pv];
            const count = prioritySummary.counts[pv];
            return (
              <div
                key={pv}
                className={`flex flex-col items-center rounded-xl border p-3 ${config.color}`}
              >
                <span className="text-xl font-bold">{count}</span>
                <span className="text-xs font-medium">{config.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket list grouped by priority */}
      <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-scroll">
        {isEmpty(sortedTicketData) ? (
          <div className="flex h-full flex-1 items-center justify-center py-10">
            <CustomEmptyBox emptyTitle="No ticket found" />
          </div>
        ) : (
          PRIORITY_ORDER.map((pv) => {
            const tickets = groupedByPriority[pv];
            if (isEmpty(tickets)) return null;
            const config = PRIORITY_CONFIG[pv];

            const isCollapsed = collapsedGroups[pv];

            return (
              <div key={pv}>
                {/* Priority group header — clickable to toggle */}
                <button
                  className="mb-2 flex w-full cursor-pointer items-center gap-2"
                  onClick={() => toggleGroup(pv)}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      pv === "4"
                        ? "bg-error"
                        : pv === "3"
                          ? "bg-warning"
                          : pv === "2"
                            ? "bg-tertiary"
                            : "bg-available"
                    }`}
                  />
                  <CustomText textClassName="text-xs font-semibold text-black">
                    {config.label}
                  </CustomText>
                  <span className="text-xs text-muted">
                    ({tickets.length})
                  </span>
                  <span
                    className={`ml-auto text-xs text-muted transition-transform ${
                      isCollapsed ? "" : "rotate-180"
                    }`}
                  >
                    ▲
                  </span>
                </button>

                {/* Tickets in this group */}
                {!isCollapsed && (
                  <div className="flex flex-col gap-2">
                    {map(tickets, (data, index) => (
                      <HelpCenterListingCard
                        key={get(data, "id", index)}
                        data={data}
                        onClickToRequestOverview={onClickToRequestOverview}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Tickets without a known priority */}
        {!isEmpty(groupedByPriority["0"]) && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-muted" />
              <CustomText textClassName="text-xs font-semibold text-black">
                Other
              </CustomText>
              <span className="text-xs text-muted">
                ({groupedByPriority["0"].length})
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {map(groupedByPriority["0"], (data, index) => (
                <HelpCenterListingCard
                  key={get(data, "id", index)}
                  data={data}
                  onClickToRequestOverview={onClickToRequestOverview}
                />
              ))}
            </div>
          </div>
        )}

        {hasMorePage &&
        lastPage > 1 &&
        !isEmpty(maintenanceTicketListingData) ? (
          <div className="flex justify-center py-4">
            <CustomButton
              buttonClassName="btn-primary-outline rounded-full px-6 py-2 h-auto min-h-0"
              buttonText="Load More"
              textClassName="text-xs font-medium"
              loading={
                maintenanceTicketListingDataLoading &&
                !isEmpty(maintenanceTicketListingData)
              }
              onClick={onClickLoadMore}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
