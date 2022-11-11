import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const RequestList = () => {
  return (
    <div>
      <PaginatedItems itemsPerPage={4} />{" "}
    </div>
  );
};

export default RequestList;
