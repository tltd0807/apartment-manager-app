import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tag,
  message,
  Upload,
  Pagination,
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

const ApartmentTable = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [apartmentList, setApartmentList] = useState([]);
  const [fileList, setFileList] = useState([]);

  const columns = [
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
      render: () => (
        <Space size="middle">
          <Button>Chi tiết</Button>
        </Space>
      ),
    },
  ];
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getAllApartment(authContext.token)
      .then((res) => {
        const dataSource = res.data;
        dataSource.map((item) => {
          delete item["avatarUrl"];
          item["price"] = item["price"] + " USD/mo";
        });
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
      <Row>
        <Col span={8}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Apartment List
          </h2>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={apartmentList}
            pagination={{ defaultPageSize: "4" }}
          />
        </Col>
        {/* <Col span={8}></Col> */}
        <Col span={8}>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Room 304's detail
          </p>
          <div>
            <p>Apartment Image</p>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
          </div>
          <div>
            <p>Detail Image</p>
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
          </div>
        </Col>
      </Row>
    </LayoutAuthenticated>
  );
};

export default ApartmentTable;
