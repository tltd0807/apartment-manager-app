import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Info from "../../Components/User/Info/Info";
import InfoBill from "../../Components/User/InfoBill/InfoBill";
import RegisterMember from "../../Components/User/RegisterMember/RegisterMember";
import Rented from "../../Components/User/Rented/Rented";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

import UserHeader from "./Header/UserHeader";
import classes from "./UserPage.module.css";

const UserPage = (props) => {
  const [isPay, setIsPay] = useState(false);
  const [isMoreMem, setMoreMem] = useState(false);
  const [isList, setIsList] = useState(true);
  const [isInfo, setIsInfo] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const { state } = useLocation();

  return (
    <section>
      <UserHeader
        pageSate={{
          isInfo: isInfo,
          isList: isList,
          isPay: isPay,
          isMoreMem: isMoreMem,
          isRent: isRent,
          setIsList: setIsList,
          setIsPay: setIsPay,
          setMoreMem: setMoreMem,
          setIsInfo: setIsInfo,
          setIsRent: setIsRent,
        }}
        userInfo={state}
      />
      {isList && (
        <div>
          <h2 className={classes.header}>Apartment List</h2>
          <ApartmentList />
        </div>
      )}
      {isInfo && (
        <div>
          <Info isInfo={isInfo} />
        </div>
      )}
      {isPay && <InfoBill />}
      {isMoreMem && <RegisterMember />}
      {isRent && (
        <div>
          <Rented />
        </div>
      )}
    </section>
  );
};

export default UserPage;
