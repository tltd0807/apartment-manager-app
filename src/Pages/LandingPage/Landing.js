import React from "react";
import Header from "./Header/Header";
import ApartmentList from "./ApartmentList/ApartmentList";
import classes from "./Landing.module.css";
import Footer from "./Footer/Footer";

const Landing = (props) => {
  return (
    <section>
      <Header></Header>
      <main className={classes.container}>
        <ApartmentList />
      </main>
      <Footer />
    </section>
  );
};
export default Landing;
