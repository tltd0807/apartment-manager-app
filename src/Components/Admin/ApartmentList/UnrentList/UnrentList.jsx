import React, { useState } from "react";
import LayoutAuthenticated from "../../../Layout/LayoutAuthenticated";
import UnrentRequest from "../../UnrentRequest/UnrentRequest";

import classes from "./UnrentList.module.css";
const UnrentList = () => {
  return (
    <LayoutAuthenticated>
      <div>
        <UnrentRequest />
      </div>
    </LayoutAuthenticated>
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
