"use client";

import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { map, size, get, isEmpty, isEqual, split, some, forEach } from "lodash";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import Toast from "@/src/utils/Toast";

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

  const [base64Images, setBase64Images] = useState({});
  const [openCollapse, setOpenCollapse] = useState(null);
  const [popupImage, setPopupImage] = useState(null);

  const [imageList, setImageList] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);

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

  const updateSchedulerDetail = async () => {
    await apiRequest.patchSchedulerDetailRequest(id, postData);
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
      let newBase64Images = {};

      for (const form of forms) {
        const formList = get(form, "list", {});
        for (const key in formList) {
          const item = formList[key];
          const imagesUrl = get(item, "images_url", []);
          for (let i = 0; i < imagesUrl.length; i++) {
            const url = `${imagesUrl[i]}/based64`;
            try {
              const base64 = await fetchImageAsBase64(url, secret);
              newBase64Images[imagesUrl[i]] = base64;
            } catch (e) {
              newBase64Images[imagesUrl[i]] = imagesUrl[i];
            }
          }
        }
      }
      setBase64Images(newBase64Images);
    };

    fetchAllImages();
  }, [schedulerDetail, secret]);

  const checkImageSize = async (image) => {
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
          type: 24,
          name: name,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
          image: image,
        };

        setImageList((prevState) => [...prevState, newImage]);

        fetchGalleryLink(newImage);
      } catch (error) {
        Toast.error("Error converting image to base64:", error);
      }
    }
  };

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

  const onChangeImage = (e) => {
    const images = e.target.files;

    if (size(images) + size(imageList) >= 6) {
      Toast.error(`Your image limit is up to 5.`);
      return;
    }

    forEach(images, (image, index) => checkImageSize(image, index + 1));

    e.target.value = "";
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
              return { ...state, status: true, loading: false };
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
                    const imagesUrl = get(item, "images_url", []);

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
                              <input type="checkbox" className="checkbox" />
                            </div>

                            <div className="divider-white divider divider-horizontal"></div>

                            <div className="flex w-12 justify-center">
                              <input type="checkbox" className="checkbox" />
                            </div>

                            <div className="divider-white divider divider-horizontal"></div>

                            <div className="flex w-12 justify-center">
                              <input type="checkbox" className="checkbox" />
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
                                {map(imagesUrl, (imageUrl, index) => (
                                  <div key={index} className="overflow-hidden">
                                    <CustomImage
                                      src={base64Images[imageUrl] || imageUrl}
                                      className="h-20 w-20 cursor-pointer rounded-2xl border"
                                      onClick={() =>
                                        setPopupImage(
                                          base64Images[imageUrl] || imageUrl,
                                        )
                                      }
                                    />
                                  </div>
                                ))}

                                {size(imagesUrl) < 5 && (
                                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white">
                                    <CustomImage
                                      src={Images.addIconDisable}
                                      className="h-5 w-5 cursor-pointer"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex justify-end pt-4">
                    <CustomButton
                      buttonClassName="btn-primary btn-sm"
                      buttonText="Kemaskini"
                      onClick={updateSchedulerDetail}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Image Popup Modal */}
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
    </div>
  );
}
