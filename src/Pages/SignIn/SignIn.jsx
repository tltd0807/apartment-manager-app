import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Spin, Form, Input, message } from "antd";
import AuthContext from "../../store/auth-context";
import { loginUser } from "../../API/authAPI";
import classes from "./SignIn.module.css";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const error = (mes) => {
    messageApi.error(mes);
  };
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    setLoading(true);
    loginUser({
      username: values.username,
      password: values.password,
    })
      .then((res) => {
        // console.log(res);
        authCtx.login(res.token, res.username, res.avatarUrl, res.roleId);
        if (res.roleId === 1) {
          navigate("/user");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        error("Thất bại, vui lòng kiểm tra lại username và password");
        setLoading(false);
      });
  };
  return (
    <>
      {contextHolder}
      <section
        className={classes["signup"]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {loading && <Spin />}
        {!loading && (
          <div className={classes.form}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng nhập
                </Button>
                <br /> Chưa có tài khoản?<Link to="/signup"> Đăng ký ngay</Link>
              </Form.Item>
            </Form>
          </div>
        )}
      </section>
    </>
  );
};
export default SignIn;
