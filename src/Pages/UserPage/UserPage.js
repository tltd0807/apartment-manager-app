import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import InfoBill from "../../Components/User/InfoBill/InfoBill";
import RegisterMember from "../../Components/User/RegisterMember/RegisterMember";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

import UserHeader from "./Header/UserHeader";
import classes from "./UserPage.module.css";

const UserPage = (props) => {
  const [isPay, setIsPay] = useState(false);
  const [isMoreMem, setMoreMem] = useState(false);
  const [isList, setIsList] = useState(true);
  const [isInfo, setIsInfo] = useState(false);
  const { state } = useLocation();

  return (
    <section>
      <UserHeader
        pageSate={{
          isInfo: isInfo,
          isList: isList,
          isPay: isPay,
          isMoreMem: isMoreMem,
          setIsList: setIsList,
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
      {isInfo && <div>isInfo here</div>}
      {isPay && <InfoBill />}
      {isMoreMem && <RegisterMember />}
    </section>
  );
};

export default UserPage;

// 4 Gửi yêu cầu thuê căn hộ
// 5 Đăng ký thành viên trong căn hộ
// 6 Thanh toán hóa đơn
