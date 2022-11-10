import React, { useState } from "react";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

import UserHeader from "./Header/UserHeader";
import classes from "./UserPage.module.css";

const UserPage = (props) => {
  const [isRent, setIsRent] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isMoreMem, setMoreMem] = useState(false);
  const [isList, setIsList] = useState(false);
  return (
    <section>
      <UserHeader
        pageSate={{
          isList: isList,
          isRent: isRent,
          isPay: isPay,
          isMoreMem: isMoreMem,
          setIsList: setIsList,
          setIsRent: setIsRent,
          setIsPay: setIsPay,
          setMoreMem: setMoreMem,
        }}
      />
      {isList && (
        <div>
          <h2 className={classes.header}>Apartment List</h2>
          <ApartmentList />
        </div>
      )}
    </section>
  );
};

export default UserPage;

// 4 Gửi yêu cầu thuê căn hộ
// 5 Đăng ký thành viên trong căn hộ
// 6 Thanh toán hóa đơn
