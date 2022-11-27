import React, { useEffect, useState } from "react";
import { getApartmentById } from "../../../../API/apartmentAPI";
import classes from "./RentListItem.module.css";
const RentListItem = (props) => {
  //   console.log(props.data);
  const {
    numberOfParent,
    id,
    fullName,
    createDate,
    status,
    cccd,
    itemId,
    renterId,
  } = props.data;
  const { setRequestInfo } = props;

  const statusContent =
    status === false ? (
      <span className={classes["not-rented"]}>chưa xử lý</span>
    ) : (
      <span className={classes.rented}> đã xử lý</span>
    );
  return (
    <div className={classes["item-container"]}>
      <p className={classes.name}>
        <strong>Tên:</strong> {fullName}
      </p>
      <p className={classes.date}>
        <strong>Ngày: </strong>
        {createDate.split("T")[0]}
      </p>
      <p className={classes.cccd}>
        <strong>CCCD: </strong>
        {cccd}
      </p>
      <p className={classes.numberOfParent}>
        <strong>Số người: </strong>
        {numberOfParent}
      </p>
      <p>
        <strong>Trạng thái: </strong>
        {statusContent}
      </p>
      <button
        onClick={() =>
          setRequestInfo({
            id: id,
            numberOfParent: numberOfParent,
            fullName: fullName,
            createDate: createDate,
            status: status,
            cccd: cccd,
            itemId: itemId,
            renterId: renterId,
          })
        }
      >
        Thông tin
      </button>
    </div>
  );
};

export default RentListItem;

// {
//   "id": 36,
//   "status": false,
//   "createDate": "2022-09-18T14:38:07.878873",
//   "fullName": "Nguyễn Ngọc Gia Minh",
//   "cccd": "221521668",
//   "numberOfParent": 2,
//   "renterId": 1,
//   "renter": null,
//   "itemId": 2,
//   "item": null
// }
