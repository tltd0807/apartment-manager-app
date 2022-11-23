import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { getApartmentById } from "../../API/apartmentAPI";
import { sentRentRequest } from "../../API/userAPI";

import classes from "./ApartmentPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const ApartmentPage = () => {
  const [apartment, setApartment] = useState({
    location: "",
    name: "",
    price: "",
    type: "",
    pictureUrl: null,
    description: "",
  });
  const authCtx = useContext(AuthContext);
  const [isLogIn, setIsLogIn] = useState(authCtx.isLoggedIn);
  const fullNameInput = useRef();
  const cccdInput = useRef();
  const numberOfParentInput = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;
  useEffect(() => {
    getApartmentById(id)
      .then((res) => {
        setApartment(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(authCtx);
    if (!isLogIn) {
      alert("Vui lòng đăng nhập để yêu cầu thuê");
      navigate("/signin");
    } else {
      if (cccdInput.current.value < 9) {
        alert("Vui lòng nhập cccd trên 9 số");
        return;
      } else if (numberOfParentInput.current.value <= 0) {
        alert("Vui lòng nhập số người ở dương");
        return;
      } else if (fullNameInput.current.value == "") {
        alert("Vui lòng nhập tên");
        return;
      }
      //
      sentRentRequest(
        {
          FullName: fullNameInput.current.value,
          CCCD: cccdInput.current.value,
          NumberOfParent: numberOfParentInput.current.value,
          ItemId: id,
        },
        authCtx.token
      )
        .then((res) => {
          console.log(res);
          alert(res.message);
          fullNameInput.current.value = "";
          cccdInput.current.value = "";
          numberOfParentInput.current.value = 0;
        })
        .catch((err) => console.log(err.response.data.errors));
    }
  };

  const settings = {
    customPaging: function (i) {
      return (
        // chỗ này custom lại dot
        <a href="/#" className={classes.pagning}>
          <img
            src={apartment.pictureUrl ? apartment.pictureUrl[0] : null}
            width={50}
            alt="some img"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "custom-dot",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={classes.container}>
      <div className={classes["content-container"]}>
        <div className={classes["img-container"]}>
          <Slider {...settings}>
            <div>
              <img
                src={apartment.pictureUrl ? apartment.pictureUrl[0] : null}
                width={500}
                alt="some img"
              />
            </div>
            <div>
              <img
                src={apartment.pictureUrl ? apartment.pictureUrl[1] : null}
                width={500}
                alt="some img"
              />
            </div>
            <div>
              <img
                src={apartment.pictureUrl ? apartment.pictureUrl[2] : null}
                width={500}
                alt="some img"
              />
            </div>
          </Slider>
        </div>
        <div>
          <h3 className={classes["apartment-name"]}>{apartment.name}</h3>
          <div className={classes.info}>
            <p>
              Căn hộ nằm ở{" "}
              <span> {apartment.location.toLocaleLowerCase()}</span> với{" "}
              <span>{apartment.type}</span>
            </p>
          </div>
          <p className={classes["apartment-price"]}>
            Chỉ với {apartment.price}
          </p>
          {/* form here */}
          <form className={classes["rent-form"]} onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="fullName">Họ tên:</label>
              <input
                type="text"
                id="fullName"
                placeholder="Vui lòng điền Họ và tên"
                ref={fullNameInput}
              />
            </div>
            <div>
              <label htmlFor="cccd">CCCD: </label>
              <input
                type="text"
                id="cccd"
                placeholder="Vui lòng điền số Căn cước"
                ref={cccdInput}
              />
            </div>
            <div>
              <label htmlFor="numberOfParent">Số người: </label>
              <input
                type="number"
                id="numberOfParent"
                placeholder="Vui lòng điền số người ở"
                ref={numberOfParentInput}
              />
            </div>
            <button className={classes["sent-btn"]}>Gửi</button>
          </form>
          <button className={classes["back-btn"]} onClick={() => navigate(-1)}>
            Trở về
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApartmentPage;
