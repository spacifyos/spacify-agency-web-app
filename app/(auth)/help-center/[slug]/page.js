"use client";

import Images from "@/src/utils/Image";
import { useParams, useRouter } from "next/navigation";
import RequestOverviewDetail from "@/components/HelpCenter/RequestOverviewDetail";
import MaintenanceScheduleInformationComponent from "@/components/HelpCenter/TechnicianMaintenanceScheduleInformation";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import { useEffect, useRef, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import {
  concat,
  filter,
  forEach,
  get,
  head,
  isEmpty,
  isEqual,
  last,
  map,
  size,
  some,
  split,
  toString,
} from "lodash";
import Helper from "@/src/utils/Helper";
import AuthManager from "@/src/utils/AuthManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import ImageModal from "@/components/ImageModal";
import VideoModal from "@/components/VideoModal";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import CommentComponent from "@/components/HelpCenter/CommentComponent";
import TechnicianInFormationBoard from "@/components/HelpCenter/TechnicianInFormationBoard";
import CommentImageUploadModal from "@/components/HelpCenter/CommentImageUploadModal";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function RequestOverview() {
  const router = useRouter();
  const id = get(useParams(router), ["slug"], "");

  const uploadImageRef = useRef(null);
  const uploadVideoRef = useRef(null);
  const uploadCommentImageRef = useRef(null);

  const [secret, setSecret] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [ticketUpdateLoading, setTicketUpdateLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkOutLoading, setCheckOutLoading] = useState(false);

  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(false);
  const [postCommentLoading, setPostCommentLoading] = useState(false);
  const [getCommentLoading, setGetCommentLoading] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const [commentDataPagination, setCommentDataPagination] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const [imageList, setImageList] = useState([]);
  const [videoValue, setVideoValue] = useState(null);
  const [technicianImageList, setTechnicianImageList] = useState([]);
  const [technicianVideoValue, setTechnicianVideoValue] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageList, setSelectedImageList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [commentImage, setCommentImage] = useState([]);
  const [isCommentImageModalOpen, setIsCommentImageModalOpen] = useState(false);
  const [selectedCommentImage, setSelectedCommentImage] = useState(null);

  const [maintenanceTicketOverviewData, setMaintenanceTicketOverviewData] =
    useState([]);
  const [
    maintenanceTicketOverviewDataLoading,
    setMaintenanceTicketOverviewDataLoading,
  ] = useState(false);

  const requestNumber = maintenanceTicketSelector.getRequestNumber(
    maintenanceTicketOverviewData,
  );
  const images = maintenanceTicketSelector.getImages(
    maintenanceTicketOverviewData,
  );
  const videos = get(maintenanceTicketOverviewData, ["videos"], "");
  const technicianImages = maintenanceTicketSelector.getTechnicianTicketImages(
    maintenanceTicketOverviewData,
  );
  const technicianVideos = maintenanceTicketSelector.getTechnicianTicketVideos(
    maintenanceTicketOverviewData,
  );
  const externalRemark = maintenanceTicketSelector.getTechnicianExternalRemarks(
    maintenanceTicketOverviewData,
  );
  const internalRemark = maintenanceTicketSelector.getTechnicianInternalRemarks(
    maintenanceTicketOverviewData,
  );
  const status = maintenanceTicketSelector.getStatusValue(
    maintenanceTicketOverviewData,
  );

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (!isEmpty(commentImage)) {
      setSelectedCommentImage(head(commentImage));
    }
  }, [commentImage]);

  const handleImageSecretData = async () => {
    await apiRequest.getRootDataRequest(() => {}, getRootDataSuccessCallback);
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setSecret(Helper.generateSecretKey(chiper1, chiper2));
  };

  useEffect(() => {
    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(images)) {
      map(images, (image) => {
        fetchImageData(image);
      });
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(videos)) {
      fetchVideoData(videos);
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(technicianImages)) {
      map(technicianImages, (technicianImage) => {
        fetchTechnicianImageData(technicianImage);
      });
    }

    if (!isEmpty(maintenanceTicketOverviewData) && !isEmpty(technicianVideos)) {
      fetchTechnicianVideoData(technicianVideos);
    }

    if (!isEmpty(maintenanceTicketOverviewData)) {
      setPostData({
        technician_external_remarks: externalRemark,
        technician_internal_remarks: internalRemark,
        status: status,
      });
    }
  }, [maintenanceTicketOverviewData]);

  useEffect(() => {
    handleImageSecretData();
    fetchMaintenanceData();
    fetchTicketCommentData(id);
  }, []);

  const fetchTicketCommentData = async (id, perPage = 12, page = 1) => {
    await apiRequest.getMaintenanceTicketCommentRequest(
      id,
      perPage,
      page,
      setGetCommentLoading,
      getCommentSuccessCallback,
    );
  };

  const getCommentSuccessCallback = (res, pagination) => {
    setCommentDataPagination(pagination);

    if (isEmpty(commentData)) {
      setCommentData(res);
    } else {
      setCommentData((prevState) => {
        const currentIds = prevState.map((item) => item.id);
        const newItems = res.filter((item) => !currentIds.includes(item.id));
        return [...prevState, ...newItems];
      });
    }
  };

  const fetchMaintenanceData = async () => {
    await apiRequest.getMaintenanceTicketOverviewRequest(
      id,
      setMaintenanceTicketOverviewDataLoading,
      (res) => setMaintenanceTicketOverviewData(res),
    );
  };

  const fetchVideoData = async (video) => {
    const videoUrl = maintenanceTicketSelector.getUrl(video);
    const galleryId = maintenanceTicketSelector.getGalleryId(video);

    setVideoLoading(true);

    const url = `${videoUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, video: get(response, ["data"], "") };

        setVideoValue(res);
      })
      .catch((error) => {
        Toast.error("Fetch video failed");
      })
      .finally(() => setVideoLoading(false));
  };

  const fetchImageData = async (image) => {
    const galleryUrl = maintenanceTicketSelector.getUrl(image);
    const galleryId = maintenanceTicketSelector.getGalleryId(image);

    setImageLoading(true);

    const url = `${galleryUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, image: get(response, ["data"], "") };

        setImageList((prevState) => concat(prevState, res));
      })
      .catch((error) => {
        Toast.error("Fetch image failed");
      })
      .finally(() => setImageLoading(false));
  };

  const fetchTechnicianVideoData = async (video) => {
    const videoUrl = maintenanceTicketSelector.getUrl(video);
    const galleryId = maintenanceTicketSelector.getGalleryId(video);

    setVideoLoading(true);

    const url = `${videoUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = { id: galleryId, tempUrl: get(response, ["data"], "") };

        setTechnicianVideoValue(res);
      })
      .catch((error) => {
        Toast.error("Fetch video failed");
      })
      .finally(() => setVideoLoading(false));
  };

  const fetchTechnicianImageData = async (image) => {
    const galleryUrl = maintenanceTicketSelector.getUrl(image);
    const galleryId = maintenanceTicketSelector.getGalleryId(image);

    setImageLoading(true);

    const url = `${galleryUrl}/based64`;
    const headers = {
      "Content-Type": "application/json",
      AGSC: secret,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const res = {
          id: galleryId,
          base64: get(response, ["data"], ""),
        };

        setTechnicianImageList((prevState) => concat(prevState, res));
      })
      .catch((error) => {
        Toast.error("Fetch image failed");
      })
      .finally(() => setImageLoading(false));
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickCloseImageModal = () => {
    setOpenImageModal(false);

    setSelectedImage(null);
    setSelectedImageList([]);
  };

  const onClickPopupImage = (selectedImage, type) => {
    if (isEqual(type, "technician")) {
      setSelectedImageList(technicianImageList);
    } else {
      setSelectedImageList(imageList);
    }

    setSelectedImage(selectedImage);
    setOpenImageModal(true);
  };

  const onClickCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const onClickPopupVideo = (type) => {
    if (isEqual(type, "technician")) {
      setSelectedVideo(technicianVideoValue);
    } else {
      setSelectedVideo(videoValue);
    }

    setOpenVideoModal(true);
  };

  const onClickRemoveGallery = async (id, type, isUploadedDocument) => {
    if (isUploadedDocument) {
      if (isEqual(type, "image")) {
        onClickRemoveImage(id);
      } else if (isEqual(type, "video")) {
        onClickRemoveVideo();
      }
    } else {
      await apiRequest.deleteGalleryRequest(
        id,
        setGalleryDeleteLoading,
        deleteSuccessCallback,
      );
    }
  };

  const deleteSuccessCallback = () => {
    router.reload();
  };

  const checkImageSize = async (image) => {
    const isLt2M = image && image.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error(`Your some image is larger than 2MB`);
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

        setTechnicianImageList((prevState) => [...prevState, newImage]);

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

  const fetchGalleryLink = (image) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getGalleryLinkSuccess(url, image, path);
      })
      .catch((err) => Toast.error("Get gallery link failure."));
  };

  const getGalleryLinkSuccess = (url, image, path) => {
    setTechnicianImageList((prevState) => {
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
    axios
      .put(url, get(image, ["image"], ""))
      .then((result) => {
        Toast.success("Image upload success.");
        setTechnicianImageList((prevState) => {
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
        setTechnicianImageList((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: false, loading: false };
            } else {
              return state;
            }
          });
        });
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

  const onChangeVideo = (e) => {
    const videos = e.target.files[0];

    const isLt10M = videos && videos.size / 1024 / 1024 < 50;
    if (!isLt10M) {
      Toast.error(`Your video is larger than 50MB`);
      return;
    } else {
      const videoUrl = URL.createObjectURL(videos);

      const newVideo = {
        type: 25,
        video: videos,
        tempUrl: videoUrl,
        loading: true,
        status: false,
        extension: last(split(get(videos, ["name"], ""), ".")),
        mime_type: get(videos, ["type"], ""),
      };

      setTechnicianVideoValue((prevState) => {
        return {
          ...prevState,
          ...newVideo,
        };
      });

      fetchVideoGalleryLink(newVideo);
    }
  };

  const fetchVideoGalleryLink = (video) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getVideoGalleryLinkSuccess(url, video, path);
      })
      .catch((err) => {
        Toast.error("Get gallery link failure.");
        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
        }));
      });
  };

  const getVideoGalleryLinkSuccess = (url, videos, path) => {
    setTechnicianVideoValue((prevState) => ({
      ...prevState,
      url: url,
      path: path,
      id: path,
    }));

    postUploadVideo(url, videos);
  };

  const postUploadVideo = (url, videos) => {
    const { video } = videos;

    axios
      .put(url, video)
      .then((result) => {
        Toast.success("Image upload success.");

        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
          status: true,
        }));
      })
      .catch((err) => {
        Toast.error("Image upload failure.");

        setTechnicianVideoValue((prevState) => ({
          ...prevState,
          loading: false,
          status: false,
        }));
      });
  };

  const onClickRemoveVideo = () => {
    setTechnicianVideoValue(null);
  };

  const onClickRemoveImage = (path) => {
    setTechnicianImageList(
      filter(
        technicianImageList,
        (list) => !isEqual(get(list, ["path"], ""), path),
      ),
    );
  };

  const onClickUpdateTicket = async () => {
    await apiRequest.putMaintenanceTicketRequest(
      id,
      {
        ...postData,
        maintenance_ticket_process_images: filter(
          technicianImageList,
          (list) => !isEmpty(get(list, ["mime_type"], "")),
        ),
        maintenance_ticket_process_videos: filter(
          [technicianVideoValue],
          (list) => !isEmpty(get(list, ["mime_type"], "")),
        ),
      },
      setTicketUpdateLoading,
      updateSuccessCallback,
    );
  };

  const updateSuccessCallback = async () => {
    await fetchMaintenanceData();
    // location.reload();
  };

  const onClickSendMessage = async () => {
    await apiRequest.postMaintenanceTicketCommentRequest(
      id,
      { content: messageValue },
      setPostCommentLoading,
      postCommentSuccessCallback,
    );
  };

  const postCommentSuccessCallback = async () => {
    await fetchTicketCommentData(id);
    setMessageValue("");
    setCommentImage([]);
  };

  const onClickLoadMore = async (currentPage) => {
    await fetchTicketCommentData(id, 12, currentPage + 1);
  };

  const handleCheckInLocation = async (id, postData) => {
    await apiRequest.postMaintenanceTicketCheckInRequest(
      id,
      postData,
      setCheckInLoading,
      () => fetchMaintenanceData(),
    );
  };

  const onClickCheckIn = async () => {
    if (navigator.geolocation) {
      setCheckInLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await handleCheckInLocation(id, {
            latitude: toString(position.coords.latitude),
            longitude: toString(position.coords.longitude),
          });
        },
        (err) => {
          Toast.error(err.message);
          setCheckInLoading(false);
        },
      );
    } else {
      Toast.error("Geolocation is not supported by your browser.");
      setCheckInLoading(false);
    }
  };

  const handleCheckOutLocation = async (id, postData) => {
    await apiRequest.postMaintenanceTicketCheckOutRequest(
      id,
      postData,
      setCheckOutLoading,
      () => fetchMaintenanceData(),
    );
  };

  const onClickCheckOut = () => {
    if (navigator.geolocation) {
      setCheckOutLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await handleCheckOutLocation(id, {
            latitude: toString(position.coords.latitude),
            longitude: toString(position.coords.longitude),
          });
        },
        (err) => {
          Toast.error(err.message);
          setCheckOutLoading(false);
        },
      );
    } else {
      Toast.error("Geolocation is not supported by your browser.");
      setCheckOutLoading(false);
    }
  };

  const onChangeCommentImage = (e) => {
    const images = e.target.files;

    if (size(images) + size(imageList) >= 6) {
      Toast.error(`Your image limit is up to 5.`);
      return;
    }

    forEach(images, (image, index) => checkCommentImageSize(image, index + 1));

    e.target.value = "";
  };

  const checkCommentImageSize = async (image) => {
    const isLt2M = image && image.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error(`Your some image is larger than 2MB`);
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
        const base64 = await convertCommentImageToBase64(image);
        const newImage = {
          type: 27,
          name: name,
          extension: extension[1],
          mime_type: mimeType,
          status: false,
          loading: true,
          base64: base64,
          image: image,
        };

        setCommentImage((prevState) => [...prevState, newImage]);

        fetchCommentImageGalleryLink(newImage);
      } catch (error) {
        Toast.error("Error converting image to base64:", error);
      }
    }
  };

  const convertCommentImageToBase64 = (image) => {
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

  const fetchCommentImageGalleryLink = (image) => {
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, ["data", "data", "url"], "");
        const path = get(res, ["data", "data", "path"], "");

        Toast.success("Get gallery link success.");
        getCommentImageGalleryLinkSuccess(url, image, path);
      })
      .catch((err) => Toast.error("Get gallery link failure."));
  };

  const getCommentImageGalleryLinkSuccess = (url, image, path) => {
    setCommentImage((prevState) => {
      return map(prevState, (state) => {
        if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
          return { ...state, url: url, path: path, id: path };
        } else {
          return state;
        }
      });
    });

    postUploadCommentImage(url, image);
  };

  const postUploadCommentImage = (url, image) => {
    axios
      .put(url, get(image, ["image"], ""))
      .then((result) => {
        Toast.success("Image upload success.");

        setCommentImage((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: true, loading: false };
            } else {
              return state;
            }
          });
        });

        handleCommentImageUploadModalOpen();
      })
      .catch((err) => {
        Toast.error("Image upload failure.");
        setCommentImage((prevState) => {
          return map(prevState, (state) => {
            if (isEqual(get(state, ["name"], ""), get(image, ["name"], ""))) {
              return { ...state, status: false, loading: false };
            } else {
              return state;
            }
          });
        });
      });
  };

  const handleCommentImageUploadModalOpen = () => {
    setIsCommentImageModalOpen(true);
  };

  const handleCommentImageUploadModalClose = () => {
    setIsCommentImageModalOpen(false);
    setCommentImage([]);
  };

  const onClickRemoveCommentImage = (image) => {
    const base64 = get(image, ["base64"], "");

    setCommentImage((prevState) =>
      prevState.filter((img) => get(img, ["base64"], "") !== base64),
    );
  };

  const onClickUploadCommentImage = async () => {
    setIsCommentImageModalOpen(false);

    await apiRequest.postMaintenanceTicketCommentRequest(
      id,
      { content: "", maintenance_ticket_comment_images: commentImage },
      setPostCommentLoading,
      postCommentSuccessCallback,
    );
  };

  const onClickSelectedCommentImage = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  return (
    <div className="hide-scroll-bar relative flex h-full flex-col gap-6 overflow-hidden overflow-y-scroll rounded-3xl">
      <LoadingOverlay
        loading={
          ticketUpdateLoading ||
          (maintenanceTicketOverviewDataLoading &&
            !isEmpty(maintenanceTicketOverviewData))
        }
      />

      <RequestOverviewDetail
        data={maintenanceTicketOverviewData}
        imageLoading={imageLoading}
        imageList={imageList}
        videoValue={videoValue}
        videoLoading={videoLoading}
        onClickPopupImage={onClickPopupImage}
        onClickPopupVideo={onClickPopupVideo}
      />

      <TechnicianInFormationBoard
        data={maintenanceTicketOverviewData}
        onClickCheckIn={onClickCheckIn}
        onClickCheckOut={onClickCheckOut}
        checkInLoading={checkInLoading}
        checkOutLoading={checkOutLoading}
      />

      <MaintenanceScheduleInformationComponent
        data={maintenanceTicketOverviewData}
        images={technicianImageList}
        videos={technicianVideoValue}
        onClickPopupImage={onClickPopupImage}
        onClickPopupVideo={onClickPopupVideo}
        onClickRemoveGallery={onClickRemoveGallery}
        setPostData={setPostData}
        postData={postData}
        onChangeImage={onChangeImage}
        uploadImageRef={uploadImageRef}
        uploadVideoRef={uploadVideoRef}
        onChangeVideo={onChangeVideo}
        onClickUpdateTicket={onClickUpdateTicket}
        onClickCheckIn={onClickCheckIn}
        ticketUpdateLoading={ticketUpdateLoading}
      />

      <CommentComponent
        onClickSendMessage={onClickSendMessage}
        setMessageValue={setMessageValue}
        messageValue={messageValue}
        data={commentData}
        pagination={commentDataPagination}
        postCommentLoading={postCommentLoading}
        getCommentLoading={getCommentLoading}
        onClickLoadMore={onClickLoadMore}
        onChangeCommentImage={onChangeCommentImage}
        uploadCommentImageRef={uploadCommentImageRef}
        onClickSelectedCommentImage={onClickSelectedCommentImage}
      />

      <ImageModal
        data={selectedImageList}
        selectedImage={selectedImage}
        onClickCloseImageModal={onClickCloseImageModal}
        openImageModal={openImageModal}
      />

      <VideoModal
        onClickCloseVideoModal={onClickCloseVideoModal}
        openVideoModal={openVideoModal}
        selectedVideo={selectedVideo}
      />

      <CommentImageUploadModal
        imageList={commentImage}
        selectedImage={selectedCommentImage}
        onClickCloseModal={handleCommentImageUploadModalClose}
        open={isCommentImageModalOpen}
        setSelectedCommentImage={setSelectedCommentImage}
        onClickRemoveCommentImage={onClickRemoveCommentImage}
        onClickUploadCommentImage={onClickUploadCommentImage}
      />
    </div>
  );
}
