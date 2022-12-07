import axios from "axios";

export const getAllApartmentNoAuth = async (type = 0, pageNum = 0) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/System/items?${
      type !== 0 ? `Types=${type}&` : ""
    }PageNumber=${pageNum}`
  );
  return res;
};
export const getApartmentById = async (id) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/System/items/${id}`
  );
  return res.data;
};

export const getAminApartmentById = async (id, token) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/items/${id}`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getAllApartment = async (token) => {
  // ?PageSize=100 thêm cái này vào cuối url để lấy hết
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/items?PageSize=100 `,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getApartmentUnpaid = async (token) => {
  // ?PageSize=100 thêm cái này vào cuối url để lấy hết
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/unpaied-items?PageSize=100 `,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getRentRequest = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/rent-request?PageSize=100`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getUnrentRequest = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/unrent-request?PageSize=100`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
