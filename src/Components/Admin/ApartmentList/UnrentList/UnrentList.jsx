import React, { useState } from "react";
import LayoutAuthenticated from "../../../Layout/LayoutAuthenticated";
import UnrentRequest from "../../UnrentRequest/UnrentRequest";

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
