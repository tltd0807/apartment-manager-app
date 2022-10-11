import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import Button from "../../../Components/Layout/Button/Button";
import Search from "../Search/Search";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
import classes from "./ApartmentList.module.css";

const ApartmentList = (props) => {
  const [apartmentArr, setApartmentArr] = useState([]);

  // ngăn cho getData re-create khi ApartmentList re-eveluating
  const getData = useCallback(async (pageNumber) => {
    try {
      const res = await axios.get(
        `https://buildingmanager-api.herokuapp.com/api/System/items?PageNumber=${pageNumber}`
      );
      // "https://buildingmanager-api.herokuapp.com/api/System/items?PageNumber=0"

      // Sử dụng cái này khi mà cần update state dựa trên state cũ

      if (pageNumber === 0) {
        setApartmentArr([...res["data"]["data"]]);
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

  useEffect(() => {
    getData(0);
  }, []);

  return (
    <>
      <Search className={classes["half-down"]} />
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
              />
            ))}
        </div>
        <Button className={classes.btn}>Xem thêm</Button>
      </div>
    </>
  );
};
export default ApartmentList;
