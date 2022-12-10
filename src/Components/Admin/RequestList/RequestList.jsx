import React, { useEffect, useState } from "react";
import LayoutAuthenticated from "../../Layout/LayoutAuthenticated";
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
