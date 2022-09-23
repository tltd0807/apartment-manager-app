import React from "react";
import Button from "../../Layout/Button/Button";

import classes from "./UserHeader.module.css";

const UserHeader = (props) => {
  return (
    <header className={classes["header-cotainer"]}>
      <h1 className={classes["welcome-title"]}>Welcome {props.name}</h1>
      <div className={classes["header-right"]}>
        <div>Yêu thích</div>
        <Button>Đăng xuất</Button>
      </div>
    </header>
  );
};

export default UserHeader;
