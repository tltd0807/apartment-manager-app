import axios from "axios";

export const infoUser = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Member/profile`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
// infoUser(res.token).then((res) => console.log(res));
