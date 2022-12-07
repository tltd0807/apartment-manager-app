import React from "react";
import Header from "./Header/Header";
import classes from "./Landing.module.css";
import Footer from "./Footer/Footer";
import ApartmentListNew from "../../Components/User/ApartmentList/ApartmentListNew";

const Landing = (props) => {
  return (
    <section>
      <Header></Header>
      <main className={classes.container}>
        <ApartmentListNew />
      </main>
      <Footer />
    </section>
  );
};
export default Landing;
