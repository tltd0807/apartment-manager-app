import classes from "./Header.module.css";

import Button from "../../../Components/Layout/Button/Button";
import IMG from "../../../assets/Image/illustration-working.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const signInHandler = () => {
    if (authCtx.token && authCtx.token !== "undefined") {
      if (authCtx.role == 1) {
        navigate("/user");
        return;
      } else if (authCtx.role == 2) {
        navigate("/admin");
        return;
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.name}>MyHome</div>
      </nav>
      <div className={classes.container}>
        <div className={classes["header-content"]}>
          <div className={classes.left}>
            <h1>Chọn mái ấm tốt nhất cho gia đình bạn</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Iaculis nunc sed augue lacus viverra vitae congue.
            </p>
            <div className={classes.login}>
              <Button onClick={signInHandler}>Đăng nhập</Button>
            </div>
          </div>
          <div>
            <img
              src={IMG}
              className={classes["content-img"]}
              alt="illustration-working"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
