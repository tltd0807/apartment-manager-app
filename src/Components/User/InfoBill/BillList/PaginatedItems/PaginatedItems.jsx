import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AuthContext from "../../../../../store/auth-context";
import { infoBill } from "../../../../../API/billAPI";
import classes from "./PaginatedItems.module.css";

const PaginatedItems = ({ itemsPerPage, setBillID }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [billList, setBillList] = useState([
    {
      createDate: "",
      datePaied: "",
      electricBillUrl: "",
      electricPrice: "",
      itemPrice: "",
      id: "",
      otherPrice: "",
      paied: false,
      sumPrice: "",
      title: "",
      username: "",
      vehiclePrice: "",
      waterBillUrl: "",
      waterPrice: "",
    },
  ]);
  const authContext = useContext(AuthContext);
  const onClickHandler = (id) => {
    // console.log("onClickHandler: ", id);
    setBillID(id);
  };
  useEffect(() => {
    infoBill(authContext.token)
      .then((res) => {
        setBillList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext.token]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = billList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(billList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % billList.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {currentItems.map((unpaidItemData) => (
          <BillItem
            data={unpaidItemData}
            key={unpaidItemData.id}
            onClick={onClickHandler}
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
};

export default PaginatedItems;

const BillItem = (props) => {
  const { data, onClick } = props;
  const {
    createDate,
    datePaied,
    electricBillUrl,
    electricPrice,
    itemPrice,
    id,
    otherPrice,
    paied,
    sumPrice,
    title,
    username,
    vehiclePrice,
    waterBillUrl,
    waterPrice,
  } = data;
  //   console.log(createDate.slice(5, 7));==>month

  return (
    <div
      className={`${classes["item-container"]} ${
        !paied ? classes.pointer : ""
      }`}
      onClick={() => !paied && onClick(id)}
    >
      <p>
        <strong>Mã hóa đơn:</strong> <span className={classes.sum}>{id}</span>
      </p>
      <p>
        <strong>Phí thuê:</strong> {itemPrice}k
      </p>
      <p>
        <strong>Phí an ninh:</strong> {otherPrice}k
      </p>
      <p>
        <strong>Phí nước:</strong> {waterPrice}k
      </p>
      <p>
        <strong>Phí điện:</strong> {electricPrice}k
      </p>
      <p>
        <strong>Phí gửi xe:</strong> {vehiclePrice}k
      </p>
      <p>
        <strong>Tổng:</strong>
        <span className={classes.sum}> {sumPrice}k</span>
      </p>
      <p>
        Trạng thái :
        <span className={classes[`${paied ? "paid" : "not-paid"}`]}>
          {paied ? "Đã thanh toán" : "Chưa thanh toán"}
        </span>
      </p>
    </div>
  );
};
