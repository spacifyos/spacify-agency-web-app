import { get } from "lodash";

export const getOwnerName = (state) => get(state, ["owner_name"], "");
export const getOwnerEmail = (state) => get(state, ["owner_email"], "");
export const getOwnerPhoneNumber = (state) =>
  get(state, ["owner_phone_number"], "");
export const getTotalProperty = (state) => get(state, ["total_property"], "");
export const getTotalUnits = (state) => get(state, ["total_units"], "");
export const getTotalRoom = (state) => get(state, ["total_rooms"], "");
export const getOccupancy = (state) => get(state, ["occupancy"], "");
export const getCarParkOccupancy = (state) => get(state, ["car_park_occupancy"], "");
export const getOccupancyCarPark = (state) => get(state, ["occupancy_car_park"], "");
export const getProperties = (state) => get(state, ["properties"], []);
export const getPropertyId = (state) => get(state, ["property_id"], "");
export const getPropertyName = (state) => get(state, ["property_name"], "");
export const getPropertyImage = (state) => get(state, ["property_image"], "");
export const getPropertyAddress = (state) =>
  get(state, ["property_address"], "");
export const getTotalCarPark = (state) => get(state, ["total_car_parks"], "");
export const getTotalCarParkOccupancy = (state) => get(state, ["total_car_park_occupancy"], "");
export const getCarParkVacant = (state) => get(state, ["car_park_vacant"], "");
export const getRoomVacant = (state) => get(state, ["room_vacant"], "");
export const getVacantRoom = (state) => get(state, ["vacant_room"], "");
export const getPaidAt = (state) => get(state, ["paid_at"], "");
export const getUnitRoomName = (state) => get(state, ["unit_room_name"], "");
export const getAmount = (state) => get(state, ["amount"], "");
export const getUnits = (state) => get(state, ["units"], []);
export const getUnitStatus = (state) => get(state, ["unit_status"], "");
export const getUnitName = (state) => get(state, ["unit_name"], "");
export const getUnitImage = (state) => get(state, ["unit_image"], "");
export const getTotalRooms = (state) => get(state, ["total_rooms"], "");
export const getTotalUnitOccupancy = (state) =>
  get(state, ["total_unit_occupancy"], "");
export const getTotalRoomOccupancy = (state) =>
    get(state, ["total_room_occupancy"], "");
export const getTotalRoomVacant = (state) =>
  get(state, ["total_room_vacant"], "");
export const getRooms = (state) => get(state, ["rooms"], []);
export const getStatus = (state) => get(state, ["status"], "");
export const getRemainingDays = (state) => get(state, ["remaining_days"], "");
export const getOccupancyRoom = (state) => get(state, ["occupancy_room"], "");
export const getRoomName = (state) => get(state, ["room_name"], "");
export const getSpaceType = (state) => get(state, ["space_type"], "");
export const getRentalFee = (state) => get(state, ["rental_fee"], "");
export const getTenantName = (state) => get(state, ["tenant_name"], "");
export const getRoomImage = (state) => get(state, ["room_image"], "");
export const getUnitId = (state) => get(state, ["unit_id"], 0);
export const getMonthlyTotal = (state) => get(state, ["monthly_total"], []);
export const getLabel = (state) => get(state, ["label"], "");
export const getRentDetail = (state) => get(state, ["rental_details"], []);
export const getRoom = (state) => get(state, ["room"], "");
export const getRental = (state) => get(state, ["rental"], "");
export const getStartDate = (state) => get(state, ["start_date"], "");
export const getEndDate = (state) => get(state, ["end_date"], "");
export const getRoomType = (state) => get(state, ["room_type"], "");
export const getTenant = (state) => get(state, ["tenant"], []);
export const getRentalMonth = (state) => get(state, ["rental", "month"], "");
export const getRentalRental = (state) => get(state, ["rental", "rental"], "");
