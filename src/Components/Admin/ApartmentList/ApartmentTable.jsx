import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tag,
  message,
  Upload,
  Form,
  Input,
  Radio,
  InputNumber,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import LayoutAuthenticated from "../../Layout/LayoutAuthenticated";
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getAllApartment } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import { editApartment } from "../../../API/adminAPI";
import ApartmentInfo from "./ApartmentInfo";
const ApartmentTable = () => {
  const { TextArea } = Input;
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [apartmentList, setApartmentList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [itemId, setItemId] = useState(-1);
  const error = (mes) => {
    messageApi.error(mes);
  };
  const success = (mes) => {
    messageApi.success(mes);
  };
  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, { status }) => {
        // console.log(status);
        if (status === 0)
          return (
            <Tag color="green" key={status}>
              Còn trống
            </Tag>
          );
        else
          return (
            <Tag color="volcano" key={status}>
              Đã được thuê
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
              setItemId(record.id);
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllApartment(authContext.token)
      .then((res) => {
        const dataSource = res.data;
        dataSource.map((item) => {
          delete item["avatarUrl"];
          item["price"] = item["price"] + " USD/mo";
        });
        // console.log(dataSource);
        setApartmentList(dataSource);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const handleChangeList = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      )
    );
  };

  const onFinish = (values) => {
    const formData = new FormData();

    if (values.detailImg) {
      if (
        values.detailImg.fileList.length < 3 &&
        values.detailImg.fileList.length > 0
      ) {
        error("Vui lòng thêm đủ 3 hình chi tiết hoặc không thêm");
        return;
      } else if (values.detailImg.fileList.length == 0) {
        formData.append("PictureUrl", "");
      } else if (values.detailImg.fileList.length == 3) {
        formData.append(
          "PictureUrl",
          values.detailImg.fileList[0].originFileObj
        );
        formData.append(
          "PictureUrl",
          values.detailImg.fileList[1].originFileObj
        );
        formData.append(
          "PictureUrl",
          values.detailImg.fileList[2].originFileObj
        );
      }
    } else {
      formData.append(
        "PictureUrl",
        values.detailImg == undefined
          ? ""
          : values.detailImg.fileList[0].originFileObj
      );
      formData.append(
        "PictureUrl",
        values.detailImg == undefined
          ? ""
          : values.detailImg.fileList[1].originFileObj
      );
      formData.append(
        "PictureUrl",
        values.detailImg == undefined
          ? ""
          : values.detailImg.fileList[2].originFileObj
      );
    }

    formData.append("Id", values.id);
    formData.append(
      "Description",
      values.description == undefined ? "Chưa có mô tả" : values.description
    );
    formData.append("Price", values.price);
    formData.append("Status", 0);
    formData.append(
      "AvatarUrl",
      values.avatar == undefined ? "" : values.avatar.file.originFileObj
    );
    formData.append("VideoUrl", "");

    editApartment(formData, authContext.token)
      .then((res) => {
        success("Thay đổi thành công");
      })
      .catch((err) => {
        error("Thay đổi thất bại, vui lòng thử lại sau");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
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

  return (
    <LayoutAuthenticated>
      {contextHolder}
      <Row>
        <Col span={8}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Danh sách căn hộ
          </h2>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={apartmentList}
            pagination={{ defaultPageSize: "4" }}
          />
        </Col>
        <Col span={10}>
          <ApartmentInfo itemId={itemId} />
        </Col>
        <Col span={6}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Sửa thông tin
          </h2>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Mã căn hộ"
              name="id"
              // onChange={onValuesChangeInput}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã căn hộ",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giá tiền thuê",
                },
              ]}
            >
              <InputNumber min={1000} />
            </Form.Item>
            <Form.Item label="Mô tả" name={"description"}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Hình chính" valuePropName="file" name="avatar">
              <Upload
                name="avatar"
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
                {imageUrl ? (
                  <img
                    src={imageUrl}
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
              label="Hình chi tiết"
              valuePropName="file"
              name="detailImg"
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                showUploadList={{ showPreviewIcon: false }}
                onChange={handleChangeList}
                beforeUpload={beforeUpload}
                customRequest={({ onSuccess }) =>
                  setTimeout(() => {
                    onSuccess("ok", null);
                  }, 100)
                }
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
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
        </Col>
      </Row>
    </LayoutAuthenticated>
  );
};

export default ApartmentTable;
