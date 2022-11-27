import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getRentRequest } from "../../../../API/apartmentAPI";
import AuthContext from "../../../../store/auth-context";
import RentListItem from "../ApartmentItem/RentListItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage, setRequestInfo }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [rentRequestList, setRentRequestList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getRentRequest(authContext.token)
      .then((res) => {
        setRentRequestList(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = rentRequestList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rentRequestList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rentRequestList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Danh sách yêu cầu thuê</h2>
      {currentItems.map((apartmentItemData) => (
        <RentListItem
          data={apartmentItemData}
          key={apartmentItemData.id}
          setRequestInfo={setRequestInfo}
        />
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
