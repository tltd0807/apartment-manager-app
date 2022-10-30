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
        <div className={classes["header-item"]}>Thuê căn hộ</div>
        <div className={classes["header-item"]}>Thêm thành viên</div>
        <div className={classes["header-item"]}>Thanh toán hóa đơn</div>
        <div className={classes["header-item"]}>Yêu thích</div>
        <Button>Đăng xuất</Button>
      </div>
    </header>
  );
};

export default UserHeader;
