import React, { useContext, useEffect, useState } from "react";
import {
  getApartmentById,
  unassignApartment,
} from "../../../../../API/adminAPI";
import AuthContext from "../../../../../store/auth-context";
import classes from "./UnrentInfo.module.css";
const UnrentInfo = ({ unrentInfo }) => {
  const {
    cccd,
    createDate,
    fullName,
    handleTime,
    handlerId,
    id,
    item,
    itemId,
    renter,
    renterId,
    status,
  } = unrentInfo;
  const [apartmentInfo, setapartmentInfo] = useState({ status: 0, name: "" });
  const autCtx = useContext(AuthContext);
  useEffect(() => {
    if (unrentInfo.id !== 0) {
      getApartmentById(unrentInfo.itemId, autCtx.token)
        .then((res) => setapartmentInfo(res.data))
        .catch((err) => console.log(err));
    }
  }, [unrentInfo]);
  console.log(apartmentInfo);
  const onUnassign = () => {
    if (
      window.confirm(
        `Bạn muốn đồng ý yêu cầu của người dùng ${unrentInfo.fullName}`
      )
    ) {
      unassignApartment(
        { userId: unrentInfo.renterId, itemId: unrentInfo.itemId },
        autCtx.token
      )
        .then((res) => window.alert(res.message))
        .catch((err) => {
          window.alert("Đã xảy ra lỗi vui lòng thử lại sau");
        });
    }
  };
  return (
    <div>
      <p>
        <strong>Tên người yêu cầu: </strong>
        {fullName}
      </p>
      <p className={classes.date}>
        <strong>Ngày: </strong>
        {createDate.split("T")[0]}
      </p>
      <p>
        <strong>Tên căn hộ được yêu cầu hủy thuê: </strong>
        {apartmentInfo.name}
      </p>
      <button onClick={onUnassign}>Đồng ý</button>
    </div>
  );
};

export default UnrentInfo;
