import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from "../../Layout/Button/Button";
import Search from "../Search/Search";
import ApartmentItem from "./ApartmentItem/ApartmentItem";
import classes from "./ApartmentList.module.css";

const ApartmentList = (props) => {
  const [apartmentArr, setApartmentArr] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://buildingmanager-api.herokuapp.com/api/System/items?PageNumber=0"
      );
      // "https://buildingmanager-api.herokuapp.com/api/System/items?PageNumber=0"

      // Sử dụng cái này khi mà cần update state dựa trên state cũ
      // setApartmentArr((apartmentArr) => [
      //   ...apartmentArr,
      //   ...[...res["data"]["data"]],
      // ]);
      setApartmentArr([...res["data"]["data"]]);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  useEffect(() => {
    getData();
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
