import React, { useState } from "react";
import PaginatedItems from "./PaginatedItems/PaginatedItems";
import UnrentInfo from "./UnrentInfo/UnrentInfo";
import classes from "./UnrentList.module.css";
const UnrentList = () => {
  const [unrentInfo, setUnrentInfo] = useState({
    cccd: "",
    createDate: "",
    fullName: "",
    handleTime: "",
    handlerId: -1,
    id: -1,
    item: null,
    itemId: 0,
    renter: null,
    renterId: -1,
    status: false,
  });
  console.log(unrentInfo);
  return (
    <div className={classes.container}>
      <div>
        <h1>Danh sách yêu cầu thuê</h1>
        <PaginatedItems itemsPerPage={4} setUnrentInfo={setUnrentInfo} />
      </div>
      <div>
        <h1 className={classes.header}>Thông tin yêu cầu</h1>
        <UnrentInfo unrentInfo={unrentInfo} />
      </div>
    </div>
  );
};

export default UnrentList;
// cccd: "11111111";
// createDate: "2022-11-24T07:42:48.571724";
// fullName: "1";
// handleTime: "0001-01-01T00:00:00";
// handlerId: 0;
// id: 8;
// item: null;
// itemId: 1;
// renter: null;
// renterId: 8;
// status: false;
