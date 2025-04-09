"use client";

import Images from "@/src/utils/Image";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { map, get, filter, isEqual, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import HelpCenterListingCard from "@/components/HelpCenter/HelpCenterListingCard";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Constant from "@/src/utils/Constant";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function HelpCenter() {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState("");

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
    fetchMaintenanceTicket();
  }, [selectedStatus]);

  const fetchMaintenanceTicket = async (
    perPage = 20,
    page = 1,
    status = selectedStatus,
  ) => {
    await apiRequest.getMaintenanceTicketListingRequest(
      perPage,
      page,
      status,
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

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden">
      <LoadingOverlay loading={maintenanceTicketListingDataLoading} />

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
              onClick={() => setSelectedStatus(value)}
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
