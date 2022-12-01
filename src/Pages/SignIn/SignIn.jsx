import React, { useState, useRef, useContext } from "react";
import { registerUser, loginUser } from "../../API/authAPI";
import Button from "../../Components/Layout/Button/Button";
import AuthContext from "../../store/auth-context";
import classes from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(true);
  const userNameInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const [signupFail, setSignupFail] = useState(false);
  const [signupFailMess, setSignupFailMess] = useState("");
  const [signinFail, setSigninFail] = useState(false);

  const authCtx = useContext(AuthContext);

  const toggleLogIn = () => {
    setIsLogIn((prevState) => !prevState);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // xử lý login here

    // const enteredUserName = userNameInput.current.value;
    // const enteredPassword = passwordInput.current.value;
    // const enteredConfirmInput = passwordConfirmInput.current.value;
    // const enteredEmail = emailInput.current.value;
    // const enteredPhone = phoneInput.current.value;
    // có thể validate input

    if (isLogIn) {
      loginUser({
        username: userNameInput.current.value,
        password: passwordInput.current.value,
      })
        .then((res) => {
          // login thanfh cong
          // console.log(res);
          authCtx.login(res.token, res.username, res.avatarUrl);
          setSigninFail(false);
          if (res.roleId === 1) {
            navigate("/user", {
              state: { username: res.username, avatarUrl: res.avatarUrl },
            });
          } else {
            navigate("/admin", {
              state: { username: res.username, avatarUrl: res.avatarUrl },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setSigninFail(true);
        });
    } else {
      registerUser({
        username: userNameInput.current.value,
        password: passwordInput.current.value,
        email: emailInput.current.value,
        phoneNumber: phoneInput.current.value,
        confirmPass: passwordConfirmInput.current.value,
      })
        .then((response) => {
          setIsLogIn(true);
          setSignupFail(false);
        })
        .catch((err) => {
          setSignupFailMess(err.response.data.message);
          console.log(err.response.data.message);
          setSignupFail(true);
        });
    }
  };
  if (isLogIn) {
    return (
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h2 className={classes.title}>Sign in</h2>
          <form className={classes.from} onSubmit={onSubmitHandler}>
            {signinFail && (
              <p className={classes["err-mess"]}>
                Vui lòng kiểm tra lại username và mật khẩu
              </p>
            )}
            <div>
              <label htmlFor="userName">User Name: </label>
              <br />
              <input
                type="text"
                placeholder="Please enter user name"
                id="userName"
                ref={userNameInput}
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <br />
              <input
                type="password"
                placeholder="Please enter password"
                id="password"
                ref={passwordInput}
              />
            </div>
            <Button className={classes["btn-signin"]}>Sign in</Button>
          </form>
          <p>
            Don't have account yet?
            <span className={classes["signup-btn"]} onClick={toggleLogIn}>
              Sign Up
            </span>
            here
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h2 className={classes.title}>Sign up</h2>
          <form className={classes.from} onSubmit={onSubmitHandler}>
            {signupFail && (
              <p className={classes["err-mess"]}>
                {signupFailMess === "Đăng ký thất bại"
                  ? signupFailMess +
                    ". Vui lòng nhập đúng định dạng ở các ô thông tin"
                  : signupFailMess}
              </p>
            )}

            <div>
              <label htmlFor="userName">User Name: </label>
              <br />
              <input
                type="text"
                placeholder="Please enter user name"
                id="userName"
                ref={userNameInput}
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <br />
              <input
                type="password"
                placeholder="Please enter password"
                id="password"
                ref={passwordInput}
              />
              {signupFail && (
                <p className={classes["err-mess"]}>
                  {signupFailMess === "Đăng ký thất bại"
                    ? "Vui lòng nhập mật khẩu bao gồm chữ thường, hoa, số, ký tự đặc biệt và ít nhất 8 ký tự"
                    : ""}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password-confirm">Confirm password: </label>
              <br />
              <input
                type="password"
                placeholder="Please confirm password"
                id="password-confirm"
                ref={passwordConfirmInput}
              />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <br />
              <input
                type="email"
                placeholder="Please enter email"
                id="email"
                ref={emailInput}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone: </label>
              <br />
              <input
                type="text"
                placeholder="Please enter phone number"
                id="phone"
                ref={phoneInput}
              />
              {signupFail && (
                <p className={classes["err-mess"]}>
                  {signupFailMess === "Đăng ký thất bại"
                    ? "Vui lòng nhập đúng định dạng số điện thoại"
                    : ""}
                </p>
              )}
            </div>
            <Button className={classes["btn-signin"]}>Sign up</Button>
          </form>
          <p>
            Don't have account yet?
            <span className={classes["signup-btn"]} onClick={toggleLogIn}>
              Sign in
            </span>
            here
          </p>
        </div>
      </div>
    );
  }
};

export default SignIn;
