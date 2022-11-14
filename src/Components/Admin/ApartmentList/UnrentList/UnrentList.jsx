import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const UnrentList = () => {
  return (
    <div>
      <PaginatedItems itemsPerPage={4} />
    </div>
  );
};

export default UnrentList;
