import React, { useState, useEffect, useContext } from "react";
import { getApartmentById } from "../../../API/adminAPI";
import AuthContext from "../../../store/auth-context";
import { Spin, Descriptions, Tag, Carousel } from "antd";
const contentStyle = {
  margin: 0,
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
};
const ApartmentInfo = (props) => {
  const { itemId } = props;
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    description: " ",
    location: "",
    name: "",
    price: 0,
    renterName: "",
    status: 0,
    type: "",
    pictureUrl: ["", "", ""],
    avatarUrl: "",
  });
  useEffect(() => {
    if (itemId !== -1) {
      setIsLoading(true);
      getApartmentById(itemId, authCtx.token)
        .then((res) => {
          setItemInfo(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [itemId]);
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Thông tin căn hộ
      </h2>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginLeft: "20px",
        }}
      >
        {isLoading && <Spin />}
        {itemId !== -1 && !isLoading && (
          <Descriptions title="" column={2}>
            <Descriptions.Item label="Tên căn hộ">
              {itemInfo.name}
            </Descriptions.Item>
            <Descriptions.Item label="Vị trí">
              {itemInfo.location}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {itemInfo.status === 0 ? (
                <Tag color="green">Còn trống</Tag>
              ) : (
                <Tag color="volcano">Đã được thuê</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {itemInfo.price}USD/mo
            </Descriptions.Item>
            {itemInfo.status !== 0 && (
              <Descriptions.Item label="Người thuê: " span={2}>
                {itemInfo.renterName}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Mô tả: " span={2}>
              {itemInfo.description}
            </Descriptions.Item>
          </Descriptions>
        )}
        {itemId !== -1 && !isLoading && (
          <Carousel>
            <div style={contentStyle}>
              <img
                src={itemInfo.avatarUrl}
                alt="image"
                width={400}
                height={200}
                style={{ margin: "auto" }}
              />
            </div>
            <div style={contentStyle}>
              <img
                src={itemInfo.pictureUrl[0]}
                alt="image"
                width={400}
                height={200}
                style={{ margin: "auto" }}
              />
            </div>
            <div style={contentStyle}>
              <img
                src={itemInfo.pictureUrl[1]}
                alt="image"
                width={400}
                height={200}
                style={{ margin: "auto" }}
              />
            </div>{" "}
            <div style={contentStyle}>
              <img
                src={itemInfo.pictureUrl[2]}
                alt="image"
                width={400}
                height={200}
                style={{ margin: "auto" }}
              />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ApartmentInfo;
// avatarUrl: "https://res.cloudinary.com/buildingmanager/image/upload/v1669367517/orqm83zs10bsmdbqvevz.jpg";
// comments: [];
// description: " Phòng 405, tầng 4 với quang cảnh cực đẹp";
// id: 19;
// location: "Tầng 4";
// name: "Phòng 405 ";
// numberOfParent: 0;
// pictureUrl: (3)[
//   ("https://res.cloudinary.com/buildingmanager/image/upload/v1669367516/btck1eyp9ebluf8rsage.jpg",
//   "https://res.cloudinary.com/buildingmanager/image/upload/v1669367516/kitqppe3uagdtk6phvyr.jpg",
//   "https://res.cloudinary.com/buildingmanager/image/upload/v1669367517/jnhrx0fafqeps5jumk8a.jpg")
// ];
// price: 4999;
// renterName: "minh";
// status: 1;
// type: "3PN 2VS";
