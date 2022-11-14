import React from "react";
import classes from "./UnpaidItem.module.css";
const UnpaidItem = (props) => {
  const { data } = props;
  const { name, price, latedDay, renterName, hasMonthlyBill, renterId } = data;
  return (
    <div className={classes["item-container"]}>
      <p>
        <strong>Tên Phòng:</strong> {name}
      </p>
      <p>
        <strong>Giá:</strong> {price}
      </p>
      <p>
        <strong>Số ngày trễ:</strong> {latedDay}
      </p>
      <p>
        <strong>Tên người thuê:</strong> {renterName}
      </p>
      <p>
        <strong>Hóa đơn tháng:</strong>
        <span className={classes[`${hasMonthlyBill ? "not-have" : "had"}`]}>
          {hasMonthlyBill ? " đã có" : " chưa có"}
        </span>
      </p>
    </div>
  );
};

export default UnpaidItem;

// {
//     "id": 1,
//     "name": "Phòng 101",
//     "price": 1000,
//     "latedDay": 61,
//     "renterId": 8,
//     "renterName": "minh840",
//     "hasMonthlyBill": false
//   }
