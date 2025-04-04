import { get } from "lodash";

export const getMaintenanceTicketListingData = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "data"],
    null,
  );
export const getMaintenanceTicketListingPagination = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "pagination"],
    null,
  );
export const getMaintenanceTicketListingLoading = (state, status) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketListing", status, "loading"],
    false,
  );

export const getMaintenanceTicketOverviewData = (state, id) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketOverview", id, "data"],
    null,
  );
export const getMaintenanceTicketOverviewLoading = (state) =>
  get(
    state,
    ["maintenanceTicket", "maintenanceTicketOverview", "loading"],
    false,
  );

export const getRequestType = (state) => get(state, ["request_type"], []);
export const getTenancyOptions = (state) => get(state, ["tenancy_options"], []);
export const getRequestTypeSubType = (state) => get(state, ["sub_types"], []);
export const getLabel = (state) => get(state, ["label"], []);
export const getValue = (state) => get(state, ["value"], []);
export const getCreatedAt = (state) => get(state, ["created_at"], "");
export const getAvailableDate = (state) => get(state, ["available_date"], "");
export const getId = (state) => get(state, ["id"], "");
export const getPriority = (state) => get(state, ["priority"], "");
export const getPriorityLabel = (state) =>
  get(state, ["priority", "label"], "");
export const getPriorityValue = (state) =>
  get(state, ["priority", "value"], "");
export const getIsAllowedEntry = (state) =>
  get(state, ["is_allowed_entry"], "");
export const getPropertyUnitName = (state) =>
  get(state, ["property_unit_name"], "");
export const getRequestDate = (state) => get(state, ["request_date"], "");
export const getPropertyName = (state) => get(state, ["property_name"], "");
export const getRequestInfo = (state) => get(state, ["request_info"], "");
export const getRequestDetails = (state) => get(state, ["request_details"], "");
export const getRequestNumber = (state) => get(state, ["request_number"], "");
export const getRequesterName = (state) => get(state, ["requester_name"], "");
export const getRoomName = (state) => get(state, ["room_name"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getUrl = (state) => get(state, ["url"], "");
export const getGalleryId = (state) => get(state, ["gallery_id"], "");
export const getTechnician = (state) => get(state, ["technician"], []);
export const getTechnicianName = (state) => get(state, ["technician_name"], "");
export const getTechnicianInternalRemarks = (state) =>
  get(state, ["technician_internal_remarks"], "");
export const getTechnicianExternalRemarks = (state) =>
  get(state, ["technician_external_remarks"], "");
export const getTechnicianTicketImages = (state) =>
  get(state, ["technician_maintenance_info_images"], []);
export const getTechnicianTicketVideos = (state) =>
  get(state, ["technician_maintenance_info_video"], "");
export const getImages = (state) => get(state, ["images"], []);
export const getStatusLabel = (state) => get(state, ["status", "label"], "");
export const getStatusValue = (state) => get(state, ["status", "value"], "");
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
export const getCheckedIn = (state) => get(state, ["checked_in"], false);
export const getCheckedOut = (state) => get(state, ["checked_out"], false);
export const getIsAllowToCheckIn = (state) =>
  get(state, ["is_allow_to_check_in"], false);
export const getCheckInTime = (state) => get(state, ["check_in_time"], "");
export const getCheckInLatitude = (state) =>
  get(state, ["check_in_latitude"], "");
export const getCheckInLongitude = (state) =>
  get(state, ["check_in_longitude"], "");
export const getCheckOutTime = (state) => get(state, ["check_out_time"], "");
export const getCheckOutLatitude = (state) =>
  get(state, ["check_out_latitude"], "");
export const getCheckOutLongitude = (state) =>
  get(state, ["check_out_longitude"], "");
