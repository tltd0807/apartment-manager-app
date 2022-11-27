import React, { useState, useEffect, useContext } from "react";
import { assignApartment, getApartmentById } from "../../../../API/adminAPI";
import AuthContext from "../../../../store/auth-context";
import classes from "./RequestInfo.module.css";
const RequestInfo = ({ requestInfo }) => {
  const [apartmentInfo, setapartmentInfo] = useState({ status: 0, name: "" });
  const autCtx = useContext(AuthContext);
  console.log(requestInfo);
  useEffect(() => {
    if (requestInfo.id !== 0) {
      getApartmentById(requestInfo.itemId, autCtx.token)
        .then((res) => setapartmentInfo(res.data))
        .catch((err) => console.log(err));
    }
  }, [requestInfo]);
  const onAssign = () => {
    if (
      window.confirm(
        `Bạn muốn đồng ý yêu cầu của người dùng ${requestInfo.fullName}`
      )
    ) {
      assignApartment(
        { userId: requestInfo.renterId, itemId: requestInfo.itemId },
        autCtx.token
      )
        .then((res) => window.alert(res.message))
        .catch((err) => {
          window.alert("Đã xảy ra lỗi vui lòng thử lại sau");
        });
    }
  };
  let requestDetail;
  if (requestInfo.id === 0) {
    requestDetail = <p>Vui lòng chọn yêu cầu để xem thông tin chi tiết</p>;
  } else {
    requestDetail = (
      <div>
        <p className={classes.name}>
          <strong>Tên:</strong> {requestInfo.fullName}
        </p>
        <p className={classes.date}>
          <strong>Ngày: </strong>
          {requestInfo.createDate.split("T")[0]}
        </p>
        <p className={classes.cccd}>
          <strong>CCCD: </strong>
          {requestInfo.cccd}
        </p>
        <p className={classes.numberOfParent}>
          <strong>Số người: </strong>
          {requestInfo.numberOfParent}
        </p>
        <p>
          <strong>Trạng thái: </strong>
          {requestInfo.status ? "Đã xử lý" : "Chưa xử lý"}
        </p>
        {apartmentInfo && (
          <div>
            <p>
              <strong>Tên phòng được yêu cầu thuê: </strong>
              {apartmentInfo.name}
            </p>
            <p>
              <strong>Trạng thái phòng được yêu cầu thuê: </strong>
              {apartmentInfo.status === 1 ? "Đã được thuê" : "Còn trống"}
            </p>
          </div>
        )}
        {apartmentInfo.status === 0 ? (
          <button onClick={onAssign}>Đồng ý</button>
        ) : (
          <button disabled>Đồng ý</button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Thông tin chi tiết</h2>
      {requestDetail}
    </div>
  );
};

export default RequestInfo;
// {
// cccd: "121212112";
// createDate: "2022-09-16T17:54:20.101991";
// fullName: "Nguyễn Ngọc Gia Minh";
// id: 2;
// itemId: 1;==> search thông tin căn hộ từ đây
// numberOfParent: 1;
// renterId: 8; ==> search thông tin người muốn thuê
// status: false;
// }

// "status": 0,
//     "renterName": null,
//     "numberOfParent": 0,
//     "description": "Phòng 203, tầng 2",
//     "location": "Tầng 2",
//     "pictureUrl": [
//       "https://res.cloudinary.com/buildingmanager/image/upload/v1663293219/wjv80qoggdwedssudovb.jpg",
//       "https://res.cloudinary.com/buildingmanager/image/upload/v1663293219/rexfumrnaogblwz1jxhd.jpg",
//       "https://res.cloudinary.com/buildingmanager/image/upload/v1663293220/mvw6bxfp1t8jrru62kv6.jpg"
//     ],
//     "videoUrl": "https://res.cloudinary.com/buildingmanager/video/upload/v1663293220/giwysaf0oojjzpnqlqib.mp4",
//     "comments": [],
//     "id": 8,
//     "name": "Phòng 203",
//     "price": 2000,
//     "avatarUrl": "https://res.cloudinary.com/buildingmanager/image/upload/v1663293221/k2v9rwobavihrvqijted.jpg",
//     "type": "2PN 1VS"
