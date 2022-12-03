import React, { useContext, useState, useEffect } from "react";
import UserHeaderNew from "../Components/Layout/UserHeader";
import AuthContext from "../store/auth-context";
import { editInfoUser, infoUser } from "../API/userAPI";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Form,
  Image,
  Input,
  Row,
  Spin,
  Upload,
  message,
} from "antd";
const UserInfo = () => {
  const [info, setInfo] = useState({});
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [showSendForm, setShowSendForm] = useState(false);
  const [reload, setReload] = useState(true);
  const authCtx = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const error = (mes) => {
    messageApi.error(mes);
  };
  const success = (mes) => {
    messageApi.success(mes);
  };
  const onFinish = (values) => {
    console.log(values);
    const newPhoneNumber = values.phoneNumber
      ? values.phoneNumber
      : info.phoneNumber;
    const newAva = values.avatar ? values.avatar.file.originFileObj : "";
    if (newPhoneNumber.length !== 10) {
      error("Vui lòng nhập số điện thoại có 10 chữ số");
      return;
    }
    if (isNaN(newPhoneNumber)) {
      error("Vui lòng nhập chữ số");
      return;
    }
    const formData = new FormData();
    formData.append("Avatar", newAva);
    formData.append("PhoneNumber", newPhoneNumber);
    editInfoUser(formData, authCtx.token)
      .then((res) => {
        success("Thay đổi thành công.");
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        error("Cập nhật thất bại thử lại sau");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setIsLoadingFetch(true);
    infoUser(authCtx.token)
      .then((res) => {
        setInfo(res);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải hình
      </div>
    </div>
  );
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
    <UserHeaderNew>
      {contextHolder}
      <Row style={{ marginTop: "50px", justifyContent: "center" }}>
        <Col span={10}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Thông tin chi tiết
          </h2>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {isLoadingFetch && <Spin />}
          </div>

          {!isLoadingFetch && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "20px" }}>
                  <Image.PreviewGroup>
                    <Image width={100} src={info.avatarUrl} />
                  </Image.PreviewGroup>
                </div>
                <Descriptions title="" column={3}>
                  <Descriptions.Item label="Tên ">
                    {info.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email ">
                    {info.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại ">
                    {info.phoneNumber}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <Button onClick={() => setShowSendForm((prev) => !prev)}>
                Sửa thông tin
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {showSendForm && (
        <Row style={{ marginTop: "50px", justifyContent: "center" }}>
          <Col span={10} style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Thay đổi thông tin
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Form
                labelCol={{
                  span: 14,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Hình chính"
                  valuePropName="file"
                  name="avatar"
                >
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
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Thay đổi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      )}
    </UserHeaderNew>
  );
};

export default UserInfo;
// username: 'minh',
// avatarUrl: 'https://res.cloudinary.com/buildingmanager/image/upload/v1669422829/nq3u3f9objiut3emizkm.png',
//  email: 'nngiaminh@gmail.com',
//  phoneNumber: '1911003033'
