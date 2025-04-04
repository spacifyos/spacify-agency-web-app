import { get } from "lodash";

export const getAgreementListingData = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "data"], null);
export const getAgreementListingPagination = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "pagination"], null);
export const getAgreementListingLoading = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "loading"], false);

export const getAgreementOverviewData = (state, id) =>
  get(state, ["agreement", "agreementOverview", id, "data"], null);
export const getAgreementOverviewLoading = (state) =>
  get(state, ["agreement", "agreementOverview", "loading"], false);

export const getId = (state) => get(state, ["id"], "");
export const getReferenceNumber = (state) =>
  get(state, ["reference_number"], "");
export const getIsOwnerAgreement = (state) =>
  get(state, ["attribute", "is_owner_agreement"], false);
export const getStatus = (state) => get(state, ["status"], "");
export const getProperty = (state) => get(state, ["property"], "");
export const getTenurePeriod = (state) => get(state, ["tenure_period"], "");
export const getAgree = (state) => get(state, ["is_agreed"], false);
export const getSigned = (state) => get(state, ["is_signed"], false);
export const getAgreedDate = (state) => get(state, ["agree_at"], "");
export const getAgreementDate = (state) => get(state, ["agreement_date"], "");
export const getSignedDate = (state) => get(state, ["signed_at"], "");
export const getTenantName = (state) => get(state, ["signee", "name"], "");
export const getTenantIc = (state) => get(state, ["signee", "identity"], "");
export const isCanAgree = (state) =>
  get(state, ["attribute", "is_can_agree"], false);
export const isCanSign = (state) =>
  get(state, ["attribute", "is_can_sign"], false);
export const hasPinNumber = (state) =>
  get(state, ["attribute", "signee_has_pin_number"], false);
export const getUrl = (state) => get(state, ["url"], "");
export const getHasMorePages = (state) => get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => get(state, ["total"], 1);
export const getCurrentPage = (state) => get(state, ["current_page"], 1);
export const getLastPage = (state) => get(state, ["last_page"], 1);
