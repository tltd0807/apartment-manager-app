import React from "react";
import classes from "./UnrentItem.module.css";
const UnrentItem = (props) => {
  // console.log(props.data.createDate.split("T")[0]);
  // console.log(props);
  const { data } = props;
  const { status, createDate, fullName, cccd, itemId } = data;
  // console.log(createDate);
  const statusContent =
    status === false ? (
      <span className={classes["not-rented"]}>Chưa xử lý</span>
    ) : (
      <span className={classes.rented}>đã xử lý</span>
    );
  return (
    <div className={classes["item-container"]}>
      <p>
        <strong>Tên:</strong> {fullName}
      </p>
      <p>
        <strong>Cccd:</strong> {cccd}
      </p>
      <p>
        <strong>Ngày:</strong> {createDate.split("T")[0]}
      </p>
      <p>
        <strong>Tình trạng:</strong> {statusContent}
      </p>
      <div>
        <button>Thông tin</button>
      </div>
    </div>
  );
};

export default UnrentItem;

// {
//     "id": 1,
//     "status": true,
//     "createDate": "2022-09-18T16:58:57.747285",
//     "handleTime": "2022-09-18T16:59:37.513184",
//     "handlerId": 2,
//     "fullName": "Nguyễn Ngọc Gia Minh",
//     "cccd": "221521668",
//     "renterId": 1,
//     "renter": null,
//     "itemId": 2,
//     "item": null
//   }
