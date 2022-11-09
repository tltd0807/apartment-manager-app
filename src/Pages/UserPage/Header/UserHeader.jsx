import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Layout/Button/Button";
import AuthContext from "../../../store/auth-context";

import classes from "./UserHeader.module.css";

const UserHeader = (props) => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const LogoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
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
        <Button onClick={LogoutHandler}>Đăng xuất</Button>
      </div>
    </header>
  );
};

export default UserHeader;
