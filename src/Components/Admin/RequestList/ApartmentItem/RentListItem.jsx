import React, { useEffect, useState } from "react";
import { getApartmentById } from "../../../../API/apartmentAPI";
import classes from "./RentListItem.module.css";
const RentListItem = (props) => {
  //   console.log(props.data);
  const { numberOfParent, id, fullName, createDate, status, cccd, itemId } =
    props.data;

  const statusContent =
    status === false ? (
      <span className={classes["not-rented"]}>chưa xử lý</span>
    ) : (
      <span className={classes.rented}> đã xử lý</span>
    );
  return (
    <div className={classes["item-container"]}>
      <h4 className={classes.name}>{fullName}</h4>
      <p className={classes.date}>{createDate}</p>
      <p className={classes.cccd}>{cccd}</p>
      <p className={classes.numberOfParent}>{numberOfParent}</p>

      {statusContent}
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
