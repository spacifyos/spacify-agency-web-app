"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  get,
  isEmpty,
  isEqual,
  map,
  filter,
  toInteger,
  first,
  size,
  forEach,
  split,
  last,
  toString,
} from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import apiInstance from "@/src/services/httpUtilities/httpManager";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import Helper from "@/src/utils/Helper";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import BookingTextArea from "@/components/BookingTextArea";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import ImageModal from "@/components/ImageModal";
import VideoModal from "@/components/VideoModal";
import MediaInput from "@/components/MediaInput";
import MediaUploadModal from "@/components/MediaUploadModal";

export default function CreateMaintenanceTicket() {
  const router = useRouter();

  // Refs for file uploads
  const uploadImageRef = useRef(null);
  const uploadCameraImageRef = useRef(null);
  const uploadVideoRef = useRef(null);
  const uploadCameraVideoRef = useRef(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);
  const [propertyOptionLoading, setPropertyOptionLoading] = useState(false);
  const [roomOptionsLoading, setRoomOptionsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  // Modal states for source selection
  const [showImageSourceModal, setShowImageSourceModal] = useState(false);
  const [showVideoSourceModal, setShowVideoSourceModal] = useState(false);

  // Options
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [ticketTypeOptions, setTicketTypeOptions] = useState([]);
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    property_id: "",
    block_number: "",
    floor: "",
    unit_id: "",
    room_id: "",
    request_type: "",
    request_sub_type: "",
    priority: "",
    description: "",
  });

  // Media state
  const [imageList, setImageList] = useState([]);
  const [videoValue, setVideoValue] = useState(null);

  // Modal state for viewing
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchOptions();
    fetchPropertyOptions();
  }, []);

  const fetchOptions = async () => {
    await apiRequest.getMaintenanceTicketOptionRequest(
      setOptionLoading,
      (res) => {
        // Stringify numeric values to ensure CustomSelect handles them correctly
        const typeOptions = get(res, "request_type", []);
        const formattedTypes = map(typeOptions, (type) => ({
          ...type,
          value: toString(get(type, "value", "")),
          sub_types: map(get(type, "sub_types", []), (sub) => ({
            ...sub,
            value: toString(get(sub, "value", "")),
          })),
        }));
        setTicketTypeOptions(formattedTypes);

        const priorityOptionsData = get(res, "priority_options", []);
        const formattedPriorities = map(priorityOptionsData, (p) => ({
          ...p,
          value: toString(get(p, "value", "")),
        }));
        setPriorityOptions(formattedPriorities);
      },
    );
  };

  const fetchPropertyOptions = async () => {
    await apiRequest.getPropertyOptionsRequest(
      setPropertyOptionLoading,
      (res) => {
        // Stringify numeric IDs for Property and Unit to avoid CustomSelect issues
        const formatted = map(res, (p) => ({
          ...p,
          id: toString(get(p, "id", "")),
          block: map(get(p, "block", []), (b) => ({
            ...b,
            value: toString(get(b, "value", "")),
            floor: map(get(b, "floor", []), (f) => ({
              ...f,
              value: toString(get(f, "value", "")),
              units: map(get(f, "units", []), (u) => ({
                ...u,
                id: toString(get(u, "id", "")),
              })),
            })),
          })),
        }));
        setPropertyOptions(formatted);
      },
    );
  };

  // Combined Cascade Selection Handler
  useEffect(() => {
    const propertyId = toString(get(formData, "property_id", ""));
    const blockNumber = toString(get(formData, "block_number", ""));
    const floorNumber = toString(get(formData, "floor", ""));

    if (propertyId && propertyId !== " " && propertyId !== "") {
      const selectedProperty = filter(
        propertyOptions,
        (p) => toString(get(p, "id", "")) === propertyId,
      );
      const currentBlockOptions = get(first(selectedProperty), "block", []);
      setBlockOptions(currentBlockOptions);
      console.log(selectedProperty);

      if (blockNumber && blockNumber !== " " && blockNumber !== "") {
        const selectedBlock = filter(
          currentBlockOptions,
          (b) => toString(get(b, "value", "")) === blockNumber,
        );
        const currentFloorOptions = get(first(selectedBlock), "floor", []);
        setFloorOptions(currentFloorOptions);

        if (floorNumber && floorNumber !== " " && floorNumber !== "") {
          const selectedFloor = filter(
            currentFloorOptions,
            (f) => toString(get(f, "value", "")) === floorNumber,
          );
          setUnitOptions(get(first(selectedFloor), "units", []));
        } else {
          setUnitOptions([]);
        }
      } else {
        setFloorOptions([]);
        setUnitOptions([]);
      }
    } else {
      setBlockOptions([]);
      setFloorOptions([]);
      setUnitOptions([]);
    }
  }, [
    formData.property_id,
    formData.block_number,
    formData.floor,
    propertyOptions,
  ]);

  // Ticket Type Handler
  useEffect(() => {
    const requestType = toString(get(formData, "request_type", ""));
    if (requestType && requestType !== " " && requestType !== "") {
      const selectedType = filter(
        ticketTypeOptions,
        (t) => toString(get(t, "value", "")) === requestType,
      );
      const subTypes = get(first(selectedType), "sub_types", []);
      setSubTypeOptions(subTypes);
    } else {
      setSubTypeOptions([]);
    }
  }, [formData.request_type, ticketTypeOptions]);

  // Room Handler
  useEffect(() => {
    const unitId = toString(get(formData, "unit_id", ""));
    if (unitId && unitId !== " " && unitId !== "") {
      fetchRoomOptions(unitId);
    } else {
      setRoomOptions([]);
    }
  }, [formData.unit_id]);

  const fetchRoomOptions = async (unitId) => {
    await apiRequest.getRoomOptionsRequest(
      unitId,
      setRoomOptionsLoading,
      (res) => {
        // Stringify IDs for consistency
        const formatted = map(res, (r) => ({
          ...r,
          id: toString(get(r, "id", "")),
        }));
        setRoomOptions(formatted);
      },
    );
  };

  const onChangeField = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Reset child fields when a parent changes
      if (field === "property_id") {
        newData.block_number = "";
        newData.floor = "";
        newData.unit_id = "";
      } else if (field === "block_number") {
        newData.floor = "";
        newData.unit_id = "";
      } else if (field === "floor") {
        newData.unit_id = "";
      } else if (field === "request_type") {
        newData.request_sub_type = "";
      }

      return newData;
    });
  };

  // Source selection handlers
  const handleImageSourceSelect = (source) => {
    setShowImageSourceModal(false);
    if (source === "camera") {
      uploadCameraImageRef.current.click();
    } else {
      uploadImageRef.current.click();
    }
  };

  const handleVideoSourceSelect = (source) => {
    setShowVideoSourceModal(false);
    if (source === "camera") {
      uploadCameraVideoRef.current.click();
    } else {
      uploadVideoRef.current.click();
    }
  };

  // Image Upload Logic
  const onChangeImage = (e) => {
    const files = e.target.files;
    if (size(files) + size(imageList) > 5) {
      Toast.error("You can upload up to 5 images.");
      return;
    }

    forEach(files, (file) => {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        Toast.error(`${file.name} is larger than 5MB`);
        return;
      }
      handleUploadImage(file);
    });
    e.target.value = "";
  };

  const handleUploadImage = async (file) => {
    const originalName = get(file, "name", "");
    const newImageName = Helper.generateImageName(originalName);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result;
        const tempImage = {
          name: newImageName,
          loading: true,
          base64: base64,
          status: false,
          id: newImageName, // using name as temp id for removal
        };

        setImageList((prev) => [...prev, tempImage]);
        fetchGalleryLink(file, newImageName);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      Toast.error("Error processing image.");
    }
  };

  const fetchGalleryLink = (file, newName) => {
    setImageUploading(true);
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, "data.data.url", "");
        const path = get(res, "data.data.path", "");
        uploadFileToS3(url, file, newName, path, "image");
      })
      .catch(() => {
        Toast.error("Failed to get upload link.");
        setImageList((prev) => prev.filter((img) => img.name !== newName));
      })
      .finally(() => setImageUploading(false));
  };

  const uploadFileToS3 = (url, file, newName, path, type) => {
    axios
      .put(url, file)
      .then(() => {
        if (type === "image") {
          setImageList((prev) =>
            map(prev, (img) =>
              img.name === newName
                ? {
                    ...img,
                    loading: false,
                    status: true,
                    path,
                    mime_type: file.type,
                    extension: last(split(newName, ".")),
                  }
                : img,
            ),
          );
        } else {
          setVideoValue((prev) => ({
            ...prev,
            loading: false,
            status: true,
            path,
            mime_type: file.type,
            extension: last(split(newName, ".")),
          }));
        }
      })
      .catch(() => {
        Toast.error(`Failed to upload ${type}.`);
        if (type === "image") {
          setImageList((prev) => prev.filter((img) => img.name !== newName));
        } else {
          setVideoValue(null);
        }
      });
  };

  // Video Upload Logic
  const onChangeVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
      Toast.error("Video is larger than 50MB");
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    const newVideo = {
      loading: true,
      status: false,
      tempUrl: videoUrl,
      name: Helper.generateImageName(file.name),
      id: "video_temp_id",
    };

    setVideoValue(newVideo);
    fetchVideoGalleryLink(file, newVideo.name);
    e.target.value = "";
  };

  const fetchVideoGalleryLink = (file, newName) => {
    setVideoUploading(true);
    apiInstance
      .get("/gallery")
      .then((res) => {
        const url = get(res, "data.data.url", "");
        const path = get(res, "data.data.path", "");
        uploadFileToS3(url, file, newName, path, "video");
      })
      .catch(() => {
        Toast.error("Failed to get upload link.");
        setVideoValue(null);
      })
      .finally(() => setVideoUploading(false));
  };

  const onClickRemoveGallery = (id, type) => {
    if (type === "image") {
      setImageList((prev) => prev.filter((img) => img.id !== id));
    } else {
      setVideoValue(null);
    }
  };

  const onClickPopupImage = (index) => {
    setSelectedImage(index);
    setOpenImageModal(true);
  };

  const onClickPopupVideo = () => {
    setSelectedVideo({ tempUrl: videoValue.tempUrl });
    setOpenVideoModal(true);
  };

  const onClickSubmit = async () => {
    // Validation
    const requiredFields = [
      "property_id",
      "block_number",
      "floor",
      "unit_id",
      "room_id",
      "request_type",
      "request_sub_type",
      "priority",
      "description",
    ];

    for (const field of requiredFields) {
      if (field === "room_id") {
        const unitId = get(formData, "unit_id", "");
        if (!unitId || unitId === " ") continue; // Skip room validation if no unit selected
      }

      const val = get(formData, field, "");
      if (isEmpty(val) || val === " ") {
        Toast.error(`${field.replace("_", " ")} is required.`);
        return;
      }
    }

    const postData = {
      ...formData,
      property_id: toInteger(get(formData, "property_id", 0)),
      unit_id: toInteger(get(formData, "unit_id", 0)),
      room_id: toInteger(get(formData, "room_id", 0)),
      request_type: toInteger(get(formData, "request_type", 0)),
      request_sub_type: toInteger(get(formData, "request_sub_type", 0)),
      priority: toInteger(get(formData, "priority", 0)),
      maintenance_ticket_images: filter(imageList, (img) => img.status).map(
        (img) => ({
          type: 22,
          path: img.path,
          mime_type: img.mime_type,
          extension: img.extension,
        }),
      ),
      maintenance_ticket_videos:
        videoValue && videoValue.status
          ? [
              {
                type: 23,
                path: videoValue.path,
                mime_type: videoValue.mime_type,
                extension: videoValue.extension,
              },
            ]
          : [],
    };

    await apiRequest.postMaintenanceTicketRequest(postData, setLoading, () => {
      router.push("/help-center");
    });
  };

  return (
    <div className="hide-scroll-bar relative flex h-full flex-col gap-6 overflow-hidden overflow-y-scroll rounded-3xl bg-white p-6">
      <LoadingOverlay
        loading={loading || optionLoading || propertyOptionLoading}
      />

      <div className="flex items-center gap-4">
        <CustomImage
          src={Images.leftIconBlack}
          className="h-6 w-6 cursor-pointer"
          onClick={() => router.back()}
        />
        <CustomText textClassName="text-xl font-bold">
          Create Maintenance Ticket
        </CustomText>
      </div>

      {/* Section 1: Property Selection */}
      <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4">
        <CustomText textClassName="font-bold text-primary">
          Property Information
        </CustomText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomSelect
            label="Property"
            placeholder="Select Property"
            optionList={propertyOptions}
            value={formData.property_id}
            onChange={(e) => onChangeField("property_id", e.target.value)}
            required
          />
          <CustomSelect
            label="Block"
            placeholder="Select Block"
            optionList={blockOptions}
            value={formData.block_number}
            onChange={(e) => onChangeField("block_number", e.target.value)}
            required
          />
          <CustomSelect
            label="Floor"
            placeholder="Select Floor"
            optionList={floorOptions}
            value={formData.floor}
            onChange={(e) => onChangeField("floor", e.target.value)}
            required
          />
          <CustomSelect
            label="Unit"
            placeholder="Select Unit"
            optionList={unitOptions}
            value={formData.unit_id}
            onChange={(e) => onChangeField("unit_id", e.target.value)}
            required
          />
          {formData.unit_id && formData.unit_id !== " " && (
            <CustomSelect
              label="Room"
              placeholder="Select Room"
              optionList={roomOptions}
              value={formData.room_id}
              onChange={(e) => onChangeField("room_id", e.target.value)}
              required
            />
          )}
        </div>
      </div>

      {/* Section 2: Ticket Details */}
      <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4">
        <CustomText textClassName="font-bold text-primary">
          Ticket Details
        </CustomText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CustomSelect
            label="Ticket Type"
            placeholder="Select Type"
            optionList={ticketTypeOptions}
            value={formData.request_type}
            onChange={(e) => onChangeField("request_type", e.target.value)}
            required
          />
          <CustomSelect
            label="Sub Type"
            placeholder="Select Sub Type"
            optionList={subTypeOptions}
            value={formData.request_sub_type}
            onChange={(e) => onChangeField("request_sub_type", e.target.value)}
            required
          />
          <CustomSelect
            label="Priority"
            placeholder="Select Priority"
            optionList={priorityOptions}
            value={formData.priority}
            onChange={(e) => onChangeField("priority", e.target.value)}
            required
          />
        </div>

        <BookingTextArea
          title="Issues"
          placeholder="Describe the issues..."
          value={formData.description}
          onChange={(e) => onChangeField("description", e.target.value)}
          required
        />

        {/* Media Upload */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-1">
              <CustomText textClassName="text-error">*</CustomText>
              <CustomText textClassName="text-xs font-bold">
                Proof of Image (Max 5, 5MB each)
              </CustomText>
            </div>
            <MediaInput
              type="image"
              value={imageList}
              loading={imageUploading}
              onRemove={onClickRemoveGallery}
              onPopup={onClickPopupImage}
              onShowSourceModal={() => setShowImageSourceModal(true)}
              uploadRef={uploadImageRef}
              uploadCameraRef={uploadCameraImageRef}
              onChange={onChangeImage}
              maxCount={5}
              currentCount={size(imageList)}
              multiple={true}
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <CustomText textClassName="text-error">*</CustomText>
              <CustomText textClassName="text-xs font-bold">
                Proof of Video (Max 1, 50MB)
              </CustomText>
            </div>
            <MediaInput
              type="video"
              value={videoValue ? [videoValue] : []}
              loading={videoUploading}
              onRemove={onClickRemoveGallery}
              onPopup={onClickPopupVideo}
              onShowSourceModal={() => setShowVideoSourceModal(true)}
              uploadRef={uploadVideoRef}
              uploadCameraRef={uploadCameraVideoRef}
              onChange={onChangeVideo}
              maxCount={1}
              currentCount={videoValue ? 1 : 0}
              multiple={false}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pb-6">
        <CustomButton
          buttonText="Cancel"
          buttonClassName="btn-white w-32"
          onClick={() => router.back()}
        />
        <CustomButton
          buttonText="Create Ticket"
          buttonClassName="btn-primary w-32"
          onClick={onClickSubmit}
          loading={loading || imageUploading || videoUploading}
        />
      </div>

      <MediaUploadModal
        isOpen={showImageSourceModal}
        onClose={() => setShowImageSourceModal(false)}
        onSelectSource={handleImageSourceSelect}
        title="Select Image Source"
        type="image"
      />

      <MediaUploadModal
        isOpen={showVideoSourceModal}
        onClose={() => setShowVideoSourceModal(false)}
        onSelectSource={handleVideoSourceSelect}
        title="Select Video Source"
        type="video"
      />

      <ImageModal
        data={imageList.map((img) => ({ image: img.base64 }))}
        selectedImage={selectedImage}
        onClickCloseImageModal={() => setOpenImageModal(false)}
        openImageModal={openImageModal}
      />

      <VideoModal
        onClickCloseVideoModal={() => setOpenVideoModal(false)}
        openVideoModal={openVideoModal}
        selectedVideo={selectedVideo}
      />
    </div>
  );
}
