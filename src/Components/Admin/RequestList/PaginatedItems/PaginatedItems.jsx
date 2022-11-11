import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getRentRequest } from "../../../../API/apartmentAPI";
import AuthContext from "../../../../store/auth-context";
import RentListItem from "../ApartmentItem/RentListItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [rentRequestList, setRentRequestList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getRentRequest(authContext.token)
      .then((res) => {
        setRentRequestList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = rentRequestList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rentRequestList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rentRequestList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      <div className={classes["table-header"]}>
        <div>Field A</div>
        <div>Field B</div>
        <div>Field C</div>
        <div>Field D</div>
        <div>Field E</div>
      </div>
      {currentItems.map((apartmentItemData) => (
        <RentListItem data={apartmentItemData} key={apartmentItemData.id} />
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
