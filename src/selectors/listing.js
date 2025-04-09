import { get } from "lodash";

export const getListingData = (state) =>
  get(state, ["listing", "listing", "data"], null);
export const getListingDataLoading = (state) =>
  get(state, ["listing", "listing", "loading"], false);

export const getListingBannerData = (state) =>
  get(state, ["listing", "listingBanner", "data"], null);
export const getListingBannerDataLoading = (state) =>
  get(state, ["listing", "listingBanner", "loading"], false);

export const getListingTagOptionData = (state) =>
  get(state, ["listing", "listingTagOption", "data"], null);
export const getListingTagOptionDataLoading = (state) =>
  get(state, ["listing", "listingTagOption", "loading"], false);

export const getListingPropertyData = (state) =>
  get(state, ["listing", "listingProperty", "data"], null);
export const getListingPropertyPagination = (state) =>
  get(state, ["listing", "listingProperty", "pagination"], null);
export const getListingPropertyDataLoading = (state) =>
  get(state, ["listing", "listingProperty", "loading"], false);

export const getListingPropertyDetailData = (state, id) =>
  get(state, ["listing", "listingPropertyDetail", id, "data"], null);
export const getListingPropertyDetailDataLoading = (state) =>
  get(state, ["listing", "listingPropertyDetail", "loading"], false);

export const getListingCancellationData = (state) =>
  get(state, ["listing", "listingCancellation", "data"], null);
export const getListingCancellationDataLoading = (state) =>
  get(state, ["listing", "listingCancellation", "loading"], false);

export const getBookingOverviewData = (state, id) =>
  get(state, ["listing", "bookingOverview", id, "data"], null);
export const getBookingOverviewLoading = (state) =>
  get(state, ["listing", "bookingOverview", "loading"], false);

export const getCheapestRooms = (state) => get(state, ["cheapest_rooms"], []);
export const getFeaturedRooms = (state) => get(state, ["featured_rooms"], []);
export const getPopularCity = (state) => get(state, ["popular_city"], []);
export const getPopularUniversity = (state) =>
  get(state, ["popular_university"], []);
export const getSpecialPromotion = (state) =>
  get(state, ["special_promotion"], []);
export const getPopularUniCollege = (state) =>
  get(state, ["uni_college_profile"], []);
