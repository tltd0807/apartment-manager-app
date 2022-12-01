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
  //   const dataSource = [
  //     {
  //       id: "1",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 0,
  //     },
  //     {
  //       id: "2",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 0,
  //     },
  //     {
  //       id: "3",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 0,
  //     },
  //     {
  //       id: "4",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 1,
  //     },
  //     {
  //       id: "5",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 1,
  //     },
  //     {
  //       id: "6",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 1,
  //     },
  //     {
  //       id: "7",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 1,
  //     },
  //     {
  //       id: "8",
  //       name: "Room 304",
  //       price: "3mil/month",
  //       type: "2 bedrooms, 2 bathrooms",
  //       status: 1,
  //     },
  //   ];

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
        {/* <Col span={8}>
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
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
          </Col> */}
      </Row>
    </LayoutAuthenticated>
  );
};

export default ApartmentTable;
