import React, { useRef, useState } from "react";

import classes from "./RegisterMember.module.css";
const RegisterMember = () => {
  const [img, setImg] = useState();

  const nameRef = useRef();
  const avaRef = useRef();
  const birtDayRef = useRef();
  const genderRef = useRef();
  const cccdRef = useRef();
  const nationRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const subdistrictRef = useRef();
  const streetRef = useRef();
  const detailRef = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(genderRef.current.value === ""); nếu select trống thì value =''
    // sử dụng form data thay vì đây
    const newMem = {
      FullName: nameRef.current.value,
      AvatarUrl: avaRef.current.value,
      DateOfBirth: birtDayRef.current.value,
      Gender: genderRef.current.value,
      CCCD: cccdRef.current.value,
      Nationality: nationRef.current.value,
      "PlaceOfOrigin.City": cityRef.current.value,
      "PlaceOfOrigin.District": districtRef.current.value,
      "PlaceOfOrigin.SubDistrict": subdistrictRef.current.value,
      "PlaceOfOrigin.Street": streetRef.current.value,
      "PlaceOfOrigin.Details": detailRef.current.value,
    };
  };
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Register Member</h2>

      <form className={classes["member-form"]} onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="fullName">Họ tên:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Vui lòng điền Họ và tên"
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="AvatarUrl">Avatar: </label>
          <input
            type="file"
            id="AvatarUrl"
            placeholder="Vui lòng thêm hình ảnh"
            ref={avaRef}
          />
        </div>
        <div>
          <label htmlFor="DateOfBirth">Ngày sinh: </label>
          <input type="Date" id="DateOfBirth" ref={birtDayRef} />
        </div>

        <div>
          <label htmlFor="Gender">Chọn giới tính:</label>

          <select name="gender" id="Gender" ref={genderRef}>
            <option value="">--Vui lòng chọn giới tính--</option>
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
          </select>
        </div>

        <div>
          <label htmlFor="cccd">CCCD: </label>
          <input
            type="text"
            id="cccd"
            placeholder="Vui lòng điền căn cước"
            ref={cccdRef}
          />
        </div>

        <div>
          <label htmlFor="Nationality">Quốc tịch: </label>
          <input
            type="text"
            id="Nationality"
            placeholder="Vui lòng điền quốc tịch"
            ref={nationRef}
          />
        </div>
        <div>
          <label htmlFor="PlaceOfOrigin-City">Tỉnh thành: </label>
          <input
            type="text"
            id="PlaceOfOrigin-City"
            placeholder="Vui lòng điền tỉnh thành"
            ref={cityRef}
          />
        </div>

        <div>
          <label htmlFor="PlaceOfOrigin-District">Quận/huyện: </label>
          <input
            type="text"
            id="PlaceOfOrigin-District"
            placeholder="Vui lòng điền quận huyện"
            ref={districtRef}
          />
        </div>
        <div>
          <label htmlFor="PlaceOfOrigin-SubDistrict">Phường/xã: </label>
          <input
            type="text"
            id="PlaceOfOrigin-SubDistrict"
            placeholder="Vui lòng điền phường/xã"
            ref={subdistrictRef}
          />
        </div>
        <div>
          <label htmlFor="PlaceOfOrigin-Street">Đường: </label>
          <input
            type="text"
            id="PlaceOfOrigin-Street"
            placeholder="Vui lòng điền tên đường:"
            ref={streetRef}
          />
        </div>

        <div>
          <label htmlFor="PlaceOfOrigin-Details">Số nhà: </label>
          <input
            type="text"
            id="PlaceOfOrigin-Details"
            placeholder="Vui lòng điền số nhà:"
            ref={detailRef}
          />
        </div>

        <button className={classes["sent-btn"]}>Gửi</button>
      </form>
    </div>
  );
};

export default RegisterMember;
