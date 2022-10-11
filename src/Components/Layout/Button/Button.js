import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.primary} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
