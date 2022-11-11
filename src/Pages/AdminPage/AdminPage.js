import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
      <Nav onClick={onClickHandler} activeTab={activeTab} userInfo={state} />
      <section className={classes["admin-section"]}>
        {activeTab === 0 && <h1>Welcome {state.username}</h1>}
        {activeTab === 1 && <h1>Apartment List</h1>}
        {activeTab === 2 && <h1>Rent List</h1>}
        {activeTab === 3 && <h1>Users List</h1>}
      </section>
    </main>
  );
};

export default AdminPage;
