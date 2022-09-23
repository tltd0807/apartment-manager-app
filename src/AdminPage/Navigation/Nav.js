import Button from "../../Layout/Button/Button";
import classes from "./Nav.module.css";

const Nav = (props) => {
  return (
    <nav className={classes["admin-nav"]}>
      <Button>1</Button>
      <Button>1</Button>
      <Button>1</Button>
      <div>2</div>
      <div>3</div>
    </nav>
  );
};
export default Nav;
