import React from "react";
import UnpaidItem from "./UnpaidItem/UnpaidItem";
import classes from "./UnpaidList.module.css";

const UnpaidList = () => {
  const data = {
    id: 1,
    name: "Phòng 101",
    price: 1000,
    latedDay: 61,
    renterId: 8,
    renterName: "minh840",
    hasMonthlyBill: false,
  };
  return (
    <div>
      <h1>UnpaidList</h1>
      <div>
        <UnpaidItem data={data} />
      </div>
    </div>
  );
};

export default UnpaidList;
