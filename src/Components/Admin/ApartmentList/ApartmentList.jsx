import React from "react";

import PaginatedItems from "./PaginatedItems/PaginatedItems";
import classes from "./ApartmentList.module.css";
const ApartmentList = () => {
  return (
    <section>
      <div className={classes.container}>
        <h1>Apartment List</h1>
        <PaginatedItems itemsPerPage={6} />
      </div>
    </section>
  );
};

export default ApartmentList;
