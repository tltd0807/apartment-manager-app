import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Layout/Button/Button";
import AuthContext from "../../../store/auth-context";
import classes from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const signInHandler = () => {
    if (authCtx.token) {
      // console.log("authCtx.role", authCtx.role);
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
    <>
      <section className={classes["footer-section"]}>
        <h2>Mua căn hộ ngay hôm nay</h2>
        <Button onClick={signInHandler}>Đăng nhập</Button>
      </section>
      <footer>
        <div className={classes["footer-left"]}>
          Copyright © 2022 To Dat &amp; Gia Minh - All Rights Reserved
        </div>
        <div className={classes["footer-right"]}>
          Designed by To Dat &amp; Gia Minh
        </div>
      </footer>
    </>
  );
};
export default Footer;
