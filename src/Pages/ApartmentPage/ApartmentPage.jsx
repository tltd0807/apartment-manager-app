import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getApartmentById } from "../../API/apartmentAPI";

import classes from "./ApartmentPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation, useNavigate } from "react-router-dom";
const ApartmentPage = () => {
  const [apartment, setApartment] = useState({
    location: "",
    name: "",
    price: "",
    type: "",
    pictureUrl: null,
    description: "",
  });
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
          <button className={classes["back-btn"]} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApartmentPage;
