import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import React, { useState, useContext, useEffect } from "react";
import { rentedApartment, sentUnrentRequest } from "../../API/userAPI";
import UserHeaderNew from "../../Components/Layout/UserHeader";
import AuthContext from "../../store/auth-context";

const RentedPage = () => {
  const [rentedList, setRentedList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const authCtx = useContext(AuthContext);
  const error = (mes) => {
    messageApi.error(mes);
  };
  const success = (mes) => {
    messageApi.success(mes);
  };
  const showConfirm = (formData, token) => {
    confirm({
      title: "XÁC NHẬN",
      content: "Yêu cầu hủy thuê?",
      onOk() {
        sentUnrentRequest(formData, token)
          .then((res) => {
            success(res.message);
          })
          .catch((err) => {
            error("Gửi thất bại");
          });
      },
      onCancel() {
        return;
      },
    });
  };

  useEffect(() => {
    rentedApartment(authCtx.token)
      .then((res) => {
        // console.log(res);
        setRentedList(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("đã xảy ra lỗi vui lòng thử lại sau");
      });
  }, []);

  const columns = [
    {
      title: "Mã căn hộ",
      dataIndex: "id",
    },
    {
      title: "Tên căn hộ",
      dataIndex: "name",
    },
    {
      title: "Giá thuê (USD/tháng)",
      dataIndex: "price",
    },
    {
      title: "Loại căn hộ",
      dataIndex: "type",
    },
  ];
  const onFinish = (values) => {
    // console.log(values);

    if (isNaN(values.CCCD)) {
      error("Vui lòng nhập mã định danh số");
      return;
    } else if (!(values.CCCD.length === 9 || values.CCCD.length === 12)) {
      error("Vui lòng nhập mã định danh có 9 hoặc 12 số");
      return;
    }
    // send here
    const formData = new FormData();
    formData.append("FullName ", values.FullName);
    formData.append("CCCD", values.CCCD);
    formData.append("ItemId", values.ItemId);
    showConfirm(
      {
        FullName: values.FullName,
        CCCD: values.CCCD,
        ItemId: values.ItemId,
      },
      authCtx.token
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <UserHeaderNew>
      {contextHolder}

      <div style={{ marginTop: "50px" }}>
        <Row>
          <Col span={14}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Danh sách căn hộ
            </h2>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={rentedList}
              pagination={{ defaultPageSize: "4" }}
              loading={{
                indicator: (
                  <div>
                    <Spin />
                  </div>
                ),
                spinning: rentedList.length === 0,
              }}
            />
          </Col>
          <Col span={10}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Yêu cầu hủy thuê
            </h2>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 10,
              }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Mã căn hộ"
                name="ItemId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã căn hộ",
                  },
                ]}
              >
                <InputNumber min={0} controls={false} placeholder="Mã căn hộ" />
              </Form.Item>
              <Form.Item
                label="Họ và tên"
                name="FullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Mã định danh"
                name="CCCD"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã định danh",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập mã định danh" />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Yêu cầu
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </UserHeaderNew>
  );
};

export default RentedPage;
