import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
const apartmentType = {
  Studio: "Loại phòng thu",
  "2PN-2VS": "Loại 2 phòng ngủ và 2 nhà vệ sinh",
  "2PN-1VS": "Loại 2 phòng ngủ và 1 nhà vệ sinh",
  "3PN-2VS": "Loại 3 phòng ngủ và 2 nhà vệ sinh",
};
const ApartmentItem = (props) => {
  const apartDescription =
    props.type === "Studio"
      ? apartmentType.Studio
      : props.type === "2PN 2VS"
      ? apartmentType["2PN-2VS"]
      : props.type === "2PN 1VS"
      ? apartmentType["2PN-1VS"]
      : props.type === "3PN 2VS"
      ? apartmentType["3PN-2VS"]
      : "Chưa có mô tả";

  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="Image of apartment" src={props.imgSrc} />}
        actions={[
          <InfoCircleOutlined key="infomation" onClick={props.onClick} />,
        ]}
      >
        <Meta
          title={props.name}
          description={apartDescription}
          style={{ textAlign: "center" }}
        />
      </Card>
    </div>
  );
};
export default ApartmentItem;
