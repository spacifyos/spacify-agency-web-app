"use client";

import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
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
} from "lodash";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import Toast from "@/src/utils/Toast";
import DesktopModal from "@/components/DesktopModal";

export default function () {
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

  const [imageList, setImageList] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);

  const fileInputRef = useRef(null);
  const [currentImageContext, setCurrentImageContext] = useState({});

  const [detailUploading, setDetailUploading] = useState(false);
  const [updateDetailUploading, setUpdateDetailUploading] = useState(false);

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

  const schedulerTemplateForms = get(
    schedulerDetail,
    ["scheduler_template", "form"],
    [],
  );

  const updateSchedulerDetail = async (postData) => {
    await apiRequest.patchSchedulerDetailRequest(
      id,
      postData,
      setDetailUploading,
      () => Toast.success("Update Successful"),
    );
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
      let newImageList = [];

      for (const form of forms) {
        const formList = get(form, "list", {});
        for (const key in formList) {
          const item = formList[key];
          const imagesUrl = get(item, "images_url", []);
          for (let i = 0; i < imagesUrl.length; i++) {
            const url = `${imagesUrl[i]}/based64`;
            try {
              const base64 = await fetchImageAsBase64(url, secret);
              newImageList.push({
                url: imagesUrl[i],
                base64,
                name: get(item, "label", ""),
                sub_type: get(item, "image_sub_type_key", ""),
              });
            } catch (e) {
              newImageList.push({
                url: imagesUrl[i],
                base64: null,
                name: get(item, "label", ""),
                sub_type: get(item, "image_sub_type_key", ""),
              });
            }
          }
        }
      }
      setImageList(newImageList);
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

    if (size(images) + size(imageList) >= 6) {
      Toast.error(`Your image limit is up to 5.`);
      return;
    }

    forEach(images, (image, index) =>
      checkImageSizeWithContext(image, context, index + 1),
    );

    e.target.value = "";
  };

  const checkImageSizeWithContext = async (image, context, idx) => {
    const isLt5M = image && image.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      Toast.error(`Your some image is larger than 5MB`);
      return;
    }

    if (image && image.size > 1) {
      const name = get(image, ["name"], "");
      const extension = split(name, ".");
      const mimeType = get(image, ["type"], "");

      if (some(imageList, { name })) {
        Toast.error(`Image with the name "${name}" already exists.`);
        return;
      }

      try {
        const base64 = await convertToBase64(image);
        const newImage = {
          type: 34,
          name: name,
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
      const updated = { ...prev };
      const forms = [...get(updated, ["scheduler_template", "form"], [])];
      const form = { ...forms[formIndex] };
      const list = { ...form.list };
      const item = { ...list[itemKey], value: newValue };
      list[itemKey] = item;
      form.list = list;
      forms[formIndex] = form;
      updated.scheduler_template = {
        ...updated.scheduler_template,
        form: forms,
      };
      return updated;
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
    if (!isEmpty(schedulerDetail)) {
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

  return (
    <div className="hide-scroll-bar relative h-full overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl bg-white p-4 sm:p-4 md:p-4 lg:p-8 xl:p-8">
          <CustomText textClassName="font-bold text-primary pb-4">
            Maklumat Umum
          </CustomText>

          <CustomLabelValue label="Name" value={name} />
          <CustomLabelValue label="Hartanah" value={propertyName} />
          <CustomLabelValue label="Unit Kediaman" value={unitName} />
          <CustomLabelValue
            label="Tarikh Pembersihan"
            value={scheduleDate}
            styles={{ paddingBottom: 0 }}
          />
        </div>
        {map(schedulerTemplateForms, (form, index) => {
          const formLabel = get(form, "label", "");
          const formList = get(form, "list", {});
          const isOpen = openCollapse === index;

          return (
            <div
              key={index}
              className={`collapse bg-white ${isOpen ? "collapse-open" : ""}`}
            >
              <input
                type="checkbox"
                checked={isOpen}
                onChange={() => setOpenCollapse(isOpen ? null : index)}
                style={{ display: "none" }}
              />
              <div
                className="collapse-title cursor-pointer px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
                onClick={() => setOpenCollapse(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CustomText textClassName="font-bold text-primary">
                    {formLabel}
                  </CustomText>
                  <CustomImage
                    src={isOpen ? Images.upIconBlack : Images.downIconBlack}
                    className="w-4"
                  />
                </div>
              </div>
              <div className="collapse-content px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between rounded-lg bg-primary-background px-4 py-4 sm:px-4 md:px-4 lg:px-8 xl:px-8">
                    <CustomText textClassName="text-sm">
                      Senarai Semak
                    </CustomText>

                    <div className="flex items-center justify-center gap-2">
                      <div className="divider-white divider divider-horizontal"></div>
                      <CustomText textClassName="text-xs w-12 text-center">
                        Baik
                      </CustomText>
                      <div className="divider-white divider divider-horizontal"></div>
                      <CustomText textClassName="text-xs w-12 text-center">
                        Tak Baik
                      </CustomText>
                      <div className="divider-white divider divider-horizontal"></div>
                      <CustomText textClassName="text-xs w-12 text-center">
                        N/A
                      </CustomText>
                    </div>
                  </div>

                  {map(formList, (item, key) => {
                    const label = get(item, "label", "");
                    const imageSubTypeKey = get(item, "image_sub_type_key", "");
                    const hasImage = !isEmpty(imageSubTypeKey);
                    const value = get(item, "value", 3);

                    return (
                      <div
                        key={key}
                        className="rounded-lg bg-primary-background px-4 py-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
                      >
                        <div className="flex items-center justify-between">
                          <CustomText textClassName="text-sm">
                            {label}
                          </CustomText>

                          <div className="flex items-center justify-center gap-2">
                            <div className="divider-white divider divider-horizontal"></div>

                            <div className="flex w-12 justify-center">
                              <input
                                type="checkbox"
                                className="checkbox-primary checkbox border-black"
                                checked={value === 1}
                                onChange={() =>
                                  handleCheckboxChange(index, key, 1)
                                }
                              />
                            </div>

                            <div className="divider-white divider divider-horizontal"></div>

                            <div className="flex w-12 justify-center">
                              <input
                                type="checkbox"
                                className="checkbox-primary checkbox border-black"
                                checked={value === 2}
                                onChange={() =>
                                  handleCheckboxChange(index, key, 2)
                                }
                              />
                            </div>

                            <div className="divider-white divider divider-horizontal"></div>

                            <div className="flex w-12 justify-center">
                              <input
                                type="checkbox"
                                className="checkbox-primary checkbox border-black"
                                checked={value === 3}
                                onChange={() =>
                                  handleCheckboxChange(index, key, 3)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {hasImage && (
                          <div>
                            <div className="divider-white divider"></div>


                                <div>
                                  <CustomText textClassName="text-sm pb-2">
                                    Gambar{" "}
                                    <span className="text-disable">
                                    (3–5 gambar, maks 1MB setiap satu)
                                  </span>
                                  </CustomText>

                                  <div className="flex flex-wrap items-center gap-4">
                                    {map(
                                        imageList.filter(
                                            (img) => img.sub_type === imageSubTypeKey,
                                        ),
                                        (img, idx) => (
                                            <div
                                                key={idx}
                                                className="overflow-hidden"
                                            >
                                              <CustomImage
                                                  src={img.base64 || img.url}
                                                  className="h-20 w-20 cursor-pointer rounded-2xl border"
                                                  onClick={() =>
                                                      setPopupImage(img.base64 || img.url)
                                                  }
                                              />
                                            </div>
                                        ),
                                    )}

                                    {isEqual(scheduleStatus, "pending")
                                        ? imageList.filter(
                                        (img) =>
                                            img.sub_type === imageSubTypeKey,
                                    ).length < 5 && (
                                        <div
                                            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white"
                                            onClick={() => {
                                              setCurrentImageContext({
                                                formIndex: index,
                                                itemKey: key,
                                                sub_type: imageSubTypeKey,
                                              });
                                              if (fileInputRef.current)
                                                fileInputRef.current.click();
                                            }}
                                        >
                                          <CustomImage
                                              src={Images.addIconDisable}
                                              className="h-5 w-5 cursor-pointer"
                                          />
                                        </div>
                                    )
                                        : null}
                                  </div>
                                </div>

                          </div>
                        )}
                      </div>
                    );
                  })}

                  {isEqual(scheduleStatus, "pending") ? (
                    <div className="flex justify-end pt-4">
                      <CustomButton
                        buttonClassName="btn-primary btn-sm"
                        buttonText="Kemaskini"
                        onClick={() => {
                          updatePostData();
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}

        {!isEmpty(schedulerDetail) && isEqual(scheduleStatus, "pending") ? (
          <div className="flex w-full justify-center">
            <CustomButton
              buttonClassName="btn-primary min-h-9 h-9 w-32"
              buttonText="Hantar"
              textClassName="text-xs"
              onClick={onClickHandleSubmit}
            />
          </div>
        ) : null}
      </div>

      {popupImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setPopupImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <CustomImage
              src={popupImage}
              alt="Popup"
              className="max-h-[80vh] max-w-[90vw]"
            />
          </div>

          <div
            className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={() => setPopupImage(null)}
          >
            <CustomText textClassName="text-lg text-white">X</CustomText>
          </div>
        </div>
      )}

      <DesktopModal id="schedule_submit_alert">
        <div className="p-6">
          <div className="flex items-center">
            <CustomText textClassName="flex-1 text-center text-base font-bold">
              Pengesahan
            </CustomText>
            <form method="dialog" className={`flex justify-end`}>
              <button className="btn-ghost btn btn-sm btn-circle right-2">
                <CustomImage
                  className="w-3 sm:w-3 md:w-4 lg:w-4 xl:w-4"
                  src={Images.closeIconBlack}
                />
              </button>
            </form>
          </div>

          <div className="divider-line"></div>
          <CustomText>
            Adakah anda pasti untuk menyerahkan, selepas diserahkan tidak boleh
            berubah
          </CustomText>

          <div className="flex justify-end gap-4 pt-4">
            <CustomButton
              buttonClassName="btn-primary-outline"
              buttonText="Tidak"
              onClick={() => {
                Helper.documentGetElementById("schedule_submit_alert").close();
              }}
            />
            <CustomButton
              buttonClassName="btn-primary"
              buttonText="Ya"
              onClick={onClickSubmit}
            />
          </div>
        </div>
      </DesktopModal>

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => onChangeImage(e, currentImageContext)}
      />
    </div>
  );
}
