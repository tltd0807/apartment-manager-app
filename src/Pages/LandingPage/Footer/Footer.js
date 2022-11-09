import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Layout/Button/Button";
import classes from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className={classes["footer-section"]}>
        <h2>Mua căn hộ ngay hôm nay</h2>
        <Button onClick={() => navigate("/signin")}>Đăng nhập</Button>
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
