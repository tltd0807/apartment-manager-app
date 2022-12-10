import { Button, Col, Row, Space, Spin, Table, Tag } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { getApartmentById } from "../../../API/adminAPI";
import { getRentRequest } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import RequestInfo from "./RequestInfo";

const RequestTable = () => {
  const [rentRequestList, setRentRequestList] = useState([]);
  const [onReload, setOnReload] = useState(false);
  const [requestInfo, setRequestInfo] = useState({
    cccd: "",
    createDate: "",
    fullName: "",
    id: 0,
    item: null,
    itemId: 0,
    numberOfParent: 0,
    renter: null,
    renterId: 0,
    status: false,
  });
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getRentRequest(authContext.token)
      .then((res) => {
        setRentRequestList(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token, onReload]);

  const columns = [
    {
      title: "Tên người yêu cầu",
      dataIndex: "fullName",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createDate",
      render: (_, { createDate }) => {
        return createDate.split("T")[0].split("-").reverse().join("-");
      },
      sorter: (a, b) => {
        let date1 = new Date(a.createDate);
        let date2 = new Date(b.createDate);
        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0;
      },
    },
    {
      title: "Số định danh",
      dataIndex: "cccd",
    },
    {
      title: "Số người ",
      dataIndex: "numberOfParent",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, { status }) => {
        // console.log(status);
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
      filters: [
        {
          text: "Chưa xử lý",
          value: false,
        },
        {
          text: "Đã xử lý",
          value: true,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "",
      dataIndex: "option",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setRequestInfo(record);
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Row style={{ marginTop: "50px" }}>
      <Col span={12}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Danh sách yêu cầu thuê
        </h2>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={rentRequestList}
          pagination={{ defaultPageSize: "4" }}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: rentRequestList.length === 0,
          }}
        />
      </Col>
      <Col span={12}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Thông tin chi tiết
        </h2>
        <RequestInfo requestInfo={requestInfo} setOnReload={setOnReload} />
      </Col>
    </Row>
  );
};

export default RequestTable;
