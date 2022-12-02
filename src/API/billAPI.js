import axios from "axios";

export const infoBill = async (token) => {
  const res = await axios.get(
    "https://buildingmanager-api-v2.herokuapp.com/api/Member/profile-bills",
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
