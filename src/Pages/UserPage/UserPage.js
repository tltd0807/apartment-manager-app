import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../SignIn/SignIn";

import UserHeader from "./Header/UserHeader";
// import classes from "./UserPage.module.css";

const UserPage = (props) => {
  return (
    <section>
      <UserHeader />
    </section>
  );
};

export default UserPage;

// 4 Gửi yêu cầu thuê căn hộ
// 5 Đăng ký thành viên trong căn hộ
// 6 Thanh toán hóa đơn
