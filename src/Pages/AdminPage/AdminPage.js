import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApartmentList from "../../Components/Admin/ApartmentList/ApartmentList";
import RequestList from "../../Components/Admin/RequestList/RequestList";
import UserList from "../../Components/Admin/UserList/UserList";
import Nav from "../../Components/Layout/Navigation/Nav";
import classes from "./AdminPage.module.css";

const AdminPage = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const { state } = useLocation();
  // const { username, avatarUrl } = state; // Read values passed on state

  const onClickHandler = (number) => {
    setActiveTab(number);
  };

  // 1 là apartment list, 2 là rent, 3 là user
  return (
    <main className={classes["admin-container"]}>
      <Nav
        onClickFocus={onClickHandler}
        activeTab={activeTab}
        userInfo={state}
      />
      <section className={classes["admin-section"]}>
        {activeTab === 0 && <h1>Welcome {state.username}</h1>}
        {activeTab === 1 && <ApartmentList />}
        {activeTab === 2 && <RequestList />}
        {activeTab === 3 && <UserList />}
      </section>
    </main>
  );
};

export default AdminPage;
