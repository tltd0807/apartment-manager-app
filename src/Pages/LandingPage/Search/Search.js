import Button from "../../../Components/Layout/Button/Button";
import classes from "./Search.module.css";

const Search = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.form}>
        {/* <input
          className={classes["form-input"]}
          placeholder="Tìm căn hộ tại đây..."
        /> */}
        {/* không search */}
        <Button
          className={classes["form-button"]}
          onClick={() => props.changeType(0)}
        >
          Tất Cả
        </Button>
        {/* search với id =1 */}
        <Button
          className={classes["form-button"]}
          onClick={() => props.changeType(1)}
        >
          Studio
        </Button>
        {/* search với id =2 */}
        <Button
          className={classes["form-button"]}
          onClick={() => props.changeType(2)}
        >
          2PN 1VS
        </Button>
        {/* search với id =3 */}
        <Button
          className={classes["form-button"]}
          onClick={() => props.changeType(3)}
        >
          2PN 2VS
        </Button>
        {/* search với id =4 */}
        <Button
          className={classes["form-button"]}
          onClick={() => props.changeType(4)}
        >
          3PN 2VS
        </Button>
      </div>
    </div>
  );
};
export default Search;
