import React, { useContext, useRef } from "react";
import classes from "./Payment.module.css";
import LOGO from "../../../../assets/Image/stripe-seeklogo.com.svg";
import AuthContext from "../../../../store/auth-context";
import { payBill } from "../../../../API/paymentAPI";

const Payment = ({ billID }) => {
  const authCtx = useContext(AuthContext);

  const cardNumberRef = useRef();
  const MonthRef = useRef();
  const YearRef = useRef();
  const cvcRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (MonthRef.current.value > 12 || MonthRef.current.value < 0) {
      alert("Vui lòng nhập tháng đúng");
      return;
    } else if (YearRef.current.value < 2023 || YearRef.current.value > 2070) {
      alert("Vui lòng nhập năm đúng");
      return;
    } else if (
      cvcRef.current.value.length < 3 ||
      cvcRef.current.value.length > 4
    ) {
      alert("Vui lòng đúng cvc");
      return;
    }
    payBill(authCtx.token, {
      cardNumber: cardNumberRef.current.value,
      month: MonthRef.current.value,
      year: YearRef.current.value,
      cvc: cvcRef.current.value,
      bllId: billID,
    })
      .then((res) => {
        console.log(res);
        alert("Thanh toán thành công vui lòng reload lại page để xem");
        cardNumberRef.current.value = "";
        MonthRef.current.value = "";
        YearRef.current.value = 0;
        cvcRef.current.value = 0;
      })
      .catch((err) => {
        alert(
          "Thanh toán thất bại vui lòng kiểm tra lại thông tin thử lại sau"
        );
        console.log(err.response.data.errors);
      });
  };
  return (
    <div className={classes.container}>
      <h2>Payment </h2>
      <img src={LOGO} alt="Stripe logo" width={100} height={100} />
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="cardNumber">Card Number </label>
          <br />
          <input
            type="text"
            placeholder=""
            id="cardNumber"
            ref={cardNumberRef}
          />
        </div>
        <div>
          <label htmlFor="month"> Month</label>
          <br />
          <input type="number" placeholder="" id="month" ref={MonthRef} />
        </div>
        <div>
          <label htmlFor="year">Year </label>
          <br />
          <input type="number" placeholder="" id="year" ref={YearRef} />
        </div>
        <div>
          <label htmlFor="cvc">CVC </label>
          <br />
          <input type="text" placeholder="" id="cvc" ref={cvcRef} />
        </div>
        <div>
          <label htmlFor="bllId">Mã hóa đơn </label>
          <br />
          <input
            type="number"
            placeholder={billID}
            id="bllId"
            disabled
            className={classes["bill-id"]}
          />
        </div>
        <button className={classes["sent-btn"]}>Gửi</button>
      </form>
    </div>
  );
};

export default Payment;
