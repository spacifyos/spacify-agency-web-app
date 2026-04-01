"use client";

import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import SvgIcon from "@/components/SvgIcon";
import {
  map,
  size,
  get,
  isEmpty,
  isEqual,
  split,
  some,
  forEach,
  set,
  filter,
  toLower,
} from "lodash";
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import Toast from "@/src/utils/Toast";
import DesktopModal from "@/components/DesktopModal";
import StatusLabel from "@/components/StatusLabel";
import MediaUploadModal from "@/components/MediaUploadModal";

const CleaningTaskDetailPage = () => {
  const router = useRouter();
  const id = get(useParams(router), ["slug"], "");

  const [secret, setSecret] = useState("");
  const [postData, setPostData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [schedulerDetail, setSchedulerDetail] = useState(null);

  const name = get(schedulerDetail, "name", "-");
  const propertyName = get(schedulerDetail, "property_name", "-");
  const unitName = get(schedulerDetail, "unit_name", "-");
  const scheduleDate = get(schedulerDetail, "schedule_date", "-");
  const scheduleStatus = get(schedulerDetail, ["status", "value"], "-");
  const isPending = isEqual(toLower(scheduleStatus), "pending");

  const [imageList, setImageList] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [currentImageContext, setCurrentImageContext] = useState({});

  const [detailUploading, setDetailUploading] = useState(false);
  const [updateDetailUploading, setUpdateDetailUploading] = useState(false);
  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(false);
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);

  useEffect(() => {
    handleImageSecretData();

    if (!id) return;
    apiRequest.getSchedulerDetailRequest(id, setLoading, setSchedulerDetail);
  }, [id]);

  const handleImageSecretData = async () => {
    await apiRequest.getRootDataRequest(() => {}, getRootDataSuccessCallback);
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setSecret(Helper.generateSecretKey(chiper1, chiper2));
  };

  const schedulerTemplateForms = useMemo(
    () => get(schedulerDetail, ["scheduler_template", "form"], []),
    [schedulerDetail],
  );

  const updateSchedulerDetail = async (postData) => {
    await apiRequest.patchSchedulerDetailRequest(
      id,
      postData,
      setDetailUploading,
      scheduleUpdateSuccessCallback,
    );
  };

  const scheduleUpdateSuccessCallback = async () => {
    Toast.success("Update Successful");

    await apiRequest.getSchedulerDetailRequest(
      id,
      () => {},
      setSchedulerDetail,
    );

    setPostData(null);
    setImageList([]);
    setOpenCollapse(null);
    setPopupImage(null);
    setShowMediaUploadModal(false);
    setCurrentImageContext({});
  };

  const fetchImageAsBase64 = async (url, secret) => {
    const token = await AuthManager.retrieveToken();
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, {
      headers,
    });

    return get(response, "data", "");
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      if (!schedulerDetail || !secret) return;

      const forms = get(schedulerDetail, ["scheduler_template", "form"], []);
      const newImageList = [];

      await Promise.all(
        map(forms, async (form) => {
          const formList = get(form, "list", {});
          await Promise.all(
            map(formList, async (item, key) => {
              const imagesUrl = get(item, "images", []);
              await Promise.all(
                map(imagesUrl, async (imageUrl) => {
                  const url = `${imageUrl.url}/based64`;
                  try {
                    const base64 = await fetchImageAsBase64(url, secret);
                    newImageList.push({
                      id: imageUrl.id,
                      url: imageUrl.url,
                      base64,
                      name: get(item, "label", ""),
                      sub_type: get(item, "image_sub_type_key", ""),
                    });
                  } catch (e) {
                    newImageList.push({
                      id: imageUrl.id,
                      url: imageUrl.url,
                      base64: null,
                      name: get(item, "label", ""),
                      sub_type: get(item, "image_sub_type_key", ""),
                    });
                  }
                }),
              );
            }),
          );
        }),
      );

      setImageList((prevList) => {
        const merged = [
          ...newImageList,
          ...prevList.filter(
            (localImg) =>
              !newImageList.some(
                (remoteImg) =>
                  (remoteImg.id &&
                    localImg.id &&
                    remoteImg.id === localImg.id) ||
                  (remoteImg.path &&
                    localImg.path &&
                    remoteImg.path === localImg.path),
              ),
          ),
        ];
        return merged;
      });
    };

    fetchAllImages();
  }, [schedulerDetail, secret]);

  const convertToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          resolve(result);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(image);
      } else {
        resolve("");
      }
    });
  };

  const onChangeImage = (e, context = {}) => {
    const images = e.target.files;

    const subType = get(context, "sub_type", "");
    const currentSubTypeCount = size(
      filter(imageList, (img) => img.sub_type === subType),
    );

    if (size(images) + currentSubTypeCount > 5) {
      Toast.error(`You can only upload up to 5 images for this section.`);
      return;
    }

    forEach(images, (image, index) =>
      checkImageSizeWithContext(image, context, index + 1),
    );

    e.target.value = "";
  };

  const handleMediaUploadSource = (source) => {
    setShowMediaUploadModal(false);

    if (source === "camera") {
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    } else if (source === "gallery") {
      if (galleryInputRef.current) {
        galleryInputRef.current.click();
      }
    }
  };

  const checkImageSizeWithContext = async (image, context, idx) => {
    const isLt5M = image && image.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      Toast.error(`Your some image is larger than 5MB`);
      return;
    }

    if (image && image.size > 1) {
      const originalName = get(image, ["name"], "");
      const extension = split(originalName, ".");
      const mimeType = get(image, ["type"], "");

      const newImageName = Helper.generateImageName(originalName);

      try {
        const base64 = await convertToBase64(image);
        const newImage = {
          type: 34,
          name: newImageName,
          originalName: originalName,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
          image: image,
          sub_type: get(context, "sub_type", ""),
        };

        setImageList((prevState) => [...prevState, newImage]);

        fetchGalleryLink(newImage);
      } catch (error) {
        Toast.error("Error converting image to base64:", error);
      }
    }
  };

  const fetchGalleryLink = (image) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getGalleryLinkSuccess(url, image, path);
      })
      .catch((err) => {
        Toast.error("Get gallery link failure.");
      });
  };

  const getGalleryLinkSuccess = (url, image, path) => {
    setImageList((prevState) => {
      return map(prevState, (state) => {
        if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
          return { ...state, url: url, path: path, id: path };
        } else {
          return state;
        }
      });
    });

    postUploadImage(url, image);
  };

  const postUploadImage = (url, image) => {
    setImageUploading(true);

    axios
      .put(url, get(image, ["image"], ""))
      .then((result) => {
        Toast.success("Image upload success.");
        setImageList((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return {
                ...state,
                status: true,
                loading: false,
              };
            } else {
              return state;
            }
          });
        });
      })
      .catch((err) => {
        Toast.error("Image upload failure.");

        setImageList((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: false, loading: false };
            } else {
              return state;
            }
          });
        });
      })
      .finally(() => setImageUploading(false));
  };

  const handleCheckboxChange = (formIndex, itemKey, newValue) => {
    setSchedulerDetail((prev) => {
      const forms = get(prev, ["scheduler_template", "form"], []);
      const updatedForms = map(forms, (form, idx) => {
        if (idx === formIndex) {
          const list = get(form, "list", {});
          const updatedList = {
            ...list,
            [itemKey]: {
              ...list[itemKey],
              value: newValue,
            },
          };
          return { ...form, list: updatedList };
        }
        return form;
      });

      return set({ ...prev }, ["scheduler_template", "form"], updatedForms);
    });
  };

  const updatePostData = () => {
    const checklist = {};
    const checklist_images = map(
      filter(imageList, (img) => !!get(img, "mime_type")),
      (img) => ({
        type: get(img, "type", 34),
        name: get(img, "name", ""),
        extension: get(img, "extension", ""),
        mime_type: get(img, "mime_type", ""),
        path: get(img, "id", ""),
        sub_type: get(img, "sub_type", ""),
      }),
    );

    const hasEmptyPath = some(checklist_images, (img) =>
      isEmpty(get(img, "path", "")),
    );
    if (hasEmptyPath) {
      Toast.error(
        "Some images are still uploading. Please wait for upload to complete before updating.",
      );
      return;
    }

    forEach(schedulerTemplateForms, (form) => {
      const formValue = get(form, "value", "");
      const formList = get(form, "list", {});
      checklist[formValue] = {};
      forEach(formList, (item, itemKey) => {
        set(checklist[formValue], itemKey, get(item, "value", 3));
      });
    });

    setPostData({
      checklist,
      checklist_images,
    });
  };

  useEffect(() => {
    if (!isEmpty(schedulerDetail) && !isEmpty(postData)) {
      updateSchedulerDetail(postData);
    }
  }, [postData]);

  const onClickSubmit = async () => {
    await apiRequest.patchSchedulerDetailStatusRequest(
      id,
      setUpdateDetailUploading,
      updateStatusSuccessCallback,
    );
  };

  const updateStatusSuccessCallback = () => {
    router.push(`/cleaning-task/${id}/successful`);
  };

  const onClickHandleSubmit = () => {
    Helper.documentGetElementById("schedule_submit_alert").showModal();
  };

  const onClickRemoveImage = (target) => {
    setImageList((prevState) =>
      filter(prevState, (img) => {
        if (target && typeof target === "object") {
          if (get(target, "path", "")) {
            return get(img, "path", "") !== get(target, "path", "");
          } else if (get(target, "id", "")) {
            return get(img, "id", "") !== get(target, "id", "");
          }
        } else {
          return (
            get(img, "path", "") !== target && get(img, "id", "") !== target
          );
        }
        return true;
      }),
    );
  };

  const onClickRemoveGallery = async (img) => {
    if (get(img, "mime_type") || get(img, "isUploaded")) {
      onClickRemoveImage(img);
      updateSchedulerDetailAfterImageRemoval(img);
    } else if (get(img, "id")) {
      await apiRequest.deleteGalleryRequest(
        get(img, "id"),
        setGalleryDeleteLoading,
        () => {
          onClickRemoveImage(img);
          updateSchedulerDetailAfterImageRemoval(img);
        },
      );
    } else {
      onClickRemoveImage(img);
      updateSchedulerDetailAfterImageRemoval(img);
    }
  };

  const updateSchedulerDetailAfterImageRemoval = (removedImg) => {
    setSchedulerDetail((prev) => {
      if (!prev) return prev;

      const forms = get(prev, ["scheduler_template", "form"], []);
      const updatedForms = map(forms, (form) => {
        const list = get(form, "list", {});
        const updatedList = {};

        forEach(list, (item, key) => {
          const imageSubTypeKey = get(item, "image_sub_type_key", "");
          if (imageSubTypeKey === get(removedImg, "sub_type", "")) {
            const images = get(item, "images", []);
            const filteredImages = filter(
              images,
              (img) =>
                get(img, "id") !== get(removedImg, "id") &&
                get(img, "path") !== get(removedImg, "path"),
            );
            updatedList[key] = { ...item, images: filteredImages };
          } else {
            updatedList[key] = item;
          }
        });

        return { ...form, list: updatedList };
      });

      return {
        ...prev,
        scheduler_template: {
          ...prev.scheduler_template,
          form: updatedForms,
        },
      };
    });
  };

  const checkboxLabels = ["Baik", "Tak Baik", "N/A"];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="flex shrink-0 items-center gap-3 pb-4">
        <button
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:bg-surface-secondary"
          onClick={() => router.back()}
        >
          <SvgIcon name="left" color="black" size={18} />
        </button>
        <div className="flex-1">
          <CustomText textClassName="text-base font-semibold text-black">
            Butiran Tugas
          </CustomText>
        </div>
        <StatusLabel status={scheduleStatus} />
      </div>

      {/* Scrollable Content */}
      <div className="hide-scroll-bar flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          {/* General Information Card */}
          <div className="rounded-2xl border border-border bg-surface">
            <div className="border-b border-border px-4 py-3">
              <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
                Maklumat Umum
              </CustomText>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4">
              <div>
                <CustomText textClassName="text-xs text-muted mb-1">
                  Name
                </CustomText>
                <CustomText textClassName="text-sm font-semibold text-black">
                  {name}
                </CustomText>
              </div>
              <div>
                <CustomText textClassName="text-xs text-muted mb-1">
                  Tarikh
                </CustomText>
                <CustomText textClassName="text-sm font-semibold text-black">
                  {scheduleDate}
                </CustomText>
              </div>
              <div>
                <CustomText textClassName="text-xs text-muted mb-1">
                  Hartanah
                </CustomText>
                <CustomText textClassName="text-sm font-semibold text-black">
                  {propertyName}
                </CustomText>
              </div>
              <div>
                <CustomText textClassName="text-xs text-muted mb-1">
                  Unit Kediaman
                </CustomText>
                <CustomText textClassName="text-sm font-semibold text-black">
                  {unitName}
                </CustomText>
              </div>
            </div>
          </div>

          {/* Checklist Form Sections */}
          {map(schedulerTemplateForms, (form, index) => {
            const formLabel = get(form, "label", "");
            const formList = get(form, "list", {});
            const isOpen = openCollapse === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                {/* Section header */}
                <button
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-3"
                  onClick={() => setOpenCollapse(isOpen ? null : index)}
                >
                  <CustomText textClassName="text-xs font-semibold text-muted uppercase tracking-wider">
                    {formLabel}
                  </CustomText>
                  <SvgIcon
                    name={isOpen ? "up" : "down"}
                    color="muted"
                    size={16}
                  />
                </button>

                {/* Section content */}
                {isOpen && (
                  <div className="border-t border-border">
                    {/* Checklist header row */}
                    <div className="flex items-center justify-between bg-surface-secondary px-4 py-2.5">
                      <CustomText textClassName="text-xs font-semibold text-muted">
                        Senarai Semak
                      </CustomText>
                      <div className="flex items-center">
                        {map(checkboxLabels, (label) => (
                          <CustomText
                            key={label}
                            textClassName="text-[10px] text-muted w-[44px] text-center"
                          >
                            {label}
                          </CustomText>
                        ))}
                      </div>
                    </div>

                    {/* Checklist items */}
                    <div className="divide-y divide-border">
                      {map(formList, (item, key) => {
                        const label = get(item, "label", "");
                        const imageSubTypeKey = get(
                          item,
                          "image_sub_type_key",
                          "",
                        );
                        const hasImage = !isEmpty(imageSubTypeKey);
                        const value = get(item, "value", 3);
                        const filteredImages = filter(
                          imageList,
                          (img) =>
                            get(img, "sub_type", "") === imageSubTypeKey,
                        );

                        const canAddMoreImages =
                          isPending && size(filteredImages) < 5;

                        return (
                          <div key={key} className="px-4 py-3">
                            <div className="flex items-center justify-between">
                              <CustomText textClassName="text-sm text-black flex-1 pr-2">
                                {label}
                              </CustomText>

                              <div className="flex shrink-0 items-center">
                                {map([1, 2, 3], (checkboxValue) => (
                                  <div
                                    key={checkboxValue}
                                    className="flex h-8 w-[44px] items-center justify-center"
                                  >
                                    {isPending ? (
                                      <button
                                        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 transition-all ${
                                          value === checkboxValue
                                            ? "border-primary bg-primary"
                                            : "border-border bg-white hover:border-primary/40"
                                        }`}
                                        onClick={() =>
                                          handleCheckboxChange(
                                            index,
                                            key,
                                            checkboxValue,
                                          )
                                        }
                                        aria-label={`Select ${label} as ${checkboxLabels[checkboxValue - 1]}`}
                                      >
                                        {value === checkboxValue && (
                                          <SvgIcon
                                            name="check"
                                            color="white"
                                            size={14}
                                          />
                                        )}
                                      </button>
                                    ) : value === checkboxValue ? (
                                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                                        <SvgIcon
                                          name="check"
                                          color="white"
                                          size={14}
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-6 w-6 rounded-md border-2 border-border bg-white" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {hasImage && (
                              <div className="mt-3 rounded-xl bg-surface-secondary p-3">
                                <CustomText textClassName="text-xs text-muted mb-2">
                                  Gambar{" "}
                                  <span className="text-muted/60">
                                    (3-5 gambar, maks 5MB)
                                  </span>
                                </CustomText>

                                <div className="flex flex-wrap items-center gap-2">
                                  {map(filteredImages, (img, idx) => {
                                    const imgSrc = isEmpty(img.mime_type)
                                      ? get(img, "url", "")
                                      : get(img, "base64", "");
                                    const isUploaded = !isEmpty(
                                      get(img, "path", ""),
                                    );

                                    return (
                                      <div
                                        key={idx}
                                        className={`relative overflow-hidden rounded-xl border-2 ${
                                          !isUploaded
                                            ? "border-border"
                                            : get(img, "status", "")
                                              ? "border-available"
                                              : "border-error"
                                        }`}
                                      >
                                        <CustomImage
                                          src={imgSrc}
                                          className="h-[72px] w-[72px] cursor-pointer"
                                          onClick={() =>
                                            setPopupImage(imgSrc)
                                          }
                                        />

                                        {get(img, "loading", "") ? (
                                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <span className="loading loading-spinner loading-sm text-white" />
                                          </div>
                                        ) : (
                                          isPending && (
                                            <button
                                              className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-error"
                                              onClick={() =>
                                                onClickRemoveGallery(img)
                                              }
                                            >
                                              <SvgIcon
                                                name="close"
                                                color="white"
                                                size={12}
                                              />
                                            </button>
                                          )
                                        )}
                                      </div>
                                    );
                                  })}

                                  {canAddMoreImages && (
                                    <button
                                      className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-white transition-colors hover:border-primary/30 hover:bg-primary/5"
                                      onClick={() => {
                                        setCurrentImageContext({
                                          formIndex: index,
                                          itemKey: key,
                                          sub_type: imageSubTypeKey,
                                        });
                                        setShowMediaUploadModal(true);
                                      }}
                                    >
                                      <SvgIcon
                                        name="add"
                                        color="muted"
                                        size={20}
                                      />
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Update button per section */}
                    {isPending && (
                      <div className="border-t border-border px-4 py-3">
                        <CustomButton
                          buttonClassName="btn-primary-outline btn-sm w-full"
                          buttonText="Kemaskini"
                          textClassName="text-xs"
                          onClick={updatePostData}
                          loading={detailUploading}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit button */}
          {!isEmpty(schedulerDetail) && isPending && (
            <CustomButton
              buttonClassName="btn-primary min-h-12 h-12 rounded-xl w-full"
              buttonText="Hantar Laporan"
              textClassName="text-sm font-semibold"
              onClick={onClickHandleSubmit}
              loading={updateDetailUploading}
            />
          )}
        </div>
      </div>

      {/* Image popup overlay */}
      {popupImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPopupImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <CustomImage
              src={popupImage}
              alt="Popup"
              className="max-h-[80vh] max-w-[90vw] rounded-2xl"
            />
          </div>

          <button
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={() => setPopupImage(null)}
          >
            <SvgIcon name="close" color="white" size={18} />
          </button>
        </div>
      )}

      {/* Confirmation modal */}
      <DesktopModal id="schedule_submit_alert">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <CustomText textClassName="text-base font-semibold text-black">
              Pengesahan
            </CustomText>
            <form method="dialog">
              <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-surface-secondary">
                <SvgIcon name="close" color="muted" size={16} />
              </button>
            </form>
          </div>

          <div className="my-4 border-t border-border" />

          <CustomText textClassName="text-sm text-black leading-relaxed">
            Adakah anda pasti untuk menyerahkan, selepas diserahkan tidak boleh
            berubah
          </CustomText>

          <div className="flex gap-3 pt-5">
            <CustomButton
              buttonClassName="btn-primary-outline flex-1 min-h-10 h-10"
              buttonText="Tidak"
              onClick={() => {
                Helper.documentGetElementById("schedule_submit_alert").close();
              }}
            />
            <CustomButton
              buttonClassName="btn-primary flex-1 min-h-10 h-10"
              buttonText="Ya"
              onClick={onClickSubmit}
              loading={updateDetailUploading}
            />
          </div>
        </div>
      </DesktopModal>

      <input
        capture="environment"
        accept="image/*"
        type="file"
        multiple
        hidden
        ref={cameraInputRef}
        onChange={(e) => onChangeImage(e, currentImageContext)}
      />

      <input
        accept="image/*"
        type="file"
        multiple
        hidden
        ref={galleryInputRef}
        onChange={(e) => onChangeImage(e, currentImageContext)}
      />

      <MediaUploadModal
        isOpen={showMediaUploadModal}
        onClose={() => setShowMediaUploadModal(false)}
        onSelectSource={handleMediaUploadSource}
        title="Pilih Sumber Gambar"
        type="image"
      />
    </div>
  );
};

export default CleaningTaskDetailPage;
