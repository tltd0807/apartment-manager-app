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
    isRent,
    setIsPay,
    setMoreMem,
    setIsList,
    setIsInfo,
    setIsRent,
  } = props.pageSate;
  const onClickHandler = (num) => {
    switch (num) {
      case 0: {
        setIsInfo(true);
        setIsList(false);
        setIsPay(false);
        setMoreMem(false);
        setIsRent(false);
        break;
      }
      case 1: {
        setIsList(true);
        setIsPay(false);
        setMoreMem(false);
        setIsInfo(false);
        setIsRent(false);

        break;
      }
      case 3: {
        setIsList(false);
        setMoreMem(true);
        setIsInfo(false);
        setIsRent(false);
        setIsPay(false);
        break;
      }
      case 4: {
        setIsList(false);
        setMoreMem(false);
        setIsInfo(false);
        setIsRent(false);
        setIsPay(true);
        break;
      }
      case 5: {
        setIsList(false);
        setMoreMem(false);
        setIsInfo(false);
        setIsRent(true);
        setIsPay(false);
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
        <img src={authCtx.avatarUrl} alt="ava" className={classes.ava} />
        <p>{authCtx.userName}</p>
      </h1>
      <div className={classes["header-right"]}>
        <div
          className={`${classes["header-item"]} ${isList && classes.active} `}
          onClick={() => onClickHandler(1)}
        >
          Danh sách căn hộ trống
        </div>
        <div
          className={`${classes["header-item"]} ${isRent && classes.active} `}
          onClick={() => onClickHandler(5)}
        >
          Căn hộ đang thuê
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
