import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./Info.module.css";
import AuthContext from "../../../store/auth-context";
import { editInfoUser, infoUser } from "../../../API/userAPI";
const Info = ({ isInfo }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    avatarUrl: "",
    email: "",
    phoneNumber: "",
  });
  const [img, setImg] = useState();

  const avatarUrlRef = useRef();
  const phoneNumberRef = useRef();
  const autCtx = useContext(AuthContext);
  useEffect(() => {
    if (isInfo) {
      infoUser(autCtx.token)
        .then((res) => setUserInfo(res))
        .catch((err) => console.log(err));
    }
  }, [isInfo]);
  const editUserInfo = (e) => {
    e.preventDefault();
    if (!phoneNumberRef.current.value && !phoneNumberRef.current.value) {
      window.alert("Vui lòng nhập thông tin");
      return;
    }
    if (phoneNumberRef.current) {
      if (phoneNumberRef.current.value.length !== 10) {
        window.alert("Vui lòng nhập số điện thoại 10 số");
        return;
      }
    }
    const formData = new FormData();
    formData.append("Avatar", img);
    formData.append("PhoneNumber", phoneNumberRef.current.value);

    editInfoUser(formData, autCtx.token)
      .then((res) => {
        window.alert("Thay đổi thành công. Vui lòng F5 để xem kết quả");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Cập nhật thất bại thử lại sau");
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes["user-info"]}>
        <img
          src={userInfo.avatarUrl}
          alt="user Image"
          width={100}
          height={100}
        />
        <div>
          <p>
            <strong className={classes.label}> Người dùng: </strong>
            {userInfo.username}
          </p>
        </div>
        <div>
          <p>
            <strong className={classes.label}>Email: </strong>
            {userInfo.email}
          </p>
        </div>
        <div>
          <p>
            <strong className={classes.label}>Số điện thoại: </strong>
            {userInfo.phoneNumber}
          </p>
        </div>
      </div>
      <form className={classes.form} onSubmit={editUserInfo}>
        <h2>Thay đổi thông tin</h2>
        <div>
          <label htmlFor="avatar" className={classes["input-label"]}>
            Avatar{" "}
          </label>
          <input
            type="file"
            id="avatar"
            ref={avatarUrlRef}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="sdt" className={classes["input-label"]}>
            Số điện thoại:{" "}
          </label>
          <input
            type="text"
            placeholder="Vui lòng điền số điện thoại"
            id="sdt"
            ref={phoneNumberRef}
          />
        </div>
        <button className={classes["sent-btn"]}>Thay đổi</button>
      </form>
    </div>
  );
};

export default Info;
// {
//     "username": "minh840",
//     "avatarUrl": "https://res.cloudinary.com/buildingmanager/image/upload/v1663493648/fv92vgjspeumg44ynvtw.png",
//     "email": "ngocminhnguyen840@gmail.com",
//     "phoneNumber": "0932629240"
//   }
