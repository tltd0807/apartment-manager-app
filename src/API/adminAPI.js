import axios from "axios";
// data={
//     "userId": 1,
//     "itemId": 1
//   }
export const assignUser = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api.herokuapp.com/api/Admin/item/assign`,
    data,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

// status: 1 laf ddax thue,0 la trong

export const getApartmentFull = async (id, token) => {
  const res = await axios.put(
    `https://buildingmanager-api.herokuapp.com/api/Admin/items/${id}`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};

export const getApartmentById = async (id, token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Admin/items/${id}`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
export const editApartment = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api.herokuapp.com/api/Admin/item`,
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
