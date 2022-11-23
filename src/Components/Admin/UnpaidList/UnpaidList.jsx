import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const UnpaidList = () => {
  return (
    <div>
      <h1>Unpaid List</h1>
      <div>
        <PaginatedItems itemsPerPage={4} />
      </div>
    </div>
  );
};

export default UnpaidList;
