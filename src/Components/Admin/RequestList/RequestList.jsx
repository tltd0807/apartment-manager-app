import React, { useEffect, useState } from "react";
import LayoutAuthenticated from "../../Layout/LayoutAuthenticated";
import PaginatedItems from "./PaginatedItems/PaginatedItems";
import classes from "./RequestList.module.css";
import RequestInfo from "./ResquestInfo/RequestInfo";

const RequestList = () => {
  const [requestInfo, setRequestInfo] = useState({
    numberOfParent: 0,
    id: 0,
    fullName: "",
    createDate: "",
    status: false,
    cccd: "",
    itemId: 0,
    renterId: 0,
  });
  // useEffect(() => {
  //   console.log(requestInfo);
  // }, [requestInfo]);

  return (
    <LayoutAuthenticated>
      <div className={classes.container}>
        <PaginatedItems itemsPerPage={4} setRequestInfo={setRequestInfo} />
        <br />
        <br />
        <br />
        <div>
          <RequestInfo requestInfo={requestInfo} />
        </div>
      </div>
    </LayoutAuthenticated>
  );
};

export default RequestList;
