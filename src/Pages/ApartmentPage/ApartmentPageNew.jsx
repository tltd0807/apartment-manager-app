import React, { useState, useEffect, useContext } from "react";
import {
  Layout,
  Carousel,
  Spin,
  Image,
  Descriptions,
  Button,
  Modal,
} from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { getApartmentById } from "../../API/apartmentAPI";
import RentForm from "../../Components/User/RentForm.jsx/RentForm";
import classes from "./ApartmentPageNew.module.css";
import { sentRentRequest } from "../../API/userAPI";
import AuthContext from "../../store/auth-context";
const apartmentType = {
  Studio: "Loại phòng thu",
  "2PN-2VS": "Loại 2 phòng ngủ và 2 nhà vệ sinh",
  "2PN-1VS": "Loại 2 phòng ngủ và 1 nhà vệ sinh",
  "3PN-2VS": "Loại 3 phòng ngủ và 2 nhà vệ sinh",
};

const ApartmentPageNew = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState({
    CCCD: "",
    FullName: "",
    NumberOfParent: 0,
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;
  let apartDescription;
  useEffect(() => {
    getApartmentById(id ? id : 0)
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
        apartDescription =
          res.data.type === "Studio"
            ? apartmentType.Studio
            : res.data.type === "2PN 2VS"
            ? apartmentType["2PN-2VS"]
            : res.data.type === "2PN 1VS"
            ? apartmentType["2PN-1VS"]
            : res.data.type === "3PN 2VS"
            ? apartmentType["3PN-2VS"]
            : "Chưa có mô tả";
      })
      .catch((e) => console.log(e));
  }, []);
  const success = (mes) => {
    Modal.success({
      content: mes,
    });
  };
  const error = (mes) => {
    Modal.error({
      title: "ERROR",
      content: mes,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    sentRentRequest(
      {
        FullName: requestInfo.FullName,
        CCCD: requestInfo.CCCD,
        NumberOfParent: requestInfo.NumberOfParent,
        ItemId: id,
      },
      authCtx.token
    )
      .then((res) => {
        // console.log(res);
        success(res.message);
        navigate("/user/apartments");
      })
      .catch((err) => error("Đã lỗi vui lòng thử lại sau"));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <section>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal
          title="Xác nhận gửi yêu cầu với thông tin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Descriptions
            title=""
            size="middle"
            labelStyle={{ fontWeight: "bold" }}
            column={1}
          >
            <Descriptions.Item label="Họ và tên">
              {requestInfo.FullName}
            </Descriptions.Item>

            <Descriptions.Item label="CCCD">
              {requestInfo.CCCD}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng người ở" span={3}>
              {requestInfo.NumberOfParent}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        {loading && <Spin size="large" />}
        {!loading && (
          <div className={classes.container}>
            <div className={classes.carousel}>
              <Carousel>
                <div className={classes["img-container"]}>
                  <Image
                    src={info.avatarUrl}
                    alt="Apartment Image"
                    className={classes["img"]}
                    style={{ width: "650px", height: "450px" }}
                  />
                </div>
                <div className={classes["img-container"]}>
                  <Image
                    src={info.pictureUrl[0]}
                    alt="Apartment Image"
                    className={classes["img"]}
                    style={{ width: "650px", height: "450px" }}
                  />
                </div>
                <div className={classes["img-container"]}>
                  <Image
                    src={info.pictureUrl[1]}
                    alt="Apartment Image"
                    className={classes["img"]}
                    style={{ width: "650px", height: "450px" }}
                  />
                </div>
                <div className={classes["img-container"]}>
                  <Image
                    src={info.pictureUrl[2]}
                    alt="Apartment Image"
                    className={classes["img"]}
                    style={{ width: "650px", height: "450px" }}
                  />
                </div>
              </Carousel>
            </div>
            <div className={classes.content}>
              <h2 style={{ fontSize: "30px" }}>{info.name}</h2>
              <Descriptions
                title=""
                labelStyle={{ fontSize: "20px", fontWeight: "bold" }}
                contentStyle={{ fontSize: "18px" }}
                size="middle"
              >
                <Descriptions.Item label="Vị trí">
                  {info.location}
                </Descriptions.Item>
                <Descriptions.Item label=""></Descriptions.Item>

                <Descriptions.Item label="Giá">
                  {info.price}USD/tháng
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả" span={3}>
                  {info.description}
                </Descriptions.Item>

                <Descriptions.Item label="Loại" span={3}>
                  {info.type === "Studio"
                    ? apartmentType.Studio
                    : info.type === "2PN 2VS"
                    ? apartmentType["2PN-2VS"]
                    : info.type === "2PN 1VS"
                    ? apartmentType["2PN-1VS"]
                    : info.type === "3PN 2VS"
                    ? apartmentType["3PN-2VS"]
                    : "Chưa có mô tả"}
                </Descriptions.Item>
              </Descriptions>
              <div className={classes.form}>
                <RentForm
                  showModal={showModal}
                  setRequestInfo={setRequestInfo}
                  error={error}
                />
              </div>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApartmentPageNew;
// avatarUrl: "https://res.cloudinary.com/buildingmanager/image/upload/v1670126690/lbz7r9xconwrodptvjwo.jpg";
// comments: [];
// description: "Chưa có mô tả";
// id: 20;
// location: "Tầng 5";
// name: "Phòng 504";
// pictureUrl: (3)[
//   ("https://res.cloudinary.com/buildingmanager/image/upload/v1670126688/nxvkb0rghfrmdatiwj2d.jpg",
//   "https://res.cloudinary.com/buildingmanager/image/upload/v1670126688/qmzbffvuvdwydjlrzrmc.jpg",
//   "https://res.cloudinary.com/buildingmanager/image/upload/v1670126689/tiqhz5cqv9pbx2majzds.jpg")
// ];
// price: 1000;
// type: "3PN 2VS";
// videoUrl: "https://res.cloudinary.com/buildingmanager/video/upload/v1670126689/slbjdiofkxtnh8k33slj.mp4";
