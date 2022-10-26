import classes from "./Header.module.css";

import Button from "../../../Components/Layout/Button/Button";
import IMG from "../../../assets/Image/illustration-working.svg";
const Header = (props) => {
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
              <Button>Đăng nhập</Button>
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
