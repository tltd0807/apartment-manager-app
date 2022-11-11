import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

import UserHeader from "./Header/UserHeader";
import classes from "./UserPage.module.css";

const UserPage = (props) => {
  const [isRent, setIsRent] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isMoreMem, setMoreMem] = useState(false);
  const [isList, setIsList] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const { state } = useLocation();

  return (
    <section>
      <UserHeader
        pageSate={{
          isInfo: isInfo,
          isList: isList,
          isRent: isRent,
          isPay: isPay,
          isMoreMem: isMoreMem,
          setIsList: setIsList,
          setIsRent: setIsRent,
          setIsPay: setIsPay,
          setMoreMem: setMoreMem,
          setIsInfo: setIsInfo,
        }}
        userInfo={state}
      />
      {isList && (
        <div>
          <h2 className={classes.header}>Apartment List</h2>
          <ApartmentList />
        </div>
      )}
      {isInfo && <div>Info here</div>}
      {isRent && <div>isRent here</div>}
      {isPay && <div>isPay here</div>}
      {isMoreMem && <div>isMoreMem here</div>}
    </section>
  );
};

export default UserPage;

// 4 Gửi yêu cầu thuê căn hộ
// 5 Đăng ký thành viên trong căn hộ
// 6 Thanh toán hóa đơn
