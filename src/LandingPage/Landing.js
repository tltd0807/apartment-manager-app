import React from "react";
import Header from "./Header/Header";
import ApartmentList from "./ApartmentList/ApartmentList";
import classes from "./Landing.module.css";
import Footer from "./Footer/Footer";

const Landing = (props) => {
  return (
    <>
      <Header></Header>
      <ApartmentList />
      <Footer />
    </>
  );
};
export default Landing;
