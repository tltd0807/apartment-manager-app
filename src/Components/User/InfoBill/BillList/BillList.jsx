import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const BillList = ({ setBillID }) => {
  return (
    <div>
      <h2>Bill List</h2>
      <PaginatedItems itemsPerPage={4} setBillID={setBillID} />
    </div>
  );
};

export default BillList;
