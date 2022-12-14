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
  const [isFetched, setIsFetched] = useState(false);
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
    setIsFetched(true);
    getUnrentRequest(authContext.token)
      .then((res) => {
        setUnrentRequestList(res.data.reverse());
        if (res.data.length === 0) setIsFetched(false);
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
            spinning: unrentRequestList.length === 0 && isFetched,
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
