import { Button, Col, Row, Space, Spin, Table, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { getUnrentRequest } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import UnrentItem from "./UnrentItem";

const UnrentRequest = () => {
  const authContext = useContext(AuthContext);
  const [onReload, setOnReload] = useState(false);
  const [unrentRequestList, setUnrentRequestList] = useState([]);
  const [unrentInfo, setUnrentInfo] = useState({
    cccd: "",
    createDate: "",
    fullName: "",
    handleTime: "",
    handlerId: 0,
    id: 0,
    item: null,
    itemId: 0,
    renter: null,
    renterId: 0,
    status: false,
  });
  useEffect(() => {
    getUnrentRequest(authContext.token)
      .then((res) => {
        setUnrentRequestList(
          res.data.reverse().map((item) => ({
            ...item,
            createDate: item.createDate.split("T")[0],
          }))
        );
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token, onReload]);

  const columns = [
    {
      title: "Tên người yêu cầu hủy",
      dataIndex: "fullName",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createDate",
    },
    {
      title: "Số định danh",
      dataIndex: "cccd",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, { status }) => {
        if (status === false)
          return (
            <Tag color="green" key={status}>
              Chưa xử lý
            </Tag>
          );
        else
          return (
            <Tag color="volcano" key={status}>
              Đã xử lý
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
              //   console.log("record: ", record);
              setUnrentInfo(record);
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Row>
      <Col span={12}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Danh sách yêu cầu hủy thuê
        </h2>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={unrentRequestList}
          pagination={{ defaultPageSize: "4" }}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: unrentRequestList.length === 0,
          }}
        />
      </Col>
      <Col span={12}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Thông tin yêu cầu hủy
        </h2>
        <UnrentItem unrentInfo={unrentInfo} setOnReload={setOnReload} />
      </Col>
    </Row>
  );
};

export default UnrentRequest;
