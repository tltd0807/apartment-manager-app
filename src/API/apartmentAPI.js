import axios from "axios";

export const getApartmentById = async (id) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/System/items/${id}`
  );
  // console.log(res.data);
  return res.data;
};
