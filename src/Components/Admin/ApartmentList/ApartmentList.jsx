import React from "react";

import PaginatedItems from "./PaginatedItems/PaginatedItems";

const ApartmentList = () => {
  return (
    <section>
      <h1>ApartmentList</h1>
      <div>
        <PaginatedItems itemsPerPage={6} />
      </div>
    </section>
  );
};

export default ApartmentList;
