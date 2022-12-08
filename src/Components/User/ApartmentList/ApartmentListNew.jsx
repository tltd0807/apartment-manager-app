import React, { useState, useEffect, useCallback } from "react";
import { Spin, Segmented, Pagination } from "antd";
import classes from "./ApartmentList.module.css";
import { getAllApartmentNoAuth } from "../../../API/apartmentAPI";
import ApartmentItem from "../../../Pages/LandingPage/ApartmentList/ApartmentItem/ApartmentItem";
import { useNavigate } from "react-router-dom";
const typeArr = [
  "Tất cả",
  "Phòng thu",
  "2 phòng ngủ và 1 vệ sinh",
  "2 phòng ngủ và 2 vệ sinh",
  "3 phòng ngủ và 2 vệ sinh",
];
const convertType = (type) => {
  switch (type) {
    case "Tất cả":
      return 0;
    case "Phòng thu":
      return 1;
    case "2 phòng ngủ và 1 vệ sinh":
      return 2;
    case "2 phòng ngủ và 2 vệ sinh":
      return 3;
    case "3 phòng ngủ và 2 vệ sinh":
      return 4;
    default:
      return 0;
  }
};
const ApartmentListNew = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apartmentArr, setApartmentArr] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [current, setCurrent] = useState(1);
  const [type, setType] = useState(0);
  const navigate = useNavigate();

  const getApartmentList = useCallback(
    (type, current) => {
      getAllApartmentNoAuth(type, current)
        .then((res) => {
          setApartmentArr(res.data.data);
          // setTotalPage(JSON.parse(res.headers.pagination).totalPages);
          setTotalItems(JSON.parse(res.headers.pagination).totalItems);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [type, current]
  );
  const toDetailApartment = (id) => {
    navigate("/apartment", { state: { id: id } });
  };
  useEffect(() => {
    setIsLoading(true);
    getApartmentList(type, current);
  }, [type, current]);
  return (
    <div className={classes.container}>
      <Segmented
        size="large"
        options={typeArr}
        onChange={(type) => setType(convertType(type))}
      />
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <>
          <div className={classes.list}>
            {apartmentArr.map((apartment) => (
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
          <Pagination
            defaultCurrent={current}
            total={totalItems}
            pageSize={6}
            defaultPageSize={6}
            onChange={(page, pageSize) => {
              setCurrent(page);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ApartmentListNew;
