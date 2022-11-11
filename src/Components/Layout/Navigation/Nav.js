import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import Button from "../Button/Button";
import classes from "./Nav.module.css";

const Nav = (props) => {
  const { onClickFocus, activeTab, userInfo } = props;
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const LogoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  console.log(activeTab);
  return (
    <nav className={classes["admin-nav"]}>
      <div className={classes.info}>
        <img src={userInfo.avatarUrl} alt="ava" className={classes.ava} />
        <p>{userInfo.username}</p>
      </div>
      <div
        className={`${classes[`${activeTab === 1 ? "active" : ""}`]} ${
          classes["nav-item"]
        }
        }`}
        tabIndex={0}
        onClick={() => onClickFocus(1)}
      >
        Apartment List
      </div>
      <div
        className={`${classes[`${activeTab === 2 ? "active" : ""}`]} ${
          classes["nav-item"]
        }
        }`}
        tabIndex={0}
        onClick={() => onClickFocus(2)}
      >
        Request List
      </div>
      <div
        className={`${classes[`${activeTab === 3 ? "active" : ""}`]} ${
          classes["nav-item"]
        }
        }`}
        tabIndex={0}
        onClick={() => onClickFocus(3)}
      >
        User List
      </div>
      <Button onClick={LogoutHandler}>Đăng xuất</Button>
    </nav>
  );
};
export default Nav;
