import Button from "../../Layout/Button/Button";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
import classes from "./ApartmentList.module.css";

const ApartmentList = (props) => {
  return (
    <div className={classes["list-container"]}>
      <div className={classes.list}>
        <ApartmentItem />
        <ApartmentItem />
        <ApartmentItem />
        <ApartmentItem />
        <ApartmentItem />
        <ApartmentItem />
      </div>
      <Button className={classes.btn}>Xem thêm</Button>
    </div>
  );
};
export default ApartmentList;
