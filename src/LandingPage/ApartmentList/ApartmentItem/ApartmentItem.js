import classes from "./ApartmentItem.module.css";
import apartmentImg from "../../../Image/apartment-img.jpg";

const ApartmentItem = (props) => {
  // console.log(props.type);
  const [bedroom, toilet] = props.type.split(" ");

  return (
    <div className={classes.container}>
      <img className={classes["apartment-img"]} src={props.imgSrc}></img>
      <header className={classes.title}>{props.name}</header>
      <div className={classes["brief-detail"]}>
        <div className={classes["number-room"]}>
          <div>
            {/* <span>{bedroom[0]} </span> phòng, */}
            <span>{props.type}</span>
          </div>
          <div>{/* <span>{toilet[0]} </span> nhà vệ sinh */}</div>
        </div>
        <div className={classes.price}>{props.price}tr/tháng</div>
      </div>
    </div>
  );
};
export default ApartmentItem;
