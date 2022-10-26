import React from "react";
import Button from "../../../Components/Layout/Button/Button";

import classes from "./UserHeader.module.css";

const UserHeader = (props) => {
  return (
    <header className={classes["header-cotainer"]}>
      <h1 className={classes["welcome-title"]}>
        Welcome USERNAME {props.name}
      </h1>
      <div className={classes["header-right"]}>
        <div>Thuê căn hộ</div>
        <div>Thêm thành viên</div>
        <div>Thanh toán hóa đơn</div>
        <div>Yêu thích</div>
        <Button>Đăng xuất</Button>
      </div>
    </header>
  );
};

export default UserHeader;
