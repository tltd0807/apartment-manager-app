import React from "react";
import Header from "./Header/Header";
import Search from "./Search/Search";
import ApartmentList from "./ApartmentList/ApartmentList";
import classes from "./Landing.module.css";
import Footer from "./Footer/Footer";

const Landing = (props) => {
  return (
    <>
      <Header></Header>
      <Search />
      <ApartmentList />
      <Footer />
    </>
  );
};
export default Landing;
