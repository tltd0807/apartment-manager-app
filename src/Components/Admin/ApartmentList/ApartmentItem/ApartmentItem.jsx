import React from "react";
import classes from "./ApartmentItem.module.css";
const ApartmentItem = (props) => {
  //   console.log(props.data);
  const { avatarUrl, id, name, price, status, type } = props.data;
  const statusContent =
    status === 0 ? (
      <span className={classes["not-rented"]}>trống</span>
    ) : (
      <span className={classes.rented}>đã cho thuê</span>
    );
  return (
    <div className={classes["item-container"]}>
      <h4>{name}</h4>
      <p>{price} k/tháng</p>
      <p>{type}</p>
      {statusContent}
      <button>Sửa thông tin</button>
    </div>
  );
};

export default ApartmentItem;

// avatarUrl: "https://res.cloudinary.com/buildingmanager/image/upload/v1663293479/xw9nlyaq7p59kvl08ias.jpg";
// id: 15;
// name: "Phòng 401";
// price: 4000;
// status: 0;
// type: "3PN 2VS";
