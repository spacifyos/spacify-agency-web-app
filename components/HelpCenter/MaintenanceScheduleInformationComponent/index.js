import CustomText from "@/components/CustomText";
import * as maintenanceTicketSelector from "@/src/selectors/maintenance-ticket";
import CustomLabelValue from "@/components/CustomLabelValue";
import { get, isEmpty, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import SvgIcon from "@/components/SvgIcon";

const MaintenanceScheduleInformation = ({
  data,
  images,
  videos,
  onClickPopupImage,
  onClickPopupVideo,
}) => {
  const technicianName = maintenanceTicketSelector.getTechnicianName(data);
  const availableDate = maintenanceTicketSelector.getAvailableDate(data);
  const externalRemark =
    maintenanceTicketSelector.getTechnicianExternalRemarks(data);

  return (
    <div className="global-border-radius global-box-shadow bg-white p-4">
      <div className="flex justify-between items-center">
        <CustomText textClassName="text-disable text-sm">
          Maintenance Schedule Information
        </CustomText>
      </div>

      <div
        className="divider-line"
        style={{ marginTop: 16, marginBottom: 16 }}
      ></div>

      {isEmpty(externalRemark) ? (
        false
      ) : (
        <CustomLabelValue
          label={"Remarks"}
          value={isEmpty(externalRemark) ? "-" : externalRemark}
        />
      )}

      {!isEmpty(images) ? (
        <div className="pb-4">
          <CustomText textClassName="text-disable text-xs pb-1">
            Photos
          </CustomText>
          <div className="flex items-start gap-2">
            {map(images, (list, index) => {
              const image = get(list, ["image"], "");

              return (
                <div className="relative" key={index}>
                  <CustomImage
                    onClick={() => onClickPopupImage(index, "tenant")}
                    src={image}
                    className="global-border-radius border w-28 h-28 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        false
      )}

      {!isEmpty(videos) ? (
        <div className="pb-4">
          <CustomText textClassName="text-disable text-xs pb-1">
            Video
          </CustomText>
          <div
            className={`w-28 h-28 relative flex justify-center items-center border global-border-radius`}
          >
            <SvgIcon
              name="play"
              color="active"
              size={56}
              onClick={() => onClickPopupVideo("tenant")}
            />
          </div>
        </div>
      ) : (
        false
      )}

      <div className="flex flex-col justify-center items-center">
        <CustomText textClassName="text-disable text-xs">
          Maintenance Schedule Information Will Be Updated Soon
        </CustomText>
      </div>
    </div>
  );
};

export default MaintenanceScheduleInformation;
