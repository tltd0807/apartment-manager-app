import React from "react";
import Header from "./Header/Header";
import ApartmentList from "./ApartmentList/ApartmentList";
import classes from "./Landing.module.css";
import Footer from "./Footer/Footer";

const Landing = (props) => {
  return (
    <>
      <Header></Header>
      <main className={classes.container}>
        <ApartmentList />
      </main>
      <Footer />
    </>
  );
};
export default Landing;
