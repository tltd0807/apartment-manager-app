import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Layout/Button/Button";
import AuthContext from "../../../store/auth-context";

import classes from "./UserHeader.module.css";

const UserHeader = (props) => {
  const { userInfo } = props;

  const {
    isPay,
    isMoreMem,
    isList,

    setIsPay,
    setMoreMem,
    setIsList,
    setIsInfo,
  } = props.pageSate;
  const onClickHandler = (num) => {
    switch (num) {
      case 0: {
        setIsInfo(true);
        setIsList(false);
        setIsPay(false);
        setMoreMem(false);
        break;
      }
      case 1: {
        setIsList(true);
        setIsPay(false);
        setMoreMem(false);
        setIsInfo(false);

        break;
      }
      case 3: {
        setIsList(false);
        setMoreMem(true);
        setIsInfo(false);
        setIsPay(false);
        break;
      }
      case 4: {
        setIsList(false);
        setMoreMem(false);
        setIsInfo(false);
        setIsPay(true);
        break;
      }
      default:
        return;
    }
  };

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const LogoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <header className={classes["header-cotainer"]}>
      <h1
        className={classes["welcome-title"]}
        onClick={() => onClickHandler(0)}
      >
        <img src={userInfo.avatarUrl} alt="ava" className={classes.ava} />
        <p>{userInfo.username}</p>
      </h1>
      <div className={classes["header-right"]}>
        <div
          className={`${classes["header-item"]} ${isList && classes.active} `}
          onClick={() => onClickHandler(1)}
        >
          Danh sách căn hộ trống
        </div>
        <div
          className={`${classes["header-item"]} ${
            isMoreMem && classes.active
          } `}
          onClick={() => onClickHandler(3)}
        >
          Thêm thành viên
        </div>
        <div
          className={`${classes["header-item"]} ${isPay && classes.active} `}
          onClick={() => onClickHandler(4)}
        >
          Hóa đơn
        </div>
        <Button onClick={LogoutHandler}>Đăng xuất</Button>
      </div>
    </header>
  );
};

export default UserHeader;
