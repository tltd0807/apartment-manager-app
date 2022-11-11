import React, { useContext, useEffect, useState } from "react";
import { getAllApartment } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
import ReactPaginate from "react-paginate";
import PaginatedItems from "./PaginatedItems/PaginatedItems";

const ApartmentList = () => {
  const authContext = useContext(AuthContext);
  const [apartmentList, setApartmentList] = useState([]);

  useEffect(() => {
    getAllApartment(authContext.token)
      .then((res) => {
        setApartmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  return (
    <section>
      <h1>ApartmentList</h1>
      <div>
        {/* {apartmentList.map((apartmentItemData) => (
          <ApartmentItem data={apartmentItemData} key={apartmentItemData.id} />
        ))} */}
        <PaginatedItems itemsPerPage={6} />
      </div>
    </section>
  );
};

export default ApartmentList;
