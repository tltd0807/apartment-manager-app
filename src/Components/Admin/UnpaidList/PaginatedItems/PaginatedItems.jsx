import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getApartmentUnpaid } from "../../../../API/apartmentAPI";
import AuthContext from "../../../../store/auth-context";
import UnpaidItem from "../../UnpaidList/UnpaidItem/UnpaidItem";
import classes from "./PaginatedItems.module.css";
function PaginatedItems({ itemsPerPage, setItemId, setName }) {
  const [itemOffset, setItemOffset] = useState(0);
  const [unpaidList, setUnpaidList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getApartmentUnpaid(authContext.token)
      .then((res) => {
        console.log(res.data);
        setUnpaidList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = unpaidList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(unpaidList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % unpaidList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {currentItems.map((unpaidItemData) => (
          <UnpaidItem
            data={unpaidItemData}
            key={unpaidItemData.id}
            setItemId={setItemId}
            setName={setName}
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
