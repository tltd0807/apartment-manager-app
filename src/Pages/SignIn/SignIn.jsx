import React from "react";
import Button from "../../Components/Layout/Button/Button";
import classes from "./SignIn.module.css";
const SignIn = () => {
  const onSubmitHandler = (event) => {
    event.preventdefault();
    // xử lý login here
    console.log("first");
  };
  return (
    <div className={classes.container}>
      <div className={classes["form-container"]}>
        <h2 className={classes.title}>Sign in</h2>
        <form className={classes.from} onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="userName">User Name: </label>
            <br />
            <input
              type="text"
              placeholder="Please enter user name"
              id="userName"
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <br />
            <input
              type="password"
              placeholder="Please enter password"
              id="password"
            />
          </div>
          <Button className={classes["btn-signin"]}>Sign in</Button>
        </form>
        <p>
          Don't have account yet? <span>Sign Up</span> here
        </p>
        {/* <SignUp /> */}
      </div>
    </div>
  );
};
const SignUp = () => {
  const onSubmitHandler = (event) => {
    event.preventdefault();
  };
  return (
    <form className={classes.from} onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="userName">User Name: </label>
        <br />
        <input type="text" placeholder="Please enter user name" id="userName" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <br />
        <input
          type="password"
          placeholder="Please enter password"
          id="password"
        />
      </div>
      {/* Từ đây xuống là sign up */}
      <div>
        <label htmlFor="password-confirm">Confirm password: </label>
        <br />
        <input
          type="password"
          placeholder="Please confirm password"
          id="password-confirm"
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <br />
        <input type="email" placeholder="Please enter email" id="email" />
      </div>
      <div>
        <label htmlFor="phone">Phone: </label>
        <br />
        <input type="text" placeholder="Please enter phone number" id="phone" />
      </div>
    </form>
  );
};

export default SignIn;
