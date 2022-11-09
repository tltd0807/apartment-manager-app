import classes from "./ApartmentItem.module.css";

const ApartmentItem = (props) => {
  // console.log(props.type);

  return (
    <div className={classes.container} onClick={props.onClick}>
      <img
        className={classes["apartment-img"]}
        src={props.imgSrc}
        alt="some image"
      ></img>
      <header className={classes.title}>{props.name}</header>
      <div className={classes["brief-detail"]}>
        <div className={classes["number-room"]}>
          <div>
            <span>{props.type}</span>
          </div>
        </div>
        <div className={classes.price}>{props.price}k/tháng</div>
      </div>
    </div>
  );
};
export default ApartmentItem;
