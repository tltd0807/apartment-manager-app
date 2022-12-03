import {
  Button,
  Col,
  Input,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Form,
  Descriptions,
  InputNumber,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { getApartmentUnpaid } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import { sentBill } from "../../../API/adminAPI";

const UnpaidTable = () => {
  const authContext = useContext(AuthContext);
  const [unpaidList, setUnpaidList] = useState([{}]);
  const [itemId, setItemId] = useState(0);
  const [formIsShow, setFormIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageWaterUrl, setImageWaterUrl] = useState();
  const [imageElecUrl, setImageElecUrl] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [reload, setReload] = useState(false);
  const error = (mes) => {
    messageApi.error(mes);
  };
  const success = (mes) => {
    messageApi.success(mes);
  };
  useEffect(() => {
    getApartmentUnpaid(authContext.token)
      .then((res) => {
        setUnpaidList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token, reload]);
  const onFinish = (values) => {
    // console.log(values);
    if (!values.ElectricBillUrl || !values.WaterBillUrl) {
      error("Vui lòng thêm đủ hình ảnh Hóa đơn nước và Hóa đơn điện");
      return;
    } else if (values.WaterPrice === 0) {
      error("Vui lòng giá nước lớn hơn 0");
      return;
    } else if (values.ElectricPrice === 0) {
      error("Vui lòng giá điện lớn hơn 0");
      return;
    }

    const formData = new FormData();
    formData.append("ElectricPrice", values.ElectricPrice);
    formData.append("WaterPrice", values.WaterPrice);
    formData.append("VehiclePrice", values.VehiclePrice);
    formData.append("OtherPrice", values.OtherPrice);
    formData.append(
      "ElectricBillUrl",
      values.ElectricBillUrl.file.originFileObj
    );
    formData.append("WaterBillUrl", values.WaterBillUrl.file.originFileObj);

    sentBill(values.itemId, formData, authContext.token)
      .then((res) => {
        success("Gửi thành công");
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        error("Thất bại!");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Tên người thuê",
      dataIndex: "renterName",
    },
    {
      title: "Trạng thái",
      dataIndex: "hasMonthlyBill",
      render: (_, { hasMonthlyBill }, index) => {
        if (hasMonthlyBill)
          return (
            <Tag color="green" key={index}>
              Đã gửi
            </Tag>
          );
        else
          return (
            <Tag color="volcano" key={index}>
              Chưa gửi
            </Tag>
          );
      },
    },
    {
      title: "",
      dataIndex: "option",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              //   console.log(record.id);
              setItemId(record.id);
              setFormIsShow(true);
            }}
          >
            Mở
          </Button>
        </Space>
      ),
    },
  ];
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải hóa đơn
      </div>
    </div>
  );
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageWaterUrl(url);
      });
    }
  };
  const handleChangeElec = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageElecUrl(url);
      });
    }
  };
  //   console.log("itemId: ", itemId);
  return (
    <>
      {contextHolder}
      <Row>
        <Col span={14}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Danh sách căn hộ
          </h2>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={unpaidList}
            pagination={{ defaultPageSize: "4" }}
            loading={{
              indicator: (
                <div>
                  <Spin />
                </div>
              ),
              spinning: unpaidList.length === 0,
            }}
          />
        </Col>
        <Col span={10}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Thông tin gửi người dùng
          </h2>
          {formIsShow && (
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 8,
              }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                OtherPrice: 0,
                VehiclePrice: 0,
              }}
            >
              <Form.Item
                label="Mã căn hộ"
                name="itemId"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber controls={false} min={0} />
              </Form.Item>
              <Form.Item
                label="Giá nước"
                name="WaterPrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber controls={false} min={0} />
              </Form.Item>
              <Form.Item
                label="Hóa đơn nước"
                valuePropName="file"
                name="WaterBillUrl"
              >
                <Upload
                  name="WaterBillUrl"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={({ onSuccess }) =>
                    setTimeout(() => {
                      onSuccess("ok", null);
                    }, 1000)
                  }
                >
                  {imageWaterUrl ? (
                    <img
                      src={imageWaterUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label="Giá điện"
                name="ElectricPrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber controls={false} min={0} />
              </Form.Item>
              <Form.Item
                label="Hóa đơn điện"
                valuePropName="file"
                name="ElectricBillUrl"
              >
                <Upload
                  name="ElectricBillUrl"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeElec}
                  customRequest={({ onSuccess }) =>
                    setTimeout(() => {
                      onSuccess("ok", null);
                    }, 1000)
                  }
                >
                  {imageElecUrl ? (
                    <img
                      src={imageElecUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                label="Phí gửi xe"
                name="VehiclePrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber controls={false} min={0} />
              </Form.Item>
              <Form.Item
                label="Phí dịch vụ"
                name="OtherPrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber controls={false} min={0} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UnpaidTable;
