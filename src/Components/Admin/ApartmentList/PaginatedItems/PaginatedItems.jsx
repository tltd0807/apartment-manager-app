import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllApartment } from "../../../../API/apartmentAPI";
import AuthContext from "../../../../store/auth-context";
import ApartmentItem from "../ApartmentItem/ApartmentItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [apartmentList, setApartmentList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getAllApartment(authContext.token)
      .then((res) => {
        setApartmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = apartmentList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(apartmentList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apartmentList.length;

    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.list}>
          {currentItems.map((apartmentItemData) => (
            <ApartmentItem
              data={apartmentItemData}
              key={apartmentItemData.id}
            />
          ))}
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next > "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=" < previous"
        renderOnZeroPageCount={null}
        pageClassName={classes.num}
        containerClassName={classes["list-container"]}
        activeClassName={classes.active}
      />
    </div>
  );
}
export default PaginatedItems;
{
  /* <div className={classes["table-header"]}>
        <div>Field A</div>
        <div>Field B</div>
        <div>Field C</div>
        <div>Field D</div>
        <div>Field E</div>
      </div> */
}
