const AUTHENTICATION_TOKEN = "SpacifyAgencyToken";
const LOGIN_TYPE = "LoginType";
const REFERRAL_CODE = "ReferralCode";

async function setToken(token) {
  try {
    await localStorage.setItem(AUTHENTICATION_TOKEN, token);
  } catch (error) {
    // Error saving data
  }
}

async function removeToken() {
  try {
    await localStorage.removeItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveToken() {
  try {
    return await localStorage.getItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}

async function setLoginType(type) {
  try {
    await localStorage.setItem(LOGIN_TYPE, type);
  } catch (error) {
    // Error saving data
  }
}

async function removeLoginType() {
  try {
    await localStorage.removeItem(LOGIN_TYPE);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveType() {
  try {
    return await localStorage.getItem(LOGIN_TYPE);
  } catch (error) {
    // Error saving data
  }
}

async function setReferralCode(code) {
  try {
    await localStorage.setItem(REFERRAL_CODE, code);
  } catch (error) {
    // Error saving data
  }
}

async function removeReferralCode() {
  try {
    await localStorage.removeItem(REFERRAL_CODE);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveReferralCode() {
  try {
    return await localStorage.getItem(REFERRAL_CODE);
  } catch (error) {
    // Error saving data
  }
}

export default {
  setToken,
  retrieveToken,
  removeToken,
  setLoginType,
  removeLoginType,
  retrieveType,
  setReferralCode,
  removeReferralCode,
  retrieveReferralCode,
};
