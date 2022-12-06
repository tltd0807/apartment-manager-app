import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Spin, Form, Input, Modal } from "antd";
import AuthContext from "../../store/auth-context";
import { loginUser, registerUser } from "../../API/authAPI";
import classes from "./SignUp.module.css";
const success = (mes) => {
  Modal.success({
    content: mes,
  });
};
const error = (mes) => {
  Modal.error({
    title: "ERROR",
    content: mes,
  });
};
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    // setLoading(true);
    if (values.password !== values.confirmPassword) {
      error("Password và confirm password phải giống nhau");
      return;
    } else if (values.phone.length < 10) {
      error("Số điện thoại phải lớn hơn 10 số");
      return;
    } else if (isNaN(values.phone)) {
      error("Số điện thoại phải là số");
      return;
    }
    setLoading(true);
    registerUser({
      username: values.username,
      password: values.password,
      email: values.email,
      phoneNumber: values.phone,
      confirmPass: values.confirmPassword,
    })
      .then((res) => {
        authCtx.login(res.token, res.username, res.avatarUrl);
        setLoading(false);

        navigate("/signin");
      })
      .catch((err) => {
        setLoading(false);
        error(err.response.data.message);
      });
  };
  return (
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
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền Username!",
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
                  message: "Vui lòng điền Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền xác nhận  Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Xác nhận Password"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số điện thoại!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng ký
              </Button>
              <br /> Đã có tài khoản?<Link to="/signin"> Đăng nhập ngay</Link>
            </Form.Item>
          </Form>
        </div>
      )}
    </section>
  );
};
export default SignUp;
