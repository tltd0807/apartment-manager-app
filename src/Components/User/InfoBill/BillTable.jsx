import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  DatePicker,
} from "antd";
import AuthContext from "../../../store/auth-context";
import { infoBill } from "../../../API/billAPI";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { payBill } from "../../../API/paymentAPI";
dayjs.extend(customParseFormat);
const monthFormat = "YYYY/MM";
const BillTable = () => {
  const [billList, setBillList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const authCtx = useContext(AuthContext);
  const error = (mes) => {
    messageApi.error(mes);
  };
  const success = (mes) => {
    messageApi.success(mes);
  };
  const showConfirm = (data, token) => {
    confirm({
      title: "XÁC NHẬN",
      content: "Thanh toán?",
      onOk() {
        console.log("OK");
        payBill(token, data)
          .then((res) => {
            success("Thanh toán thành công");
            setIsFetched((prev) => !prev);
          })
          .catch((err) => {
            error("Thanh toán thất bại");
          });
      },
      onCancel() {
        return;
      },
    });
  };
  useEffect(() => {
    setIsFetched(true);
    infoBill(authCtx.token)
      .then((res) => {
        // console.log(res.data);
        setBillList(res.data);
        if (res.data.length === 0) setIsFetched(false);
      })

      .catch((err) => {
        console.log(err);
        window.alert("đã xảy ra lỗi vui lòng thử lại sau");
      });
  }, [isFetched]);

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
    },
    {
      title: "Phí thuê(USD)",
      dataIndex: "itemPrice",
    },
    {
      title: "Phí dịch vụ(USD)",
      dataIndex: "otherPrice",
    },
    {
      title: "Phí nước(USD)",
      dataIndex: "waterPrice",
    },
    {
      title: "Phí điện(USD)",
      dataIndex: "electricPrice",
    },
    {
      title: "Phí giữ xe(USD)",
      dataIndex: "vehiclePrice",
    },
    {
      title: "Tổng(USD)",
      dataIndex: "sumPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "paied",
      render: (_, { paied }) => {
        // console.log(status);
        if (paied === false)
          return (
            <Tag color="green" key={paied}>
              Chưa thanh toán
            </Tag>
          );
        else
          return (
            <Tag color="volcano" key={paied}>
              Đã thanh toán
            </Tag>
          );
      },
    },
  ];
  const onFinish = (values) => {
    console.log("values: ", values);
    console.log(values.expiry["$d"].getMonth() + 1);
    console.log(values.expiry["$d"].getFullYear());
    showConfirm(
      {
        cardNumber: values.cardNumber,
        month: values.expiry["$d"].getMonth() + 1,
        year: values.expiry["$d"].getFullYear(),
        cvc: values.cvc,
        bllId: values.id,
      },
      authCtx.token
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo: ", errorInfo);
  };
  return (
    <div>
      {contextHolder}
      <div>
        <Row>
          <Col span={16}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Danh sách hóa đơn
            </h2>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={billList}
              pagination={{ defaultPageSize: "4" }}
              loading={{
                indicator: (
                  <div>
                    <Spin />
                  </div>
                ),
                spinning: billList.length === 0 && isFetched,
              }}
            />
          </Col>
          <Col span={8}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Thanh toán với Stripe
            </h2>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{}}
            >
              <Form.Item
                label="Mã hóa đơn"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã hóa đơn",
                  },
                ]}
                style={{
                  width: "calc(100% - 8px)",
                }}
              >
                <InputNumber
                  placeholder="Mã hóa đơn"
                  style={{ width: "100%" }}
                  controls={false}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label="Số thẻ"
                name="cardNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số thẻ",
                  },
                ]}
                style={{
                  width: "calc(100% - 8px)",
                }}
              >
                <Input placeholder="Số thẻ" />
              </Form.Item>

              <Form.Item
                label="Thông tin trên thẻ"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Không được để trống",
                    },
                  ]}
                  name="expiry"
                  style={{
                    display: "inline-block",
                    width: "calc(75% - 8px)",
                  }}
                >
                  <DatePicker
                    format={monthFormat}
                    picker="month"
                    placeholder="Ngày hết hạn"
                    style={{
                      display: "inline-block",
                      width: "100%",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="cvc"
                  rules={[
                    {
                      required: true,
                      message: "Số CVC",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <Input placeholder="CVC" />
                </Form.Item>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Thanh toán
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BillTable;
// {
//     "cardNumber": "string",
//     "month": 0,
//     "year": 0,
//     "cvc": "string",
//     "bllId": 0
//   }
