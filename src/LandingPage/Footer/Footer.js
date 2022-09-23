import Button from "../../Layout/Button/Button";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <section className={classes["footer-section"]}>
        <h2>Mua căn hộ ngay hôm nay</h2>
        <Button>Đăng nhập</Button>
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
