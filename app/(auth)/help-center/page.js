"use client";

import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { map, get, isEqual, isEmpty, filter, toInteger, first } from "lodash";
import { useEffect, useState } from "react";
import HelpCenterListingCard from "@/components/HelpCenter/HelpCenterListingCard";
import Constant from "@/src/utils/Constant";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import FilterSection from "@/components/HelpCenter/FilterSection";
import { value } from "lodash/seq";

export default function HelpCenter() {
  const router = useRouter();

  const [filterParams, setFilterParams] = useState({});
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [blockValue, setBlockValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [requestDateValue, setRequestDateValue] = useState("");

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
    {
      label: "All",
      value: "",
    },
    {
      label: "New",
      value: Constant.TICKET_NEW,
    },
    {
      label: "Pending",
      value: Constant.TICKET_PENDING,
    },
    {
      label: "On Hold",
      value: Constant.TICKET_ON_HOLD,
    },
    {
      label: "In Progress",
      value: Constant.TICKET_IN_PROGRESS,
    },
    {
      label: "Closed",
      value: Constant.TICKET_CLOSED,
    },
    {
      label: "Cancelled",
      value: Constant.TICKET_CANCELLED,
    },
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

  const onClickToRequestOverview = (id) => {
    router.push(`/help-center/${id}`);
  };

  const onClickLoadMore = () => {
    fetchMaintenanceTicket(20, currentPage + 1, selectedStatus);
  };

  const onChangePropertyValue = (e) => {
    setFilterParams({
      ...filterParams,
      ...{ property_id: e.target.value },
    });
    setPropertyValue(e.target.value);
  };

  const onChangeUnitValue = (e) => {
    setFilterParams({
      ...filterParams,
      ...{ unit_id: e.target.value },
    });
    setUnitValue(e.target.value);
  };

  const onChangeBlockValue = (e) => {
    setFilterParams({
      ...filterParams,
      ...{ block_number: e.target.value },
    });
    setBlockValue(e.target.value);
  };

  const onchangeFloorValue = (e) => {
    setFilterParams({
      ...filterParams,
      ...{ floor: e.target.value },
    });
    setFloorValue(e.target.value);
  };

  const onChangeRequestDateValue = (e) => {
    setFilterParams({
      ...filterParams,
      ...{
        requester_at_start: e.target.value,
        requester_at_end: e.target.value,
      },
    });
    setRequestDateValue(e.target.value);
  };

  const onChangeStatusValue = (value) => {
    setFilterParams({
      ...filterParams,
      ...{
        status: value,
      },
    });
    setSelectedStatus(value);
  };

  const onClickReset = () => {
    setFilterParams({});
    setPropertyValue("");
    setBlockValue("");
    setFloorValue("");
    setRequestDateValue("");
    setSelectedStatus("");
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

      <div className="hide-scroll-bar flex items-center overflow-y-hidden overflow-x-scroll py-1">
        {map(btnLists, (list, index) => {
          const value = get(list, ["value"], "");
          const label = get(list, ["label"], "");

          return (
            <CustomButton
              key={index}
              buttonText={label}
              buttonClassName={`btn-sm ${isEqual(selectedStatus, value) ? "btn-primary" : "btn-white"} mr-2`}
              textClassName="text-xs"
              onClick={() => onChangeStatusValue(value)}
            />
          );
        })}
      </div>

      <div className="hide-scroll-bar flex h-full flex-col gap-4 overflow-y-scroll px-1">
        {isEmpty(maintenanceTicketListingData) ? (
          <div className="flex h-full flex-1 items-center justify-center py-10">
            <CustomEmptyBox emptyTitle="No ticket found" />
          </div>
        ) : (
          map(maintenanceTicketListingData, (data, index) => {
            return (
              <HelpCenterListingCard
                key={index}
                data={data}
                onClickToRequestOverview={onClickToRequestOverview}
              />
            );
          })
        )}

        {hasMorePage &&
        lastPage > 1 &&
        !isEmpty(maintenanceTicketListingData) ? (
          <div className="flex h-full justify-center">
            <CustomButton
              buttonClassName="btn-primary min-h-9 h-9 w-32"
              buttonText="Load More"
              textClassName="text-xs"
              loading={
                maintenanceTicketListingDataLoading &&
                !isEmpty(maintenanceTicketListingData)
              }
              onClick={onClickLoadMore}
            />
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
