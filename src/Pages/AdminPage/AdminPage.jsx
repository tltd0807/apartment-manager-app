import React, { useState, useEffect, useContext } from "react";
import { getStatic } from "../../API/adminAPI";
import LayoutAuthenticated from "../../Components/Layout/LayoutAuthenticated";
import AuthContext from "../../store/auth-context";
import { Statistic, Card, Space, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const AdminPage = (props) => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState({});
  let initStartDate = new Date();
  let initEndDate = new Date();
  initStartDate.setMonth(initEndDate.getMonth() - 1);
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);
  useEffect(() => {
    getStatic(startDate.toISOString(), endDate.toISOString(), authCtx.token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate]);

  return (
    <LayoutAuthenticated>
      <section>
        <h1 style={{ fontSize: "48px" }}> Welcome {authCtx.userName}</h1>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <p>
            Thống kê từ <b> {startDate.toISOString().split("T")[0]}</b> đến{" "}
            <b> {endDate.toISOString().split("T")[0]}</b>
          </p>
          <RangePicker
            allowEmpty={[true, true]}
            defaultPickerValue={[
              dayjs("2022-11-25", dateFormat),
              dayjs("2022-12-25", dateFormat),
            ]}
            onChange={(dates, dateStrings) => {
              if (dateStrings.includes("")) return;
              let newStartDate = new Date(dateStrings[0]);
              let newEndDate = new Date(dateStrings[1]);

              setStartDate(newStartDate);
              setEndDate(newEndDate);
            }}
          />
          <Space size={24}>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Tổng tiền phòng"
                value={data.totalRentPrice}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Tổng tiền nước"
                value={data.totalWaterPrice}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Tổng tiền điện"
                value={data.totalElectricPrice}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Tổng tiền đã trả"
                value={data.totalPaidPrice}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
          </Space>
          <Space>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Tổng tiền trả cho cổng thanh toán Stripe"
                value={data.totalStriprFee}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
            <Card style={{ width: "fit-content" }}>
              <Statistic
                title="Doanh thu"
                value={data.revenue}
                prefix={"$"}
                suffix="USD"
              />
            </Card>
          </Space>
        </Space>
      </section>
    </LayoutAuthenticated>
  );
};

export default AdminPage;
