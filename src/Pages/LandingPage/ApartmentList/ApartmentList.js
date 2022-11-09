import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import Button from "../../../Components/Layout/Button/Button";
import Search from "../Search/Search";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
import { Api } from "../../../data/EndPoint";
import classes from "./ApartmentList.module.css";
import { useNavigate } from "react-router-dom";
const ApartmentList = (props) => {
  const [apartmentArr, setApartmentArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAll, setIsAll] = useState(true);
  const navigate = useNavigate();
  // ngăn cho getData re-create khi ApartmentList re-eveluating
  const getData = useCallback(async (pageNumber) => {
    try {
      const res = await axios.get(Api.getItems + pageNumber);

      if (pageNumber === 1) {
        setApartmentArr(res["data"]["data"]);
      } else {
        // nếu pageNumber >0 thì xử lý cho button xem thêm
        setApartmentArr((apartmentArr) => [
          ...apartmentArr,
          ...[...res["data"]["data"]],
        ]);
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }, []);
  const toDetailApartment = (id) => {
    navigate("/apartment", { state: { id: id } });
  };
  const getDataBtType = useCallback(async (typeId) => {
    if (typeId === 0) {
      // setIsAll(true);
      setCurrentPage(1);
      getData(1);
    } else {
      try {
        const res = await axios.get(Api.getItemsById + typeId);
        setApartmentArr(res.data.data);
      } catch (e) {
        console.log("ERROR", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isAll) {
      getData(currentPage);
    } else {
      // tạm thời k làm gì hết
      // setIsAll(false);
      return;
    }
  }, [currentPage]);

  return (
    <>
      <Search className={classes["half-down"]} changeType={getDataBtType} />
      <div className={classes["list-container"]}>
        {apartmentArr.length === 0 && (
          <p>Something went wrong. Please try it again</p>
        )}
        <div className={classes.list}>
          {apartmentArr.length > 0 &&
            apartmentArr.map((apartment) => (
              <ApartmentItem
                key={apartment.id}
                imgSrc={apartment.avatarUrl}
                name={apartment.name}
                price={apartment.price}
                type={apartment.type}
                onClick={() => toDetailApartment(apartment.id)}
              />
            ))}
        </div>
        <Button
          className={classes.btn}
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
        >
          Xem thêm
        </Button>
      </div>
    </>
  );
};
export default ApartmentList;
