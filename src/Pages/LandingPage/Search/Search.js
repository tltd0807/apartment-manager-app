import Button from "../../../Components/Layout/Button/Button";
import classes from "./Search.module.css";

const Search = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <form className={classes.form}>
        <input
          className={classes["form-input"]}
          placeholder="Tìm căn hộ tại đây..."
        />
        <Button className={classes["form-button"]}>Tìm kiếm</Button>
      </form>
    </div>
  );
};
export default Search;
