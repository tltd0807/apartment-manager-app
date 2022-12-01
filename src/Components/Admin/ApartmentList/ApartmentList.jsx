import React, { useState, useContext, useEffect, useRef } from "react";

import PaginatedItems from "./PaginatedItems/PaginatedItems";
import classes from "./ApartmentList.module.css";
import { getApartmentById, editApartment } from "../../../API/adminAPI";
import AuthContext from "../../../store/auth-context";
const ApartmentList = () => {
  const [itemID, setItemID] = useState();
  const [img, setImg] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();

  const authCtx = useContext(AuthContext);
  const priceRef = useRef();
  const descriptionRef = useRef();
  const avaRef = useRef();
  const img1Ref = useRef();
  const img2Ref = useRef();
  const img3Ref = useRef();

  const [itemInfo, setItemInfo] = useState({
    status: 0,
    renterName: null,
    numberOfParent: 0,
    description: "",
    location: "",
    pictureUrl: ["", "", ""],
    videoUrl: "",
    comments: [],
    id: 0,
    name: " ",
    price: 0,
    avatarUrl: "",
    type: "",
  });
  useEffect(() => {
    if (itemID) {
      getApartmentById(itemID, authCtx.token)
        .then((res) => {
          setItemInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [itemID]);

  const onSubmitHander = (e) => {
    e.preventDefault();

    if (
      (img1Ref.current.value === "" &&
        img2Ref.current.value === "" &&
        img3Ref.current.value === "") ||
      (img1Ref.current.value !== "" &&
        img2Ref.current.value !== "" &&
        img3Ref.current.value !== "")
    ) {
      if (priceRef.current.value <= 1000) {
        window.alert("Vui lòng điền giá thuê lớn hơn 1000");
        return;
      }

      // Send request here
      const formData = new FormData();
      formData.append("Id", itemID);
      formData.append("Name", itemInfo.name);
      formData.append("Description", descriptionRef.current.value);
      formData.append("Price", priceRef.current.value);
      formData.append("Status", 0);
      formData.append("AvatarUrl", img);
      formData.append("VideoUrl", "");
      formData.append("PictureUrl", img1);
      formData.append("PictureUrl", img2);
      formData.append("PictureUrl", img3);
      // console.log("running");
      editApartment(formData, authCtx.token)
        .then((res) => {
          window.alert("Thay đổi thành công");
          document.getElementById("form").reset();
        })
        .catch((err) => {
          window.alert("Thay đổi thất bại, vui lòng thử lại sau");
          console.log(err);
        });
    } else if (
      img1Ref.current.value === "" ||
      img2Ref.current.value === "" ||
      img3Ref.current.value === ""
    ) {
      window.alert("Vui lòng điền đủ 3 hình chi tiết hoặc bỏ trống cả 3");
      return;
    }
  };
  return (
    <section className={classes.body}>
      <div className={classes.container}>
        <h1>Apartment List</h1>
        <PaginatedItems itemsPerPage={6} setItemID={setItemID} />
      </div>
      <div className={classes.info}>
        {itemID && (
          <div>
            <h1 className={classes["info-header"]}>Thông tin cụ thể</h1>

            <div>
              <img
                src={itemInfo.avatarUrl}
                alt="apartment image"
                width={500}
                height={200}
              />
              <div className={classes["img-container"]}>
                {itemInfo.pictureUrl.map((pic, index) => (
                  <img
                    src={pic}
                    alt="apartment image"
                    width={150}
                    height={100}
                    key={index}
                  />
                ))}
              </div>
              <h2>{itemInfo.name}</h2>
              <div>
                <p>
                  <strong>Mô tả: </strong>
                  {itemInfo.description}
                </p>
                <p>
                  <strong>Giá: </strong>
                  {itemInfo.price}USD
                </p>
                <p>
                  <strong>Loại: </strong>
                  {itemInfo.type}
                </p>
                <p>
                  <strong>Trạng thái: </strong>{" "}
                  <span>{itemInfo.status === 0 ? "trống" : "đã cho thuê"}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={onSubmitHander} className={classes.form} id="form">
        <h1 className={classes["info-header"]}>
          Thay đổi thông tin của <span> {itemInfo.name}</span>
        </h1>
        <div>
          <label className={classes["input-label"]}>Hình căn hộ chính:</label>
          <input
            type="file"
            ref={avaRef}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className={classes["input-label"]}>Hình chi tiết:</label>
          <input
            type="file"
            ref={img1Ref}
            onChange={(e) => setImg1(e.target.files[0])}
          />
          <input
            type="file"
            ref={img2Ref}
            onChange={(e) => setImg2(e.target.files[0])}
          />
          <input
            type="file"
            ref={img3Ref}
            onChange={(e) => setImg3(e.target.files[0])}
          />
        </div>
        <div>
          <label className={classes["input-label"]}>Mô tả:</label>
          <textarea
            type="text"
            className={classes.textarea}
            ref={descriptionRef}
          />
        </div>

        <div>
          <label className={classes["input-label"]}>Giá:</label>
          <input type="number" ref={priceRef} />
        </div>
        <br />
        {itemInfo.status === 0 ? (
          <button className={classes["sent-btn"]}>Thay đổi</button>
        ) : (
          <button className={classes["sent-btn"]} disabled>
            Thay đổi
          </button>
        )}
      </form>
    </section>
  );
};

export default ApartmentList;

// {
//   "status": 0,
//   "renterName": null,
//   "numberOfParent": 0,
//   "description": "Phòng 405, tầng 4 với view cực đẹp",
//   "location": "Tầng 4",
//   "pictureUrl": [
//     "https://res.cloudinary.com/buildingmanager/image/upload/v1669357074/a6vhgdiz3c34x4tb6e8z.jpg",
//     "https://res.cloudinary.com/buildingmanager/image/upload/v1669357074/vm2dh89rdbckjhtimndb.jpg",
//     "https://res.cloudinary.com/buildingmanager/image/upload/v1669357075/b15uo6oz81dqw4rzxne2.jpg"
//   ],
//   "videoUrl": "https://res.cloudinary.com/buildingmanager/video/upload/v1663293546/qwudhlgspql2ofpuvkm1.mp4",
//   "comments": [],
//   "id": 19,
//   "name": "Phòng 405 ",
//   "price": 4500,
//   "avatarUrl": "https://res.cloudinary.com/buildingmanager/image/upload/v1669357075/z5md9tmuolljmw7ffxlm.jpg",
//   "type": "3PN 2VS"
// }
