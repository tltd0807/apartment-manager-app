import React from "react";
import Header from "./Header/Header";
import Search from "./Search/Search";

import classes from "./Landing.module.css";

const Landing = (props) => {
  return (
    <>
      <Header></Header>
      <Search />
    </>
  );
};
export default Landing;
