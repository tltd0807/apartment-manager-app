import React, { useContext, useEffect, useState } from "react";
import { getAllApartment } from "../../../API/apartmentAPI";
import AuthContext from "../../../store/auth-context";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
const ApartmentList = () => {
  const authContext = useContext(AuthContext);
  const [apartmentList, setApartmentList] = useState([]);
  const nextPage = () => {};
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
        <div>
          <button onClick={nextPage}> &lt;</button>
          <button onClick={nextPage}> &gt;</button>
        </div>
        {apartmentList.map((apartmentItemData) => (
          <ApartmentItem data={apartmentItemData} key={apartmentItemData.id} />
        ))}
      </div>
    </section>
  );
};

export default ApartmentList;
