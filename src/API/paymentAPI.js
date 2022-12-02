import axios from "axios";

export const payBill = async (token, data) => {
  const res = await axios.post(
    "https://buildingmanager-api-v2.herokuapp.com/api/Member/payment",
    data,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
