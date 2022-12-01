import React, { useRef, useEffect, useState, useContext } from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";
import { sentBill } from "../../../API/adminAPI";
import AuthContext from "../../../store/auth-context";
import classes from "./UnpaidList.module.css";

const UnpaidList = () => {
  const [elecPrice, setElecPrice] = useState(0);
  const [waterPrice, setWaterPrice] = useState(0);
  const [carPrice, setCarPrice] = useState(0);
  const [otherPrice, setOtherPrice] = useState(0);
  const [eleImg, setEleImg] = useState();
  const [waterImg, setWaterImg] = useState();
  const [name, setName] = useState("");
  const [itemId, setItemId] = useState(-1);
  const electricRef = useRef();
  const waterRef = useRef();
  const carRef = useRef();
  const otherRef = useRef();
  const eleImgRef = useRef();
  const waterImgRef = useRef();
  const autCtx = useContext(AuthContext);

  const onSubmitHander = (e) => {
    e.preventDefault();
    if (itemId === -1) {
      window.alert("Vui lòng chọn hóa đơn ở bên trái để gửi");
      return;
    } else if (elecPrice === 0) {
      window.alert("Vui lòng điền giá điện trước khi gửi");
      return;
    } else if (waterPrice == 0) {
      window.alert("Vui lòng điền giá nước trước khi gửi");
      return;
    } else if (
      eleImgRef.current.value === "" ||
      waterImgRef.current.value === ""
    ) {
      window.alert("Vui lòng thêm hình hóa đơn nước và điện trước khi gửi");
      return;
    } else {
      const formData = new FormData();
      formData.append("ElectricPrice", elecPrice);
      formData.append("WaterPrice", waterPrice);
      formData.append("VehiclePrice", carPrice);
      formData.append("OtherPrice", otherPrice);
      formData.append("ElectricBillUrl", eleImg);
      formData.append("WaterBillUrl", waterImg);
      sentBill(itemId, formData, autCtx.token)
        .then((res) => {
          window.alert("Thành công");
        })
        .catch((err) => {
          window.alert("Thất bại");
          console.log(err);
        });
    }
  };
  return (
    <div className={classes.container}>
      <div>
        <h1>Unpaid List</h1>
        <div>
          <PaginatedItems
            itemsPerPage={4}
            setItemId={setItemId}
            setName={setName}
          />
        </div>
      </div>
      <div>
        <h1 className={classes.header}>
          Thông tin hóa đơn gửi người dùng thuê <span>{name}</span>
        </h1>
        <form onSubmit={onSubmitHander}>
          <div>
            <label className={classes["input-label"]}>Giá điện:</label>
            <input
              type="number"
              ref={electricRef}
              min={0}
              value={elecPrice}
              onChange={(e) => setElecPrice(e.target.value)}
            />
          </div>
          <div>
            <label className={classes["input-label"]}>Hóa đơn điện:</label>
            <input
              type="file"
              ref={eleImgRef}
              onChange={(e) => setEleImg(e.target.files[0])}
            />
          </div>
          <div>
            <label className={classes["input-label"]}>Giá nước:</label>
            <input
              type="number"
              ref={waterRef}
              value={waterPrice}
              onChange={(e) => setWaterPrice(e.target.value)}
            />
            <div>
              <label className={classes["input-label"]}>Hóa đơn nước:</label>
              <input
                type="file"
                ref={waterImgRef}
                onChange={(e) => setWaterImg(e.target.files[0])}
              />
            </div>
            <div>
              <label className={classes["input-label"]}>Giá giữ xe:</label>
              <input
                type="number"
                ref={carRef}
                value={carPrice}
                onChange={(e) => setCarPrice(e.target.value)}
              />
            </div>
            <div>
              <label className={classes["input-label"]}>
                Phí dịch vụ khác:
              </label>
              <input
                type="number"
                ref={otherRef}
                value={otherPrice}
                onChange={(e) => setOtherPrice(e.target.value)}
              />
            </div>
          </div>
          <button>Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default UnpaidList;
