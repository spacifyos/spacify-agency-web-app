import {
  ceil,
  includes,
  join,
  replace,
  reverse,
  split,
  toString,
} from "lodash";
import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import Constant from "@/src/utils/Constant";

const isProduction = process.env.NODE_ENV === "production";

const secToMin = (seconds) => {
  let secs = Math.round(seconds);

  if (secs < 0) throw new Error("Seconds must be positive");

  if (secs < 60) {
    if (secs < 10) return `0:0${secs}`;

    return `0:${secs}`;
  }

  let minuteDivisor = secs % (60 * 60);
  let minutes = Math.floor(minuteDivisor / 60);

  let secondDivisor = minuteDivisor % 60;
  let remSecs = Math.ceil(secondDivisor);

  if (remSecs < 10 && remSecs > 0) remSecs = `0${remSecs}`;
  if (remSecs === 0) remSecs = `${remSecs}0`;

  let time = {
    m: minutes,
    s: remSecs,
  };

  return `${time.m}:${time.s}`;
};

const formatToDatePicker = (date) => {
  let month = date.getMonth() + 1;

  let day = date.getDate();

  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const generateSecretKey = (secret1, secret2) => {
  const secret = new Date().getHours();
  const key1 = replace(secret1, /8/g, "o");
  const key2 = replace(secret2, /8/g, "m");
  let final = "";

  if (secret % 2 == 0) {
    const reverseKey2 = join(reverse(split(key2, "")), "");
    final = toString(CryptoJS.MD5(key1 + reverseKey2));
  } else {
    const reverseKey1 = join(reverse(split(key1, "")), "");
    final = toString(CryptoJS.MD5(key2 + reverseKey1));
  }

  return final;
};

const documentGetElementById = (id) => {
  return (
    typeof window !== "undefined" && document && document.getElementById(id)
  );
};

const documentGetElementByClassName = (className) => {
  return (
    typeof window !== "undefined" &&
    document &&
    document.getElementsByClassName(className)
  );
};

const windowInnerHeight = () => {
  return typeof window !== "undefined" && window && window.innerHeight;
};

const getFileAsBase64 = async (url, headers) => {
  try {
    const response = await axios.get(url, {
      headers,
      responseType: "blob", // important to set the response type to blob
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const reader = new FileReader();

    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject("Error converting file to base64", error);
      };
    });
  } catch (error) {
    console.error("Error downloading the file", error);
    throw error;
  }
};

const isMasterAgency = (role) => {
  return includes(role, Constant.MASTER_AGENCY_ROLE);
};

const isAgency = (role) => {
  return includes(role, Constant.AGENCY_ROLE);
};

const isTechnician = (role) => {
  return includes(role, Constant.TECHNICIAN_ROLE);
};

const isTenant = (role) => {
  return includes(role, Constant.TENANT_ROLE);
};

const isOwner = (role) => {
  return includes(role, Constant.OWNER_ROLE);
};

export default {
  isProduction,
  secToMin,
  formatToDatePicker,
  generateSecretKey,
  documentGetElementById,
  getFileAsBase64,
  windowInnerHeight,
  documentGetElementByClassName,
  isMasterAgency,
  isAgency,
  isTechnician,
  isTenant,
  isOwner,
};
