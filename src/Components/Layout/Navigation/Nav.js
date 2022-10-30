import Button from "../Button/Button";
import classes from "./Nav.module.css";

const Nav = (props) => {
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
    </nav>
  );
};
export default Nav;
