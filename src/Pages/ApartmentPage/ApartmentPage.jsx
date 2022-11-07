import React from "react";
import Slider from "react-slick";
import classes from "./ApartmentPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ApartmentPage = () => {
  const settings = {
    customPaging: function (i) {
      return (
        // chỗ này custom lại dot
        <a href="#" className={classes.pagning}>
          <img
            src={`https://res.cloudinary.com/buildingmanager/image/upload/v1663293499/hmhuv098q6ffeashh6ti.jpg`}
            width={50}
            alt="some img"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: classes["custom-dot"],
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
                src={
                  "https://res.cloudinary.com/buildingmanager/image/upload/v1663293499/hmhuv098q6ffeashh6ti.jpg"
                }
                width={500}
                alt="some img"
              />
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/buildingmanager/image/upload/v1663293499/hmhuv098q6ffeashh6ti.jpg"
                }
                width={500}
                alt="some img"
              />
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/buildingmanager/image/upload/v1663293499/hmhuv098q6ffeashh6ti.jpg"
                }
                width={500}
                alt="some img"
              />
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/buildingmanager/image/upload/v1663293499/hmhuv098q6ffeashh6ti.jpg"
                }
                width={500}
                alt="some img"
              />
            </div>
          </Slider>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default ApartmentPage;
