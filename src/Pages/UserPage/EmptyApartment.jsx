import React from "react";
import UserHeaderNew from "../../Components/Layout/UserHeader";
import ApartmentListNew from "../../Components/User/ApartmentList/ApartmentListNew";

const EmptyApartment = () => {
  return (
    <UserHeaderNew>
      <ApartmentListNew />
    </UserHeaderNew>
  );
};

export default EmptyApartment;
