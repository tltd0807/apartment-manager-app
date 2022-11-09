import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import Button from "../Button/Button";
import classes from "./Nav.module.css";

const Nav = (props) => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const LogoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };
  return (
    <nav className={classes["admin-nav"]}>
      <div className={classes["nav-item"]} tabIndex={0}>
        Apartment List
      </div>
      <div className={classes["nav-item"]} tabIndex={0}>
        Request List
      </div>
      <div className={classes["nav-item"]} tabIndex={0}>
        User List
      </div>
      <Button onClick={LogoutHandler}>Đăng xuất</Button>
    </nav>
  );
};
export default Nav;
