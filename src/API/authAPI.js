import axios from "axios";

export const registerUser = async (data) => {
  const res = await axios.post(
    `https://buildingmanager-api-v2.herokuapp.com/api/System/register`,
    data
  );
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(
    `https://buildingmanager-api-v2.herokuapp.com/api/System/login`,
    data
  );
  return res.data;
};
