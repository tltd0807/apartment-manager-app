import axios from "axios";

export const infoUser = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Member/profile`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
// infoUser(res.token).then((res) => console.log(res));
export const editInfoUser = async (data, token) => {
  const res = await axios.put(
    `https://buildingmanager-api.herokuapp.com/api/Member/edit-profile`,
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

export const sentRentRequest = async (data, token) => {
  const res = await axios.post(
    `https://buildingmanager-api.herokuapp.com/api/Member/rent-request`,
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
export const sentUnrentRequest = async (data, token) => {
  const res = await axios.post(
    `https://buildingmanager-api.herokuapp.com/api/Member/unrent-request`,
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
// https://buildingmanager-api.herokuapp.com/api/Member/member
export const sentMemberRequest = async (data, token) => {
  const res = await axios.post(
    `https://buildingmanager-api.herokuapp.com/api/Member/member`,
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
export const rentedApartment = async (token) => {
  const res = await axios.get(
    `https://buildingmanager-api.herokuapp.com/api/Member/profile-items`,
    { headers: { Authorization: `${token}` } }
  );
  return res.data;
};