export const getPopularCondo = (state) => get(state, ["popular_condo"], []);
export const getTags = (state) => get(state, ["tags"], []);
export const getName = (state) => get(state, ["name"], "");
export const getRooms = (state) => get(state, ["rooms"], []);
export const getImageUrl = (state) => get(state, ["image_url"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getMobileImageUrl = (state) =>
  get(state, ["mobile_image_url"], "");
export const getImageUrlActive = (state) =>
  get(state, ["image_url_active"], "");
export const getImagesUrl = (state) => get(state, ["images_url"], []);
export const getPropertyImagesUrl = (state) =>
  get(state, ["property_image_url"], "");
export const getUnitImagesUrl = (state) => get(state, ["unit_image_url"], "");
export const getRoomImagesUrl = (state) => get(state, ["room_images_url"], []);
export const getVideoUrl = (state) => get(state, ["video_url"], "");
export const getId = (state) => get(state, ["id"], 0);
export const getPropertyId = (state) => get(state, ["property_id"], 0);
export const getProfileId = (state) => get(state, ["profile_id"], "");
export const getFacilityTag = (state) => get(state, ["facility_tags"], []);
export const getGeneralTag = (state) => get(state, ["general_tags"], []);
export const getGenderTag = (state) => get(state, ["gender"], []);
export const getTenureTag = (state) => get(state, ["tenure_period"], []);
export const getSpaceType = (state) => get(state, ["space_type"], []);
export const getCode = (state) => get(state, ["code"], "");
export const getDescription = (state) => get(state, ["description"], "");
export const getRental = (state) => get(state, ["rental"], "");
export const getRentalWithSecurityDeposit = (state) =>
  get(state, ["rental_with_security_deposit"], "");
export const getFees = (state) => get(state, ["fees"], "");
export const getMoveInFees = (state) => get(state, ["move_in_fees"], null);
export const getRecommended = (state) => get(state, ["recommended"], []);
export const getFacilities = (state) => get(state, ["facilities"], []);
export const getBathroom = (state) => get(state, ["bathroom_type"], "");
export const getSquareFeet = (state) => get(state, ["square_feet"], "");
export const getBedType = (state) => get(state, ["bed_type"], "");
export const getBookingLink = (state) => get(state, ["booking_link"], "");
export const getPropertyOverviewLink = (state) =>
  get(state, ["property_overview_link"], "");
export const getBookingSettingLink = (state) =>
  get(state, ["booking_setting_links"], "");
export const getPropertyName = (state) => get(state, ["property_name"], "");
export const getUnitRoomName = (state) => get(state, ["unit_room_name"], "");
export const getUnitName = (state) => get(state, ["unit_name"], "");
export const getGender = (state) => get(state, ["gender"], "");
export const getAddress = (state) => get(state, ["address"], "");
export const getPicMemberStartDate = (state) =>
  get(state, ["pic_member_start_date"], new Date());
export const getPicName = (state) => get(state, ["pic_name"], "");
export const getLabel = (state) => get(state, ["label"], "");
export const getValue = (state) => get(state, ["value"], "");
export const getAmount = (state) => get(state, ["amount"], "");
export const getFeeAmount = (state) => get(state, ["fee_amount"], "");
export const getContactNumber = (state) => get(state, ["contact_number"], "");
export const getHtmlContent = (state) => get(state, ["html_content"], "");
export const getTitle = (state) => get(state, ["title"], "");
export const getFeesItem = (state) => get(state, ["fees", "item"], "");
export const getFeesItemOthers = (state) => get(state, ["items", "others"], []);
export const getFeesItemRentCharges = (state) =>
  get(state, ["items", "rent_charges"], []);
export const getFeesTotalCost = (state) =>
  get(state, ["fees", "total_cost"], "");
export const getTotalCostRentCharges = (state) =>
  get(state, ["total_cost", "rent_charges"], "");
export const getTotalCostFull = (state) =>
  get(state, ["total_cost", "full"], "");
export const getTotalCostPartial = (state) =>
  get(state, ["total_cost", "partial"], "");
export const getTotalCostFirstMonthRentCharges = (state) =>
  get(state, ["total_cost", "first_month_rent_charges"], "");
export const getTotalCostLastMonthRentCharges = (state) =>
  get(state, ["total_cost", "last_month_rent_charges"], "");
export const getFeesTotalCostFull = (state) =>
  get(state, ["move_in_fees", "total_cost", "full"], "");
export const getTenureOption = (state) => get(state, ["tenure_options"], []);
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
export const getReferenceNumber = (state) =>
  get(state, ["reference_number"], "");
export const getPaymentLink = (state) => get(state, ["payment_link"], "");
export const getCreatedAt = (state) => get(state, "created_at", "");
export const getPaymentStatus = (state) => get(state, ["payment_status"], "");
export const getAgencyReviewStatus = (state) =>
  get(state, ["agency_review_status"], "");
export const getAuthorizedAt = (state) => get(state, ["authorized_at"], "");
export const getTotalFees = (state) => get(state, ["total_fees"], "");
export const getTotalFeesAmount = (state) =>
  get(state, ["total_fees", "total"], "");
export const getFeesTotalCostAmount = (state) =>
  get(state, ["fees", "total_cost", "total"], "");
export const getTotalFeesFirstMonthAmount = (state) =>
  get(state, ["total_fees", "total_first_month_rent_charges"], "");
export const getTotalFeesLastMonthAmount = (state) =>
  get(state, ["total_fees", "total_last_month_rent_charges"], "");
export const getItemsWithZeroDeposit = (state) =>
  get(state, ["items_with_zero_deposit"], null);
export const getItemsWithSecurityDeposit = (state) =>
  get(state, ["items_with_security_deposit"], null);
export const getItems = (state) => get(state, ["items"], null);
export const isAllowedZeroDeposit = (state) =>
  get(state, ["is_allowed_zero_deposit"], false);
export const isAvailableBook = (state) =>
  get(state, ["is_available_to_book"], false);
export const getFirstMonthRentCharges = (state) =>
  get(state, ["first_month_rent_charges"], []);
export const getLastMonthRentCharges = (state) =>
  get(state, ["last_month_rent_charges"], []);
export const getOthers = (state) => get(state, ["others"], []);
export const getListing = (state) => get(state, ["listings"], []);
export const getAbbrBathroom = (state) => get(state, ["abbr_bathroom"], "");
export const getAbbrBedType = (state) => get(state, ["abbr_bed_type"], "");
export const getAbbrSpaceType = (state) => get(state, ["abbr_space_type"], "");
export const getCarParkOccupancyRate = (state) =>
  get(state, ["car_park_occupancy_rate"], "");
export const getTotalCarPark = (state) => get(state, ["total_car_park"], "");
export const getTotalOccupiedCarPark = (state) =>
  get(state, ["total_occupied_car_park"], "");
export const getTotalVacantCarPark = (state) =>
  get(state, ["total_vacant_car_park"], "");
export const getRoomOccupancyRate = (state) =>
  get(state, ["room_occupancy_rate"], "");
export const getTotalRoom = (state) => get(state, ["total_room"], "");
export const getTotalOccupiedRoom = (state) =>
  get(state, ["total_occupied_room"], "");
export const getTotalVacantRoom = (state) =>
  get(state, ["total_vacant_room"], "");
export const getIsOccupied = (state) => get(state, ["is_occupied"], false);
export const getUnitStatus = (state) => get(state, ["unit_status"], "");
export const getUnitIds = (state) => get(state, ["unit_ids"], []);
export const getGenderLabel = (state) => get(state, ["gender", "label"], "");
export const getStyleLabel = (state) => get(state, ["style", "label"], "");
export const getUnitStatusTypeLabel = (state) =>
  get(state, ["unit_status_type", "label"], "");
export const getSpaceStatusTypeValue = (state) =>
  get(state, ["space_status_type", "value"], 0);
