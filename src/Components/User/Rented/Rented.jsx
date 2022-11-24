import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "./Rented.module.css";
import { rentedApartment, sentUnrentRequest } from "../../../API/userAPI";
import AuthContext from "../../../store/auth-context";

const Rented = () => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef();
  const cccdRef = useRef();

  const [itemID, setItemID] = useState(0);
  const [rented, setRented] = useState([
    {
      id: 0,
      name: "",
      price: 0,
      avatarUrl: "",
      type: "",
    },
  ]);
  const UnrentRequest = (event) => {
    event.preventDefault();

    // Validate here
    if (cccdRef.current.value < 9) {
      alert("Vui lòng nhập cccd trên 9 số");
      return;
    } else if (nameRef.current.value == "") {
      alert("Vui lòng nhập tên");
      return;
    }
    if (window.confirm("Gửi yêu cầu hủy thuê")) {
      sentUnrentRequest(
        {
          FullName: nameRef.current.value,
          CCCD: cccdRef.current.value,
          ItemId: itemID,
        },
        authCtx.token
      )
        .then((res) => {
          console.log(res);
          window.alert(res.message);
        })
        .catch((err) => {
          console.log(err);
          window.alert("Lỗi vui lòng kiểm tra dữ liệu nhập thử lại sau");
        });
    }
  };
  useEffect(() => {
    rentedApartment(authCtx.token)
      .then((res) => {
        // console.log("fetch success");
        setRented(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("đã xảy ra lỗi vui lòng thử lại sau");
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["item-container"]}>
        {rented[0].id !== 0 &&
          rented.map((item) => (
            <div
              className={classes.item}
              key={item.id}
              onClick={() => setItemID(item.id)}
            >
              <p>
                <strong>Tên căn hộ: </strong>
                {item.name}
              </p>
              <p>
                <strong>Giá thuê: </strong>
                {item.price}
              </p>
              <p>
                <strong>Loại căn hộ: </strong>
                {item.type}
              </p>
            </div>
          ))}
        {rented[0].id === 0 && (
          <p className={classes.none}>Bạn chưa có thuê căn hộ nào</p>
        )}
      </div>
      <form className={classes.form} onSubmit={UnrentRequest}>
        <h2>Yêu cầu hủy thuê</h2>
        <div>
          <label htmlFor="fullName">Họ tên: </label>
          <input
            type="text"
            placeholder="Vui lòng điền tên"
            id="fullName"
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="cccd">Căn cước: </label>
          <input
            type="text"
            placeholder="Vui lòng điền cccd"
            id="cccd"
            ref={cccdRef}
          />
        </div>{" "}
        <div>
          <label htmlFor="itemID">Mã căn hộ: </label>
          <input
            className={classes.unrent}
            type="text"
            placeholder={itemID}
            id="itemID"
            disabled
          />
        </div>
        <button className={classes["sent-btn"]}>Huỷ thuê</button>
      </form>
    </div>
  );
};

export default Rented;
// {
//     "id": 1,
//     "name": "Phòng 101",
//     "price": 1000,
//     "avatarUrl": "https://res.cloudinary.com/buildingmanager/image/upload/v1663293108/ryok3snctir73aus5oxc.jpg",
//     "type": "Studio"
//   }
