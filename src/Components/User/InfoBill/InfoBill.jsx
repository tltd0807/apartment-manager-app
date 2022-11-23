import React, { useState } from "react";
import BillList from "./BillList/BillList";
import classes from "./InfoBill.module.css";
import Payment from "./Paid/Payment";

const InfoBill = () => {
  const [billID, setBillID] = useState(0);
  // console.log(billID);
  return (
    <section className={classes.container}>
      <div className={classes["bill-container"]}>
        <BillList setBillID={setBillID} />
      </div>
      <div className={classes["pay-container"]}>
        <Payment billID={billID} />
      </div>
    </section>
  );
};

export default InfoBill;
