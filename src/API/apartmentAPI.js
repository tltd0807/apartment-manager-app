import axios from "axios";

export const getApartmentById = async (id) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/System/items/${id}`
  );
  // console.log(res.data);
  return res.data;
};

export const getAllApartment = async (token) => {
  // ?PageSize=100 thêm cái này vào cuối url để lấy hết
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Admin/items?PageSize=100 `,
    { headers: { Authorization: `${token}` } }
  );
  // console.log(res.data);
  return res.data;
};

export const getApartmentUnpaid = async (token) => {
  // ?PageSize=100 thêm cái này vào cuối url để lấy hết
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Admin/unpaied-items?PageSize=100 `,
    { headers: { Authorization: `${token}` } }
  );
  // console.log(res.data);
  return res.data;
};

export const getRentRequest = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Admin/rent-request?PageSize=100`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getUnrentRequest = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Admin/unrent-request?PageSize=100`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
