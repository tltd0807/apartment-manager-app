import React from "react";

import LayoutAuthenticated from "../../Layout/LayoutAuthenticated";
import UnpaidTable from "./UnpaidTable";

const UnpaidList = () => {
  return (
    <LayoutAuthenticated>
      <UnpaidTable />
    </LayoutAuthenticated>
  );
};

export default UnpaidList;
