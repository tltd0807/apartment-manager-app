import axios from "axios";
// data={
//     "userId": 1,
//     "itemId": 1
//   }
export const assignUser = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/item/assign`,
    data,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

// status: 1 laf ddax thue,0 la trong

export const getApartmentFull = async (id, token) => {
  const res = await axios.put(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/items/${id}`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getApartmentById = async (id, token) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/items/${id}`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
export const editApartment = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/item`,
    data,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const assignApartment = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/item/assign`,
    data,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return res.data;
};
//data {
//   "userId": 0,
//   "itemId": 0,
//   "hasRequest": true
// }
export const unassignApartment = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/item/unassign`,
    data,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return res.data;
};
export const sentBill = async (id, data, token) => {
  const res = await axios.post(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/monthly-bill?itemId=${id}`,
    data,
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

// https://buildingmanager-api-v2.herokuapp.com/api/Admin/monthly-revenue?from=2022-11-19T16%3A48%3A45.368Z&to=2022-12-19T16%3A48%3A45.368Z

export const getStatic = async (from, to, token) => {
  const res = await axios.get(
    `https://buildingmanager-api-v2.herokuapp.com/api/Admin/monthly-revenue?from=${from}&to=${to}`,

    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return res.data;
};
