import React from "react";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

import UserHeader from "./Header/UserHeader";
import classes from "./UserPage.module.css";

const UserPage = (props) => {
  return (
    <section>
      <UserHeader />
      <h2 className={classes.header}>Apartment List</h2>
      <ApartmentList />
    </section>
  );
};

export default UserPage;

// 4 Gửi yêu cầu thuê căn hộ
// 5 Đăng ký thành viên trong căn hộ
// 6 Thanh toán hóa đơn
