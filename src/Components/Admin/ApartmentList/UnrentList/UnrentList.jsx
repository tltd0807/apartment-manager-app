import React from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const UnrentList = () => {
  return (
    <div>
      <div>
        <h1>Danh sách yêu cầu thuê</h1>
        <PaginatedItems itemsPerPage={4} />
      </div>
      <div>
        <h1>Thông tin yêu cầu</h1>
        <div></div>
      </div>
    </div>
  );
};

export default UnrentList;
