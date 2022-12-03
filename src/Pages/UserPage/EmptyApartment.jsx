import React from "react";
import UserHeaderNew from "../../Components/Layout/UserHeader";
import ApartmentList from "../LandingPage/ApartmentList/ApartmentList";

const EmptyApartment = () => {
  return (
    <UserHeaderNew>
      <ApartmentList />
    </UserHeaderNew>
  );
};

export default EmptyApartment;
