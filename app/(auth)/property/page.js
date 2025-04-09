"use client";

import { use, useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import {
  filter,
  isEmpty,
  isEqual,
  toString,
  get,
  includes,
  concat,
  remove,
} from "lodash";
import Toast from "@/src/utils/Toast";
import * as reportSelector from "@/src/selectors/report";
import FilterSection from "@/components/PropertyCardView/FilterSection";
import PropertySelectionComponent from "@/components/PropertyCardView/PropertySelectionComponent";
import DesktopUnitContent from "@/components/PropertyCardView/DesktopUnitContent";
import MobileUnitContent from "@/components/PropertyCardView/MobileUnitContent";
import CinemaUnitContent from "@/components/PropertyCardView/CinemaUnitContent";
import CardViewModal from "@/components/PropertyCardView/CardViewModal";
import Helper from "@/src/utils/Helper";
import * as authSelector from "@/src/selectors/auth";
import { useRouter } from "next/navigation";
import MobilePropertySelectionComponent from "@/components/PropertyCardView/MobilePropertySelectionComponent";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function CardListing({ params }) {
  const router = useRouter();

  const [listingTagOptionData, setListingTagOptionData] = useState([]);
  const [listingTagOptionDataLoading, setListingTagOptionDataLoading] =
    useState(false);

  const userProfileData = authSelector.getUserProfileData();

  const userRole = authSelector.getRolePermissionsRole(userProfileData);

  const [propertyListing, setPropertyListing] = useState([]);
  const [propertyListingLoading, setPropertyListingLoading] = useState(false);

  const [unitListing, setUnitListing] = useState([]);
  const [unitListingLoading, setUnitListingLoading] = useState(false);

  const [propertyOption, setPropertyOption] = useState([]);
  const [propertyOptionLoading, setPropertyOptionLoading] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [unitFilterParams, setUnitFilterParams] = useState(null);
  const [propertyFilterParams, setPropertyFilterParams] = useState(null);
  const [unitOption, setUnitOption] = useState([]);

  const [propertyValue, setPropertyValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);

  const [bedroomValue, setBedroomValue] = useState("");
  const [bathroomValue, setBathroomValue] = useState("");

  const bathroomOption = get(listingTagOptionData, ["bathroom"], []);
  const bedroomOption = get(listingTagOptionData, ["bedroom"], []);

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isCinemaView, setIsCinemaView] = useState(false);

  const [zoomIn, setZoomIn] = useState(true);

  useEffect(() => {
    if (isEmpty(listingTagOptionData)) {
      fetchListingTagOption();
    }
  }, []);

  const fetchListingTagOption = async () => {
    await apiRequest.getListingTagOptionRequest(
      setListingTagOptionDataLoading,
      listingSuccessCallback,
    );
  };

  const listingSuccessCallback = (res) => {
    setListingTagOptionData(res);
  };

  useEffect(() => {
    if (!isEmpty(unitFilterParams)) {
      fetchUnitListing(unitFilterParams);
    }
  }, [unitFilterParams]);

  useEffect(() => {
    fetchPropertyListing(propertyFilterParams);
  }, [propertyFilterParams]);

  useEffect(() => {
    fetchPropertyOption();
  }, []);

  const fetchPropertyOption = async () => {
    await apiRequest.getPropertyOptionRequest(
      setPropertyOptionLoading,
      propertyOptionSuccessCallback,
    );
  };

  const propertyOptionSuccessCallback = (res) => {
    setPropertyOption(res);
  };

  const fetchPropertyListing = async (postData) => {
    await apiRequest.postPropertyListingCardViewRequest(
      postData,
      setPropertyListingLoading,
      propertyListingSuccessCallback,
    );
  };

  const propertyListingSuccessCallback = (res) => {
    setPropertyListing(res);
  };

  const fetchUnitListing = async (id) => {
    await apiRequest.postUnitCardViewRequest(
      id,
      setUnitListingLoading,
      unitListingSuccessCallback,
    );
  };

  const unitListingSuccessCallback = (res) => {
    setUnitListing(res);
  };

  const onClickSelectProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setUnitFilterParams({ property_id: propertyId });
  };

  const onClickShareBooking = (url) => {
    navigator.clipboard.writeText(url);

    Toast.success("Copied link to clipboard.");
  };

  const onChangePropertyValue = (e) => {
    const filterProperty = filter(propertyOption, (item) =>
      isEqual(toString(item.value), e.target.value),
    );
    const targetUnit = reportSelector.getUnitOption(filterProperty[0]);

    setPropertyFilterParams({
      id: e.target.value,
    });

    setPropertyValue(e.target.value);
    setUnitOption(targetUnit);
    setUnitListing([]);
    setUnitFilterParams(null);
  };

  const onChangeUnitValue = (e) => {
    setUnitFilterParams({
      ...unitFilterParams,
      ...{ unit_id: e.target.value },
    });
    setUnitValue(e.target.value);
  };

  const onChangeStatusValue = (e) => {
    setUnitFilterParams({
      ...unitFilterParams,
      ...{ is_available_listing: e.target.value },
    });
    setStatusValue(e.target.value);
  };

  const onChangeBedroomValue = (e) => {
    setUnitFilterParams((preState) => {
      const preTags = get(preState, ["tags"], []);
      const checkPreTags = remove(
        preTags,
        (preTag) => !includes(preTag, "bed"),
      );

      return {
        ...unitFilterParams,
        ...{
          tags: isEmpty(e.target.value)
            ? checkPreTags
            : concat(checkPreTags, e.target.value),
        },
      };
    });
    setBedroomValue(e.target.value);
  };

  const onChangeBathroomValue = (e) => {
    setUnitFilterParams((preState) => {
      const preTags = get(preState, ["tags"], []);
      const checkPreTags = remove(
        preTags,
        (preTag) => !includes(preTag, "bathroom"),
      );

      return {
        ...unitFilterParams,
        ...{
          tags: isEmpty(e.target.value)
            ? checkPreTags
            : concat(checkPreTags, e.target.value),
        },
      };
    });
    setBathroomValue(e.target.value);
  };

  const onClickReset = () => {
    setPropertyFilterParams(null);
    setUnitFilterParams(null);
    setUnitListing([]);
    setPropertyValue("");
    setUnitValue("");
    setBathroomValue("");
    setBedroomValue("");
  };

  const onClickSelectRoomDetail = (data) => {
    setSelectedRoom(data);

    Helper.documentGetElementById("card_view_modal").showModal();
  };

  const onChangeViewMode = (e) => {
    setIsCinemaView(!isCinemaView);
  };

  const onClickGoBack = () => {
    router.push("/user/account");
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <LoadingOverlay loading={propertyListingLoading || unitListingLoading} />

      <CardViewModal
        data={selectedRoom}
        onClickShareBooking={onClickShareBooking}
      />

      {/*<FilterSection*/}
      {/*  isOpenFilter={isOpenFilter}*/}
      {/*  setIsOpenFilter={setIsOpenFilter}*/}
      {/*  propertyOption={propertyOption}*/}
      {/*  onChangePropertyValue={onChangePropertyValue}*/}
      {/*  propertyValue={propertyValue}*/}
      {/*  unitOption={unitOption}*/}
      {/*  onChangeUnitValue={onChangeUnitValue}*/}
      {/*  unitValue={unitValue}*/}
      {/*  bedroomOption={bedroomOption}*/}
      {/*  onChangeBedroomValue={onChangeBedroomValue}*/}
      {/*  bedroomValue={bedroomValue}*/}
      {/*  bathroomOption={bathroomOption}*/}
      {/*  onChangeBathroomValue={onChangeBathroomValue}*/}
      {/*  bathroomValue={bathroomValue}*/}
      {/*  onChangeStatusValue={onChangeStatusValue}*/}
      {/*  statusValue={statusValue}*/}
      {/*  onClickReset={onClickReset}*/}
      {/*/>*/}

      <div className="flex h-full flex-col gap-4 sm:flex-col sm:gap-4 md:flex-col md:gap-6 lg:flex-row lg:gap-6 xl:flex-row xl:gap-6">
        <PropertySelectionComponent
          propertyListing={propertyListing}
          onClickSelectProperty={onClickSelectProperty}
          selectedPropertyId={selectedPropertyId}
          userRole={userRole}
        />

        <MobilePropertySelectionComponent
          propertyListing={propertyListing}
          onClickSelectProperty={onClickSelectProperty}
          selectedPropertyId={selectedPropertyId}
          userRole={userRole}
        />

        {/*{isCinemaView ? (*/}
        <CinemaUnitContent
          unitListing={unitListing}
          onClickSelectRoomDetail={onClickSelectRoomDetail}
          zoomIn={zoomIn}
        />
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      <DesktopUnitContent*/}
        {/*        unitListing={unitListing}*/}
        {/*        onClickShareBooking={onClickShareBooking}*/}
        {/*      />*/}
        {/*      <MobileUnitContent*/}
        {/*        unitListing={unitListing}*/}
        {/*        onClickShareBooking={onClickShareBooking}*/}
        {/*      />*/}
        {/*    </>*/}
        {/*  )}*/}
      </div>
    </div>
  );
}
