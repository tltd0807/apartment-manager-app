import React, { useEffect, useState } from "react";
import LayoutAuthenticated from "../../Layout/LayoutAuthenticated";
import classes from "./RequestList.module.css";
import RequestTable from "./RequestTable";

const RequestList = () => {
  return (
    <LayoutAuthenticated>
      <div>
        <RequestTable />
      </div>
    </LayoutAuthenticated>
  );
};

export default RequestList;
