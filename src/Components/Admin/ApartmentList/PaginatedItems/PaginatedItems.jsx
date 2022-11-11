import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllApartment } from "../../../../API/apartmentAPI";
import AuthContext from "../../../../store/auth-context";
import ApartmentItem from "../ApartmentItem/ApartmentItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
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

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = apartmentList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(apartmentList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apartmentList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      {currentItems.map((apartmentItemData) => (
        <ApartmentItem data={apartmentItemData} key={apartmentItemData.id} />
      ))}
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
