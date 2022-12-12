import { Button, Descriptions, Tag, Modal, Spin, message } from "antd";
import React, { useContext, useState, useEffect } from "react";

import { assignApartment, getApartmentById } from "../../../API/adminAPI";
import AuthContext from "../../../store/auth-context";

const RequestInfo = (props) => {
  const [apartmentInfo, setapartmentInfo] = useState({ status: 0, name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { requestInfo } = props;
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
      content: `Đồng ý yêu cầu thuê của người dùng ${requestInfo.fullName} với căn hộ ${apartmentInfo.name}`,
      onOk() {
        assignApartment(
          { userId: requestInfo.renterId, itemId: requestInfo.itemId },
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
    if (requestInfo.id !== 0) {
      setIsLoading(true);

      getApartmentById(requestInfo.itemId, authContext.token)
        .then((res) => {
          setIsLoading(false);
          setapartmentInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [requestInfo.id]);

  return (
    <div style={{ marginLeft: "100px", textAlign: "center" }}>
      {isLoading && <Spin />}
      {contextHolder}
      {apartmentInfo.name !== "" && !isLoading && (
        <Descriptions title="" column={2}>
          <Descriptions.Item label="Tên người yêu cầu">
            {requestInfo.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {requestInfo.createDate.split("T")[1].split(".")[0] +
              " " +
              requestInfo.createDate
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
          </Descriptions.Item>

          <Descriptions.Item label="Số định danh người thuê">
            {requestInfo.cccd}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái yêu cầu">
            {requestInfo.status === false ? (
              <Tag color="green">Chưa xử lý</Tag>
            ) : (
              <Tag color="volcano">Đã xử lý</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái căn hộ">
            {apartmentInfo.status === 0 ? (
              <Tag color="green">Còn trống</Tag>
            ) : (
              <Tag color="volcano">Đã được thuê</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Tên căn hộ ">
            {apartmentInfo.name}
          </Descriptions.Item>
        </Descriptions>
      )}
      {apartmentInfo.name !== "" &&
        !isLoading &&
        (apartmentInfo.status === 0 && requestInfo.status === false ? (
          <Button onClick={showConfirm}>Đồng ý</Button>
        ) : (
          <Button disabled>Đồng ý</Button>
        ))}
    </div>
  );
};

export default RequestInfo;
