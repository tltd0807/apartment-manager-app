import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const RequestList = () => {
  return (
    <div>
      <PaginatedItems itemsPerPage={4} />
      <br />
      <br />
      <br />
      <div>hello</div>
    </div>
  );
};

export default RequestList;
