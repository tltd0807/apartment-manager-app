import React from "react";
import { FormOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router";

const RentForm = ({ showModal, setRequestInfo, error }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (!authCtx.token) {
      error("Vui lòng đăng nhập trước khi yêu cầu");
      navigate("/signin");
      return;
    }
    if (values.CCCD.length !== 9 && values.CCCD.length !== 12) {
      error("Vui lòng điền số CCCD 9 hoặc 12 số");
      return;
    } else if (isNaN(values.CCCD)) {
      error("CCCD phải là số");
      return;
    }
    setRequestInfo(values);
    showModal();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Họ và tên"
        name="FullName"
        rules={[
          {
            required: true,
            message: "Vui lòng thêm họ và tên",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CCCD"
        name="CCCD"
        rules={[
          {
            required: true,
            message: "Vui lòng thêm CCCD",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số người ở"
        name="NumberOfParent"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn số người ",
          },
        ]}
      >
        <Select style={{ width: 70 }}>
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={5}>5</Select.Option>
          <Select.Option value={6}>6</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Yêu cầu thuê
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RentForm;
