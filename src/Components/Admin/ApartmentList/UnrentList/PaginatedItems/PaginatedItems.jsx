import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getUnrentRequest } from "../../../../../API/apartmentAPI";
import AuthContext from "../../../../../store/auth-context";
import UnrentItem from "../UnrentItem/UnrentItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage, setUnrentInfo }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [unrentRequestList, setUnrentRequestList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getUnrentRequest(authContext.token)
      .then((res) => {
        setUnrentRequestList(res.data.reverse());
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = unrentRequestList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(unrentRequestList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % unrentRequestList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {currentItems.map((apartmentItemData) => (
          <UnrentItem
            data={apartmentItemData}
            key={apartmentItemData.id}
            setUnrentInfo={setUnrentInfo}
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
    </div>
  );
}
export default PaginatedItems;
