import React, { useContext, useState, useEffect } from "react";

import { Button, Descriptions, Tag, Modal, Spin, message } from "antd";
import AuthContext from "../../../store/auth-context";
import { unassignApartment } from "../../../API/adminAPI";
import { getAminApartmentById } from "../../../API/apartmentAPI";

const UnrentItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apartmentInfo, setapartmentInfo] = useState({ status: 0, name: "" });
  const { unrentInfo } = props;
  const authContext = useContext(AuthContext);
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mes) => {
    messageApi.open({
      type: "success",
      content: mes,
    });
  };
  const error = (mes) => {
    messageApi.open({
      type: "error",
      content: mes,
    });
  };
  const showConfirm = () => {
    confirm({
      title: "XÁC NHẬN",
      content: `Đồng ý yêu cầu thuê của người dùng ${unrentInfo.fullName} với căn hộ ${apartmentInfo.name}`,
      onOk() {
        unassignApartment(
          { userId: unrentInfo.renterId, itemId: unrentInfo.itemId },
          authContext.token
        )
          .then((res) => {
            success(res.message);
            props.setOnReload((prev) => !prev);
          })
          .catch((err) => {
            error("Đã xảy ra lỗi vui lòng thử lại sau");
          });
      },
      onCancel() {
        return;
      },
    });
  };
  useEffect(() => {
    if (unrentInfo.id !== 0) {
      setIsLoading(true);
      getAminApartmentById(unrentInfo.itemId, authContext.token)
        .then((res) => {
          setapartmentInfo(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [unrentInfo.id]);
  return (
    <div style={{ marginLeft: "100px", textAlign: "center" }}>
      {isLoading && <Spin />}
      {contextHolder}
      {apartmentInfo.name !== "" && !isLoading && (
        <Descriptions title="" column={2}>
          <Descriptions.Item label="Tên người yêu cầu">
            {unrentInfo.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {unrentInfo.createDate.split("T")[1].split(".")[0] +
              " " +
              unrentInfo.createDate
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
          </Descriptions.Item>

          <Descriptions.Item label="Số định danh người thuê">
            {unrentInfo.cccd}
          </Descriptions.Item>

          <Descriptions.Item label="Tên căn hộ ">
            {apartmentInfo.name}
          </Descriptions.Item>
        </Descriptions>
      )}
      {apartmentInfo.name !== "" &&
        !isLoading &&
        (unrentInfo.status === false ? (
          <Button onClick={showConfirm}>Đồng ý</Button>
        ) : (
          <Button disabled>Đồng ý</Button>
        ))}
    </div>
  );
};

export default UnrentItem;
